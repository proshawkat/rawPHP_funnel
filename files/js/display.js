var valid_variant_bool = false;

//some public translator variable
var product_available = "Product available";//okk
var out_of_stock = "Out of stock";//okk
var cart_empty_msg = "Your cart is currently empty";//okk
var shipping_billing_error = {};//okk
	shipping_billing_error['error_shipping_method'] = 'Please, complete your shipping address with zip code, state/territory/province and country information.';
	shipping_billing_error['error_shipping_method2'] = 'No shipping method found for your given shipping address';
	shipping_billing_error['error_shipping_form_email'] = 'Please enter a valid email address';
	shipping_billing_error['error_shipping_last_name'] = 'Please enter your last name';
	shipping_billing_error['error_shipping_address'] = 'Please enter your address';
	shipping_billing_error['error_shipping_city'] = 'Please enter your city';
	shipping_billing_error['error_shipping_country'] = 'Please select your country';
	shipping_billing_error['error_shipping_province'] = 'Please select your state/province';
	shipping_billing_error['error_shipping_postal_code'] = 'Please enter your postal ot zip code';
	shipping_billing_error['error_billing_form_email'] = 'Please enter a valid email address';
	shipping_billing_error['error_billing_last_name'] = 'Please enter your last name';
	shipping_billing_error['error_billing_address'] = 'Please enter your address';
	shipping_billing_error['error_billing_city'] = 'Please enter your city';
	shipping_billing_error['error_billing_country'] = 'Please select your country';
	shipping_billing_error['error_billing_province'] = 'Please select your state/province';
	shipping_billing_error['error_billing_postal_code'] = 'Please enter your postal ot zip code';
var card_messager_for_checkout_form = 'Oops! Your billing info is incorrect';
var opt_in_message_success = "Thank you for subscribing";//okk
var opt_in_invalid_email = "Please enter valid email";//okk
var card_details_msg = "All transactions are secure and encrypted. Credit card information is never stored.";//okk
var paypal_msg = 'After clicking "Complete order", you will be redirected to PayPal to complete your purchase securely.';//okk
var t_m_cart_subtotal = "Subtotal";
var t_m_cart_shipping = "Shipping";
var t_m_cart_taxes = "Taxes";
var t_m_cart_total = "Total";
var default_email_placeholder = "Email";
var default_first_name_placeholder = "First name";
var default_last_name_placeholder = "Last name";
var default_address_placeholder = "Address";
var default_apt_placeholder = "Apt, suite (optional)";
var default_city_placeholder = "City";
var default_postal_code_placeholder = "Postal code";
var default_phone_placeholder = "Phone";
var default_credit_card_placeholder = "Card number";
var default_exp_month_placeholder = "MM";
var default_exp_year_placeholder = "YYYY";
var default_cvv_placeholder = "CVV";
var save_this_information_for_next_time = "Save this information for next time";
var return_to_cart = "Return to cart";
var continue_to_shipping_method = "Continue to shipping method";
var show_order_summary = "Show order summary";
var hide_order_summary = "Hide order summary";
var edit_shipping_address = "Edit shipping address";
var return_to_customer_information = "Return to customer information";
var continue_to_payment_method = "Continue to payment method";
var same_as_shipping_address = "Same as shipping address";
var use_a_different_billing_address = "Use a different billing address";
var subscribe_to_our_newsletter = "Subscribe to our newsletter";
var return_to_shipping_method = "Return to shipping method";
var complete_order = "Complete order";

var t_m_cart = "Cart";
var t_m_customer_info = "Customer information";
var t_m_shipping_info = "Shipping address";
var t_m_shipping_method = "Shipping method";
var t_m_payment_method = "Payment method";
var t_m_billing_info = "Billing Address";

function set_translator_variable(){
	if($("#translator_settings").length > 0){
		var translator = $("#translator_settings")[0].value;
		if(translator != ""){
			translator = JSON.parse(translator);
			product_available = translator.product_available;
			out_of_stock = translator.out_of_stock;
			cart_empty_msg = translator.cart_empty_msg;
			shipping_billing_error['error_shipping_method'] = translator.error_shipping_method;
			shipping_billing_error['error_shipping_method2'] = translator.error_shipping_method2;
			shipping_billing_error['error_shipping_form_email'] = translator.error_shipping_form_email;
			shipping_billing_error['error_shipping_last_name'] = translator.error_shipping_last_name;
			shipping_billing_error['error_shipping_address'] = translator.error_shipping_address;
			shipping_billing_error['error_shipping_city'] = translator.error_shipping_city;
			shipping_billing_error['error_shipping_country'] = translator.error_shipping_country;
			shipping_billing_error['error_shipping_province'] = translator.error_shipping_province;
			shipping_billing_error['error_shipping_postal_code'] = translator.error_shipping_postal_code;
			shipping_billing_error['error_billing_form_email'] = translator.error_shipping_form_email;
			shipping_billing_error['error_billing_last_name'] = translator.error_shipping_last_name;
			shipping_billing_error['error_billing_address'] = translator.error_shipping_address;
			shipping_billing_error['error_billing_city'] = translator.error_shipping_city;
			shipping_billing_error['error_billing_country'] = translator.error_shipping_country;
			shipping_billing_error['error_billing_province'] = translator.error_shipping_province;
			shipping_billing_error['error_billing_postal_code'] = translator.error_shipping_postal_code;
			card_messager_for_checkout_form = translator.card_messager_for_checkout_form;
			opt_in_message_success = translator.opt_in_message_success;
			opt_in_invalid_email = translator.opt_in_invalid_email;
			card_details_msg = translator.card_details_msg;
			paypal_msg = translator.paypal_msg;
			t_m_cart_subtotal = translator.cart_subtotal;
			t_m_cart_shipping = translator.cart_shipping;
			t_m_cart_taxes = translator.cart_taxes;
			t_m_cart_total = translator.cart_total;
			default_email_placeholder = translator.default_email_placeholder;
			default_first_name_placeholder = translator.default_first_name_placeholder;
			default_last_name_placeholder = translator.default_last_name_placeholder;
			default_address_placeholder = translator.default_address_placeholder;
			default_apt_placeholder = translator.default_apt_placeholder;
			default_city_placeholder = translator.default_city_placeholder;
			default_postal_code_placeholder = translator.default_postal_code_placeholder;
			default_phone_placeholder = translator.default_phone_placeholder;
			default_credit_card_placeholder = translator.default_credit_card_placeholder;
			default_exp_month_placeholder = translator.default_exp_month_placeholder;
			default_exp_year_placeholder = translator.default_exp_year_placeholder;
			default_cvv_placeholder = translator.default_cvv_placeholder;

			save_this_information_for_next_time = translator.save_this_information_for_next_time;
			return_to_cart = translator.return_to_cart;
			continue_to_shipping_method = translator.continue_to_shipping_method;
			show_order_summary = translator.show_order_summary;
			hide_order_summary = translator.hide_order_summary;
			edit_shipping_address = translator.edit_shipping_address;
			return_to_customer_information = translator.return_to_customer_information;
			continue_to_payment_method = translator.continue_to_payment_method;
			same_as_shipping_address = translator.same_as_shipping_address;
			use_a_different_billing_address = translator.use_a_different_billing_address;
			subscribe_to_our_newsletter = translator.subscribe_to_our_newsletter;
			return_to_shipping_method = translator.return_to_shipping_method;
			complete_order = translator.complete_order;

			t_m_cart = translator.cart;
			t_m_customer_info = translator.customer_information;
			t_m_shipping_info = translator.shipping_information;
			t_m_shipping_method = translator.shipping_method;
			t_m_payment_method = translator.payment_method;
			t_m_billing_info = translator.billing_information;
		}
	}

	change_inner_text('#payment_method_paypal','p','After clicking "Complete order", you will be redirected to PayPal to complete your purchase securely.',paypal_msg);
	change_inner_text('#payment_method_paypal','span','After clicking "Complete order", you will be redirected to PayPal to complete your purchase securely.',paypal_msg);
}

function change_inner_text(mother_div,tag_name,find_text,change_text){
	if($(mother_div).length > 0){
		console.log("payment_method_paypal == > has");
		var p = $(mother_div).find(tag_name);
		for(var i=0;i<p.length;i++){
			if(p[i].innerText == find_text){
			  	p[i].innerText = change_text;
			}
		}
	}
}

$(function() {
	$.ajaxSetup({ cache: false });
	set_translator_variable();

	var clear = get_parameter_from_url('cart_clear');
	if(clear == "true"){
		clear_current_cart();
		remove_string_from_url("/?cart_clear=true");
	}

  	// Handler for .ready() called.
	$("a").click(function(e){
	    var step_0 = e.target;
	    var step_1 = $(step_0).parent();
	    var step_2 = $(step_1).parent();
	    var step_3 = $(step_2).parent();
	    var this_is_optin_click = false;
	    if(step_1[0].dataset['title'] == "optin button"){
	    	this_is_optin_click = true;
	    }
	    if(step_2[0].dataset['title'] == "optin button"){
	    	this_is_optin_click = true;
	    }
	    if(step_3[0].dataset['title'] == "optin button"){
	    	this_is_optin_click = true;
	    }
	    if(this_is_optin_click){
	    	optin_button_clicked(this); 
	    	return false;
	    }

	});
	
	 
	$("[name='email']").blur(function () {
		if ($("[name='email']").val() != '' ) {
			var email = $("[name='email']").val();
			abandoned_cart_save_email (email);
			console.log("abandone email sent!");
		}
	});
	$("[name='shipping_form_email']").blur(function () {
		if ($("[name='shipping_form_email']").val() != '' ) {
			var email = $("[name='shipping_form_email']").val();
			abandoned_cart_save_email (email);
			console.log("abandone email sent!");
		}
	});
	$("[name='shipping_first_name']").blur(function () {
		if ($("[name='shipping_first_name']").val() != '' ) {
			var email = $("[name='shipping_form_email']").val();
			if(email == "" && $("[name='email']").length > 0){
				email = $("[name='email']").val();
			}
			var first_name = $("[name='shipping_first_name']").val();
			var last_name = $("[name='shipping_last_name']").val();
			abandoned_cart_save_first_last_name (email,first_name,last_name);
			console.log("abandone firstname, email sent!");
		}
	});
	$("[name='shipping_last_name']").blur(function () {
		if ($("[name='shipping_last_name']").val() != '' ) {
			var email = $("[name='shipping_form_email']").val();
			if(email == "" && $("[name='email']").length > 0){
				email = $("[name='email']").val();
			}
			var first_name = $("[name='shipping_first_name']").val();
			var last_name = $("[name='shipping_last_name']").val();
			abandoned_cart_save_first_last_name (email,first_name,last_name);
			console.log("abandone lastname, email sent!");
		}
	});

	$(".optin_btn").click(function(e){
	    optin_button_clicked(this);
	    return false;
	});

	$(".shipping_btn").click(function(e){
	    shipping_button_clicked();
	    return false;
	});

	var show_popup = false;
	var showed = false;
	setTimeout(function(){ show_popup = true; }, 5000);
	$(document).mouseleave(function() {
		if(show_popup == true && showed == false){
			if( document.getElementById('exit_popup_btn') != null ){
				if($("#exit_popup_status")[0].value == 1){
			    	document.getElementById('exit_popup_btn').click();
			    }
			}
			show_popup = false;
		}
	});
	$( ".modal_close_btn_exit_pop_up" ).click(function() {
		showed = true;
	});

	//timers
	if( document.getElementById("all_timer_data") != null ) {
		var all_timer_data = $("#all_timer_data")[0].value;
	    if(all_timer_data != '' &&  all_timer_data.indexOf('[]') < 0){ 
	        all_timer_data = JSON.parse(all_timer_data);
	        var interval_id_flag = 1;
	        var intervalId = "";
	        for (var i=0 ; i<all_timer_data.length;i++){
	            var id = all_timer_data[i].timer_id;
	            var endtime = all_timer_data[i].deadline;
	            var url = "";
                if(typeof(all_timer_data[i].datepicker_url) !== 'undefined'){
                	url = all_timer_data[i].datepicker_url;
                }
	            funnel_countdown(id, endtime,url);
	        }
	    }

	    //Date-time
	    setInterval(function(){ setTime(); }, 1000);
	}


	if (document.getElementById("all_eg_data") != null ){
        var all_eg_data = $('#all_eg_data').val();
        if( all_eg_data != '' &&  all_eg_data.indexOf('[]') < 0 ){
            all_eg_data = JSON.parse(all_eg_data);
            for (var i=0 ; i<all_eg_data.length;i++){

                var id = all_eg_data[i].eg_timer_id;
                var duration = all_eg_data[i].duration;
                
                if (!checkCookie ('eg_timer_'+id)){
                    var today_date = new Date();
                    today_date.setTime(today_date.getTime()+duration);
                    var expires = "; expires="+today_date.toGMTString();

                    document.cookie = 'eg_timer_'+id+' = '+Date.parse(new Date())+expires+'';
                }

                if (checkCookie ('eg_timer_'+id)){
                    var starting_time = getCookie('eg_timer_'+id);
                    var current_time = Date.parse(new Date()) ;

                    duration = duration - (current_time - starting_time);  
                }

                var deadline = (Date.parse(new Date())) + duration;

                var url = "";
                if(typeof(all_eg_data[i].eg_seconds_input_url) !== 'undefined'){
                	url = all_eg_data[i].eg_seconds_input_url;
                }
                eg_countdown(id,deadline,url);
            }
        }

    }
    


	if( document.getElementById("page_id") != null ) {
		var page_id = document.getElementById("page_id").value;
    	if( document.getElementById("funnel_id") != null ) var funnel_id = document.getElementById("funnel_id").value;
    	$.getJSON('/cart.js', function(cart) {
	    	$.getScript("https://l2.io/ip.js?var=myip", function(){
				$.post( base + "/api/?process=save_pageview&", { ip: myip, agent: navigator.userAgent, page_id: page_id, funnel_id: funnel_id, cart_token: cart.token } );
		    });
		});
	}
	remove_editor_hover_conf();

	/*Cart details generator*/
	$(".custom_checkout_cart_info").each(function() {
	    custom_checkout_cart_info( this );
	});

	if( $(".shopify_cart_bump_div").length > 0 ){
		generate_cart_bump();
	}	
	for(var i=0;i<$(".modal_close_btn").length;i++){
		$(".modal_close_btn")[i].innerHTML = 'x';
	}
	insert_shipping_data_from_cookie();

	if($("#pay_pal_checkout").length > 0 ){
		var thankyou_page = false;
		var url = window.location.href;
		if(url.indexOf('checkout') > -1){
			if(url.indexOf('thank_you') > -1){
				thankyou_page = true;
			}
		}

		if($("#pay_pal_checkout")[0].value == 'true' && !thankyou_page){
			trigger_fbq_purchase_event("");
			gaee_purchase();
			url = url.replace("/?pamt_ref=true","");
			window.history.replaceState({}, document.title, url);
		}
	}
	if($("#credit_card_processor").length > 0){
		if($("#credit_card_processor")[0].value == "bluesnap"){
			if($("[data-stripe='exp_year']").length > 0){
				$("[data-stripe='exp_year']")[0].placeholder = "YYYY";
			}
		}
	}
	auto_add_product_to_cart();
});

function http_post_request( url, data, callback, params ) {
	
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			//callback with response
			window[callback](xmlhttp.responseText, params);
		}
	}
	xmlhttp.open("POST",url,true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(data);
}

function get_parameter_from_url(parameter){
	var url_string = window.location.href;
	if(url_string.indexOf(parameter) >= 0)
	{
		var queryParams = window.location.search.substr(1).split('&').reduce(function (q, query) {
			var chunks = query.split('=');
			var key = chunks[0];
			var value = chunks[1];
			return (q[key] = value, q);
		}, {});
		if(parameter in queryParams){
			var c = queryParams[parameter];
		}
		else{
			var c = null;
		}
	}
	else{
		var c = null;
	}
	return c;
}
function remove_string_from_url(string){
	var url = window.location.href;
	url = url.replace(string,"");
	window.history.replaceState({}, document.title, url);
}
 
function variant_applicable_quantities( variant_id ) {
	if(variant_id == "0" || variant_id == ""){
		if($("#selected_product_quantity").length > 0){
			$("#selected_product_quantity")[0].value = 0;
			return 0 ;
		}
	}
	var all_information = document.getElementById('shopify_all_product_information').value;
	all_information = JSON.parse( all_information );
	var arr = all_information[1]['shopify_product_variants_list'];
	for(var i=0; i<arr.length; i++){
		if ( arr[i].id == variant_id ) {
			if(arr[i].inventory_management=='shopify' && arr[i].inventory_policy=='deny'){
				if ( arr[i].inventory_quantity > 10 ){
					$("#selected_product_quantity")[0].value = 1;
					return 10;
				}else if( arr[i].inventory_quantity > 0 ){
					$("#selected_product_quantity")[0].value = 1;
					return arr[i].inventory_quantity;
				}else if (  arr[i].inventory_quantity < 0 ){
					$("#selected_product_quantity")[0].value = 0;
					return 0 ; 
				}
			}else{
				$("#selected_product_quantity")[0].value = 1;
				return 10;
			}
		}
	} 

	$("#selected_product_quantity")[0].value = 0;
	return 0 ;
}

