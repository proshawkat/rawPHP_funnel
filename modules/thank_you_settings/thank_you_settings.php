<?php 
    heading();

    $shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];
    $shop_domain = get_shop_meta( $shop_id, 'shop_domain');
	$force_ssl = get_shop_meta( $shop_id, 'force_ssl');
	$full_shop_url= ( $force_ssl > 0 ? 'https://' : 'http://' ) . $shop_domain;

?>
<div class="clearfix"></div>
<div class="row">
  	<div class="col-md-12 col-sm-12 col-xs-12">
    	<div class="x_panel">
      		<div class="x_title">
        		<h2>Thank you page settings</h2>                    
        		<div class="clearfix"></div>
      		</div>
      		<div class="x_content">
        		<br />
        		<form action="<?php echo BASE ?>/thank_you_settings/?process=thank_you_settings" id="demo-form2" data-parsley-validate class="form-horizontal form-label-left" method="post">

        			<?php
        				$thank_you_msg = get_shop_meta( $shop_id, 'thank_you_msg' );
        				$thank_you_msg = trim($thank_you_msg);
    					if( $thank_you_msg == '' ) { $thank_you_msg = 'Thank You'; }	

    					$thank_you_error_msg = get_shop_meta( $shop_id, 'thank_you_error_msg' );
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
        				if( $go_back_and_fix== '' ) { $go_back_and_fix = 'Go back and fix this'; }	
        			?>
	
				  	<div class="form-group">
				    	<label for="thank_you_message_field" class="col-sm-3 control-label" style="text-align: left;">Thank you message</label>
				    	<div class="col-sm-9">
				    		<input type="text" class="form-control" id="thank_you_msg" name="thank_you_msg" value="<?php echo htmlspecialchars($thank_you_msg); ?>" onkeyup="display_thank_you()">
				    		<p><span id="show_thank_you"></span> <b>Jon Snow !</b> </p>
						</div>
				  	</div>

				  	<div class="form-group">
				    	<label for="thank_you_error_message_field" class="col-sm-3 control-label" style="text-align: left;">Thank you error message</label>
				    	<div class="col-sm-9">
				    		<input type="text" class="form-control" id="thank_you_error_msg" name="thank_you_error_msg" value="<?php echo htmlspecialchars($thank_you_error_msg); ?>" onkeyup="display_thank_you_error()">
				    		<p><span id="show_thank_you_error"></span> <b> Jon Snow!</b> </p>
						</div>
				  	</div>



				  	<div class="form-group">
				    	<label for="order_confirm_title" class="col-sm-3 control-label" style="text-align: left;">Order confirmation title</label>
				    	<div class="col-sm-9">
				      		<input type="text" class="form-control" name="order_confirm_title" id="order_confirm_title" value="<?php echo htmlspecialchars($order_confirm_title);?>">
				    	</div>
				  	</div>

					<div class="form-group">
						<label for="order_confirm_field" class="col-sm-3 control-label" style="text-align: left">Order confirmation message</label>
						<div class="col-sm-9">
							<textarea name="order_confirm_field" id="order_confirm_field" class="form-control"><?php echo htmlspecialchars($order_confirm_field); ?></textarea>
						</div>
					</div>

					<div class="form-group">
				    	<label for="order_confirm_error_title" class="col-sm-3 control-label" style="text-align: left;">Order confirmation error title</label>
				    	<div class="col-sm-9">
				      		<input type="text" class="form-control" name="order_confirm_error_title" id="order_confirm_error_title" value="<?php echo htmlspecialchars($order_confirm_error_title);?>">
				    	</div>
				  	</div>

					<div class="form-group">
						<label for="order_confirm_error_field" class="col-sm-3 control-label" style="text-align: left">Order confirmation error message</label>
						<div class="col-sm-9">
							<textarea name="order_confirm_error_field" id="order_confirm_error_field" class="form-control"><?php echo htmlspecialchars($order_confirm_error_field); ?></textarea>
						</div>
					</div>

					<div class="form-group">
				    	<label for="order_update_title" class="col-sm-3 control-label" style="text-align: left;">Order updates title</label>
				    	<div class="col-sm-9">
				      		<input type="text" class="form-control" name="order_update_title" id="order_update_title" value="<?php echo htmlspecialchars($order_update_title);?>">
				    	</div>
				  	</div>


				  	<div class="form-group">
				    	<label for="order_update_msg" class="col-sm-3 control-label" style="text-align: left;">Order updates messages</label>
				    	<div class="col-sm-9">
				    		<input type="text" class="form-control" name="order_update_msg" id="order_update_msg" value="<?php echo htmlspecialchars($order_update_msg);?>"  onkeyup="display_order_message()">
				    		<p><span id="show_order_msg"></span> <b>jon_snow@gmail.com</b> </p>
				    	</div>
				  	</div>				  	

					<div class="form-group">
				    	<label for="customer_information" class="col-sm-3 control-label" style="text-align: left;">Customer information</label>
				    	<div class="col-sm-9">
				      		<input type="text" class="form-control" name="customer_info" id="customer_info" value="<?php echo htmlspecialchars($customer_info);?>">
				    	</div>
				  	</div>	

				  	<div class="form-group">
				    	<label for="customer_information" class="col-sm-3 control-label" style="text-align: left;">Shipping address title</label>
				    	<div class="col-sm-9">
				      		<input type="text" class="form-control" name="shipping_address" id="shipping_address" value="<?php echo htmlspecialchars($shipping_address);?>">
				    	</div>
				  	</div>

				  	<div class="form-group">
				    	<label for="shipping_method_title" class="col-sm-3 control-label" style="text-align: left;">Shipping method title</label>
				    	<div class="col-sm-9">
				      		<input type="text" class="form-control" name="shipping_method_title" id="shipping_method_title" value="<?php echo htmlspecialchars($shipping_method_title);?>">
				    	</div>
				  	</div>	

				  	<div class="form-group">
				    	<label for="billing_address_title" class="col-sm-3 control-label" style="text-align: left;">Billing address title</label>
				    	<div class="col-sm-9">
				      		<input type="text" class="form-control" name="billing_address_title" id="billing_address_title" value="<?php echo htmlspecialchars($billing_address_title);?>">
				    	</div>
				  	</div>	

				  	<div class="form-group">
				    	<label for="payment_method_title" class="col-sm-3 control-label" style="text-align: left;">Payment method title</label>
				    	<div class="col-sm-9">
				      		<input type="text" class="form-control" name="payment_method_title" id="payment_method_title" value="<?php echo htmlspecialchars($payment_method_title);?>">
				    	</div>
				  	</div>	

				  	<div class="form-group">
				    	<label for="payment_method_msg" class="col-sm-3 control-label" style="text-align: left;">Payment method messages</label>
				    	<div class="col-sm-9">
							  <input type="text" class="form-control" name="payment_method_msg" id="payment_method_msg" value="<?php echo htmlspecialchars($payment_method_msg);?>" onkeyup="display_payment_message()">
							  <p><span id="show_payment_msg"></span> <b>1 - <?php $shop_money_format = get_shop_meta( $shop_id, 'shop_money_format' ); echo str_replace("{{amount}}", "100", $shop_money_format);?></b> </p>
				    	</div>
				  	</div>

				  	<div class="form-group">
				    	<label for="need_help" class="col-sm-3 control-label" style="text-align: left;">Need help</label>
				    	<div class="col-sm-9">
				      		<input type="text" class="form-control" name="need_help" id="need_help" value="<?php echo htmlspecialchars($need_help);?>">
				    	</div>
				  	</div>	

				  	<div class="form-group">
				    	<label for="contact_us" class="col-sm-3 control-label" style="text-align: left;">Contact us</label>
				    	<div class="col-sm-9">
				      		<input type="text" class="form-control" name="contact_us" id="contact_us" value="<?php echo htmlspecialchars($contact_us);?>">
				    	</div>
				  	</div>	

					<div class="form-group">
						<label for="contact_us_url" class="col-sm-3 control-label" style="text-align: left;">Contact us url</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" name="contact_us_url" id="contact_us_url" value="<?php echo htmlspecialchars($contact_us_url);?>">
						</div>
					</div>	

				  	<div class="form-group">
				    	<label for="continue_shopping" class="col-sm-3 control-label" style="text-align: left;">Continue Shopping</label>
				    	<div class="col-sm-9">
				      		<input type="text" class="form-control" name="continue_shopping" id="continue_shopping" value="<?php echo htmlspecialchars($continue_shopping);?>">
				    	</div>
				  	</div>

				  	<div class="form-group">
				    	<label for="payment_error_msg" class="col-sm-3 control-label" style="text-align: left;">Payment error message</label>
				    	<div class="col-sm-9">
				      		<input type="text" class="form-control" name="payment_error_msg" id="payment_error_msg" value="<?php echo htmlspecialchars($payment_error_msg);?>">
				    	</div>
				  	</div>

				  	<div class="form-group">
				    	<label for="go_back_and_fix" class="col-sm-3 control-label" style="text-align: left;">Go back and fix</label>
				    	<div class="col-sm-9">
				      		<input type="text" class="form-control" name="go_back_and_fix" id="go_back_and_fix" value="<?php echo htmlspecialchars($go_back_and_fix);?>">
				    	</div>
				  	</div>	

	          		<div class="ln_solid"></div>
	          		<div class="form-group">
	            		<div class="col-md-12 col-sm-12 col-xs-12">
	              			<button type="submit" name="update" class="btn btn-primary pull-right">Update</button>
	                          <a class="btn btn-primary pull-right" style="background-color: #5cb85c ; border-color: #5cb85c ;" target="_blank" href="<?php echo  BASE;?>/thankyou_page_preview">Preview</a>
	                          <button type="submit" class="btn btn-danger pull-right" name="reset">Reset to default</button>
	            		</div>
	          		</div>
        		</form>
        	</div>
    	</div>
  	</div>
