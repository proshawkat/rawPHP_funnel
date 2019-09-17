<?php
	//get shop global information
    $res = $mysqli->query( "SELECT id, token FROM shops WHERE shop='" . $_REQUEST['shop'] . "'" );
	$arr = $res->fetch_array( MYSQLI_ASSOC );
	$shop_id = $arr['id'];
	$shop_currency = get_shop_meta( $shop_id, 'shop_currency' );
	$token = $arr['token'];
	$shop_domain = get_shop_meta( $shop_id, 'shop_domain');
	$force_ssl = get_shop_meta( $shop_id, 'force_ssl');
	$full_shop_url= ( $force_ssl > 0 ? 'https://' : 'http://' ) . $shop_domain;
	$display_type = ( $break[ $start + 1 ] == 'f' ? 'funnel' : ( $break[ $start + 1 ] == 'p' ? 'page' : $break[ $start + 1 ] ) );
	if( $display_type == 'checkout' ) {
		$cart_token = $break[ $start + 2 ];
		$cart_token = explode( '?', $cart_token );
		$cart_token = $cart_token[0];
	}
	$before_after_checkout = "false";

	//include custom checkout and page creation modules
	module_include( 'custom_checkout' );
	module_include( 'page_creator' );

	form_processor();

	if( $display_type == 'page' ) {
		if( isset( $_REQUEST['go'] ) ) {
			//if product is added, bring him to checkout
			//if product is not added, bring him to shop home page
			//get default checkout settings and let him checkout by that
			//if custom is chosen, display thank you page (can be customized by settings as upsell)
			$default_checkout_type = get_shop_meta( $shop_id, 'default_checkout_type' );
			if( $default_checkout_type == '' ) $default_checkout_type = 'built-in';
			redirection_to_checkout( $default_checkout_type );
		} else {
			$page_id = $break[ $start + 2 ];
			display_page( $page_id );
		}
	} elseif( $display_type == 'funnel' ) { 
		//get the stage, and display page or custom checkout
		//Display the page selected for this funnel's current stage
		//If the stage is for checkout, bring it to selected checkout page (custom or built-in)
		//If add to cart / optin button is clicked, bring the user to next stage or to checkout if selected so
		//If ignore button is selected, bring him to the selected stage too...

		$funnel_id = $break[ $start + 2 ];
		$funnel = json_decode( str_replace( '\"', '"', str_replace( "\'", "'", get_funnel_meta( $funnel_id, 'funnel_code' ) ) ), true );
		$stage = $break[ $start + 3 ];

		$before_after_checkout = checkout_is_my_parent ($funnel_id , $stage);

		if( ( isset( $funnel[ $stage ] ) ) && ( count( $funnel[ $stage ]['pages'] ) > 0 ) ) {
			$stage_data = $funnel[ $stage ];
		} else {
			header( "location:" . next_stage_to_redirect( $shop_id, 1 ) );
			/*foreach( $funnel as $funnel_stage ) {
				if( $funnel_stage['type'] == 'checkout' ) {
					$stage_data = $funnel_stage;
					break;
				}
			}

			if( !isset( $stage_data ) ) $stage_data = array( 'type' => 'checkout', 'checkout_type' => get_shop_meta( $shop_id, 'default_checkout_type' ), 'child' => array() );*/
		}

		if( isset( $_REQUEST['go'] ) ) {

			if( $_REQUEST['go'] == 'checkout' ) {
				echo "Redirect to checkout with params";
			} elseif( isset( $stage_data['child'][ $_REQUEST['go'] ] ) && ( $stage_data['child'][ $_REQUEST['go'] ] != '' ) && ( $stage_data['child'][ $_REQUEST['go'] ] != 'null' ) ) {
				$next_stage = $stage_data['child'][ $_REQUEST['go'] ];
			} else {
				$post_checkout = false;
				if( $stage > 0 ) {
					$res = $mysqli->query("SELECT id FROM carts WHERE status >= 3 AND token='" . $_REQUEST['cart_token'] . "'");
					if( $res->num_rows > 0 ) {
						$post_checkout = true;
					}
				}

				//if the stage is before checkout
				//if downsell and upsell both are not found, find the checkout stage
				if( !$post_checkout ) {
					for( $i = 0; $i < count( $funnel ); $i++ ) {
						if( $funnel[$i]['type'] == 'checkout' ) {
							$next_stage = $i;
							break;
						}
					}
				} else {
					$cart_token = $_REQUEST['cart_token'];
					header('location:' . redirect_from_checkout( $shop_id, $funnel_id, $cart_token, $stage ) );
					die();
				}
			}

			if( !isset( $next_stage ) || $next_stage == '' ) $next_stage = count( $funnel );

			if( $funnel[ $next_stage ]['type'] == 'thank_you' ) {
				$redirect = redirect_from_checkout( $shop_id, $funnel_id, $cart_token );
			} else {
				$force_ssl = get_shop_meta( $shop_id, 'force_ssl');
				$shop_domain = get_shop_meta( $shop_id, 'shop_domain' );
				$redirect = ( $force_ssl > 0 ? 'https://' : 'http://' ) . $shop_domain . SHOPIFY_PROXY_PREFIX . '/' . $break[ $start + 1 ] . '/' . $break[ $start + 2 ] . '/' . $next_stage . '/' . $break[ $start + 4 ];
				$br = explode( '?', $redirect );
				$redirect = $br[0];
			}

			header('location:' . $redirect);

			/*
			** if left or right is chosen, find that page
			** if left or right is not chosen, left is default, if left not exists, right is default
			** if nothing found, check checkout settings, if built-in show checkout
			** if nothing found, checkout is custom, show custom checkout if payment is not done
			** if nothing found, checkout is custom, show thank you if payment is done
			*/
		} else {
			//if stage type is thank you, complete the order
			if( $stage_data['type'] == 'checkout' ) {
				$embed_checkout_page = '';
				if($stage_data['checkout_type'] == "custom"){
					if($stage_data['pages'] != "") $embed_checkout_page = $stage_data['pages'];
				}

				//if no payment processor is connected, redirect to shopify checkout
				if( !any_payment_processor_connected( $shop_id ) ) $embed_checkout_page = '';

				if( $embed_checkout_page != "" ) display_page( $embed_checkout_page, $funnel_id, false, true );
				else redirection_to_checkout( $stage_data['checkout_type'] );
				
			} else {
				$complete_transaction = false;
				if( $stage_data['type'] == 'thank_you' ) $complete_transaction = true;

				//if only one page is defined, show that
				//if more than one page is defined, get percentage

				$page_id = $stage_data['pages'][0]['page_id'];
				if( count( $stage_data['pages'] ) == 1 ) {
					$page_id = $stage_data['pages'][0]['page_id'];
				} else {
					for( $i = 0; $i < count( $stage_data['pages'] ); $i++ ) {
						if( !isset( $total_pageviews_percent ) ) $total_pageviews_percent = 100;
						$stage_data['pages'][$i]['percent'] = (float) str_replace( '%', '', $stage_data['pages'][$i]['percent'] );
						$stage_data['pages'][$i]['percent'] = ( $stage_data['pages'][$i]['percent'] <= $total_pageviews_percent ? $stage_data['pages'][$i]['percent'] : $total_pageviews_percent );
						$total_pageviews_percent = ( $total_pageviews_percent - ( $stage_data['pages'][$i]['percent'] < $total_pageviews ) );

						$res = $mysqli->query("SELECT id FROM pageviews WHERE funnel_id='$funnel_id' AND page_id='" . $stage_data['pages'][$i]['page_id'] . "'");
						$pageviews[ $stage_data['pages'][$i]['page_id'] ] = $res->num_rows;
						$total_pageviews += $res->num_rows;
					}

					foreach( array_keys( $pageviews ) as $pageview_key ) {
						$pageviews[ $pageview_key ] = ( ( $pageviews[ $pageview_key ] / $total_pageviews ) * 100 );
					}

					for( $i = 0; $i < count( $stage_data['pages'] ); $i++ ) {
						if( $pageviews[ $stage_data['pages'][$i]['page_id'] ] <= $stage_data['pages'][$i]['percent'] ) $page_id = $stage_data['pages'][$i]['page_id'];
					}
				}

				if( $page_id > 0 ) display_page( $page_id, $funnel_id, $complete_transaction );
				else echo "Page not found";
			}
		}
	} elseif( $display_type == 'checkout' ) {
		if( isset( $break[ $start + 4 ] ) && trim( $break[ $start + 4 ] ) == 'thank_you' ) {
			//Display default thank you page
			//fix the thank you page, fix it's settings
			//clear cart after from inline js script
			//food of thought, update cart token for completed orders
			custom_checkout( true );
			//And Complete the order
			//add "complete_transaction()" js function in the thank you page

		} else {
			custom_checkout();
		}
	}

	function checkout_is_my_parent ($funnel_id , $index){
        $funnel_array = json_decode( get_funnel_meta($funnel_id,'funnel_code') );
        $post_checkout = "false" ;
        if ( $funnel_array[$index]->type !='checkout'  ) {
            while ( $post_checkout == "false" && $index > 0  ) {
                if ( $funnel_array[$index]->type=='checkout') {
                    $post_checkout = "true";
                    return $post_checkout;
                }
                $index = $funnel_array[$index]->parent;
            }
            return $post_checkout ;
        }else {
            return $post_checkout ;
        } 
    }

	function redirection_to_checkout( $type ) {
		global $funnel_id, $shop_id;

		$shop_currency = get_shop_meta($shop_id, "shop_currency");
		
		$shop_domain = get_shop_meta( $shop_id, 'shop_domain');
		if($funnel_id != null && $funnel_id != ""){
			$fb_pixel_id = get_fb_pixel_id($page_id, $funnel_id, $complete_transaction);
		}else{
			$fb_pixel_id = get_fb_pixel_id($page_id, $funnel_id, $complete_transaction);
		}
?>
<!DOCTYPE html>
<html>
	<head>
		<title>Redirecting...</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,intitial-scale=1.0">
		<script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
		<script src="<?php echo BASE; ?>/files/js/jquery.loadingModal.js"></script>
		<script src="<?php echo BASE; ?>/files/js/fbpixel.js"></script>
		<link rel="stylesheet" href="<?php echo BASE; ?>/files/css/display.css">
		<script>
			var shopify_proxy_prefix = '<?php echo SHOPIFY_PROXY_PREFIX ?>';
			function built_in_checkout() {
				document.getElementById('shopify_built_in_checkout').click();
			}

			function custom_checkout() {
				jQuery.getJSON('/cart.js', function(cart) {
					document.getElementById('custom_checkout').action = shopify_proxy_prefix + '/checkout/' + cart.token + '/';
				  	document.getElementById('cart_data').value = JSON.stringify( cart );
				  	document.getElementById('shopify_custom_checkout').click();
				});
			}
		</script>
	</head>
	<body style="background-color:#dadada !important;">
		<?php
			$msg_array = get_msg_val();
		?>
		<script>
			$('body').loadingModal({text: '<h4 style="color:#333;"><?php echo $msg_array['redirecting_to_checkout_msg'] ; ?></h4><h5 style="color:#424242;"><?php echo $msg_array['do_not_reload_msg'] ; ?></h5>'});
		</script>
		<div style="display:none">
			<form id="built_in_checkout" action="/checkout" method="post">
				<?php if( isset( $_REQUEST['checkout']['email'] ) ) { ?>
				<input type="text" name="checkout[email]" value="<?php echo htmlentities( $_REQUEST['checkout']['email'] ) ?>">
				<input type="text" name="checkout[shipping_address][first_name]" value="<?php echo htmlentities( $_REQUEST['checkout']['shipping_address']['first_name'] ) ?>">
				<input type="text" name="checkout[shipping_address][last_name]" value="<?php echo htmlentities( $_REQUEST['checkout']['shipping_address']['last_name'] ) ?>">
				<input type="text" name="checkout[shipping_address][address1]" value="<?php echo htmlentities( $_REQUEST['checkout']['shipping_address']['address1'] ) ?>">
				<input type="text" name="checkout[shipping_address][address2]" value="<?php echo htmlentities( $_REQUEST['checkout']['shipping_address']['address2'] ) ?>">
				<input type="text" name="checkout[shipping_address][city]" value="<?php echo htmlentities( $_REQUEST['checkout']['shipping_address']['city'] ) ?>">
				<input type="text" name="checkout[shipping_address][country]" value="<?php echo htmlentities( $_REQUEST['checkout']['shipping_address']['country'] ) ?>">
				<input type="text" name="checkout[shipping_address][zip]" value="<?php echo htmlentities( $_REQUEST['checkout']['shipping_address']['zip'] ) ?>">
				<?php } ?>
				<input type="submit" id="shopify_built_in_checkout">
			</form>

			<form id="custom_checkout" action="<?php echo SHOPIFY_PROXY_PREFIX ?>/checkout/" method="post">
				<?php if( isset( $_REQUEST['checkout']['email'] ) ) { ?>
				<input type="text" name="checkout[email]" value="<?php echo htmlentities( $_REQUEST['checkout']['email'] ) ?>">
				<input type="text" name="checkout[shipping_address][first_name]" value="<?php echo htmlentities( $_REQUEST['checkout']['shipping_address']['first_name'] ) ?>">
				<input type="text" name="checkout[shipping_address][last_name]" value="<?php echo htmlentities( $_REQUEST['checkout']['shipping_address']['last_name'] ) ?>">
				<input type="text" name="checkout[shipping_address][address1]" value="<?php echo htmlentities( $_REQUEST['checkout']['shipping_address']['address1'] ) ?>">
				<input type="text" name="checkout[shipping_address][address2]" value="<?php echo htmlentities( $_REQUEST['checkout']['shipping_address']['address2'] ) ?>">
				<input type="text" name="checkout[shipping_address][city]" value="<?php echo htmlentities( $_REQUEST['checkout']['shipping_address']['city'] ) ?>">
				<input type="text" name="checkout[shipping_address][country]" value="<?php echo htmlentities( $_REQUEST['checkout']['shipping_address']['country'] ) ?>">
				<input type="text" name="checkout[shipping_address][zip]" value="<?php echo htmlentities( $_REQUEST['checkout']['shipping_address']['zip'] ) ?>">
				<?php } ?>
				<textarea id="cart_data" name="cart" style="display:none"></textarea>
				<input type="hidden" name="funnel_id" value="<?php echo $funnel_id ?>">
				<input type="submit" id="shopify_custom_checkout">
			</form>
		</div>
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
		<input type="hidden" id="full_shop_url" value="<?php echo $full_shop_url ?>">
		<input type="hidden" id="shop_currency" value="<?php echo $shop_currency; ?>">
		<script>
			$( document ).ready(function() {
				$.ajaxSetup({ cache: false });
				<?php 
					if( ( $type == 'custom' ) && ( any_payment_processor_connected( $shop_id ) ) ) { 
				?> 
						custom_checkout(); 
				<?php 
					} else { 
				?> 
						built_in_checkout(); 
				<?php 
					} 
				?>
			});
		</script>
	</body>
</html>
<?php
	}

	function process_copy_abandoned_cart() {
		global $mysqli;
		$create_new_token_from_old_token = $mysqli->query("INSERT INTO carts (shop_id, last_modified, created, funnel_id , token , cart , shopify_order_id , status) SELECT shop_id, last_modified, created, funnel_id , '" . $_REQUEST['new_token'] . "', cart , shopify_order_id , '0' FROM carts WHERE token ='" . $_REQUEST['old_token'] . "' AND (status = 1 OR status = 0)");

		$cart_id = $mysqli->query ("SELECT id FROM carts WHERE token ='" . $_REQUEST['new_token'] . "'");
		$cart_id = $cart_id->fetch_all(MYSQLI_ASSOC);

		$cart_id = $cart_id[0]['id'];
		
		$mysqli->query("INSERT INTO cart_abandoned_status (cart_id , status) VALUES ('$cart_id','1')");

		echo $_REQUEST['new_token'];
	}

	function any_payment_processor_connected( $shop_id ) {
		//paypal keys
		$paypal_api_username = trim( get_shop_meta( $shop_id, 'paypal_api_username' ) );
        $paypal_api_password = trim( get_shop_meta( $shop_id, 'paypal_api_password' ) );
        $paypal_api_signature = trim( get_shop_meta( $shop_id, 'paypal_api_signature' ) );
        if( ( $paypal_api_username != '' ) && ( $paypal_api_password != '' ) && ( $paypal_api_signature != '' ) ) $paypal_connected = true;

        //nmi keys
        $credit_card_processor = get_shop_meta( $shop_id, 'credit_card_processor' );
		if( $credit_card_processor == 'nmi' ) {
			$nmi_username = get_shop_meta( $shop_id, 'nmi_username' );
        	$nmi_password = get_shop_meta( $shop_id, 'nmi_password' );
        	if( ( $nmi_username != '' ) && ( $nmi_password != '' ) ) {
        		$nmi_connected = true;
        	}
		}elseif($credit_card_processor == 'bluesnap'){
			$bluesnap_username = get_shop_meta( $shop_id, 'bluesnap_username' );
        	$bluesnap_password = get_shop_meta( $shop_id, 'bluesnap_password' );
        	if( ( $bluesnap_username != '' ) && ( $bluesnap_password != '' ) ) {
        		$bluesnap_connected = true;
        	}
		}

		$stripe_secret_key = get_shop_meta($shop_id, 'stripe_secret_key');
		if( ( trim( get_shop_meta($shop_id, 'stripe_secret_key') ) != '' ) || ( $paypal_connected != false ) || ( $nmi_connected ) || ( $bluesnap_connected ) ) {
			return true;
		} else return false;
	}

	function next_stage_to_redirect( $shop_id, $next_stage ) {
		global $break, $start;
		$force_ssl = get_shop_meta( $shop_id, 'force_ssl');
		$shop_domain = get_shop_meta( $shop_id, 'shop_domain' );
		$redirect = ( $force_ssl > 0 ? 'https://' : 'http://' ) . $shop_domain . SHOPIFY_PROXY_PREFIX . '/' . $break[ $start + 1 ] . '/' . $break[ $start + 2 ] . '/' . $next_stage . '/' . $break[ $start + 4 ];
		$br = explode( '?', $redirect );
		$redirect = $br[0];
		return $redirect;
	}
?>
