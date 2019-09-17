<?php
 	header('Access-Control-Allow-Origin: *');
	form_processor();
	header('Content-Type: text/javascript');
	global $mysqli;
	$shop = $_REQUEST['shop'];

	$sql = "SELECT id FROM shops WHERE shop = '$shop'";
	$pres = $mysqli->query($sql);
	$arr = $pres->fetch_array( MYSQLI_ASSOC );
	$shop_id = $arr['id'];

	$shop_domain = get_shop_meta( $shop_id, 'shop_domain');
	$force_ssl = get_shop_meta( $shop_id, 'force_ssl');
	$full_shop_url= ( $force_ssl > 0 ? 'https://' : 'http://' ) . $shop_domain;

	$funnel_url = $full_shop_url . SHOPIFY_PROXY_PREFIX.'/f/';

	$shop_to_funnel_status = get_shop_meta($shop_id,'shop_to_funnel_status');
	$landing_page_product_array = get_shop_meta($shop_id,'landing_page_product_array');

	$landing_page_tag_array = get_shop_meta($shop_id,'landing_page_tag_array');//for product tag

	$product_found = 0;


	if((($landing_page_product_array != "" && $landing_page_product_array != "null" && $landing_page_product_array != NULL && $landing_page_product_array != undefined && $landing_page_product_array != "undefined") || ($landing_page_tag_array != "" && $landing_page_tag_array != "null" && $landing_page_tag_array != NULL && $landing_page_tag_array != undefined && $landing_page_tag_array != "undefined")) && $shop_to_funnel_status == 'enable'){
		//$landing_page_product_array = json_decode($landing_page_product_array);
?>
		console.log("funnel_v2.js init");

		<?php  if(( $landing_page_product_array != "" && $landing_page_product_array != "null" && $landing_page_product_array != NULL && $landing_page_product_array != undefined && $landing_page_product_array != "undefined") && $shop_to_funnel_status == 'enable'){	?>
			var landing_page_product_array_status = 'true';
		<?php }else{ ?>
			var landing_page_product_array_status = 'false';
		<?php  }  ?>
		<?php  if(( $landing_page_tag_array != "" && $landing_page_tag_array != "null" && $landing_page_tag_array != NULL && $landing_page_tag_array != undefined && $landing_page_tag_array != "undefined") && $shop_to_funnel_status == 'enable'){	?>
			var landing_page_tag_array_status = 'true';
		<?php }else{ ?>
			var landing_page_tag_array_status = 'false';
		<?php  }  ?>


		var S_P_P = '<?php echo SHOPIFY_PROXY_PREFIX; ?>';
		var funnel_url = '<?php echo $funnel_url; ?>';

		var add_to_cart_flag = true;


		if(landing_page_tag_array_status == 'true'){
			var landing_page_tag_array = '<?php echo $landing_page_tag_array ?>';
			landing_page_tag_array = JSON.parse(landing_page_tag_array);
		}
		if(landing_page_product_array_status == 'true'){
			var landing_page_product_array = '<?php echo $landing_page_product_array ?>';
			landing_page_product_array = JSON.parse(landing_page_product_array);
		}




		$(document).ajaxComplete(function(evt, request, settings) {
			if(request.status == 200 && settings.url.indexOf('/cart/add') > -1){
				var flag_stop_tag = 0;
				if(landing_page_product_array_status == 'true'){
					for(var i=0;i< landing_page_product_array.length;i++){
						if(typeof request.responseJSON !== 'undefined'){
							if(landing_page_product_array[i].product_id == request.responseJSON.product_id){
								window.stop();
								flag_stop_tag = 1;
								var funnel_id = landing_page_product_array[i].funnel_id;
								var left_hand = landing_page_product_array[i].left_hand;
								if(left_hand == ""){
									left_hand = 1;
								}
								var funnel_handle = landing_page_product_array[i].funnel_handle;
								funnel_url_response = funnel_url+funnel_id+"/"+left_hand+"/"+funnel_handle;
								console.log("redirect to funnel through response product");
								shopify_update_cart_data(funnel_id,funnel_url_response);
								//window.location.href = funnel_url_response;
							}
						}
					}
				}

				if(typeof request.responseJSON !== 'undefined' && flag_stop_tag == 0){
					console.log(request.responseJSON.handle);
					if(landing_page_tag_array_status == 'true'){
						$.ajax({
							type: "get",
							url: request.responseJSON.handle+'.js',
							async: false,
							error: function (res){
								console.log(res);
								try {
								    var res_data = JSON.parse(res.responseText);
									console.log(res_data.tags);
									for(var i=0;i<res_data.tags.length;i++){
										for(var j=0;j<landing_page_tag_array.length;j++){
											if(atob(landing_page_tag_array[j].tag_name) == res_data.tags[i]){
												window.stop();
												var funnel_id = landing_page_tag_array[j].funnel_id;
												var left_hand = landing_page_tag_array[j].left_hand;
												if(left_hand == ""){
													left_hand = 1;
												}
												var funnel_handle = landing_page_tag_array[j].funnel_handle;
												funnel_url_response = funnel_url+funnel_id+"/"+left_hand+"/"+funnel_handle;
												console.log("redirect to funnel through response tag");
												shopify_update_cart_data(funnel_id,funnel_url_response);
											}
										}
									}
								}
								catch(err) {
								    console.log(err);
								}
							}
						});
					}
				}
			}
		});


		var flag = 0;
		var funnel_url_cart = '';





		if(landing_page_tag_array_status == 'true'){

			$.ajax({
				type: "get",
				url: String(window.location.pathname.split('/').pop().split('?').pop())+'.js',
				async: false,
				error: function (res){
					try{
						var res_data = JSON.parse(res.responseText);
						console.log(res_data.tags);
						if(typeof res_data.tags !== 'undefined'){
							for(var i=0;i<res_data.tags.length;i++){
								for(var j=0;j<landing_page_tag_array.length;j++){
									if(atob(landing_page_tag_array[j].tag_name) == res_data.tags[i]){
										var funnel_id = landing_page_tag_array[j].funnel_id;
										var left_hand = landing_page_tag_array[j].left_hand;
										if(left_hand == ""){
											left_hand = 1;
										}
										var funnel_handle = landing_page_tag_array[j].funnel_handle;
										funnel_url_cart = funnel_url+funnel_id+"/"+left_hand+"/"+funnel_handle;
										flag = 1;
										break;
									}
								}
							}
						}
					}
					catch(err){
						console.log(err);
					}

				}
			});

		}



		if(landing_page_product_array_status == 'true'){
			if (typeof meta !== 'undefined') {
				if (typeof meta.product !== 'undefined') {
					if (typeof meta.product.id !== 'undefined') {
					    for(var i=0;i<landing_page_product_array.length;i++){
							if(landing_page_product_array[i].product_id == meta.product.id){
								var funnel_id = landing_page_product_array[i].funnel_id;
								var left_hand = landing_page_product_array[i].left_hand;
								if(left_hand == ""){
									left_hand = 1;
								}
								var funnel_handle = landing_page_product_array[i].funnel_handle;
								funnel_url_cart = funnel_url+funnel_id+"/"+left_hand+"/"+funnel_handle;
								flag = 1;
								break;
							}
						}
					}
				}
			}
		}


		if(flag == 1){
			console.log("Funnel product found...");
			$('[name="add"]').click(function(e){
				if (typeof this.form !== 'undefined') {
					if (typeof this.form.action !== 'undefined') {
						if ( this.form.action.indexOf('/cart') > -1 ){
							e.preventDefault();
							var add_to_cart_action = '/cart' + this.form.action.split('/cart')[1];
							$('[action="'+add_to_cart_action+'"]').submit();
						}
					}
				}
			});

			$('[action*="/cart/add"]').submit(function(e) {
				e.preventDefault();
				if(add_to_cart_flag){
					add_to_cart_flag = false;
					console.log('add to cart');
					var add_to_cart_url ='/cart/add';
					var data = $(this).serialize();
					$.ajax({
						type: "post",
						url: add_to_cart_url,
						data: data,
						success: function(res) {
							console.log("redirect to funnel through cart");
							shopify_update_cart_data(funnel_id,funnel_url_cart);
							//window.location.href = funnel_url_cart;
						}
					});
				}

			});
		}

		function shopify_update_cart_data(funnel_id,funnel_url) {
            console.log("funnel_url");
            console.log(funnel_url);
			//send cart data to checkout database
			$.getJSON('/cart.js', function(cart) {
				cart_token = cart.token;
				var url = S_P_P + '/checkout/' + cart.token + '/?proces=save_cart_data';
				var data = 'cart=' + encodeURIComponent( JSON.stringify( cart ) ) + '&funnel_id=' + funnel_id;
				$.ajax({
					type: "POST",
					url: url,
					data: data,
					success: function (res){
						console.log("Cart data saved");
						window.location.href = funnel_url;
					}
				});
			});
		}

<?php
	}
?>
