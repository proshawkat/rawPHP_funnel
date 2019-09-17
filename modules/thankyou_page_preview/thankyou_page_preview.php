<?php 
	$shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];
	$shop_name = get_shop_meta( $shop_id, 'shop_name' );

	$shop_domain = get_shop_meta( $shop_id, 'shop_domain');
	$force_ssl = get_shop_meta( $shop_id, 'force_ssl');
	$full_shop_url= ( $force_ssl > 0 ? 'https://' : 'http://' ) . $shop_domain;

	$url_shop_name = get_shop_meta( $shop_id, 'contact_us_url');
	$force_ssl = get_shop_meta( $shop_id, 'force_ssl');

	$shop_currency = get_shop_meta( $shop_id, 'shop_currency' );
	$shop_money_format = get_shop_meta( $shop_id, 'shop_money_format' );

	$url = parse_url($url_shop_name);

	if($url['scheme'] == 'http' || $url['scheme'] == 'https' ){
	   $get_change_shop_url = $url_shop_name;
	}
	else{
		$get_change_shop_url=( $force_ssl > 0 ? 'https://' : 'http://' ).$url_shop_name;
	}

	$shop_meta = get_shop_meta($shop_id,'thank_you_settings');
	$thanku_data = json_decode($shop_meta);
?>
<!DOCTYPE html>
<html>
	<head>
		<title><?php echo $shop_name ?> - Checkout</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width,intitial-scale=1.0">
		<link rel="shortcut icon" type="image/x-icon" href="https://cdn.shopify.com/s/assets/favicon-4425e7970f1327bc362265f54e8c9c6a4e96385b3987760637977078e28ffe92.png" />
		<link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Lato" />
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">
		<link rel="stylesheet" href="<?php echo BASE; ?>/files/css/payment-styles.css">
		<link rel="stylesheet" href="<?php echo BASE; ?>/files/css/thankyou_style.css">		<link rel="stylesheet" href="<?php echo BASE; ?>/files/css/nprogress.css">

		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
		<style>
			html * {
				color: #000000;
			}

			body {
				background-color: #ffffff;
			}
		</style>
		<script>
			$( document ).ready(function() {
			 		window.addEventListener("resize", function() {
					if( ( window.innerWidth > 768 ) && ( document.getElementById('order_summary').style.display == 'none' ) ) {
						document.getElementById('order_summary').style.display = 'block';
					} else if( ( window.innerWidth <= 768 ) && ( document.getElementById('order_summary').style.display == 'block' ) ) {
						document.getElementById('order_summary').style.display = 'none';
						document.getElementById('show_or_hide').innerHTML = 'Show order summary <i class="glyphicon glyphicon-chevron-down"></i>';
					}
				});
			});
		</script>
	</head>
	<body id="bodycart" style="height: 100%;">
		<style type="text/css">
			.vertical-text {
			    transform: rotate(90deg);
			    transform-origin: 15px;
			}

			 
			.vertical-text {
			    float: left;
			}

			.vertical-text2 {
			    transform: rotate(90deg);
			    transform-origin: -22px 52px;
			}

			 
			.vertical-text2 {
			    float: left;
			}

		</style>

		<div  style="width:100px; height: 150px; position: fixed; top: 35%; z-index: 9999999;">
			<button class="vertical-text" title="Thank you page preview" type="button" style="width: 100%; padding: 5px; border: 0px; background-color: #51ab54; color: #fff; border-radius: 5px 5px 0px 0px; " onclick="select_preview('payment-div')">Preview</button>
			<button class="vertical-text2" title="Thank you page error preview" type="button" style="width: 100%; padding: 5px; border: 0px; background-color: #d47979; color: #FFF; border-radius: 5px 5px 0px 0px;" onclick="select_preview('error-div')">Error</button>
		</div>

		<header class="header-checkout" id="paymentheader" style="background-color: #adadad;">
			<div class="container" style="margin-top: 8px; margin-bottom: 8px;">
				<div class="row">
					<div class="col-md-12">
						<a class="" href="<?php echo $full_shop_url; ?>">
							<h1 style="text-align: center;">
								<?php 
									echo $shop_name;
								?>
							</h1>
						</a>
					</div>			   
				 </div>
				<div class="custom-html-header"></div>
			</div>
		</header>

		<form action="#" onsubmit="return validate_payment();" id="payment-form">
			<input type="hidden" id="_is_tax_included" value="">
			<input type="hidden" id="_is_shipping_tax_applicable" value="1">

			<style>
				html * {
					color: #717171;
				}
			</style>
						
			<?php
				$thank_you_msg = get_shop_meta( $shop_id, 'thank_you_msg' );
				$thank_you_msg = trim($thank_you_msg);
				if( $thank_you_msg == '' ) { $thank_you_msg = 'Thank You'; }

				$thank_you_error_msg = get_shop_meta($shop_id, 'thank_you_error_msg');
				$thank_you_error_msg = trim($thank_you_error_msg);
				if( $thank_you_error_msg == '' ) { $thank_you_error_msg = 'We are sorry'; }

				$order_confirm_title = get_shop_meta( $shop_id, 'order_confirm_title' );
				$order_confirm_title = trim($order_confirm_title);
				if( $order_confirm_title == '' ) { $order_confirm_title = 'Your order is confirmed'; }

				$order_confirm_field = get_shop_meta( $shop_id, 'order_confirm_field' );
				$order_confirm_field = trim($order_confirm_field);
				if( $order_confirm_field == '' ) { $order_confirm_field = 'We have accepted your order, and we are getting it ready. Come back to this page for updates on your order status.'; }

				$order_confirm_error_title = get_shop_meta( $shop_id, 'order_confirm_error_title' );
				$order_confirm_error_title = trim($order_confirm_error_title);
				if( $order_confirm_error_title == '' ) { $order_confirm_error_title = 'Your order is denied'; }

				$order_confirm_error_field = get_shop_meta( $shop_id, 'order_confirm_error_field' );
				$order_confirm_error_field = trim($order_confirm_error_field);
				if( $order_confirm_error_field == '' ) { $order_confirm_error_field = 'Something went wrong in your payment.'; }

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
				if( $contact_us_url == '' ) { $contact_us_url = $full_shop_url.'/contact-us'; }
				$payment_error_msg = get_shop_meta( $shop_id, 'payment_error_msg' );
				$payment_error_msg = trim($payment_error_msg);
				if( $payment_error_msg == '' ) { $payment_error_msg = 'Payment was unsuccessful. Your credit card was not charged.'; }

				$go_back_and_fix = get_shop_meta( $shop_id, 'go_back_and_fix' );
				$go_back_and_fix = trim($go_back_and_fix);
				if( $go_back_and_fix == '' ) { $go_back_and_fix = 'Go back and fix this'; }
        	?>

			<div class="row page-row page-row-expanded" id="payment-div">
				<div class="col-md-7 col-eq-7 top-grey-border col-md-top" id="left-div" style="background-color: #fafafa;">
					<div id="left-div-content">
						<p>&nbsp;</p>
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
											<?php echo htmlspecialchars($thank_you_msg) ." Jon Snow!"; ?>
										</h2>
									</div>
								</div>
							</section>
							<section style="margin-top:2em">
								<div class="content_map">
									<iframe width="100%" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.co.uk/maps?f=q&source=s_q&hl=en&geocode=&q=,  &aq=t&sll=52.8382,-2.327815&sspn=8.047465,13.666992&ie=UTF8&hq=&hnear=, &t=m&z=14&ll=&output=embed"></iframe>
									<!-- <img src="map.png" height="200px";> -->
								</div>
								<div class="content_row" style="border-radius:0 0 4px 4px;">
									<h2 class="content_step_title"><?php echo htmlspecialchars($order_confirm_title); ?></h2>
									<p><?php echo htmlspecialchars($order_confirm_field); ?></p>
								</div>
								<div class="content_row">
									<h2 class="content_step_title"><?php echo htmlspecialchars($order_update_title);?></h2>
									<p><?php echo htmlspecialchars($order_update_msg)." jon_snow@gmail.com"; ?></p>
								</div>
								<div class="content_row">
									<h2 class="content_step_title"><?php echo htmlspecialchars($customer_info);?></h2>
									<div  class="content_customer_info_col">
										<h3><?php echo htmlspecialchars($shipping_address);?></h3>
										<p>Jon Snow <br>House of stark<br> Winterfell<br>Seven kingdoms</p>
										<h3><?php echo htmlspecialchars($shipping_method_title); ?></h3>
										<p><?php echo htmlspecialchars($standard_shipping_title); ?></p>
									</div >
									<div class="content_customer_info_col">
										<h3><?php echo htmlspecialchars($billing_address_title); ?></h3>
											<p>Jon Snow <br>House of stark<br> Winterfell<br>Seven kingdoms</p>
											<h3><?php echo htmlspecialchars($payment_method_title); ?></h3>
										<ul>
											<li>
												<span><?php echo htmlspecialchars($payment_method_msg); ?> 1 — <?php echo str_replace("{{amount}}", "43.25", $shop_money_format);?></span>
											</li>
										</ul>
									</div>
								</div>
								

								<div class="content_footer">
									<div class="footer_for_big_screen">
										<a aria-disabled="true" href="<?php echo $full_shop_url; ?>" class="btn btn-info btn-lg pull-right"><?php echo $continue_shopping; ?></a>
										<p>
											<i class="content_footer_icon" style="background-image: url(//cdn.shopify.com/s/assets/checkout/order-status-question-a3616b3b5a5202afce3a5f8b996993cb977237cb96bba32238b94bbd891a562b.svg),none;"></i>
											<span>
											  <?php echo $need_help; ?>
											  <a href="<?php echo $contact_us_url; ?>"><?php echo $contact_us; ?></a>
											</span>
										</p>
									</div>
									<div class="footer_for_small_screen">
										<a href="<?php echo $full_shop_url; ?>" aria-disabled="true" class="btn btn-info btn-lg btn-block"><?php echo $continue_shopping; ?></a>
										<p>
											<i class="content_footer_icon" style="background-image: url(//cdn.shopify.com/s/assets/checkout/order-status-question-a3616b3b5a5202afce3a5f8b996993cb977237cb96bba32238b94bbd891a562b.svg),none;"></i>
											<span>
											  <?php echo $need_help; ?> <a href="<?php echo $contact_us_url; ?>"><?php echo $contact_us; ?></a>
											</span>
										</p>
									</div>
								</div>
							</section>
						</div>


						<input type="hidden" id="shipping_country" value="">
						<input type="hidden" id="shipping_province" value="">
						<div style="margin: 10px;">&nbsp;</div>
					</div>
				</div>

				<div class="col-md-5 col-eq-5 col-md-middle top-grey-border" id="right-div" style="background-color: #fafafa;">
					<div id="right-div-content">
						<div id="right-div-content">
							<div id="order_summary_command">
								<div class="row">
									<div class="col-xs-8 text-left">
										<h4>
											<a href="#" id="order-display-commander" onclick="toggle_order_summary(); return false;">
												<i class="glyphicon glyphicon-shopping-cart"></i>
												<span id="show_or_hide">Show order summary <i class="glyphicon glyphicon-chevron-down"></i></span>
											</a>
										</h4>
									</div>
									<div class="col-xs-4 text-right">
										<h4 id="summary_grand_total" class="text-right">
										<?php echo str_replace( '{{amount}}', '<span id="order_summary_grand_total">43.25</span>', $shop_money_format ) ?></h4>
									</div>
								</div>
							</div>

							<div id="order_summary">
								<table class="order_summary">
									<tbody>
										<tr>
											<th width="10%"></th>
											<th width="35%"></th>
											<th width="35%"></th>
											<th width="20%"></th>
										</tr>
										<tr>
											<td>
												<div class="image-minimum-width">

													<div class="product__image">
													    <div class="product-thumbnail">
													  		<div class="product-thumbnail__wrapper">
													    			<img alt="case - Gloss / Single" class="product-thumbnail__image" src="https://cdn.shopify.com/s/files/1/0949/0302/products/rise-and-grind.png?v=1488091848">
													  		</div>
													    	<span class="product-thumbnail__quantity" aria-hidden="true">1</span>
														</div>
													</div>
												</div>
											</td>
											<td colspan="2" align="left">
												<strong>"Rise And Grind" Men's Tees & Tanks</strong>
												<p class="color-more-grey">
													Custom Ultra Cotton T-Shirt / Red / Small
												</p>
											</td>
											<td align="right" width="40%">
												<?php echo str_replace( '{{amount}}', '24.00', $shop_money_format ) ?>
											</td>
										</tr>										
										<tr class="top-grey-border">
											<td colspan="2" align="left">
												<h5 class="color-more-grey">Subtotal</h5>
											</td>
											<td align="right" colspan="2">
												<input type="hidden" id="init_subtotal_amount_" value="24.00">
												<?php echo str_replace( '{{amount}}', '24.00', $shop_money_format ) ?>
											</td>
										</tr>
										<tr>
											<td colspan="2" align="left">
												<h5 class="color-more-grey">Shipping</h5>
												<input type="hidden" id="saved_shipping_cost" value="10.00">
											</td>
											<td id="shipping_total" align="right" colspan="2">
												<?php echo str_replace( '{{amount}}', '10.00', $shop_money_format ) ?>									
											</td>
										</tr>
										<tr style="">
											<td colspan="2" align="left">
												<h5 class="color-more-grey">Taxes</h5>
											</td>
											<td align="right" colspan="2">
												<?php echo str_replace( '{{amount}}', '<span id="tax_total">9.25</span>', $shop_money_format ) ?>			
											</td>
										</tr>
										<tr class="top-grey-border">
											<td colspan="2" align="left">
												<h4>Total</h4>
											</td>
											<td align="right" colspan="2">
												<h5 class="summary-amount text-right"><span class="color-grey" style="font-size: 80%"><?php echo $shop_currency ?></span> <span style="font-size: 140%; font-weight: 2000;"><?php echo str_replace( '{{amount}}', '<span id="grand_total">43.25</span>', $shop_money_format ) ?></span></h5>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="row page-row page-row-expanded" id="error-div" style="display: none;">
				<div class="col-md-7 col-eq-7 top-grey-border col-md-top" id="left-div" style="background-color: #fafafa;">
					<div id="left-div-content">
						<p>&nbsp;</p>
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
											<?php echo htmlspecialchars($thank_you_error_msg) ." Jon Snow!"; ?>
										</h2>
									</div>
								</div>
							</section>
							<section style="margin-top:2em">
								<div class="content_map">
									<iframe width="100%" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.co.uk/maps?f=q&source=s_q&hl=en&geocode=&q=,  &aq=t&sll=52.8382,-2.327815&sspn=8.047465,13.666992&ie=UTF8&hq=&hnear=, &t=m&z=14&ll=&output=embed"></iframe>
									<!-- <img src="map.png" height="200px";> -->
								</div>
								<div class="content_row" style="border-radius:0 0 4px 4px;">
									<h2 class="content_step_title"><?php echo htmlspecialchars($order_confirm_error_title); ?></h2>
									<p><?php echo htmlspecialchars($order_confirm_error_field); ?></p>
								</div>
								<div class="content_row">
									<h2 class="content_step_title"><?php echo htmlspecialchars($customer_info);?></h2>
									<div  class="content_customer_info_col">
										<h3><?php echo htmlspecialchars($shipping_address);?></h3>
										<p>Jon Snow <br>House of stark<br> Winterfell<br>Seven kingdoms</p>
										<h3><?php echo htmlspecialchars($shipping_method_title); ?></h3>
										<p><?php echo htmlspecialchars($standard_shipping_title); ?></p>
									</div >
									<div class="content_customer_info_col">
										<h3><?php echo htmlspecialchars($billing_address_title); ?></h3>
											<p>Jon Snow <br>House of stark<br> Winterfell<br>Seven kingdoms</p>
											<h3><?php echo htmlspecialchars($payment_method_title); ?></h3>
										<ul>
											<li>
												<span><?php echo htmlspecialchars($payment_method_msg); ?> 1 — <?php echo str_replace("{{amount}}", "43.25", $shop_money_format);?></span>
											</li>
										</ul>
									</div>
								</div>
								

								<div class="content_footer">
									<div class="footer_for_big_screen">
										<a aria-disabled="true" href="<?php echo $full_shop_url; ?>" class="btn btn-danger btn-lg pull-right"><span class="glyphicon glyphicon-arrow-left" style="color: white;"></span> <?php echo $go_back_and_fix; ?></a>
										<p>
											<i class="content_footer_icon" style="background-image: url(//cdn.shopify.com/s/assets/checkout/order-status-question-a3616b3b5a5202afce3a5f8b996993cb977237cb96bba32238b94bbd891a562b.svg),none;"></i>
											<span>
											  <?php echo $need_help; ?>
											  <a href="<?php echo $contact_us_url; ?>"><?php echo $contact_us; ?></a>
											</span>
										</p>
									</div>
									<div class="footer_for_small_screen">
										<a href="<?php echo $full_shop_url; ?>" aria-disabled="true" class="btn btn-info btn-lg btn-block"><span class="glyphicon glyphicon-arrow-left" style="color: white;"></span><?php echo $go_back_and_fix; ?></a>
										<p>
											<i class="content_footer_icon" style="background-image: url(//cdn.shopify.com/s/assets/checkout/order-status-question-a3616b3b5a5202afce3a5f8b996993cb977237cb96bba32238b94bbd891a562b.svg),none;"></i>
											<span>
											  <?php echo $need_help; ?> <a href="<?php echo $contact_us_url; ?>"><?php echo $contact_us; ?></a>
											</span>
										</p>
									</div>
								</div>
							</section>
						</div>


						<input type="hidden" id="shipping_country" value="">
						<input type="hidden" id="shipping_province" value="">
						<div style="margin: 10px;">&nbsp;</div>
					</div>
				</div>

				<div class="col-md-5 col-eq-5 col-md-middle top-grey-border" id="right-div" style="background-color: #fafafa;">
					<div id="right-div-content">
						<div id="right-div-content">
							<div id="order_summary_command">
								<div class="row">
									<div class="col-xs-8 text-left">
										<h4>
											<a href="#" id="order-display-commander" onclick="toggle_order_summary(); return false;">
												<i class="glyphicon glyphicon-shopping-cart"></i>
												<span id="show_or_hide">Show order summary <i class="glyphicon glyphicon-chevron-down"></i></span>
											</a>
										</h4>
									</div>
									<div class="col-xs-4 text-right">
										<h4 id="summary_grand_total" class="text-right">
										<?php echo str_replace( '{{amount}}', '<span id="order_summary_grand_total">43.25</span>', $shop_money_format ) ?></h4>
									</div>
								</div>
							</div>

							<div id="order_summary">
								<table class="order_summary">
									<tbody>
										<tr>
											<th width="10%"></th>
											<th width="35%"></th>
											<th width="35%"></th>
											<th width="20%"></th>
										</tr>
										<tr>
											<td>
												<div class="image-minimum-width">

													<div class="product__image">
													    <div class="product-thumbnail">
													  		<div class="product-thumbnail__wrapper">
													    			<img alt="case - Gloss / Single" class="product-thumbnail__image" src="https://cdn.shopify.com/s/files/1/0949/0302/products/rise-and-grind.png?v=1488091848">
													  		</div>
													    	<span class="product-thumbnail__quantity" aria-hidden="true">1</span>
														</div>
													</div>
												</div>
											</td>
											<td colspan="2" align="left">
												<strong>"Rise And Grind" Men's Tees & Tanks</strong>
												<p class="color-more-grey">
													Custom Ultra Cotton T-Shirt / Red / Small
												</p>
											</td>
											<td align="right" width="40%">
												<?php echo str_replace( '{{amount}}', '24.00', $shop_money_format ) ?>
											</td>
										</tr>										
										<tr class="top-grey-border">
											<td colspan="2" align="left">
												<h5 class="color-more-grey">Subtotal</h5>
											</td>
											<td align="right" colspan="2">
												<input type="hidden" id="init_subtotal_amount_" value="24.00">
												<?php echo str_replace( '{{amount}}', '24.00', $shop_money_format ) ?>
											</td>
										</tr>
										<tr>
											<td colspan="2" align="left">
												<h5 class="color-more-grey">Shipping</h5>
												<input type="hidden" id="saved_shipping_cost" value="10.00">
											</td>
											<td id="shipping_total" align="right" colspan="2">
												<?php echo str_replace( '{{amount}}', '10.00', $shop_money_format ) ?>									
											</td>
										</tr>
										<tr style="">
											<td colspan="2" align="left">
												<h5 class="color-more-grey">Taxes</h5>
											</td>
											<td align="right" colspan="2">
												<?php echo str_replace( '{{amount}}', '<span id="tax_total">9.25</span>', $shop_money_format ) ?>			
											</td>
										</tr>
										<tr class="top-grey-border">
											<td colspan="2" align="left">
												<h4>Total</h4>
											</td>
											<td align="right" colspan="2">
												<h5 class="summary-amount text-right"><span class="color-grey" style="font-size: 80%"><?php echo $shop_currency ?></span> <span style="font-size: 140%; font-weight: 2000;"><?php echo str_replace( '{{amount}}', '<span id="grand_total">43.25</span>', $shop_money_format ) ?></span></h5>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
						<div class="alert alert-danger payment_failed_msg">
							<?php echo $payment_error_msg; ?>
						</div>
					</div>
				</div>
			</div>
			
			<div class="row page-row" style="height:0;" id="payment-div-footer">
                <div class="col-md-7 col-eq-7 col-md-top" style="background-color: #fafafa;">
                    <div id="left-div-content">
                        <div style="margin: 10px;">&nbsp;</div>
                            <hr style="margin: 0px">
                        <div class="payment_footer">
                            <p style="color:#eb2121 ; font-size: 0.85714em; margin-top: 5px;">All rights reserved 
                            	<?php 
									echo $shop_name;
								?>
							</p>                        
                        </div>
                    </div>
                </div>
                <div class="col-md-5 col-eq-5 col-md-middle" id="payment-footer-right-div" style="background-color: #fafafa;">
                </div>
            </div>

		</form>

		<div id="supplement_product_display"></div>

		<div class="loading" id="loading_graphics">Loading&#8230;</div>
		
		<input type="hidden" id="shop_currency" value="<?php echo $shop_currency ?>">
		<input type="hidden" name="facebook_pixel_id" id="facebook_pixel_id" value="123456">

		
	</body>
	<script type="text/javascript">
		function select_preview(show) {
			//var show = document.getElementById('selector').value;
			if(show == 'error-div'){
				console.log(show);
				$('#payment-div').fadeOut('fast');
				$('#error-div').fadeIn('slow');
				$('.vertical-text2').css("background-color","#dc4b4b");
				$('.vertical-text').css("background-color","#79b17b");
			}else{
				console.log(show);
				$('#error-div').fadeOut('fast');
				$('#payment-div').fadeIn('slow');
				$('.vertical-text').css("background-color","#51ab54");
				$('.vertical-text2').css("background-color","#d47979");
			}
		}
	</script>
</html>
