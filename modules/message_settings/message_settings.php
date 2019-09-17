<?php
heading();
$shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];
$shop_domain = get_shop_meta( $shop_id, 'shop_domain');
$force_ssl = get_shop_meta( $shop_id, 'force_ssl');
$full_shop_url= ( $force_ssl > 0 ? 'https://' : 'http://' ) . $shop_domain;
$msg_array = get_msg_val();
?>

<div class="clearfix"></div>
<div class="row">
  	<div class="col-md-12 col-sm-12 col-xs-12">
    	<div class="x_panel">
      		<div class="x_title">
        		<h3>Message settings</h3>
        		<div class="clearfix"></div>
      		</div>
      		<div class="x_content">
        		<form action="<?php echo BASE ?>/message_settings/?process=translator_settings" id="demo-form2" data-parsley-validate class="form-horizontal form-label-left" method="post">
                    <!-- tab start -->
                    <div class="accordion" id="accordion" role="tablist" aria-multiselectable="true">
                        <!-- Verient Messages -->
                        <div class="panel">
                            <a class="panel-heading" style="text-align: left; background-color: #EDEDED;" role="tab" id="variant_msg_1" data-toggle="collapse" data-parent="#accordion" href="#variant_msg" aria-expanded="true" aria-controls="variant_msg">
                                <h4 class="panel-title">Variant messages</h4>
                            </a>
                            <div id="variant_msg" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="variant_msg_1" aria-expanded="true">
                                <div class="panel-body">
                                    <div class="form-group">
                                        <label for="product_available_field" class="col-sm-3 control-label" style="text-align: left;">Product available message</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="product_available" name="product_available" value='<?php echo $msg_array["product_available"];?>'>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="out_of_stock_field" class="col-sm-3 control-label" style="text-align: left;">Out of stock message</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="out_of_stock" name="out_of_stock" value="<?php echo $msg_array['out_of_stock'];?>">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- cart -->
                        <div class="panel">
                            <a class="panel-heading collapsed" style="text-align: left; background-color: #EDEDED;" role="tab" id="cart_msg_1" data-toggle="collapse" data-parent="#accordion" href="#cart_msg" aria-expanded="false" aria-controls="cart_msg">
                                <h4 class="panel-title">Cart details messages</h4>
                            </a>
                            <div id="cart_msg" class="panel-collapse collapse" role="tabpanel" aria-labelledby="cart_msg_1" aria-expanded="false">
                                <div class="panel-body">
                                    <div class="form-group">
                                        <label for="cart_empty_msg_field" class="col-sm-3 control-label" style="text-align: left;">Cart empty message</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="cart_empty_msg" name="cart_empty_msg" value="<?php echo $msg_array['cart_empty_msg'];?>">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="cart_subtotal_field" class="col-sm-3 control-label" style="text-align: left;">Cart Subtotal</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="cart_subtotal" name="cart_subtotal" value="<?php echo $msg_array['cart_subtotal'];?>">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="cart_shipping_field" class="col-sm-3 control-label" style="text-align: left;">Cart Shipping</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="cart_shipping" name="cart_shipping" value="<?php echo $msg_array['cart_shipping'];?>">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="cart_taxes_field" class="col-sm-3 control-label" style="text-align: left;">Cart taxes</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="cart_taxes" name="cart_taxes" value="<?php echo $msg_array['cart_taxes'];?>">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="cart_total_field" class="col-sm-3 control-label" style="text-align: left;">Cart total</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="cart_total" name="cart_total" value="<?php echo $msg_array['cart_total'];?>">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="cart_total_field" class="col-sm-3 control-label" style="text-align: left;">Cart tax message</label>
                                        <div class="col-sm-9">
                                            <label for="cart_total_field" class="col-sm-2 control-label" style="text-align: left;">Cart tax prefix</label>
                                            <div class="col-sm-4">
                                                <input type="text" onkeyup="cart_tax_preview()" class="form-control" id="cart_tax_prefix" name="cart_tax_prefix" value="<?php echo $msg_array['cart_tax_prefix'];?>">
                                            </div>
                                            <label for="cart_total_field" class="col-sm-2 control-label" style="text-align: left;">Cart tax suffix</label>
                                            <div class="col-sm-4">
                                                <input type="text" onkeyup="cart_tax_preview()" class="form-control" id="cart_tax_suffix" name="cart_tax_suffix" value="<?php echo $msg_array['cart_tax_suffix'];?>">
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label id="cart_tax_preview" class="col-sm-9 col-sm-offset-3" style="text-align: left;"><?php echo $msg_array['cart_tax_prefix'].' $100 '.$msg_array['cart_tax_suffix'];?></label>
                                    </div>
                                    <div class="form-group">
                                        <label for="show_order_summary_field" class="col-sm-3 control-label" style="text-align: left;">Show order field</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="show_order_summary" name="show_order_summary" value="<?php echo $msg_array['show_order_summary'];?>">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="hide_order_summary_field" class="col-sm-3 control-label" style="text-align: left;">Hide order field</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="hide_order_summary" name="hide_order_summary" value="<?php echo $msg_array['hide_order_summary'];?>">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="cart_bump_popup_title_field" class="col-sm-3 control-label" style="text-align: left;">Cart bump pop-up title</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="cart_bump_popup_title" name="cart_bump_popup_title" value="<?php echo $msg_array['cart_bump_popup_title'];?>">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="cart_bump_add_to_cart_btn_field" class="col-sm-3 control-label" style="text-align: left;">Cart bump add to cart (Button)</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="cart_bump_add_to_cart_btn" name="cart_bump_add_to_cart_btn" value="<?php echo $msg_array['cart_bump_add_to_cart_btn'];?>">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="cart_bump_cancel_btn_field" class="col-sm-3 control-label" style="text-align: left;">Cart bump cancel (Button)</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="cart_bump_cancel_btn" name="cart_bump_cancel_btn" value="<?php echo $msg_array['cart_bump_cancel_btn'];?>">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Shipping and Billing from -->
                        <div class="panel">
                            <a class="panel-heading collapsed" style="text-align: left; background-color: #EDEDED;" role="tab" id="shipping_and_billing_msg1" data-toggle="collapse" data-parent="#accordion" href="#shipping_and_billing_msg" aria-expanded="false" aria-controls="shipping_and_billing_msg">
                                <h4 class="panel-title">Shipping and billing form messages</h4>
                            </a>
                            <div id="shipping_and_billing_msg" class="panel-collapse collapse" role="tabpanel" aria-labelledby="shipping_and_billing_msg1" aria-expanded="false">
                                <div class="panel-body">
                                    <div class="form-group">
                                        <label for="shipping_error_field" class="col-sm-3 control-label" style="text-align: left;">Shipping method error message</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="error_shipping_method" name="error_shipping_method" value="<?php echo $msg_array['error_shipping_method'];?>">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="shipping_error2_field" class="col-sm-3 control-label" style="text-align: left;">No shipping method error message</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="error_shipping_method2" name="error_shipping_method2" value="<?php echo $msg_array['error_shipping_method2'];?>">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="email_field" class="col-sm-3 control-label" style="text-align: left;">Email placeholder</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="default_email_placeholder" name="default_email_placeholder" value="<?php echo $msg_array['default_email_placeholder'];?>">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="email_error_field" class="col-sm-3 control-label" style="text-align: left;">Email error message</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="error_shipping_form_email" name="error_shipping_form_email" value="<?php echo $msg_array['error_shipping_form_email'];?>">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="first_name_field" class="col-sm-3 control-label" style="text-align: left;">First name placeholder</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="default_first_name_placeholder" name="default_first_name_placeholder" value="<?php echo $msg_array['default_first_name_placeholder'];?>">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="last_name_field" class="col-sm-3 control-label" style="text-align: left;">Last name placeholder</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="default_last_name_placeholder" name="default_last_name_placeholder" value="<?php echo $msg_array['default_last_name_placeholder'];?>">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="last_name_error_field" class="col-sm-3 control-label" style="text-align: left;">Last name error message</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="error_shipping_last_name" name="error_shipping_last_name" value="<?php echo $msg_array['error_shipping_last_name'];?>">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="phone_field" class="col-sm-3 control-label" style="text-align: left;">Phone Placeholder</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="default_phone_placeholder" name="default_phone_placeholder" value="<?php echo $msg_array['default_phone_placeholder'];?>">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="apt_field" class="col-sm-3 control-label" style="text-align: left;">Apt Placeholder</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="default_apt_placeholder" name="default_apt_placeholder" value="<?php echo $msg_array['default_apt_placeholder'];?>">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="address_field" class="col-sm-3 control-label" style="text-align: left;">Address Placeholder</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="default_address_placeholder" name="default_address_placeholder" value="<?php echo $msg_array['default_address_placeholder'];?>">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="address_error_field" class="col-sm-3 control-label" style="text-align: left;">Address error message</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="error_shipping_address" name="error_shipping_address" value="<?php echo $msg_array['error_shipping_address'];?>">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="city_field" class="col-sm-3 control-label" style="text-align: left;">City placeholder</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="default_city_placeholder" name="default_city_placeholder" value="<?php echo $msg_array['default_city_placeholder'];?>">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="city_error_field" class="col-sm-3 control-label" style="text-align: left;">City error message</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="error_shipping_city" name="error_shipping_city" value="<?php echo $msg_array['error_shipping_city'];?>">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="country_error_field" class="col-sm-3 control-label" style="text-align: left;">Country error message</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="error_shipping_country" name="error_shipping_country" value="<?php echo $msg_array['error_shipping_country'];?>">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="province_error_field" class="col-sm-3 control-label" style="text-align: left;">Province error message</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="error_shipping_province" name="error_shipping_province" value="<?php echo $msg_array['error_shipping_province'];?>">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="zip_code_field" class="col-sm-3 control-label" style="text-align: left;">Zip code placeholder</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="default_postal_code_placeholder" name="default_postal_code_placeholder" value="<?php echo $msg_array['default_postal_code_placeholder'];?>">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="zip_code_error_field" class="col-sm-3 control-label" style="text-align: left;">Zip code error message</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="error_shipping_postal_code" name="error_shipping_postal_code" value="<?php echo $msg_array['error_shipping_postal_code'];?>">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="save_this_information_for_next_time_field" class="col-sm-3 control-label" style="text-align: left;">Save this information for next time (Check box)</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="save_this_information_for_next_time" name="save_this_information_for_next_time" value="<?php echo $msg_array['save_this_information_for_next_time'];?>">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="continue_to_shipping_method_field" class="col-sm-3 control-label" style="text-align: left;">Continue to shipping method (Button)</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="continue_to_shipping_method" name="continue_to_shipping_method" value="<?php echo $msg_array['continue_to_shipping_method'];?>">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="edit_shipping_address_field" class="col-sm-3 control-label" style="text-align: left;">Edit shipping address</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="edit_shipping_address" name="edit_shipping_address" value="<?php echo $msg_array['edit_shipping_address'];?>">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="return_to_customer_information_field" class="col-sm-3 control-label" style="text-align: left;">Return to customer information</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="return_to_customer_information" name="return_to_customer_information" value="<?php echo $msg_array['return_to_customer_information'];?>">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="continue_to_payment_method_field" class="col-sm-3 control-label" style="text-align: left;">Continue to payment method (Button)</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="continue_to_payment_method" name="continue_to_payment_method" value="<?php echo $msg_array['continue_to_payment_method'];?>">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="same_as_shipping_address_field" class="col-sm-3 control-label" style="text-align: left;">Same as shipping address (Radio button)</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="same_as_shipping_address" name="same_as_shipping_address" value="<?php echo $msg_array['same_as_shipping_address'];?>">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="use_a_different_billing_address_field" class="col-sm-3 control-label" style="text-align: left;">Different billing address message (Radio button)</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="use_a_different_billing_address" name="use_a_different_billing_address" value="<?php echo $msg_array['use_a_different_billing_address'];?>">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="subscribe_to_our_newsletter_field" class="col-sm-3 control-label" style="text-align: left;">Newsletter subsription message (Check box)</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="subscribe_to_our_newsletter" name="subscribe_to_our_newsletter" value="<?php echo $msg_array['subscribe_to_our_newsletter'];?>">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="return_to_shipping_method_field" class="col-sm-3 control-label" style="text-align: left;">Return to shipping method message</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="return_to_shipping_method" name="return_to_shipping_method" value="<?php echo $msg_array['return_to_shipping_method'];?>">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="return_to_cart_field" class="col-sm-3 control-label" style="text-align: left;">Return to cart</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="return_to_cart" name="return_to_cart" value="<?php echo $msg_array['return_to_cart'];?>">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Card Data-->
                        <div class="panel">
                            <a class="panel-heading collapsed" style="text-align: left; background-color: #EDEDED;" role="tab" id="card_data_msg1" data-toggle="collapse" data-parent="#accordion" href="#card_data_msg" aria-expanded="false" aria-controls="card_data_msg">
                                <h4 class="panel-title">Card data messages</h4>
                            </a>
                            <div id="card_data_msg" class="panel-collapse collapse" role="tabpanel" aria-labelledby="card_data_msg1" aria-expanded="false">
                                <div class="panel-body">
                                    <div class="form-group">
                                        <label for="billing_error_field" class="col-sm-3 control-label" style="text-align: left;">Billing info error message</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="card_messager_for_checkout_form" name="card_messager_for_checkout_form" value="<?php echo $msg_array['card_messager_for_checkout_form'];?>">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="card_details_msg_field" class="col-sm-3 control-label" style="text-align: left;">Card details message</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="" name="card_details_msg" value="<?php echo $msg_array['card_details_msg'];?>">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="default_credit_card_placeholder_field" class="col-sm-3 control-label" style="text-align: left;">Credit card placeholder</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="default_credit_card_placeholder" name="default_credit_card_placeholder" value="<?php echo $msg_array['default_credit_card_placeholder'];?>">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="default_exp_year_placeholder_field" class="col-sm-3 control-label" style="text-align: left;">Card exp year placeholder</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="default_exp_year_placeholder" name="default_exp_year_placeholder" value="<?php echo $msg_array['default_exp_year_placeholder'];?>">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="default_exp_month_placeholder_field" class="col-sm-3 control-label" style="text-align: left;">Card exp month placeholder</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="default_exp_month_placeholder" name="default_exp_month_placeholder" value="<?php echo $msg_array['default_exp_month_placeholder'];?>">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="default_cvv_placeholder_field" class="col-sm-3 control-label" style="text-align: left;">Card cvv placeholder</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="default_cvv_placeholder" name="default_cvv_placeholder" value="<?php echo $msg_array['default_cvv_placeholder'];?>">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="paypal_msg_field" class="col-sm-3 control-label" style="text-align: left;">PayPal description</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="paypal_msg" name="paypal_msg" value="<?php echo $msg_array['paypal_msg'];?>">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="complete_order_field" class="col-sm-3 control-label" style="text-align: left;">Complete order (Button)</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="complete_order" name="complete_order" value="<?php echo $msg_array['complete_order'];?>">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Opt-in -->
                        <div class="panel">
                            <a class="panel-heading collapsed" style="text-align: left; background-color: #EDEDED;" role="tab" id="opt_in_msg1" data-toggle="collapse" data-parent="#accordion" href="#opt_in_msg" aria-expanded="false" aria-controls="opt_in_msg">
                                <h4 class="panel-title">Opt-in form messages</h4>
                            </a>
                            <div id="opt_in_msg" class="panel-collapse collapse" role="tabpanel" aria-labelledby="opt_in_msg1" aria-expanded="false">
                                <div class="panel-body">
                                    <div class="form-group">
                                        <label for="opt_success_field" class="col-sm-3 control-label" style="text-align: left;">Success message</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="opt_in_message_success" name="opt_in_message_success" value='<?php echo $msg_array["opt_in_message_success"];?>'>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="opt_in_invalid_email_field" class="col-sm-3 control-label" style="text-align: left;">Invalid email message</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="opt_in_invalid_email" name="opt_in_invalid_email" value='<?php echo $msg_array["opt_in_invalid_email"];?>'>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Checkout page title -->
                        <div class="panel">
                            <a class="panel-heading collapsed" style="text-align: left; background-color: #EDEDED;" role="tab" id="checkout_page_title1" data-toggle="collapse" data-parent="#accordion" href="#checkout_page_title" aria-expanded="false" aria-controls="checkout_page_title">
                                <h4 class="panel-title">Checkout page title</h4>
                            </a>
                            <div id="checkout_page_title" class="panel-collapse collapse" role="tabpanel" aria-labelledby="checkout_page_title1" aria-expanded="false">
                                <div class="panel-body">
                                    <div class="form-group">
                                        <label for="cart_field" class="col-sm-3 control-label" style="text-align: left;">Cart</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="cart" name="cart" value='<?php echo $msg_array["cart"];?>'>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="customer_information_field" class="col-sm-3 control-label" style="text-align: left;">Customer information</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="customer_information" name="customer_information" value='<?php echo $msg_array["customer_information"];?>'>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="shipping_information_field" class="col-sm-3 control-label" style="text-align: left;">Shipping information</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="shipping_information" name="shipping_information" value='<?php echo $msg_array["shipping_information"];?>'>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="shipping_method_field" class="col-sm-3 control-label" style="text-align: left;">Shipping method</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="shipping_method" name="shipping_method" value='<?php echo $msg_array["shipping_method"];?>'>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="payment_method_field" class="col-sm-3 control-label" style="text-align: left;">Payment method</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="payment_method" name="payment_method" value='<?php echo $msg_array["payment_method"];?>'>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="billing_information_field" class="col-sm-3 control-label" style="text-align: left;">Billing Address</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="billing_information" name="billing_information" value='<?php echo $msg_array["billing_information"];?>'>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </div>
                        <!-- Redirecting to checkout messages -->
                        <div class="panel">
                            <a class="panel-heading collapsed" style="text-align: left; background-color: #EDEDED;" role="tab" id="redirecting_msg1" data-toggle="collapse" data-parent="#accordion" href="#redirecting_msg" aria-expanded="false" aria-controls="redirecting_msg">
                                <h4 class="panel-title">Redirecting to checkout messages</h4>
                            </a>
                            <div id="redirecting_msg" class="panel-collapse collapse" role="tabpanel" aria-labelledby="redirecting_msg1" aria-expanded="false">
                                <div class="panel-body">
                                    <div class="form-group">
                                        <label for="redirecting_to_checkout_msg_field" class="col-sm-3 control-label" style="text-align: left;">Redirecting to checkout message</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="redirecting_to_checkout_msg" name="redirecting_to_checkout_msg" value='<?php echo $msg_array["redirecting_to_checkout_msg"];?>'>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="do_not_reload_msg_field" class="col-sm-3 control-label" style="text-align: left;">Do not reload message</label>
                                        <div class="col-sm-9">
                                            <input type="text" class="form-control" id="do_not_reload_msg" name="do_not_reload_msg" value='<?php echo $msg_array["do_not_reload_msg"];?>'>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Button -->
	          		<div class="ln_solid"></div>
	          		<div class="form-group">
	            		<div class="col-md-12 col-sm-12 col-xs-12">
	              			<button type="submit" name="update" class="btn btn-primary pull-right">Update</button>
	                        <button type="submit" class="btn btn-danger pull-right" name="reset">Reset to default</button>
	            		</div>
	          		</div>

        		</form>
        	</div>
    	</div>
  	</div>