function refresh_this_page(){
	var shopify_all_product_information = $('#shopify_all_product_information')[0].value;
	if(shopify_all_product_information != "[]"){
		shopify_all_product_information = JSON.parse(shopify_all_product_information);
		var variant_select_class_array = [];
		for(i=0;i<Object.keys(shopify_all_product_information[0].shopify_product_variants_div).length;i++){
			variant_select_class_array.push(Object.keys(shopify_all_product_information[0].shopify_product_variants_div)[i]);
			var option_class_name = document.getElementsByClassName(Object.keys(shopify_all_product_information[0].shopify_product_variants_div)[i]);
			if(option_class_name.length > 0){
				var variants = shopify_all_product_information[1].shopify_product_variants_list;
				var temp_var_array = [];
				for(j=0;j<variants.length;j++){
					var temp = variants[j].option1;
					if(temp != null){
						temp = temp.replaceAll('"','&quot;'); 
						temp_var_array.push(temp);
					}
				}
				var uniqueNames = []; 
				$.each(temp_var_array, function(i, el){
				    if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
				});
				temp_var_array = uniqueNames;
				var opt = "";
				for(j=0;j<temp_var_array.length;j++){
					opt += '<option value="'+temp_var_array[j]+'">'+temp_var_array[j]+'</option>';
				}

				// $("."+variant_select_class_array[0]).each(function() {
				// 	$(this)[0].innerHTML = opt;
				// });
				if($("."+variant_select_class_array[0]).length > 0){
					$("."+variant_select_class_array[0]).each(function() {
						$(this)[0].innerHTML = opt;
					});
				}else{
					var hidden_select = '<select class="form-control '+variant_select_class_array[0]+' hidden" onchange="change_product_variant(this);" id="'+variant_select_class_array[0]+'"></select>';
					$("body").append(hidden_select);
					$("."+variant_select_class_array[0]).each(function() {
						$(this)[0].innerHTML = opt;
					});
				}
				
				//for(var ol=0;ol<option_class_name.length;ol++){
					//option_class_name[ol].innerHTML = shopify_all_product_information[0].shopify_product_variants_div[Object.keys(shopify_all_product_information[0].shopify_product_variants_div)[i]];
					//option_class_name[ol].innerHTML += shopify_all_product_information[0].shopify_product_variants_div[Object.keys(shopify_all_product_information[0].shopify_product_variants_div)[i]];
					
				//}
			}
		}
		var compare_at_price = "";
		if(shopify_all_product_information[1].shopify_product_variants_list[0].compare_at_price != null){
			compare_at_price = shopify_all_product_information[1].shopify_product_variants_list[0].compare_at_price;
		}
		$('#selected_valid_variant').val(shopify_all_product_information[1].shopify_product_variants_list[0].id);
		$( "#selected_valid_variant" ).trigger( "change" );
		change_price_short_code_to_span();
		if ($('#rc_purchase_type_autodeliver').length == 0){
			change_price_short_code(shopify_all_product_information[1].shopify_product_variants_list[0].price,compare_at_price);
		}else if ($('#rc_purchase_type_autodeliver').length > 0) {
			if ( $('#rc_purchase_type_autodeliver')[0].checked == false){
				change_price_short_code(shopify_all_product_information[1].shopify_product_variants_list[0].price,compare_at_price);
			}
		}
		variant_applicable_quantities($("#selected_valid_variant")[0].value);
		
		change_product_variant_options(0,variant_select_class_array);
	}
	
	$(".shopify_product_quantity").each(function() {
		var variant_quantities = variant_applicable_quantities($('#selected_valid_variant').val());
		$(".shopify_product_quantity")[0].innerHTML = "";
		var option_starting_from ;
		if ( variant_quantities == 0 ){
			option_starting_from = 0 ;
			$("#selected_product_quantity")[0].value = 0;
			for(i=0;i<$('.variant_message').length;i++){
				$('.variant_message')[i].innerHTML = '<span style="color:red; font-size:13px; margin-top: 10px; display: block;"  class="text-center"><i class="fa fa-times" aria-hidden="true"></i> '+out_of_stock+' </span>';
			}
		}else{
			option_starting_from = 1;
		}
		var opt = "";
		for ( i=option_starting_from ; i <= variant_quantities ; i++ ) {
			//$(".shopify_product_quantity")[0].innerHTML+= "<option value="+i+">"+i+"</option>";
			opt += "<option value="+i+">"+i+"</option>";
		}

		$(".shopify_product_quantity").each(function() {
			$(this)[0].innerHTML = opt;
		});

	});

	if($(".billing_form_country_names").length > 0){
		var options = '<option value="">Select Country</option><option data-code="AF" value="AF">Afghanistan</option><option data-code="AX" value="AX">Aland Islands</option><option data-code="AL" value="AL">Albania</option><option data-code="DZ" value="DZ">Algeria</option><option data-code="AD" value="AD">Andorra</option><option data-code="AO" value="AO">Angola</option><option data-code="AI" value="AI">Anguilla</option><option data-code="AG" value="AG">Antigua And Barbuda</option><option data-code="AR" value="AR">Argentina</option><option data-code="AM" value="AM">Armenia</option><option data-code="AW" value="AW">Aruba</option><option data-code="AU" value="AU">Australia</option><option data-code="AT" value="AT">Austria</option><option data-code="AZ" value="AZ">Azerbaijan</option><option data-code="BS" value="BS">Bahamas</option><option data-code="BH" value="BH">Bahrain</option><option data-code="BD" value="BD">Bangladesh</option><option data-code="BB" value="BB">Barbados</option><option data-code="BY" value="BY">Belarus</option><option data-code="BE" value="BE">Belgium</option><option data-code="BZ" value="BZ">Belize</option><option data-code="BJ" value="BJ">Benin</option><option data-code="BM" value="BM">Bermuda</option><option data-code="BT" value="BT">Bhutan</option><option data-code="BO" value="BO">Bolivia</option><option data-code="BA" value="BA">Bosnia And Herzegovina</option><option data-code="BW" value="BW">Botswana</option><option data-code="BV" value="BV">Bouvet Island</option><option data-code="BR" value="BR">Brazil</option><option data-code="IO" value="IO">British Indian Ocean Territory</option><option data-code="VG" value="VG">Virgin Islands, British</option><option data-code="BN" value="BN">Brunei</option><option data-code="BG" value="BG">Bulgaria</option><option data-code="BF" value="BF">Burkina Faso</option><option data-code="BI" value="BI">Burundi</option><option data-code="KH" value="KH">Cambodia</option><option data-code="CM" value="CM">Republic of Cameroon</option><option data-code="CA" value="CA">Canada</option><option data-code="CV" value="CV">Cape Verde</option><option data-code="KY" value="KY">Cayman Islands</option><option data-code="CF" value="CF">Central African Republic</option><option data-code="TD" value="TD">Chad</option><option data-code="CL" value="CL">Chile</option><option data-code="CN" value="CN">China</option><option data-code="CX" value="CX">Christmas Island</option><option data-code="CC" value="CC">Cocos (Keeling) Islands</option><option data-code="CO" value="CO">Colombia</option><option data-code="KM" value="KM">Comoros</option><option data-code="CG" value="CG">Congo</option><option data-code="CD" value="CD">Congo, The Democratic Republic Of The</option><option data-code="CK" value="CK">Cook Islands</option><option data-code="CR" value="CR">Costa Rica</option><option data-code="HR" value="HR">Croatia</option><option data-code="CU" value="CU">Cuba</option><option data-code="CW" value="CW">Curaçao</option><option data-code="CY" value="CY">Cyprus</option><option data-code="CZ" value="CZ">Czech Republic</option><option data-code="CI" value="CI">Côte d\'Ivoire</option><option data-code="DK" value="DK">Denmark</option><option data-code="DJ" value="DJ">Djibouti</option><option data-code="DM" value="DM">Dominica</option><option data-code="DO" value="DO">Dominican Republic</option><option data-code="EC" value="EC">Ecuador</option><option data-code="EG" value="EG">Egypt</option><option data-code="SV" value="SV">El Salvador</option><option data-code="GQ" value="GQ">Equatorial Guinea</option><option data-code="ER" value="ER">Eritrea</option><option data-code="EE" value="EE">Estonia</option><option data-code="ET" value="ET">Ethiopia</option><option data-code="FK" value="FK">Falkland Islands (Malvinas)</option><option data-code="FO" value="FO">Faroe Islands</option><option data-code="FJ" value="FJ">Fiji</option><option data-code="FI" value="FI">Finland</option><option data-code="FR" value="FR">France</option><option data-code="GF" value="GF">French Guiana</option><option data-code="PF" value="PF">French Polynesia</option><option data-code="TF" value="TF">French Southern Territories</option><option data-code="GA" value="GA">Gabon</option><option data-code="GM" value="GM">Gambia</option><option data-code="GE" value="GE">Georgia</option><option data-code="DE" value="DE">Germany</option><option data-code="GH" value="GH">Ghana</option><option data-code="GI" value="GI">Gibraltar</option><option data-code="GR" value="GR">Greece</option><option data-code="GL" value="GL">Greenland</option><option data-code="GD" value="GD">Grenada</option><option data-code="GP" value="GP">Guadeloupe</option><option data-code="GT" value="GT">Guatemala</option><option data-code="GG" value="GG">Guernsey</option><option data-code="GN" value="GN">Guinea</option><option data-code="GW" value="GW">Guinea Bissau</option><option data-code="GY" value="GY">Guyana</option><option data-code="HT" value="HT">Haiti</option><option data-code="HM" value="HM">Heard Island And Mcdonald Islands</option><option data-code="HN" value="HN">Honduras</option><option data-code="HK" value="HK">Hong Kong</option><option data-code="HU" value="HU">Hungary</option><option data-code="IS" value="IS">Iceland</option><option data-code="IN" value="IN">India</option><option data-code="ID" value="ID">Indonesia</option><option data-code="IR" value="IR">Iran, Islamic Republic Of</option><option data-code="IQ" value="IQ">Iraq</option><option data-code="IE" value="IE">Ireland</option><option data-code="IM" value="IM">Isle Of Man</option><option data-code="IL" value="IL">Israel</option><option data-code="IT" value="IT">Italy</option><option data-code="JM" value="JM">Jamaica</option><option data-code="JP" value="JP">Japan</option><option data-code="JE" value="JE">Jersey</option><option data-code="JO" value="JO">Jordan</option><option data-code="KZ" value="KZ">Kazakhstan</option><option data-code="KE" value="KE">Kenya</option><option data-code="KI" value="KI">Kiribati</option><option data-code="KV" value="KV">Kosovo</option><option data-code="KW" value="KW">Kuwait</option><option data-code="KG" value="KG">Kyrgyzstan</option><option data-code="LA" value="LA">Lao People\'s Democratic Republic</option><option data-code="LV" value="LV">Latvia</option><option data-code="LB" value="LB">Lebanon</option><option data-code="LS" value="LS">Lesotho</option><option data-code="LR" value="LR">Liberia</option><option data-code="LY" value="LY">Libyan Arab Jamahiriya</option><option data-code="LI" value="LI">Liechtenstein</option><option data-code="LT" value="LT">Lithuania</option><option data-code="LU" value="LU">Luxembourg</option><option data-code="MO" value="MO">Macao</option><option data-code="MK" value="MK">Macedonia, Republic Of</option><option data-code="MG" value="MG">Madagascar</option><option data-code="MW" value="MW">Malawi</option><option data-code="MY" value="MY">Malaysia</option><option data-code="MV" value="MV">Maldives</option><option data-code="ML" value="ML">Mali</option><option data-code="MT" value="MT">Malta</option><option data-code="MQ" value="MQ">Martinique</option><option data-code="MR" value="MR">Mauritania</option><option data-code="MU" value="MU">Mauritius</option><option data-code="YT" value="YT">Mayotte</option><option data-code="MX" value="MX">Mexico</option><option data-code="MD" value="MD">Moldova, Republic of</option><option data-code="MC" value="MC">Monaco</option><option data-code="MN" value="MN">Mongolia</option><option data-code="ME" value="ME">Montenegro</option><option data-code="MS" value="MS">Montserrat</option><option data-code="MA" value="MA">Morocco</option><option data-code="MZ" value="MZ">Mozambique</option><option data-code="MM" value="MM">Myanmar</option><option data-code="NA" value="NA">Namibia</option><option data-code="NR" value="NR">Nauru</option><option data-code="NP" value="NP">Nepal</option><option data-code="NL" value="NL">Netherlands</option><option data-code="AN" value="AN">Netherlands Antilles</option><option data-code="NC" value="NC">New Caledonia</option><option data-code="NZ" value="NZ">New Zealand</option><option data-code="NI" value="NI">Nicaragua</option><option data-code="NE" value="NE">Niger</option><option data-code="NG" value="NG">Nigeria</option><option data-code="NU" value="NU">Niue</option><option data-code="NF" value="NF">Norfolk Island</option><option data-code="KP" value="KP">Korea, Democratic People\'s Republic Of</option><option data-code="NO" value="NO">Norway</option><option data-code="OM" value="OM">Oman</option><option data-code="PK" value="PK">Pakistan</option><option data-code="PS" value="PS">Palestinian Territory, Occupied</option><option data-code="PA" value="PA">Panama</option><option data-code="PG" value="PG">Papua New Guinea</option><option data-code="PY" value="PY">Paraguay</option><option data-code="PE" value="PE">Peru</option><option data-code="PH" value="PH">Philippines</option><option data-code="PN" value="PN">Pitcairn</option><option data-code="PL" value="PL">Poland</option><option data-code="PT" value="PT">Portugal</option><option data-code="QA" value="QA">Qatar</option><option data-code="RE" value="RE">Reunion</option><option data-code="RO" value="RO">Romania</option><option data-code="RU" value="RU">Russia</option><option data-code="RW" value="RW">Rwanda</option><option data-code="WS" value="WS">Samoa</option><option data-code="SM" value="SM">San Marino</option><option data-code="ST" value="ST">Sao Tome And Principe</option><option data-code="SA" value="SA">Saudi Arabia</option><option data-code="SN" value="SN">Senegal</option><option data-code="RS" value="RS">Serbia</option><option data-code="SC" value="SC">Seychelles</option><option data-code="SL" value="SL">Sierra Leone</option><option data-code="SG" value="SG">Singapore</option><option data-code="SX" value="SX">Sint Maarten</option><option data-code="SK" value="SK">Slovakia</option><option data-code="SI" value="SI">Slovenia</option><option data-code="SB" value="SB">Solomon Islands</option><option data-code="SO" value="SO">Somalia</option><option data-code="ZA" value="ZA">South Africa</option><option data-code="GS" value="GS">South Georgia And The South Sandwich Islands</option><option data-code="KR" value="KR">South Korea</option><option data-code="ES" value="ES">Spain</option><option data-code="LK" value="LK">Sri Lanka</option><option data-code="BL" value="BL">Saint Barthélemy</option><option data-code="SH" value="SH">Saint Helena</option><option data-code="KN" value="KN">Saint Kitts And Nevis</option><option data-code="LC" value="LC">Saint Lucia</option><option data-code="MF" value="MF">Saint Martin</option><option data-code="PM" value="PM">Saint Pierre And Miquelon</option><option data-code="VC" value="VC">St. Vincent</option><option data-code="SD" value="SD">Sudan</option><option data-code="SR" value="SR">Suriname</option><option data-code="SJ" value="SJ">Svalbard And Jan Mayen</option><option data-code="SZ" value="SZ">Swaziland</option><option data-code="SE" value="SE">Sweden</option><option data-code="CH" value="CH">Switzerland</option><option data-code="SY" value="SY">Syria</option><option data-code="TW" value="TW">Taiwan</option><option data-code="TJ" value="TJ">Tajikistan</option><option data-code="TZ" value="TZ">Tanzania, United Republic Of</option><option data-code="TH" value="TH">Thailand</option><option data-code="TL" value="TL">Timor Leste</option><option data-code="TG" value="TG">Togo</option><option data-code="TK" value="TK">Tokelau</option><option data-code="TO" value="TO">Tonga</option><option data-code="TT" value="TT">Trinidad and Tobago</option><option data-code="TN" value="TN">Tunisia</option><option data-code="TR" value="TR">Turkey</option><option data-code="TM" value="TM">Turkmenistan</option><option data-code="TC" value="TC">Turks and Caicos Islands</option><option data-code="TV" value="TV">Tuvalu</option><option data-code="UM" value="UM">United States Minor Outlying Islands</option><option data-code="UG" value="UG">Uganda</option><option data-code="UA" value="UA">Ukraine</option><option data-code="AE" value="AE">United Arab Emirates</option><option data-code="GB" value="GB">United Kingdom</option><option data-code="US" value="US">United States</option><option data-code="UY" value="UY">Uruguay</option><option data-code="UZ" value="UZ">Uzbekistan</option><option data-code="VU" value="VU">Vanuatu</option><option data-code="VA" value="VA">Holy See (Vatican City State)</option><option data-code="VE" value="VE">Venezuela</option><option data-code="VN" value="VN">Vietnam</option><option data-code="WF" value="WF">Wallis And Futuna</option><option data-code="EH" value="EH">Western Sahara</option><option data-code="YE" value="YE">Yemen</option><option data-code="ZM" value="ZM">Zambia</option><option data-code="ZW" value="ZW">Zimbabwe</option>';
		for(i = 0; i< $(".billing_form_country_names").length;i++){
			$(".billing_form_country_names")[i].innerHTML = options;
		}
	}
	if($("input[name='shipping_province']").length > 0){
		$("input[name='shipping_province']").val("n/a");
	}
	if($("input[name='billing_province']").length > 0){
		$("input[name='billing_province']").val("n/a");
	}

	$.get("https://api.ipify.org?format=json").done(function( data ) {
		$.get( shopify_proxy_prefix + "/abcd/?process=get_geo_data&ip=" + data.ip).done(function( data ) {
			data = JSON.parse( data );
       		for(i = 0; i< $(".billing_form_country_names").length;i++){
       			$(".billing_form_country_names")[i].value = data.countryCode;
				fire_change_event( $(".billing_form_country_names")[i] );
			}
       	});
	});

	//$("input[name='shipping_form_email']")[0].value = readCookie("shipping_form_email");
	set_country_from_cookie();
}

