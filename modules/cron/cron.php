<?php
	/*
		** Cron to process unprocessed payments: 
			https://funnelbuildrapp.com/app/cron/?process=automatic_transactions
	*/

	module_include( 'custom_checkout' );
	form_processor();
	
	function process_automatic_transactions() {
		global $mysqli;
		//time of 5 min ago
		$fiveminago = date( 'Y-m-d H:i:s', mktime(date('H'), ( date('i') - 10 ), date('s'), date('n'), date('j'), date('Y') ) );

		$res = $mysqli->query("SELECT id, shop_id, cart, token FROM carts WHERE last_modified < '$fiveminago' AND status=3 AND shopify_order_id='' LIMIT 5");
		while( $row = $res->fetch_array( MYSQLI_ASSOC ) ) {
			$cart = json_decode( str_replace( '\"', '"', str_replace( "\'", "'", $row['cart'] ) ) );
			if( $cart == NULL ) $cart = json_decode( $row['cart'] );
			if( isset( $cart->billing_details ) ) {
				if( ( isset( $cart->billing_details->token ) && ( $cart->billing_details->token != '' ) && isset( $cart->billing_details->customer_id ) && ( $cart->billing_details->customer_id != '' ) ) || ( isset( $cart->billing_details->paypal_payer_id ) && $cart->billing_details->paypal_payer_id != '' ) || ( isset( $cart->billing_details->customer_vault_id ) && $cart->billing_details->customer_vault_id != '' ) || ( isset( $cart->billing_details->vaulted_shopper_id ) && $cart->billing_details->vaulted_shopper_id != '' ) ) {
					complete_an_order( $row['token'] );
				}
			}

			//check if failed to complete, change the status to 5 (cannot be completed)
			/*$res2 = $mysqli->query("SELECT status FROM carts WHERE id='" . $row['id'] . "'");
			$arr2 = $res2->fetch_array( MYSQLI_ASSOC );
			if( $arr2['status'] == 3 ) {
				$mysqli->query("UPDATE carts SET status='5' WHERE id='" . $row['id'] . "'");
			}*/
		}
	}

	function process_abandoned_carts() {
		global $mysqli;
		//check shop_meta of "abandoned_cart_update" for time of last check
		//if time is more than 24 hours, find newer abandoned carts from last checked cart id ("last_abandoned_cart_id")
		//save current time stamp to shop meta
	}
?>