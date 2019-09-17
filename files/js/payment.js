function toggle_order_summary() {
	$( "#order_summary" ).slideToggle( "slow", function() {
		if( document.getElementById('order_summary').style.display != 'none' ) {
	    	document.getElementById('show_or_hide').innerHTML = hide_order_summary+' <i class="glyphicon glyphicon-chevron-up"></i>';
	    } else {
	    	document.getElementById('show_or_hide').innerHTML = show_order_summary+' <i class="glyphicon glyphicon-chevron-down"></i>';
	    }
	} );
}

function reload_country_preferences() {
	var tax_on_shipping = document.getElementById('_is_shipping_tax_applicable').value.trim();
	tax_on_shipping = ( tax_on_shipping != false ? 'true' : 'false' );

	var shipping_country = document.getElementById('shipping_country').value;
	var shipping_province = ( document.getElementById('shipping_province') != null ? document.getElementById('shipping_province').value : '' );
	var shipping_postal_code = document.getElementById('shipping_postal_code').value;
	$.get(shopify_proxy_prefix + "/checkout/" + uuid + "/?process=fetch_tax_and_province&shipping_country=" + shipping_country + '&shipping_province=' + encodeURIComponent( shipping_province ) + '&shipping_postal_code=' + encodeURIComponent( shipping_postal_code )).done(function( data ) {
		data = JSON.parse( data );

		//check if country has provincial taxes, if there is, add it to original tax
		if( data['province_tax'] != null ) {
			if( data['province_tax']['tax_type'] == 'harmonized' ) data.tax = data['province_tax']['tax'];
			else if( data['province_tax']['tax_type'] == 'compounded' ) {
				//Work on that later
				//No support for now
			} else {
				data.tax = ( parseFloat( data.tax ) + parseFloat( data['province_tax']['tax'] ) );
			}
		}

		var shipping_cost = parseFloat( document.getElementById('saved_shipping_cost').value );
		var subtotal = parseFloat( document.getElementById('init_subtotal_amount_').value ).round(2);
		var tax_amount = ( data.tax_included == 'true' ? 0 : ( ( subtotal + ( tax_on_shipping == 'true' ? shipping_cost : 0 ) ) * data.tax ) ).round(2);
		var grand_total = ( subtotal + shipping_cost + parseFloat( tax_amount ) ).round(2);

		if( data.tax_included == 'true' ) {
			if(data.tax_on_shipping == "false"){
				var included_tax = ( ( parseFloat( subtotal ) * parseFloat( data.tax ) ) / ( 1 + parseFloat( data.tax ) ) ).round(2).toFixed(2);
				document.getElementById('included_tax_amount').innerHTML = included_tax;
			}else{
				var included_tax = ( ( parseFloat( grand_total ) * parseFloat( data.tax ) ) / ( 1 + parseFloat( data.tax ) ) ).round(2).toFixed(2);
				document.getElementById('included_tax_amount').innerHTML = included_tax;
			}
		}

		document.getElementById('tax_total').innerHTML = tax_amount.toFixed(2);
		document.getElementById('grand_total').innerHTML = grand_total.toFixed(2);
		document.getElementById('order_summary_grand_total').innerHTML = grand_total.toFixed(2);
		if( document.getElementById('payment_ending_total') != null ) document.getElementById('payment_ending_total').innerHTML = grand_total.toFixed(2);
		if( shipping_cost <= 0 ) document.getElementById('shipping_total').innerHTML = '--';
		
		var html = '';
		if( data['provinces']['state_title'] != undefined ) {
			if( document.getElementById('shipping_province_data') != null ) var selected = document.getElementById('shipping_province_data').value;
			html += '<select class="billing_form_input_style form-control" name="shipping_province" id="shipping_province">';
				html += '<option value="">' + data['provinces']['state_title'] + '</option>';
				for( var i = 0; i < data['provinces']['states'].length; i++ ) {
					html += '<option value="' + data['provinces']['states'][i]['title'] + '" ' + ( selected == data['provinces']['states'][i]['title'] ? 'SELECTED=""' : '' ) + '>' + data['provinces']['states'][i]['title'] + '</option>';
				}
			html += '</select>';
			html += '<p class="error_warning hide" id="error_shipping_province">'+shipping_billing_error['error_shipping_province']+'</p>';

			if( document.getElementById('shipping_province_div') != null ) document.getElementById('shipping_province_div').innerHTML = html;
			if( document.getElementById('shipping_country_code_div') != null ) {
				if( document.getElementById('shipping_country_code_div').classList.contains('col-md-6') == true ) {
					document.getElementById('shipping_country_code_div').classList.remove('col-md-6');
					document.getElementById('shipping_country_code_div').classList.add('col-md-4');
				}
			}

			if( document.getElementById('shipping_postal_code_div') != null ) {
				if( document.getElementById('shipping_postal_code_div').classList.contains('col-md-6') == true ) {
					document.getElementById('shipping_postal_code_div').classList.remove('col-md-6');
					document.getElementById('shipping_postal_code_div').classList.add('col-md-4');
				}
			}

			if( document.getElementById('shipping_province_div') != null ) document.getElementById('shipping_province_div').style.display = 'block';
		} else {
			if( document.getElementById('shipping_province_div') != null ) document.getElementById('shipping_province_div').style.display = 'none';
			if( document.getElementById('shipping_country_code_div') != null ) {
				if( document.getElementById('shipping_country_code_div').classList.contains('col-md-4') == true ) {
					document.getElementById('shipping_country_code_div').classList.remove('col-md-4');
					document.getElementById('shipping_country_code_div').classList.add('col-md-6');
				}
			}

			if( document.getElementById('shipping_postal_code_div') != null ) {
				if( document.getElementById('shipping_postal_code_div').classList.contains('col-md-4') == true ) {
					document.getElementById('shipping_postal_code_div').classList.remove('col-md-4');
					document.getElementById('shipping_postal_code_div').classList.add('col-md-6');
				}
			}
		}
	});
}

