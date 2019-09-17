<?php 
	form_processor();
	function process_add_buyer_to_recharge(){
		$shop_id = $_REQUEST['shop_id'];
		$shopify_order_id = $_REQUEST['shopify_order_id'];
		$variant_id = $_REQUEST['variant_id'];
		global $mysqli; 
		$get_cart_from_order_id = $mysqli->query("SELECT id,created,shop_id,funnel_id,token,cart,status FROM carts WHERE 
			shopify_order_id = ".$shopify_order_id." AND shop_id = ".$shop_id." AND status=4 AND cart LIKE '%subscription_id%'  ORDER BY id DESC ");
		$get_cart_from_order_id = $get_cart_from_order_id->fetch_array(MYSQLI_ASSOC);
		$funnel_id = $get_cart_from_order_id['funnel_id'];
		$cart_id= $get_cart_from_order_id['id'];
		$cart_created = $get_cart_from_order_id['created'];
		$cart_created = date("Y-m-d\TH:i:s" , strtotime($cart_created));
		$cart_token= $get_cart_from_order_id['token'];
		$cart_info =  json_decode ($get_cart_from_order_id['cart']);
		$cart_items = $cart_info->items;
		$rc_token= get_shop_meta($shop_id , 'rc_token'); 
		
		$number_of_recharge_product =0 ;
		$number_of_recharge_product_processed =0 ;
	
		if ( $rc_token != ''){
			foreach ($cart_items as $item){
				if ( $item->properties->subscription_id != '' ) {
					$number_of_recharge_product = $number_of_recharge_product +1;
					if ( $item->recharge_processed == 'true') {
						$number_of_recharge_product_processed = $number_of_recharge_product_processed+1;
					}	
				}
				if ( $item->properties->subscription_id != '' && $item->variant_id == $variant_id){
					$stripe_customer_token= $cart_info->billing_details->customer_id ;
					$paypal_customer_token= $cart_info->billing_details->paypal_payer_id ;

					$first_name =$cart_info->shipping_details->first_name ;
					$shipping_first_name =$cart_info->shipping_details->first_name ;
					$last_name =$cart_info->shipping_details->last_name ;
					$shipping_last_name =$cart_info->shipping_details->last_name ;
					$email =$cart_info->shipping_details->email ;
					$shipping_address1 = $cart_info->shipping_details->address ;
					$shipping_address2 = $cart_info->shipping_details->apt ;
					$shipping_zip = $cart_info->shipping_details->postal_code ;
					$shipping_city = $cart_info->shipping_details->city ;
					$shipping_province = $cart_info->shipping_details->province ;
					$shipping_country = $cart_info->shipping_details->country ;
					$shipping_phone = $cart_info->shipping_details->phone ;

					$create_new_customer = rc_create_new_customer($rc_token , $email , $first_name , $last_name , $shipping_first_name, $shipping_last_name,$shipping_address1, $shipping_address2 ,$shipping_zip,$shipping_city,$shipping_province,$shipping_country,$shipping_phone );
					$create_new_customer = json_decode($create_new_customer);
					$customer_id = $create_new_customer->customer->id;

					if ( $customer_id == ''){
						$retrieve_customer = rc_retrieve_customer($rc_token,$email);
						$retrieve_customer = json_decode($retrieve_customer);
						$customer_id = $retrieve_customer->customers[0]->id; 
					}

					if ( $stripe_customer_token !='' || $paypal_customer_token !='' ){
						$payment_last_name =$cart_info->shipping_details->last_name ;
						if ( $payment_last_name == '' ) $payment_last_name = $cart_info->billing_details->last_name;
						$customer_payment_info = add_customer_payment_details ( $rc_token , $customer_id , $payment_last_name , $stripe_customer_token , $paypal_customer_token);
						var_dump ( $customer_payment_info);
					}
					if ( $cart_info->billing_details->same_as_shipping == 'true') {
						$address1 = $shipping_address1 ;
						$address2 = $shipping_address2;
						$city= $shipping_city;
						$province = $shipping_province;
						$zip=$shipping_zip;
						$phone = $shipping_phone;
						if ($phone == ''){
							$phone='0000000000';	
						}
						$country=$shipping_country;
					}else {
						$first_name = $cart_info->billing_details->first_name;
						$last_name = $cart_info->billing_details->last_name;
						$address1 = $cart_info->billing_details->address;
						$address2 =  $cart_info->billing_details->apt;
						$city= $cart_info->billing_details->city;
						$province = $cart_info->billing_details->province;
						$zip=$cart_info->billing_details->postal_code;
						$country=$cart_info->billing_details->country;
						$phone=$cart_info->billing_details->phone;
						if ($phone == ''){
							$phone='0000000000';	
						}
					}
					$add_country =  country_array( $country);
					$create_new_address = rc_create_new_address($rc_token, $customer_id , $address1 , $address2 , $city , $province, $first_name,$last_name ,$zip,$phone,$add_country );
					$create_new_address = json_decode($create_new_address);
					$address_id = $create_new_address->address->id;
					$product_title=$item->title;
					$price=($item->price)/100;
					$quantity=$item->quantity;
					$shopify_variant_id=$item->variant_id;
					$order_interval_frequency=$item->properties->shipping_interval_frequency;
					$order_interval_unit=$item->properties->shipping_interval_unit_type;
					$charge_interval_frequency= ''.$order_interval_frequency.'  '.$order_interval_unit.' ';
					$create_new_subscription = rc_create_new_subscription($rc_token , $address_id , $customer_id ,  $product_title , $price, $quantity,$shopify_variant_id ,$order_interval_unit,$order_interval_frequency,$charge_interval_frequency , $cart_created );
					
					$subscription = json_decode($create_new_subscription);
					$subscription_id = $subscription->subscription->id;
					$activate_subscription = activate_subscription ($rc_token , $subscription_id);
					var_dump($activate_subscription);
					
					$item->recharge_processed = 'true';
					$updated_cart_info = $mysqli->real_escape_string (json_encode($cart_info));
					$rechargse_success_update_cart_data = $mysqli->query("UPDATE carts SET cart = '$updated_cart_info' WHERE 
						shopify_order_id = ".$shopify_order_id." AND shop_id = ".$shop_id." ");
					$number_of_recharge_product_processed =  $number_of_recharge_product_processed +1 ;
				}
			}
			if ( $number_of_recharge_product_processed  >= $number_of_recharge_product ) {
				$cart_info->recharge_fully_processed = 'true';
				$updated_cart_info = $mysqli->real_escape_string (json_encode($cart_info));
				$recharge_success_update_cart_data = $mysqli->query("UPDATE carts SET cart = '$updated_cart_info' WHERE 
				shopify_order_id = ".$shopify_order_id." AND shop_id = ".$shop_id." ");
			}		
		}
		echo '<pre>';
		var_dump($create_new_subscription);
		echo '</pre>';
	}
	function activate_subscription ($rc_token , $subscription_id){
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, "https://api.rechargeapps.com/subscriptions/".$subscription_id."/activate");
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, "{\"cancellation_reason\":\"other reason\"}");
		curl_setopt($ch, CURLOPT_POST, 1);
		$headers = array();
		$headers[] = "X-Recharge-Access-Token: ".$rc_token."";
		$headers[] = "Accept: application/json";
		$headers[] = "Content-Type: application/json";
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		$result = curl_exec($ch);
		if (curl_errno($ch)) {
			echo 'Error:' . curl_error($ch);
		}
		curl_close ($ch);
		return $result;
	}

	function process_dont_add_buyer_to_recharge(){
		$shop_id = $_REQUEST['shop_id'];
		$shopify_order_id = $_REQUEST['shopify_order_id'];
		$variant_id = $_REQUEST['variant_id'];
		global $mysqli;
		$get_cart_from_order_id = $mysqli->query("SELECT id,shop_id,funnel_id,token,cart,status FROM carts WHERE 
			shopify_order_id = ".$shopify_order_id." AND shop_id = ".$shop_id." ");
		$get_cart_from_order_id = $get_cart_from_order_id->fetch_array(MYSQLI_ASSOC);
		$funnel_id = $get_cart_from_order_id['funnel_id'];
		$cart_id= $get_cart_from_order_id['id'];
		$cart_token= $get_cart_from_order_id['token'];
		$cart_info =  json_decode ($get_cart_from_order_id['cart']);
		$cart_items = $cart_info->items;
		$rc_token= get_shop_meta($shop_id , 'rc_token');

		$number_of_recharge_product =0 ;
		$number_of_recharge_product_processed =0 ;
		if ( $rc_token != ''){
			foreach ($cart_items as $item){
				if ( $item->properties->subscription_id != '' ) {
					$number_of_recharge_product = $number_of_recharge_product +1;
					if ( $item->recharge_processed == 'true') {
						$number_of_recharge_product_processed = $number_of_recharge_product_processed+1;
					}	
				}
				if ( $item->properties->subscription_id != '' && $item->variant_id == $variant_id){
					$item->recharge_processed = 'true';
					$updated_cart_info = $mysqli->real_escape_string (json_encode($cart_info));
					$recharge_success_update_cart_data = $mysqli->query("UPDATE carts SET cart = '$updated_cart_info' WHERE 
					shopify_order_id = ".$shopify_order_id." AND shop_id = ".$shop_id." ");
					$number_of_recharge_product_processed = $number_of_recharge_product_processed+1;
				}
			}
			if ( $number_of_recharge_product_processed >= $number_of_recharge_product ) {
				$cart_info->recharge_fully_processed = 'true';
				$updated_cart_info = $mysqli->real_escape_string (json_encode($cart_info));
				$recharge_success_update_cart_data = $mysqli->query("UPDATE carts SET cart = '$updated_cart_info' WHERE 
				shopify_order_id = ".$shopify_order_id." AND shop_id = ".$shop_id." ");
			}		
		}
	}
	function rc_create_new_customer($rc_token , $email , $first_name , $last_name , $billing_first_name, $billing_last_name,$billing_address1 , $billing_address2 ,$billing_zip,$billing_city,$billing_province,$billing_country,$billing_phone){
	    $ch = curl_init();
	    $data = [
	            'email'=> $email ,
	            'first_name'=>$first_name,
	            'last_name'=>$last_name,
	            'billing_first_name'=>$billing_first_name,
	            'billing_last_name'=>$billing_last_name,
	            'billing_address1'=>$billing_address1 ,
	            'billing_address2'=>$billing_address2 ,
	            'billing_zip'=>$billing_zip,
	            'billing_city'=>$billing_city,
	            'billing_province'=>$billing_province,
	            'billing_country'=>$billing_country,
	            'billing_phone'=>$billing_phone
	            ];
	    curl_setopt($ch, CURLOPT_URL, "https://api.rechargeapps.com/customers");
	    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
	    curl_setopt($ch, CURLOPT_POST, 1);

	    $headers = array();
	    $headers[] = "X-Recharge-Access-Token:".$rc_token."";
	    $headers[] = "Accept: application/json";
	    $headers[] = "Content-Type: application/json";
	    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	    $result = curl_exec($ch);
	    if (curl_errno($ch)) {
	        echo 'Error:' . curl_error($ch);
	    }
	    curl_close ($ch);
	    return $result;
	}
	
	function add_customer_payment_details($rc_token , $customer_id ,$payment_last_name, $stripe_customer_token , $paypal_customer_token ){
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, "https://api.rechargeapps.com/customers/".$customer_id." ");
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		if ( $stripe_customer_token != '' ){
			$data = [
				'stripe_customer_token'=> $stripe_customer_token , 
				'processor_type'=>'stripe',
				'last_name' => $payment_last_name
			 ];
			curl_setopt($ch, CURLOPT_POSTFIELDS,  json_encode($data));
		}
		if (  $paypal_customer_token != '' ){
			$data = [
				'paypal_customer_token'=> $paypal_customer_token,
				'processor_type'=>'paypal',
				'last_name' => $payment_last_name
			 ];
			curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
		}
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
		$headers = array();
	    $headers[] = "X-Recharge-Access-Token:".$rc_token."";
		$headers[] = "Accept: application/json";
		$headers[] = "Content-Type: application/json";
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

		$result = curl_exec($ch);
		if (curl_errno($ch)) {
			echo 'Error:' . curl_error($ch);
		}
		curl_close ($ch);
		
		return $result;
	}
	function rc_create_new_address($rc_token, $customer_id , $address1 , $address2 , $city , $province, $first_name,$last_name ,$zip,$phone,$country){
	    $ch = curl_init();
	    $data = [
	                        'address1'=> $address1 ,
	                        'address2'=>$address2,
	                        'city'=>$city,
	                        'province'=>$province,
	                        'first_name'=>$first_name,
	                        'last_name'=>$last_name ,
	                        'zip'=>$zip,
	                        'phone'=>$phone,
	                        'country'=>$country
	                        ];
	    curl_setopt($ch, CURLOPT_URL, "https://api.rechargeapps.com/customers/".$customer_id."/addresses");
	    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
	    curl_setopt($ch, CURLOPT_POST, 1);

	    $headers = array();
	    $headers[] = "X-Recharge-Access-Token:  ".$rc_token." ";
	    $headers[] = "Accept: application/json";
	    $headers[] = "Content-Type: application/json";
	    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	    $result = curl_exec($ch);
	    if (curl_errno($ch)) {
	        echo 'Error:' . curl_error($ch);
	    }
	    curl_close ($ch);
	    return $result;
	}
	//subscribe  a customer
	function rc_create_new_subscription($rc_token , $address_id ,$customer_id,  $product_title , $price, $quantity,$shopify_variant_id ,$order_interval_unit,$order_interval_frequency,$charge_interval_frequency , $cart_created ){
	    $ch = curl_init();
	    $next_charge_date = strtotime('+'.$order_interval_frequency.'  '.$order_interval_unit.'', strtotime($cart_created));
		$next_charge_date = date("Y-m-d\TH:i:s" ,$next_charge_date);
	    $data = [
	                        'address_id'=> $address_id ,
	                        'customer_id'=> $customer_id ,
	                        'next_charge_scheduled_at'=> $next_charge_date ,
	                        'product_title'=>$product_title,
	                        'price'=>$price,
	                        'quantity'=>$quantity,
	                        'shopify_variant_id'=>$shopify_variant_id ,
	                        'order_interval_unit'=>$order_interval_unit,
	                        'order_interval_frequency'=>$order_interval_frequency,
	                        'charge_interval_frequency'=>$charge_interval_frequency,
	                        'status'=>'ACTIVE',
	                        'notify_customer'=> 'true', 
							'send_fulfillment_receipt'=> 'true', 
							'send_receipt'=> 'true'
	                    ];
	    curl_setopt($ch, CURLOPT_URL, "https://api.rechargeapps.com/subscriptions");
	    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
	    curl_setopt($ch, CURLOPT_POST, 1);

	    $headers = array();
	    $headers[] = "X-Recharge-Access-Token:  ".$rc_token." ";
	    $headers[] = "Accept: application/json";
	    $headers[] = "Content-Type: application/json";
	    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
	    $result = curl_exec($ch);
	    if (curl_errno($ch)) {
	        echo 'Error:' . curl_error($ch);
	    }
	    curl_close ($ch);
	    return $result;
	}

	function rc_retrieve_customer($rc_token,$email){
	    $ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, "https://api.rechargeapps.com/customers?email=".$email."");
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
		$headers = array();
		$headers[] = "X-Recharge-Access-Token: ".$rc_token." ";
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		$result = curl_exec($ch);
		if (curl_errno($ch)) {
		    echo 'Error:' . curl_error($ch);
		}
		curl_close ($ch);
	    return $result;
	}
	
	function country_array( $country_code) {
		$country_array = array(
			array( 'data-code' => "AF", 'value' => "Afghanistan" ),
			array( 'data-code' => "AX", 'value' => "Aland Islands" ),
			array( 'data-code' => "AL", 'value' => "Albania" ),
			array( 'data-code' => "DZ", 'value' => "Algeria" ),
			array( 'data-code' => "AD", 'value' => "Andorra" ),
			array( 'data-code' => "AO", 'value' => "Angola" ),
			array( 'data-code' => "AI", 'value' => "Anguilla" ),
			array( 'data-code' => "AG", 'value' => "Antigua And Barbuda" ),
			array( 'data-code' => "AR", 'value' => "Argentina" ),
			array( 'data-code' => "AM", 'value' => "Armenia" ),
			array( 'data-code' => "AW", 'value' => "Aruba" ),
			array( 'data-code' => "AU", 'value' => "Australia" ),
			array( 'data-code' => "AT", 'value' => "Austria" ),
			array( 'data-code' => "AZ", 'value' => "Azerbaijan" ),
			array( 'data-code' => "BS", 'value' => "Bahamas" ),
			array( 'data-code' => "BH", 'value' => "Bahrain" ),
			array( 'data-code' => "BD", 'value' => "Bangladesh" ),
			array( 'data-code' => "BB", 'value' => "Barbados" ),
			array( 'data-code' => "BY", 'value' => "Belarus" ),
			array( 'data-code' => "BE", 'value' => "Belgium" ),
			array( 'data-code' => "BZ", 'value' => "Belize" ),
			array( 'data-code' => "BJ", 'value' => "Benin" ),
			array( 'data-code' => "BM", 'value' => "Bermuda" ),
			array( 'data-code' => "BT", 'value' => "Bhutan" ),
			array( 'data-code' => "BO", 'value' => "Bolivia" ),
			array( 'data-code' => "BA", 'value' => "Bosnia And Herzegovina" ),
			array( 'data-code' => "BW", 'value' => "Botswana" ),
			array( 'data-code' => "BV", 'value' => "Bouvet Island" ),
			array( 'data-code' => "BR", 'value' => "Brazil" ),
			array( 'data-code' => "IO", 'value' => "British Indian Ocean Territory" ),
			array( 'data-code' => "VG", 'value' => "Virgin Islands, British" ),
			array( 'data-code' => "BN", 'value' => "Brunei" ),
			array( 'data-code' => "BG", 'value' => "Bulgaria" ),
			array( 'data-code' => "BF", 'value' => "Burkina Faso" ),
			array( 'data-code' => "BI", 'value' => "Burundi" ),
			array( 'data-code' => "KH", 'value' => "Cambodia" ),
			array( 'data-code' => "CM", 'value' => "Republic of Cameroon" ),
			array( 'data-code' => "CA", 'value' => "Canada" ),
			array( 'data-code' => "CV", 'value' => "Cape Verde" ),
			array( 'data-code' => "KY", 'value' => "Cayman Islands" ),
			array( 'data-code' => "CF", 'value' => "Central African Republic" ),
			array( 'data-code' => "TD", 'value' => "Chad" ),
			array( 'data-code' => "CL", 'value' => "Chile" ),
			array( 'data-code' => "CN", 'value' => "China" ),
			array( 'data-code' => "CX", 'value' => "Christmas Island" ),
			array( 'data-code' => "CC", 'value' => "Cocos (Keeling) Islands" ),
			array( 'data-code' => "CO", 'value' => "Colombia" ),
			array( 'data-code' => "KM", 'value' => "Comoros" ),
			array( 'data-code' => "CG", 'value' => "Congo" ),
			array( 'data-code' => "CD", 'value' => "Congo, The Democratic Republic Of The" ),
			array( 'data-code' => "CK", 'value' => "Cook Islands" ),
			array( 'data-code' => "CR", 'value' => "Costa Rica" ),
			array( 'data-code' => "HR", 'value' => "Croatia" ),
			array( 'data-code' => "CU", 'value' => "Cuba" ),
			array( 'data-code' => "CW", 'value' => "Curaçao" ),
			array( 'data-code' => "CY", 'value' => "Cyprus" ),
			array( 'data-code' => "CZ", 'value' => "Czech Republic" ),
			array( 'data-code' => "CI", 'value' => "Côte d'Ivoire" ),
			array( 'data-code' => "DK", 'value' => "Denmark" ),
			array( 'data-code' => "DJ", 'value' => "Djibouti" ),
			array( 'data-code' => "DM", 'value' => "Dominica" ),
			array( 'data-code' => "DO", 'value' => "Dominican Republic" ),
			array( 'data-code' => "EC", 'value' => "Ecuador" ),
			array( 'data-code' => "EG", 'value' => "Egypt" ),
			array( 'data-code' => "SV", 'value' => "El Salvador" ),
			array( 'data-code' => "GQ", 'value' => "Equatorial Guinea" ),
			array( 'data-code' => "ER", 'value' => "Eritrea" ),
			array( 'data-code' => "EE", 'value' => "Estonia" ),
			array( 'data-code' => "ET", 'value' => "Ethiopia" ),
			array( 'data-code' => "FK", 'value' => "Falkland Islands (Malvinas)" ),
			array( 'data-code' => "FO", 'value' => "Faroe Islands" ),
			array( 'data-code' => "FJ", 'value' => "Fiji" ),
			array( 'data-code' => "FI", 'value' => "Finland" ),
			array( 'data-code' => "FR", 'value' => "France" ),
			array( 'data-code' => "GF", 'value' => "French Guiana" ),
			array( 'data-code' => "PF", 'value' => "French Polynesia" ),
			array( 'data-code' => "TF", 'value' => "French Southern Territories" ),
			array( 'data-code' => "GA", 'value' => "Gabon" ),
			array( 'data-code' => "GM", 'value' => "Gambia" ),
			array( 'data-code' => "GE", 'value' => "Georgia" ),
			array( 'data-code' => "DE", 'value' => "Germany" ),
			array( 'data-code' => "GH", 'value' => "Ghana" ),
			array( 'data-code' => "GI", 'value' => "Gibraltar" ),
			array( 'data-code' => "GR", 'value' => "Greece" ),
			array( 'data-code' => "GL", 'value' => "Greenland" ),
			array( 'data-code' => "GD", 'value' => "Grenada" ),
			array( 'data-code' => "GP", 'value' => "Guadeloupe" ),
			array( 'data-code' => "GT", 'value' => "Guatemala" ),
			array( 'data-code' => "GG", 'value' => "Guernsey" ),
			array( 'data-code' => "GN", 'value' => "Guinea" ),
			array( 'data-code' => "GW", 'value' => "Guinea Bissau" ),
			array( 'data-code' => "GY", 'value' => "Guyana" ),
			array( 'data-code' => "HT", 'value' => "Haiti" ),
			array( 'data-code' => "HM", 'value' => "Heard Island And Mcdonald Islands" ),
			array( 'data-code' => "HN", 'value' => "Honduras" ),
			array( 'data-code' => "HK", 'value' => "Hong Kong" ),
			array( 'data-code' => "HU", 'value' => "Hungary" ),
			array( 'data-code' => "IS", 'value' => "Iceland" ),
			array( 'data-code' => "IN", 'value' => "India" ),
			array( 'data-code' => "ID", 'value' => "Indonesia" ),
			array( 'data-code' => "IR", 'value' => "Iran, Islamic Republic Of" ),
			array( 'data-code' => "IQ", 'value' => "Iraq" ),
			array( 'data-code' => "IE", 'value' => "Ireland" ),
			array( 'data-code' => "IM", 'value' => "Isle Of Man" ),
			array( 'data-code' => "IL", 'value' => "Israel" ),
			array( 'data-code' => "IT", 'value' => "Italy" ),
			array( 'data-code' => "JM", 'value' => "Jamaica" ),
			array( 'data-code' => "JP", 'value' => "Japan" ),
			array( 'data-code' => "JE", 'value' => "Jersey" ),
			array( 'data-code' => "JO", 'value' => "Jordan" ),
			array( 'data-code' => "KZ", 'value' => "Kazakhstan" ),
			array( 'data-code' => "KE", 'value' => "Kenya" ),
			array( 'data-code' => "KI", 'value' => "Kiribati" ),
			array( 'data-code' => "KV", 'value' => "Kosovo" ),
			array( 'data-code' => "KW", 'value' => "Kuwait" ),
			array( 'data-code' => "KG", 'value' => "Kyrgyzstan" ),
			array( 'data-code' => "LA", 'value' => "Lao People's Democratic Republic" ),
			array( 'data-code' => "LV", 'value' => "Latvia" ),
			array( 'data-code' => "LB", 'value' => "Lebanon" ),
			array( 'data-code' => "LS", 'value' => "Lesotho" ),
			array( 'data-code' => "LR", 'value' => "Liberia" ),
			array( 'data-code' => "LY", 'value' => "Libyan Arab Jamahiriya" ),
			array( 'data-code' => "LI", 'value' => "Liechtenstein" ),
			array( 'data-code' => "LT", 'value' => "Lithuania" ),
			array( 'data-code' => "LU", 'value' => "Luxembourg" ),
			array( 'data-code' => "MO", 'value' => "Macao" ),
			array( 'data-code' => "MK", 'value' => "Macedonia, Republic Of" ),
			array( 'data-code' => "MG", 'value' => "Madagascar" ),
			array( 'data-code' => "MW", 'value' => "Malawi" ),
			array( 'data-code' => "MY", 'value' => "Malaysia" ),
			array( 'data-code' => "MV", 'value' => "Maldives" ),
			array( 'data-code' => "ML", 'value' => "Mali" ),
			array( 'data-code' => "MT", 'value' => "Malta" ),
			array( 'data-code' => "MQ", 'value' => "Martinique" ),
			array( 'data-code' => "MR", 'value' => "Mauritania" ),
			array( 'data-code' => "MU", 'value' => "Mauritius" ),
			array( 'data-code' => "YT", 'value' => "Mayotte" ),
			array( 'data-code' => "MX", 'value' => "Mexico" ),
			array( 'data-code' => "MD", 'value' => "Moldova, Republic of" ),
			array( 'data-code' => "MC", 'value' => "Monaco" ),
			array( 'data-code' => "MN", 'value' => "Mongolia" ),
			array( 'data-code' => "ME", 'value' => "Montenegro" ),
			array( 'data-code' => "MS", 'value' => "Montserrat" ),
			array( 'data-code' => "MA", 'value' => "Morocco" ),
			array( 'data-code' => "MZ", 'value' => "Mozambique" ),
			array( 'data-code' => "MM", 'value' => "Myanmar" ),
			array( 'data-code' => "NA", 'value' => "Namibia" ),
			array( 'data-code' => "NR", 'value' => "Nauru" ),
			array( 'data-code' => "NP", 'value' => "Nepal" ),
			array( 'data-code' => "NL", 'value' => "Netherlands" ),
			array( 'data-code' => "AN", 'value' => "Netherlands Antilles" ),
			array( 'data-code' => "NC", 'value' => "New Caledonia" ),
			array( 'data-code' => "NZ", 'value' => "New Zealand" ),
			array( 'data-code' => "NI", 'value' => "Nicaragua" ),
			array( 'data-code' => "NE", 'value' => "Niger" ),
			array( 'data-code' => "NG", 'value' => "Nigeria" ),
			array( 'data-code' => "NU", 'value' => "Niue" ),
			array( 'data-code' => "NF", 'value' => "Norfolk Island" ),
			array( 'data-code' => "KP", 'value' => "Korea, Democratic People's Republic Of" ),
			array( 'data-code' => "NO", 'value' => "Norway" ),
			array( 'data-code' => "OM", 'value' => "Oman" ),
			array( 'data-code' => "PK", 'value' => "Pakistan" ),
			array( 'data-code' => "PS", 'value' => "Palestinian Territory, Occupied" ),
			array( 'data-code' => "PA", 'value' => "Panama" ),
			array( 'data-code' => "PG", 'value' => "Papua New Guinea" ),
			array( 'data-code' => "PY", 'value' => "Paraguay" ),
			array( 'data-code' => "PE", 'value' => "Peru" ),
			array( 'data-code' => "PH", 'value' => "Philippines" ),
			array( 'data-code' => "PN", 'value' => "Pitcairn" ),
			array( 'data-code' => "PL", 'value' => "Poland" ),
			array( 'data-code' => "PT", 'value' => "Portugal" ),
			array( 'data-code' => "QA", 'value' => "Qatar" ),
			array( 'data-code' => "RE", 'value' => "Reunion" ),
			array( 'data-code' => "RO", 'value' => "Romania" ),
			array( 'data-code' => "RU", 'value' => "Russia" ),
			array( 'data-code' => "RW", 'value' => "Rwanda" ),
			array( 'data-code' => "WS", 'value' => "Samoa" ),
			array( 'data-code' => "SM", 'value' => "San Marino" ),
			array( 'data-code' => "ST", 'value' => "Sao Tome And Principe" ),
			array( 'data-code' => "SA", 'value' => "Saudi Arabia" ),
			array( 'data-code' => "SN", 'value' => "Senegal" ),
			array( 'data-code' => "RS", 'value' => "Serbia" ),
			array( 'data-code' => "SC", 'value' => "Seychelles" ),
			array( 'data-code' => "SL", 'value' => "Sierra Leone" ),
			array( 'data-code' => "SG", 'value' => "Singapore" ),
			array( 'data-code' => "SX", 'value' => "Sint Maarten" ),
			array( 'data-code' => "SK", 'value' => "Slovakia" ),
			array( 'data-code' => "SI", 'value' => "Slovenia" ),
			array( 'data-code' => "SB", 'value' => "Solomon Islands" ),
			array( 'data-code' => "SO", 'value' => "Somalia" ),
			array( 'data-code' => "ZA", 'value' => "South Africa" ),
			array( 'data-code' => "GS", 'value' => "South Georgia And The South Sandwich Islands" ),
			array( 'data-code' => "KR", 'value' => "South Korea" ),
			array( 'data-code' => "ES", 'value' => "Spain" ),
			array( 'data-code' => "LK", 'value' => "Sri Lanka" ),
			array( 'data-code' => "BL", 'value' => "Saint Barthélemy" ),
			array( 'data-code' => "SH", 'value' => "Saint Helena" ),
			array( 'data-code' => "KN", 'value' => "Saint Kitts And Nevis" ),
			array( 'data-code' => "LC", 'value' => "Saint Lucia" ),
			array( 'data-code' => "MF", 'value' => "Saint Martin" ),
			array( 'data-code' => "PM", 'value' => "Saint Pierre And Miquelon" ),
			array( 'data-code' => "VC", 'value' => "St. Vincent" ),
			array( 'data-code' => "SD", 'value' => "Sudan" ),
			array( 'data-code' => "SR", 'value' => "Suriname" ),
			array( 'data-code' => "SJ", 'value' => "Svalbard And Jan Mayen" ),
			array( 'data-code' => "SZ", 'value' => "Swaziland" ),
			array( 'data-code' => "SE", 'value' => "Sweden" ),
			array( 'data-code' => "CH", 'value' => "Switzerland" ),
			array( 'data-code' => "SY", 'value' => "Syria" ),
			array( 'data-code' => "TW", 'value' => "Taiwan" ),
			array( 'data-code' => "TJ", 'value' => "Tajikistan" ),
			array( 'data-code' => "TZ", 'value' => "Tanzania, United Republic Of" ),
			array( 'data-code' => "TH", 'value' => "Thailand" ),
			array( 'data-code' => "TL", 'value' => "Timor Leste" ),
			array( 'data-code' => "TG", 'value' => "Togo" ),
			array( 'data-code' => "TK", 'value' => "Tokelau" ),
			array( 'data-code' => "TO", 'value' => "Tonga" ),
			array( 'data-code' => "TT", 'value' => "Trinidad and Tobago" ),
			array( 'data-code' => "TN", 'value' => "Tunisia" ),
			array( 'data-code' => "TR", 'value' => "Turkey" ),
			array( 'data-code' => "TM", 'value' => "Turkmenistan" ),
			array( 'data-code' => "TC", 'value' => "Turks and Caicos Islands" ),
			array( 'data-code' => "TV", 'value' => "Tuvalu" ),
			array( 'data-code' => "UM", 'value' => "United States Minor Outlying Islands" ),
			array( 'data-code' => "UG", 'value' => "Uganda" ),
			array( 'data-code' => "UA", 'value' => "Ukraine" ),
			array( 'data-code' => "AE", 'value' => "United Arab Emirates" ),
			array( 'data-code' => "GB", 'value' => "United Kingdom" ),
			array( 'data-code' => "US", 'value' => "United States" ),
			array( 'data-code' => "UY", 'value' => "Uruguay" ),
			array( 'data-code' => "UZ", 'value' => "Uzbekistan" ),
			array( 'data-code' => "VU", 'value' => "Vanuatu" ),
			array( 'data-code' => "VA", 'value' => "Holy See (Vatican City State)" ),
			array( 'data-code' => "VE", 'value' => "Venezuela" ),
			array( 'data-code' => "VN", 'value' => "Vietnam" ),
			array( 'data-code' => "WF", 'value' => "Wallis And Futuna" ),
			array( 'data-code' => "EH", 'value' => "Western Sahara" ),
			array( 'data-code' => "YE", 'value' => "Yemen" ),
			array( 'data-code' => "ZM", 'value' => "Zambia" ),
			array( 'data-code' => "ZW", 'value' => "Zimbabwe" )
		);

		if( $country_code == '' ) return $country_array;
		else {
			foreach( $country_array as $country ) {
				if( $country['data-code'] == $country_code ) {
					return $country['value'];
					break;
				}
			}
		}
	}

	
?>