function change_product_variant_options(pos,variant_select_class_array){
	if(pos == 0 && variant_select_class_array.length > 1){
		if($("."+variant_select_class_array[0]).length > 0){
			var selected_options = [];
			selected_options.push($("."+variant_select_class_array[0])[0].value);
			get_updated_variant_options(selected_options,pos,variant_select_class_array);
		}
	}else if(pos == 1 && variant_select_class_array.length > 2){
		if($("."+variant_select_class_array[0]).length > 0 && $("."+variant_select_class_array[1]).length > 0){
			var selected_options = [];
			selected_options.push($("."+variant_select_class_array[0])[0].value);
			selected_options.push($("."+variant_select_class_array[1])[0].value);
			get_updated_variant_options(selected_options,pos,variant_select_class_array);
		}
	}
}

function get_updated_variant_options(selected_options,pos,variant_select_class_array){
	var shopify_all_product_information = $('#shopify_all_product_information')[0].value;
	var option_array = [];
	if(shopify_all_product_information != "[]" ){
		shopify_all_product_information = JSON.parse(shopify_all_product_information);
		var variants = shopify_all_product_information[1].shopify_product_variants_list;

		for(var i=0;i<variants.length;i++){
			if(pos == 0){
				//console.log(variants[i].option1);
				//console.log(selected_options[0]);
				if(variants[i].option1 == selected_options[0]){
					temp = variants[i].option2;
					if(temp != null){
						temp = temp.replaceAll('"','&quot;'); 
						option_array.push(temp);
					}
				}
			}else if(pos == 1){
				if(variants[i].option1 == selected_options[0] && variants[i].option2 == selected_options[1]){
					temp = variants[i].option3;
					if(temp != null){
						temp = temp.replaceAll('"','&quot;');
						option_array.push(temp);
					}
				}
			}else if(pos == 2){
				console.log(variants[i].option3);
			}
		}

		var opt = "";
		var uniqueNames = [];
		$.each(option_array, function(i, el){
		    if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
		});
		option_array = uniqueNames;
		for(i=0;i<option_array.length;i++){
			opt += '<option value="'+option_array[i]+'">'+option_array[i]+'</option>';
		}

		if($("."+variant_select_class_array[pos+1]).length > 0){
			$("."+variant_select_class_array[pos+1]).each(function() {
				$(this)[0].innerHTML = opt;
			});
			fire_this_event(document.getElementById($("."+variant_select_class_array[pos+1])[0].id),"change");
		}else if(variant_select_class_array.length > pos){
			var hidden_select = '<select class="form-control '+variant_select_class_array[pos+1]+' hidden" onchange="change_product_variant(this);" id="'+variant_select_class_array[pos+1]+'"></select>';
			$("body").append(hidden_select);
			$("."+variant_select_class_array[pos+1]).each(function() {
				$(this)[0].innerHTML = opt;
			});
			fire_this_event(document.getElementById($("."+variant_select_class_array[pos+1])[0].id),"change");
		}
	}
}

function change_product_variant(me){
	var my_class_name = "";
	var my_pos = 0;
	var valid_variant_bool = false;
	var selected_variant = "";
	var selected_variant_image_id = "";

	var variant_select_class_array = [];
	var shopify_all_product_information = $('#shopify_all_product_information')[0].value;
	if(shopify_all_product_information != "[]"){
		shopify_all_product_information = JSON.parse(shopify_all_product_information);
		//console.log(shopify_all_product_information);		
		for(i=0;i<Object.keys(shopify_all_product_information[0].shopify_product_variants_div).length;i++){
			variant_select_class_array.push(Object.keys(shopify_all_product_information[0].shopify_product_variants_div)[i]);
		}
	}
	
	for(i=0;i<$(me)[0].classList.length;i++){
		if(($(me)[0].classList[i]).search("variant") > -1){
			my_class_name = $(me)[0].classList[i];
			my_pos = variant_select_class_array.indexOf(my_class_name);
		}
	}

	$("."+my_class_name).each(function() {
		var temp = $(me)[0].value;
		$(this).val(temp);
	});
	
	change_product_variant_options(my_pos,variant_select_class_array);

	for(var i=0;i<variant_select_class_array.length;i++){
		if(i<variant_select_class_array.length-1 && $("."+variant_select_class_array[i]).length >0){
			selected_variant += $("."+variant_select_class_array[i])[0].value+' / ';
		}else if(i==variant_select_class_array.length-1 && $("."+variant_select_class_array[i]).length > 0){
			selected_variant += $("."+variant_select_class_array[i])[0].value;
		}
	}
	
	var valid_variant = shopify_all_product_information[1].shopify_product_variants_list[0].id;
	var selected_price = shopify_all_product_information[1].shopify_product_variants_list[0].price;
	var compare_at_price = "";
	if(shopify_all_product_information[1].shopify_product_variants_list[0].compare_at_price != null){
		compare_at_price = shopify_all_product_information[1].shopify_product_variants_list[0].compare_at_price;
	}
	for(i=0;i<shopify_all_product_information[1].shopify_product_variants_list.length;i++){
		if(shopify_all_product_information[1].shopify_product_variants_list[i].title == selected_variant){
			valid_variant_bool = true;
			//valid_variant = Object.keys(shopify_all_product_information[1].shopify_product_variants_list[i])[0];
			valid_variant = shopify_all_product_information[1].shopify_product_variants_list[i].id;
			selected_price = shopify_all_product_information[1].shopify_product_variants_list[i].price;
			if(shopify_all_product_information[1].shopify_product_variants_list[i].compare_at_price != null){
				compare_at_price = shopify_all_product_information[1].shopify_product_variants_list[i].compare_at_price;
			}
			//fetch the image id from selected variant
			if( shopify_all_product_information[1].shopify_product_variants_list[i].image_id != null ) selected_variant_image_id = shopify_all_product_information[1].shopify_product_variants_list[i].image_id;
			break;
		}
	}

	if(valid_variant_bool){
		$(".shopify_product_price").each(function() {
		    //$(this).show();
		});
		for(i=0;i<$('.variant_message').length;i++){
			$('.variant_message')[i].innerHTML = '<span style="color:green; font-size:13px; margin-top: 10px; display: block;"  class="text-center"><i class="fa fa-shopping-basket" aria-hidden="true"></i> '+product_available+' </span>';
		}
		$('#selected_valid_variant').val(valid_variant);
		$( "#selected_valid_variant" ).trigger( "change" );
		$('#add_to_cart_option').val('true');
		change_primary_image_src(valid_variant, selected_variant_image_id);
		if ($('#rc_purchase_type_autodeliver').length == 0){
			change_price_short_code(selected_price,compare_at_price);
		}else if ($('#rc_purchase_type_autodeliver').length > 0) {
			if ( $('#rc_purchase_type_autodeliver')[0].checked == false){
				change_price_short_code(selected_price,compare_at_price);
			}
		}
		
		$(".shopify_product_quantity").each(function() {
			var variant_quantities = variant_applicable_quantities(valid_variant);
			$(".shopify_product_quantity")[0].innerHTML = "";
			if ( variant_quantities == 0 ){
				option_starting_from = 0 ;
				$("#selected_product_quantity")[0].value = 0;
				for(i=0;i<$('.variant_message').length;i++){
					$('.variant_message')[i].innerHTML = '<span style="color:red; font-size:13px; margin-top: 10px; display: block;"  class="text-center"><i class="fa fa-times" aria-hidden="true"></i> '+out_of_stock+' </span>';
				}
			}else{
				option_starting_from = 1;
			}
			var opt = "";
			for ( i=option_starting_from ; i <= variant_quantities ; i++ ) {
				//$(".shopify_product_quantity")[0].innerHTML+= "<option value="+i+">"+i+"</option>";
				opt += "<option value="+i+">"+i+"</option>";
			}

			$(".shopify_product_quantity").each(function() {
				$(this)[0].innerHTML = opt;
			});
		});
	}else{
		for(i=0;i<$('.variant_message').length;i++){
			$('.variant_message')[i].innerHTML = '<span style="color:red; font-size:13px; margin-top: 10px; display: block;"  class="text-center"><i class="fa fa-times" aria-hidden="true"></i> '+out_of_stock+' </span>';
		}
		$('#add_to_cart_option').val('false');

		$(".shopify_product_price").each(function() {
		    //$(this).hide();
		});
	}
}

function change_price_short_code(price,compare_at_price){
    //document.body.innerHTML = document.body.innerHTML.replace('[PRICE]', price);
    $(".this_is_my_price").each(function() {
        var temp_price = $("#shop_money_format")[0].value.replace("{{amount}}",price);
        this.innerHTML = temp_price;
    });

    $(".this_is_my_compare_price").each(function() {
        var temp_price = $("#shop_money_format")[0].value.replace("{{amount}}",compare_at_price);
        this.innerHTML = temp_price;
    });
}

function change_price_short_code_to_span(){
    $(".shopify_product_price").each(function() {
        this.innerHTML = this.innerHTML.replace("[PRICE]","<span class='this_is_my_price'></span>");
        this.innerHTML = this.innerHTML.replace("[COMPARE_AT_PRICE]","<span class='this_is_my_compare_price'></span>");
    });
}

function shopify_change_product_quantity(me){
	$('#selected_product_quantity').val(me.value);
	$(".shopify_product_quantity").each(function() {
        $(this).val(me.value);
    });
}

function show_loading_bar (me) {
    NProgress.start();
	NProgress.set(0.0); 
    var interval = setInterval(function() { NProgress.inc(.01); }, 100);  

    if( $(me)[0] != undefined ) {
	    var this_height = $(me)[0].offsetHeight;
		var this_width = $(me)[0].offsetWidth ;

		$(me).attr("data-loading-text","<i class='fa fa-circle-o-notch fa-spin'></i> Processing...");
		$(me).button('loading');

		$(me).css("min-height" , this_height );
		$(me).css("min-width" , this_width );
	}
}

function shopify_add_to_cart(me, is_shipping_form){
	remove_string_from_url("#");
	var variant_id = $('#selected_valid_variant')[0].value;
	var quantity = $('#selected_product_quantity')[0].value;
	var cart_token = '';
	if(quantity != "0"){
		if(variant_id != ""){
			if($('#add_to_cart_option')[0].value == 'true') {
				show_loading_bar(me);
			    var data = "quantity="+quantity+"&id="+variant_id;
		    	var url = '/cart/add.js';
			    $.ajax({
					type: "POST",
					url: url,
					data: data,
					error: function (res){
						if(res.status == 200){
							var cart_info = JSON.parse(res.responseText);				
							var item_price = parseFloat( cart_info.price/100 ).round(2).toFixed(2);
							fbq_add_to_cart("AddToCart","product_group",$("#gfeed")[0].value,item_price,quantity,$("#shop_currency")[0].value,[variant_id]);
							if (check_if_google_analytics_id_exist() == true) {
								gaee_product_added(cart_info.product_id,cart_info.product_title,quantity,cart_info.variant_title,item_price,$("#shop_currency")[0].value);
							}
							var shopify_bundle_product_variants = $('#shopify_bundle_product_variants')[0].value;
							if(shopify_bundle_product_variants != ""){
								shopify_bundle_product_variants = JSON.parse(shopify_bundle_product_variants);
								for(var key in shopify_bundle_product_variants){
									var data = "quantity=1&id="+shopify_bundle_product_variants[key][1];
		    						var url = '/cart/add.js';
									$.ajax({
										type: "POST",
										url: url,
										data: data,
										error: function (res){
											if(res.status == 200){
												var cart_info = JSON.parse(res.responseText);
												var item_price = parseFloat( cart_info.price/100 ).round(2).toFixed(2);
												fbq_add_to_cart("AddToCart","product_group",$("#gfeed")[0].value,item_price,1,$("#shop_currency")[0].value,[shopify_bundle_product_variants[key][1]]);
												if (check_if_google_analytics_id_exist() == true) {
													gaee_product_added(cart_info.product_id,cart_info.product_title,quantity,cart_info.variant_title,item_price,$("#shop_currency")[0].value);
												}
											}
										},
										async: false
									});
								}
								shopify_update_cart_data( is_shipping_form );
								
							}else{
								shopify_update_cart_data( is_shipping_form );
							}
						}
					}
				});

			} else{
				//console.log("select perfect variant");
			}
		}else{
			show_loading_bar(me);
			shopify_update_cart_data( is_shipping_form );
		}
	}else{
		show_loading_bar(me);
		shopify_update_cart_data( is_shipping_form );
	}
}

function shopify_update_cart_data( source ) {
	//send cart data to checkout database
	$.getJSON('/cart.js', function(cart) {
		cart_token = cart.token;
		var current_url = window.location.href;
		var cubr = current_url.split( window.location.hostname );
		current_url = cubr[1];
		cubr = current_url.split('/');
		if( ( cubr[3] != undefined ) && ( cubr[4] != undefined ) && ( cubr[3].trim() == 'f' ) ) var funnel_id = cubr[4].trim();
		else var funnel_id = '0';
		//send a post request to:
		var url = shopify_proxy_prefix + '/checkout/' + cart.token + '/?proces=save_cart_data';
		var data = 'cart=' + encodeURIComponent( JSON.stringify( cart ) ) + '&funnel_id=' + funnel_id;
		$.ajax({
			type: "POST",
			url: url,
			data: data,
			success: function (res){
				//redirect to next stage
				$.getJSON('/cart.js', function(cart) {
					if( source == 'shipping_form' ) redirect_with_shipping_info();
					else window.location.href = remove_url_get_params( window.location.href ) + '?go=left&cart_token=' + cart.token;
				});
			}
		});
	});
}

function shopify_decline(me){
	remove_string_from_url("#");
	show_loading_bar(me);
	$.getJSON('/cart.js', function(cart) {
		window.location.href = remove_url_get_params( window.location.href ) + '?go=right&cart_token=' + cart.token;
	});
}

function optin_button_clicked(me){
	remove_string_from_url("#");
	$(".optin_email_error_mgs").each(function() {
	    $(this).remove();
	});
	$(".optin_email_success_mgs").each(function() {
	    $(this).remove();
	});
	var first_name = document.getElementsByName("first_name");
    var last_name = document.getElementsByName("last_name");
    var email = document.getElementsByName("email");
    var name = document.getElementsByName("name");
    var page_id = document.getElementById("page_id").value;
    var funnel_id = document.getElementById("funnel_id").value;
    

    var optin_div = get_this_optin_form(me);
    if(optin_div != false){
    	first_name = optin_div.find("[name='first_name']");
    	last_name = optin_div.find("[name='last_name']");
    	name = optin_div.find("[name='name']");
    	email = optin_div.find("[name='email']");
    }

    if(first_name.length == 0){
    	if(name.length > 0){
    		first_name = name[0].value.substr(0,str.indexOf(' '));
    	}else{
    		first_name = "";
    	}
    }else{
    	first_name = first_name[0].value;
    }
    if(last_name.length == 0){
    	if(name.length > 0){
    		last_name = name[0].value.substr(str.indexOf(' ')+1);
    	}else{
    		last_name = "";
    	}
    }else{
    	last_name = last_name[0].value;
    }
    if(email.length == 0){
    	email = "";
    }else{
    	email = email[0].value;
    }

    if(validateEmail(email)){
    	$.getScript("https://l2.io/ip.js?var=myip", function(){
		    var data = "process=save_email&ip="+encodeURIComponent(myip)+"&agent="+encodeURIComponent(navigator.userAgent)+"&landing_page="+encodeURIComponent(window.location.href)+"&shop="+encodeURIComponent(shop)+"&page_id="+page_id+"&funnel_id="+funnel_id+"&first_name="+encodeURIComponent(first_name)+"&last_name="+encodeURIComponent(last_name)+"&email="+encodeURIComponent(email);
		    var url = base+'/api/';
		    $.ajax({
				type: "POST",
				url: url,
				data: data,
				success: function (res){
					if(res == 1){
						$(".optin_email_success_mgs").each(function() {
						    $(this).remove();
						});
						if(optin_div != false){
							$('<p class="text-success optin_email_success_mgs" style="font-size: 14px;">'+opt_in_message_success+'</p>').insertBefore($("#"+optin_div[0].id+" .optin_btn"));
						}else{
							$('<p class="text-success optin_email_success_mgs" style="font-size: 14px;">'+opt_in_message_success+'</p>').insertBefore($(".optin_btn"));
						}
						
						var shopify_all_product_information = $('#shopify_all_product_information')[0].value;
						if(shopify_all_product_information != "[]"){
							shopify_add_to_cart(me,res);
						}else{
							if($("#funnel_id")[0].value != 0){
								go_next_page(me);
							}
						}
						
					}

				}
			});
		});
    }else{
    	if(optin_div != false){
    		$("#"+optin_div[0].id+" input[name='email']").focus();
    		$('<p class="text-left text-danger optin_email_error_mgs">'+opt_in_invalid_email+'</p>').insertAfter($("#"+optin_div[0].id+" input[name='email']"));
    	}else{
    		$("input[name='email']").focus();
    		$('<p class="text-left text-danger optin_email_error_mgs">'+opt_in_invalid_email+'</p>').insertAfter($("input[name='email']"));
    	}
    	
    }
}

function get_this_optin_form(this_btn){
	var this_btn_id = $(this_btn)[0].id;
	var all_optin_div = $(".fv2_optin_form");
	for(var i=0;i<all_optin_div.length;i++){
		if($(all_optin_div[i]).find("#"+this_btn_id).length > 0){
			return $(all_optin_div[i]);
		}
	}

	return false;
}

function show_page_msg_modal(head,body,func){
	$("#page_mgs_header")[0].innerHTML = head;
	$("#page_mgs_body")[0].innerHTML = body;
	$("#page_mgs_ok_btn").click(func);

	open_popup("page_mgs_modal");
}