function reload_shipping_options( $, zip, country, province ) {
	if( zip == undefined ) zip = document.getElementById('shipping_postal_code').value;
	if( country == undefined ) country = document.getElementById('shipping_country').value;
	if( province == undefined ) province = document.getElementById('shipping_province').value;
	$.get("/cart/shipping_rates.json?shipping_address[zip]=" + encodeURIComponent( province ) + "&shipping_address[country]=" + encodeURIComponent( country ) + "&shipping_address[province]=" + encodeURIComponent( province )).done(function( data ) {
       	var shipping_html = '';
       	for( var i = 0; i < data.shipping_rates.length; i++ ) {
       		shipping_html += '<div class="form-group" style="margin-top: 20px;border: 1px;border-style: solid; border-radius: 4px;">';
       			shipping_html += '<label style="padding: 12px;">';
					shipping_html += '<input type="radio" id="shipping_' + i + '" name="shipping_' + i + '"> ';
					shipping_html += data.shipping_rates[i].name;
				shipping_html += '</label>';
			shipping_html += '</div>';
			shipping_html += '<br>';
       	}

       	document.getElementById('shipping_method_choices').innerHTML = shipping_html;
    });
}

function validate_payment() {
	document.getElementById('loading_graphics').style.display = 'block';
	var ret = false;
	var email = document.getElementById('email').value;
	var shipping_first_name = document.getElementById('shipping_first_name').value;
	var shipping_last_name = document.getElementById('shipping_last_name').value;
	var shipping_address = document.getElementById('shipping_address').value;
	var shipping_apt = document.getElementById('shipping_apt').value;
	var shipping_city = document.getElementById('shipping_city').value;
	var shipping_country = document.getElementById('shipping_country').value;
	var shipping_province = document.getElementById('shipping_province').value;
	var shipping_postal_code = document.getElementById('shipping_postal_code').value;

	if( document.getElementById('edit_shipping_details').style.display != 'none' ) {
		var ship_valid = true;
		//validate shipping details
		if( !validateEmail( email ) ) {
			ship_valid = false;
			display_error_message('email');
		} else remove_error_message ('email');
		if( shipping_last_name == '' ) {
			ship_valid = false;
			display_error_message('shipping_last_name');
		} else remove_error_message('shipping_last_name');

		if( shipping_address == '' ) {
			ship_valid = false;
			display_error_message('shipping_address');
		} else remove_error_message('shipping_address');

		if( shipping_city == '' ) {
			ship_valid = false;
			display_error_message('shipping_city');
		} else remove_error_message('shipping_city');

		if( shipping_country == '' ) {
			ship_valid = false;
			display_error_message('shipping_country');
		} else remove_error_message('shipping_country');

		if( document.getElementById('error_shipping_province') != undefined ) {
			if( shipping_province == '' ) {
				ship_valid = false;
				display_error_message('shipping_province');
			}
		}

		if( shipping_postal_code == '' ) {
			ship_valid = false;
			display_error_message('shipping_postal_code');
		} else remove_error_message('shipping_postal_code');

		if( ship_valid != false ) {
			//generate shipping address text
			document.getElementById('shipping_method_choices').innerHTML = '';
			document.getElementById('edit_shipping_details').style.display = 'none';
			var shipping_address_text = shipping_first_name + '<br>' + shipping_last_name + '<br>' + shipping_address + '<br>' + shipping_apt + '<br>' + shipping_postal_code + ' ' + shipping_city + '<br>' + ( shipping_province != '' ? shipping_province + ', ' : '' ) + shipping_country;
			document.getElementById('shipping_details_text').innerHTML = shipping_address_text;
			document.getElementById('shipping_details_text_div').style.display = 'block';
			document.getElementById('shipping_method_commands').style.display = 'block';

			//fix the breadcrumb
       		document.getElementById('shipping_bread').classList.remove('breadcrumb_inactive');
       		document.getElementById('shipping_bread').classList.remove('breadcrumb_active');
       		document.getElementById('shipping_bread').innerHTML = t_m_shipping_method;
       		document.getElementById('customer_bread').innerHTML = '<a href="#" onclick="edit_shipping_details(); return false;">'+t_m_customer_info+'</a>';
       		
			//collect shipping cost
			document.getElementById('loading_graphics').style.display = 'none';
			document.getElementById('no_shipping_zone_error').style.display = 'block';
			
		    //collect shipping cost
			$.ajax({
		        url: "/cart/shipping_rates.json?shipping_address[zip]=" + encodeURIComponent( shipping_postal_code ) + "&shipping_address[country]=" + encodeURIComponent( shipping_country ) + "&shipping_address[province]=" + encodeURIComponent( shipping_province ),
		        type: 'get',
		        error: function(xhr, status) {
		            //alert('There was a problem loading that page. You may need to refresh.');
		            var errors = xhr.responseJSON;
		            console.log( errors.error );
		            if( ( errors.error != undefined ) && ( errors.error != null ) ) {
		            	if( errors.error[0] == "This cart does not require shipping" ) {
		            		data = JSON.parse( '{"shipping_rates":[{"name":"Free shipping","code":"Free shipping","price":"0.00","markup":"0.00","source":"shopify","delivery_date":null,"delivery_range":null,"delivery_days":[],"compare_price":null,"phone_required":null,"currency":null,"carrier_identifier":null,"delivery_category":null,"carrier_service_id":null,"description":null,"api_client_id":null,"requested_fulfillment_service_id":null,"shipment_options":null,"charge_items":null}]}' );
		            		validate_payment_generate_shipping_methods(data);
		            	}
		            }
		        }     
		    }).done(function(data){
		    	validate_payment_generate_shipping_methods(data);
		    });
		} else {
			//show error messages
			document.getElementById('loading_graphics').style.display = 'none';
		}
	} else {
		//validate billing address if billing address is different than shipping address
		var billing_validated = true;
		var same_as_shipping = ( document.getElementById('same_as_shipping_true').checked == true ? 'true' : 'false' );
		var billing_first_name = document.getElementById('billing_first_name').value;
		var billing_last_name = document.getElementById('billing_last_name').value;
		var billing_address = document.getElementById('billing_address').value;
		var billing_apt = document.getElementById('billing_apt').value;
		var billing_city = document.getElementById('billing_city').value;
		var billing_country = document.getElementById('billing_country').value;
		var billing_postal_code = document.getElementById('billing_postal_code').value;
		var billing_province = ( document.getElementById('billing_province') != undefined ? document.getElementById('billing_province').value : '' );
		var subscribe_customer = ( document.getElementById('subscribe_customer').checked == true ? 'true' : 'false' );

		if( same_as_shipping == 'false' ) {

			if( billing_last_name.trim() == '' ) {
				billing_validated = false;
				document.getElementById('error_billing_last_name').classList.remove('hide');
			} else document.getElementById('error_billing_last_name').classList.add('hide');

			if( billing_address.trim() == '' ) {
				billing_validated = false;
				document.getElementById('error_billing_address').classList.remove('hide');
			} else document.getElementById('error_billing_address').classList.add('hide');

			if( billing_city.trim() == '' ) {
				billing_validated = false;
				document.getElementById('error_billing_city').classList.remove('hide');
			} else document.getElementById('error_billing_city').classList.add('hide');

			if( billing_country.trim() == '' ) {
				billing_validated = false;
				document.getElementById('error_billing_country').classList.remove('hide');
			} else document.getElementById('error_billing_country').classList.add('hide');
		}

		if( billing_validated == true ) {
			var credit_card_selected = false;
			if( document.getElementById('payment_method_cradit_card_radio') != null ) {
				if( document.getElementById('payment_method_cradit_card_radio').checked == true ) credit_card_selected = true;
			}

			//create token from stripe
			if( credit_card_selected == true ) {
				if( typeof Stripe != 'undefined' ) {
					var form = document.getElementById('payment-form');
					Stripe.card.createToken(form, process_custom_billing_info);
				} else {
					if($("#credit_card_processor")[0].value == "bluesnap"){
						console.log("=====bluesnap=====");
						bluesnap_create_vault('default');
					}else if($("#credit_card_processor")[0].value == "nmi"){
						console.log("=====NMI=====");
						//NMI is selected to process credit card instead of Stripe
						var nmi_primary_amt = document.getElementById('grand_total').innerHTML;
						nmi_create_token('default', nmi_primary_amt);
					}
				}
			} else {
				//save billing info with billing token
				var primary_amt = document.getElementById('grand_total').innerHTML;
				jQuery.get(shopify_proxy_prefix + "/checkout/" + uuid + "/?process=initiate_paypal_transaction&same_as_shipping=" + same_as_shipping + "&billing_first_name=" + encodeURIComponent( billing_first_name ) + "&billing_last_name=" + encodeURIComponent( billing_last_name ) + "&billing_address=" + encodeURIComponent( billing_address ) + "&billing_apt=" + encodeURIComponent( billing_apt ) + "&billing_city=" + encodeURIComponent( billing_city ) + "&billing_country=" + encodeURIComponent( billing_country ) + "&billing_postal_code=" + encodeURIComponent( billing_postal_code ) + "&billing_province=" + encodeURIComponent( billing_province ) + "&subscribe_customer=" + subscribe_customer + '&primary_amt=' + primary_amt ).done(function( data ) {
					//temp
					document.getElementById('loading_graphics').style.display = 'none';
					if( data.trim() == 'error' ){
						alert("payment failed");
					}else{
						window.location.href = data.trim();
					} 
				});
			}
		} else document.getElementById('loading_graphics').style.display = 'none';
	}

	return ret;
}

