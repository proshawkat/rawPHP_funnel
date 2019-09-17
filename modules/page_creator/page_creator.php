<?php
	function generate_json_to_html($html_data, $html_text){
		for($i=0;$i<count($html_data);$i++){
			if($html_data[$i]->endtag == 1){
				$html_text .= '<'.$html_data[$i]->tag.' ';
				foreach ($html_data[$i]->attributes as $key => $value) {
					$html_text .= $key.'="'.str_replace("padding-10px","",$value).'"';
				}
				$html_text .= '>';
				if($html_data[$i]->content != null){
					$html_text .= $html_data[$i]->content;
				}
				if(count($html_data[$i]->nodes)>0){
					$html_text .= generate_json_to_html($html_data[$i]->nodes, '');
				}
				$html_text .= '</'.$html_data[$i]->tag.'>';
			}else{
				$html_text .= '<'.$html_data[$i]->tag.' ';
				foreach ($html_data[$i]->attributes as $key => $value) {
					$html_text .= $key.'="'.str_replace("padding-10px","",$value).'"';
				}
				$html_text .= '/>';
			}
		}

		return $html_text;
	}
	function display_page( $page_id, $funnel_id = 0, $complete_transaction = false, $is_embedded_checkout = false ) {
		global $mysqli,$break,$start,$shop_currency,$shop_id,$before_after_checkout,$cart_token;
		$script_version = '0.0.1';
		$shop_currency = get_shop_meta($shop_id, "shop_currency");
		$shop_money_format = get_shop_meta( $shop_id, "shop_money_format");
		$shop_domain = get_shop_meta( $shop_id, 'shop_domain');
		$all_timer_data = get_page_meta( $page_id, 'all_timer_data' );
		$all_eg_data = get_page_meta( $page_id, 'all_eg_data' );

		$force_ssl = get_shop_meta( $shop_id, 'force_ssl');
		$full_shop_url= ( $force_ssl > 0 ? 'https://' : 'http://' ) . $shop_domain;

		//check which service is enabled for processing credit card
		$credit_card_processor = get_shop_meta( $shop_id, 'credit_card_processor', '' );

		//stripe keys
		$stripe_secret_key = get_shop_meta( $shop_id, 'stripe_secret_key' );
		$stripe_publish_key = get_shop_meta( $shop_id, 'stripe_publishable_key' );

		$res = $mysqli->query("SELECT title, html, status FROM pages WHERE id='$page_id' AND shop_id='$shop_id'");
		if( $res->num_rows > 0 ) {
			$arr = $res->fetch_array( MYSQLI_ASSOC );
			if($arr['status'] == 0 || ( $arr['status'] == 1 && $_COOKIE["i_am_admin"] == "i_am_admin") ){

				if($funnel_id != null && $funnel_id != ""){
					$fb_pixel_id = get_fb_pixel_id($page_id, $funnel_id, $complete_transaction);
				}else{
					$fb_pixel_id = get_fb_pixel_id($page_id, $funnel_id, $complete_transaction);
				}
				$google_analytics_id = get_funnel_meta($funnel_id,"google_analytics_id");
				if($google_analytics_id == ""){
					$google_analytics_id = get_shop_meta($shop_id,"google_analytics_id");
				}

				$product_id = get_page_meta( $page_id, 'product_id' );
				$gfeed = get_page_meta($page_id,"gfeed");
				if($gfeed != ""){
					$gfeed = htmlspecialchars_decode($gfeed);
					$gfeed = str_replace(array("'", "\"", "&quot;","’"), "", $gfeed );
				}
?>
<!DOCTYPE HTML>
<html>
	<head>
		<meta http-equiv="Content-Type" content=" charset=UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<?php 
			/*Enable ecomisoft apps on page preview*/
			if( get_page_meta( $page_id, 'ecomisoft_app_recommendr' ) == 'on' ) $async_load[] = '"https:\/\/dropshipr.co\/apps\/recommendr\/files\/js\/recommendr.js?shop=' . $_REQUEST['shop'] . '"';
			if( get_page_meta( $page_id, 'ecomisoft_app_lately' ) == 'on' ) $async_load[] = '"https:\/\/dropshipr.co\/apps\/lately\/files\/js\/lately.js?shop=' . $_REQUEST['shop'] . '"';

			$async_script_urls = '';
			foreach( $async_load as $al ) {
				$async_script_urls .= ( $async_script_urls == '' ? '' : ',' ) . $al;
			}
		?>
		<script>
			var shopify_proxy_prefix = '<?php echo SHOPIFY_PROXY_PREFIX ?>';
			var uuid = '<?php echo $cart_token ?>';
			var shop = '<?php echo  $shop_domain; ?>';
		</script>
		<script type="text/javascript">
		//<![CDATA[
		      var Shopify = Shopify || {};
		      Shopify.shop = "<?php echo $_REQUEST['shop'] ?>";
		//]]>
		</script>
		
		
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
		<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
		<link rel="stylesheet" href="<?php echo BASE; ?>/files/css/display.css?ver=<?php echo SCRIPT_VERSION ?>">
		<link rel="stylesheet" href="<?php echo BASE; ?>/files/css/common_style.css?ver=<?php echo SCRIPT_VERSION ?>">
		<link rel="stylesheet" href="<?php echo BASE; ?>/files/css/nprogress.css?ver=<?php echo SCRIPT_VERSION ?>">
		<link rel="stylesheet" href="<?php echo BASE; ?>/files/css/progress_bar.css?ver=<?php echo SCRIPT_VERSION ?>">
		<link rel="stylesheet" href="<?php echo BASE; ?>/files/editorscript/css/loading_style.css?ver=<?php echo SCRIPT_VERSION ?>">

	
        <link rel="stylesheet" href="https://customcat.mylocker.net/css/jquery.fancybox.css?v=2.1.5">

		<script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
		<script src="<?php echo BASE; ?>/files/js/bootstrap.min.js"></script>

        <script src="<?php echo BASE; ?>/files/js/customcat_integration.js?ver=<?php echo SCRIPT_VERSION ?>"></script>
        <script src="<?php echo BASE; ?>/files/js/recharge_integration.js?ver=<?php echo SCRIPT_VERSION ?>"></script>
        <script src="https://customcat.mylocker.net/js/jquery.fancybox.pack.js?v=2.1.5"></script>

		<?php if( ( $stripe_publish_key != '' ) && ( $credit_card_processor != 'nmi' ) && ( $credit_card_processor != 'bluesnap' )) { ?><script type="text/javascript" src="https://js.stripe.com/v2/"></script>
		<script type="text/javascript">
		  	Stripe.setPublishableKey('<?php echo $stripe_publish_key ?>');
		</script><?php } ?>
	
		<!-- <script src="<?php echo BASE; ?>/files/editorscript/custom_templates/template-dependency/funnel-template.js"></script> -->
		<script type="text/javascript"> var shop = '<?php echo $_REQUEST['shop']; ?>';
		var base = '<?php echo BASE; ?>';</script>
		<script src='https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.4.0/moment.min.js'></script>
		<script src="<?php echo BASE; ?>/files/js/display.js?ver=<?php echo SCRIPT_VERSION ?>"></script>
		<script src="<?php echo BASE; ?>/files/js/fbpixel.js?ver=<?php echo SCRIPT_VERSION ?>"></script>
		<script src="<?php echo BASE; ?>/files/js/nprogress.js?ver=<?php echo SCRIPT_VERSION ?>"></script>

		<title><?php echo $arr['title']; ?></title>
		
		<?php
			$shopify_all_product_information = get_shopify_all_product_information($page_id);
			$product_name = json_decode($shopify_all_product_information);
			$product_name = $product_name[3]->shopify_product_name;

			$shopify_product_sku = json_decode($shopify_all_product_information);
			$shopify_product_sku = $shopify_product_sku[4]->shopify_product_sku;

			$shopify_product_price = json_decode($shopify_all_product_information);
			$shopify_product_price = $shopify_product_price[5]->shopify_product_price;

			$shopify_product_variant = json_decode($shopify_all_product_information);
			$shopify_product_variant = $shopify_product_variant[1]->shopify_product_variants_list[0]->id;
			
			if(get_shop_meta($shop_id,"trackify") == "enable"){
				//echo "trackify enabled";
				$trackify_src = 'https://app.redretarget.com/sapp/pixel?product_ids[]=&store_name='.$_REQUEST['shop'].'&event_type=';
				echo '<script>'.file_get_contents($trackify_src).'</script>';
				if( !$is_embedded_checkout ) {
					if($product_id != ""){
						if($gfeed != ""){
							$gfeed = htmlspecialchars_decode($gfeed);
							$gfeed = str_replace(array("'", "\"", "&quot;","’"), "", $gfeed );
						}
						//echo '<script>fbq_view_content("Trackify ViewContent","product_group","'.$gfeed.'","'.$shopify_product_variant.'","'.$shopify_product_price.'","1","'.$shop_currency.'","trackify")</script>';
						echo '<script>fbq_view_content("Trackify ViewContent","product_group","'.$gfeed.'","'.$product_id.'","'.$shopify_product_price.'","1","'.$shop_currency.'","trackify")</script>';
					}
				}else{
					
					echo '<script>fbq_initiate_checkout("Trackify InitiateCheckout");</script>';
					//echo '<script>trigger_fbq_viewcart_event();</script>';
				}				
			}else{
				if($fb_pixel_id != null){
		?>
					<!-- Facebook Pixel Code -->
					<script>
					!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
					n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
					n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
					t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
					document,'script','https://connect.facebook.net/en_US/fbevents.js');
					fbq_init('<?php echo $fb_pixel_id; ?>');
					fbq_page_view();
					<?php 
						$shopify_all_product_information_array = json_decode($shopify_all_product_information, true);
						$variant_ids = '[' . $shopify_all_product_information_array[1]['shopify_product_variants_list'][0]['product_id'];
						foreach ($shopify_all_product_information_array[1]['shopify_product_variants_list'] as $value) {
							$variant_ids .= ',' . $value['id'];
						}
						$variant_ids .= ']';
						if( !$is_embedded_checkout ) {
							if($product_id != ""){
								if($gfeed != ""){
									$gfeed = htmlspecialchars_decode($gfeed);
									$gfeed = str_replace(array("'", "\"", "&quot;","’"), "", $gfeed );
								}
								echo 'fbq_view_content("ViewContent","product_group","'.$gfeed.'","'.$variant_ids.'","'.$shopify_product_price.'","1","'.$shop_currency.'","funnel")';
							}
						}else{
							echo 'trigger_fbq_viewcart_event();';
							echo 'fbq_initiate_checkout("InitiateCheckout");';
						}
					?>
					</script>
					<noscript><img height="1" width="1" style="display:none"
					src="https://www.facebook.com/tr?id=<?php echo $fb_pixel_id; ?>&ev=PageView&noscript=1"
					/></noscript>
					<!-- DO NOT MODIFY -->
					<!-- End Facebook Pixel Code -->
		<?php
				}
			}
			if($google_analytics_id != ""){
		?>
				<script>
					var google_analytics_id_found = true;
					(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
					(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
					m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
					})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
					ga('create', '<?php echo $google_analytics_id; ?>', 'auto');
					ga('require', 'ec');
					gaee_page_view();
					<?php 
						if( !$is_embedded_checkout ) {
							if($product_id != ""){
								echo 'gaee_product_view('.$shopify_all_product_information.',"'.$shop_currency.'");';
							}
						}else{
							echo 'gaee_checkout_step1();';
						}
					?>
				</script>
		<?php
			}
			else{	?>
				<script>
					var google_analytics_id_found = false;
				</script>
		<?php	}
			if(get_page_meta( $page_id,'seo_page_title') != ""){
				echo '<meta name="title" content="'.get_page_meta( $page_id,'seo_page_title').'" />';
				echo '<meta name="twitter:title" content="'.get_page_meta( $page_id,'seo_page_title').'">';
				echo '<meta property="og:title" content="'.get_page_meta( $page_id,'seo_page_title').'" />';
			}
			if(get_page_meta( $page_id,'seo_page_description') != ""){
				echo '<meta name="description" content="'.get_page_meta( $page_id,'seo_page_description').'" />';
				echo '<meta name="twitter:description" content="'.get_page_meta( $page_id,'seo_page_description').'">';
				echo '<meta property="og:description" content="'.get_page_meta( $page_id,'seo_page_description').'" />';
			}
			if(get_page_meta( $page_id,'seo_page_image') != ""){
				echo '<meta name="twitter:card" content="photo" data-page-subject="true">';
				echo '<meta name="twitter:image:width" content="640" data-page-subject="true">';
				echo '<meta property="og:image" content="'.get_page_meta( $page_id,'seo_page_image').'" />';
				echo '<meta name="twitter:image" content="'.get_page_meta( $page_id,'seo_page_image').'" />';
			}
			$current_link = "https://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
		?>

		<meta name="twitter:url" content="<?php echo $full_shop_url; ?>" data-page-subject="true">
		<meta name="twitter:creator" content="@tlcright" data-page-subject="true">

		<?php echo get_page_meta($page_id,"custom_script"); ?>
		<?php echo get_page_meta($page_id,"custom_css"); ?>
	</head>
	<body style="<?php echo get_page_meta( $page_id, 'body_css' ); ?>">
		<?php echo get_page_meta($page_id,"custom_body_script"); ?>
		<?php
			$html_data = json_decode($arr['html']);
			$html_text = '';
			echo generate_json_to_html($html_data, $html_text);
			$msg_array = get_msg_val();
		?>
		<textarea id="shopify_all_product_information" rows="50" cols="100" hidden><?php echo $shopify_all_product_information; ?></textarea>
		<textarea id="shopify_bundle_product_variants" rows="50" cols="100" hidden><?php echo get_page_meta($page_id, "bundle_products"); ?></textarea>
		<input type="hidden" id="full_shop_url" value="<?php echo $full_shop_url ?>">
		<input type="hidden" id="add_to_cart_option" value="true">
		<input type="hidden" id="selected_product_quantity" value="1">
		<input type="hidden" id="selected_valid_variant"  value="">
		<input type="hidden" id="page_id" value="<?php echo $page_id; ?>">
		<input type="hidden" id="funnel_id" value="<?php echo $funnel_id; ?>">
		<input type="hidden" id="auto_add_clear_cart" value="<?php echo get_page_meta($page_id,'auto_add_clear_cart'); ?>">
		<textarea id="auto_add_products" rows="50" cols="100" hidden><?php echo get_page_meta($page_id, "auto_add_products"); ?></textarea>
		<?php
			if ($product_id != '') { ?>
			<input type="hidden" id="product_id" value="<?php echo $product_id; ?>">
			<?php
				$rc_token= get_shop_meta($shop_id , 'rc_token');
				if ($rc_token != ''){
					global $token;
					$rc_true = false ;
					require_once 'includes/shopify.php';
					$sc = new ShopifyClient($_REQUEST['shop'], $token, SHOPIFY_API_KEY, SHOPIFY_SECRET);
					$product_metafields = $sc->call('GET', '/admin/products/'.$product_id.'/metafields.json');
					foreach ($product_metafields as $product_metafield) {
				    	if ($product_metafield['key'] == 'subscription_id'&&$product_metafield['value']!= ''){
				    	?>
				    	<textarea id="populated_full_rc_div" hidden ><?php populate_rc_div($product_id , $shop_currency , $_REQUEST['shop']); ?></textarea> 
				    	<input type="hidden" id="rc_selected_valid_variant" value="">
				    	<?php
							break;
				    	}
				    }
				}
			?>
		<?php }
		?>
		<input type="hidden" id="shop_currency" value="<?php echo $shop_currency; ?>">
		<input type="hidden" id="exit_popup_status" value="<?php echo get_page_meta( $page_id, 'exit_popup_status' ); ?>">
		<input type="hidden" id="_is_shipping_tax_applicable" value="<?php echo get_shop_meta( $shop_id, "shop_tax_shipping" ); ?>">
		<input type="hidden" id="_is_tax_included" value="<?php echo get_shop_meta( $shop_id, "shop_taxes_included" ); ?>">
		<input type="hidden" id="gfeed" value="<?php echo $gfeed; ?>">
		<input type="hidden" id="before_after_checkout" value="<?php echo $before_after_checkout; ?>">
		<?php
			if($_REQUEST['pamt_ref'] == "true" && !$is_embedded_checkout ){
				$pay_pal_checkout = 'true';
			}else{
				$pay_pal_checkout = 'false';
			}
		?>
		<input type="hidden" id="pay_pal_checkout" value="<?php echo $pay_pal_checkout; ?>">
		<?php 
			if(get_shop_meta($shop_id,"trackify") == "enable"){
		?>
				<input type="hidden" name="facebook_pixel_id" id="facebook_pixel_id" value="1234567890">
		<?php
			}else{
		?>
				<input type="hidden" name="facebook_pixel_id" id="facebook_pixel_id" value="<?php echo $fb_pixel_id; ?>">
		<?php
			}
		?>
		<textarea id="all_timer_data" rows="2" cols="100" hidden><?php echo $all_timer_data ?></textarea>
    	<textarea id="all_eg_data" rows="2" cols="100" hidden><?php echo $all_eg_data ?></textarea>

    	<?php 
    		$shop_money_format = get_shop_meta( $shop_id, 'shop_money_format' );
    		$shop_money_format = str_replace('"', "&quot;", $shop_money_format);

			$cart_bump_headline = get_shop_meta( $shop_id, 'cart_bump_headline' );
			if( $cart_bump_headline == '' ) $cart_bump_headline = 'Select one option';
			$cart_bump_template = get_shop_meta( $shop_id, 'cart_bump_template' );
			if( $cart_bump_template == '' ) $cart_bump_template = 'Add [NUMBER_OF_ITEMS] More [PRODUCT_TITLE] to Your Order! Just pay additional [PRODUCT_TOTAL_PRICE].';
		?>
		<input type="hidden" id="cart_bump_headline" value="<?php echo $cart_bump_headline; ?> ">		
		<textarea id="cart_bump_template" style="display:none"><?php echo $cart_bump_template; ?></textarea>
		<input type="hidden" id="cart_bump_items" value="<?php echo get_shop_meta( $shop_id, 'cart_bump_items' ); ?>">
		<input type="hidden" id="shop_money_format" value="<?php echo $shop_money_format; ?>">
		<textarea id="translator_settings" style="display:none"><?php echo json_encode($msg_array); ?></textarea>

		<input type="hidden" id="credit_card_processor" value="<?php echo get_shop_meta( $shop_id, 'credit_card_processor' ); ?>">

		<!-- Modal -->
		<div class="modal fade" id="cartBumpModal" tabindex="-1" role="dialog" aria-labelledby="cartBumpModalLabel">
		  	<div class="modal-dialog" role="document">
		    	<div class="modal-content">
		      		<div class="modal-header">
		        		<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		       			<h4 class="modal-title" id="cartBumpModalLabel"><?php echo $msg_array['cart_bump_popup_title'] ; ?></h4>
		      		</div>
		      		<div class="modal-body" id="cartBumpModalBody">
		      		</div>
		      		<div class="modal-footer">
		        		<button type="button" class="btn btn-danger" data-dismiss="modal" id="cart_bump_cancel"><?php echo $msg_array['cart_bump_cancel_btn'] ; ?></button>
		        		<button type="button" class="btn btn-primary" id="cart_bump_button" data-dismiss="modal"><?php echo $msg_array['cart_bump_add_to_cart_btn'] ; ?></button>
		      		</div>
		    	</div>
		  	</div>
		</div>
		<!-- Modal -->
		<div class="modal fade" id="page_mgs_modal" role="dialog">
			<div class="modal-dialog modal-md">
			  <div class="modal-content">
			    <div class="modal-header">
			      <button type="button" class="close" data-dismiss="modal">&times;</button>
			      <h4 class="modal-title" id="page_mgs_header"></h4>
			    </div>
			    <div class="modal-body" id="page_mgs_body">
			    </div>
			    <div class="modal-footer">
			      <button type="button" class="btn btn-default" data-dismiss="modal" id="page_mgs_ok_btn">Ok</button>
			    </div>
			  </div>
			</div>
			</div>
		</div>
		<button id="exit_popup_btn" type="button" class="btn hidden" data-toggle="modal" data-target="#exit_popup">Open Modal</button>
		<div id="normal_loading" style="font-size: 30px;position: fixed;top: 40%;right: 50%; display: none;"><i class="fa fa-spinner fa-spin" aria-hidden="true"></i></div>
		<div class="loader" hidden></div>
	<script type="text/javascript">
        $(function() {
            refresh_this_page();
            overflow_control($('body'));
        });
    </script>
	</body>
</html>
<?php
			}else{
				echo display404($full_shop_url);
			}
		}else{
			echo display404($full_shop_url);
		}
	}

	function populate_rc_div($product_id , $shop_currency, $shop){ 
		global $token;
        require_once 'includes/shopify.php';
        $sc = new ShopifyClient($shop,$token, SHOPIFY_API_KEY, SHOPIFY_SECRET);
        $shop_metafields = $sc->call('GET', '/admin/metafields.json');
        $rc_background_color = '';
        $rc_font_color = '';
        $rc_how_it_works = '';
        $rc_learnmore_verbiage = '';
        $rc_popup_background_color = '';
        $rc_popup_link_color = '';
        $rc_popup_text_color = '';
        $rc_onetime_message = '';
        $rc_subscribe_message = '';
        $rc_subscription_details_verbiage = '';
        foreach ($shop_metafields as $rc_shop_metafield) {
        	if($rc_shop_metafield['namespace'] == 'subscriptions'){
        		if ($rc_shop_metafield['key'] == 'background_color') {
        			$rc_background_color = $rc_shop_metafield['value'];
        		}
        		else if ($rc_shop_metafield['key'] == 'font_color') {
        			$rc_font_color = $rc_shop_metafield['value'];
        		}
        		else if ($rc_shop_metafield['key'] == 'how_it_works') {
        			$rc_how_it_works = $rc_shop_metafield['value'];
        		}
        		else if ($rc_shop_metafield['key'] == 'learnmore_verbiage') {
        			$rc_learnmore_verbiage = $rc_shop_metafield['value'];
        		}
        		else if ($rc_shop_metafield['key'] == 'popup_background_color') {
        			$rc_popup_background_color = $rc_shop_metafield['value'];
        		}
        		else if ($rc_shop_metafield['key'] == 'popup_link_color') {
        			$rc_popup_link_color = $rc_shop_metafield['value'];
        		}
        		else if ($rc_shop_metafield['key'] == 'popup_text_color') {
        			$rc_popup_text_color = $rc_shop_metafield['value'];
        		}
        		else if ($rc_shop_metafield['key'] == 'popup_text_color') {
        			$rc_popup_text_color = $rc_shop_metafield['value'];
        		}
        		else if ($rc_shop_metafield['key'] == 'onetime_message') {
        			$rc_onetime_message = $rc_shop_metafield['value'];
        		}
        		else if ($rc_shop_metafield['key'] == 'subscribe_message') {
        			$rc_subscribe_message = $rc_shop_metafield['value'];
        		}
        		else if ($rc_shop_metafield['key'] == 'subscription_details_verbiage') {
        			$rc_subscription_details_verbiage = $rc_shop_metafield['value'];
        		}
        	}
        }

        $product_metafields = $sc->call('GET', '/admin/products/'.$product_id.'/metafields.json');
        $product_variants = $sc->call('GET', '/admin/products/'.$product_id.'.json');
        $product_variants = $product_variants['variants'];
        foreach ($product_metafields as $product_metafield) {
            if ($product_metafield['key'] == 'subscription_id'){
                $subscription_id = $product_metafield['value'];
            }
            if ($product_metafield['key'] == 'has_subscription'){
                $has_subscription = $product_metafield['value'];
            }
            if ($product_metafield['key'] == 'is_subscription_only'){
                $is_subscription_only = $product_metafield['value'];
            }
            if ($product_metafield['key'] == 'shipping_interval_unit_type'){
                $shipping_interval_unit_type = $product_metafield['value'];
            }
            if ($product_metafield['key'] == 'shipping_interval_frequency'){
                $shipping_interval_frequency = $product_metafield['value'];  
            }
            if ($product_metafield['key'] == 'discount_product_id'){
                $discount_product_id = $product_metafield['value'];  
            }
            if ($product_metafield['key'] == 'discount_percentage'){
                $discount_percentage = $product_metafield['value'];  
            }
        }
		
		try{
			$discount_product = $sc->call('GET', '/admin/products/'.$discount_product_id.'.json');
		}
		catch (Exception $e){
			return;
		}
        
        $discount_product_variants =  $discount_product['variants'] ;

        $genuine_and_hidden_variants = [];
        for ($i=0 ; $i<count($discount_product_variants);$i++){
    		$genuine_and_hidden_variants['variants'][''.$product_variants[$i]['id'].''] =$discount_product_variants[$i]['id'] ;
    		$genuine_and_hidden_variants['price'][''.$discount_product_variants[$i]['id'].''] =$discount_product_variants[$i]['price'] ;
    		$genuine_and_hidden_variants['compare_at_price'][''.$discount_product_variants[$i]['id'].''] =$discount_product_variants[$i]['compare_at_price'] ;
        }
        $shipping_interval_frequency = explode(',', $shipping_interval_frequency);
        $int_option = '';
        foreach ($shipping_interval_frequency as $key) {
            $int_option .= '<option value="'.$key.'">'.$key.' '.$shipping_interval_unit_type.'</option>';
        }
        if ($has_subscription == 'True') {
            if ($is_subscription_only == 'true') {
                # show only one option
                $html = '
                <link href="//rechargeassets-bootstrapheroes-rechargeapps.netdna-ssl.com/static/css/widget.css" rel="stylesheet" type="text/css">
                <style>
			        /* Widget: Purchase options */
			        label.rc_label span{
			            color: '. ($rc_font_color == '' ? '#000000' :  $rc_font_color ).';
			        }
			        div.rc_block__type--active {
			            background-color: '. ($rc_background_color == '' ? '#F8F8F8' :  $rc_background_color ).'!important;
			        }
			        div.rc_block__type--active label.rc_label {
			            color: #676767;
			        }
			        /* Widget: Popup */
			        div.rc_popup__block {
			            z-index: 56;
			        }
			        div.rc_popup__block:before {
			            border-bottom-color: '. ($rc_popup_background_color == '' ? '#474747' :  $rc_popup_background_color ).';
			        }
			        div.rc_popup__block {
			            background-color: '. ($rc_popup_background_color == '' ? '#474747' :  $rc_popup_background_color ).';
			        }
			        div.rc_popup__close,
			        div.rc_popup__block__content,
			        div.rc_popup__block__content strong {
			            color: '. ($rc_popup_text_color == '' ? '#FFFFFF' :  $rc_popup_text_color ).'!important;
			        }
			        div.rc_popup__block__content a {
			            color: '. ($rc_popup_link_color == '' ? '#4DD6B7' :  $rc_popup_link_color ).'!important;
			        }
			        /* ReCharge CSS */
			        
			        /* Add Custom CSS Below */
			    </style>
			    <div id="genuine_and_hidden_variants" hidden> '.json_encode($genuine_and_hidden_variants).' </div>
    			<div id="rc_container" class="rc_subscription-only">
                    <input type="hidden" id="rc_subscription_id" value="'.$subscription_id.'">
                    <input type="hidden" id="rc_shipping_interval_unit_type" value="'.$shipping_interval_unit_type.'">
                    <input type="hidden" id="rc_has_subscription_only" value="true">
                    <div class="rc_block rc_block__type rc_block__type__autodeliver">
                    	<input type="radio" id="rc_purchase_type_autodeliver" name="purchase_type_autodeliver" data-productid="20566573071" value="autodeliver" class="rc_radio rc_radio__autodeliver  rc_purchase_type_autodeliver"  hidden>
                         <div id="rc_autodeliver_options " class="rc_block rc_block__type__options rc_autodeliver_options">
                            <label for="rc_shipping_interval_frequency" class="rc_label rc_label__deliver_every">
                                <span class="rc_label__delivery">Deliver every</span>
                                <select name="rc_shipping_interval_frequency" id="rc_shipping_interval_frequency" data-productid="'.$product_id.'" class="rc_select rc_select__frequency">'.$int_option.'</select>
                            </label>
                        </div>
                    </div>
                    <div class="rc_popup">
                        <div class="rc_popup__hover">
                                <img src="//rechargestatic-bootstrapheroes.netdna-ssl.com/static/images/widget/rc_widget__icon__black@2x.png" height="21" width="18" class="rc_popup__icon"> 
                            
                            '.($rc_subscription_details_verbiage == '' ? 'Subscription details' :  $rc_subscription_details_verbiage ).'
                            <div class="rc_popup__block">
                                <div class="rc_popup__block__content">
                                    <div class="rc_popup__close" style="display: none;">x</div>
                                    '.($rc_how_it_works == '' ? '<strong>How subscriptions work</strong><br><br>Products are automatically delivered on your schedule. No obligation, modify or cancel your subscription anytime.' :  $rc_how_it_works ).'
                                    
                                        <br><a href="http://rechargepayments.com/subscribe-with-recharge" target="_blank">'.($rc_learnmore_verbiage == '' ? 'Learn more...' :  $rc_learnmore_verbiage ).'</a>
                                </div>
                                <div class="rc_popup__block__footer">
                                    <a href="http://rechargepayments.com/subscribe-with-recharge" target="_blank">
                                        <img src="//rechargestatic-bootstrapheroes.netdna-ssl.com/static/images/widget/rc_widget__banner@2x.png" height="28" width="153" class="rc_popup__badge">
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>';
            }
            else{
                $html = '
                <link href="//rechargeassets-bootstrapheroes-rechargeapps.netdna-ssl.com/static/css/widget.css" rel="stylesheet" type="text/css">
                <script>
                    $(".rc_radio").on("change", function(){ 
                       if(this.checked){
                            if (this.id == "rc_purchase_type_onetime"){
                            	default_change_price_short_code();

                            	$( ".rc_radio__onetime" ).prop( "checked", true );
                            	$(".rc_purchase_type_autodeliver").prop ("checked",false);

								$(".rc_autodeliver_options").each(function(index, obj){
									$(this).hide();
								});
                                $(".rc_block__type__onetime").addClass("rc_block__type--active");
                                $(".rc_block__type__autodeliver").removeClass("rc_block__type--active");

                            }else if (this.id == "rc_purchase_type_autodeliver"){
                            	set_rc_selected_valid_variants();

                            	$(".rc_purchase_type_autodeliver").prop ("checked",true);
                            	$(".rc_radio__onetime").prop ("checked",false);

								$(".rc_autodeliver_options").each(function(index, obj){
									$(this).show();
								});
                                $(".rc_block__type__autodeliver").addClass("rc_block__type--active");
                                $(".rc_block__type__onetime").removeClass("rc_block__type--active");
                            }
                        }
                    })

                </script>
                <style>
			        /* Widget: Purchase options */
			        label.rc_label {
			            color: '. ($rc_font_color == '' ? '#000000' :  $rc_font_color ).';
			        }
			        div.rc_block__type--active {
			            background-color: '. ($rc_background_color == '' ? '#F8F8F8' :  $rc_background_color ).';
			            padding: 8px !important;
			        }
			        div.rc_block{
			        	padding: 8px !important;
			        }
			        div.rc_block__type--active label.rc_label {
			            color: #676767;
			        }
			        /* Widget: Popup */
			        div.rc_popup__block {
			            z-index: 56;
			        }
			        div.rc_popup__block:before {
			            border-bottom-color: '. ($rc_popup_background_color == '' ? '#474747' :  $rc_popup_background_color ).';
			        }
			        div.rc_popup__block {
			            background-color: '. ($rc_popup_background_color == '' ? '#474747' :  $rc_popup_background_color ).' !important;
			        }
			        div.rc_popup__close,
			        div.rc_popup__block__content,
			        div.rc_popup__block__content strong {
			            color: '. ($rc_popup_text_color == '' ? '#FFFFFF' :  $rc_popup_text_color ).'!important;
			        }
			        div.rc_popup__block__content a {
			            color: '. ($rc_popup_link_color == '' ? '#4DD6B7' :  $rc_popup_link_color ).'!important;			        }
			        /* ReCharge CSS */
			        
			        /* Add Custom CSS Below */
			    </style>
			    <div id="genuine_and_hidden_variants" hidden> '.json_encode($genuine_and_hidden_variants).' </div>
    			<div id="rc_container" class="rc_subscription-only">
                    <input type="hidden" id="rc_subscription_id" value="'.$subscription_id.'">
                    <input type="hidden" id="rc_shipping_interval_unit_type" value="'.$shipping_interval_unit_type.'">
                    <input type="hidden" id="rc_has_subscription_only" value="false">
                    <div style="text-align: left;display: inline-block;">
	                    <div class="rc_block rc_block__type rc_block__type__onetime rc_block__type--active">
	                        <input type="radio" id="rc_purchase_type_onetime" name="rc_purchase_type_onetime" data-productid="'.$product_id.'" value="onetime" class="rc_radio rc_radio__onetime">
	                        <label for="rc_purchase_type_onetime" class="rc_label rc_label__onetime">
	                            '.($rc_onetime_message == '' ? 'One-time purchase' :  $rc_onetime_message ).'</label>
	                    </div>
	                    <div class="rc_block rc_block__type rc_block__type__autodeliver" >
	                        <input type="radio" id="rc_purchase_type_autodeliver" name="purchase_type_autodeliver" data-productid="20566573071" value="autodeliver" class="rc_radio rc_radio__autodeliver  rc_purchase_type_autodeliver">
	                        <label for="rc_purchase_type_autodeliver" class="rc_label rc_label__autodeliver">
	                            '.($rc_subscribe_message == '' ? 'Subscribe & save' :  $rc_subscribe_message ).' ('.number_format($discount_percentage).'% : '.$shop_currency.'<span id="rc_price" class="rc_price"></span>)</label>
	                         <div id="rc_autodeliver_options" class="rc_block rc_block__type__options rc_autodeliver_options" style="display:none;">
	                            <label for="rc_shipping_interval_frequency" class="rc_label rc_label__deliver_every">
	                                <span class="rc_label__delivery">Deliver every</span>
	                                <select name="rc_shipping_interval_frequency" id="rc_shipping_interval_frequency" data-productid="'.$product_id.'" class="rc_select rc_select__frequency">'.$int_option.'</select>
	                            </label>
	                        </div>
	                    </div>
	                    <div class="rc_popup">
	                        <div class="rc_popup__hover">
	                                <img src="//rechargestatic-bootstrapheroes.netdna-ssl.com/static/images/widget/rc_widget__icon__black@2x.png" height="21" width="18" class="rc_popup__icon"> 
	                            '.($rc_subscription_details_verbiage == '' ? 'Subscription details' :  $rc_subscription_details_verbiage ).'
	                            <div class="rc_popup__block" >
	                                <div class="rc_popup__block__content">
	                                    <div class="rc_popup__close" style="display: none;">x</div>
	                                    '.($rc_how_it_works == '' ? '<strong>How subscriptions work</strong><br><br>Products are automatically delivered on your schedule. No obligation, modify or cancel your subscription anytime.' :  $rc_how_it_works ).'
	                                    
	                                        <br><a href="http://rechargepayments.com/subscribe-with-recharge" target="_blank">'.($rc_learnmore_verbiage == '' ? 'Learn more...' :  $rc_learnmore_verbiage ).'</a>
	                                </div>
	                                <div class="rc_popup__block__footer">
	                                    <a href="http://rechargepayments.com/subscribe-with-recharge" target="_blank">
	                                        <img src="//rechargestatic-bootstrapheroes.netdna-ssl.com/static/images/widget/rc_widget__banner@2x.png" height="28" width="153" class="rc_popup__badge">
	                                    </a>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
	                </div>
                </div>';
            }
            echo $html;
        }
    }

	function get_shopify_all_product_information($page_id){
		global $token;
		$product_id = get_page_meta( $page_id, 'product_id' );
		$json_text = array();
		if($product_id != ""){
			require_once 'includes/shopify.php';
			$sc = new ShopifyClient($_REQUEST['shop'], $token, SHOPIFY_API_KEY, SHOPIFY_SECRET);
			try {
			    $shopify_product = $sc->call('GET', '/admin/products/' . $product_id . '.json');
			} catch (Exception $e) {
			    $product_id = '';
			}
			
			if( $product_id != '' ) {
				//start product variant and quantity select option
				$shopify_product_variants_div = array();
				
				foreach ($shopify_product['options'] as $option) {
					$temp_select_variant = "";
				    foreach ($option['values'] as $value) {
				    	/*if( strpos( $value, '"' ) !== false ) $quoted_value = "'" . $value . "'";
				    	else $quoted_value = '"' . $value . '"';*/

				    	$quoted_value = str_replace( '"', '\"', $value );


				    	$temp_select_variant .= '<option value="'.$quoted_value.'">'.$value.'</option>';
				    }

				    $shopify_product_variants_div['variant_'.str_replace(' ', '-', $option['name'])] = $temp_select_variant;
				}

				$temp_arr = array();
				$temp_arr['shopify_product_variants_div'] = $shopify_product_variants_div;
				$json_text[] = $temp_arr;
				//end product variant and quantity select option

				//start product variant list
				$variant_id_and_text = array();

				foreach ($shopify_product['variants'] as $variant) {
					//$variant_id_and_text[] = array($variant['id']=>$variant['title']);
				}
				foreach ($shopify_product['variants'] as $variant) {
					$variant_id_and_text[] = $variant;
				}
				$temp_arr = array();
				$temp_arr['shopify_product_variants_list'] = $variant_id_and_text;
				$json_text[] = $temp_arr;
				//start product variant list

				$shopify_product_images = $sc->call('GET', '/admin/products/' . $product_id . '/images.json');
				$temp_arr = array();
				$temp_arr['shopify_product_images'] = $shopify_product_images;
				$json_text[] = $temp_arr;


				$temp_arr = array();
				$temp_arr['shopify_product_name'] = $shopify_product['title'];
				$json_text[] = $temp_arr;

				$temp_arr = array();
				$temp_arr['shopify_product_sku'] = $shopify_product['variants'][0]['sku'];
				$json_text[] = $temp_arr;

				$temp_arr = array();
				$temp_arr['shopify_product_price'] = $shopify_product['variants'][0]['price'];
				$json_text[] = $temp_arr;
			}
		}


		return json_encode($json_text);
	}
	
	function get_fb_pixel_decision($page_id, $funnel_id, $complete_transaction){
		$decision = "";
		
		
		return $decision;
	}
	
	function get_fb_pixel_id($page_id, $funnel_id, $complete_transaction){
		global $shop_id;
		$pixel_id = null;
		if($funnel_id == null){
			if(get_shop_meta($shop_id,"facebook_pixel_id") == ""){
				$pixel_id = null;
			}else{
				$pixel_id = get_shop_meta($shop_id,"facebook_pixel_id");
			}
			return $pixel_id;
		}
		if(get_funnel_meta($funnel_id,"facebook_pixel_id") == ""){
			if(get_shop_meta($shop_id,"facebook_pixel_id") == ""){
				$pixel_id = null;
			}else{
				$pixel_id = get_shop_meta($shop_id,"facebook_pixel_id");
			}
		}else{
			$pixel_id = get_funnel_meta($funnel_id,"facebook_pixel_id");
		}
		
		return $pixel_id;
	}

	function display404($full_shop_url){
	?>
	<!DOCTYPE html>
	<html>
	<head>
		<title>Sorry, page not found</title>
		<!-- Latest compiled and minified CSS -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

		<!-- Optional theme -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

		<!-- Latest compiled and minified JavaScript -->
		<script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
	</head>

	<style>
		body{
			background-color: #f4f6f8;
		}
		.text-middle{
			position: absolute;
			top: 45%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		.error{
			font-size: 150px;
			color: #286090;
			/*color: #00695C;*/
			padding: 0px;
			margin: 0px;
			border: 0px;
		}

		.error-msg{
			padding-top: 0px;
			padding-bottom: 10px;
			color: rgba(40, 79, 113, 0.70);
		}

		.btn-home{
			color: #1A237E;
			font-weight: bold;
			border-radius: 50px;
			border: 2px solid #1A237E;
			padding: 10px 30px 10px 30px;
		}

		.btn-home:hover{
			background-color: #eee;
	    	color: #1a237e ;
		}
	</style>

	<body>
	<div class="container-fluid">
		<div class="text-middle text-center">
			<h1 class="error">404</h1>
			<div class="error-msg">
				<h2 style="font-size: 22px;">The link you clicked may be broken or the page may have been removed.</h2>
				<p>PLEASE GO BACK TO HOME PAGE OR CONTACT US FOR REPORTING THE ISSUE</p>
			</div>
			<a class="btn btn-home" href="<?php echo $full_shop_url; ?>">Home page</a>
		</div>
	</div>
	</body>
	</html>
<?php
	}
?>
