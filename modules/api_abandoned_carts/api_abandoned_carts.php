<?php
	set_time_limit ( 1500 );
	if( isset( $_REQUEST['fetch'] ) ) {
		echo "Cron job for automated mail service : <br>";  
		echo 'Now: '.date("Y-m-d H:i:s").'<br>';
		echo 'From: '.date("Y-m-d H:i:s", time() - 2400).'<br>';
		echo 'To: '.date("Y-m-d H:i:s", time() - 1200).'<br>';
		global $mysqli;
		if( $_REQUEST['fetch'] == 'abandoned' ) {
			$abandoned_carts_before_three_hours = $mysqli->query ("SELECT carts.id, carts.shop_id, carts.funnel_id, carts.token, carts.cart, carts.shopify_order_id , carts.status  FROM carts WHERE ( status =1 AND   ( carts.id NOT IN (SELECT cart_abandoned_status.cart_id FROM cart_abandoned_status) ) AND created <'"  .  date("Y-m-d H:i:s", time() - 1200)."' AND created >'"  .  date("Y-m-d H:i:s", time() - 2400)."'  ) UNION  SELECT carts.id, carts.shop_id, carts.funnel_id, carts.token, carts.cart,carts.shopify_order_id, carts.status FROM carts, cart_emails WHERE carts.status = 0 AND ( carts.id NOT IN (SELECT cart_abandoned_status.cart_id FROM cart_abandoned_status) ) AND carts.token = cart_emails.token AND created <'"  .  date("Y-m-d H:i:s", time() - 1200)."' AND created >'"  .  date("Y-m-d H:i:s", time() - 2400)."'   LIMIT 0,5 "); 

			//$abandoned_carts_before_three_hours = $mysqli->query ("SELECT carts.id, carts.shop_id, carts.funnel_id, carts.token, carts.cart, carts.shopify_order_id , carts.status  FROM carts WHERE ( status =1 AND   ( carts.id NOT IN (SELECT cart_abandoned_status.cart_id FROM cart_abandoned_status) ) AND created <'"  .  date("Y-m-d H:i:s", time() - 1200)."' AND created >'"  .  date("Y-m-d H:i:s", time() - 2400)."'  ) UNION  SELECT carts.id, carts.shop_id, carts.funnel_id, carts.token, carts.cart,carts.shopify_order_id, carts.status FROM carts, cart_emails WHERE carts.status = 0 AND ( carts.id NOT IN (SELECT cart_abandoned_status.cart_id FROM cart_abandoned_status) ) AND carts.token = cart_emails.token AND created >'"  .  date("Y-m-d H:i:s", time() - 1200)."'  LIMIT 0,5 "); 

			$abandoned_carts_before_three_hours = $abandoned_carts_before_three_hours->fetch_all(MYSQLI_ASSOC);

			echo "<pre>";
			var_dump($abandoned_carts_before_three_hours);
			
			foreach ( $abandoned_carts_before_three_hours as $abandoned_cart) {
				$shop_id= $abandoned_cart['shop_id'];
				$funnel_id = $abandoned_cart['funnel_id'];
				$cart_id= $abandoned_cart['id'];
				$cart_token= $abandoned_cart['token'];
				$cart_info =  json_decode ($abandoned_cart['cart']);
				
				$first_name =$cart_info->shipping_details->first_name ;
				$last_name =$cart_info->shipping_details->last_name ;
				$email =$cart_info->shipping_details->email ;
				
				$shop_domain = get_shop_meta( $shop_id, 'shop_domain');
				$force_ssl = get_shop_meta( $shop_id, 'force_ssl');
				$full_shop_url= ( $force_ssl > 0 ? 'https://' : 'http://' ) . $shop_domain;
				$checkout_url = $full_shop_url.SHOPIFY_PROXY_PREFIX."/checkout/".$cart_token."/?ref=inbox";
				if ( $email == '' || $email == undefined) {
					$email = $mysqli->query ("SELECT  email FROM cart_emails WHERE token ='$cart_token' ");
					$email = $email->fetch_all(MYSQLI_ASSOC);
					$email = $email[0]['email'];
				}

				$email = str_replace(" ","+",$email);
				//$email = urlencode($email);

				$order_type = 'abandoned';
				subscribe_customer_email( $shop_id, $funnel_id, $first_name, $last_name , $email ,$checkout_url,$order_type );
				$mysqli->query ("INSERT INTO cart_abandoned_status (cart_id , status) VALUES ( $cart_id , 1)");	
			}
		} else {
		
			$completed_checkouts = $mysqli->query ("SELECT carts.id, carts.shop_id, carts.funnel_id, carts.token, carts.cart, carts.shopify_order_id , carts.status  FROM carts WHERE ( status = 4 AND  carts.id NOT IN (SELECT cart_abandoned_status.cart_id FROM cart_abandoned_status) ) LIMIT 0,5 "); 
			$completed_checkouts  = $completed_checkouts->fetch_all(MYSQLI_ASSOC);
			foreach ( $completed_checkouts as $completed_checkout ) {
					$shop_id= $completed_checkout['shop_id'];
					$funnel_id = $completed_checkout['funnel_id'];
					$cart_id= $completed_checkout['id'];
					$cart_token= $completed_checkout['token'];
					$cart_info =  json_decode ($completed_checkout['cart']);
					
					$first_name =$cart_info->shipping_details->first_name ;
					$last_name =$cart_info->shipping_details->last_name ;
					$email =$cart_info->shipping_details->email ;
					$order_type = 'completed';
					subscribe_customer_email( $shop_id, $funnel_id, $first_name, $last_name , $email ,$checkout_url, $order_type );
					$mysqli->query ("INSERT INTO cart_abandoned_status (cart_id , status) VALUES ( $cart_id , 1)");	
			}
		}
	}

	function subscribe_to_aweber( $consumerKey ,$consumerSecret , $accessKey,$accessSecret ,$listURL, $data ) {
		require_once('includes/aweber_api/aweber_api.php');
		$aweber = new AWeberAPI($consumerKey, $consumerSecret);
		try {
		    $account = $aweber->getAccount($accessKey, $accessSecret);
		    $list = $account->loadFromUrl($listURL);

		    # create a subscriber
		    $params = array(
		        'email' => $data['email'],
		        'ip_address' => $data['ip_address'],
		        'name' => $data['name'],
		        'custom_fields' => array(
		        	'checkout_url' => $data['checkout_url']
		        	)
		    );
		    $subscribers = $list->subscribers;
		    $new_subscriber = $subscribers->create($params);
		    # success!
		    echo "A new subscriber was added to the aweber list !";
		    //print "A new subscriber was added to the $list->name list!";

		} catch(AWeberAPIException $exc) {
			 echo "A new subscriber was failed to add to the aweber list !";
		}
		return true;
	}
	
	
	function subscribe_to_klaviyo( $klaviyo_api_key, $klaviyo_list_id, $data ) {
		
		if( ( $klaviyo_api_key != '' ) && ( $klaviyo_list_id != '' ) ) {
			if( trim( $data['first_name'] )  != '' ) $custom_fields['$first_name'] = $data['first_name'];
			if( trim( $data['last_name'] ) != '' ) $custom_fields['$last_name'] = $data['last_name'];
			if( trim( $data['checkout_url'] ) != '' ) $custom_fields['checkout_url'] = $data['checkout_url'];

			if(count($custom_fields)>0){
				$properties = json_encode($custom_fields);
			}
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, "https://a.klaviyo.com/api/v1/list/" . $klaviyo_list_id . "/members");
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
			curl_setopt($ch, CURLOPT_POSTFIELDS, "api_key=" . $klaviyo_api_key . "&email=" . urlencode($data['email'])."&properties=" .$properties."&confirm_optin=false");
			curl_setopt($ch, CURLOPT_POST, 1);

			$headers = array();
			$headers[] = "Content-Type: application/x-www-form-urlencoded";
			curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
			$result = curl_exec($ch);
			//if( strpos( $data['checkout_url'], 'genonenutrition' ) !== false ) {
			    //save_into_log_file(json_encode($data['email']));
			    //save_into_log_file(json_encode($result));
			//}

			echo "A new subscriber was added to the klaviyo list !";
			
			if (curl_errno($ch)) {
				echo 'Error:' . curl_error($ch);
			}
			curl_close ($ch);
		}
		
		return true;
	}

	function save_into_log_file($data){
		return;
		if( !file_exists( 'files/.ablog') ) file_put_contents('files/.ablog', '');
		$logdata = file_get_contents( 'files/.ablog');
		$logdata .= PHP_EOL . $data;
		file_put_contents('files/.ablog', $logdata);
	}


	function subscribe_to_mailchimp($mailchimp_api_key, $mailchimp_list_id, $data) {
		$apiKey =$mailchimp_api_key;
		$listId = $mailchimp_list_id;
		$memberId = md5(strtolower($data['email']));
		$dataCenter = substr($apiKey,strpos($apiKey,'-')+1);
		$url = 'https://' . $dataCenter . '.api.mailchimp.com/3.0/lists/' . $listId . '/members/' . $memberId;
		if (  $data['checkout_url'] == '' )  {
			$json = json_encode([
				'email_address' => $data['email'],
				'status'        => $data['status'], // "subscribed","unsubscribed","cleaned","pending"
				'merge_fields'  => [
					'FNAME'     => $data['firstname'],
					'LNAME'     => $data['lastname']
				]
			]);
		}else {
			$json = json_encode([
				'email_address' => $data['email'],
				'status'        => $data['status'], // "subscribed","unsubscribed","cleaned","pending"
				'merge_fields'  => [
					'FNAME'     => $data['firstname'],
					'LNAME'     => $data['lastname'],
					'CHKOUT_URL'		 => $data['checkout_url']
				]
			]);
		}
		
		$ch = curl_init($url);
		curl_setopt($ch, CURLOPT_USERPWD, 'user:' . $apiKey);
		curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_TIMEOUT, 10);
		curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $json);                                                                                                                 
		$result = curl_exec($ch);
		
		$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
		curl_close($ch);
		echo "A new subscriber was added to the mailchimp list ! <br>";
		return $httpCode;
	}

	function subscribe_to_drip( $access_token , $account_id, $drip_campaign_type,$drip_list_id , $data ) {
		if( ( $access_token != '' ) && ( $account_id != '' ) ) {
			if( trim( $data['first_name'] )  != '' ) $custom_fields['first_name'] = $data['first_name'];
			if( trim( $data['last_name'] ) != '' ) $custom_fields['last_name'] = $data['last_name'];
			//$subscribers = array( 'subscribers' => array( array( 'email' => $data['email'], 'ip_address' => $data['ip'], 'custom_fields' => $custom_fields, 'checkout_url' => $data['checkout_url'] ) ) );
			$subscribers = array('subscribers'=>array(array("email"=>$data['email'], "custom_fields" => array('fast_name' => $data['first_name'], "last_name" =>$data['last_name'], 'checkout_url' => $data['checkout_url']))));
			$data_string = json_encode( $subscribers );
			// echo $data_string;
			if( trim( $drip_campaign_type ) == 'workflow' ) $url = "https://api.getdrip.com/v2/" . $account_id . "/workflows/" . $drip_list_id . "/subscribers";
			else $url = "https://api.getdrip.com/v2/" . $account_id . "/campaigns/" . $drip_list_id . "/subscribers";
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $url);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
			curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string );
			curl_setopt($ch, CURLOPT_POST, 1);
			$headers = array();
			$headers[] = "Content-Type: application/vnd.api+json";
			$headers[] = "Content-Length: " . strlen($data_string);
			$headers[] = "Accept: application/vnd.api+json";
			$headers[] = "Authorization: Bearer " . $access_token;
			curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
			$result = curl_exec($ch);
			if (curl_errno($ch)) {
				echo 'Error:' . curl_error($ch);
			}
			curl_close ($ch);
			$res = json_decode( $result );
			foreach( $res->accounts as $account ) {
				$accounts[] = array( 'id' => $account->id, 'name' => $account->name );
			}
		}
		echo "A new subscriber was added to the drip list !";
		return true;
	}
	
	function klaviyo_events ($klaviyo_api_key,$email , $first_name , $last_name , $checkout_url , $event_name ) {
		include_once( 'includes/Klaviyo.php' );
		$customer_properties = array(
			'$email' 				=> $email, 
			'$first_name' 		=> $first_name, 
			'$last_name' 		=> $last_name
			);
		$properties = array('Checkout URL' => $checkout_url);
		$tracker = new Klaviyo( $klaviyo_api_key );
		$tracker->track($event_name ,$customer_properties,$properties);
	}
	
	function subscribe_customer_email( $shop_id, $funnel_id, $first_name, $last_name , $email , $checkout_url,$order_type ) {
		//if( strpos( $checkout_url, 'genonenutrition' ) !== false ) {
		    //save_into_log_file("+++++++++++++++++++++++++++++++++");
			// save_into_log_file("Email: ".$email);
			// save_into_log_file("Checkout url: ".$checkout_url);
			// save_into_log_file("+++++++++++++++++++++++++++++++++");
		//}
		$mailer_service = get_shop_meta( $shop_id, 'mailer_service');
		
		if ( $mailer_service != '' ) {
			if ( $mailer_service == 'aweber'){
				$consumerKey    = get_shop_meta( $shop_id, 'consumerKey' );
				$consumerSecret = get_shop_meta( $shop_id, 'consumerSecret' );
				$accessKey      = get_shop_meta( $shop_id, 'accessKey' );
				$accessSecret   = get_shop_meta( $shop_id, 'accessSecret' );
				
				if ( $order_type == 'abandoned'){
					if ( $funnel_id > 0 ){
						$listURL = get_funnel_meta( $funnel_id, 'abandoned_aweber_list_id' );
					}
					if  ($listURL =='' )  $listURL = get_shop_meta( $shop_id, 'abandoned_aweber_list_url' );
					$data = [
						'email' =>$email,
						'ip_address' =>  $_SERVER['REMOTE_ADDR'],
						'name' =>$first_name . ( trim( $first_name) != '' ? ' ' : '' ) . $last_name,
						'checkout_url' => $checkout_url 
					];
					if($consumerKey != "" && $consumerSecret != "" && $accessKey != "" && $accessSecret != "" && $listURL != ""){
						subscribe_to_aweber( $consumerKey ,$consumerSecret , $accessKey,$accessSecret ,$listURL, $data );
					}
				}else if ( $order_type == 'completed'){
					if ( $funnel_id > 0 ){
						$completed_aweber_list_id = get_funnel_meta( $funnel_id, 'completed_aweber_list_id' );
					}
					if  ($completed_aweber_list_id =='' )  $completed_aweber_list_id = get_shop_meta( $shop_id, 'completed_aweber_list_id' );
					$data = [
						'email' =>$email,
						'ip_address' =>  $_SERVER['REMOTE_ADDR'],
						'name' =>$first_name . ( trim( $first_name) != '' ? ' ' : '' ) . $last_name
					];
					if($consumerKey != "" && $consumerSecret != "" && $accessKey != "" && $accessSecret != "" && $completed_aweber_list_id != ""){
						subscribe_to_aweber( $consumerKey ,$consumerSecret , $accessKey,$accessSecret ,$completed_aweber_list_id, $data );
					}
				}
			}else if ( $mailer_service == 'drip'){
				$access_token = get_shop_meta( $shop_id, 'drip_access_token' );
				$account_id =get_shop_meta( $shop_id, 'drip_account_id' );
				
				if ( $order_type == 'abandoned'){
					if ( $funnel_id > 0 ){
						$abandoned_drip_list_type = get_funnel_meta( $funnel_id, 'abandoned_drip_list_type' );
						$abandoned_drip_list_id = get_funnel_meta( $funnel_id, 'abandoned_drip_list_id' );
					}
					if ( $abandoned_drip_list_type == '' )  $abandoned_drip_list_type = get_shop_meta( $shop_id, 'abandoned_drip_list_type');
					if ( $abandoned_drip_list_id == '' )  $abandoned_drip_list_id = get_shop_meta( $shop_id, 'abandoned_drip_list_id');
					$data = [
						'first_name'     => $first_name,
						'last_name'    => $last_name,
						'email' =>$email,
						'ip'  => $_SERVER['REMOTE_ADDR'],
						'checkout_url' => $checkout_url
					];
					if($access_token != "" && $account_id != "" && $abandoned_drip_list_type != "" && $abandoned_drip_list_id != ""){
						subscribe_to_drip( $access_token , $account_id, $abandoned_drip_list_type,$abandoned_drip_list_id , $data );
					}
				}else if ( $order_type == 'completed' ) {
					if ( $funnel_id > 0 ){
						$completed_order_drip_list_type = get_funnel_meta( $funnel_id, 'completed_order_drip_list_type' );
						$completed_drip_list_id = get_funnel_meta( $funnel_id, 'completed_drip_list_id' );
					}
					if ( $completed_order_drip_list_type == '' )  $completed_order_drip_list_type = get_shop_meta( $shop_id, 'completed_order_drip_list_type');
					if ( $completed_drip_list_id == '' )  $completed_drip_list_id = get_shop_meta( $shop_id, 'completed_drip_list_id');
					$data = [
						'first_name'     => $first_name,
						'last_name'    => $last_name,
						'email' =>$email
					];
					if($access_token != "" && $account_id != "" && $completed_order_drip_list_type != "" && $completed_drip_list_id != ""){
						subscribe_to_drip( $access_token , $account_id, $completed_order_drip_list_type,$completed_drip_list_id , $data );
					}
				}
			}else if ( $mailer_service == 'mailchimp'){
				$access_token = get_shop_meta( $shop_id, 'mailchimp_access_token' );
				$dc = get_shop_meta( $shop_id, 'mailchimp_dc' );
				$mailchimp_api_key = $access_token . '-' . $dc;
				
				if ( $order_type == 'abandoned'){
					if ( $funnel_id > 0 ){
						$abandoned_mailchimp_list_id = get_funnel_meta( $funnel_id, 'abandoned_mailchimp_list_id');
					}
					if ( $abandoned_mailchimp_list_id == '' )  $abandoned_mailchimp_list_id = get_shop_meta( $shop_id, 'abandoned_mailchimp_list_id');
					$data = [
						'email'     => $email,
						'status'    => 'subscribed',
						'firstname' =>$first_name,
						'lastname'  => $last_name,
						'checkout_url' => $checkout_url
					];
					if($mailchimp_api_key != "" && $abandoned_mailchimp_list_id != ""){
						subscribe_to_mailchimp( $mailchimp_api_key, $abandoned_mailchimp_list_id, $data );
					}
				} else if ( $order_type == 'completed'){
					if ( $funnel_id > 0 ){
						$completed_mailchimp_list_id = get_funnel_meta( $funnel_id, 'completed_mailchimp_list_id');
					}
					if ( $completed_mailchimp_list_id == '' )  $completed_mailchimp_list_id = get_shop_meta( $shop_id, 'completed_mailchimp_list_id');
					$data = [
						'email'     => $email,
						'status'    => 'subscribed',
						'firstname' =>$first_name,
						'lastname'  => $last_name
					];
					if($mailchimp_api_key != "" && $completed_mailchimp_list_id != ""){
						subscribe_to_mailchimp( $mailchimp_api_key, $completed_mailchimp_list_id, $data );
					}
				}
			}else if ( $mailer_service == 'klaviyo'){
				$klaviyo_api_key = get_shop_meta( $shop_id, 'klaviyo_api_key' );
				if ( $order_type == 'abandoned'){
					if ( $funnel_id > 0 ){
						$abandoned_klaviyo_list_id = get_funnel_meta( $funnel_id, 'abandoned_klaviyo_list_id');
					}
					if ($abandoned_klaviyo_list_id == '' ) $abandoned_klaviyo_list_id = get_shop_meta( $shop_id, 'abandoned_klaviyo_list_id');
					$data = array("email"=>$email,"first_name"=>$first_name,"last_name"=>$last_name,"checkout_url"=>$checkout_url);
					if($klaviyo_api_key != "" && $abandoned_klaviyo_list_id != ""){
						subscribe_to_klaviyo( $klaviyo_api_key, $abandoned_klaviyo_list_id, $data ) ;
					}
				}else if ( $order_type == 'completed') {
					if ( $funnel_id > 0 ){
						$completed_klaviyo_list_id = get_funnel_meta( $funnel_id, 'completed_klaviyo_list_id');
					}
					if ($completed_klaviyo_list_id == '' ) $completed_klaviyo_list_id = get_shop_meta( $shop_id, 'completed_klaviyo_list_id');
					$data = array("email"=>$email,"first_name"=>$first_name,"last_name"=>$last_name);
					//~klaviyo_events ($klaviyo_api_key,$email , $first_name , $last_name , $checkout_url , 'Started Checkout' );
					if($klaviyo_api_key != "" && $completed_klaviyo_list_id != ""){
						subscribe_to_klaviyo( $klaviyo_api_key, $completed_klaviyo_list_id, $data ) ;
					}
				}
			}
		}
	}
?>