function validate_payment_generate_shipping_methods(data) {
	var email = document.getElementById('email').value
	var shipping_first_name = document.getElementById('shipping_first_name').value;
	var shipping_last_name = document.getElementById('shipping_last_name').value;
	var shipping_address = document.getElementById('shipping_address').value;
	var shipping_apt = document.getElementById('shipping_apt').value;
	var shipping_city = document.getElementById('shipping_city').value;
	var shipping_country = document.getElementById('shipping_country').value;
	var shipping_province = document.getElementById('shipping_province').value;
	var shipping_postal_code = document.getElementById('shipping_postal_code').value;
	document.getElementById('loading_graphics').style.display = 'block';
   	var shipping_html = '';
   	for( var i = 0; i < data.shipping_rates.length; i++ ) {
   		shipping_html += '<div class="form-group" style="margin-top: 20px;border: 1px;border-style: solid; border-radius: 4px;">';
   			shipping_html += '<label style="padding: 12px;">';
				shipping_html += '<input type="radio" id="shipping_' + i + '" name="shipping_cost" name="shipping_method" value="' + data.shipping_rates[i].code + '" ' + ( i == 0 ? 'CHECKED="" ' : '' ) + ' onclick="update_shipping_cost(\'' + i + '\')"> ';
				shipping_html += data.shipping_rates[i].name;
				shipping_html += '<input type="hidden" id="shipping_cost_' + i + '" name="shipping_cost_' + i + '" value="' + data.shipping_rates[i].price + '">';
			shipping_html += '</label>';
		shipping_html += '</div>';

		if( i < 1 ) var applicable_shipping_cost = data.shipping_rates[i].price;
   	}

   	shipping_html += '<input type="hidden" id="shipping_option" name="shipping_option" value="' + 0 + '">';

   	if( applicable_shipping_cost != undefined ) {
   		//show shipping methods
   		document.getElementById('no_shipping_zone_error').style.display = 'none';
   		document.getElementById('shipping_method_choices').innerHTML = shipping_html;
   		document.getElementById('shipping_method_continue_button').style.display = 'block';

		//generate tax calculation
		jQuery.get(shopify_proxy_prefix + "/checkout/" + uuid + "/?process=save_shipping_info&email=" + encodeURIComponent( email ) + "&shipping_first_name=" + encodeURIComponent( shipping_first_name ) + "&shipping_last_name=" + encodeURIComponent( shipping_last_name ) + "&shipping_address=" + encodeURIComponent( shipping_address ) + "&shipping_apt=" + encodeURIComponent( shipping_apt ) + "&shipping_city=" + encodeURIComponent( shipping_city ) + "&shipping_country=" + encodeURIComponent( shipping_country ) + "&shipping_province=" + encodeURIComponent( shipping_province ) + "&shipping_postal_code=" + encodeURIComponent( shipping_postal_code ) + "&shipping_cost=" + applicable_shipping_cost + '&shipping_options=' + encodeURIComponent(JSON.stringify( data.shipping_rates ))).done(function( data ) {
			
			data = JSON.parse( data );

			//if another shipping option is pre selected
			if( data.shipping_option > 0 ) {
				document.getElementById('shipping_cost_'+data.shipping_option).click();
				document.getElementById('shipping_option').value = data.shipping_option;
			}

			document.getElementById('shipping_total').innerHTML = data.formatted_shipping_cost;
			document.getElementById('tax_total').innerHTML = data.total_tax;
			if( data.tax_included == 'true' ) {
				document.getElementById('included_tax_amount').innerHTML = data.included_tax;
			}
			document.getElementById('grand_total').innerHTML = data.total_price;
			document.getElementById('order_summary_grand_total').innerHTML = data.total_price;
		});
   	} else {
   		document.getElementById('no_shipping_zone_error').style.display = 'block';
   	}
   	document.getElementById('loading_graphics').style.display = 'none';
}

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function display_error_message( id, message ) {
	if( message != null ) document.getElementById('error_' + id).innerHTML = message;
	document.getElementById( id ).classList.add('warning');
	document.getElementById( 'error_' + id ).classList.remove('hide');
}