function change_primary_image_src(valid_variant, image_id) {
	var shopify_all_product_information = $('#shopify_all_product_information')[0].value;
	shopify_all_product_information = JSON.parse(shopify_all_product_information);
	
	if( image_id == '' ) {
		for(var i=0;i<Object.keys(shopify_all_product_information[2].shopify_product_images).length;i++){
			for(var j=0;j<shopify_all_product_information[2].shopify_product_images[i].variant_ids.length;j++){
				if(shopify_all_product_information[2].shopify_product_images[i].variant_ids[j] == valid_variant){
					received_variants_image_url(shopify_all_product_information[2].shopify_product_images[i].src);
				}
			}
		}
	} else {
		for(var i=0;i<Object.keys(shopify_all_product_information[2].shopify_product_images).length;i++) {
			if( shopify_all_product_information[2].shopify_product_images[i].id == image_id ) {
				received_variants_image_url( shopify_all_product_information[2].shopify_product_images[i].src );
			}
		}
	}
}

function received_variants_image_url(res){
	var primary_image_for_variant = $(".primary_image_for_variant");
	if(primary_image_for_variant.length > 0){
		for(var i=0; i<primary_image_for_variant.length;i++){
			$(primary_image_for_variant[i])[0]['src'] = res;
		}
	}
}

function complete_transaction() {
	remove_string_from_url("#");
	if($("#pay_pal_checkout").length > 0 ){
		var thankyou_page = false;
		var url = window.location.href;
		if(url.indexOf('checkout') > -1){
			if(url.indexOf('thank_you') > -1){
				thankyou_page = true;
			}
		}

		if($("#pay_pal_checkout")[0].value == 'true' && thankyou_page){
			trigger_fbq_purchase_event("");
			gaee_purchase();
			url = url.replace("/?pamt_ref=true","");
			window.history.replaceState({}, document.title, url);
		}
	}

	$.getJSON('/cart.js', function(cart) {
		var data = 'cart_token=' + cart.token;
		http_post_request(shopify_proxy_prefix  + '/checkout/' + cart.token + '/?process=complete_the_transaction', data, 'transaction_completion_status');
	});
}

function transaction_completion_status( response ) {
	if( response.trim() == 'success' ) {
		$.post(
            '/cart/clear.js', 
            {}
        );
		setTimeout( function() {
			location.reload();
		}, 500 );
	}else if( response.trim() == 'failed' ){
		setTimeout( function() {
			location.reload();
		}, 500 );
	}
}

function this_is_me() {
	return false;
}

function funnel_show_the_clock(id, endtime,url,me) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    if( t < 0 ) t = 0;
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));

    if( document.getElementById( id + '_timer_days_segment' ) != null ) document.getElementById( id + '_timer_days_segment' ).innerHTML = two_digit_number_format( days );
    if( document.getElementById( id + '_timer_hours_segment' ) != null ) document.getElementById( id + '_timer_hours_segment' ).innerHTML = two_digit_number_format( hours );
    if( document.getElementById( id + '_timer_minutes_segment' ) != null ) document.getElementById( id + '_timer_minutes_segment' ).innerHTML = two_digit_number_format( minutes );
    if( document.getElementById( id + '_timer_seconds_segment' ) != null ) document.getElementById( id + '_timer_seconds_segment' ).innerHTML = two_digit_number_format( seconds );
    if(t==0){
    	clearInterval(me);
    	if(url != "" && url != 'undefined' && $("#"+id).length > 0){
    		window.location.href = url;
    	}
    }
}

function funnel_countdown( id, endtime, url ) {
    var myInterval = setInterval( function() {
        funnel_show_the_clock( id, endtime,url, myInterval);
    }, 1000 );  
}

// eg_countdown

function eg_countdown( id, endtime ,eg_seconds_input_url) {   
    var interval = setInterval( function() {
	    eg_show_the_clock( id, endtime ,eg_seconds_input_url, interval);
	}, 1000 );
	
}

function eg_show_the_clock(id, endtime, url,interval) {
	var t = endtime - Date.parse(new Date());
	if(t<0){
		t = 0;
	}
	var seconds = Math.floor((t / 1000) % 60);
	var minutes = Math.floor((t / 1000 / 60) % 60);
	var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
	var days = Math.floor(t / (1000 * 60 * 60 * 24));

	if( document.getElementById( id + '_timer_days_segment' ) != null ) document.getElementById( id + '_timer_days_segment' ).innerHTML = two_digit_number_format( days );
	if( document.getElementById( id + '_timer_hours_segment' ) != null ) document.getElementById( id + '_timer_hours_segment' ).innerHTML = two_digit_number_format( hours );
	if( document.getElementById( id + '_timer_minutes_segment' ) != null ) document.getElementById( id + '_timer_minutes_segment' ).innerHTML = two_digit_number_format( minutes );
	if( document.getElementById( id + '_timer_seconds_segment' ) != null ) document.getElementById( id + '_timer_seconds_segment' ).innerHTML = two_digit_number_format( seconds );
	if(t==0){
    	clearInterval(interval);
    	if(url != "" && url != 'undefined' && $("#"+id).length > 0){
    		window.location.href = url;
    	}
    }
}

function two_digit_number_format(n){
    return parseInt(n) > 9 ? "" + n: "0" + n;
}

function setTime() {
    var time = moment().format('hh:mm:ss');
    var date = moment().format('dddd, MMMM D');

    for(var i=0;i<$('.date').length;i++){
        $('.date')[i].innerHTML = date;
    }
    for(var i=0;i<$('.time').length;i++){
        $('.time')[i].innerHTML = time;
    }
}


function overflow_control(element){
	var Overflow_Items = [];
	Overflow_Items = get_overflow_elements(element, Overflow_Items);
	for(var i=0;i<Overflow_Items.length;i++){
		if(!$(Overflow_Items[i]).hasClass("row")){
			$(Overflow_Items[i]).css("max-height", "100%");
			$(Overflow_Items[i]).css("max-width", "100%");
			$(Overflow_Items[i]).css("white-space", "normal");
		}
	}
}

function get_overflow_elements(element,Overflow_Items){
	for(var i=0; i<element.children().length; i++){
		if (element.children()[i].offsetTop + element.children()[i].offsetHeight > element[0].offsetTop + element[0].offsetHeight || element.children()[i].offsetLeft + element.children()[i].offsetWidth > element[0].offsetLeft + element[0].offsetWidth ){
			Overflow_Items.push(element.children()[i]);	
		}
		get_overflow_elements($(element.children()[i]),Overflow_Items);
	}
	return Overflow_Items;
}
function remove_editor_hover_conf(){
	$(".div_editorpreview").find("*").removeClass('hover_show_my_border');
	$(".div_editorpreview").find("*").removeClass('click_show_my_border');
	$(".div_editorpreview").find("*").removeClass('hover_show_my_border_main_container');
	$(".div_editorpreview").find("*").removeClass('hover_show_my_border_container');
	$(".div_editorpreview").find("*").removeClass('hover_show_my_border_row');
	$(".div_editorpreview").find("*").removeClass('hover_show_my_border_div');
	$(".div_editorpreview").find("*").removeClass('hover_show_my_border_ele');
	$(".div_editorpreview").find("*").removeClass('circle_container');
	$(".div_editorpreview").find("*").removeClass('circle_row');
	$(".div_editorpreview").find("*").removeClass('circle_div');
	$(".div_editorpreview").find("*").removeClass('show_my_cursor_as_move');
	$(".div_editorpreview").find(".hover_my_settings").remove();
	$(".div_editorpreview").find(".hover_my_settings2").remove();
}

function redirect_to_checkout(me) {
	shopify_add_to_cart(me,'shipping_form');
}

function redirect_with_shipping_info() {
	remove_string_from_url("#");
	if(document.getElementsByName("shipping_form_email").length > 0){
		var email = document.getElementsByName("shipping_form_email")[0].value;
	}else{
		var email = "";
	}
	if(document.getElementsByName("shipping_first_name").length > 0){
		var f_name = document.getElementsByName("shipping_first_name")[0].value;
	}else{
		var f_name = "";
	}
	if(document.getElementsByName("shipping_last_name").length > 0){
		var l_name = document.getElementsByName("shipping_last_name")[0].value;
	}else{
		var l_name = "";
	}
	if(document.getElementsByName("shipping_address").length > 0){
		var address1 = document.getElementsByName("shipping_address")[0].value;
	}else{
		var address1 = "";
	}
	if(document.getElementsByName("shipping_apt").length > 0){
		var apt = document.getElementsByName("shipping_apt")[0].value;
	}else{
		var apt = "";
	}
	if(document.getElementsByName("shipping_city").length > 0){
		var city = document.getElementsByName("shipping_city")[0].value;
	}else{
		var city = "";
	}
	if(document.getElementsByName("shipping_country").length > 0){
		var country = document.getElementsByName("shipping_country")[0].value;
	}else{
		var country = "";
	}
	if(document.getElementsByName("shipping_postal_code").length > 0){
		var zip = document.getElementsByName("shipping_postal_code")[0].value;
	}else{
		var zip = "";
	}
	var params = "checkout[email]="+encodeURIComponent(email)+
		"&checkout[shipping_address][first_name]="+encodeURIComponent(f_name)+
		"&checkout[shipping_address][last_name]="+encodeURIComponent(l_name)+
		"&checkout[shipping_address][address1]="+encodeURIComponent(address1)+
		"&checkout[shipping_address][address2]="+encodeURIComponent(apt)+
		"&checkout[shipping_address][city]="+encodeURIComponent(city)+
		"&checkout[shipping_address][country]="+encodeURIComponent(country)+
		"&checkout[shipping_address][zip]="+encodeURIComponent(zip);

	$.getJSON('/cart.js', function(cart) {
		window.location.href = remove_url_get_params( window.location.href ) + '?go=checkout&cart_token=' + cart.token + '&' + params;
	});
}

function custom_checkout_cart_info( element ) {
	$.getJSON('/cart.js', function(cart) {
	    var shop_currency = document.getElementById('shop_currency').value;
	    var cart_total = 0;
	    var html = '';
	    if( cart.items.length > 0 ) {
		    html = '<table class="table" style="border-top: 1px solid #ddd;">';
		    //html += '<tr><th style="width: 50px; border-top: none !important; border-bottom: 1px solid #ddd !important;"></th><th style="width: 65%; border-top: none !important; border-bottom: 1px solid #ddd !important;">Item</th><th style="border-top: none !important; border-bottom: 1px solid #ddd !important;">Amount</th><th style="border-top: none !important; border-bottom: 1px solid #ddd !important;"></th></tr>';
		    for( var i = 0; i < cart.items.length; i++ ) {
		        html += '<tr>'; //bump_the_cart( 1, \''+cart.items[i].variant_id+'\', this )  onclick="update_cart_for_this_variant(\''+cart.items[i].variant_id+'\', 7 )"
		            html += '<td class="text-left" style="border-top: none !important; vertical-align: top;"><div style="width: 75px;position: relative;"><img src="'+cart.items[i].image+'" width="50px;"><span class="cart_product_count">'+cart.items[i].quantity+'</span><ul class="pquntity"><li><a onclick="update_cart_for_this_variant(\''+cart.items[i].variant_id+'\', '+ (cart.items[i].quantity-1) +',event )"><i class="fa fa-minus-circle"></i></a></li><li><a onclick="update_cart_for_this_variant(\''+cart.items[i].variant_id+'\', '+(cart.items[i].quantity+1)+',event )"><i class="fa fa-plus-circle"></i></a></li></ul></div></td>';
		            html += '<td class="text-left" style="border-top: none !important; vertical-align: top;"><b>' + cart.items[i].product_title+'</b><br>'+( cart.items[i].variant_title != null ? cart.items[i].variant_title : '' )+'</td>';
		            html += '<td class="text-left" style="border-top: none !important; vertical-align: top;">' + shop_currency + '&nbsp;' + ( ( cart.items[i].price * cart.items[i].quantity ) / 100 ).toFixed(2) + '</td>';
		            html += '<td class="text-right" style="border-top: none !important; vertical-align: top;"><a style="cursor: pointer; text-decoration: none; font-size: 16px;" onclick="remove_this_product_from_cart(\''+cart.items[i].variant_id+'\',event);"><i class="fa fa-trash" aria-hidden="true"></i></a></td>';
		        html += '</tr>';
		        cart_total += ( ( cart.items[i].price * cart.items[i].quantity ) / 100 );
		    }
		    html += '<tr style="color: #717171;"><td class="text-left">'+t_m_cart_subtotal+'</td><td></td><td class="text-left">' + shop_currency + '&nbsp;' + cart_total.toFixed(2) + '</td><td></td></tr>';
		    html += '<tr style="color: #717171;"><td class="text-left" style="border-top: none !important;">'+t_m_cart_shipping+'</td><td style="border-top: none !important;"></td><td class="text-left" style="border-top: none !important;" id="total_shipping_cost_for_checkout">---</td><td style="border-top: none !important;"></td></tr>';
		    html += '<tr class="custom_checkout_total_tax_display" style="color: #717171;"><td class="text-left" style="border-top: none !important;">'+t_m_cart_taxes+'</td><td style="border-top: none !important;"></td><td class="text-left" style="border-top: none !important;" id="total_taxes_for_checkout">---</td><td style="border-top: none !important;"></td></tr>';
		    html += '<tr><th class="text-left">'+t_m_cart_total+'</th><th></th><th class="text-left" id="total_price_for_checkout">' + shop_currency + '&nbsp;' + cart_total.toFixed(2) + '</th><th></th></tr>';
		    html += '</table>';
		} else {
			html += '<p class="text-danger empty_cart_warning" style="margin-bottom: 0;">'+cart_empty_msg+'</p>';
		}
	    element.innerHTML = html;
	    element.style.display = 'block';
	});
}

function update_cart_for_this_variant(variant_id, quantity,event){
	//$("#normal_loading").show();
	$(".loader").show();
	event.preventDefault();
	add_shipping_form_input_data_cookie();
	var req = jQuery.post('/cart/update.js', "updates["+variant_id+"]="+quantity);
	fbq_add_to_cart("UpdateCart","product_group","","",quantity,$("#shop_currency")[0].value,[variant_id]);
	$.getJSON('/cart.js', function(cart) {
		if( document.getElementById("funnel_id") != null ){
			var funnel_id = document.getElementById("funnel_id").value;
			save_current_cart_info_into_db(funnel_id,cart);
		}
		if (check_if_google_analytics_id_exist() == true) {
			for(var i = 0; i < cart.items.length; i++) {
				if(cart.items[i].variant_id == variant_id){
					var ga_product = cart.items[i];
				}
			}
			if (typeof(ga_product) !== 'undefined') {
				var item_price = parseFloat( ga_product.price/100 ).round(2).toFixed(2);
				gaee_product_added(ga_product.product_id,ga_product.product_title,quantity,ga_product.variant_title,item_price,$("#shop_currency")[0].value);
			}
		}
	});
	if(req != null){
		setTimeout(function(){ 
			//location.reload(); 
			update_cart_info_without_refresh();
		}, 1000);
	}
}

function remove_this_product_from_cart(variant_id,event){
	//$("#normal_loading").show();
	$(".loader").show();
	event.preventDefault();
	add_shipping_form_input_data_cookie();
	var req = jQuery.post('/cart/update.js', "updates["+variant_id+"]=0");
	$.getJSON('/cart.js', function(cart) {
		if( document.getElementById("funnel_id") != null ){
			var funnel_id = document.getElementById("funnel_id").value;
			save_current_cart_info_into_db(funnel_id,cart);
		}
	});
	if(req != null){
		setTimeout(function(){ 
			//location.reload(); 
			update_cart_info_without_refresh();
		}, 1000);
	}
}

function save_current_cart_info_into_db(funnel_id,cart){
	var url = shopify_proxy_prefix + '/checkout/' + cart.token + '/?proces=save_cart_data';
	var data = 'cart=' + encodeURIComponent( JSON.stringify( cart ) ) + '&funnel_id=' + funnel_id + '&ajax=true';
	$.ajax({
		type: "POST",
		url: url,
		data: data,
		success: function (res) {
			//reload();
		}
	});
}