</div>

<script>
    function cart_tax_preview(){
        document.getElementById('cart_tax_preview').innerHTML = document.getElementById('cart_tax_prefix').value+' $100 '+document.getElementById('cart_tax_suffix').value; 
    }
</script>

<?php
function process_translator_settings(){
    $msg_array;
    $default = msg_default_value();
    $shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];

    if(isset($_POST['update'])){
        $msg_array = array(
            'product_available' => empty($_POST['product_available']) ? $default['product_available'] : format_string($_POST['product_available']),
            'out_of_stock' => empty($_POST['out_of_stock']) ? $default['out_of_stock'] : format_string($_POST['out_of_stock']),
            'cart_empty_msg' => empty($_POST['cart_empty_msg']) ? $default['cart_empty_msg'] : format_string($_POST['cart_empty_msg']),
            'error_shipping_method' => empty($_POST['error_shipping_method']) ? $default['error_shipping_method'] : format_string($_POST['error_shipping_method']),
            'error_shipping_form_email' => empty($_POST['error_shipping_form_email']) ? $default['error_shipping_form_email'] : format_string($_POST['error_shipping_form_email']),
            'error_shipping_last_name' => empty($_POST['error_shipping_last_name']) ? $default['error_shipping_last_name'] : format_string($_POST['error_shipping_last_name']),
            'error_shipping_address' => empty($_POST['error_shipping_address']) ? $default['error_shipping_address'] : format_string($_POST['error_shipping_address']),
            'error_shipping_city' => empty($_POST['error_shipping_city']) ? $default['error_shipping_city'] : format_string($_POST['error_shipping_city']),
            'error_shipping_country' => empty($_POST['error_shipping_country']) ? $default['error_shipping_country'] : format_string($_POST['error_shipping_country']),
            'error_shipping_province' => empty($_POST['error_shipping_province']) ? $default['error_shipping_province'] : format_string($_POST['error_shipping_province']),
            'error_shipping_postal_code' => empty($_POST['error_shipping_postal_code']) ? $default['error_shipping_postal_code'] : format_string($_POST['error_shipping_postal_code']),
            'card_messager_for_checkout_form' => empty($_POST['card_messager_for_checkout_form']) ? $default['card_messager_for_checkout_form'] : format_string($_POST['card_messager_for_checkout_form']),
            'opt_in_message_success' => empty($_POST['opt_in_message_success']) ? $default['opt_in_message_success'] : format_string($_POST['opt_in_message_success']),
            'opt_in_invalid_email' => empty($_POST['opt_in_invalid_email']) ? $default['opt_in_invalid_email'] : format_string($_POST['opt_in_invalid_email']),
            'error_shipping_method2' => empty($_POST['error_shipping_method2']) ? $default['error_shipping_method2'] : format_string($_POST['error_shipping_method2']),
            'card_details_msg' => empty($_POST['card_details_msg']) ? $default['card_details_msg'] : format_string($_POST['card_details_msg']),
            'paypal_msg' => empty($_POST['paypal_msg']) ? $default['paypal_msg'] : format_string($_POST['paypal_msg']),
            'cart_subtotal' => empty($_POST['cart_subtotal']) ? $default['cart_subtotal'] : format_string($_POST['cart_subtotal']),
            'cart_shipping' => empty($_POST['cart_shipping']) ? $default['cart_shipping'] : format_string($_POST['cart_shipping']),
            'cart_taxes' => empty($_POST['cart_taxes']) ? $default['cart_taxes'] : format_string($_POST['cart_taxes']),
            'cart_total' => empty($_POST['cart_total']) ? $default['cart_total'] : format_string($_POST['cart_total']),
            'default_first_name_placeholder' => empty($_POST['default_first_name_placeholder']) ? $default['default_first_name_placeholder'] : format_string($_POST['default_first_name_placeholder']),
            'default_last_name_placeholder' => empty($_POST['default_last_name_placeholder']) ? $default['default_last_name_placeholder'] : format_string($_POST['default_last_name_placeholder']),
            'default_address_placeholder' => empty($_POST['default_address_placeholder']) ? $default['default_address_placeholder'] : format_string($_POST['default_address_placeholder']),
            'default_apt_placeholder' => empty($_POST['default_apt_placeholder']) ? $default['default_apt_placeholder'] : format_string($_POST['default_apt_placeholder']),
            'default_city_placeholder' => empty($_POST['default_city_placeholder']) ? $default['default_city_placeholder'] : format_string($_POST['default_city_placeholder']),
            'default_postal_code_placeholder' => empty($_POST['default_postal_code_placeholder']) ? $default['default_postal_code_placeholder'] : format_string($_POST['default_postal_code_placeholder']),
            'default_email_placeholder' => empty($_POST['default_email_placeholder']) ? $default['default_email_placeholder'] : format_string($_POST['default_email_placeholder']),
            'default_phone_placeholder' => empty($_POST['default_phone_placeholder']) ? $default['default_phone_placeholder'] : format_string($_POST['default_phone_placeholder']),
            'default_credit_card_placeholder' => empty($_POST['default_credit_card_placeholder']) ? $default['default_credit_card_placeholder'] : format_string($_POST['default_credit_card_placeholder']),
            'default_exp_year_placeholder' => empty($_POST['default_exp_year_placeholder']) ? $default['default_exp_year_placeholder'] : format_string($_POST['default_exp_year_placeholder']),
            'default_exp_month_placeholder' => empty($_POST['default_exp_month_placeholder']) ? $default['default_exp_month_placeholder'] : format_string($_POST['default_exp_month_placeholder']),
            'default_cvv_placeholder' => empty($_POST['default_cvv_placeholder']) ? $default['default_cvv_placeholder'] : format_string($_POST['default_cvv_placeholder']),
            'save_this_information_for_next_time' => empty($_POST['save_this_information_for_next_time']) ? $default['save_this_information_for_next_time'] : format_string($_POST['save_this_information_for_next_time']),
            'return_to_cart' => empty($_POST['return_to_cart']) ? $default['return_to_cart'] : format_string($_POST['return_to_cart']),
            'continue_to_shipping_method' => empty($_POST['continue_to_shipping_method']) ? $default['continue_to_shipping_method'] : format_string($_POST['continue_to_shipping_method']),
            'show_order_summary' => empty($_POST['show_order_summary']) ? $default['show_order_summary'] : format_string($_POST['show_order_summary']),
            'hide_order_summary' => empty($_POST['hide_order_summary']) ? $default['hide_order_summary'] : format_string($_POST['hide_order_summary']),
            'edit_shipping_address' => empty($_POST['edit_shipping_address']) ? $default['edit_shipping_address'] : format_string($_POST['edit_shipping_address']),
            'return_to_customer_information' => empty($_POST['return_to_customer_information']) ? $default['return_to_customer_information'] : format_string($_POST['return_to_customer_information']),
            'continue_to_payment_method' => empty($_POST['continue_to_payment_method']) ? $default['continue_to_payment_method'] : format_string($_POST['continue_to_payment_method']),
            'same_as_shipping_address' => empty($_POST['same_as_shipping_address']) ? $default['same_as_shipping_address'] : format_string($_POST['same_as_shipping_address']),
            'use_a_different_billing_address' => empty($_POST['use_a_different_billing_address']) ? $default['use_a_different_billing_address'] : format_string($_POST['use_a_different_billing_address']),
            'subscribe_to_our_newsletter' => empty($_POST['subscribe_to_our_newsletter']) ? $default['subscribe_to_our_newsletter'] : format_string($_POST['subscribe_to_our_newsletter']),
            'return_to_shipping_method' => empty($_POST['return_to_shipping_method']) ? $default['return_to_shipping_method'] : format_string($_POST['return_to_shipping_method']),
            'complete_order' => empty($_POST['complete_order']) ? $default['complete_order'] : format_string($_POST['complete_order']),
            'cart' => empty($_POST['cart']) ? $default['cart'] : format_string($_POST['cart']),
            'customer_information' => empty($_POST['customer_information']) ? $default['customer_information'] : format_string($_POST['customer_information']),
            'shipping_method' => empty($_POST['shipping_method']) ? $default['shipping_method'] : format_string($_POST['shipping_method']),
            'payment_method' => empty($_POST['payment_method']) ? $default['payment_method'] : format_string($_POST['payment_method']),
            'billing_information' => empty($_POST['billing_information']) ? $default['billing_information'] : format_string($_POST['billing_information']),
            'shipping_information' => empty($_POST['shipping_information']) ? $default['shipping_information'] : format_string($_POST['shipping_information']),
            'redirecting_to_checkout_msg' => empty($_POST['redirecting_to_checkout_msg']) ? $default['redirecting_to_checkout_msg'] : format_string($_POST['redirecting_to_checkout_msg']),
            'do_not_reload_msg' => empty($_POST['do_not_reload_msg']) ? $default['do_not_reload_msg'] : format_string($_POST['do_not_reload_msg']),
            'cart_bump_popup_title' => empty($_POST['cart_bump_popup_title']) ? $default['cart_bump_popup_title'] : format_string($_POST['cart_bump_popup_title']),
            'cart_bump_add_to_cart_btn' => empty($_POST['cart_bump_add_to_cart_btn']) ? $default['cart_bump_add_to_cart_btn'] : format_string($_POST['cart_bump_add_to_cart_btn']),
            'cart_bump_cancel_btn' => empty($_POST['cart_bump_cancel_btn']) ? $default['cart_bump_cancel_btn'] : format_string($_POST['cart_bump_cancel_btn']),
            'cart_tax_suffix' => empty($_POST['cart_tax_suffix']) ? $default['cart_tax_suffix'] : format_string($_POST['cart_tax_suffix']),
            'cart_tax_prefix' => empty($_POST['cart_tax_prefix']) ? $default['cart_tax_prefix'] : format_string($_POST['cart_tax_prefix']),
            // '' => empty($_POST['']) ? $default[''] : format_string($_POST['']),
            // '' => empty($_POST['']) ? $default[''] : format_string($_POST['']),
            // '' => empty($_POST['']) ? $default[''] : format_string($_POST['']),
        );
    }else{
        $msg_array = $default;
    }
    add_shop_meta($shop_id, 'translator_settings',json_encode($msg_array));
    header('Location:'.BASE.'/message_settings');
}

function format_string($str){
    $str = trim($str);
    $str = str_replace('"', "&#39;", $str);
    $str = str_replace("'", "&#39;",$str);
    return $str;
}

footing();
?>