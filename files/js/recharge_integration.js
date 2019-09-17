$( document ).ready(function() {
    if($('#populated_full_rc_div').length > 0 ) {
    	var res = $('#populated_full_rc_div')[0].value;
    	if ($('.rc_add_to_cart').length > 0){
	    	$(res).insertBefore($('.rc_add_to_cart'));
	    	if ( $('#genuine_and_hidden_variants').length > 0 ){
				if ( $('#rc_has_subscription_only').val() == 'true'){
					jQuery.each( $(".rc_purchase_type_autodeliver") , function( i, val ) {
						$(this).attr('name' , $(this).attr('name')+'_'+i);
					});
					$(".rc_purchase_type_autodeliver").prop ("checked",true);
				}else {
					jQuery.each( $(".rc_radio__onetime") , function( i, val ) {
						$(this).attr('name' , $(this).attr('name')+'_'+i);
					});
					jQuery.each( $(".rc_purchase_type_autodeliver") , function( i, val ) {
						$(this).attr('name' , $(this).attr('name')+'_'+i);
					});
					$(".rc_radio__onetime").prop ("checked",true);
				}
				$('#selected_valid_variant').change( function () {
					set_rc_selected_valid_variants();
				});
				$('.rc_select__frequency').change( function () {
					$('.rc_select__frequency').prop('value' , this.value);
				});
			}
    	}
    }
});
 

function set_rc_selected_valid_variants(){
	var selected_valid_variant = $('#selected_valid_variant').val();
	var genuine_and_hidden_variants = $('#genuine_and_hidden_variants')[0].innerHTML;
	genuine_and_hidden_variants = JSON.parse(genuine_and_hidden_variants);
	var hidden_variants = genuine_and_hidden_variants.variants;
	var hidden_price = genuine_and_hidden_variants.price;
	var hidden_compare_at_price = genuine_and_hidden_variants.compare_at_price;
	var rc_selected_valid_variant = hidden_variants[selected_valid_variant];
	var rc_selected_valid_variant_price = hidden_price[rc_selected_valid_variant];
	var rc_hidden_compare_at_price = hidden_compare_at_price[rc_selected_valid_variant];
	$('#rc_selected_valid_variant').val(rc_selected_valid_variant); 
	$('.rc_price').each(function(index, obj){
	 	this.innerHTML = rc_selected_valid_variant_price; 
	});
	if ( $('.rc_purchase_type_autodeliver').length > 0 ) {
		if ( $('.rc_purchase_type_autodeliver')[0].checked == true){
			change_price_short_code(rc_selected_valid_variant_price,rc_hidden_compare_at_price);
		}
	}
}

function default_change_price_short_code(){
	var compare_at_price='';
	var selected_variant_price='';
	var shopify_all_product_information = $('#shopify_all_product_information')[0].value;
	if(shopify_all_product_information != "[]"){
		shopify_all_product_information = JSON.parse(shopify_all_product_information);
		var shopify_all_variants = shopify_all_product_information[1]['shopify_product_variants_list'];
		var selected_valid_variant = $('#selected_valid_variant').val();		
		for (var i=0 ; i<shopify_all_variants.length;i++){
			if ( shopify_all_variants[i]['id']==selected_valid_variant ){
				compare_at_price = shopify_all_variants[i]['compare_at_price'];
				selected_variant_price = shopify_all_variants[i]['price'];
				change_price_short_code(selected_variant_price,compare_at_price);
				return;
			}
		}
	}
} 

function process_rc_customize () {
	if (  $('.rc_purchase_type_autodeliver').length > 0 && $('#genuine_and_hidden_variants').length >0 ){
		if ( $('.rc_purchase_type_autodeliver')[0].checked == true ){
			var subscription_id = $('#rc_subscription_id').val();
			var quantity = $('.shopify_product_quantity').val();
			var variant_id = $('#rc_selected_valid_variant').val();
			var shipping_interval_frequency = $('#rc_shipping_interval_frequency').val();
			var shipping_interval_unit_type = $('#rc_shipping_interval_unit_type').val();
			if(quantity != "0"){
				if(variant_id != ""){
					if(subscription_id != '') {
						show_loading_bar($('.rc_add_to_cart'));
					}
				}
			}
			data = {
				"quantity": quantity,
				"id": variant_id,
				"properties[shipping_interval_frequency]": shipping_interval_frequency, 
				"properties[shipping_interval_unit_type]": shipping_interval_unit_type,            
				"properties[subscription_id]": subscription_id
			}
			jQuery.ajax({
				type: 'POST',
				url: '/cart/add.js',
				data: data,
				dataType: 'json',
				success: function (res){
					shopify_update_cart_data('');
				},
				error: function (res){
					if ( res.status=='200'){
						shopify_update_cart_data('');
					}
				}
			});
		}else{
			show_loading_bar($('.rc_add_to_cart'));
			shopify_add_to_cart(this,'');
		}
	}else {
		show_loading_bar($('.rc_add_to_cart'));
		shopify_add_to_cart(this,'');
	}
}
