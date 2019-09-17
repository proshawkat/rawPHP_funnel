<?php
	header("Access-Control-Allow-Origin: *");
	require 'includes/shopify.php';

	if( isset( $_REQUEST['process'] ) ) {
		if( $_REQUEST['process'] == 'save_email' ) {
			$sres = $mysqli->query("SELECT shop_id FROM pages WHERE id='" . $_REQUEST['page_id'] . "'");
			$sarr = $sres->fetch_array( MYSQLI_ASSOC );

			$shop_id = $sarr['shop_id'];
			$funnel_id = $_REQUEST['funnel_id'];
			$page_id = $_REQUEST['page_id'];
			$email = $_REQUEST['email'];
			$first_name = $_REQUEST['first_name'];
			$last_name = $_REQUEST['last_name'];

			$res = $mysqli->query("INSERT INTO mailing_list ( `date`, page_id, funnel_id, first_name, last_name, email ) VALUES ( '" . date( "Y-m-d H:i:s") . "', '" . $_REQUEST['page_id'] . "', '" . $_REQUEST['funnel_id'] . "', '" . $mysqli->real_escape_string( $_REQUEST['first_name'] ) . "', '" . $mysqli->real_escape_string( $_REQUEST['last_name'] ) . "', '" . $_REQUEST['email'] . "' )");

			//Subscribe user into mailing services
			$data = array( 'email' => $_REQUEST['email'], 'first_name' => $_REQUEST['first_name'], 'last_name' => $_REQUEST['last_name'], 'landing_page' => $_REQUEST['landing_page'], 'ip' => $_REQUEST['ip'] );
			$mailer_service = get_shop_meta( $shop_id, 'mailer_service' );
			
			// if( $mailer_service == 'aweber' ) {
			// 	subscribe_to_aweber( $shop_id, $_REQUEST['page_id'], $data );
			// } elseif( $mailer_service == 'mailchimp' ) {
			// 	subscribe_to_mailchimp( $shop_id, $_REQUEST['page_id'], $data );
			// } elseif( $mailer_service == 'drip' ) {
			// 	subscribe_to_drip( $shop_id, $_REQUEST['page_id'], $data );
			// } elseif( $mailer_service == 'klaviyo' ) {
			// 	subscribe_to_klaviyo( $shop_id, $_REQUEST['page_id'], $data );
			// }

			if( $mailer_service == 'aweber' ) {
				if ( $funnel_id > 0 ){
					$aweber_list_url = get_funnel_meta( $funnel_id, 'subscribed_aweber_list_id' );
				}
				else{
					$aweber_list_url = get_page_meta( $page_id, 'aweber_list_url' );
				}
				if  ($aweber_list_url =='' )  $aweber_list_url = get_shop_meta( $shop_id, 'subscribed_aweber_list_id' );
				
				$consumerKey    = get_shop_meta( $shop_id, 'consumerKey' );
				$consumerSecret = get_shop_meta( $shop_id, 'consumerSecret' );
				$accessKey      = get_shop_meta( $shop_id, 'accessKey' );
				$accessSecret   = get_shop_meta( $shop_id, 'accessSecret' );
				$data = [
					'email' =>$email,
					'ip_address' =>  $_SERVER['REMOTE_ADDR'],
					'name' =>$first_name . ( trim( $first_name) != '' ? ' ' : '' ) . $last_name
				];
				subscribe_to_aweber( $consumerKey ,$consumerSecret , $accessKey,$accessSecret,$aweber_list_url, $data );
			} else if( $mailer_service == 'mailchimp' ) {
				if ( $funnel_id > 0 ){
					$mailchimp_list_id = get_funnel_meta( $funnel_id, 'subscribed_mailchimp_list_id');
				}else{
					$mailchimp_list_id = get_page_meta( $page_id, 'mailchimp_list_id');
				}
				if ( $mailchimp_list_id == '' )  $mailchimp_list_id = get_shop_meta( $shop_id, 'subscribed_mailchimp_list_id');
				$data = [
					'email'     => $email,
					'status'    => 'subscribed',
					'firstname' =>$first_name,
					'lastname'  => $last_name
				];
				$access_token = get_shop_meta( $shop_id, 'mailchimp_access_token' );
				$dc = get_shop_meta( $shop_id, 'mailchimp_dc' );
				$mailchimp_api_key = $access_token . '-' . $dc;
				subscribe_to_mailchimp( $mailchimp_api_key, $mailchimp_list_id, $data ) ;
			} else if( $mailer_service == 'drip' ) {
				if ( $funnel_id > 0 ){
					$drip_campaign_type = get_funnel_meta( $funnel_id, 'drip_campaign_type' );
					$drip_list_id = get_funnel_meta( $funnel_id, 'subscribed_drip_list_id' );
				}else{
					$drip_campaign_type = get_page_meta( $page_id, 'drip_campaign_type' );
					if($drip_campaign_type == "workflow"){
						$drip_list_id = get_page_meta( $page_id, 'drip_workflow_id' );
					}else{
						$drip_list_id = get_page_meta( $page_id, 'drip_campaign_id' );
					}
					
				}

				if ( $drip_campaign_type == '' )  $drip_campaign_type = get_shop_meta( $shop_id, 'abandoned_drip_list_type');
				if ( $drip_list_id == '' )  $drip_list_id = get_shop_meta( $shop_id, 'subscribed_drip_list_id');
				
				$access_token = get_shop_meta( $shop_id, 'drip_access_token' );
				$account_id =get_shop_meta( $shop_id, 'drip_account_id' );
				$data = [
					'first_name'     => $first_name,
					'last_name'    => $last_name,
					'email' =>$email,
					'ip'  => $_SERVER['REMOTE_ADDR'],
					'checkout_url' => $checkout_url
				];
				subscribe_to_drip( $access_token , $account_id, $drip_campaign_type,$drip_list_id , $data );
			} else if( $mailer_service == 'klaviyo' ) {
				if ( $funnel_id > 0 ){
					$klaviyo_list_id = get_funnel_meta( $funnel_id, 'subscribed_klaviyo_list_id');
				}else{
					$klaviyo_list_id = get_page_meta( $page_id, 'klaviyo_list_id');
				}
				if ($klaviyo_list_id == '' ) $klaviyo_list_id = get_shop_meta( $shop_id, 'subscribed_klaviyo_list_id');
				$klaviyo_api_key = get_shop_meta( $shop_id, 'klaviyo_api_key' );
				$data = array("email"=>$email,"first_name"=>$first_name,"last_name"=>$last_name);
				subscribe_to_klaviyo( $klaviyo_api_key, $klaviyo_list_id, $data ) ;
			}

			$data['mailer'] = $mailer_service;

			echo ( $mysqli->error != '' ? '0' : '1' );
		} elseif( $_REQUEST['process'] == 'save_pageview' ) {
			$device = ( (preg_match('/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i',$_REQUEST['agent'])||preg_match('/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i',substr($_REQUEST['agent'],0,4))) ? 'mobile' : 'desktop' );
			$browser_info = get_browser_info( $_REQUEST['agent'] );
			$platform = $browser_info['platform'];
			$browser = $browser_info['name'];

			$res = $mysqli->query("SELECT shop_id FROM pages WHERE id='" . $_REQUEST['page_id'] . "'");
			$arr = $res->fetch_array( MYSQLI_ASSOC );

			$location = json_decode( file_get_contents( 'http://ip-api.com/json/' . $_REQUEST['ip'] ) );
			$mysqli->query("INSERT INTO pageviews (date, token, shop_id, page_id, funnel_id, ip, platform, browser, device, browser_info, city, country, zip_code, latitude, longitude ) VALUES ('" . date("Y-m-d H:i:s") . "', '" . $_REQUEST['cart_token'] . "', '" . $arr['shop_id'] . "', '" . $_REQUEST['page_id'] . "', '" . $_REQUEST['funnel_id'] . "', '" . $_REQUEST['ip'] . "', '" . $mysqli->real_escape_string( $platform ) . "', '" . $mysqli->real_escape_string( $browser ) . "', '" . $device . "', '" . $mysqli->real_escape_string( $_REQUEST['agent'] ) . "', '" . $location->city . "', '" . $location->country . "', '" . $location->zip_code . "', '" . $location->lat . "', '" . $location->lon . "')");
			echo $mysqli->error;
		} elseif( $_REQUEST['save_button_click'] ) {
			
		}else if( $_REQUEST['process'] == 'capture_email' ) {
			global  $mysqli;
			$res = $mysqli->query("SELECT id , email  FROM cart_emails WHERE token='".$_REQUEST['cart_token']."' ");
			
			$cart_details = $mysqli->query("SELECT shop_id , cart  FROM carts WHERE token='".$_REQUEST['cart_token']."' ");
			$cart_details = $cart_details->fetch_array( MYSQLI_ASSOC );
			
			$shop_id = $cart_details['shop_id'];
			$cart = $cart_details['cart'];
			$cart = json_decode ( $cart) ;
			$total_price =  $cart->total_price;
			$total_price = number_format($total_price/100 , 2 , '.' , ''); 
			$mailer_service = get_shop_meta( $shop_id, 'mailer_service' );
			
			if( $res->num_rows > 0 ) {
				$arr = $res->fetch_array( MYSQLI_ASSOC );
				if ( $mailer_service == 'klaviyo' &&  $arr ['email'] != $_REQUEST['email'] ){
					trigger_klaviyo_events( $shop_id, $_REQUEST['cart_token'] , $_REQUEST['email'], $_REQUEST['shipping_first_name'], $_REQUEST['shipping_last_name'], $total_price, 'Started Checkout' );
				}
				$mysqli->query("UPDATE cart_emails SET email = '".$_REQUEST['email']."'  WHERE id='" . $arr['id'] ."'  ");
			} else {
				$mysqli->query ("INSERT INTO cart_emails (token , email) VALUES (  '".$_REQUEST['cart_token']."',   '".$_REQUEST['email']. "' )" );
				if ( $mailer_service == 'klaviyo' ) {
					trigger_klaviyo_events( $shop_id, $_REQUEST['cart_token'] , $_REQUEST['email'], $_REQUEST['shipping_first_name'], $_REQUEST['shipping_last_name'], $total_price, 'Started Checkout' );
				}
			}
		}else if( $_REQUEST['process'] == 'save_first_last_name' ) { 
			global  $mysqli;
			$cart_token = $_REQUEST['cart_token'];

			$shipping_details = array(
				'email' 			=>	$_REQUEST['email'],
				'first_name'		=>	$_REQUEST['first_name'],
				'last_name'			=>	$_REQUEST['last_name']
			);

			$res = $mysqli->query("SELECT id,cart FROM carts WHERE token='$cart_token'");
			$arr = $res->fetch_array( MYSQLI_ASSOC );
			$cart = json_decode( $arr['cart'] );

			$cart->shipping_details = $shipping_details;

			$mysqli->query("UPDATE carts SET cart='" . $mysqli->real_escape_string( json_encode( $cart ) ) . "' WHERE id='" . $arr['id'] . "'");
		}
	}

	function get_browser_info( $u_agent ) {
	    $bname = 'Unknown';
	    $platform = 'Unknown';
	    $version= "";

	    //First get the platform?
	    if (preg_match('/linux/i', $u_agent)) {
	        $platform = 'linux';
	    }
	    elseif (preg_match('/macintosh|mac os x/i', $u_agent)) {
	        $platform = 'mac';
	    }
	    elseif (preg_match('/windows|win32/i', $u_agent)) {
	        $platform = 'windows';
	    }

	    // Next get the name of the useragent yes seperately and for good reason
	    if(preg_match('/MSIE/i',$u_agent) && !preg_match('/Opera/i',$u_agent)) 
	    { 
	        $bname = 'Internet Explorer'; 
	        $ub = "MSIE"; 
	    } 
	    elseif(preg_match('/Firefox/i',$u_agent)) 
	    { 
	        $bname = 'Mozilla Firefox'; 
	        $ub = "Firefox"; 
	    }
	    elseif(preg_match('/OPR/i',$u_agent)) 
	    { 
	        $bname = 'Opera'; 
	        $ub = "Opera"; 
	    } 
	    elseif(preg_match('/Chrome/i',$u_agent)) 
	    { 
	        $bname = 'Google Chrome'; 
	        $ub = "Chrome"; 
	    } 
	    elseif(preg_match('/Safari/i',$u_agent)) 
	    { 
	        $bname = 'Apple Safari'; 
	        $ub = "Safari"; 
	    } 
	    elseif(preg_match('/Netscape/i',$u_agent)) 
	    { 
	        $bname = 'Netscape'; 
	        $ub = "Netscape"; 
	    } 

	    // finally get the correct version number
	    $known = array('Version', $ub, 'other');
	    $pattern = '#(?<browser>' . join('|', $known) .
	    ')[/ ]+(?<version>[0-9.|a-zA-Z.]*)#';
	    if (!preg_match_all($pattern, $u_agent, $matches)) {
	        // we have no matching number just continue
	    }

	    // see how many we have
	    $i = count($matches['browser']);
	    if ($i != 1) {
	        //we will have two since we are not using 'other' argument yet
	        //see if version is before or after the name
	        if (strripos($u_agent,"Version") < strripos($u_agent,$ub)){
	            $version= $matches['version'][0];
	        }
	        else {
	            $version= $matches['version'][1];
	        }
	    }
	    else {
	        $version= $matches['version'][0];
	    }

	    // check if we have a number
	    if ($version==null || $version=="") {$version="?";}

	    return array(
	        'name'      => $bname,
	        'version'   => $version,
	        'platform'  => $platform,
	        'pattern'    => $pattern
	    );
	}

	function subscribe_to_aweber( $consumerKey ,$consumerSecret , $accessKey,$accessSecret ,$listURL, $data ) {
		if( ( $consumerKey != '' ) && ( $listURL != '' ) ) {
			require_once('includes/aweber_api/aweber_api.php');
			$aweber = new AWeberAPI($consumerKey, $consumerSecret);
			try {
			    $account = $aweber->getAccount($accessKey, $accessSecret);
			    $list = $account->loadFromUrl($listURL);

			    # create a subscriber
			    $params = array(
			        'email' => $data['email'],
			        'ip_address' => $data['ip'],
			        'name' => $data['name']
			    );
			    $subscribers = $list->subscribers;
			    $new_subscriber = $subscribers->create($params);

			    # success!
			    //print "A new subscriber was added to the $list->name list!";

			} catch(AWeberAPIException $exc) {
			    /*print "<h3>AWeberAPIException:</h3>";
			    print " <li> Type: $exc->type              <br>";
			    print " <li> Msg : $exc->message           <br>";
			    print " <li> Docs: $exc->documentation_url <br>";
			    print "<hr>";*/
			    exit(1);
			}
		}
		return true;
	}
	
	
	function subscribe_to_klaviyo( $klaviyo_api_key, $klaviyo_list_id, $data ) {
		if( ( $klaviyo_api_key != '' ) && ( $klaviyo_list_id != '' ) ) {
			if( trim( $data['first_name'] )  != '' ) $custom_fields['$first_name'] = $data['first_name'];
			if( trim( $data['last_name'] ) != '' ) $custom_fields['$last_name'] = $data['last_name'];

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
			if (curl_errno($ch)) {
				echo 'Error:' . curl_error($ch);
			}
			curl_close ($ch);
		}
		return true;
	}


	function subscribe_to_mailchimp($mailchimp_api_key, $mailchimp_list_id, $data) {
		$apiKey =$mailchimp_api_key;
		$listId = $mailchimp_list_id;
		$memberId = md5(strtolower($data['email']));
		$dataCenter = substr($apiKey,strpos($apiKey,'-')+1);
		$url = 'https://' . $dataCenter . '.api.mailchimp.com/3.0/lists/' . $listId . '/members/' . $memberId;
		$json = json_encode([
			'email_address' => $data['email'],
			'status'        => $data['status'], // "subscribed","unsubscribed","cleaned","pending"
			'merge_fields'  => [
				'FNAME'     => $data['firstname'],
				'LNAME'     => $data['lastname']
			]
		]);
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
		return $httpCode;
	}


	function subscribe_to_drip( $access_token , $account_id, $drip_campaign_type,$drip_list_id , $data ) {
		if( ( $access_token != '' ) && ( $account_id != '' ) ) {
			if( trim( $data['first_name'] )  != '' ) $custom_fields['first_name'] = $data['first_name'];
			if( trim( $data['last_name'] ) != '' ) $custom_fields['last_name'] = $data['last_name'];
			//$subscribers = array( 'subscribers' => array( array( 'email' => $data['email'], 'ip_address' => $data['ip'], 'custom_fields' => $custom_fields, 'checkout_url' => $data['checkout_url'] ) ) );
			$subscribers = array('subscribers'=>array(array("email"=>$data['email'], "custom_fields" => array('fast_name' => $data['first_name'], "last_name" =>$data['last_name']))));
			$data_string = json_encode( $subscribers );
			// echo $data_string; die();
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
		return true;
	}
?>