function remove_error_message( id ) {
	document.getElementById( id ).classList.remove('warning');
	document.getElementById( 'error_' + id ).classList.add('hide');
}

function update_shipping_cost( i ) {
	jQuery.get(shopify_proxy_prefix + "/checkout/" + uuid + "/?process=update_shipping_info&shipping_option=" + i ).done(function( data ) {
		data = JSON.parse( data );

		//if another shipping option is pre selected
		document.getElementById('shipping_option').value = data.shipping_option;
		document.getElementById('shipping_total').innerHTML = data.shipping_cost;
		document.getElementById('tax_total').innerHTML = data.total_tax;
		document.getElementById('grand_total').innerHTML = data.total_price;
		document.getElementById('order_summary_grand_total').innerHTML = data.total_price;
	});
}

function initiate_payment() {
	//fix the breadcrumb
	document.getElementById('payment_bread').classList.remove('breadcrumb_inactive');
	document.getElementById('payment_bread').classList.remove('breadcrumb_active');
	document.getElementById('payment_bread').innerHTML = t_m_payment_method;
	document.getElementById('shipping_bread').innerHTML = '<a href="#" onclick="select_shipping_method(); return false;">'+t_m_shipping_method+'</a>';

	//display payment method and hide others
	document.getElementById('edit_shipping_details').style.display = 'none';
	document.getElementById('shipping_details_text_div').style.display = 'none';
	document.getElementById('no_shipping_zone_error').style.display = 'none';
	document.getElementById('shipping_method_commands').style.display = 'none';
	document.getElementById('shipping_method_continue_button').style.display = 'none';
	document.getElementById('edit_billing_details').style.display = 'block';
	document.getElementById('payment_method_commands').style.display = 'block';
	trigger_fbq_add_payment_info_event();
}