function checkout_now(me) {
	remove_string_from_url("#");

	/*Validate first*/
	var ship_valid = false;
	var email = $("input[name='shipping_form_email']");
	var shipping_first_name = $("input[name='shipping_first_name']");
	var shipping_last_name = $("input[name='shipping_last_name']");
	var shipping_address = $("input[name='shipping_address']");
	var shipping_apt = $("input[name='shipping_apt']");
	var shipping_city = $("input[name='shipping_city']");
	//var shipping_country = $("select[name='shipping_country']").val();
	var shipping_country = $($("select[name='shipping_country']")[0].children[$("select[name='shipping_country']")[0].selectedIndex])[0].dataset.code;
	var shipping_province = $("input[name='shipping_province']");
	var shipping_postal_code = $("input[name='shipping_postal_code']");
	var shipping_method = $("input[name='shipping_method']:checked").val();

	//billing form
	var different_billing = $("input[name='checkbox_billing_address']").prop('checked');
	var billing_first_name = $("input[name='billing_first_name']");
	var billing_last_name = $("input[name='billing_last_name']");
	var billing_address = $("input[name='billing_address']");
	var billing_apt = $("input[name='billing_apt']");
	var billing_city = $("input[name='billing_city']");
	var billing_country = $($("select[name='billing_country']")[0].children[$("select[name='billing_country']")[0].selectedIndex])[0].dataset.code;
	var billing_province = $("input[name='billing_province']");
	var billing_postal_code = $("input[name='billing_postal_code']");
	var billing_method = $("input[name='billing_method']");

	if(checkEmptyField(email,"error_shipping_form_email")){
		if(!validateEmail( email.val() )){
			$(".error_shipping_form_email").each(function() {
			    this.style.display = 'block';
			});
		}else{
			$(".error_shipping_form_email").each(function() {
			    this.style.display = 'none';
			});
		}
	}

	checkEmptyField(shipping_last_name,"error_shipping_last_name");
	checkEmptyField(shipping_address,"error_shipping_address");
	checkEmptyField(shipping_city,"error_shipping_city");
	checkEmptyField($("select[name='shipping_country']"),"error_shipping_country");
	checkEmptyField(shipping_province,"error_shipping_province");
	checkEmptyField(shipping_postal_code,"error_shipping_postal_code");

	if( different_billing != false ) {
		checkEmptyField(billing_last_name,"error_billing_last_name");
		checkEmptyField(billing_address,"error_billing_address");
		checkEmptyField(billing_city,"error_billing_city");
        checkEmptyField($("select[name='billing_country']"),"error_billing_country");
		checkEmptyField(billing_province,"error_billing_province");
		checkEmptyField(billing_postal_code,"error_billing_postal_code");
	}

	if(checkEmptyField(email,"error_shipping_form_email")){
		if(validateEmail( email.val() )){
			if(checkEmptyField(shipping_last_name,"error_shipping_last_name")){
				if(checkEmptyField(shipping_address,"error_shipping_address")){
					if(checkEmptyField(shipping_city,"error_shipping_city")){
						if(checkEmptyField(shipping_province,"error_shipping_province")){
							if(checkEmptyField($("select[name='shipping_country']"),"error_shipping_country")){
								if(checkEmptyField($("select[name='shipping_province']"),"error_shipping_province")){
									if(checkEmptyField(shipping_postal_code,"error_shipping_postal_code")){
										if( different_billing != false ) {
											if(checkEmptyField(billing_last_name,"error_billing_last_name")){
												if(checkEmptyField(billing_address,"error_billing_address")){
													if(checkEmptyField(billing_city,"error_billing_city")){
														if(checkEmptyField(billing_province,"error_billing_province")){
															if(checkEmptyField($("select[name='billing_country']"),"error_billing_country")){
																if(checkEmptyField($("select[name='billing_province']"),"error_billing_province")){
																	if(checkEmptyField(billing_postal_code,"error_billing_postal_code")){
																		ship_valid = true;
																		$(".no_shipping_found").each(function() {
																			$(window).scrollTop($('.no_shipping_found').offset().top);
																		});
																	}else{
																		billing_postal_code.focus();
																	}
																}else{
																	$("select[name='billing_province']").focus();
																}
															}else{
																$("select[name='billing_country']").focus();
															}
														}else{
															billing_province.focus();
														}
													}else{
														billing_city.focus();
													}
												}else{
													billing_address.focus();
												}
											}else{
												billing_last_name.focus();
											}
										}else{
											ship_valid = true;
											$(".no_shipping_found").each(function() {
												$(window).scrollTop($('.no_shipping_found').offset().top);
											});
										}
									}else{
										shipping_postal_code.focus();
									}
								}else{
									$("select[name='shipping_province']").focus();
								}
							}else{
								$("select[name='shipping_country']").focus();
							}
						}else{
							shipping_province.focus();
							if(checkEmptyField($("select[name='shipping_province']"),"error_shipping_province")){

							}else{
								$("select[name='shipping_province']").focus();
							}
							shipping_province.val("n/a");
						}
					}else{
						shipping_city.focus();
					}
				}else{
					shipping_address.focus();
				}
			}else{
				shipping_last_name.focus();
			}
		}else{
			$(".error_shipping_form_email").each(function() {
				$(this)[0].innerHTML = shipping_billing_error['error_shipping_form_email'];
			    this.style.display = 'block';
			});
			email.focus();
		}
	}else{
		email.focus();
	}

	$(".error_shipping_method").each(function() {
	    this.style.display = ( ( ( shipping_method == undefined ) || ( shipping_method == null ) || ( shipping_method == '' ) ) ? 'block' : 'none' );
	});

	if( ( shipping_method == undefined ) || ( shipping_method == null ) || ( shipping_method == '' ) ){
		ship_valid = false;
	}

	if( ship_valid == true ) {
		var paypal_selected = false;
		if( document.getElementById('payment_method_paypal_radio') != null ) {
			if( document.getElementById('payment_method_paypal_radio').checked == true ) paypal_selected = true;
		}
		//Initiate checkout
		if( paypal_selected == true ) {
			embedded_initiate_paypal_transaction();
		} else {
			if( typeof Stripe != 'undefined' ) {
				//create token from stripe
				var form = document.getElementsByClassName('checkout_form')[0];
				Stripe.card.createToken(form, process_billing_info);
			} else {
				if($("#credit_card_processor")[0].value == "bluesnap"){
					console.log("=====bluesnap=====");
					bluesnap_create_vault('embedded');
				}else if($("#credit_card_processor")[0].value == "nmi"){
					console.log("=====NMI=====");
					//NMI is selected to process credit card instead of Stripe
					if($("#total_price_for_checkout").length > 0){
						var nmi_grand_total_price = document.getElementById('total_price_for_checkout').innerHTML;
					}else{
						var nmi_grand_total_price = "0";
					}
					nmi_grand_total_price = nmi_grand_total_price.split( '&nbsp;' );
					var nmi_primary_amt = parseFloat( nmi_grand_total_price[1] );
					nmi_create_token('embedded', nmi_primary_amt);
				}
			}
		}
	}
	return false;
}

function checkEmptyField(field, msgClass){
	//console.log(msgClass);
	if(field.length > 0){
		if(field.val() == ""){
			$("."+msgClass).each(function() {
				$(this)[0].innerHTML = shipping_billing_error[msgClass];
			    this.style.display = 'block';
			});
			return false;
		}else{
			$("."+msgClass).each(function() {
			    this.style.display = 'none';
			});
			return true;
		}
	}else{
		return true;
	}
}

function validateEmail(email) {
  	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  	return re.test(email);
}

function process_billing_info(status, response) {
	var error = false;
	var token = '';
  	// Grab the form:
  	var form = document.getElementById('payment-form');

  	if(response.error) { // Problem!
  		error = true;

  		$(".error_credit_card_number").each(function() {
  			if( response.error.param == 'number' ) this.innerHTML = "Invalid value!";
		    this.style.display = ( ( response.error.param == 'number' ) ? 'block' : 'none' );
		});

		$(".error_cvc_code").each(function() {
			if( response.error.param == 'cvc' ) this.innerHTML = "Invalid value!";
		    this.style.display = ( ( response.error.param == 'cvc' ) ? 'block' : 'none' );
		});

		$(".error_card_expiry_mounth").each(function() {
  			if( response.error.param == 'exp_month' ) this.innerHTML = "Invalid value!";
		    this.style.display = ( ( response.error.param == 'exp_month' ) ? 'block' : 'none' );
		});

		$(".error_card_expiry_year").each(function() {
  			if( response.error.param == 'exp_year' ) this.innerHTML = "Invalid value!";
		    this.style.display = ( ( response.error.param == 'exp_year' ) ? 'block' : 'none' );
		});

  		if( response.error.type != '' ) {
			$(".card_messager_for_checkout_form").each(function() {
	  			if( response.error.code != '' ) this.innerHTML = card_messager_for_checkout_form;
			    this.style.display = ( ( response.error.code != '' ) ? 'block' : 'none' );
			    $(window).scrollTop($('.card_messager_for_checkout_form').offset().top);
			});
  		}

  		//Validation for paypal+credit card form
  		$("#error_card_number").each(function() {
  			this.classList.add("text-danger");
  			if( response.error.param == 'number' ) this.innerHTML = "Invalid value!";
  			else if( response.error.param == undefined ) this.innerHTML = card_messager_for_checkout_form;
			    
		    if( ( response.error.param == 'number' ) || ( response.error.param == undefined ) || ( response.error.param == '' ) ) {
		    	this.classList.remove("hide");
		    } else {
		    	this.classList.add("hide");
		    }
		});

		$("#error_card_cvv").each(function() {
			this.classList.add("text-danger");
			if( response.error.param == 'cvc' ) this.innerHTML = "Invalid value!";
		    if( response.error.param == 'cvc' ) {
		    	this.classList.remove("hide");
		    } else {
		    	this.classList.add("hide");
		    }
		});

		$("#error_card_exp_month").each(function() {
			this.classList.add("text-danger");
  			if( response.error.param == 'exp_month' ) this.innerHTML = "Invalid value!";
		    if( response.error.param == 'exp_month' ) {
		    	this.classList.remove("hide");
		    } else {
		    	this.classList.add("hide");
		    }
		});

		$("#error_card_exp_year").each(function() {
			this.classList.add("text-danger");
  			if( response.error.param == 'exp_year' ) this.innerHTML = "Invalid value!";
		    if( response.error.param == 'exp_year' ) {
		    	this.classList.remove("hide");
		    } else {
		    	this.classList.add("hide");
		    }
		});
  	} else {
    	token = response.id;
    	trigger_fbq_add_payment_info_event();

  	}

  	if( token != '' ) {
  		show_loading_bar(document.querySelectorAll('[onclick="checkout_now(this);"]'));
  		var email = $("input[name='shipping_form_email']").val();
		var shipping_first_name = $("input[name='shipping_first_name']").val();
		var shipping_last_name = $("input[name='shipping_last_name']").val();
		var shipping_ph_no = $("input[name='shipping_ph_no']").val();
		var shipping_address = $("input[name='shipping_address']").val();
		var shipping_apt = $("input[name='shipping_apt']").val();
		var shipping_city = $("input[name='shipping_city']").val();
		//var shipping_country = $("select[name='shipping_country']").val();
		var shipping_country = $($("select[name='shipping_country']")[0].children[$("select[name='shipping_country']")[0].selectedIndex])[0].dataset.code;
		var shipping_province = $("input[name='shipping_province']").val();
		var shipping_postal_code = $("input[name='shipping_postal_code']").val();
		var shipping_method = $("input[name='shipping_method']:checked").val();
		var shipping_methods = $("textarea[name='shipping_method_options']").val();

	  	//validate billing details
	  	var billing_validated = true;
		var different_billing = $("input[name='checkbox_billing_address']").prop('checked');
		var same_as_shipping = ( ( different_billing == true ) ? 'false' : 'true' );
		var billing_first_name = $("input[name='billing_first_name']").val();
		var billing_last_name = $("input[name='billing_last_name']").val();
		var billing_address = $("input[name='billing_address']").val();
		var billing_apt = $("input[name='billing_apt']").val();
		var billing_city = $("input[name='billing_city']").val();
		//var billing_country = $("select[name='billing_country']").val();
		var billing_country = $($("select[name='billing_country']")[0].children[$("select[name='billing_country']")[0].selectedIndex])[0].dataset.code;
		var billing_province = $("input[name='billing_province']").val();
		var billing_postal_code = $("input[name='billing_postal_code']").val();
		var subscribe_customer = 'false';

		//save billing info with billing token
		$.getJSON('/cart.js', function(cart) {
			var cart_token = cart.token;
			var funnel_id = current_funnel_id();
			var referrer = window.location.href;

			//Save updated cart
			var url = shopify_proxy_prefix + '/checkout/' + cart_token + '/?process=save_cart_data&embed=true';
			var data = 'cart=' + encodeURIComponent( JSON.stringify( cart ) ) + '&funnel_id=' + funnel_id;
			data += "&same_as_shipping=" + encodeURIComponent( same_as_shipping ) + "&billing_first_name=" + encodeURIComponent( billing_first_name ) + "&billing_last_name=" + encodeURIComponent( billing_last_name ) + "&billing_address=" + encodeURIComponent( billing_address ) + "&billing_apt=" + encodeURIComponent( billing_apt ) + "&billing_city=" + encodeURIComponent( billing_city ) + "&billing_country=" + encodeURIComponent( billing_country ) + "&billing_postal_code=" + encodeURIComponent( billing_postal_code ) + "&billing_province=" + encodeURIComponent( billing_province ) + "&subscribe_customer=" + subscribe_customer + "&token=" + token;
			data += "&email=" + encodeURIComponent( email ) + "&shipping_first_name=" + encodeURIComponent( shipping_first_name ) + "&shipping_last_name=" + encodeURIComponent( shipping_last_name ) + "&shipping_ph_no=" + encodeURIComponent( shipping_ph_no != 'undefined' ? shipping_ph_no : '' ) + "&shipping_address=" + encodeURIComponent( shipping_address ) + "&shipping_apt=" + encodeURIComponent( shipping_apt ) + "&shipping_city=" + encodeURIComponent( shipping_city ) + "&shipping_country=" + encodeURIComponent( shipping_country ) + "&shipping_province=" + encodeURIComponent( shipping_province ) + "&shipping_postal_code=" + encodeURIComponent( shipping_postal_code ) + "&shipping_option=" + shipping_method + '&shipping_options=' + encodeURIComponent( shipping_methods ) + '&referrer=' + encodeURIComponent(referrer);
			$.ajax({
				type: "POST",
				url: url,
				data: data,
				success: function (res){
					trigger_fbq_purchase_event(res);
					gaee_purchase();
					//window.location.href = res;
				}
			});
		});
			
	}
}

function embedded_initiate_paypal_transaction() {
	remove_string_from_url("#");
	show_loading_bar(document.querySelectorAll('[onclick="checkout_now(this);"]'));
	var email = $("input[name='shipping_form_email']").val();
	var shipping_first_name = $("input[name='shipping_first_name']").val();
	var shipping_last_name = $("input[name='shipping_last_name']").val();
	var shipping_ph_no = $("input[name='shipping_ph_no']").val();
	var shipping_address = $("input[name='shipping_address']").val();
	var shipping_apt = $("input[name='shipping_apt']").val();
	var shipping_city = $("input[name='shipping_city']").val();
	//var shipping_country = $("select[name='shipping_country']").val();
	var shipping_country = $($("select[name='shipping_country']")[0].children[$("select[name='shipping_country']")[0].selectedIndex])[0].dataset.code;
	var shipping_province = $("input[name='shipping_province']").val();
	var shipping_postal_code = $("input[name='shipping_postal_code']").val();
	var shipping_method = $("input[name='shipping_method']:checked").val();
	var shipping_methods = $("textarea[name='shipping_method_options']").val();

  	//validate billing details
  	var billing_validated = true;
	var different_billing = $("input[name='checkbox_billing_address']").prop('checked');
	var same_as_shipping = ( ( different_billing == true ) ? 'false' : 'true' );
	var billing_first_name = $("input[name='billing_first_name']").val();
	var billing_last_name = $("input[name='billing_last_name']").val();
	var billing_address = $("input[name='billing_address']").val();
	var billing_apt = $("input[name='billing_apt']").val();
	var billing_city = $("input[name='billing_city']").val();
	//var billing_country = $("select[name='billing_country']").val();
	var billing_country = $($("select[name='billing_country']")[0].children[$("select[name='billing_country']")[0].selectedIndex])[0].dataset.code;
	var billing_province = $("input[name='billing_province']").val();
	var billing_postal_code = $("input[name='billing_postal_code']").val();
	var subscribe_customer = 'false';
	
	//save billing info with billing token
	if($("#total_price_for_checkout").length > 0){
		var grand_total_price = document.getElementById('total_price_for_checkout').innerHTML;
	}else{
		var grand_total_price = "0";
	}
	grand_total_price = grand_total_price.split( '&nbsp;' );
	var primary_amt = parseFloat( grand_total_price[1] );

	//save billing info with billing token
	$.getJSON('/cart.js', function(cart) {
		var cart_token = cart.token;
		var funnel_id = current_funnel_id();
		var referrer = window.location.href;
		var url = shopify_proxy_prefix + '/checkout/' + cart_token + '/?process=save_cart_data&embed=true';
		var data = 'cart=' + encodeURIComponent( JSON.stringify( cart ) ) + '&funnel_id=' + funnel_id;
		data += "&same_as_shipping=" + encodeURIComponent( same_as_shipping ) + "&billing_first_name=" + encodeURIComponent( billing_first_name ) + "&billing_last_name=" + encodeURIComponent( billing_last_name ) + "&billing_address=" + encodeURIComponent( billing_address ) + "&billing_apt=" + encodeURIComponent( billing_apt ) + "&billing_city=" + encodeURIComponent( billing_city ) + "&billing_country=" + encodeURIComponent( billing_country ) + "&billing_postal_code=" + encodeURIComponent( billing_postal_code ) + "&billing_province=" + encodeURIComponent( billing_province ) + "&subscribe_customer=" + subscribe_customer;
		data += "&email=" + encodeURIComponent( email ) + "&shipping_first_name=" + encodeURIComponent( shipping_first_name ) + "&shipping_last_name=" + encodeURIComponent( shipping_last_name ) + "&shipping_address=" + encodeURIComponent( shipping_address ) + "&shipping_apt=" + encodeURIComponent( shipping_apt ) + "&shipping_city=" + encodeURIComponent( shipping_city ) + "&shipping_country=" + encodeURIComponent( shipping_country ) + "&shipping_province=" + encodeURIComponent( shipping_province ) + "&shipping_postal_code=" + encodeURIComponent( shipping_postal_code ) + "&shipping_option=" + shipping_method + '&shipping_options=' + encodeURIComponent( shipping_methods ) + '&referrer=' + encodeURIComponent(referrer);
		data += "&primary_amt=" + primary_amt;	
		$.ajax({
			type: "POST",
			url: url,
			data: data,
			success: function (res){
				if( res.trim() == 'error' ){
					alert("payment failed");
				}else{
					window.location.href = res.trim();
				}
			}
		});
	});
}

function current_funnel_id() {
	var current_url = window.location.href;
	var cubr = current_url.split( window.location.hostname );
	current_url = cubr[1];
	cubr = current_url.split('/');
	if( ( cubr[3] != undefined ) && ( cubr[4] != undefined ) && ( cubr[3].trim() == 'f' ) ) var funnel_id = cubr[4].trim();
	else var funnel_id = '0';
	return funnel_id;
}

