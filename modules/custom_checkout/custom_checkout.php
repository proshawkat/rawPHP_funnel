<?php
	function custom_checkout( $thank_you = false ) {
		global $mysqli, $shop_id, $token, $cart_token;
		require_once( 'includes/shopify.php' );

		/* Check cart token, if status is 2, charge, and if status is 3, leave this cart and redirect to shop or funnel start point */
		$shop_domain = get_shop_meta( $shop_id, 'shop_domain' );
		$shop_country = get_shop_meta( $shop_id, 'shop_country' );
		$shop_currency = get_shop_meta( $shop_id, 'shop_currency' );
		$shop_money_format = get_shop_meta( $shop_id, 'shop_money_format' );
		$shop_name = get_shop_meta( $shop_id, 'shop_name' );
		$shop_tax_shipping = get_shop_meta( $shop_id, 'shop_tax_shipping' );
		$shop_taxes_included = get_shop_meta( $shop_id, 'shop_taxes_included' );
		$shop_county_taxes = get_shop_meta( $shop_id, 'shop_county_taxes' );
		//$facebook_pixel = get_shop_meta( $shop_id, 'facebook_pixel' );
		
		//$facebook_pixel_catalog_id = get_shop_meta( $shop_id, 'facebook_pixel_catalog_id' );
		//$google_analytics = get_shop_meta( $shop_id, 'google_analytics' );
		$shop_favicon = get_shop_meta( $shop_id, 'shop_favicon' );
		if( $shop_favicon == '' ) $shop_favicon = 'https://cdn.shopify.com/s/assets/favicon-4425e7970f1327bc362265f54e8c9c6a4e96385b3987760637977078e28ffe92.png';

		$headerbackground = str_replace( '\"', '"', str_replace( "\'", "'", get_shop_meta( $shop_id, 'headerbackground' ) ) );
		if( $headerbackground == '' ) $headerbackground = '#ffffff';
		$backgroundcolor = str_replace( '\"', '"', str_replace( "\'", "'", get_shop_meta( $shop_id, 'backgroundcolor' ) ) );
		if( $backgroundcolor == '' ) $backgroundcolor = '#ffffff';
		$copyrightcolor = str_replace( '\"', '"', str_replace( "\'", "'", get_shop_meta( $shop_id, 'copyrightcolor' ) ) );
		if( $copyrightcolor == '' ) $copyrightcolor = '#999999';
		$checkouttextcolor = str_replace( '\"', '"', str_replace( "\'", "'", get_shop_meta( $shop_id, 'checkouttextcolor' ) ) );
		if( $checkouttextcolor == '' ) $checkouttextcolor = '#717171';
		$checkoutbuttoncolor = str_replace( '\"', '"', str_replace( "\'", "'", get_shop_meta( $shop_id, 'checkoutbuttoncolor' ) ) );
		$checkoutbuttontextcolor = str_replace( '\"', '"', str_replace( "\'", "'", get_shop_meta( $shop_id, 'checkoutbuttontextcolor' ) ) );
		if( $checkoutbuttontextcolor == '' ) $checkoutbuttontextcolor = '#ffffff';
		if( $checkoutbuttoncolor == '' ) $checkoutbuttoncolor = '#338dbc';
		$checkout_button_style = 'padding: 15px; font-size: 110%; background-color: ' . $checkoutbuttoncolor . '; border-color: ' . $checkoutbuttoncolor . '; color: ' . $checkoutbuttontextcolor . '; background-image: linear-gradient(to bottom,' . $checkoutbuttoncolor . ' 0,' . $checkoutbuttoncolor . ' 100%);';

		$textcolor = str_replace( '\"', '"', str_replace( "\'", "'", get_shop_meta( $shop_id, 'textcolor' ) ) );
		if( $textcolor == '' ) $textcolor = '#000000';

		$display_mode = 'live';

		//check which service is enabled for processing credit card
		$credit_card_processor = get_shop_meta( $shop_id, 'credit_card_processor' );

		//stripe keys
		$stripe_secret_key = get_shop_meta( $shop_id, 'stripe_secret_key' );
		$stripe_publish_key = get_shop_meta( $shop_id, 'stripe_publishable_key' );
		if( $stripe_secret_key != '' ) $stripe_connected = true;

		//nmi keys
		if( $credit_card_processor == 'nmi' ) {
			$nmi_username = get_shop_meta( $shop_id, 'nmi_username' );
        	$nmi_password = get_shop_meta( $shop_id, 'nmi_password' );
        	if( ( $nmi_username != '' ) && ( $nmi_password != '' ) ) {
        		$stripe_connected = true;
        	}
		}elseif( $credit_card_processor == 'bluesnap' ) {
			$bluesnap_username = get_shop_meta( $shop_id, 'bluesnap_username' );
        	$bluesnap_password = get_shop_meta( $shop_id, 'bluesnap_password' );
        	if( ( $bluesnap_username != '' ) && ( $bluesnap_password != '' ) ) {
        		$stripe_connected = true;
        	}
		}

		//paypal keys
		$paypal_api_username = trim( get_shop_meta( $shop_id, 'paypal_api_username' ) );
        $paypal_api_password = trim( get_shop_meta( $shop_id, 'paypal_api_password' ) );
        $paypal_api_signature = trim( get_shop_meta( $shop_id, 'paypal_api_signature' ) );
        if( ( $paypal_api_username != '' ) && ( $paypal_api_password != '' ) && ( $paypal_api_signature != '' ) ) $paypal_connected = true;
		
		if( !$thank_you ) {
			$cart = process_save_cart_data();
			$res = $mysqli->query("SELECT id, funnel_id, status FROM carts WHERE token='$cart_token'");
			$arr = $res->fetch_array( MYSQLI_ASSOC );

			//Check if the cart is already charged
			if( ( isset( $arr['status'] ) && $arr['status'] >= 3 ) || ( $res->num_rows < 1 ) ) {
				if( ( $arr['status'] > 3 ) || ( $res->num_rows < 1 ) ) {
					display_checkout_expiry_message();
				} elseif( $arr['status'] == 3 ) {
					$redirect = redirect_from_checkout( $shop_id, $arr['funnel_id'], $cart_token );
					header('location:' . $redirect );
				}
				die();
			}
		} else {
			global $break, $start;
			$res = $mysqli->query("SELECT funnel_id, status, cart FROM carts WHERE id='" . $break[ $start + 3 ] . "'");
			$arr = $res->fetch_array( MYSQLI_ASSOC );
			$cart = json_decode( $arr['cart'] );
			if( isset( $cart->shipping_details->shop_tax_shipping ) ) $shop_tax_shipping = $cart->shipping_details->shop_tax_shipping;
		}
		
		//get list of available shippable countries
		$ship_everywhere = false;
		$sc = new ShopifyClient($_REQUEST['shop'], $token, SHOPIFY_API_KEY, SHOPIFY_SECRET);
		$countries = $sc->call('GET', '/admin/countries.json' );
		foreach( $countries as $country ) {
			if( $country['code'] == '*' ) {
				$ship_everywhere = true;
				break;
			} else {
				//$provinces = $sc->call('GET', '/admin/countries/' . $country['id'] . '/provinces.json');
			}
		}
		
		$funnel_id = $arr['funnel_id'];
		$fb_pixel_id = get_fb_pixel_id( null, $funnel_id, null );
		$google_analytics_id = get_funnel_meta( $funnel_id, "google_analytics_id" );
		if($google_analytics_id == "") {
			$google_analytics_id = get_shop_meta( $shop_id, "google_analytics_id" );
		}
?>
	<!DOCTYPE html>
	<html>
		<head>
			<title><?php echo $shop_name . ' - Checkout'; ?></title>
			<meta charset="utf-8">
			<meta name="viewport" content="width=device-width,intitial-scale=1.0">
			<link rel="shortcut icon" type="image/x-icon" href="<?php echo $shop_favicon ?>" />
			<link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Lato" />
			<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
			<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">
			<link rel="stylesheet" href="<?php echo BASE ?>/files/css/payment-styles.css?ver=<?php echo SCRIPT_VERSION ?>">
			<?php if( $thank_you != false ) { ?><link rel="stylesheet" href="<?php echo BASE ?>/files/css/thankyou_style.css?ver=<?php echo SCRIPT_VERSION ?>"><?php } ?>
			<link rel="stylesheet" href="<?php echo BASE; ?>/files/css/nprogress.css?ver=<?php echo SCRIPT_VERSION ?>">

			<script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
			<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
			<script src="<?php echo BASE; ?>/files/js/nprogress.js"></script>
			<?php if( isset( $_REQUEST['ref'] ) ) { ?>
			<link rel="stylesheet" href="<?php echo BASE; ?>/files/css/display.css?ver=<?php echo SCRIPT_VERSION ?>">
			<script src="<?php echo BASE; ?>/files/js/jquery.loadingModal.js"></script>
			<?php } ?>
			
			<?php if( ( $stripe_publish_key != '' ) && ( $credit_card_processor != 'nmi' ) && ( $credit_card_processor != 'bluesnap' ) ) { ?>
			<script type="text/javascript" src="https://js.stripe.com/v2/"></script>
			<script type="text/javascript">
			  	Stripe.setPublishableKey('<?php echo $stripe_publish_key ?>');
			</script>
			<?php } ?>
			
			<script>
				var shopify_proxy_prefix = '<?php echo SHOPIFY_PROXY_PREFIX ?>';
				var uuid = '<?php echo $cart_token ?>';
				var shop = '<?php echo $_REQUEST['shop'] ?>';
				var shop_currency = '<?php echo $shop_currency ?>';
				var base = '<?php echo BASE ?>';
				var fb_pixel_exists = false;
			</script>
			<script src="<?php echo BASE; ?>/files/js/fbpixel.js?ver=<?php echo SCRIPT_VERSION ?>"></script>
			<script src="<?php echo BASE ?>/files/js/payment.js?ver=<?php echo SCRIPT_VERSION ?>"></script>
			<script src="<?php echo BASE ?>/files/js/display.js?ver=<?php echo SCRIPT_VERSION ?>"></script>
			<style>
				html * {
					color: <?php echo $textcolor ?>;
				}

				body {
					background-color: <?php echo $backgroundcolor ?>;
				}
			</style>

			<?php if( !isset( $_REQUEST['ref'] ) ) { ?>
			<script>
				$( document ).ready(function() {
					<?php if( $thank_you == false ) { ?>
						$.get("https://api.ipify.org?format=json").done(function( data ) {
							$.get("<?php echo SHOPIFY_PROXY_PREFIX ?>/<?php echo $cart_token ?>/?process=get_geo_data&ip=" + data.ip).done(function( data ) {
								data = JSON.parse( data );
					       		document.getElementById('shipping_country').value = data.countryCode;
					       		reload_country_preferences();
					       	});
						});
					<?php } else { ?>
						reload_country_preferences();
				 	<?php } ?>
					window.addEventListener("resize", function() {
						if( ( window.innerWidth > 768 ) && ( document.getElementById('order_summary').style.display == 'none' ) ) {
							document.getElementById('order_summary').style.display = 'block';
						} else if( ( window.innerWidth <= 768 ) && ( document.getElementById('order_summary').style.display == 'block' ) ) {
							document.getElementById('order_summary').style.display = 'none';
							document.getElementById('show_or_hide').innerHTML = show_order_summary+' <i class="glyphicon glyphicon-chevron-down"></i>';
						}
					});
				});
			</script>
			<?php } ?>
			
			<?php
				if(get_shop_meta($shop_id,"trackify") == "enable"){
					// //echo "trackify enabled";
					$trackify_src = 'https://app.redretarget.com/sapp/pixel?product_ids[]=&store_name='.$shop_domain.'&event_type=';
					echo '<script>'.file_get_contents($trackify_src).'</script>';
					if( $thank_you == false ) {
						echo '<script>fbq_initiate_checkout("Trackify InitiateCheckout")</script>';
						//echo '<script>trigger_fbq_viewcart_event()</script>';
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
						if( $thank_you == false ) {
					?>
							fbq_initiate_checkout('InitiateCheckout');
							trigger_fbq_viewcart_event();
					<?php
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
			?>

			<?php
				if($google_analytics_id != ""){	    ?>
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
							if( $thank_you == false ) {
								echo 'gaee_checkout_step1();';
							}else{
								echo 'gaee_checkout_step4();';
							}
						?>
					</script>
			<?php
				}
				else{	?>
					<script>
						var google_analytics_id_found = false;
					</script>
			<?php	}    ?>
			
		</head>
		<body id="bodycart" style="height: 100%;">
		<?php 
			if( isset( $_REQUEST['ref'] ) ) { 
				$redirecting_checkout_url = get_abandoned_checkout_url( $cart_token );
				$regenerating_cart = array(
					'token' 			=>		$cart->token,
					'items'				=>		array(),
					'shipping_details'	=>		$cart->shipping_details
					);
				foreach( $cart->items as $reg_item ) {
					$regenerating_cart['items'][] = array( 'variant_id' => $reg_item->variant_id, 'quantity' => $reg_item->quantity );
				}
		?>
				<script>
					$('body').loadingModal({text: '<h4 style="color:#333;">We are taking you to secure checkout by Shopify.</h4><h5 style="color:#424242;">Please do not reload or close the tab.</h5>'});
					regenerate_abandoned_cart('<?php echo $cart_token ?>', '<?php echo str_replace( "'", "\'", str_replace( '\"', '', json_encode( $regenerating_cart ) ) ) ?>', '<?php echo $redirecting_checkout_url ?>');
				</script>
			<?php } else { ?>

			<header class="header-checkout" id="paymentheader" style="background-color: <?php echo $headerbackground ?>;">
				<div class="container" style="margin-top: 8px; margin-bottom: 8px;">
					<div class="row">
						<?php 
							$logoremoteurl = get_shop_meta( $shop_id, 'custom_checkout_page_logo' );
							if( $logoremoteurl != '' ){ ?>
								<div class="col-md-12"><div class="text-center">
				            		<a href="https://<?php echo $_REQUEST['shop'] ?>"><img style="max-height: 70px; max-width: 100%;" src="<?php echo $logoremoteurl ?>" alt=""></a></div>
						        </div>
						<?php }
							else{
								echo '<div class="col-md-12"><a class="" href="https://' . $_REQUEST['shop'] . '"><h1 style="text-align: center;">' . $shop_name . '</h1></a></div>';
							}
						?>
				    </div>
					<div class="custom-html-header"></div>
				</div>
			</header>

		
			<form action="#" onsubmit="return validate_payment();" id="payment-form">
				<input type="hidden" id="_is_tax_included" value="<?php echo $shop_taxes_included ?>">
				<input type="hidden" id="_is_shipping_tax_applicable" value="<?php echo $shop_tax_shipping ?>">

				<style>
					html * {
						color: <?php echo $checkouttextcolor ?>;
					}
				</style>

				<?php 
					$checkoutbackground = get_shop_meta( $shop_id, 'checkoutbackground' );
					$msg_array = get_msg_val();
				?>
				
				<div id="header-small-screen">
					<h2><?php echo get_shop_meta($shop_id, 'shop_name'); ?></h2>
				</div>
				<?php
					//404 condition removed
				?>
				    	<div class="row page-row page-row-expanded" id="payment-div">
				    		<div class="col-md-7 col-eq-7 top-grey-border col-md-top" id="left-div" style="background-color: <?php echo $checkoutbackground ?>;">
								<div id="left-div-content">
									<p>&nbsp;</p>
									<?php /* If this is a payment page */ ?>
									<?php if( !$thank_you ) { ?>
									<div id="header-large-screen">
										<h2><?php echo get_shop_meta($shop_id, 'shop_name') ?></h2>
										<p><a href="https://<?php echo $_REQUEST['shop'] ?>/cart"><?php echo $msg_array['cart'] ; ?></a> > <span id="customer_bread" class="breadcrumb_active"><?php echo $msg_array['customer_information'] ; ?></span> > <span id="shipping_bread" class="breadcrumb_inactive"><?php echo $msg_array['shipping_method'] ; ?></span> > <span id="payment_bread" class="breadcrumb_inactive"><?php echo $msg_array['payment_method'] ; ?></span></p>
									</div>

									<div id="edit_shipping_details">
										<?php 
											/* Cart bump features */
											/* Display if cart bump is enabled in the shop */
											$cart_bump_enabled = get_shop_meta( $shop_id, 'cart_bump_enabled' );
											if( $cart_bump_enabled == 'true' ) {
												$cart_bump_headline = get_shop_meta( $shop_id, 'cart_bump_headline' );
												if( $cart_bump_headline == '' ) $cart_bump_headline = 'Select one option';
												$cart_bump_template = get_shop_meta( $shop_id, 'cart_bump_template' );
												if( $cart_bump_template == '' ) $cart_bump_template = 'Add [NUMBER_OF_ITEMS] More [PRODUCT_TITLE] to Your Order! Just pay additional [PRODUCT_TOTAL_PRICE].';
												?>
												<h4 style="margin-top: 30px; font-size: 135%;"><?php echo $cart_bump_headline ?></h4>
												<div id="cart_bump_div"></div>
												<textarea id="cart_bump_template" style="display:none"><?php echo $cart_bump_template; ?></textarea>
												<input type="hidden" id="cart_bump_items" value="<?php echo get_shop_meta( $shop_id, 'cart_bump_items' ); ?>">
												<input type="hidden" id="shop_money_format" value="<?php echo $shop_money_format; ?>">
												<input type="hidden" id="funnel_id" value="<?php echo $funnel_id; ?>">

												<script>generate_cart_bump();</script>

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
												<?php
											}

											//If comes from shipping form
											if( isset( $_REQUEST['checkout'] ) ) {
												$cart->shipping_details->email = $_REQUEST['checkout']['email'];
												$cart->shipping_details->first_name = $_REQUEST['checkout']['shipping_address']['first_name'];
												$cart->shipping_details->last_name = $_REQUEST['checkout']['shipping_address']['last_name'];
												$cart->shipping_details->address = $_REQUEST['checkout']['shipping_address']['address1'];
												$cart->shipping_details->city = $_REQUEST['checkout']['shipping_address']['city'];
												$cart->shipping_details->country = $_REQUEST['checkout']['shipping_address']['country'];
												$cart->shipping_details->zip = $_REQUEST['checkout']['shipping_address']['zip'];
											}
										?>

										<h4 style="margin-top: 30px; font-size: 135%;"><?php echo $msg_array['customer_information'] ; ?></h4>
										<div class="row">
											<div class="col-md-12 form-group">
										    	<input type="email" class="billing_form_input_style form-control" name="email" id="email" placeholder="<?php echo $msg_array['default_email_placeholder'] ; ?>" value="<?php echo ( isset( $cart->shipping_details ) && isset( $cart->shipping_details->email ) ? $cart->shipping_details->email : '' ) ?>">
										    	<p class="error_warning hide" id="error_email"><?php echo $msg_array['error_shipping_form_email'] ; ?></p>
										    </div>
										</div>
									
										<h4 style="margin-top: 25px; font-size: 135%;"><?php echo $msg_array['shipping_information'] ; ?></h4>
										<div class="row">
											<div class="form-group col-md-6"> 
										    	<input type="text" class="billing_form_input_style form-control" name="shipping_first_name" id="shipping_first_name" placeholder="<?php echo $msg_array['default_first_name_placeholder'] ; ?>" value="<?php echo ( isset( $cart->shipping_details ) && isset( $cart->shipping_details->first_name ) ? $cart->shipping_details->first_name : '' ) ?>">
										  	</div>
											<div class="form-group col-md-6">
										    	<input type="text" class="billing_form_input_style form-control" name="shipping_last_name" id="shipping_last_name" placeholder="<?php echo $msg_array['default_last_name_placeholder'] ; ?>" value="<?php echo ( isset( $cart->shipping_details ) && isset( $cart->shipping_details->last_name ) ? $cart->shipping_details->last_name : '' ) ?>">
										    	<p class="error_warning hide" id="error_shipping_last_name"><?php echo $msg_array['error_shipping_last_name'] ; ?></p>
										  	</div>
										</div>

										<div class="row">
											<div class="form-group col-md-8">
										    	<input type="text" class="billing_form_input_style form-control" name="shipping_address" id="shipping_address" placeholder="<?php echo $msg_array['default_address_placeholder'] ; ?>" value="<?php echo ( isset( $cart->shipping_details ) && isset( $cart->shipping_details->address ) ? $cart->shipping_details->address : '' ) ?>">
										    	<p class="error_warning hide" id="error_shipping_address"><?php echo $msg_array['error_shipping_address'] ; ?></p>
										  	</div>
											<div class="form-group col-md-4">
										    	<input type="text" class="billing_form_input_style form-control" name="shipping_apt" id="shipping_apt" placeholder="<?php echo $msg_array['default_apt_placeholder'] ; ?>" value="<?php echo ( isset( $cart->shipping_details ) && isset( $cart->shipping_details->apt ) ? $cart->shipping_details->apt : '' ) ?>">
										  	</div>
										</div>
										<div class="row">
											<div class="col-md-12 form-group">
										    	<input type="text" class="billing_form_input_style form-control" name="shipping_city" id="shipping_city" placeholder="<?php echo $msg_array['default_city_placeholder'] ; ?>" value="<?php echo ( isset( $cart->shipping_details ) && isset( $cart->shipping_details->city ) ? $cart->shipping_details->city : '' ) ?>">
										    	<p class="error_warning hide" id="error_shipping_city"><?php echo $msg_array['error_shipping_city'] ; ?></p>
										  	</div>
										</div>
										<div class="row">
											<div class="form-group col-md-6" id="shipping_country_code_div">
												<select class="billing_form_input_style form-control" name="shipping_country" id="shipping_country" onchange="reload_country_preferences()">
											  		<option value="">Select Country</option>
											  		<?php shipping_country_options(( isset( $cart->shipping_details ) && isset( $cart->shipping_details->country ) ? $cart->shipping_details->country : '' )) ?>
												</select>
												<p class="error_warning hide" id="error_shipping_country"><?php echo $msg_array['error_shipping_country'] ; ?></p>
											</div>

											<input type="hidden" id="shipping_province_data" value="<?php echo ( isset( $cart->shipping_details ) && isset( $cart->shipping_details->province ) ? $cart->shipping_details->province : '' ) ?>">
											<div class="form-group col-md-4" id="shipping_province_div" style="display:none">
												<input type="text" class="billing_form_input_style form-control" name="shipping_province" id="shipping_province" placeholder="Province" value="<?php echo ( isset( $cart->shipping_details ) && isset( $cart->shipping_details->province ) ? $cart->shipping_details->province : '' ) ?>">
											</div>
											<div class="form-group col-md-6" id="shipping_postal_code_div">
										    	<input type="text" class="billing_form_input_style form-control" name="shipping_postal_code" id="shipping_postal_code" placeholder="<?php echo $msg_array['default_postal_code_placeholder'] ; ?>" value="<?php echo ( isset( $cart->shipping_details ) && isset( $cart->shipping_details->postal_code ) ? $cart->shipping_details->postal_code : '' ) ?>">
										    	<p class="error_warning hide" id="error_shipping_postal_code"><?php echo $msg_array['error_shipping_postal_code'] ; ?></p>
											</div>
										</div>

										<div class="row text-left" style="margin-top: 10px;">
											<div class="col-xs-12">
												<p class="color-grey">
													<input type="checkbox" id="remember_me" name="remember_me"> 
													&nbsp; 
													<?php echo $msg_array['save_this_information_for_next_time'];?>
												</p>
											</div>
										</div>

										<div class="row text-left hide" style="margin-top: 10px;">
											<div class="col-xs-12">
												<p class="color-grey">By continuing, I agree that my information will be transferred to the United States.</p>
											</div>
										</div>

										<div class="row payment-button-div" style="padding-top: 10px">
											<div class="col-md-6 the-return-div">
											   	<h4>
											   		<a href="https://<?php echo $_REQUEST['shop'] ?>/cart" class="return-cart-link"><i class="glyphicon glyphicon-chevron-left return-cart-link"></i> <?php echo $msg_array['return_to_cart'] ; ?></a>
											   	</h4>
											</div>
											<div class="col-md-6 text-right the-button-div">
											  	<button type="button" class="btn payment-button" style="<?php echo $checkout_button_style ?>" onclick="validate_payment()"><?php echo $msg_array['continue_to_shipping_method'] ; ?></button>
											</div>
										</div>
									</div>

									<div id="shipping_details_text_div" style="display:none">
										<h4 style="margin-top: 35px; font-size: 135%;">
											<?php echo $msg_array['customer_information'] ; ?>
										</h4>
										<div id="shipping_details_text" class="color-grey" style="line-height: 1.8;"></div>
										<a href="#" onclick="edit_shipping_details(); return false;" class="edit-link-small"><?php echo $msg_array['edit_shipping_address'] ; ?></a>

										<h4 style="margin-top: 35px; font-size: 135%;"><?php echo $msg_array['shipping_method'] ; ?></h4>
										<div id="shipping_method_choices"></div>
									</div>
								
									<div id="edit_billing_details" style="display:none">

										<h4 style="margin-top: 35px; font-size: 135%;"><?php echo $msg_array['payment_method'] ; ?></h4>
										<p class="color-grey"><?php echo $msg_array['card_details_msg'] ; ?></p>

										
										<div class="alert alert-danger" id="payment_error" style="display:none"></div>

										<ul class="list-group" style="margin-top: 35px; margin-bottom: 20px;">
											<?php /*Stripe payment gateway*/ ?>
										  	<?php if( $stripe_connected != false ) { ?>
										  	<li class="list-group-item">
										  		<h4 style="font-size: 135%;">
										  			<span style="<?php echo ( $paypal_connected != false ? '' : 'display:none;' ) ?>">
										  				<input name="payment_method" id="payment_method_cradit_card_radio" value="credit_card" onchange="custom_payment_method_selection(this)" checked="true" type="radio">
										  			</span>
										  			<label for="payment_method_cradit_card_radio" style="cursor: pointer;">
										  				&nbsp;
										  				Credit card
										  			</label>
										  		</h4>
										  	</li>
										  	<li class="list-group-item" id="payment_method_credit_card" style="background-color: #fafafa">
												<div class="row">
													<div class="form-group col-md-12">
														  <input type="text" id="card_number" class="billing_form_input_style form-control" placeholder="<?php echo $msg_array['default_credit_card_placeholder'] ; ?>" aria-describedby="basic-addon1" data-stripe="number" value="">
														  <p class="error_warning hide" id="error_card_number">The card number is not a valid credit card number.</p>
													</div>
												</div>

												<div class="row">
													<div class="form-group col-md-4">
														<input type="text" id="card_exp_month" class="billing_form_input_style form-control" placeholder="<?php echo $msg_array['default_exp_month_placeholder'] ; ?>" aria-describedby="basic-addon1" data-stripe="exp_month" value="">
														<p class="error_warning hide" id="error_card_exp_month">The expiry date is not valid.</p>
													</div>

													<div class="form-group col-md-4">
														<input type="text" id="card_exp_year" class="billing_form_input_style form-control" placeholder="<?php echo $msg_array['default_exp_year_placeholder'] ; ?>" aria-describedby="basic-addon1" data-stripe="exp_year" value="">
														<p class="error_warning hide" id="error_card_exp_year">The expiry date is not valid.</p>
													</div>

													<div class="form-group col-md-4">
														<input type="text" id="card_cvv" class="billing_form_input_style form-control" placeholder="<?php echo $msg_array['default_cvv_placeholder'] ; ?>" aria-describedby="basic-addon1" data-stripe="cvc" value="">
														<p class="error_warning hide" id="error_card_cvv">The cvv code is not valid.</p>
													</div>
												</div>
											</li>
											<?php } ?>

											<?php /*Paypal selector*/ ?>
											<?php if( $paypal_connected != false ) { ?>
											<li class="list-group-item">
										  		<h4 style="font-size: 135%;">
										  			<span style="<?php echo ( $stripe_connected != false ? '' : 'display:none;' ) ?>">
										  				<input name="payment_method" id="payment_method_paypal_radio" value="paypal" onchange="custom_payment_method_selection(this)" type="radio">
										  			</span>
										  			<label for="payment_method_paypal_radio" style="cursor: pointer;">
										  				&nbsp;
										  				<img src="https://cdn.shopify.com/s/assets/checkout/offsite-gateway-logos/paypal@2x-2cabd13111981089fdf7f9faee0ef21550690cd2d380dede9fb7bc8c1253b3c6.png" style="height: 24px;">
										  			</label>
										  		</h4>
										  	</li>
										  	<li class="list-group-item" id="payment_method_paypal" style="background-color: rgb(250, 250, 250); display: <?php echo ( $stripe_connected != false ? 'none' : 'block' ) ?>;">
												<div class="row">
													<div class="form-group col-md-12">
			  											<div style="max-width:400px; margin: 0px auto; text-align:center;">
			    											<div style="background-image: url(https://cdn.shopify.com/s/assets/checkout/offsite-908d79d8d532f6af67d7cc99244ede733729c29379c349ee015fbcea71fd8274.svg);/*! height: 260px; */ background-repeat: no-repeat; background-position: center;height: 120px;"></div>
			    											<p>After clicking "Complete order", you will be redirected to PayPal to complete your purchase securely.</p>
			  											</div>
													</div>
												</div>
											</li>
											<?php } ?>
										</ul>
										
										<h4 style="margin-top: 25px; margin-bottom: 15px; font-size: 135%;"><?php echo $msg_array['billing_information'] ; ?></h4>

										<ul class="list-group">
										  	<li class="list-group-item">
										  		<input type="radio" name="same_as_shipping" id="same_as_shipping_true" onclick="enable_billing_address()" CHECKED="">
										  		<?php echo $msg_array['same_as_shipping_address'] ; ?>
										  	</li>
										  	<li class="list-group-item">
										  		<input type="radio" name="same_as_shipping" id="same_as_shipping_false" onclick="enable_billing_address()" <?php echo ( isset( $cart->billing_details ) && isset( $cart->billing_details->same_as_shipping ) && ( $cart->billing_details->same_as_shipping == 'false' ) ? 'CHECKED=""' : '' ) ?>>
										  		<?php echo $msg_array['use_a_different_billing_address'] ; ?>

										  		<div id="billing_address_form" style="<?php echo ( isset( $cart->billing_details ) && isset( $cart->billing_details->same_as_shipping ) && ( $cart->billing_details->same_as_shipping == 'false' ) ? '' : 'display:none' ) ?>; margin-top: 15px;">
													<div class="row">
														 <div class="form-group col-md-6">
														    <label for="billing_first_name" class="hide">First name</label>
														    <input type="text" class="billing_form_input_style form-control" id="billing_first_name" placeholder="<?php echo $msg_array['default_first_name_placeholder'] ; ?>" value="<?php echo ( isset( $cart->billing_details ) && isset( $cart->billing_details->first_name ) ? $cart->billing_details->first_name : '' ) ?>">
														  </div>
													
														 <div class="form-group col-md-6">
														    <label for="billing_last_name" class="hide">Last name</label>
														    <input type="text" class="billing_form_input_style form-control" id="billing_last_name" placeholder="<?php echo $msg_array['default_last_name_placeholder'] ; ?>" value="<?php echo ( isset( $cart->billing_details ) && isset( $cart->billing_details->last_name ) ? $cart->billing_details->last_name : '' ) ?>">
														    <p class="error_warning hide" id="error_billing_last_name"><?php echo $msg_array['error_shipping_last_name'] ; ?></p>
														  </div>
													</div>
													<div class="row">
														 <div class="form-group col-md-8">
														    <label for="billing_address" class="hide">Address</label>
														    <input type="text" class="billing_form_input_style form-control" id="billing_address" placeholder="<?php echo $msg_array['default_address_placeholder'] ; ?>" value="<?php echo ( isset( $cart->billing_details ) && isset( $cart->billing_details->address ) ? $cart->billing_details->address : '' ) ?>">
															<p class="error_warning hide" id="error_billing_address"><?php echo $msg_array['error_shipping_address'] ; ?></p>
														  </div>

														  <div class="form-group col-md-4">
													    	<input type="text" class="billing_form_input_style form-control" name="billing_apt" id="billing_apt" placeholder="<?php echo $msg_array['default_apt_placeholder'] ; ?>" value="<?php echo ( isset( $cart->billing_details ) && isset( $cart->billing_details->apt ) ? $cart->billing_details->apt : '' ) ?>">
													  	</div>
													</div>
													
													<div class="row">
														 <div class="form-group col-md-12">
														    <label for="billing_city" class="hide">City</label>
														    <input type="text" class="billing_form_input_style form-control" id="billing_city" placeholder="<?php echo $msg_array['default_city_placeholder'] ; ?>" value="<?php echo ( isset( $cart->billing_details ) && isset( $cart->billing_details->city ) ? $cart->billing_details->city : '' ) ?>">
														    <p class="error_warning hide" id="error_billing_city"><?php echo $msg_array['error_shipping_city'] ; ?></p>
														  </div>
													</div>

													<div class="row">
														<div class="form-group col-md-6" id="billing_country_code_div">
															<label for="billing_country" class="hide">Country</label>
															<select class="billing_form_input_style form-control" id="billing_country" onchange="populate_billing_province(this.value)">
																<option value="">Select Country</option>
															  	<?php shipping_country_options(( isset( $cart->billing_details ) && isset( $cart->billing_details->country ) ? $cart->billing_details->country : '' ), true) ?>
															</select>
															<p class="error_warning hide" id="error_billing_country"><?php echo $msg_array['error_shipping_country'] ; ?></p>
														</div>
														
														<input type="hidden" id="billing_province_data" value="<?php echo ( isset( $cart->billing_details ) && isset( $cart->billing_details->province ) ? $cart->billing_details->province : '' ) ?>">
														<div class="form-group col-md-4" id="billing_province_div" style="display:none">
															<input type="text" class="billing_form_input_style form-control" name="billing_province" id="billing_province" placeholder="Province" value="<?php echo ( isset( $cart->billing_details ) && isset( $cart->billing_details->province ) ? $cart->billing_details->province : '' ) ?>">
														</div>
													
														 <div class="form-group col-md-6" id="billing_postal_code_div">
														    <label for="billing_postal_code" class="hide">Postal code</label>
														    <input type="text" class="billing_form_input_style form-control" id="billing_postal_code" placeholder="<?php echo $msg_array['default_postal_code_placeholder'] ; ?>" value="<?php echo ( isset( $cart->billing_details ) && isset( $cart->billing_details->postal_code ) ? $cart->billing_details->postal_code : '' ) ?>">
														    <p class="error_warning hide" id="error_billing_postal_code"><?php echo $msg_array['error_shipping_postal_code'] ; ?></p>
														  </div>
													</div>
													<div class="row hide">
														 <div class="form-group col-md-12">
														    <label for="billing_phone" class="hide">Phone</label>
														    <input type="text" class="billing_form_input_style form-control" id="billing_phone" placeholder="<?php echo $msg_array['default_phone_placeholder'] ; ?>Phone" value="<?php echo ( isset( $cart->billing_details ) && isset( $cart->billing_details->phone ) ? $cart->billing_details->phone : '' ) ?>">
														  </div>
													</div>
												</div>
										  	</li>
										</ul>

										<?php
											$subscribecustomer = get_shop_meta( $shop_id, 'subscribecustomer' ); 
								    		if( $subscribecustomer == '' ) $subscribecustomer = 'on';
								    	?>

										<div class="form-group">
											<label class="color-grey">
												<input type="checkbox" id="subscribe_customer" <?php echo ( isset( $cart->billing_details ) && isset( $cart->billing_details->subscribe_customer ) && ( $cart->billing_details->subscribe_customer == 'true' ) ? 'CHECKED=""' : ( $subscribecustomer == 'on' ? 'CHECKED=""' : '' ) ) ?> >
												<span class="color-grey"><?php echo $msg_array['subscribe_to_our_newsletter'] ; ?></span>
											</label>
										</div>
									</div>

									<div id="no_shipping_zone_error" style="display:none; margin-top: 25px; margin-bottom: 35px;">
										Sorry, we didn’t find your address valid. Go back and check if the country, state and zip code is accurate to continue.
									</div>

									<div class="row payment-button-div" id="shipping_method_commands" style="display:none; margin-bottom: 35px;">
										<div class="col-md-6 the-return-div">
											<h4>
									    		<a href="#" onclick="edit_shipping_details(); return false;" class="return-cart-link"><i class="glyphicon glyphicon-chevron-left return-cart-link"></i> <?php echo $msg_array['return_to_customer_information'] ; ?></a>
									    	</h4>
										</div>
										<div class="col-md-6 text-right the-button-div" id="shipping_method_continue_button" style="display:none;">
										  	<button type="button" class="btn payment-button" style="<?php echo $checkout_button_style ?>" onclick="initiate_payment();"><?php echo $msg_array['continue_to_payment_method'] ; ?></button>
										</div>
									</div>

									<div class="row payment-button-div" id="payment_method_commands" style="display:none; margin-bottom: 35px;">
										<div class="col-md-6 the-return-div">
											<h4>
									    		<a href="#" onclick="select_shipping_method(); return false;" class="return-cart-link"><i class="glyphicon glyphicon-chevron-left return-cart-link"></i> <?php echo $msg_array['return_to_shipping_method'] ; ?></a>
									    	</h4>
										</div>
										<div class="col-md-6 text-right the-button-div">
										  	<button type="button" class="btn payment-button" style="<?php echo $checkout_button_style ?>" onclick="validate_payment();"><?php echo $msg_array['complete_order'] ; ?></button>
										</div>
									</div>
									<?php } else { process_say_thanks( $cart, $arr['status'], $funnel_id ); } ?>
									<div style="margin: 10px;">&nbsp;</div>
								</div>
							</div>

							<?php $ordersummarybackground = get_shop_meta( $shop_id, 'ordersummarybackground' ); ?>
							<div class="col-md-5 col-eq-5 col-md-middle top-grey-border" id="right-div" style="background-color: <?php echo $ordersummarybackground ?>;">
								<div id="right-div-content">
									<div id="order_summary_command">
										<div class="row">
											<div class="col-xs-8 text-left">
												<h4>
													<a href="#" id="order-display-commander" onclick="toggle_order_summary(); return false;">
														<i class="glyphicon glyphicon-shopping-cart"></i>
														<span id="show_or_hide"><?php echo $msg_array['show_order_summary'] ; ?> <i class="glyphicon glyphicon-chevron-down"></i></span>
													</a>
												</h4>
											</div>
											<div class="col-xs-4 text-right">
												<h4 id="summary_grand_total" class="text-right">
												<?php echo format_money( '<span id="order_summary_grand_total">' . ( isset( $subtotal ) ? number_format($subtotal, 2, '.', '') : 0 ) . '</span>', $shop_money_format ); ?>
												</h4>
											</div>
										</div>
									</div>

									<div id="order_summary">
										<table class="order_summary">
											<tr><th width="10%"></th><th width="35%"></th><th width="35%"></th><th width="20%"></tr>

											<?php if( isset( $cart ) && isset( $cart->items ) && ( count( $cart->items ) > 0 ) ) { ?>
												<?php foreach( $cart->items as $item ) { ?>
													<tr>
														<td>
															<div class="image-minimum-width">

																<div class="product__image">
																    <div class="product-thumbnail">
																  		<div class="product-thumbnail__wrapper">
																    			<img alt="<?php echo $item->title ?>" class="product-thumbnail__image" src="<?php echo $item->image ?>">
																  		</div>
																    	<span class="product-thumbnail__quantity" aria-hidden="true"><?php echo $item->quantity ?></span>
																	</div>
																</div>
															</div>
														</td>
														<td colspan="2" align="left">
															<strong><?php echo $item->product_title ?></strong>
															<p class="color-more-grey">
															<?php
																$variant_details = '';
																foreach( $item->variant_options as $option ) { 
																	$variant_details .= ( $variant_details != '' ? ' / ' : '' ) . $option;
																}
																echo $variant_details;
															?>
															</p>
														</td>
														<td align="right" width="40%">
															<?php echo format_money( number_format( ( $item->price / 100 * $item->quantity ), 2, '.', '' ), $shop_money_format ); ?>
														</td>
													</tr>
													<?php
														if( !isset( $subtotal ) ) $subtotal = 0;
														$subtotal += number_format( ( $item->price / 100 * $item->quantity ), 2, '.', '' );
													?>
												<?php } ?>
											<?php } ?>
										
											<tr class="top-grey-border">
												<td colspan="2" align="left">
													<h5 class="color-more-grey"><?php echo $msg_array['cart_subtotal'] ; ?></h5>
												</td>
												<td align="right" colspan="2">
													<input type="hidden" id="init_subtotal_amount_" value="<?php echo $subtotal ?>">
													<?php echo format_money( ( isset( $subtotal ) ? number_format( $subtotal, 2, '.', '' ) : 0 ), $shop_money_format ); ?>
												</td>
											</tr>
											<tr>
												<?php 
													$shipping_cost = 0;
													if( isset( $cart->shipping_details ) && isset( $cart->shipping_details->shipping_option ) ) {
														$shipping_cost = $cart->shipping_details->shipping_options[ $cart->shipping_details->shipping_option ]->price;
													}
												?>
												<td colspan="2" align="left">
													<h5 class="color-more-grey"><?php echo $msg_array['cart_shipping'] ; ?></h5>
													<input type="hidden" id="saved_shipping_cost" value="<?php echo $shipping_cost ?>">
												</td>
												<td id="shipping_total" align="right" colspan="2">
													<?php if( $shipping_cost > 0 ) {
														echo format_money( $shipping_cost, $shop_money_format );
													} else { ?>--<?php } ?>
												</td>
											</tr>
											<tr style="<?php echo ( $shop_taxes_included != false ? 'display: none' : '' ) ?>">
												<td colspan="2" align="left">
													<h5 class="color-more-grey"><?php echo $msg_array['cart_taxes'] ; ?></h5>
												</td>
												<td align="right" colspan="2">
													<?php echo format_money( '<span id="tax_total">' . number_format(0, 2, '.', '') . '</span>', $shop_money_format ); ?>
												</td>
											</tr>

											<tr class="top-grey-border">
												<td colspan="2" align="left">
													<h4><?php echo $msg_array['cart_total'] ; ?></h4>
													<?php echo ( $shop_taxes_included != false ? '<span class="color-more-grey">'.$msg_array['cart_tax_prefix'].' '. format_money( '<span id="included_tax_amount" class="color-more-grey">' . ( isset( $subtotal ) ? number_format(0, 2, '.', '') : 0 ) . '</span>', $shop_money_format ) .' '.$msg_array['cart_tax_suffix'].'</span>' : '' ) ?>
												</td>
												<td align="right" colspan="2">
													<h5 class="summary-amount text-right"><span class="color-grey" style="font-size: 80%"><?php echo $shop_currency ?></span> <span style="font-size: 140%; font-weight: 2000;"><?php echo format_money( '<span id="grand_total">' . ( isset( $subtotal ) ? number_format($subtotal, 2, '.', '') : 0 ) . '</span>', $shop_money_format ); ?></span></h5>
												</td>
											</tr>
										</table>
									</div>
								</div>
								<?php
									if($arr['status'] == 5){
										$payment_error_msg = get_shop_meta($shop_id,'payment_error_msg');
										if($payment_error_msg == ""){
											$payment_error_msg = 'Payment was unsuccessful. Your credit card was not charged.';
										}
								?>
								<div class="alert alert-danger payment_failed_msg"><?php echo $payment_error_msg; ?></div>
								<?php
									}
								?>
							</div>
						</div>
				
						<div class="row page-row" style="height:0;" id="payment-div-footer">
			                <div class="col-md-7 col-eq-7 col-md-top" style="background-color: <?php echo $checkoutbackground ?>;">
			                    <div id="left-div-content">
			                        <div style="margin: 10px;">&nbsp;</div>
			                            <hr style="margin: 0px">
			                        <div class="payment_footer">
			                            <p style="color:#eb2121 ; font-size: 0.85714em; margin-top: 5px;">All rights reserved <?php echo $shop_name ?></p>                        
			                        </div>
			                    </div>
			                </div>
			                <div class="col-md-5 col-eq-5 col-md-middle" id="payment-footer-right-div" style="background-color: <?php echo $ordersummarybackground ?>;">
			                </div>
			            </div>

			</form>

			<div id="supplement_product_display"></div>

			<div class="loading" id="loading_graphics">Loading&#8230;</div>
			
			<input type="hidden" id="shop_currency" value="<?php echo $shop_currency; ?>">
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
			<textarea id="translator_settings" style="display:none"><?php echo json_encode(get_msg_val()); ?></textarea>
			<input type="hidden" id="credit_card_processor" value="<?php echo get_shop_meta( $shop_id, 'credit_card_processor' ); ?>">

			<?php if( isset( $recycle_variants ) && ( $recycle_variants != '' ) ) { ?>
			<script>
				//recycle products into the cart
				document.getElementById('loading_graphics').style.display = 'block';
				jQuery.post(
	                '/cart/clear.js', 
	                {}
	            );

				setTimeout( function() {
					<?php 
						$br = explode( ',', $recycle_variants );
						foreach( $br as $brs ) {
							$bbr = explode( '_', $brs );
							?>
							jQuery.post(
		                        '/cart/add.js', 
		                        {
		                            quantity: <?php echo $bbr[1] ?>, 
		                            id: <?php echo $bbr[0] ?>
		                        }
		                    );
		                    <?php
						}
					?>

					document.getElementById('loading_graphics').style.display = 'none';
				}, 500 );
			</script>
			<?php } ?>
		<?php } ?>
		</body>
	</html>
	<?php
	}

	function shipping_country_options( $value = '', $ignore = true ) {
		global $countries, $ship_everywhere;
		if( ( $ship_everywhere == false ) && ( $ignore == false ) ) {
			foreach( $countries as $country ) {
				echo '<option value="' . $country['code'] . '">' . $country['name'] . '</option>';
			}
		} else {
			$countries_array = country_array();

			foreach( $countries_array as $carr ) {
				echo '<option data-code="' . $carr['data-code'] . '" value="' . $carr['data-code'] . '" ' . ( $carr['data-code'] == $value ? 'SELECTED="" ' : '' ) . '>' . $carr['value'] . '</option>';
			}
		}
	}

	function country_array( $country_code = '' ) {
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

	function process_save_shipping_info() {
		global $shop_id, $token, $cart_token, $mysqli;
		include_once( 'includes/shopify.php' );
		$shop_country = get_shop_meta( $shop_id, 'shop_country' );
		$shop_province = get_shop_meta( $shop_id, 'shop_province' );
		$shop_zip = get_shop_meta( $shop_id, 'shop_zip' );
		$enable_region_tax = get_shop_meta( $shop_id, 'enable_region_tax' );
		$shop_tax_shipping = get_shop_meta( $shop_id, 'shop_tax_shipping' );
		$shop_taxes_included = get_shop_meta( $shop_id, 'shop_taxes_included' );
		$shop_money_format = get_shop_meta( $shop_id, 'shop_money_format' );
		$shop_locations = get_shop_meta( $shop_id, 'shop_locations' );

		$rest_of_the_world_tax = 0;
		$sc = new ShopifyClient($_REQUEST['shop'], $token, SHOPIFY_API_KEY, SHOPIFY_SECRET);
		$countries = $sc->call('GET', '/admin/countries.json' );

		foreach( $countries as $country ) {
			if( $country['code'] == '*' ) {
				$ship_everywhere = true;
				$rest_of_the_world_tax = $country['tax'];
				$rest_of_the_world_tax_title = $country['tax_name'];
			} elseif( $country['code'] == $_REQUEST['shipping_country'] ) {
				$applicable_tax = $country['tax'];
				$applicable_tax_title = $country['tax_name'];

				if( $shop_province == $_REQUEST['shipping_province'] ) {
					$provinces = $sc->call('GET', '/admin/countries/' . $country['id'] . '/provinces.json');
					foreach( $provinces as $province ) {
						if( $province['name'] == $_REQUEST['shipping_province'] ) {
							if( $province['tax_type'] == 'compounded' ) {
								//do nothing, we do not support compounded tax for now
							} else {
								$applicable_province_tax = $province['tax'];
								$applicable_province_tax_title = $province['tax_name'];

								if( $province['tax_type'] == 'harmonized' ) {
									//calculate state tax instead of country/federal tax
									$applicable_tax = 0;
								}
							}
						}
					}
				}
			}
		}

		if( !isset( $applicable_tax ) ) {
			$applicable_tax = $rest_of_the_world_tax;
			$applicable_tax_title = $rest_of_the_world_tax_title;
		}

		//regional tax using third party api
		if( ( $enable_region_tax == 'enabled' ) && ( $shop_country == 'US' ) && ( $_REQUEST['shipping_country'] == 'US' ) ) {

			//find the nearest shop from the customer
			if( $shop_locations != '' ) {
				$shop_locations = json_decode( $shop_locations, true );
				foreach( $shop_locations as $location ) {
					if( ( $_REQUEST['shipping_country'] == $location['country'] ) && ( $_REQUEST['shipping_province'] == $location['province'] ) ) {
						$shop_province = $location['province'];
						$shop_zip = $location['zip'];
						if( $_REQUEST['shipping_postal_code'] == $shop_zip ) {
							break;
						}
					}
				}
			}

			$regional_taxes = taxjar_regional_tax( $shop_zip, $shop_province, $_REQUEST['shipping_postal_code'], $_REQUEST['shipping_province'], $applicable_tax );
			$applicable_tax = $regional_taxes['applicable_tax'];
			$province_tax = $regional_taxes['province_tax'];
			$applicable_province_tax = $province_tax['tax'];
			$applicable_province_tax_title = $province_tax['tax_name'];
		}

		$shipping_options = json_decode( str_replace( '\"', '"', $_REQUEST['shipping_options'] ) );
		
		$shipping_details = array(
				'email' 			=>	$_REQUEST['email'],
				'first_name'		=>	$_REQUEST['shipping_first_name'],
				'last_name'			=>	$_REQUEST['shipping_last_name'],
				'phone'				=>	$_REQUEST['shipping_ph_no'],
				'address'			=>	$_REQUEST['shipping_address'],
				'apt'				=>	$_REQUEST['shipping_apt'],
				'city'				=>	$_REQUEST['shipping_city'],
				'country'			=>	$_REQUEST['shipping_country'],
				'province'			=>	$_REQUEST['shipping_province'],
				'postal_code'		=>	$_REQUEST['shipping_postal_code'],
				'tax_rate'			=>	$applicable_tax,
				'tax_title'			=>	$applicable_tax_title,
				'shipping_options'	=>	$shipping_options,
				'shipping_option'	=>	( isset( $cart->shipping_details ) && isset( $cart->shipping_details->shipping_option ) ? $cart->shipping_details->shipping_option : ( isset( $_REQUEST['shipping_option'] ) ? $_REQUEST['shipping_option'] : 0 ) )
			);

		if( isset( $applicable_province_tax ) ) {
			$shipping_details['province_tax_rate'] = $applicable_province_tax;
			$shipping_details['province_tax_title'] = $applicable_province_tax_title;
			//for calculation purpose
			$applicable_tax += $applicable_province_tax;
		}

		//save in the database
		$res = $mysqli->query("SELECT id, cart, status FROM carts WHERE token='$cart_token' AND shop_id='$shop_id'");
		$arr = $res->fetch_array( MYSQLI_ASSOC );
		$cart = json_decode( $arr['cart'] );
		
		$cart->shipping_details = $shipping_details;
		$mysqli->query("UPDATE carts SET cart='" . $mysqli->real_escape_string( json_encode( $cart ) ) . "', status='1' WHERE id='" . $arr['id'] . "'");

		
		//get shipping cost
		if( $shipping_options != null ) {
			$shipping_cost = $shipping_options[0]->price;
		}
		
		if( isset( $_REQUEST['shipping_cost'] ) ) $shipping_cost = $_REQUEST['shipping_cost'];
		elseif( isset( $_REQUEST['shipping_option'] ) ) $shipping_cost = $shipping_options[ $_REQUEST['shipping_option'] ]->price;

		//check if shop requires tax from shipping cost too
		if( $shop_taxes_included != false ) {
			$total_tax = 0;
			$included_tax = ( ( $applicable_tax * ( $cart->total_price / 100 ) ) / ( 1 + $applicable_tax ) );
			if( $shop_tax_shipping != false ) $included_tax += ( ( $applicable_tax * $shipping_cost ) / ( 1 + $applicable_tax ) );
		} else {
			$total_tax = ( ( $cart->total_price / 100 ) * $applicable_tax );
			if( $shop_tax_shipping != false ) $total_tax += ( $shipping_cost * $applicable_tax );
		}

		$total_price = ( ( $cart->total_price / 100 ) + $total_tax + $shipping_cost );

		$ret = array(
				'tax_included'				=> ( $shop_taxes_included != false ? 'true' : 'false' ),
				'total_tax'					=>	number_format( $total_tax, 2, '.', '' ),
				'included_tax'				=>  number_format( ( isset( $included_tax ) ? $included_tax : 0 ), 2, '.', '' ),
				'shipping_cost'				=>	number_format( ( isset( $shipping_cost ) ? $shipping_cost : 0 ), 2 ),
				'formatted_shipping_cost' 	=> 	format_money( number_format( ( isset( $shipping_cost ) ? $shipping_cost : 0 ), 2 ), $shop_money_format ),
				'total_price'				=> 	number_format( $total_price, 2, '.', '' ),
				'shipping_option'			=>	$shipping_details['shipping_option']
			);

		/* Klaviyo start checkout event
		** triggers only if the request is from default checkout 
		** and shipping info is saved for the first time
		*/
		if( $arr['status'] < 1 ) {
			trigger_klaviyo_events( $shop_id, $cart_token, $_REQUEST['email'], $_REQUEST['shipping_first_name'], $_REQUEST['shipping_last_name'], $total_price, 'Started Checkout' );
		}

		//Return result
		if( isset( $_REQUEST['embed'] ) ) {
			if( isset( $_REQUEST['token'] ) || isset( $_REQUEST['customer_vault_id'] ) || isset( $_REQUEST['vaulted_shopper_id'] ) ) process_save_billing_info();
			else process_initiate_paypal_transaction();
		} else echo json_encode( $ret );
	}

	//update cart total cost when customer change shipping option
	function process_update_shipping_info() {
		global $mysqli, $shop_id, $cart_token;

		$shop_tax_shipping = get_shop_meta( $shop_id, 'shop_tax_shipping' );
		$shop_taxes_included = get_shop_meta( $shop_id, 'shop_taxes_included' );
		
		$res = $mysqli->query("SELECT id, cart FROM carts WHERE token='$cart_token' AND shop_id='$shop_id'");
		$arr = $res->fetch_array( MYSQLI_ASSOC );
		$cart = json_decode( $arr['cart'] );
		$shipping_details = $cart->shipping_details;
		$shipping_details->shipping_option = $_REQUEST['shipping_option'];
		$cart->shipping_details = $shipping_details;
		$mysqli->query("UPDATE carts SET cart='" . $mysqli->real_escape_string( json_encode( $cart ) ) . "', status='2' WHERE id='" . $arr['id'] . "'");

		//get shipping cost
		$shipping_cost = $shipping_details->shipping_options[ $_REQUEST['shipping_option'] ]->price;
		$applicable_tax = $shipping_details->tax_rate;
		if( isset( $shipping_details->province_tax_rate ) ) $applicable_tax += $shipping_details->province_tax_rate;

		//check if shop requires tax from shipping cost too
		if( $shop_taxes_included != false ) {
			$total_tax = 0;
			$included_tax = ( ( $applicable_tax * ( $cart->total_price / 100 ) ) / ( 1 + $applicable_tax ) );
			if( $shop_tax_shipping != false ) $included_tax += ( ( $applicable_tax * $shipping_cost ) / ( 1 + $applicable_tax ) );
		} else {
			$total_tax = ( ( $cart->total_price / 100 ) * $applicable_tax );
			if( $shop_tax_shipping != false ) $total_tax += ( $shipping_cost * $applicable_tax );
		}

		$total_price = ( ( $cart->total_price / 100 ) + $total_tax + $shipping_cost );

		$ret = array(
				'tax_included'		=>  ( $shop_taxes_included != false ? 'true' : 'false' ),
				'total_tax'			=>	number_format( $total_tax, 2, '.', '' ),
				'included_tax'		=>  number_format( ( isset( $included_tax ) ? $included_tax : 0 ), 2, '.', '' ),
				'shipping_cost'		=>	number_format( ( isset( $shipping_cost ) ? $shipping_cost : 0 ), 2 ),
				'total_price'		=> 	number_format( $total_price, 2, '.', '' ),
				'shipping_option'	=>	$_REQUEST['shipping_option']
			);
		echo json_encode( $ret );
	}

	function process_save_billing_info() {
		global $shop_id, $token, $cart_token, $mysqli;
		require_once('includes/stripe-php/init.php');

		$stripe_secret_key = get_shop_meta( $shop_id, 'stripe_secret_key' );
		$res = $mysqli->query("SELECT id, funnel_id, cart FROM carts WHERE token='$cart_token' AND shop_id='$shop_id'");
		$arr = $res->fetch_array( MYSQLI_ASSOC );
		$cart = json_decode( $arr['cart'] );

		$billing_details = array(
				'same_as_shipping'		=> 	$_REQUEST['same_as_shipping'],
				'first_name' 			=> 	$_REQUEST['billing_first_name'],
				'last_name'				=>	$_REQUEST['billing_last_name'],
				'address'				=>	$_REQUEST['billing_address'],
				'apt'					=>	$_REQUEST['billing_apt'],
				'city'					=>	$_REQUEST['billing_city'],
				'country'				=>	$_REQUEST['billing_country'],
				'postal_code'			=>	$_REQUEST['billing_postal_code'],
				'province'				=>	$_REQUEST['billing_province'],
				'subscribe_customer'	=>	$_REQUEST['subscribe_customer']
			);

		if( !isset( $_REQUEST['stripe'] ) ) {
			//create customer
			\Stripe\Stripe::setApiKey($stripe_secret_key);
			$customer = \Stripe\Customer::create( array( 'source' => $_REQUEST['token'] ) );
			$billing_details['token'] = $_REQUEST['token'];
			$billing_details['customer_id'] = $customer['id'];
		} else {
			if( ( $_REQUEST['stripe'] == 'false' ) && ( isset( $_REQUEST['customer_vault_id'] ) ) ) {
				$billing_details['customer_vault_id'] = $_REQUEST['customer_vault_id'];
				$_REQUEST['token'] = 1;
			} elseif( ( $_REQUEST['stripe'] == 'false' ) && ( isset( $_REQUEST['vaulted_shopper_id'] ) ) ) {
				$billing_details['vaulted_shopper_id'] = $_REQUEST['vaulted_shopper_id'];
				$_REQUEST['token'] = 1;
			}
		}
		
		$cart->billing_details = $billing_details;

		$mysqli->query("UPDATE carts SET cart='" . $mysqli->real_escape_string( json_encode( $cart ) ) . "', status='3' WHERE id='" . $arr['id'] . "'");

		if( $_REQUEST['token'] != '' ) {
			$redirect = redirect_from_checkout( $shop_id, $arr['funnel_id'], $cart_token );
			echo $redirect;
			/*echo 'Card is ready to charge<br>';
			echo 'Redirect to the funnel<br>';
			echo 'Funnel should display thank you or other product pages as upsell<br>';
			echo 'Every time product is added to cart, it should save cart information on carts<br>';*/
		} else echo "error";
	}

	//every time a product is added from the funnel, it will update the cart
	function process_save_cart_data() {
		global $mysqli, $shop_id, $token, $cart_token;
		if( isset( $_REQUEST['cart'] ) ) {
			$cart = json_decode( $_REQUEST['cart'] );
			$res = $mysqli->query("SELECT id, funnel_id, cart, status FROM carts WHERE token='$cart_token'");
			if( $res->num_rows > 0 ) {
				$arr = $res->fetch_array( MYSQLI_ASSOC );
				if( $arr->status <= 3 ) {
					$old_cart = json_decode( $arr['cart'] );
					if( isset( $old_cart->shipping_details ) ) $cart->shipping_details = $old_cart->shipping_details;
					if( isset( $old_cart->billing_details ) ) $cart->billing_details = $old_cart->billing_details;
					$mysqli->query("UPDATE carts SET cart='" . $mysqli->real_escape_string( json_encode( $cart ) ) . "', last_modified='" . date("Y-m-d H:i:s") . "', funnel_id='" . $_REQUEST['funnel_id'] . "' WHERE id='" . $arr['id'] . "'");
				}
			} else {
				$mysqli->query("INSERT INTO carts ( shop_id, created, last_modified, funnel_id, token, cart ) VALUES ( '$shop_id', '" . date("Y-m-d H:i:s") . "', '" . date('Y-m-d H:i:s') . "', '" . $_REQUEST['funnel_id'] . "', '$cart_token', '" . $mysqli->real_escape_string( $_REQUEST['cart'] ) . "' )");
			}
			//update/insert cart data to database
		} elseif( $cart_token != '' ) {
			$res = $mysqli->query("SELECT cart, funnel_id, status FROM carts WHERE token='$cart_token'");
			$arr = $res->fetch_array( MYSQLI_ASSOC );
			$cart = json_decode( $arr['cart'] );
		}

		//if call coming from embedded checkout form
		//save shipping method and other info
		if( isset( $_REQUEST['embed'] ) ) {
			//call function to save 
			process_save_shipping_info();
		}

		if( isset( $_REQUEST['ajax'] ) ) {
			echo json_encode( $cart );
			die();
		} else return $cart;
	}

	function recycle_variants_text( $cart ) {
		$variant_ids = '';
		foreach( $cart->items as $item ) {
    		$variant_ids .= ( $variant_ids != '' ? ',' : '' ) . $item->variant_id . '_' . $item->quantity;
    	}
    	return $variant_ids;
	}

	function process_fetch_tax_and_province() {
		global $token, $shop_id;
		include_once( 'includes/shopify.php' );
		$shop_country = get_shop_meta( $shop_id, 'shop_country' );
		$shop_province = get_shop_meta( $shop_id, 'shop_province' );
		$shop_zip = get_shop_meta( $shop_id, 'shop_zip' );
		$shop_taxes_included = get_shop_meta( $shop_id, 'shop_taxes_included' );
		$shop_tax_shipping = get_shop_meta( $shop_id, 'shop_tax_shipping' );
		$enable_region_tax = get_shop_meta( $shop_id, 'enable_region_tax' );
		$countrylist = json_decode( file_get_contents( 'files/countrylist.json' ), true );
		$shop_locations = get_shop_meta( $shop_id, 'shop_locations' );

		$rest_of_the_world_tax = 0;
		$sc = new ShopifyClient($_REQUEST['shop'], $token, SHOPIFY_API_KEY, SHOPIFY_SECRET);
		$countries = $sc->call('GET', '/admin/countries.json' );

		foreach( $countries as $country ) {
			if( $country['code'] == '*' ) {
				$ship_everywhere = true;
				$rest_of_the_world_tax = $country['tax'];
				$rest_of_the_world_tax_title = $country['tax_name'];
			}
			elseif( $country['code'] == $_REQUEST['shipping_country'] ) {
				$applicable_tax = $country['tax'];
				$applicable_tax_title = $country['tax_name'];

				//get province tax
				if( $shop_province == $_REQUEST['shipping_province'] ) {
					$provinces = $sc->call('GET', '/admin/countries/' . $country['id'] . '/provinces.json' );
					if( count( $provinces ) > 0 ) {
						foreach( $provinces as $province ) {
							if( $province['name'] == $_REQUEST['shipping_province'] ) $province_tax = array( 'tax' => $province['tax'], 'tax_name' => $province['tax_name'], 'tax_type' => $province['tax_type'] );
						}
					}
				}
			}
		}

		if( !isset( $applicable_tax ) ) $applicable_tax = $rest_of_the_world_tax;

		if( isset( $countrylist[ $_REQUEST['shipping_country'] ] ) ) $provincelist = $countrylist[ $_REQUEST['shipping_country'] ];
		else $provincelist = array();

		if( ( $enable_region_tax == 'enabled' ) && ( $shop_country == 'US' ) && ( $_REQUEST['shipping_country'] == 'US' ) ) {
			//find the nearest shop from the customer
			if( $shop_locations != '' ) {
				$shop_locations = json_decode( $shop_locations, true );
				foreach( $shop_locations as $location ) {
					if( ( $_REQUEST['shipping_country'] == $location['country'] ) && ( $_REQUEST['shipping_province'] == $location['province'] ) ) {
						$shop_province = $location['province'];
						$shop_zip = $location['zip'];
						if( $_REQUEST['shipping_postal_code'] == $shop_zip ) {
							break;
						}
					}
				}
			}

			$regional_taxes = taxjar_regional_tax( $shop_zip, $shop_province, $_REQUEST['shipping_postal_code'], $_REQUEST['shipping_province'], $applicable_tax );
			$applicable_tax = $regional_taxes['applicable_tax'];
			$province_tax = $regional_taxes['province_tax'];
		}

		$ret = array( 'tax' => $applicable_tax, 'provinces' => $provincelist, 'tax_included' => ( $shop_taxes_included != false ? 'true' : 'false' ), 'tax_on_shipping' => ( $shop_tax_shipping != false ? 'true' : 'false' ), 'province_tax' => $province_tax );
		echo json_encode( $ret );
	}

	function process_fetch_billing_province() {
		$countrylist = json_decode( file_get_contents( 'files/countrylist.json' ), true );
		$rest_of_the_world_tax = 0;
		if( isset( $countrylist[ $_REQUEST['billing_country'] ] ) ) $provincelist = $countrylist[ $_REQUEST['billing_country'] ];
		else $provincelist = array();

		$ret = array( 'tax' => '', 'provinces' => $provincelist );
		echo json_encode( $ret );
	}

	function process_get_geo_data() {
		echo file_get_contents( "http://ip-api.com/json/" . $_REQUEST['ip'] );
	}

	function process_complete_the_transaction() {
		complete_an_order( $_REQUEST['cart_token'] );
	}

	function process_complete_transaction() {
		global $mysqli;
		//time of 5 min ago
		$fiveminago = date( 'Y-m-d H:i:s', mktime(date('H'), ( date('i') - 10 ), date('s'), date('n'), date('j'), date('Y') ) );

		$res = $mysqli->query("SELECT id, shop_id FROM orders WHERE date < '$fiveminago' AND status<1 AND order_id=''");
		while( $row = $res->fetch_array( MYSQLI_ASSOC ) ) {

			$cart = json_decode( str_replace( '\"', '"', str_replace( "\'", "'", get_order_meta( $row['id'], 'cart' ) ) ) );

			if( isset( $cart->billing_details ) ) {
				if( isset( $cart->billing_details->token ) && ( $cart->billing_details->token != '' ) && isset( $cart->billing_details->customer_id ) && ( $cart->billing_details->customer_id != '' ) ) {
					complete_an_order( $row['id'] );
				}
			}
		}
	}

	function complete_an_order( $cart_token ) {
        global $mysqli, $shop_id;
        require_once 'includes/shopify.php';
        require_once('includes/stripe-php/init.php');
		require_once ('includes/nmi_lib/nmiDirectPost.class.php');

        $shop = $mysqli->query("SELECT shops.id, shops.shop, shops.token, carts.cart FROM shops, carts WHERE carts.shop_id=shops.id AND carts.token='$cart_token'");
        $arr = $shop->fetch_array( MYSQLI_ASSOC );
        $shop_id = $arr['id'];
        $shop = $arr['shop'];
        $token = $arr['token'];
        $shop_country = get_shop_meta( $shop_id, 'shop_country' );
        $shop_currency = get_shop_meta( $shop_id, 'shop_currency' );
        $shop_name = get_shop_meta( $shop_id, 'shop_name' );
        $shop_tax_shipping = get_shop_meta( $shop_id, 'shop_tax_shipping' );
        $shop_taxes_included = get_shop_meta( $shop_id, 'shop_taxes_included' );
        $shop_county_taxes = get_shop_meta( $shop_id, 'shop_county_taxes' );
        $stripe_secret_key = get_shop_meta( $shop_id, 'stripe_secret_key' );
        $stripe_publish_key = get_shop_meta( $shop_id, 'stripe_publishable_key' );

        //nmi keys
		$nmi_username = get_shop_meta( $shop_id, 'nmi_username' );
        $nmi_password = get_shop_meta( $shop_id, 'nmi_password' );
        
        $cart = json_decode( $arr['cart'], true );
        $shipping_cost = 0;
        $total_price = 0;
        $taxable_price = 0;
        $total_tax = 0;

        $shopify_order['email'] = $cart['shipping_details']['email'];
        $shopify_order['line_items'] = $cart['items'];
        $shopify_order['send_receipt'] = 'true';

        //if tax included, deduct tax from product price, then add it as tax

        //in the cart, prices are in cents (smallest unit), convert into currency
        for( $i = 0; $i < count( $shopify_order['line_items'] ); $i++ ) {
            $shopify_order['line_items'][ $i ]['price'] = number_format( ( $shopify_order['line_items'][ $i ]['price'] / 100 ), 2, '.', '' );
            $shopify_order['line_items'][ $i ]['line_price'] = number_format( ( $shopify_order['line_items'][ $i ]['line_price'] / 100 ), 2, '.', '' );
            $shopify_order['line_items'][ $i ]['original_line_price'] = number_format( ( $shopify_order['line_items'][ $i ]['original_line_price'] / 100 ), 2, '.', '' );

            if( isset( $shopify_order['line_items'][$i]['properties'] ) && isset( $shopify_order['line_items'][$i]['properties']['discount'] ) && ( $shopify_order['line_items'][$i]['properties']['discount'] > 0 ) ) {
                $shopify_order['line_items'][$i]['total_discount'] = ( $shopify_order['line_items'][$i]['price'] * $shopify_order['line_items'][$i]['properties']['discount'] / 100 );
                $shopify_order['line_items'][ $i ]['price'] = $shopify_order['line_items'][ $i ]['price'] - $shopify_order['line_items'][ $i ]['total_discount'];

                if( isset( $shopify_order['line_items'][$i]['properties']['roundup'] ) && ( $shopify_order['line_items'][$i]['properties']['roundup'] == 'zero' || $shopify_order['line_items'][$i]['properties']['roundup'] == '.50' || $shopify_order['line_items'][$i]['properties']['roundup'] == '.95' ) ) {
                    $prev_item_price = $shopify_order['line_items'][ $i ]['price'];
                    $prev_item_discount = $shopify_order['line_items'][$i]['total_discount'];

                    if( $shopify_order['line_items'][$i]['properties']['roundup'] == 'zero' ) {
                        $shopify_order['line_items'][ $i ]['price'] = ceil( $shopify_order['line_items'][ $i ]['price'] );
                    } elseif( $shopify_order['line_items'][$i]['properties']['roundup'] == '.50' || $shopify_order['line_items'][$i]['properties']['roundup'] == '.95' ) {
                        $shopify_order['line_items'][ $i ]['price'] = ( floor( $shopify_order['line_items'][ $i ]['price'] ) + (float) $shopify_order['line_items'][$i]['properties']['roundup'] );
                    }
                    $shopify_order['line_items'][$i]['total_discount'] = $shopify_order['line_items'][$i]['total_discount'] - ( $shopify_order['line_items'][ $i ]['price'] - $prev_item_price );
                }
            }

            //deduct tax from the price if tax is included
            if( $shop_taxes_included != false ) {
                //calculate included tax for single item
                $included_taxes = calculate_included_taxes( $cart, $shopify_order['line_items'][ $i ]['price'] );

                //sum included tax for all items
                if( !isset( $included_tax ) ) $included_tax = ( $included_taxes['tax'] * $shopify_order['line_items'][ $i ]['quantity'] );
                else $included_tax += ( $included_taxes['tax'] * $shopify_order['line_items'][ $i ]['quantity'] );

                //sum included province tax for all items
                if( !isset( $included_province_tax ) ) $included_province_tax = ( $included_taxes['province_tax'] * $shopify_order['line_items'][ $i ]['quantity'] );
                else $included_province_tax += ( $included_taxes['province_tax'] * $shopify_order['line_items'][ $i ]['quantity'] );

                //update line item price after deducting the included tax of single product
                $shopify_order['line_items'][ $i ]['price'] = ( $shopify_order['line_items'][ $i ]['price'] - $included_taxes['total_tax'] );
            }

            //add price into total price
            $total_price += ( $shopify_order['line_items'][ $i ]['price'] * $shopify_order['line_items'][ $i ]['quantity'] );
        }

        if( isset( $cart['shipping_details'] ) && ( $cart['shipping_details']['shipping_options'] ) && ( count( $cart['shipping_details']['shipping_options'] ) > 0 ) && isset( $cart['shipping_details']['shipping_option'] ) ) {
            
            $shipping_line = $cart['shipping_details']['shipping_options'][ $cart['shipping_details']['shipping_option'] ];

            //if shipping cost is taxable and tax is included
            if( ( $shop_tax_shipping != false ) && ( $shop_taxes_included != false ) ) {
                $included_taxes = calculate_included_taxes( $cart, $shipping_line['price'] );

                if( !isset( $included_tax ) ) $included_tax = $included_taxes['tax'];
                else $included_tax += $included_taxes['tax'];

                if( !isset( $included_province_tax ) ) $included_province_tax = $included_taxes['province_tax'];
                else $included_province_tax += $included_taxes['province_tax'];

                //deduct tax from the actual shipping cost
                $shipping_line['price'] = ( $shipping_line['price'] - $included_taxes['total_tax'] );
            }

            $shopify_order['shipping_lines'][] = array(
                    'code'      =>  $shipping_line['code'],
                    'title'     =>  $shipping_line['name'],
                    'price'     =>  $shipping_line['price']
                );

            $shipping_cost += $shipping_line['price'];
        }

        $taxable_price = $total_price;
        if( ( $shop_tax_shipping != false ) && ( $shop_taxes_included == false ) ) $taxable_price += $shipping_cost;

        if( $shop_taxes_included == false ) {
            if( isset( $cart['shipping_details']['tax_rate'] ) ) {
                $tax = ( $taxable_price * $cart['shipping_details']['tax_rate'] );
                $total_tax += $tax;
                $shopify_order['tax_lines'][] = array( 'price' => number_format( $tax, 2, '.', '' ), 'rate' => $cart['shipping_details']['tax_rate'], 'title' => $cart['shipping_details']['tax_title'] );
            }

            if( isset( $cart['shipping_details']['province_tax_rate'] ) ) {
                $tax = ( $taxable_price * $cart['shipping_details']['province_tax_rate'] );
                $total_tax += $tax;
                $shopify_order['tax_lines'][] = array( 'price' => number_format( $tax, 2, '.', '' ), 'rate' => $cart['shipping_details']['province_tax_rate'], 'title' => $cart['shipping_details']['province_tax_title'] );
            }
        } else {
            //deduct product price total from total amount paid and save as tax
            if( isset( $cart['shipping_details']['tax_rate'] ) ) {
                $shopify_order['tax_lines'][] = array( 'price' => number_format( $included_tax, 2, '.', '' ), 'rate' => $cart['shipping_details']['tax_rate'], 'title' => $cart['shipping_details']['tax_title'] );
            }

            if( isset( $cart['shipping_details']['province_tax_rate'] ) ) {
                $shopify_order['tax_lines'][] = array( 'price' => number_format( $included_province_tax, 2, '.', '' ), 'rate' => $cart['shipping_details']['province_tax_rate'], 'title' => $cart['shipping_details']['province_tax_title'] );
            }

            $total_tax = $included_tax + $included_province_tax;
        }

        $shopify_order['total_tax'] = number_format( $total_tax, 2, '.', '' );

        $shopify_order['shipping_address'] = array(
                'first_name'        =>  ( isset( $cart['shipping_details']['first_name'] ) ? $cart['shipping_details']['first_name'] : '' ),
                'last_name'         =>  ( isset( $cart['shipping_details']['last_name'] ) ? $cart['shipping_details']['last_name'] : '' ),
                'address1'          =>  ( isset( $cart['shipping_details']['address'] ) ? $cart['shipping_details']['address'] : '' ),
                'address2'          =>  ( isset( $cart['shipping_details']['apt'] ) ? $cart['shipping_details']['apt'] : '' ),
                'phone'             =>  ( isset( $cart['shipping_details']['phone'] ) ? $cart['shipping_details']['phone'] : '' ),
                'city'              =>  ( isset( $cart['shipping_details']['city'] ) ? $cart['shipping_details']['city'] : '' ),
                'province'          =>  ( isset( $cart['shipping_details']['province'] ) ? $cart['shipping_details']['province'] : '' ),
                'country'           =>  ( isset( $cart['shipping_details']['country'] ) ? $cart['shipping_details']['country'] : '' ),
                'zip'               =>  ( isset( $cart['shipping_details']['postal_code'] ) ? $cart['shipping_details']['postal_code'] : '' )
            );

        if( $cart['billing_details']['same_as_shipping'] != 'false' ) $shopify_order['billing_address'] = $shopify_order['shipping_address'];
        else {
            $shopify_order['billing_address'] = array(
                'first_name'        =>  ( isset( $cart['billing_details']['first_name'] ) ? $cart['billing_details']['first_name'] : '' ),
                'last_name'         =>  ( isset( $cart['billing_details']['last_name'] ) ? $cart['billing_details']['last_name'] : '' ),
                'address1'          =>  ( isset( $cart['billing_details']['address'] ) ? $cart['billing_details']['address'] : '' ),
                'address2'          => ( isset( $cart['billing_details']['apt'] ) ? $cart['billing_details']['apt'] : '' ),
                'city'              =>  ( isset( $cart['billing_details']['city'] ) ? $cart['billing_details']['city'] : '' ),
                'province'          =>  ( isset( $cart['billing_details']['province'] ) ? $cart['billing_details']['province'] : '' ),
                'country_code'           =>  ( isset( $cart['billing_details']['country'] ) ? $cart['billing_details']['country'] : '' ),
                'zip'               =>  ( isset( $cart['billing_details']['postal_code'] ) ? $cart['billing_details']['postal_code'] : '' )
            );
        }

        //subscribe the customer
        if( isset( $cart['billing_details']['subscribe_customer'] ) ) {
            $shopify_order['customer'] = array(
                'email'             =>  $shopify_order['email'],
                'first_name'        =>  $shopify_order['billing_address']['first_name'],
                'last_name'         =>  $shopify_order['billing_address']['last_name']
            );
        }

        $total_price = number_format( ( $total_price + $shipping_cost + $total_tax ), 2, '.', '' ) * 100;
        $cart['billing_details']['total_paid'] = $total_price;
        $cart['shipping_details']['shop_tax_shipping'] = $shop_tax_shipping;

        if( isset( $cart['billing_details'] ) && ( isset( $cart['billing_details']['customer_id'] ) || isset( $cart['billing_details']['paypal_payer_id'] ) || isset( $cart['billing_details']['customer_vault_id'] ) || isset( $cart['billing_details']['vaulted_shopper_id'] ) ) && !isset( $cart['billing_details']['paid'] ) ) {
            //process stripe payment
            if( isset( $cart['billing_details']['customer_id'] ) ) {
	            \Stripe\Stripe::setApiKey($stripe_secret_key);
	            try {
	            	//form meta data using billing details
	            	$metadata = array(
		            	'first_name'        =>  ( $cart['billing_details']['same_as_shipping'] == 'false' ? $cart['billing_details']['first_name'] : $cart['shipping_details']['first_name'] ),
		                'last_name'         =>  ( $cart['billing_details']['same_as_shipping'] == 'false' ? $cart['billing_details']['last_name'] : $cart['shipping_details']['last_name'] ),
		                'address1'          =>  ( $cart['billing_details']['same_as_shipping'] == 'false' ? $cart['billing_details']['address'] : $cart['shipping_details']['address'] ),
		                'address2'          => ( $cart['billing_details']['same_as_shipping'] == 'false' ? $cart['billing_details']['apt'] : $cart['shipping_details']['apt'] ),
		                'city'              =>  ( $cart['billing_details']['same_as_shipping'] == 'false' ? $cart['billing_details']['city'] : $cart['shipping_details']['city'] ),
		                'province'          =>  ( $cart['billing_details']['same_as_shipping'] == 'false' ? $cart['billing_details']['province'] : $cart['shipping_details']['province'] ),
		                'country_code'           =>  ( $cart['billing_details']['same_as_shipping'] == 'false' ? $cart['billing_details']['country'] : $cart['shipping_details']['country'] ),
		                'zip'               =>  ( $cart['billing_details']['same_as_shipping'] == 'false' ? $cart['billing_details']['postal_code'] : $cart['shipping_details']['postal_code'] )
		            );

	    			$charge = \Stripe\Charge::create( array('customer' => $cart['billing_details']['customer_id'], 'currency' => $shop_currency, 'amount' => $total_price, 'description' => $cart['shipping_details']['email'], 'metadata' => $metadata ) );
	    			$gateway = 'Stripe';
	    			$charge_receipt = array( 'stripe_transaction_id' => $charge->id );
				} catch (Exception $e) {
	    			$charge = array( 'status' => 'failed' );
	    			$charge = json_decode( json_encode( $charge ) );
				}
			} elseif( isset( $cart['billing_details']['paypal_payer_id'] ) ) {
				//Format the other parameters that were stored in the session from the previous call
				$paypal_token 		= urlencode( $cart['billing_details']['paypal_token'] );
				$paymentType 		= "Sale";
				$currencyCodeType 	= urlencode( $shop_currency );
				$payerID 			= urlencode($cart['billing_details']['paypal_payer_id']);
				$FinalPaymentAmt	= ( $total_price / 100 );

				$nvpstr  = '&TOKEN=' . $paypal_token . '&PAYERID=' . $payerID . '&PAYMENTREQUEST_0_PAYMENTACTION=' . $paymentType . '&PAYMENTREQUEST_0_AMT=' . $FinalPaymentAmt;
				$nvpstr .= '&PAYMENTREQUEST_0_CURRENCYCODE=' . $currencyCodeType . '&IPADDRESS=' . $_SERVER['SERVER_ADDR'];

				$resArray = hash_call( "DoExpressCheckoutPayment", $nvpstr, $shop_id, $cart_token );
				if( strtolower( $resArray["ACK"] ) == 'success' ) {
					$charge = array( 'status' => 'succeeded' );
					$charge = json_decode( json_encode( $charge ) );
					$charge_receipt = array( 'paypal_transaction_id' => $resArray["PAYMENTINFO_0_TRANSACTIONID"] );
					$gateway = 'Paypal';
				}
			} elseif( isset( $cart['billing_details']['customer_vault_id'] ) ) {
				$transaction = new nmiDirectPost( NMI_URL, $nmi_username, $nmi_password );
				$transaction->sale();
				$result = $transaction->exe( ( $total_price / 100 ), $cart['billing_details']['customer_vault_id']);
				if( $result['response'] == "1" ) {
					$gateway = 'Network Merchant (NMI)';
					$charge = array( 'status' => 'succeeded' );
					$charge = json_decode( json_encode( $charge ) );
	    			$charge_receipt = array( 'transaction_id' => $result['transactionid'] );
				}
			}elseif( isset( $cart['billing_details']['vaulted_shopper_id'] ) ) {
				$result = process_bluesnap_charge_from_vault( ( $total_price / 100 ), $cart['billing_details']['vaulted_shopper_id']);
				$result = json_decode($result, true);
				if(isset($result['transactionId'])){
					$gateway = 'Bluesnap';
					$charge = array( 'status' => 'succeeded' );
					$charge = json_decode( json_encode( $charge ) );
	    			$charge_receipt = array( 'transaction_id' => $result['transactionId'] );
				}else{
				}


			}

            if( $charge->status == 'succeeded' ) {
            	$cart['billing_details']['paid'] = 'true';
                $mysqli->query("UPDATE carts SET cart='" . $mysqli->real_escape_string( json_encode( $cart ) ) . "', status=4 WHERE token='$cart_token' AND shop_id='$shop_id'");

                //send data to the store
                $shopify_order['transactions'][] = array(
                	'kind'      =>  'sale',
                    'gateway'	=>	$gateway,
                    'status'    =>  'success',
                    'amount'    =>  number_format( ( $total_price / 100 ), 2, '.', '' ),
                    'receipt'	=>	$charge_receipt
                );

                //put order into store
                $sc = new ShopifyClient($shop, $token, SHOPIFY_API_KEY, SHOPIFY_SECRET);
                
                try{
                    $new_order = $sc->call('POST', '/admin/orders.json', array( 'order' => $shopify_order ) );
                } catch(ShopifyApiException $e){
                    /*echo '<pre>';
                        var_dump( $e );
                    echo '</pre>';*/
                }

                $final_cart_token = $cart_token . '_' . date("Y-m-d_H:i:s");
                $mysqli->query("UPDATE carts SET token='" . $final_cart_token . "', shopify_order_id='" . $new_order['id'] . "' WHERE shop_id='$shop_id' AND token='$cart_token'");

                /* Trigger klaviyo complete order event if payment is successful */
                trigger_klaviyo_events( $shop_id, $final_cart_token, $cart['shipping_details']['email'], $cart['shipping_details']['first_name'], $cart['shipping_details']['last_name'], ( $total_price / 100 ), 'Finished Checkout', $new_order['id'] );

                //return message to http calls
                if( !isset( $_REQUEST['process'] ) ) {
                    //do nothing
                } else echo 'success';
            } else {
            	$final_cart_token = $cart_token . '_' . date("Y-m-d_H:i:s");
                $mysqli->query("UPDATE carts SET token='" . $final_cart_token . "', status='5' WHERE shop_id='$shop_id' AND token='$cart_token'");
            	echo 'failed';
            }
        }
    }

    function calculate_included_taxes( $cart, $taxable_price ) {
        $deduct = 0;
        if( isset( $cart['shipping_details']['tax_rate'] ) ) {
            $tax = number_format( ( ( $taxable_price * $cart['shipping_details']['tax_rate'] ) / ( 1 + $cart['shipping_details']['tax_rate'] ) ), 2, '.', '' );
            $deduct += $tax;
        }

        if( isset( $cart['shipping_details']['province_tax_rate'] ) ) {
            $province_tax = number_format( ( ( $taxable_price * $cart['shipping_details']['province_tax_rate'] ) / ( 1 + $cart['shipping_details']['province_tax_rate'] ) ), 2, '.', '');
            $deduct += $province_tax;
        }

        $ret = array(
                'tax'           => ( isset( $tax ) ? $tax : 0 ),
                'province_tax'  => ( isset( $province_tax ) ? $province_tax : 0 ),
                'total_tax'     => $deduct
            );
        return $ret;
    }

    function redirect_from_checkout( $shop_id, $funnel_id, $cart_token, $stage = false ) {
    	global $mysqli;
    	$force_ssl = get_shop_meta( $shop_id, 'force_ssl');
		$shop_domain = get_shop_meta( $shop_id, 'shop_domain' );
		$res = $mysqli->query("SELECT id FROM carts WHERE token='$cart_token' ORDER BY id DESC LIMIT 1");
		$arr = $res->fetch_array( MYSQLI_ASSOC );

		if( $funnel_id == 0 ) {
			$redirect = ( $force_ssl > 0 ? 'https://' : 'http://' ) . $shop_domain . SHOPIFY_PROXY_PREFIX . '/checkout/' . $cart_token . '/' . $arr['id'] . '/thank_you/';
		} elseif( isset( $_REQUEST['embed'] ) ) {
			$redirect = $_REQUEST['referrer'] . '/?go=left&cart_token=' . $cart_token;
		} else {
			$funnel = json_decode( str_replace( '\"', '"', str_replace( "\'", "'", get_funnel_meta( $funnel_id, 'funnel_code' ) ) ), true );
			for( $i = 0; $i < count( $funnel ); $i++ ) {
				$funnel_stage = $funnel[ $i ];
				if( $funnel_stage['type'] == 'checkout' ) {
					$post_checkout_stage = $funnel_stage['child']['left'];
				} elseif( $funnel_stage['type'] == 'thank_you' ) {
					$thank_you_stage = $i;
				}
			}

			if( isset( $post_checkout_stage ) && $post_checkout_stage > 0 ) $next_stage = $post_checkout_stage;
			elseif( isset( $thank_you_stage ) && $thank_you_stage > 0 ) $next_stage = $thank_you_stage;

			//Post checkout stage is the stage the request coming from
			if( ( $stage != false ) && ( $next_stage <= $stage ) ) unset( $next_stage ); 

			if( isset( $next_stage ) && $next_stage > 0 && $funnel[ $next_stage ]['type'] != 'thank_you' ) $redirect = ( $force_ssl > 0 ? 'https://' : 'http://' ) . $shop_domain . SHOPIFY_PROXY_PREFIX . '/f/' . $funnel_id . '/' . $next_stage . '/' . get_funnel_meta( $funnel_id, 'url_handle' );
			else $redirect = ( $force_ssl > 0 ? 'https://' : 'http://' ) . $shop_domain . SHOPIFY_PROXY_PREFIX . '/checkout/' . $cart_token . '/' . $arr['id'] . '/thank_you/';
		}

		return $redirect;
    }

    function process_say_thanks( $cart, $status, $funnel_id ) {
		global $shop_id, $shop_name, $copyrightcolor, $shop_money_format;

		$shop_money_format = get_shop_meta( $shop_id, 'shop_money_format' );
		$shop_domain = get_shop_meta( $shop_id, 'shop_domain' );
		$shop_name = get_shop_meta( $shop_id, 'shop_name' );
		$force_ssl = get_shop_meta( $shop_id, 'force_ssl' );
		$redirect = ( $force_ssl > 0 ? 'https://' : 'http://' ) . $shop_domain;
		$thank_you_settings = json_decode( str_replace( '\"', '"', get_shop_meta($shop_id,'thank_you_settings') ) );

		$thank_you_msg = get_shop_meta( $shop_id, 'thank_you_msg' );
		$thank_you_msg = trim($thank_you_msg);
		if( $thank_you_msg == '' ) { $thank_you_msg = 'Thank You'; }	

		$order_confirm_title = get_shop_meta( $shop_id, 'order_confirm_title' );
		$order_confirm_title = trim($order_confirm_title);
		if( $order_confirm_title == '' ) { $order_confirm_title = 'Your order is confirmed'; }	

		$order_confirm_field = get_shop_meta( $shop_id, 'order_confirm_field' );
		$order_confirm_field = trim($order_confirm_field);
		if( $order_confirm_field == '' ) { $order_confirm_field = 'We have accepted your order, and we are getting it ready. Come back to this page for updates on your order status.'; }

		$order_update_title = get_shop_meta( $shop_id, 'order_update_title' );
		$order_update_title = trim($order_update_title);
		if( $order_update_title == '' ) { $order_update_title = 'Order updates'; }	

		$order_update_msg = get_shop_meta( $shop_id, 'order_update_msg' );
		$order_update_msg = trim($order_update_msg);
		if( $order_update_msg == '' ) { $order_update_msg = 'A confirmation was sent to'; }	

		$customer_info = get_shop_meta( $shop_id, 'customer_info' );
		$customer_info = trim($customer_info);
		if( $customer_info == '' ) { $customer_info = 'Customer Information'; }	

		$shipping_address = get_shop_meta( $shop_id, 'shipping_address' );
		$shipping_address = trim($shipping_address);
		if( $shipping_address == '' ) { $shipping_address = 'Shipping address'; }	

		$shipping_method_title = get_shop_meta( $shop_id, 'shipping_method_title' );
		$shipping_method_title = trim($shipping_method_title);
		if( $shipping_method_title == '' ) { $shipping_method_title = 'Shipping method'; }	

		$standard_shipping_title = get_shop_meta( $shop_id, 'standard_shipping_title' );
		$standard_shipping_title = trim($standard_shipping_title);
		if( $standard_shipping_title == '' ) { $standard_shipping_title = 'Standard Shipping'; }

		$billing_address_title = get_shop_meta( $shop_id, 'billing_address_title' );
		$billing_address_title = trim($billing_address_title);
		if( $billing_address_title == '' ) { $billing_address_title = 'Billing Address'; }

		$payment_method_title = get_shop_meta( $shop_id, 'payment_method_title' );
		$payment_method_title = trim($payment_method_title);
		if( $payment_method_title == '' ) { $payment_method_title = 'Payment Method'; }

		$payment_method_msg = get_shop_meta( $shop_id, 'payment_method_msg' );
		$payment_method_msg = trim($payment_method_msg);
		if( $payment_method_msg == '' ) { $payment_method_msg = 'Ending with '; }	

		$need_help = get_shop_meta( $shop_id, 'need_help' );
		$need_help = trim($need_help);
		if( $need_help == '' ) { $need_help = 'Need help?'; }

		$contact_us = get_shop_meta( $shop_id, 'contact_us' );
		$contact_us = trim($contact_us);
		if( $contact_us == '' ) { $contact_us = 'Contact us'; }

		$continue_shopping = get_shop_meta( $shop_id, 'continue_shopping' );
		$continue_shopping = trim($continue_shopping);
		if( $continue_shopping == '' ) { $continue_shopping = 'Continue shopping'; }

		$contact_us_url = get_shop_meta( $shop_id, 'contact_us_url' );
		$contact_us_url = trim($contact_us_url);
		if( $contact_us_url == '' ) { $contact_us_url = $redirect; }	

		if( isset( $cart->shipping_details->shipping_options ) && isset( $cart->shipping_details->shipping_option ) ) 
			$standard_shipping_title = $cart->shipping_details->shipping_options[ $cart->shipping_details->shipping_option ]->name;
		if($status != 5){
?>
<div class="main-wrapper">
	<section>
		<div style="padding:0">
			<svg width="50" height="50" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#000" stroke-width="2" class="os-header__hanging-icon checkmark">
				<path class="" d="M25 49c13.255 0 24-10.745 24-24S38.255 1 25 1 1 11.745 1 25s10.745 24 24 24z"></path>
				<path class="" d="M15 24.51l7.307 7.308L35.125 19"></path>
			</svg>

			<div class="content_header_heading_div">
				<span class="">
					&nbsp;
				</span>
				<h2 class="os-header__title">
					<?php echo $thank_you_msg ?> <?php echo $cart->shipping_details->first_name ?>!
				</h2>
			</div>
		</div>
	</section>
	<section style="margin-top:2em">
		<div class="content_map">
			<iframe width="100%" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.co.uk/maps?f=q&source=s_q&hl=en&geocode=&q=<?php echo urlencode( $cart->shipping_details->address) ?>, <?php echo urlencode( country_array( $cart->shipping_details->country ) ) ?> &aq=t&sll=52.8382,-2.327815&sspn=8.047465,13.666992&ie=UTF8&hq=&hnear=<?php echo urlencode( $cart->shipping_details->address) ?>, <?php echo urlencode( country_array( $cart->shipping_details->country ) ) ?>&t=m&z=14&ll=&output=embed"></iframe>
			<!-- <img src="map.png" height="200px";> -->
		</div>
		<div class="content_row" style="border-radius:0 0 4px 4px;">
			<h2 class="content_step_title"><?php echo $order_confirm_title ?></h2>
			<p><?php echo $order_confirm_field ?></p>
		</div>
		<div class="content_row">
			<h2 class="content_step_title"><?php echo $order_update_title ?></h2>
			<p><?php echo $order_update_msg ?> <?php echo $cart->shipping_details->email ?></p>
		</div>
		<div class="content_row">
			<h2 class="content_step_title"><?php echo $customer_info ?></h2>
			<div  class="content_customer_info_col">
				<h3><?php echo $shipping_address ?></h3>
				<p><?php echo $cart->shipping_details->first_name . ' ' . $cart->shipping_details->last_name; ?><br><?php echo $cart->shipping_details->address ?><br><?php echo $cart->shipping_details->city . ' ' . $cart->shipping_details->postal_code ?><br><?php echo country_array( $cart->shipping_details->country ) ?></p>
				<h3><?php echo $shipping_method_title ?></h3>
				<p><?php echo $standard_shipping_title ?></p>
			</div >
			<div class="content_customer_info_col">
				<h3><?php echo $billing_address_title ?></h3>
				<?php if( $cart->billing_details->same_as_shipping != 'true' ) { ?>
				<p><?php echo $cart->billing_details->first_name . ' ' . $cart->billing_details->last_name; ?><br><?php echo $cart->billing_details->address ?><br><?php echo $cart->billing_details->city . ' ' . $cart->billing_details->postal_code ?><br><?php echo country_array( $cart->billing_details->country ) ?></p>
				<?php } else { ?>
					<p><?php echo $cart->shipping_details->first_name . ' ' . $cart->shipping_details->last_name; ?><br><?php echo $cart->shipping_details->address ?><br><?php echo $cart->shipping_details->city . ' ' . $cart->shipping_details->postal_code ?><br><?php echo country_array( $cart->shipping_details->country ) ?></p>
				<?php } ?>
				<h3><?php echo $payment_method_title ?></h3>
				<ul>
					<li>
						<span><?php echo $payment_method_msg ?> <?php echo $cart->item_count ?> —</span>
						<?php $subtotal = 1000; ?>
						<span><?php echo format_money( '<span id="payment_ending_total"></span>', $shop_money_format ); ?></span>
					</li>
				</ul>
			</div>
		</div>
		
		<div class="content_footer">
			<div class="footer_for_big_screen">
				<a href="<?php echo $redirect ?>" class="btn btn-info btn-lg pull-right"><?php echo $continue_shopping ?></a>
				<p>
					<i class="content_footer_icon" style="background-image: url(//cdn.shopify.com/s/assets/checkout/order-status-question-a3616b3b5a5202afce3a5f8b996993cb977237cb96bba32238b94bbd891a562b.svg),none;"></i>
					<span>
					  <?php echo $need_help ?> <a href="<?php echo $contact_us_url ?>"><?php echo $contact_us ?></a>
					</span>
				</p>
			</div>
			<div class="footer_for_small_screen">
				<a href="<?php echo $redirect ?>" class="btn btn-info btn-lg btn-block"><?php echo $continue_shopping ?></a>
				<p>
					<i class="content_footer_icon" style="background-image: url(//cdn.shopify.com/s/assets/checkout/order-status-question-a3616b3b5a5202afce3a5f8b996993cb977237cb96bba32238b94bbd891a562b.svg),none;"></i>
					<span>
					  <?php echo $need_help ?> <a href="<?php echo $contact_us_url ?>"><?php echo $contact_us ?></a>
					</span>
				</p>
			</div>
		</div>
	</section>
</div>
<?php
	}else if($status == 5){
?>
<div class="main-wrapper">
	<section>
		<div style="padding:0">
			<svg width="50" height="50" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#000" stroke-width="2" class="os-header__hanging-icon checkmark">
				<path class="" d="M25 49c13.255 0 24-10.745 24-24S38.255 1 25 1 1 11.745 1 25s10.745 24 24 24z"></path>
				<path class="" d="M16 16 36 36 M36 16 16 36"></path>
			</svg>

			<div class="content_header_heading_div">
				<span class="">
					&nbsp;
				</span>
				<h2 class="os-header__title">
					<?php
						$thank_you_error_msg = get_shop_meta($shop_id,'thank_you_error_msg');
						if($thank_you_error_msg == ""){
							$thank_you_error_msg = 'We are sorry';
						}
					?>
					<?php echo $thank_you_error_msg ?> <?php echo $cart->shipping_details->first_name ?>!
				</h2>
			</div>
		</div>
	</section>
	<section style="margin-top:2em">
		<div class="content_map">
			<iframe width="100%" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.co.uk/maps?f=q&source=s_q&hl=en&geocode=&q=<?php echo urlencode( $cart->shipping_details->address) ?>, <?php echo urlencode( country_array( $cart->shipping_details->country ) ) ?> &aq=t&sll=52.8382,-2.327815&sspn=8.047465,13.666992&ie=UTF8&hq=&hnear=<?php echo urlencode( $cart->shipping_details->address) ?>, <?php echo urlencode( country_array( $cart->shipping_details->country ) ) ?>&t=m&z=14&ll=&output=embed"></iframe>
			<!-- <img src="map.png" height="200px";> -->
		</div>
		<div class="content_row" style="border-radius:0 0 4px 4px;">
			<?php
				$order_confirm_error_title = get_shop_meta($shop_id,'order_confirm_error_title');
				if($order_confirm_error_title == ""){
					$order_confirm_error_title = 'Your order is denied';
				}
				$order_confirm_error_field = get_shop_meta($shop_id,'order_confirm_error_field');
				if($order_confirm_error_field == ""){
					$order_confirm_error_field = 'Something went wrong in your payment';
				}
			?>
			<h2 class="content_step_title"><?php echo $order_confirm_error_title ?></h2>
			<p><?php echo $order_confirm_error_field ?></p>
		</div>
		<div class="content_row">
			<h2 class="content_step_title"><?php echo $customer_info ?></h2>
			<div  class="content_customer_info_col">
				<h3><?php echo $shipping_address ?></h3>
				<p><?php echo $cart->shipping_details->first_name . ' ' . $cart->shipping_details->last_name; ?><br><?php echo $cart->shipping_details->address ?><br><?php echo $cart->shipping_details->city . ' ' . $cart->shipping_details->postal_code ?><br><?php echo country_array( $cart->shipping_details->country ) ?></p>
				<h3><?php echo $shipping_method_title ?></h3>
				<p><?php echo $standard_shipping_title ?></p>
			</div >
			<div class="content_customer_info_col">
				<h3><?php echo $billing_address_title ?></h3>
				<?php if( $cart->billing_details->same_as_shipping != 'true' ) { ?>
				<p><?php echo $cart->billing_details->first_name . ' ' . $cart->billing_details->last_name; ?><br><?php echo $cart->billing_details->address ?><br><?php echo $cart->billing_details->city . ' ' . $cart->billing_details->postal_code ?><br><?php echo country_array( $cart->billing_details->country ) ?></p>
				<?php } else { ?>
					<p><?php echo $cart->shipping_details->first_name . ' ' . $cart->shipping_details->last_name; ?><br><?php echo $cart->shipping_details->address ?><br><?php echo $cart->shipping_details->city . ' ' . $cart->shipping_details->postal_code ?><br><?php echo country_array( $cart->shipping_details->country ) ?></p>
				<?php } ?>
				<h3><?php echo $payment_method_title ?></h3>
				<ul>
					<li>
						<span><?php echo $payment_method_msg ?> <?php echo $cart->item_count ?> —</span>
						<?php $subtotal = 1000; ?>
						<span><?php echo format_money( '<span id="payment_ending_total"></span>', $shop_money_format ); ?></span>
					</li>
				</ul>
			</div>
		</div>
		
		<div class="content_footer">
			<div class="footer_for_big_screen">
				<?php
					$go_back_and_fix = get_shop_meta($shop_id,'go_back_and_fix');
					if($go_back_and_fix == ""){
						$go_back_and_fix = 'Go back and fix this';
					}
					$checkout_url = $redirect.SHOPIFY_PROXY_PREFIX.'/p/0/abc/?go=left&token='.$cart->token;
				?>
				<a href="<?php echo $checkout_url ?>" class="btn btn-danger btn-lg pull-right"><span class="glyphicon glyphicon-arrow-left" style="color: white;"></span> <?php echo $go_back_and_fix ?></a>
				<p>
					<i class="content_footer_icon" style="background-image: url(//cdn.shopify.com/s/assets/checkout/order-status-question-a3616b3b5a5202afce3a5f8b996993cb977237cb96bba32238b94bbd891a562b.svg),none;"></i>
					<span>
					  <?php echo $need_help ?> <a href="<?php echo $contact_us_url ?>"><?php echo $contact_us ?></a>
					</span>
				</p>
			</div>
			<div class="footer_for_small_screen">
				<a href="<?php echo $checkout_url ?>" class="btn btn-danger btn-lg btn-block"><span class="glyphicon glyphicon-arrow-left" style="color: white;"></span> <?php echo $go_back_and_fix ?></a>
				<p>
					<i class="content_footer_icon" style="background-image: url(//cdn.shopify.com/s/assets/checkout/order-status-question-a3616b3b5a5202afce3a5f8b996993cb977237cb96bba32238b94bbd891a562b.svg),none;"></i>
					<span>
					  <?php echo $need_help ?> <a href="<?php echo $contact_us_url ?>"><?php echo $contact_us ?></a>
					</span>
				</p>
			</div>
		</div>
	</section>
</div>
<?php
	}
?>
<input type="hidden" id="shipping_country" value="<?php echo $cart->shipping_details->country ?>">
<input type="hidden" id="shipping_province" value="<?php echo $cart->shipping_details->province ?>">
<input type="hidden" id="shipping_postal_code" value="<?php echo $cart->shipping_details->postal_code ?>">
<?php
	if($_REQUEST['pamt_ref'] == "true"){
		$pay_pal_checkout = 'true';
	}else{
		$pay_pal_checkout = 'false';
	}
?>
<input type="hidden" id="pay_pal_checkout" value="<?php echo $pay_pal_checkout; ?>">
<script type="text/javascript">complete_transaction();</script>
<?php
	}

	function process_initiate_paypal_transaction() {
		global $shop_id, $token, $cart_token, $mysqli;
		$paypal_reference_transaction = get_shop_meta( $shop_id, "paypal_reference_transaction" );
		$shop_currency = get_shop_meta( $shop_id, 'shop_currency' );
		$force_ssl = get_shop_meta( $shop_id, 'force_ssl');
		$shop_domain = get_shop_meta( $shop_id, 'shop_domain' );
		$redirect = ( $force_ssl > 0 ? 'https://' : 'http://' ) . $shop_domain . SHOPIFY_PROXY_PREFIX . '/checkout/' . $cart_token;

		$res = $mysqli->query("SELECT id, funnel_id, cart FROM carts WHERE token='$cart_token' AND shop_id='$shop_id'");
		$arr = $res->fetch_array( MYSQLI_ASSOC );
		$cart = json_decode( $arr['cart'] );

		$paymentAmount 		= (double) $_REQUEST['primary_amt'];
		$currencyCodeType 	= urlencode( $shop_currency );
		$paymentType 		= ( $paypal_reference_transaction != 'disable' ? "Authorization" : "SALE" );
		$returnURL 			= $redirect . '/?process=save_paypal_reference' . ( $paypal_reference_transaction != 'disable' ? "" : "&noreference=true" );
		$cancelURL 			= $redirect . '/?cancelled=true';

		$nvpstr = "&PAYMENTREQUEST_0_AMT=". $paymentAmount;
		$nvpstr = $nvpstr . "&PAYMENTREQUEST_0_CURRENCYCODE=" . $currencyCodeType;
		$nvpstr = $nvpstr . "&PAYMENTREQUEST_0_PAYMENTACTION=" . $paymentType;
		if( $paypal_reference_transaction != 'disable' ) {
			$nvpstr = $nvpstr . "&L_BILLINGTYPE0=MerchantInitiatedBilling";
			$nvpstr = $nvpstr . "&L_BILLINGAGREEMENTDESCRIPTION0=".urlencode("");
		}
		$nvpstr = $nvpstr . "&RETURNURL=" . $returnURL;
		$nvpstr = $nvpstr . "&CANCELURL=" . $cancelURL;

		$nvpstr = $nvpstr . "&PAYMENTREQUEST_0_SHIPTONAME=" . $cart->shipping_details->first_name . ' ' . $cart->shipping_details->last_name;
		$nvpstr = $nvpstr . "&PAYMENTREQUEST_0_SHIPTOSTREET=" . $cart->shipping_details->address;
		$nvpstr = $nvpstr . "&PAYMENTREQUEST_0_SHIPTOSTREET2=" . $cart->shipping_details->apt;
		$nvpstr = $nvpstr . "&PAYMENTREQUEST_0_SHIPTOCITY=" . $cart->shipping_details->city;
		$nvpstr = $nvpstr . "&PAYMENTREQUEST_0_SHIPTOSTATE=" . $cart->shipping_details->province;
		$nvpstr = $nvpstr . "&PAYMENTREQUEST_0_SHIPTOCOUNTRYCODE=" . $cart->shipping_details->country;
		$nvpstr = $nvpstr . "&PAYMENTREQUEST_0_SHIPTOZIP=" . $cart->shipping_details->postal_code;
		$nvpstr = $nvpstr . "&PAYMENTREQUEST_0_SHIPTOPHONENUM=" . $cart->shipping_details->phone;

		$resArray=hash_call( "SetExpressCheckout", $nvpstr, $shop_id, $cart_token );
		$ack = strtoupper($resArray["ACK"]);
		if($ack=="SUCCESS" || $ack=="SUCCESSWITHWARNING")
		{
			$token = urldecode($resArray["TOKEN"]);
		}

		$ack = strtoupper($resArray["ACK"]);
		if($ack=="SUCCESS" || $ack=="SUCCESSWITHWARNING") {
			echo $payPalURL = $resArray['PAYPAL_URL'] . $resArray["TOKEN"];
		} else {
			echo "error";
		}

		$billing_details = array(
				'same_as_shipping'		=> 	$_REQUEST['same_as_shipping'],
				'first_name' 			=> 	$_REQUEST['billing_first_name'],
				'last_name'				=>	$_REQUEST['billing_last_name'],
				'address'				=>	$_REQUEST['billing_address'],
				'apt'					=>	$_REQUEST['billing_apt'],
				'city'					=>	$_REQUEST['billing_city'],
				'country'				=>	$_REQUEST['billing_country'],
				'postal_code'			=>	$_REQUEST['billing_postal_code'],
				'province'				=>	$_REQUEST['billing_province'],
				'subscribe_customer'	=>	$_REQUEST['subscribe_customer'],
				'paypal_token'			=>	$resArray['TOKEN']
			);

		if( $paypal_reference_transaction == 'disable' ) {
			$billing_details['noreference'] = 1;
		}
		
		$cart->billing_details = $billing_details;

		$mysqli->query("UPDATE carts SET cart='" . $mysqli->real_escape_string( json_encode( $cart ) ) . "' WHERE id='" . $arr['id'] . "'");
	}

	function get_youtube_video_id( $video ) {
		if( strpos( $video, '?v=' ) !== false ) {
        	$vidbr = explode( '?v=', $video );
        	$vidbr = explode( '&', $vidbr[1] );
        	$video = $vidbr[0];
        } elseif( strpos( $video, '/embed/' ) !== false ) {
        	$vidbr = explode( '/embed/', $video );
        	$vidbr = explode( '/', $vidbr[1] );
        	$video = $vidbr[0];
        }

        return $video;
	}

	function get_vimeo_video_id( $video ) {
		$vibr = explode( 'vimeo.com/', $video );
    	$vibr = explode( '/', $vibr[1] );
    	$video = $vibr[0];
    	return $video;
	}

	/**
	  '-------------------------------------------------------------------------------------------------------------------------------------------
	  * hash_call: Function to perform the API call to PayPal using API signature
	  * @methodName is name of API  method.
	  * @nvpStr is nvp string.
	  * returns an associtive array containing the response from the server.
	  '-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	function hash_call( $methodName, $nvpStr, $shop_id, $cart_token ) {
		global $mysqli, $gv_ApiErrorURL;
		$API_UserName = get_shop_meta( $shop_id, 'paypal_api_username' );
	    $API_Password = get_shop_meta( $shop_id, 'paypal_api_password' );
	    $API_Signature= get_shop_meta( $shop_id, 'paypal_api_signature' );
		$sBNCode = "PP-ECWizard";
		$PROXY_HOST = PAYPAL_PROXY_HOST;
		$PROXY_PORT = PAYPAL_PROXY_PORT;
		$SandboxFlag = ( PAYPAL_SANDBOX_FLAG == 'true' ? true : false );
		if ($SandboxFlag == true) 
		{
			$API_Endpoint = "https://api-3t.sandbox.paypal.com/nvp";
			$PAYPAL_URL = "https://www.sandbox.paypal.com/webscr?cmd=_express-checkout&token=";
		}
		else
		{
			$API_Endpoint = "https://api-3t.paypal.com/nvp";
			$PAYPAL_URL = "https://www.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=";
		}

		$USE_PROXY = ( PAYPAL_PROXY_FLAG == 'true' ? true : false );
		$version="64";

		//setting the curl parameters.
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL,$API_Endpoint);
		curl_setopt($ch, CURLOPT_VERBOSE, 1);

		//turning off the server and peer verification(TrustManager Concept).
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);

		curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
		curl_setopt($ch, CURLOPT_POST, 1);
		
	    //if USE_PROXY constant set to TRUE in Constants.php, then only proxy will be enabled.
	   //Set proxy name to PROXY_HOST and port number to PROXY_PORT in constants.php 
		if($USE_PROXY)
			curl_setopt ($ch, CURLOPT_PROXY, $PROXY_HOST. ":" . $PROXY_PORT); 

		//NVPRequest for submitting to server
		$nvpreq="METHOD=" . urlencode($methodName) . "&VERSION=" . urlencode($version) . "&PWD=" . urlencode($API_Password) . "&USER=" . urlencode($API_UserName) . "&SIGNATURE=" . urlencode($API_Signature) . $nvpStr . "&BUTTONSOURCE=" . urlencode($sBNCode);

		//setting the nvpreq as POST FIELD to curl
		curl_setopt($ch, CURLOPT_POSTFIELDS, $nvpreq);

		//getting response from server
		$response = curl_exec($ch);

		//convrting NVPResponse to an Associative Array
		$nvpResArray=deformatNVP($response);
		$nvpReqArray=deformatNVP($nvpreq);
		$_SESSION['nvpReqArray']=$nvpReqArray;

		if (curl_errno($ch)) 
		{
			// moving to display page to display curl errors
			  $_SESSION['curl_error_no']=curl_errno($ch) ;
			  $_SESSION['curl_error_msg']=curl_error($ch);

			  //Execute the Error handling module to display errors. 
		} 
		else 
		{
			 //closing the curl
		  	curl_close($ch);
		}

		$nvpResArray['PAYPAL_URL'] = $PAYPAL_URL;

		return $nvpResArray;
	}

	
	/*'----------------------------------------------------------------------------------
	 * This function will take NVPString and convert it to an Associative Array and it will decode the response.
	  * It is usefull to search for a particular key and displaying arrays.
	  * @nvpstr is NVPString.
	  * @nvpArray is Associative Array.
	   ----------------------------------------------------------------------------------
	  */
	function deformatNVP($nvpstr)
	{
		$intial=0;
	 	$nvpArray = array();

		while(strlen($nvpstr))
		{
			//postion of Key
			$keypos= strpos($nvpstr,'=');
			//position of value
			$valuepos = strpos($nvpstr,'&') ? strpos($nvpstr,'&'): strlen($nvpstr);

			/*getting the Key and Value values and storing in a Associative Array*/
			$keyval=substr($nvpstr,$intial,$keypos);
			$valval=substr($nvpstr,$keypos+1,$valuepos-$keypos-1);
			//decoding the respose
			$nvpArray[urldecode($keyval)] =urldecode( $valval);
			$nvpstr=substr($nvpstr,$valuepos+1,strlen($nvpstr));
	    }
		return $nvpArray;
	}

	function process_save_paypal_reference() {
		global $shop_id, $token, $cart_token, $mysqli;
		$shop_currency = get_shop_meta( $shop_id, 'shop_currency' );

		if( $_REQUEST['PayerID'] != '' ) {
			$res = $mysqli->query("SELECT id, funnel_id, cart FROM carts WHERE token='$cart_token' AND shop_id='$shop_id'");
			$arr = $res->fetch_array( MYSQLI_ASSOC );
			$cart = json_decode( $arr['cart'] );
			
			$cart->billing_details->paypal_payer_id = $_REQUEST['PayerID'];
			if( isset( $cart->billing_details->noreference ) && ( $cart->billing_details->noreference == 1 ) ) $arr['funnel_id'] = 0;

			$mysqli->query("UPDATE carts SET cart='" . $mysqli->real_escape_string( json_encode( $cart ) ) . "', status=3 WHERE id='" . $arr['id'] . "'");

			$redirect = redirect_from_checkout( $shop_id, $arr['funnel_id'], $cart_token );
			header('location:' . $redirect . '/?pamt_ref=true' );
		} else echo "error occured"; 
	}
	
	function process_save_email(){
		global  $mysqli;
		$res = $mysqli->query("SELECT id  FROM cart_emails WHERE token='".$_REQUEST['cart_token']."' ");
		
		if( $res->num_rows > 0 ) {
			$arr = $res->fetch_array( MYSQLI_ASSOC );
			$mysqli->query("UPDATE cart_emails SET email = '".$_REQUEST['email']."'  WHERE id='" . $arr['id'] ."'  ");
		} else {
			$mysqli->query ("INSERT INTO cart_emails (token , email) VALUES (  '".$_REQUEST['cart_token']."',   '".$_REQUEST['email']. "' )" );
		}
	}

	function taxjar_regional_tax( $shop_zip, $shop_province, $destination_zip, $destination_province, $applicable_tax ) {
		$regional_taxes = taxjar_calculate_tax_rate( $shop_zip, $shop_province, $destination_zip, $destination_province );
		if( isset( $regional_taxes['tax'] ) && isset( $regional_taxes['tax']['rate'] ) && ( $regional_taxes['tax']['has_nexus'] != false ) ) {
			$api_total_tax_rate = $regional_taxes['tax']['rate'];
			if( $api_total_tax_rate > $applicable_tax ) {
				$province_tax_rate = ( $api_total_tax_rate - $applicable_tax );
			} else {
				$applicable_tax = 0;
				$province_tax_rate = $api_total_tax_rate;
			}
		} else {
			$applicable_tax = 0;
			$province_tax_rate = 0;
		}
		if( !isset( $province_tax_rate ) ) $province_tax_rate = 0;

		$province_tax = array( 'tax' => $province_tax_rate, 'tax_name' => 'State & county taxes', 'tax_type' => 'normal' );

		$ret = array( 'applicable_tax' => $applicable_tax, 'province_tax' => $province_tax );
		return $ret;
	}

	function display_checkout_expiry_message() {
		global $shop_id;
		$shop_domain = get_shop_meta( $shop_id, 'shop_domain');
		$force_ssl = get_shop_meta( $shop_id, 'force_ssl');
		$full_shop_url= ( $force_ssl > 0 ? 'https://' : 'http://' ) . $shop_domain;
?>
	<!DOCTYPE html>
	<html>
	<head>
		<title>Sorry, link expired</title>
		<!-- Latest compiled and minified CSS -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
		<!-- Optional theme -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
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
			color: #1A237E;
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
			<h1 style="width: 100px; height:100px; background-color: #286090; color:#d3d3d3; font-size: 100px; border-radius: 100%; margin: 0px auto;">!</h1>
			<div class="error-msg">
				<h2 style="font-size: 22px;">SORRY, THIS LINK HAS EXPIRED.</h2>
				<p>PLEASE GO BACK TO HOME PAGE OR CONTACT US FOR REPORTING THE ISSUE</p>
			</div>
			<a class="btn btn-home" href="<?php echo $full_shop_url; ?>">Home page</a>
		</div>
	</div>
	</body>
	</html>
	<?php 
	}

	function process_nmi_create_vault() {
		global $mysqli, $shop_id, $token, $cart_token;
		require_once ('./includes/nmi_lib/nmiCustomerVault.class.php');
		//nmi keys
		$nmi_username = get_shop_meta( $shop_id, 'nmi_username' );
        $nmi_password = get_shop_meta( $shop_id, 'nmi_password' );

        $vault = new nmiCustomerVault( NMI_URL, $nmi_username, $nmi_password );

		///////Card Details/////////
		$vault->setCcNumber($_REQUEST['card_number']);
		if(strlen($_REQUEST['exp_month']) == 1 ){
			$_REQUEST['exp_month'] = "0".$_REQUEST['exp_month'];
		}
		$vault->setCcExp($_REQUEST['exp_month'].$_REQUEST['exp_year']);
		$vault->setCvv($_REQUEST['cvv']);
		
		$vault->setAmount($_REQUEST['primary_amt']);
		$vault->setTax('0.00');
		$vault->setShipping('0.00');
		$vault->add();
		$result = $vault->execute();
		echo json_encode( $result );
		return true;
	}

	function process_bluesnap_create_vault(){
		global $shop_id;
		$user_name = get_shop_meta($shop_id,"bluesnap_username");
		$password = get_shop_meta($shop_id,"bluesnap_password");

		$expirationYear = $_REQUEST['exp_year'];
		$securityCode = $_REQUEST['cvv'];
		$expirationMonth = $_REQUEST['exp_month'];
		$cardNumber = $_REQUEST['card_number'];
		$firstName = $_REQUEST['firstName'];
		$lastName = $_REQUEST['lastName'];
		$param_array = ["paymentSources"=>["creditCardInfo"=>[["creditCard"=>["expirationYear"=>$expirationYear,"securityCode"=>$securityCode,"expirationMonth"=>$expirationMonth,"cardNumber"=>$cardNumber]]]],"firstName"=>$firstName,"lastName"=>$lastName];
		$param_array = json_encode($param_array);
		$type = "vaulted-shoppers";
		$url = BLUESNAP_URL . $type;

		$api_url = 'https://dinocommerce.com/api/funnel_v2/bluesnap.php?user_name='.urlencode($user_name).'&password='.urlencode($password).'&url='.urlencode($url).'&param_array='.urlencode($param_array);
		echo file_get_contents($api_url);
	}

	function process_bluesnap_charge_from_vault($total_price,$vaulted_shopper_id){
		global $shop_id;
		$user_name = get_shop_meta($shop_id,"bluesnap_username");
		$password = get_shop_meta($shop_id,"bluesnap_password");
		$amount = $total_price;
		$vaultedShopperId = $vaulted_shopper_id;
		$currency = get_shop_meta($shop_id,"shop_currency");
		//for transactions
		$param_array = ["amount" => $amount,"vaultedShopperId" => $vaultedShopperId,"recurringTransaction" => "ECOMMERCE","softDescriptor" => substr( get_shop_meta($shop_id,"shop_name"), 0, 18 ),"currency" => $currency,"cardTransactionType" => "AUTH_CAPTURE"];
		$param_array = json_encode($param_array);
		$type = "transactions";
		$url = BLUESNAP_URL . $type;
		
		$api_url = 'https://dinocommerce.com/api/funnel_v2/bluesnap.php?user_name='.urlencode($user_name).'&password='.urlencode($password).'&url='.urlencode($url).'&param_array='.urlencode($param_array);
		return file_get_contents($api_url);
	}
?>