</div>

<!-- <textarea id="thank_you_msg_data" style="display: none;"><?php echo $shop_meta; ?></textarea>	 -->

<script>
	// set_fields();
	display_thank_you();
	display_thank_you_error();
	display_order_message();
	display_payment_message();
	

	function display_thank_you() {
	    document.getElementById("show_thank_you").innerHTML = document.getElementById("thank_you_msg").value;
	}
	
	function display_thank_you_error() {
	    document.getElementById("show_thank_you_error").innerHTML = document.getElementById("thank_you_error_msg").value;
	}

	function display_order_message() {
	    document.getElementById("show_order_msg").innerHTML = document.getElementById("order_update_msg").value;
	}
	
	function display_payment_message() {
	    document.getElementById("show_payment_msg").innerHTML = document.getElementById("payment_method_msg").value;
	}
</script>

<?php
	function process_thank_you_settings()
	{

   		$shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];

   		$shop_domain = get_shop_meta( $shop_id, 'shop_domain');
		$force_ssl = get_shop_meta( $shop_id, 'force_ssl');
		$full_shop_url= ( $force_ssl > 0 ? 'https://' : 'http://' ) . $shop_domain;
   		if (isset($_POST['reset'])) 
   		{
   			add_shop_meta($shop_id, 'thank_you_msg','Thank You');
   			add_shop_meta($shop_id, 'thank_you_error_msg','We are sorry');
	        add_shop_meta($shop_id, 'order_confirm_title' ,'Your order is confirmed');
	        add_shop_meta($shop_id, 'order_confirm_field' ,'We have accepted your order, and we are getting it ready. Come back to this page for updates on your order status.');

	        add_shop_meta($shop_id, 'order_confirm_error_title','Your order is denied');
	        add_shop_meta($shop_id, 'order_confirm_error_field','Something went wrong in your payment.');

	        add_shop_meta($shop_id, 'order_update_title' ,'Order updates');
	        add_shop_meta($shop_id, 'order_update_msg' ,'A confirmation was sent to');
	        add_shop_meta($shop_id, 'customer_info' ,'Customer Information');

	        add_shop_meta($shop_id, 'shipping_address' ,'Shipping address');
	        add_shop_meta($shop_id, 'shipping_method_title' ,'Shipping method');
	        add_shop_meta($shop_id, 'standard_shipping_title' ,"");

	        add_shop_meta($shop_id, 'billing_address_title' ,'Billing Address');
	        add_shop_meta($shop_id, 'payment_method_title' ,'Payment Method');
	        add_shop_meta($shop_id, 'payment_method_msg' ,'Ending with');
	        add_shop_meta($shop_id, 'need_help' ,'Need Help?');
	        add_shop_meta($shop_id, 'contact_us' ,'Contact Us');
	        add_shop_meta($shop_id, 'continue_shopping' ,'Continue Shopping');
	        add_shop_meta($shop_id, 'contact_us_url' ,$full_shop_url.'/contact-us');
	        add_shop_meta($shop_id, 'payment_error_msg','Payment was unsuccessful. Your credit card was not charged.');
	        add_shop_meta($shop_id, 'go_back_and_fix','Go back and fix this');
   		}

        else
        {
        	add_shop_meta($shop_id, 'thank_you_msg',$_POST['thank_you_msg']);
        	add_shop_meta($shop_id, 'thank_you_error_msg',$_POST['thank_you_error_msg']);
	        add_shop_meta($shop_id, 'order_confirm_title' ,$_POST['order_confirm_title']);
	        add_shop_meta($shop_id, 'order_confirm_field' ,$_POST['order_confirm_field']);
	        add_shop_meta($shop_id, 'order_confirm_error_title',$_POST['order_confirm_error_title']);
	        add_shop_meta($shop_id, 'order_confirm_error_field',$_POST['order_confirm_error_field']);
	        add_shop_meta($shop_id, 'order_update_title' ,$_POST['order_update_title']);
	        add_shop_meta($shop_id, 'order_update_msg' ,$_POST['order_update_msg']);
	        add_shop_meta($shop_id, 'customer_info' ,$_POST['customer_info']);

	        add_shop_meta($shop_id, 'shipping_address' ,$_POST['shipping_address']);
	        add_shop_meta($shop_id, 'shipping_method_title' ,$_POST['shipping_method_title']);
	        add_shop_meta($shop_id, 'standard_shipping_title' ,"");

	        add_shop_meta($shop_id, 'billing_address_title' ,$_POST['billing_address_title']);
	        add_shop_meta($shop_id, 'payment_method_title' ,$_POST['payment_method_title']);
	        add_shop_meta($shop_id, 'payment_method_msg' ,$_POST['payment_method_msg']);
	        add_shop_meta($shop_id, 'need_help' ,$_POST['need_help']);
	        add_shop_meta($shop_id, 'contact_us' ,$_POST['contact_us']);
	        add_shop_meta($shop_id, 'continue_shopping' ,$_POST['continue_shopping']);
	        $url = parse_url($_POST['contact_us_url']);
	        $_POST['contact_us_url'] = trim($_POST['contact_us_url']);

			if($url['scheme'] == 'http' || $url['scheme'] == 'https' )
			{
			   $contact_us_url = $_POST['contact_us_url'];
			}
			else if($_POST['contact_us_url'] == "")
			{
				$contact_us_url = "";
			}
			else
			{
				$contact_us_url=( $force_ssl > 0 ? 'https://' : 'http://' ).$_POST['contact_us_url'];
			}
	        add_shop_meta($shop_id, 'contact_us_url' ,$contact_us_url);
	        add_shop_meta($shop_id, 'payment_error_msg',$_POST['payment_error_msg']);
	        add_shop_meta($shop_id, 'go_back_and_fix',$_POST['go_back_and_fix']);
        }

        header('Location:'.BASE.'/thank_you_settings');
    }

    footing();
?>