function select_shipping_method() {
	//Fix breadcrumb
	document.getElementById('payment_bread').classList.remove('breadcrumb_active');
	document.getElementById('payment_bread').classList.remove('breadcrumb_inactive');
	document.getElementById('payment_bread').innerHTML = '<a href="#" onclick="initiate_payment(); return false;">'+t_m_payment_method+'</a>';
	document.getElementById('shipping_bread').innerHTML = t_m_shipping_method;
	document.getElementById('customer_bread').innerHTML = '<a href="#" onclick="edit_shipping_details(); return false;">'+t_m_customer_info+'</a>';

	//hide and display shipping method divs
	document.getElementById('edit_shipping_details').style.display = 'none';
	document.getElementById('edit_billing_details').style.display = 'none';
	document.getElementById('payment_method_commands').style.display = 'none';
	document.getElementById('shipping_details_text_div').style.display = 'block';
	document.getElementById('shipping_method_commands').style.display = 'block';
	document.getElementById('shipping_method_continue_button').style.display = 'block';
}

function enable_billing_address( ) {
	if( document.getElementById('same_as_shipping_false').checked == true ) document.getElementById('billing_address_form').style.display = 'block';
	else document.getElementById('billing_address_form').style.display = 'none';
}

function edit_shipping_details() {
	//Fix breadcrumb
	document.getElementById('shipping_bread').innerHTML = '<a href="#" onclick="select_shipping_method(); return false;">'+t_m_shipping_method+'</a>';
	document.getElementById('customer_bread').innerHTML = t_m_customer_info;

	document.getElementById('shipping_details_text_div').style.display = 'none';
	document.getElementById('no_shipping_zone_error').style.display = 'none';
	document.getElementById('edit_billing_details').style.display = 'none';
	document.getElementById('shipping_method_commands').style.display = 'none';
	document.getElementById('payment_method_commands').style.display = 'none';
	document.getElementById('shipping_method_continue_button').style.display = 'none';
	document.getElementById('edit_shipping_details').style.display = 'block';
}

