<?php 
	session_recovery( SESSIONNAME );
	if( isset( $_SESSION[ SESSIONNAME ]['shop_id'] ) ) {
		$shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];
		if( isset( $_REQUEST['code'] ) ) {

			//Get authorization code
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, "https://www.getdrip.com/oauth/token");
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
			curl_setopt($ch, CURLOPT_POSTFIELDS, "response_type=token&client_id=" . DRIP_CLIENT_ID . "&client_secret=" . DRIP_CLIENT_SECRET . "&code=" . $_REQUEST['code'] . "&redirect_uri=" . urlencode( BASE . '/drip_connect/' ) . "&grant_type=authorization_code" );
			curl_setopt($ch, CURLOPT_POST, 1);

			$headers = array();
			$headers[] = "Content-Type: application/x-www-form-urlencoded";
			curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

			$result = curl_exec($ch);
			if (curl_errno($ch)) {
			    echo 'Error:' . curl_error($ch);
			}

			curl_close ($ch);

			$res = json_decode( $result );
			if( isset( $res->access_token ) ) {
				add_shop_meta( $shop_id, 'mailer_service', 'drip' );
				add_shop_meta( $shop_id, 'drip_access_token', $res->access_token );

				//get the account id
				$ch = curl_init();
			    curl_setopt($ch, CURLOPT_URL, "https://api.getdrip.com/v2/accounts");
			    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

			    $headers = array();
			    $headers[] = "Accept: application/vnd.api+json";
			    $headers[] = "Authorization: Bearer " . $res->access_token;
			    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

			    $result = curl_exec($ch);
			    if (curl_errno($ch)) {
			        echo 'Error:' . curl_error($ch);
			    }
			    curl_close ($ch);

			    $res = json_decode( $result );

			    foreach( $res->accounts as $account ) {
			    	add_shop_meta( $shop_id, 'drip_account_id', $account->id );
			    	break;
			    }
			}

			header("location:" . BASE . "/settings/?success=drip_connect");
		}
	}
?>