function custom_checkout_shipping_methods() {
	var shipping_country = $($("select[name='shipping_country']")[0].children[$("select[name='shipping_country']")[0].selectedIndex])[0].dataset.code;
	var shipping_province = $("input[name='shipping_province']").val();
	var shipping_postal_code = $("input[name='shipping_postal_code']").val();
    var shop_currency = document.getElementById('shop_currency').value;
    
    if(shipping_country != "" && $(".empty_cart_warning").length == 0){
    	//collect shipping cost
		$.ajax({
	        url: "/cart/shipping_rates.json?shipping_address[zip]=" + encodeURIComponent( shipping_postal_code ) + "&shipping_address[country]=" + encodeURIComponent( shipping_country ) + "&shipping_address[province]=" + ( encodeURIComponent( shipping_province ) != '' ? encodeURIComponent( shipping_province ) : '1' ),
	        type: 'get',
	        error: function(xhr, status) {
	            //alert('There was a problem loading that page. You may need to refresh.');
	            var errors = xhr.responseJSON;
	            
	            if( ( errors.error != undefined ) && ( errors.error != null ) ) {
	            	if( errors.error[0] == "This cart does not require shipping" ) {
	            		data = JSON.parse( '{"shipping_rates":[{"name":"Free shipping","code":"Free shipping","price":"0.00","markup":"0.00","source":"shopify","delivery_date":null,"delivery_range":null,"delivery_days":[],"compare_price":null,"phone_required":null,"currency":null,"carrier_identifier":null,"delivery_category":null,"carrier_service_id":null,"description":null,"api_client_id":null,"requested_fulfillment_service_id":null,"shipment_options":null,"charge_items":null}]}' );
	            		custom_checkout_generate_shipping_options( data );
	            	}
	            } else if(shipping_country != "") {
			    	$(".custom_checkout_shipping_method")[0].innerHTML = '<div class="form-group no_shipping_found"><p class="text-danger error_shipping_method do_not_add_empty_button" style="display: _none;text-align:left;" id="p_154">'+shipping_billing_error['error_shipping_method']+'</p></div>';
			    }
	        }     
	    }).done(function(data){
	    	custom_checkout_generate_shipping_options( data );
	    });
    }else{
    	if($(".empty_cart_warning").length > 0){
    		$(".top_messager_for_checkout_form")[0].innerHTML = '<p class="text-danger" style="margin-bottom: 0;">'+cart_empty_msg+'</p>';
    		$(".top_messager_for_checkout_form").show();
    	}
    }
}

function custom_checkout_generate_shipping_options( data ) {
	var shop_currency = document.getElementById('shop_currency').value;
	var shipping_html = '';
   	if( data.shipping_rates.length > 0 ) {
       	shipping_html += '<div class="text-left">';
       		shipping_html += '<label>'+t_m_shipping_method+'</label><br>';
	       	for( var i = 0; i < data.shipping_rates.length; i++ ) {
	       		shipping_html += '<div class="form-group text-left">';
	       			shipping_html += '<label style="font-weight: normal;">';
						shipping_html += '<input type="radio" name="shipping_method" value="' + i + '" ' + ( i == 0 ? 'CHECKED="" ' : '' ) + ' onclick="custom_checkout_shipping_calculation()"> ';
						shipping_html += data.shipping_rates[i].name;
						shipping_html += ' ( ' + shop_currency + '&nbsp;' + data.shipping_rates[i].price + ' )';
					shipping_html += '</label>';
				shipping_html += '</div>';
	       	}
	    shipping_html += '</div>';
   	}
   	shipping_html += '<div class="form-group no_shipping_found"><p class="text-danger error_shipping_method do_not_add_empty_button" style="display: none;text-align:left;" id="p_154">'+shipping_billing_error['error_shipping_method2']+'</p></div>';
    shipping_html += '<textarea style="display:none" class="shipping_method_options" name="shipping_method_options">' + JSON.stringify( data.shipping_rates ) + '</textarea>';

    $(".no_shipping_found").remove();
    if($(".custom_checkout_shipping_method").length > 0){
    	document.getElementsByClassName('custom_checkout_shipping_method')[0].innerHTML = shipping_html;
    }   	
	custom_checkout_shipping_calculation();
}

function custom_checkout_shipping_calculation() {
	var shipping_country = $($("select[name='shipping_country']")[0].children[$("select[name='shipping_country']")[0].selectedIndex])[0].dataset.code;
	var shipping_province = $("input[name='shipping_province']").val();
	var shipping_postal_code = $("input[name='shipping_postal_code']").val();
	var shop_currency = document.getElementById('shop_currency').value;
	var shipping_method = parseInt( $("input[name='shipping_method']:checked").val() );
	var shipping_method_options = JSON.parse( document.getElementsByClassName('shipping_method_options')[0].value );
	var data = { shipping_rates: shipping_method_options };

	$.getJSON('/cart.js', function(cart) {
		$.get(shopify_proxy_prefix + "/checkout/" + cart.token + "/?process=fetch_tax_and_province&shipping_country=" + shipping_country + '&shipping_province=' + encodeURIComponent(shipping_province) + '&shipping_postal_code=' + encodeURIComponent( shipping_postal_code )).done(function( data_tax ) {
			data_tax = JSON.parse(data_tax);

			//check if country has provincial taxes, if there is, add it to original tax
			if( data_tax['province_tax'] != null ) {
				if( data_tax['province_tax']['tax_type'] == 'harmonized' ) data_tax.tax = data_tax['province_tax']['tax'];
				else if( data_tax['province_tax']['tax_type'] == 'compounded' ) {
					//Work on that later
					//No support for now
				} else data_tax.tax = ( parseFloat( data_tax.tax ) + parseFloat( data_tax['province_tax']['tax'] ) );
			}

			var tax_on_shipping = data_tax.tax_on_shipping;
			var shipping_cost = ( data.shipping_rates[shipping_method] != undefined ? parseFloat(data.shipping_rates[shipping_method].price) : 0 );
			var subtotal = parseFloat(cart.total_price/100);

			var tax_amount = ( data_tax.tax_included == 'true' ? 0 : ( ( subtotal + ( tax_on_shipping == 'true' ? shipping_cost : 0 ) ) * parseFloat(data_tax.tax) ) ).round(2);
			var grand_total = ( subtotal + shipping_cost + parseFloat( tax_amount ) ).round(2);

			if( $("#total_shipping_cost_for_checkout")[0] != undefined ) $("#total_shipping_cost_for_checkout")[0].innerHTML = shop_currency + '&nbsp;' + ( data.shipping_rates[shipping_method] != undefined ? parseFloat(data.shipping_rates[shipping_method].price) : 0 ).round(2).toFixed(2);
			if( $("#total_taxes_for_checkout")[0] != undefined ) $("#total_taxes_for_checkout")[0].innerHTML = shop_currency + '&nbsp;' + tax_amount.round(2).toFixed(2);
			if( $("#total_price_for_checkout")[0] != undefined ) $("#total_price_for_checkout")[0].innerHTML = shop_currency + '&nbsp;' + grand_total.round(2).toFixed(2);

		});
	});
}
 
function show_billing_address_div(me){
	if($(me).length > 0){
		if($(me)[0].checked){
	        $("#different_billing_address_div").show();
	    }else{
	        $("#different_billing_address_div").hide();
	    }
	}
}

Number.prototype.round = function(digits) {
    digits = Math.floor(digits);
    if (isNaN(digits) || digits === 0) {
        return Math.round(this);
    }
    if (digits < 0 || digits > 16) {
        throw 'RangeError: Number.round() digits argument must be between 0 and 16';
    }
    var multiplicator = Math.pow(10, digits);
    return Math.round(this * multiplicator) / multiplicator;
}

Number.prototype.fixed = function(digits) {
    digits = Math.floor(digits);
    if (isNaN(digits) || digits === 0) {
        return Math.round(this).toString();
    }
    var parts = this.round(digits).toString().split('.');
    var fraction = parts.length === 1 ? '' : parts[1];
    if (digits > fraction.length) {
        fraction += new Array(digits - fraction.length + 1).join('0');
    }
    return parts[0] + '.' + fraction;
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function generate_cart_bump() {
	var html = '';
	var bump_products = [];
	$.getJSON('/cart.js', function(cart) {
		if( ( cart['items'] != null ) && ( cart['items'][0] != undefined ) ) {
			html += '<table style="border: none" width="100%">';
			for( var j = 0; j < cart.items.length; j++ ) {
				if( !inArray( cart['items'][j]['product_id'], bump_products ) ) {
					bump_products[ bump_products.length ] = cart['items'][j]['product_id'];
					var shop_money_format = document.getElementById('shop_money_format').value;
					var template = document.getElementById( 'cart_bump_template' ).value;
					template = template.replace( '[PRODUCT_TITLE]', cart['items'][j]['title'] );
					template = template.replace( '[PRODUCT_PRICE]', shop_money_format.replace( '{{amount}}', myNamespace.round( ( parseInt( cart['items'][j]['price'] ) / 100 ), 2 ) ) ); 
					
					for( var i = 1; i <= document.getElementById('cart_bump_items').value; i++ ) {
						html += '<tr style="border: none">';
						html += '<td style="padding: 8px; vertical-align: top;"><input type="checkbox" class="cart_bump_checkbox_input" onchange="javascript: bump_cart_with(this, \'' + cart['items'][j]['handle'] + '\', \'' + cart['items'][j]['variant_id'] + '\', \'' + i + '\')">&nbsp;</td>';
						html += '<td style="padding: 8px; vertical-align: top;">' + template.replace( '[PRODUCT_TOTAL_PRICE]', shop_money_format.replace( '{{amount}}', myNamespace.round( ( ( parseInt( cart['items'][j]['price'] ) / 100 ) * i ), 2 ) ) ).replace( '[NUMBER_OF_ITEMS]', i );
						html += '</tr>';
					}
				}
			}
			html += '</table>';
			if($("#cart_bump_div").length > 0){
				document.getElementById( 'cart_bump_div' ).innerHTML = html;
			}
		}
	});
}

function bump_cart_with( checkbox, handle, variant_id, quantity ) {
	var html = '';
	var selected_variant_title = '';
	var cart_bump_checkbox_inputs = document.getElementsByClassName('cart_bump_checkbox_input');
	checkbox.checked = true;
	for( var i = 0; i < cart_bump_checkbox_inputs.length; i++ ) {
		if( checkbox != cart_bump_checkbox_inputs[i] ) {
			cart_bump_checkbox_inputs[i].checked = false;
		}
	}

	$.getJSON('/products/' + handle + '.js', function(product) {
		if( product['variants'].length > 1 ) {
			//hidden variant list
			selected_variant_title = product['variants'][0]['title'];
			html += '<select id="cart_bump_variant_id" style="display:none;">';
			for( var j = 0; j < product['variants'].length; j++ ) {
				if( product['variants'][j]['id'] == variant_id ) {
					selected_variant_title = product['variants'][j]['title'];
				}
				if( product['variants'][j]['available'] == true ) html += '<option value="' + product['variants'][j]['id'] + '"' +  ( product['variants'][j]['id'] == variant_id ? 'SELECTED=""' : '' ) + '>' + product['variants'][j]['title'] + '</option>';
			}
			html += '</select>';

			var selected_variant_options_title = selected_variant_title.split('/');
			//variant chooser dropdown form
			html += '<div class="row">';
				html += '<div class="col-md-4" align="center">';
					if( ( product['featured_image'] != undefined ) && ( product['featured_image'] != '' ) ) html += '<img src="' + product['featured_image'] + '" class="img-responsive" style="max-height: 150px;">';
					else html += '<img src="' + base + '/files/editorscript/images/demo.png" class="img-responsive" style="max-height: 150px;">';
				html += '</div>';
				html += '<div class="col-md-8">';
					html += '<h4>' + product['title'] + '</h4>';
					for( var i = 0; i < product['options'].length; i++ ) {
						html += '<div class="form-group" ' + ( product['options'][i]['values'].length <= 1 ? 'style="display:none"' : '' ) + '>';
							html += '<select id="cart_bump_variant_option_' + i + '" class="form-control cart_bump_variant_selection">';
								for( var k = 0; k < product['options'][i]['values'].length; k++ ) {
									html += '<option value="' + product['options'][i]['values'][k] + '"' + ( selected_variant_options_title[i].trim() == product['options'][i]['values'][k].trim() ? 'SELECTED=""' : '' ) + '>' + product['options'][i]['values'][k] + '</option>';
								}
							html += '</select>';
						html += '</div>';
					}
					html += '<div id="cart_bump_out_of_stock_message" style="display:none; text-align: center;"><span style="color:#b92c28; font-size:13px; margin-top: 10px;" class="text-center"><i class="glyphicon glyphicon-time" aria-hidden="true" style="color:#b92c28;"></i> '+out_of_stock+' </span></div>';
				html += '</div>';
			html += '</div>';
			document.getElementById('cartBumpModalBody').innerHTML = html;
			$('#cartBumpModal').modal('show');

			$( ".cart_bump_variant_selection" ).change(function() {
				document.getElementById('cart_bump_button').style.display = 'inline-block';
				document.getElementById('cart_bump_out_of_stock_message').style.display = 'none';
				var matches_required = product['options'].length;
			  	for( var i = 0; i < product['variants'].length; i++ ) {
			  		var matches_found = 0;
			  		var options_title = product['variants'][i]['title'].split('/');
			  		for( var j = 0; j < matches_required; j++ ) {
			  			if( options_title[j].trim() == document.getElementById('cart_bump_variant_option_' + j).value.trim() ) {
			  				matches_found++;
			  			}
			  		}

			  		if( matches_found >= matches_required ) {
			  			document.getElementById('cart_bump_variant_id').value = product['variants'][i]['id'];
			  			break;
			  		}
			  	}

			  	if( matches_found < matches_required ) {
			  		document.getElementById('cart_bump_out_of_stock_message').style.display = 'block';
			  		document.getElementById('cart_bump_button').style.display = 'none';
			  	}
			});

			$( "#cart_bump_button" ).unbind( "click" );
			$( "#cart_bump_button" ).click(function() {
			  	bump_the_cart( quantity, document.getElementById('cart_bump_variant_id').value , checkbox);
			});

			$( "#cart_bump_cancel" ).click(function() {
			  	checkbox.checked = false;
			});
		} else {
			if( variant_id.trim() == '' ) variant_id = product['variants'][0]['id'];
			//bump with the selected variant id
			bump_the_cart( quantity, variant_id , checkbox );
		}
	});
}

function bump_the_cart( quantity, variant_id, checkbox ) {
	if($("#order_summary_command").length > 0){//this means this is default checkout page
		show_loading_bar(checkbox);
	}else{
		//$("#normal_loading").show();
		$(".loader").show();
	}
	
	var data = "quantity="+quantity+"&id="+variant_id;
	var url = '/cart/add.js';
    $.ajax({
		type: "POST",
		url: url,
		data: data,
		error: function (res){
			if(res.status == 200){
				var cart_info = JSON.parse(res.responseText);						
				var item_price = parseFloat( cart_info.price/100 ).round(2).toFixed(2);
				fbq_add_to_cart("AddToCart","product_group","",item_price,quantity,$("#shop_currency")[0].value,[variant_id]);
				if (check_if_google_analytics_id_exist() == true) {
					gaee_product_added(cart_info.product_id,cart_info.product_title,quantity,cart_info.variant_title,item_price,$("#shop_currency")[0].value);
				}
				setTimeout( function() {
					bump_update_cart_data();
				}, 2000 );
			}else{
				$(".cart_bump_checkbox_input").each(function() {
					$(this).attr('checked', false);
				});
				$(".loader").hide();
			}
		},
		async: false
	});
}

function bump_update_cart_data() {
	//send cart data to checkout database
	$.getJSON('/cart.js', function(cart) {
		cart_token = cart.token;
		var funnel_id = document.getElementById('funnel_id').value;
		//send a post request to:
		var url = shopify_proxy_prefix + '/checkout/' + cart.token + '/?proces=save_cart_data';
		var data = 'cart=' + encodeURIComponent( JSON.stringify( cart ) ) + '&funnel_id=' + funnel_id + '&ajax=true';
		$.ajax({
			type: "POST",
			url: url,
			data: data,
			success: function (res) {
				if($("#order_summary_command").length > 0){//this means this is default checkout page
					reload();
				}else{
					update_cart_info_without_refresh();
				}
			}
		});
	});
}

function update_cart_info_without_refresh(){
	if($(".custom_checkout_cart_info").length > 0){
		$(".custom_checkout_cart_info").each(function() {
		    custom_checkout_cart_info( this );
		});
		if($(".shipping_method_options").length > 0){
			setTimeout( function() {
				custom_checkout_shipping_methods();
			}, 500 );
		}
	}
	$(".cart_bump_checkbox_input").each(function() {
		$(this).attr('checked', false);
	});

	//$("#normal_loading").hide();
	$(".loader").hide();
}

var reload = function () {
	add_shipping_form_input_data_cookie();
    var regex = new RegExp("([?;&])reload[^&;]*[;&]?");
    var query = window.location.href.split('#')[0].replace(regex, "$1").replace(/&$/, '');
    window.location.href = query;
};

var myNamespace = {};

myNamespace.round = function(number, precision) {
    var factor = Math.pow(10, precision);
    var tempNumber = number * factor;
    var roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
};

function inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
}
function add_shipping_form_input_data_cookie(){
	$("input[name='email']").each(function() {
		createCookie("email",$("input[name='email']")[0].value,2);
	});
	$("input[name='shipping_form_email']").each(function() {
		createCookie("shipping_form_email",$("input[name='shipping_form_email']")[0].value,2);
	});
	$("input[name='shipping_first_name']").each(function() {
		createCookie("shipping_first_name",$("input[name='shipping_first_name']")[0].value,2);
	});
	$("input[name='shipping_last_name']").each(function() {
		createCookie("shipping_last_name",$("input[name='shipping_last_name']")[0].value,2);
	});
	$("input[name='shipping_address']").each(function() {
		createCookie("shipping_address",$("input[name='shipping_address']")[0].value,2);
	});
	$("input[name='shipping_apt']").each(function() {
		createCookie("shipping_apt",$("input[name='shipping_apt']")[0].value,2);
	});
	$("input[name='shipping_city']").each(function() {
		createCookie("shipping_city",$("input[name='shipping_city']")[0].value,2);
	});
	$("input[name='shipping_province']").each(function() {
		createCookie("shipping_province",$("input[name='shipping_province']")[0].value,2);
	});

	$("select[name='shipping_country']").each(function() {
		createCookie("shipping_country",$($("select[name='shipping_country']")[0].children[$("select[name='shipping_country']")[0].selectedIndex])[0].dataset.code,2);
	});

	$("select[name='shipping_province']").each(function() {
		createCookie("select_shipping_province",$("select[name='shipping_province']")[0].value,2);
	});

	$("input[name='shipping_postal_code']").each(function() {
		createCookie("shipping_postal_code",$("input[name='shipping_postal_code']")[0].value,2);
	});


	$("input[name='billing_first_name']").each(function() {
		createCookie("billing_first_name",$("input[name='billing_first_name']")[0].value,2);
	});
	$("input[name='billing_last_name']").each(function() {
		createCookie("billing_last_name",$("input[name='billing_last_name']")[0].value,2);
	});
	$("input[name='billing_address']").each(function() {
		createCookie("billing_address",$("input[name='billing_address']")[0].value,2);
	});
	$("input[name='billing_apt']").each(function() {
		createCookie("billing_apt",$("input[name='billing_apt']")[0].value,2);
	});
	$("input[name='billing_city']").each(function() {
		createCookie("billing_city",$("input[name='billing_city']")[0].value,2);
	});
	$("input[name='billing_province']").each(function() {
		createCookie("billing_province",$("input[name='billing_province']")[0].value,2);
	});

	$("select[name='billing_country']").each(function() {
		createCookie("billing_country",$($("select[name='billing_country']")[0].children[$("select[name='billing_country']")[0].selectedIndex])[0].dataset.code,2);
	});

	$("select[name='billing_province']").each(function() {
		createCookie("select_billing_province",$("select[name='billing_province']")[0].value,2);
	});

	$("input[name='billing_postal_code']").each(function() {
		createCookie("billing_postal_code",$("input[name='billing_postal_code']")[0].value,2);
	});
}