function process_custom_billing_info(status, response) {
	var error = false;
	var token = '';
  	// Grab the form:
  	var form = document.getElementById('payment-form');

  	if(response.error) { // Problem!
  		error = true;
  		if( response.error.param == 'number' ) display_error_message('card_number', 'The card number is not a valid credit card number.' );
  		else remove_error_message('card_number');

  		if( response.error.param == 'exp_month' ) display_error_message('card_exp_month', 'Your card\'s expiration month is invalid.' );
  		else remove_error_message('card_exp_month');

  		if( response.error.param == 'exp_year' ) display_error_message('card_exp_year', 'Your card\'s expiration year is invalid.' );
  		else remove_error_message('card_exp_year');

  		if( response.error.param == 'cvc' ) display_error_message('card_cvv', 'Your card\'s CVV is invalid.' );
  		else remove_error_message('card_cvv');

  		if( response.error.type != '' ) {
  			//document.getElementById('payment_error').innerHTML = response.error.message;
  			document.getElementById('payment_error').innerHTML = card_messager_for_checkout_form;
  			document.getElementById('payment_error').style.display = 'block';
  			goToByScroll('payment_error');
  			document.getElementById('loading_graphics').style.display = 'none';
  		}
  	} else {
    	token = response.id;
    	//to be decided what to do
  //   	jQuery.getJSON('/cart.js', function(cart) {
		// 	if($("#facebook_pixel_id")[0].value != null && $("#facebook_pixel_id")[0].value != ""){
		// 		console.log("<============facebook pixel Purchase called=============>");
		// 		fbq('track', 'Purchase', {value: (parseInt(cart.total_price)/100) , currency: shop_currency});
		// 	}
		// });
  	}

  	if( token != '' ) {
	  	//validate billing details
	  	var billing_validated = true;
		var same_as_shipping = ( document.getElementById('same_as_shipping_true').checked == true ? 'true' : 'false' );
		var billing_first_name = document.getElementById('billing_first_name').value;
		var billing_last_name = document.getElementById('billing_last_name').value;
		var billing_address = document.getElementById('billing_address').value;
		var billing_apt = document.getElementById('billing_apt').value;
		var billing_city = document.getElementById('billing_city').value;
		var billing_country = document.getElementById('billing_country').value;
		var billing_postal_code = document.getElementById('billing_postal_code').value;
		var billing_province = ( document.getElementById('billing_province') != undefined ? document.getElementById('billing_province').value : '' );
		var subscribe_customer = ( document.getElementById('subscribe_customer').checked == true ? 'true' : 'false' );

		//save billing info with billing token
		jQuery.get(shopify_proxy_prefix + "/checkout/" + uuid + "/?process=save_billing_info&same_as_shipping=" + same_as_shipping + "&billing_first_name=" + encodeURIComponent( billing_first_name ) + "&billing_last_name=" + encodeURIComponent( billing_last_name ) + "&billing_address=" + encodeURIComponent( billing_address ) + "&billing_apt=" + encodeURIComponent( billing_apt ) + "&billing_city=" + encodeURIComponent( billing_city ) + "&billing_country=" + encodeURIComponent( billing_country ) + "&billing_postal_code=" + encodeURIComponent( billing_postal_code ) + "&billing_province=" + encodeURIComponent( billing_province ) + "&subscribe_customer=" + subscribe_customer + "&token=" + token).done(function( data ) {
			if( error == true ) {
				goToByScroll('payment_error');
				document.getElementById('loading_graphics').style.display = 'none';
			} else {
				if( data.trim() == 'failed' ) {
					alert("Transaction failed!");
				} else {
					trigger_fbq_purchase_event(data);
					gaee_purchase();
					//window.location.replace( data );
				}
			}
		});
	}
}

 // This is a functions that scrolls to #{blah}link