function insert_shipping_data_from_cookie(){
	$("input[name='email']").each(function() {
		if( readCookie("email") != null ) $(this)[0].value = readCookie("email");
	});
	$("input[name='shipping_form_email']").each(function() {
		if( readCookie("shipping_form_email") != null ) $(this)[0].value = readCookie("shipping_form_email");
	});
	$("input[name='shipping_first_name']").each(function() {
		if( readCookie("shipping_first_name") != null ) $(this)[0].value = readCookie("shipping_first_name");
	});
	$("input[name='shipping_last_name']").each(function() {
		if( readCookie("shipping_last_name") != null ) $(this)[0].value = readCookie("shipping_last_name");
	});
	$("input[name='shipping_address']").each(function() {
		if( readCookie("shipping_address") != null ) $(this)[0].value = readCookie("shipping_address");
	});
	$("input[name='shipping_apt']").each(function() {
		if( readCookie("shipping_apt")!= null ) $(this)[0].value = readCookie("shipping_apt");
	});
	$("input[name='shipping_city']").each(function() {
		if( readCookie("shipping_city") != null ) $(this)[0].value = readCookie("shipping_city");
	});
	$("input[name='shipping_province']").each(function() {
		if( readCookie("shipping_province") != null ) $(this)[0].value = readCookie("shipping_province");
	});

	

	$("input[name='shipping_postal_code']").each(function() {
		if( readCookie("shipping_postal_code") != null ) $(this)[0].value = readCookie("shipping_postal_code");
		$(this).trigger("change");
	});

	$("input[name='billing_first_name']").each(function() {
		if( readCookie("billing_first_name") != null ) $(this)[0].value = readCookie("billing_first_name");
	});
	$("input[name='billing_last_name']").each(function() {
		if( readCookie("billing_last_name") != null ) $(this)[0].value = readCookie("billing_last_name");
	});
	$("input[name='billing_address']").each(function() {
		if( readCookie("billing_address") != null ) $(this)[0].value = readCookie("billing_address");
	});
	$("input[name='billing_apt']").each(function() {
		if( readCookie("billing_apt") != null ) $(this)[0].value = readCookie("billing_apt");
	});
	$("input[name='billing_city']").each(function() {
		if( readCookie("billing_city") != null ) $(this)[0].value = readCookie("billing_city");
	});
	$("input[name='billing_province']").each(function() {
		if( readCookie("billing_province") != null ) $(this)[0].value = readCookie("billing_province");
	});

	// $("select[name='billing_country']").each(function() {
	// 	var temp_country = readCookie("billing_country");
	// 	if(temp_country != ""){
	// 		$("select[name='billing_country']").find("option[data-code="+temp_country+"]").attr("selected", "selected");
	// 		reload_country_preferences_for_embeded_checkout_for_billing_address();
	// 	}
	// });

	$("input[name='billing_postal_code']").each(function() {
		if( readCookie("billing_postal_code") != null ) $(this)[0].value = readCookie("billing_postal_code");
	});
}

function createCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value  + "; path=/";
    //document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}

	
function change_main_province_value(){
    $('input[name=shipping_province]')[0].value=$('select[name=shipping_province]')[0].value;
    custom_checkout_shipping_methods();
}
function reload_country_preferences_for_embeded_checkout(){
    var shipping_country = $($("select[name='shipping_country']")[0].children[$("select[name='shipping_country']")[0].selectedIndex])[0].dataset.code;
    var shipping_province = '';
    $.get(shopify_proxy_prefix + "/checkout/" + uuid + "/?process=fetch_tax_and_province&shipping_country=" + shipping_country + '&shipping_province=' + encodeURIComponent( shipping_province )).done(function( data ) {
        data = JSON.parse( data ); 
        var html = '';
        $('input[name=shipping_province]')[0].value='n/a';
	    if ($( ".remove_on_change" ).length > 0) {
	        $( ".remove_on_change" ).remove();
	    }
        if( data['provinces']['state_title'] != undefined ) {
            if( document.getElementById('shipping_province_data') != null ) var selected = document.getElementById('shipping_province_data').value;
            html += '<div class="form-group col-md-12 em_shipping_province remove_on_change"><select class="billing_form_input_style form-control" name="shipping_province" id="shipping_province" onchange="change_main_province_value()">';
                html += '<option value="">' + data['provinces']['state_title'] + '</option>';
                for( var i = 0; i < data['provinces']['states'].length; i++ ) {
                    html += '<option value="' + data['provinces']['states'][i]['title'] + '" ' + ( selected == data['provinces']['states'][i]['title'] ? 'SELECTED=""' : '' ) + '>' + data['provinces']['states'][i]['title'] + '</option>';
                }
            html += '</select>';
            html += '<p class="text-danger error_shipping_province do_not_add_empty_button text-left" style="display: none;">'+shipping_billing_error['error_shipping_province']+'</p></div>';
            $( html ).insertAfter($('select[name=shipping_country]').parent()[0]);

            $("select[name=shipping_province]").each(function() {
            	if($("select[name=shipping_province]")[0].innerHTML.indexOf(readCookie("select_shipping_province"))	> 0 && readCookie("select_shipping_province") != ""){
            		$(this).val(readCookie("select_shipping_province"));
					$(this).trigger("change");
					$("input[name=shipping_postal_code]").trigger("change");
            	}
			});
        }
        if (html == '') {
            $('input[name=shipping_province]')[0].value=$('input[name=shipping_city]')[0].value;
        }

        if($('input[name=shipping_province]')[0].value == ""){
        	$('input[name=shipping_province]')[0].value = "n/a";
        }

    });    
}

function change_main_province_value_for_billing_address(){
   $('input[name=billing_province]')[0].value=$('select[name=billing_province]')[0].value;
   custom_checkout_shipping_methods();
}
function reload_country_preferences_for_embeded_checkout_for_billing_address(){
   var billing_country = $($("select[name='billing_country']")[0].children[$("select[name='billing_country']")[0].selectedIndex])[0].dataset.code;
   var billing_province = '';
   $.get(shopify_proxy_prefix + "/checkout/" + uuid + "/?process=fetch_tax_and_province&shipping_country=" + billing_country + '&shipping_province=' + encodeURIComponent( billing_province )).done(function( data ) {
       data = JSON.parse( data );
       var html = '';
       $('input[name=billing_province]')[0].value='n/a';
	   if ($( ".remove_on_change_for_billing_address" ).length > 0) {
	       $( ".remove_on_change_for_billing_address" ).remove();
	   }
       if( data['provinces']['state_title'] != undefined ) {
       	  
           html += '<div class="form-group col-md-12 em_shipping_province remove_on_change_for_billing_address"><select class="billing_form_input_style form-control" name="billing_province" id="billing_province" onchange="change_main_province_value_for_billing_address()">';
               html += '<option value="">' + data['provinces']['state_title'] + '</option>';
               for( var i = 0; i < data['provinces']['states'].length; i++ ) {
                   html += '<option value="' + data['provinces']['states'][i]['title'] + '" ' + '>' + data['provinces']['states'][i]['title'] + '</option>';
               }
           html += '</select>';
           html += '<p class="text-danger error_billing_province do_not_add_empty_button text-left" style="display: none;">'+shipping_billing_error['error_shipping_province']+'</p></div>';
           $( html ).insertAfter($('select[name=billing_country]').parent()[0]);
           $("select[name=billing_province]").each(function() {
           		if($("select[name=billing_province]")[0].innerHTML.indexOf(readCookie("select_billing_province")) > 0 && readCookie("select_billing_province") != ""){
           			$(this).val(readCookie("select_billing_province"));
					$(this).trigger("change");
					$("input[name=billing_postal_code]").trigger("change");
           		}
			});
       }
       if (html == '') {
           $('input[name=billing_province]')[0].value=$('input[name=billing_city]')[0].value;
       }

       if($('input[name=billing_province]')[0].value == ""){
        	$('input[name=billing_province]')[0].value = "n/a";
        }

  });
   
}

function set_country_from_cookie(){

	$("select[name='shipping_country']").each(function() {
		var temp_country = readCookie("shipping_country");
		if(temp_country != ""){
			$("select[name='shipping_country']").find("option[data-code="+temp_country+"]").attr("selected", "selected");
			reload_country_preferences_for_embeded_checkout();
			$(this).trigger("change");
		}
	});

	$("select[name='billing_country']").each(function() {
		var temp_country = readCookie("billing_country");
		if(temp_country != ""){
			$("select[name='billing_country']").find("option[data-code="+temp_country+"]").attr("selected", "selected");
			reload_country_preferences_for_embeded_checkout_for_billing_address();
			$(this).trigger("change");
		}
	});

	$("input[name='shipping_province']").parent().css("display","none");
	$("input[name='billing_province']").parent().css("display","none");

	$("select[name='shipping_country']").on('change', function() {
	    reload_country_preferences_for_embeded_checkout();
	});
	$("select[name='billing_country']").on('change', function() {
	    reload_country_preferences_for_embeded_checkout_for_billing_address();
	});

}

function fire_change_event( element ) {
	if ("createEvent" in document) {
	    var evt = document.createEvent("HTMLEvents");
	    evt.initEvent("change", false, true);
	    element.dispatchEvent(evt);
	} else element.fireEvent("onchange");
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function checkCookie(cname) {
	var username = getCookie(cname);
	if (username != "") {
	   return true ;
	} else {
	    return false;
	}
}

function abandoned_cart_save_email (email) {
	$.getJSON('/cart.js', function(cart) {
		var data = 'cart_token=' + cart.token;
		data +=  '&email=' + email;
		http_post_request(base +'/api/' + cart.token + '/?process=capture_email', data, 'save_email_successfull');
	});
}
function abandoned_cart_save_first_last_name (email,first_name,last_name){
	$.getJSON('/cart.js', function(cart) {
		var data = 'cart_token=' + cart.token;
		data +=  '&email=' + email;
		data +=  '&first_name=' + first_name;
		data +=  '&last_name=' + last_name;
		http_post_request(base + '/api/' + cart.token + '/?process=save_first_last_name', data, 'save_email_successfull');
	});
}

function save_email_successfull(response){
	//console.log(response);
}

function embedded_payment_method_selection(element) {
	if($("#payment_method_credit_card").length > 0){
		document.getElementById('payment_method_credit_card').style.display = 'none';
	}
	if($("#payment_method_paypal").length > 0){
		document.getElementById('payment_method_paypal').style.display = 'none';
	}
    if($('#payment_method_' + element.value).length > 0){
    	document.getElementById('payment_method_' + element.value ).style.display = 'block';
    }
}

function regenerate_abandoned_cart(old_token, old_cart, checkout_url) {
	$(".loading").show();
	old_cart = JSON.parse(old_cart );

	//clear current cart first
	$.ajax({
		type: "POST",
		url: '/cart/clear.js',
		data: ''
	});

	if( old_cart.shipping_details != null ) {
		if( ( old_cart.shipping_details.email != null ) && ( old_cart.shipping_details.email != undefined ) ) createCookie("email",old_cart.shipping_details.email,2);
		if( ( old_cart.shipping_details.email != null ) && ( old_cart.shipping_details.email != undefined ) ) createCookie("shipping_form_email",old_cart.shipping_details.email,2);
		if( ( old_cart.shipping_details.first_name != null ) && ( old_cart.shipping_details.first_name != undefined ) ) createCookie("shipping_first_name",old_cart.shipping_details.first_name,2);
		if( ( old_cart.shipping_details.last_name != null ) && ( old_cart.shipping_details.last_name != undefined ) ) createCookie("shipping_last_name",old_cart.shipping_details.last_name,2);
	}

	//regenerate cart from abandoned cart info
	setTimeout( function() {
		$.getJSON('/cart.js', function(cart) {
			var variant_arr = new Array();
			var quantity_arr = new Array();

			//if old token is same as new token, regenerate add products into the cart and reload this page
			for(var i=0;i<old_cart.items.length;i++){
				var variant_id = old_cart.items[i].variant_id;
				var quantity = old_cart.items[i].quantity;
				variant_arr.push(variant_id);
				quantity_arr.push(quantity);
			}

			for(var i=0;i<variant_arr.length;i++){
				add_cart_for_this_variant_ref_inbox(variant_arr[i], quantity_arr[i]);
			}

			//If old token is not same as new token
			if(cart.token != old_token){
				var data = 'old_token=' + old_token;
				data +=  '&new_token=' + cart.token;
				http_post_request(shopify_proxy_prefix  + '/display/?process=copy_abandoned_cart', data, 'copy_abandoned_cart_complete', checkout_url);
			}else{
				copy_abandoned_cart_complete(old_token, checkout_url);
			}
		});
	}, 1500 );
}

function copy_abandoned_cart_complete(res, checkout_url){
	var url = window.location.href;
	url = url.slice(0, url.lastIndexOf('/'));
	url = url.slice(0, url.lastIndexOf('/'));
	url = url+"/"+res+"/";

	if( checkout_url.trim() != '' ) url = checkout_url;
	window.location.href = url;
}
function add_cart_for_this_variant_ref_inbox(variant_id, quantity){
	var data = "quantity="+quantity+"&id="+variant_id;
	var url = '/cart/add.js';
	$.ajax({
		type: "POST",
		url: url,
		data: data,
		error: function (res){
			var cart_info = JSON.parse(res.responseText);
		},
		async: false
	});
}

function update_cart_for_this_variant_ref_inbox(variant_id, quantity){
	var req = jQuery.post('/cart/update.js', "updates["+variant_id+"]="+quantity);
}

function remove_url_get_params( url ) {
	var br = url.split('?');
	return br[0];
}

function open_popup(id){
	var btn = '<button id="auto_pop_up_show_hide" data-target="#'+id+'" data-toggle="modal">click me</button>'
	$('body').append(btn);
	$("#auto_pop_up_show_hide").click();
	$("#auto_pop_up_show_hide").remove();
}

function go_next_page(this_btn){
	show_loading_bar(this_btn);
	$.getJSON('/cart.js', function(cart) {
		window.location.href = remove_url_get_params( window.location.href ) + '?go=left&cart_token=' + cart.token;
	});
}

function nmi_create_token( checkout_from, primary_amt ) {
	var card_number = $("[data-stripe='number']").val();
	var exp_month = $("[data-stripe='exp_month']").val();
	var exp_year = $("[data-stripe='exp_year']").val();
	var cvv = $("[data-stripe='cvc']").val();

	if(checkout_from != 'default'){
		trigger_fbq_add_payment_info_event();
	}
	
	$.getJSON('/cart.js', function(cart) {
		var cart_token = cart.token;
		var data = "";
		data += "card_number="+card_number+"&exp_month="+exp_month+"&exp_year="+exp_year+"&cvv="+cvv+"&primary_amt="+encodeURIComponent(primary_amt);
		http_post_request ( shopify_proxy_prefix + '/checkout/' + cart_token + '/?process=nmi_create_vault', data, ( checkout_from == 'default' ? 'nmi_vault_created' : 'nmi_vault_created_for_embedded' ), cart_token );
	});
}

function nmi_vault_created_for_embedded( response, cart_token ) {
	var res = JSON.parse( response );
	if( parseInt( res.response ) != 1 ) {
		$(".card_messager_for_checkout_form").each(function() {
				if( parseInt( res.response ) == 3 ) this.innerHTML = card_messager_for_checkout_form;
		    this.style.display = ( ( parseInt( res.response ) == 3 ) ? 'block' : 'none' );
		    $(window).scrollTop($('.card_messager_for_checkout_form').offset().top);
		});

		//Validation for paypal+credit card form
  		$("#error_card_number").each(function() {
  			this.classList.add("text-danger");
  			if( parseInt( res.response ) == 3 ) this.innerHTML = card_messager_for_checkout_form;
			    
		    if( parseInt( res.response ) == 3 ) {
		    	this.classList.remove("hide");
		    } else {
		    	this.classList.add("hide");
		    }
		});
  	} else if( ( res.customer_vault_id != null ) && ( res.customer_vault_id != undefined ) ) {
  		show_loading_bar(document.querySelectorAll('[onclick="checkout_now(this);"]'));
  		var email = $("input[name='shipping_form_email']").val();
		var shipping_first_name = $("input[name='shipping_first_name']").val();
		var shipping_last_name = $("input[name='shipping_last_name']").val();
		var shipping_ph_no = $("input[name='shipping_ph_no']").val();
		var shipping_address = $("input[name='shipping_address']").val();
		var shipping_apt = $("input[name='shipping_apt']").val();
		var shipping_city = $("input[name='shipping_city']").val();
		//var shipping_country = $("select[name='shipping_country']").val();
		var shipping_country = $($("select[name='shipping_country']")[0].children[$("select[name='shipping_country']")[0].selectedIndex])[0].dataset.code;
		var shipping_province = $("input[name='shipping_province']").val();
		var shipping_postal_code = $("input[name='shipping_postal_code']").val();
		var shipping_method = $("input[name='shipping_method']:checked").val();
		var shipping_methods = $("textarea[name='shipping_method_options']").val();

	  	//validate billing details
	  	var billing_validated = true;
		var different_billing = $("input[name='checkbox_billing_address']").prop('checked');
		var same_as_shipping = ( ( different_billing == true ) ? 'false' : 'true' );
		var billing_first_name = $("input[name='billing_first_name']").val();
		var billing_last_name = $("input[name='billing_last_name']").val();
		var billing_address = $("input[name='billing_address']").val();
		var billing_apt = $("input[name='billing_apt']").val();
		var billing_city = $("input[name='billing_city']").val();
		//var billing_country = $("select[name='billing_country']").val();
		var billing_country = $($("select[name='billing_country']")[0].children[$("select[name='billing_country']")[0].selectedIndex])[0].dataset.code;
		var billing_province = $("input[name='billing_province']").val();
		var billing_postal_code = $("input[name='billing_postal_code']").val();
		var subscribe_customer = 'false';

		//save billing info with billing token
		var funnel_id = current_funnel_id();
		var referrer = window.location.href;

		$.getJSON('/cart.js', function(cart) {
			//Save updated cart
			var url = shopify_proxy_prefix + '/checkout/' + cart_token + '/?process=save_cart_data&embed=true';
			var data = 'cart=' + encodeURIComponent( JSON.stringify( cart ) ) + '&funnel_id=' + funnel_id;
			data += "&same_as_shipping=" + encodeURIComponent( same_as_shipping ) + "&billing_first_name=" + encodeURIComponent( billing_first_name ) + "&billing_last_name=" + encodeURIComponent( billing_last_name ) + "&billing_address=" + encodeURIComponent( billing_address ) + "&billing_apt=" + encodeURIComponent( billing_apt ) + "&billing_city=" + encodeURIComponent( billing_city ) + "&billing_country=" + encodeURIComponent( billing_country ) + "&billing_postal_code=" + encodeURIComponent( billing_postal_code ) + "&billing_province=" + encodeURIComponent( billing_province ) + "&subscribe_customer=" + subscribe_customer + "&customer_vault_id=" + res.customer_vault_id + "&stripe=false";
			data += "&email=" + encodeURIComponent( email ) + "&shipping_first_name=" + encodeURIComponent( shipping_first_name ) + "&shipping_last_name=" + encodeURIComponent( shipping_last_name ) + "&shipping_ph_no=" + encodeURIComponent( shipping_ph_no != 'undefined' ? shipping_ph_no : '' ) + "&shipping_address=" + encodeURIComponent( shipping_address ) + "&shipping_apt=" + encodeURIComponent( shipping_apt ) + "&shipping_city=" + encodeURIComponent( shipping_city ) + "&shipping_country=" + encodeURIComponent( shipping_country ) + "&shipping_province=" + encodeURIComponent( shipping_province ) + "&shipping_postal_code=" + encodeURIComponent( shipping_postal_code ) + "&shipping_option=" + shipping_method + '&shipping_options=' + encodeURIComponent( shipping_methods ) + '&referrer=' + encodeURIComponent(referrer);
			$.ajax({
				type: "POST",
				url: url,
				data: data,
				success: function (res){
					trigger_fbq_purchase_event(res);
					gaee_purchase();
					//window.location.href = res;
				}
			});
		});
	}
}

function bluesnap_create_vault(checkout_from){
	var card_number = $("[data-stripe='number']").val();
	var exp_month = $("[data-stripe='exp_month']").val();
	var exp_year = $("[data-stripe='exp_year']").val();
	var cvv = $("[data-stripe='cvc']").val();
	var firstName = "";
	var lastName = "";
	if(checkout_from == "default"){
		if($("#shipping_first_name").length > 0){
			firstName = $("#shipping_first_name")[0].value;
		}
		if($("#shipping_last_name").length > 0){
			lastName = $("#shipping_last_name")[0].value;
		}
	}else{
		if($("[name='shipping_first_name']").length > 0){
			firstName = $("[name='shipping_first_name']").val();
		}
		if($("[name='shipping_last_name']").length > 0){
			lastName = $("[name='shipping_last_name']").val();
		}
	}

	if(checkout_from != 'default'){
		trigger_fbq_add_payment_info_event();
	}

	$.getJSON('/cart.js', function(cart) {
		var cart_token = cart.token;
		var data = "";
		data += "card_number="+card_number+"&exp_month="+exp_month+"&exp_year="+exp_year+"&cvv="+cvv+"&firstName="+firstName+"&lastName="+lastName;
		http_post_request ( shopify_proxy_prefix + '/checkout/' + cart_token + '/?process=bluesnap_create_vault', data, ( checkout_from == 'default' ? 'bluesnap_vault_created' : 'bluesnap_vault_created_for_embedded' ), cart_token );
	});

}

function bluesnap_vault_created_for_embedded(response,cart_token){
	try {
        var res = JSON.parse( response );
        if(res.message == undefined && res.vaultedShopperId != ""){
			console.log("vault created success");
			var vaulted_shopper_id = res.vaultedShopperId;
			show_loading_bar(document.querySelectorAll('[onclick="checkout_now(this);"]'));
	  		var email = $("input[name='shipping_form_email']").val();
			var shipping_first_name = $("input[name='shipping_first_name']").val();
			var shipping_last_name = $("input[name='shipping_last_name']").val();
			var shipping_ph_no = $("input[name='shipping_ph_no']").val();
			var shipping_address = $("input[name='shipping_address']").val();
			var shipping_apt = $("input[name='shipping_apt']").val();
			var shipping_city = $("input[name='shipping_city']").val();
			//var shipping_country = $("select[name='shipping_country']").val();
			var shipping_country = $($("select[name='shipping_country']")[0].children[$("select[name='shipping_country']")[0].selectedIndex])[0].dataset.code;
			var shipping_province = $("input[name='shipping_province']").val();
			var shipping_postal_code = $("input[name='shipping_postal_code']").val();
			var shipping_method = $("input[name='shipping_method']:checked").val();
			var shipping_methods = $("textarea[name='shipping_method_options']").val();

		  	//validate billing details
		  	var billing_validated = true;
			var different_billing = $("input[name='checkbox_billing_address']").prop('checked');
			var same_as_shipping = ( ( different_billing == true ) ? 'false' : 'true' );
			var billing_first_name = $("input[name='billing_first_name']").val();
			var billing_last_name = $("input[name='billing_last_name']").val();
			var billing_address = $("input[name='billing_address']").val();
			var billing_apt = $("input[name='billing_apt']").val();
			var billing_city = $("input[name='billing_city']").val();
			//var billing_country = $("select[name='billing_country']").val();
			var billing_country = $($("select[name='billing_country']")[0].children[$("select[name='billing_country']")[0].selectedIndex])[0].dataset.code;
			var billing_province = $("input[name='billing_province']").val();
			var billing_postal_code = $("input[name='billing_postal_code']").val();
			var subscribe_customer = 'false';

			//save billing info with billing token
			var funnel_id = current_funnel_id();
			var referrer = window.location.href;

			$.getJSON('/cart.js', function(cart) {
				//Save updated cart
				var url = shopify_proxy_prefix + '/checkout/' + cart_token + '/?process=save_cart_data&embed=true';
				var data = 'cart=' + encodeURIComponent( JSON.stringify( cart ) ) + '&funnel_id=' + funnel_id;
				data += "&same_as_shipping=" + encodeURIComponent( same_as_shipping ) + "&billing_first_name=" + encodeURIComponent( billing_first_name ) + "&billing_last_name=" + encodeURIComponent( billing_last_name ) + "&billing_address=" + encodeURIComponent( billing_address ) + "&billing_apt=" + encodeURIComponent( billing_apt ) + "&billing_city=" + encodeURIComponent( billing_city ) + "&billing_country=" + encodeURIComponent( billing_country ) + "&billing_postal_code=" + encodeURIComponent( billing_postal_code ) + "&billing_province=" + encodeURIComponent( billing_province ) + "&subscribe_customer=" + subscribe_customer + "&vaulted_shopper_id=" + vaulted_shopper_id + "&stripe=false";
				data += "&email=" + encodeURIComponent( email ) + "&shipping_first_name=" + encodeURIComponent( shipping_first_name ) + "&shipping_last_name=" + encodeURIComponent( shipping_last_name ) + "&shipping_ph_no=" + encodeURIComponent( shipping_ph_no != 'undefined' ? shipping_ph_no : '' ) + "&shipping_address=" + encodeURIComponent( shipping_address ) + "&shipping_apt=" + encodeURIComponent( shipping_apt ) + "&shipping_city=" + encodeURIComponent( shipping_city ) + "&shipping_country=" + encodeURIComponent( shipping_country ) + "&shipping_province=" + encodeURIComponent( shipping_province ) + "&shipping_postal_code=" + encodeURIComponent( shipping_postal_code ) + "&shipping_option=" + shipping_method + '&shipping_options=' + encodeURIComponent( shipping_methods ) + '&referrer=' + encodeURIComponent(referrer);
				$.ajax({
					type: "POST",
					url: url,
					data: data,
					success: function (res){
						trigger_fbq_purchase_event(res);
						gaee_purchase();
						//window.location.href = res;
					}
				});
			});
	   	}else{
	   		$(".card_messager_for_checkout_form").each(function() {
				$(this).show();
				$(this)[0].innerHTML = card_messager_for_checkout_form;
			    $(window).scrollTop($('.card_messager_for_checkout_form').offset().top);
			});
	   	}
    } catch(e) {
        $(".card_messager_for_checkout_form").each(function() {
			$(this).show();
			$(this)[0].innerHTML = card_messager_for_checkout_form;
		    $(window).scrollTop($('.card_messager_for_checkout_form').offset().top);
		});
    }
}

function fire_this_event(element,eve_name){
    var event = document.createEvent('Event');
    event.initEvent(eve_name, true, true);
    element.dispatchEvent(event);
}


function AddToCartCC (){
	show_loading_bar($('.action_button'));
	var variant_id = $('#selected_valid_variant')[0].value;
	var quantity = $('#selected_product_quantity')[0].value;
	var image_url_property = decodeURIComponent(image_url).replace('http://','//');
	image_url_property =  image_url_property.replace('https://','//');

	var data = "quantity="+quantity+"&id="+variant_id+"&properties[YourDesign]="+encodeURIComponent(image_url_property);
	var url = '/cart/add.js';
    $.ajax({
		type: "POST",
		url: url,
		data: data,
		success: function (res){
			shopify_update_cart_data('');
		},
		error: function (res){
			if ( res.status=='200'){
				shopify_update_cart_data('');
			}
		}
	});
}
function twoStepCP_Tab(id){
	if(id == "continue_to_payment_method"){
		var email = $("input[name='shipping_form_email']");
		var shipping_first_name = $("input[name='shipping_first_name']");
		var shipping_last_name = $("input[name='shipping_last_name']");
		var shipping_address = $("input[name='shipping_address']");
		var shipping_apt = $("input[name='shipping_apt']");
		var shipping_city = $("input[name='shipping_city']");
		//var shipping_country = $("select[name='shipping_country']").val();
		var shipping_country = $($("select[name='shipping_country']")[0].children[$("select[name='shipping_country']")[0].selectedIndex])[0].dataset.code;
		var shipping_province = $("input[name='shipping_province']");
		var shipping_postal_code = $("input[name='shipping_postal_code']");
		var shipping_method = $("input[name='shipping_method']:checked").val();

		//billing form
		var different_billing = $("input[name='checkbox_billing_address']").prop('checked');
		var billing_first_name = $("input[name='billing_first_name']");
		var billing_last_name = $("input[name='billing_last_name']");
		var billing_address = $("input[name='billing_address']");
		var billing_apt = $("input[name='billing_apt']");
		var billing_city = $("input[name='billing_city']");
		var billing_country = $($("select[name='billing_country']")[0].children[$("select[name='billing_country']")[0].selectedIndex])[0].dataset.code;
		var billing_province = $("input[name='billing_province']");
		var billing_postal_code = $("input[name='billing_postal_code']");
		var billing_method = $("input[name='billing_method']");

		var ship_valid = false;

		if(checkEmptyField(email,"error_shipping_form_email")){
			if(validateEmail( email.val() )){
				if(checkEmptyField(shipping_last_name,"error_shipping_last_name")){
					if(checkEmptyField(shipping_address,"error_shipping_address")){
						if(checkEmptyField(shipping_city,"error_shipping_city")){
							if(checkEmptyField(shipping_province,"error_shipping_province")){
								if(checkEmptyField($("select[name='shipping_country']"),"error_shipping_country")){
									if(checkEmptyField($("select[name='shipping_province']"),"error_shipping_province")){
										if(checkEmptyField(shipping_postal_code,"error_shipping_postal_code")){
											if( different_billing != false ) {
												if(checkEmptyField(billing_last_name,"error_billing_last_name")){
													if(checkEmptyField(billing_address,"error_billing_address")){
														if(checkEmptyField(billing_city,"error_billing_city")){
															if(checkEmptyField(billing_province,"error_billing_province")){
																if(checkEmptyField($("select[name='billing_country']"),"error_billing_country")){
																	if(checkEmptyField($("select[name='billing_province']"),"error_billing_province")){
																		if(checkEmptyField(billing_postal_code,"error_billing_postal_code")){
																			ship_valid = true;
																			$(".no_shipping_found").each(function() {
																				$(window).scrollTop($('.no_shipping_found').offset().top);
																			});
																		}else{
																			billing_postal_code.focus();
																		}
																	}else{
																		$("select[name='billing_province']").focus();
																	}
																}else{
																	$("select[name='billing_country']").focus();
																}
															}else{
																billing_province.focus();
															}
														}else{
															billing_city.focus();
														}
													}else{
														billing_address.focus();
													}
												}else{
													billing_last_name.focus();
												}
											}else{
												ship_valid = true;
												$(".no_shipping_found").each(function() {
													$(window).scrollTop($('.no_shipping_found').offset().top);
												});
											}
										}else{
											shipping_postal_code.focus();
										}
									}else{
										$("select[name='shipping_province']").focus();
									}
								}else{
									$("select[name='shipping_country']").focus();
								}
							}else{
								shipping_province.focus();
								if(checkEmptyField($("select[name='shipping_province']"),"error_shipping_province")){

								}else{
									$("select[name='shipping_province']").focus();
								}
								shipping_province.val("n/a");
							}
						}else{
							shipping_city.focus();
						}
					}else{
						shipping_address.focus();
					}
				}else{
					shipping_last_name.focus();
				}
			}else{
				$(".error_shipping_form_email").each(function() {
					$(this)[0].innerHTML = shipping_billing_error['error_shipping_form_email'];
				    this.style.display = 'block';
				});
				email.focus();
			}
		}else{
			email.focus();
		}

		if(ship_valid == true){
			$( "#fv2-2sc-t2-btn" ).addClass( "active" );
			$( "#fv2-2sc-t1-btn" ).removeClass( "active" );
			$( "#fv2-2sc-tab-1" ).removeClass( "active" );
			$( "#fv2-2sc-tab-2" ).addClass( "active" );
			$('html, body').animate({
		        scrollTop: $("#fv2-2sc-tab-2").offset().top
		    }, 500);
		}
	}else if(id == "return_to_shipping_method"){
		$( "#fv2-2sc-t1-btn" ).addClass( "active" );
		$( "#fv2-2sc-t2-btn" ).removeClass( "active" );
		$( "#fv2-2sc-tab-2" ).removeClass( "active" );
		$( "#fv2-2sc-tab-1" ).addClass( "active" );
	}
}

function clear_current_cart(){
	console.log("Your cart clear success");
	$.ajax({
		type: "POST",
		url: '/cart/clear.js',
		data: ''
	});
}

function auto_add_product_to_cart(){
	try {
	    if ($('#auto_add_clear_cart').val() == "true") {
			$.ajax({
				type: "POST",
				url: '/cart/clear.js',
				data: '',
				async: false
			});
		}
	}
	catch(err) {
	    console.log(err)
	}
	try{
		var auto_add_product_variants = $('#auto_add_products')[0].value;
		if(auto_add_product_variants != ""){
			auto_add_product_variants = JSON.parse(auto_add_product_variants);
			for(var key in auto_add_product_variants){
				var data = "quantity=1&id="+auto_add_product_variants[key][1];
				var url = '/cart/add.js';
				$.ajax({
					type: "POST",
					url: url,
					data: data,
					error: function (res){
						if(res.status == 200){
							var cart_info = JSON.parse(res.responseText);
							var item_price = parseFloat( cart_info.price/100 ).round(2).toFixed(2);
							fbq_add_to_cart("AddToCart","product_group",$("#gfeed")[0].value,item_price,1,$("#shop_currency")[0].value,[auto_add_product_variants[key][1]]);
							if (check_if_google_analytics_id_exist() == true) {
								gaee_product_added(cart_info.product_id,cart_info.product_title,1,cart_info.variant_title,item_price,$("#shop_currency")[0].value);
							}
						}
					},
					async: false
				});
			}
			update_cart_info_without_refresh();
		}
	}
	catch(err) {
	    console.log(err)
	}
}