function goToByScroll(id){
      // Remove "link" from the ID
    id = id.replace("link", "");
      // Scroll
    $('html,body').animate({
        scrollTop: $("#"+id).offset().top},
        'slow');
}

function clear_backslash( variant ) {
	return variant.replace('/', '-' );
}

// function make_fbq_viewcontent() {
// 	var product_price = document.getElementById('fbq_product_price').value;
// 	var shop_currency = document.getElementById('fbq_shop_currency').value;
// 	var product_id = document.getElementById('fbq_product_id').value;
// 	var product_title = document.getElementById('fbq_product_title').value;
// 	var facebook_pixel_catalog_id = document.getElementById('fbq_facebook_pixel_catalog_id').value;

// 	product_price = parseFloat( product_price ).round(2).toFixed(2);
	
// 	if($("#facebook_pixel_id")[0].value != null && $("#facebook_pixel_id")[0].value != ""){
// 		fbq('track', 'ViewContent', {value: product_price , currency: shop_currency, content_ids: '[' + product_id + ']', content_type: 'product_group', 'content_name' : product_title, 'product_catalog_id' : facebook_pixel_catalog_id });
// 	}
// }

function scroll_to_top() {
	$("html, body").animate({ scrollTop: "0px" });
}

function populate_billing_province( billing_country ) {
	$.get(shopify_proxy_prefix + "/checkout/" + uuid + "/?process=fetch_billing_province&billing_country=" + billing_country).done(function( data ) {
		data = JSON.parse( data );
		var html = '';
		if( data['provinces']['state_title'] != undefined ) {
			var selected = document.getElementById('billing_province_data').value;
			html += '<select class="billing_form_input_style form-control" name="billing_province" id="billing_province">';
				html += '<option value="">' + data['provinces']['state_title'] + '</option>';
				for( var i = 0; i < data['provinces']['states'].length; i++ ) {
					html += '<option value="' + data['provinces']['states'][i]['title'] + '" ' + ( selected == data['provinces']['states'][i]['title'] ? 'SELECTED=""' : '' ) + '>' + data['provinces']['states'][i]['title'] + '</option>';
				}
			html += '</select>';
			html += '<p class="error_warning hide" id="error_billing_province">'+shipping_billing_error['error_billing_province']+'</p>';

			document.getElementById('billing_province_div').innerHTML = html;
			if( document.getElementById('billing_country_code_div').classList.contains('col-md-6') == true ) {
				document.getElementById('billing_country_code_div').classList.remove('col-md-6');
				document.getElementById('billing_country_code_div').classList.add('col-md-4');
			}

			if( document.getElementById('billing_postal_code_div').classList.contains('col-md-6') == true ) {
				document.getElementById('billing_postal_code_div').classList.remove('col-md-6');
				document.getElementById('billing_postal_code_div').classList.add('col-md-4');
			}

			document.getElementById('billing_province_div').style.display = 'block';
		} else {
			document.getElementById('billing_province_div').style.display = 'none';
			if( document.getElementById('billing_country_code_div').classList.contains('col-md-4') == true ) {
				document.getElementById('billing_country_code_div').classList.remove('col-md-4');
				document.getElementById('billing_country_code_div').classList.add('col-md-6');
			}

			if( document.getElementById('billing_postal_code_div').classList.contains('col-md-4') == true ) {
				document.getElementById('billing_postal_code_div').classList.remove('col-md-4');
				document.getElementById('billing_postal_code_div').classList.add('col-md-6');
			}
		}
	});
}

function custom_payment_method_selection(element) {
    document.getElementById('payment_method_credit_card').style.display = 'none';
    document.getElementById('payment_method_paypal').style.display = 'none';
    document.getElementById('payment_method_' + element.value ).style.display = 'block';
}

function nmi_vault_created( response, cart_token ) {
	var res = JSON.parse( response );
	if( parseInt( res.response ) != 1 ) {
		if( document.getElementById('payment_error') != null ) {
			document.getElementById('payment_error').innerHTML = card_messager_for_checkout_form;
	  		document.getElementById('payment_error').style.display = 'block';
	  		document.getElementById('loading_graphics').style.display = 'none';
	  		goToByScroll('payment_error');
	  	}
	} else {
	  	//validate billing details
	  	var billing_validated = true;
		var same_as_shipping = ( document.getElementById('same_as_shipping_true').checked == true ? 'true' : 'false' );
		var billing_first_name = document.getElementById('billing_first_name').value;
		var billing_last_name = document.getElementById('billing_last_name').value;
		var billing_address = document.getElementById('billing_address').value;
		var billing_apt = document.getElementById('billing_apt').value;
		var billing_city = document.getElementById('billing_city').value;
		var billing_country = document.getElementById('billing_country').value;
		var billing_postal_code = document.getElementById('billing_postal_code').value;
		var billing_province = ( document.getElementById('billing_province') != undefined ? document.getElementById('billing_province').value : '' );
		var subscribe_customer = ( document.getElementById('subscribe_customer').checked == true ? 'true' : 'false' );

		//save billing info with billing token
		jQuery.get(shopify_proxy_prefix + "/checkout/" + uuid + "/?process=save_billing_info&same_as_shipping=" + same_as_shipping + "&billing_first_name=" + encodeURIComponent( billing_first_name ) + "&billing_last_name=" + encodeURIComponent( billing_last_name ) + "&billing_address=" + encodeURIComponent( billing_address ) + "&billing_apt=" + encodeURIComponent( billing_apt ) + "&billing_city=" + encodeURIComponent( billing_city ) + "&billing_country=" + encodeURIComponent( billing_country ) + "&billing_postal_code=" + encodeURIComponent( billing_postal_code ) + "&billing_province=" + encodeURIComponent( billing_province ) + "&subscribe_customer=" + subscribe_customer + "&customer_vault_id=" + res.customer_vault_id + "&stripe=false").done(function( data ) {
			if( data.trim() == 'error' ) {
				goToByScroll('payment_error');
				document.getElementById('loading_graphics').style.display = 'none';
			} else {
				trigger_fbq_purchase_event(data);
				gaee_purchase();
				//window.location.replace( data );
			}
		});
	}
}

function bluesnap_vault_created( response, cart_token ) {
	var res = JSON.parse( response );
	if(res.message == undefined && res.vaultedShopperId != ""){
		console.log("vault created success");
		var vaulted_shopper_id = res.vaultedShopperId;
		//validate billing details
	  	var billing_validated = true;
		var same_as_shipping = ( document.getElementById('same_as_shipping_true').checked == true ? 'true' : 'false' );
		var billing_first_name = document.getElementById('billing_first_name').value;
		var billing_last_name = document.getElementById('billing_last_name').value;
		var billing_address = document.getElementById('billing_address').value;
		var billing_apt = document.getElementById('billing_apt').value;
		var billing_city = document.getElementById('billing_city').value;
		var billing_country = document.getElementById('billing_country').value;
		var billing_postal_code = document.getElementById('billing_postal_code').value;
		var billing_province = ( document.getElementById('billing_province') != undefined ? document.getElementById('billing_province').value : '' );
		var subscribe_customer = ( document.getElementById('subscribe_customer').checked == true ? 'true' : 'false' );

		//save billing info with billing token
		jQuery.get(shopify_proxy_prefix + "/checkout/" + uuid + "/?process=save_billing_info&same_as_shipping=" + same_as_shipping + "&billing_first_name=" + encodeURIComponent( billing_first_name ) + "&billing_last_name=" + encodeURIComponent( billing_last_name ) + "&billing_address=" + encodeURIComponent( billing_address ) + "&billing_apt=" + encodeURIComponent( billing_apt ) + "&billing_city=" + encodeURIComponent( billing_city ) + "&billing_country=" + encodeURIComponent( billing_country ) + "&billing_postal_code=" + encodeURIComponent( billing_postal_code ) + "&billing_province=" + encodeURIComponent( billing_province ) + "&subscribe_customer=" + subscribe_customer + "&vaulted_shopper_id=" + vaulted_shopper_id + "&stripe=false").done(function( data ) {
			if( data.trim() == 'error' ) {
				goToByScroll('payment_error');
				document.getElementById('loading_graphics').style.display = 'none';
			} else {
				trigger_fbq_purchase_event(data);
				gaee_purchase();
				//window.location.replace( data );
			}
		});
	} else {
	  	if( document.getElementById('payment_error') != null ) {
			document.getElementById('payment_error').innerHTML = card_messager_for_checkout_form;
	  		document.getElementById('payment_error').style.display = 'block';
	  		document.getElementById('loading_graphics').style.display = 'none';
	  		goToByScroll('payment_error');
	  	}
	}
}

var reload = function () {
    var regex = new RegExp("([?;&])reload[^&;]*[;&]?");
    var query = window.location.href.split('#')[0].replace(regex, "$1").replace(/&$/, '');
    window.location.href =
        (window.location.href.indexOf('?') < 0 ? "?" : query + (query.slice(-1) != "?" ? "&" : ""))
        + "reload=" + new Date().getTime() + window.location.hash;
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
