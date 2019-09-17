<?php 
    heading();
    $shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];

    $tab = ( isset( $_REQUEST['tab'] ) ? $_REQUEST['tab'] : 'general' );

    $stripe_secret_key = get_shop_meta( $shop_id, 'stripe_secret_key' );
	$stripe_publishable_key = get_shop_meta( $shop_id, 'stripe_publishable_key' );
?>
<div class="clearfix"></div>
<div class="row">
  	<div class="col-md-12 col-sm-12 col-xs-12">
    	<div class="x_panel">
      		<div class="x_title">
        		<h2>Checkout settings</h2>                    
        		<div class="clearfix"></div>
      		</div>
      		<div class="x_content">
        		<br />
        		<form action="<?php echo BASE ?>/checkout_settings/?process=save_settings" id="demo-form2" data-parsley-validate class="form-horizontal form-label-left" method="post">

                    <div class="form-group">
                        <label for="credit_card_processor" class="col-sm-3 control-label" style="text-align: left;">Credit card processor</label>
                        <div class="col-sm-9">
                            <select class="form-control" name="credit_card_processor" id="credit_card_processor" onchange="credit_card_processor_selection()">
                                <option value="stripe" 
                                <?php 
                                    if (get_shop_meta($shop_id, 'credit_card_processor') == "") 
                                    {
                                        echo 'selected="selected"';
                                    }
                                ?> > Stripe</option>
                                <option value="nmi" 
                                <?php 
                                    if (get_shop_meta($shop_id, 'credit_card_processor') == "nmi")
                                    {
                                        echo 'selected="selected"';
                                    }
                                ?> > Network Merchants (NMI) </option>
                                <option value="bluesnap" 
                                <?php 
                                    if (get_shop_meta($shop_id, 'credit_card_processor') == "bluesnap")
                                    {
                                        echo 'selected="selected"';
                                    }
                                ?> > BlueSnap </option>
                            </select>
                        </div>
                    </div>

	          		<div class="form-group" 
                    <?php
                        if (get_shop_meta($shop_id, 'credit_card_processor') == "") 
                        {
                            echo "style='display:_none;'";
                        }
                        else
                        { 
                            echo "style='display:none;'";
                        }
                    ?> id="stripe_id">
			    		<label class="control-label col-md-3 col-sm-3 col-xs-12" style="text-align: left">Stripe account status</label>
			    		<div class="col-md-9 col-sm-9 col-xs-12">
			    		<?php if( ( $stripe_secret_key != '' ) && ( $stripe_publishable_key != '' ) ) { ?>
			    			<a href="<?php echo BASE ?>/checkout_settings/?process=disconnect_stripe" class="btn btn-success">Disconnect stripe</a>
			    		<?php } else { ?>
			    			<a href="<?php echo BASE ?>/checkout_settings/?process=connect_stripe" target="_blank" class="btn btn-primary">Connect stripe</a>
			   			<?php } ?>
			   			</div>
			  		</div>

                    <div class="form-group" 
                    <?php
                        if (get_shop_meta($shop_id, 'credit_card_processor') == "nmi") 
                        {
                            echo "style='display:_none;'";
                        }
                        else
                        {
                            echo "style='display:none;'";
                        }
                    ?>  id="nmi_id" >
                        <div class="form-group">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12" style="text-align: left">NMI username</label>
                            <div class="col-md-9 col-sm-9 col-xs-12">
                                <input type="text" class="form-control" name="nmi_username" value="<?php echo htmlentities( get_shop_meta($shop_id, "nmi_username") ) ?>">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12" style="text-align: left">NMI password</label>
                            <div class="col-md-9 col-sm-9 col-xs-12">
                                <input type="text" class="form-control" name="nmi_password" value="<?php echo htmlentities( get_shop_meta($shop_id, "nmi_password") ) ?>">
                            </div>
                        </div>
                    </div>

                    <div class="form-group" 
                    <?php
                        if (get_shop_meta($shop_id, 'credit_card_processor') == "bluesnap") 
                        {
                            echo "style='display:_none;'";
                        }
                        else
                        {
                            echo "style='display:none;'";
                        }
                    ?>  id="bluesnap_id" >
                        <div class="form-group">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12" style="text-align: left">BlueSnap username</label>
                            <div class="col-md-9 col-sm-9 col-xs-12">
                                <input type="text" class="form-control" name="bluesnap_username" value="<?php echo htmlentities( get_shop_meta($shop_id, "bluesnap_username") ) ?>">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12" style="text-align: left">BlueSnap password</label>
                            <div class="col-md-9 col-sm-9 col-xs-12">
                                <input type="text" class="form-control" name="bluesnap_password" value="<?php echo htmlentities( get_shop_meta($shop_id, "bluesnap_password") ) ?>">
                            </div>
                        </div>
                    </div>

                    <div style="display:_none">
                        <div class="form-group">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12" style="text-align: left">Paypal API username</label>
                            <div class="col-md-9 col-sm-9 col-xs-12">
                                <input type="text" class="form-control" name="paypal_api_username" value="<?php echo htmlentities( get_shop_meta($shop_id, "paypal_api_username") ) ?>">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12" style="text-align: left">Paypal API password</label>
                            <div class="col-md-9 col-sm-9 col-xs-12">
                                <div class="input-group" id="paypal_password_div">
                                    <?php
                                        if(get_shop_meta($shop_id, "paypal_api_password") == ""){
                                    ?>
                                            <input type="text" class="form-control" value="" aria-describedby="basic-addon2" disabled>
                                    <?php 
                                        }else{
                                    ?>
                                            <input type="text" class="form-control" value="●●●●●●●●●●●●●●●●<?php echo htmlentities( substr(get_shop_meta($shop_id, "paypal_api_password"), -4)); ?>" aria-describedby="basic-addon2" disabled>
                                    <?php
                                        }
                                    ?>
                                  <span class="input-group-addon" id="basic-addon2" style="cursor: pointer;" onclick="enable_pay_pal_change('paypal_password_div','paypal_api_password');">
                                    Change
                                  </span>
                                </div>
                                <input type="text" class="form-control" id="paypal_api_password" name="paypal_api_password" value="<?php echo htmlentities( get_shop_meta($shop_id, "paypal_api_password") ) ?>" style="display: none;">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12" style="text-align: left">Paypal API signature</label>
                            <div class="col-md-9 col-sm-9 col-xs-12">
                                <div class="input-group" id="paypal_signature_div">
                                    <?php
                                        if(get_shop_meta($shop_id, "paypal_api_signature") == ""){
                                    ?>
                                            <input type="text" class="form-control" value="" aria-describedby="basic-addon2" disabled>
                                    <?php 
                                        }else{
                                    ?>
                                            <input type="text" class="form-control" value="●●●●●●●●●●●●●●●●<?php echo htmlentities( substr(get_shop_meta($shop_id, "paypal_api_signature"), -4)); ?>" aria-describedby="basic-addon2" disabled>
                                    <?php
                                        }
                                    ?>
                                  <span class="input-group-addon" id="basic-addon2" style="cursor: pointer;" onclick="enable_pay_pal_change('paypal_signature_div','paypal_api_signature');">
                                    Change
                                  </span>
                                </div>
                                <input type="text" class="form-control" id="paypal_api_signature" name="paypal_api_signature" value="<?php echo htmlentities( get_shop_meta($shop_id, "paypal_api_signature") ) ?>" style="display: none;">
                            </div>
                        </div>

                        <script type="text/javascript">
                            function enable_pay_pal_change(div_id,input_id){
                                $("#"+div_id).hide();
                                $("#"+input_id).show();
                                $("#"+input_id)[0].value = "";
                            }
                        </script>

                        <?php
                            $paypal_reference_transaction = get_shop_meta( $shop_id, "paypal_reference_transaction" );
                        ?>
                        <div class="form-group">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12" style="text-align: left">Paypal reference transaction</label>
                            <div class="col-md-9 col-sm-9 col-xs-12">
                                <select class="form-control" name="paypal_reference_transaction">
                                    <option value="">Enable</option>
                                    <option value="disable" <?php echo ( $paypal_reference_transaction == 'disable' ? 'SELECTED=""' : '' ); ?> >Disable</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12" style="text-align: left">Recharge api token</label>
                        <div class="col-md-9 col-sm-9 col-xs-12">
                            <input type="text" class="form-control" name="rc_token" value="<?php echo htmlentities( get_shop_meta($shop_id, "rc_token") ) ?>">
                        </div>
                    </div>

			  		<div class="form-group">
                        <label for="productimageremoteupload" class="col-sm-3 control-label" style="text-align: left">Upload logo</label>
                        <div class="col-sm-9">
                        	<?php $logoremoteurl = str_replace( '\"', '"', str_replace( "\'", "'", get_shop_meta( $shop_id, 'logoremoteurl' ) ) ); ?>
				      		<input type="hidden" class="form-control" name="logoremoteurl" id="logoremoteurl" value="<?php echo htmlentities( $logoremoteurl ) ?>">
                            <input type="file" class="control-label" name="logoremoteurlupload" id="logoremoteurlupload" onchange="upload_image( this, 'logoremoteurlpreview', '<?php echo BASE; ?>/checkout_settings/?process=upload_an_image', 'logoremoteurluploaded'); return false;">
                        </div>
                    </div>

                    <?php
                        if(get_shop_meta($shop_id,"custom_checkout_page_logo") != ""){
                    ?>
                    <div id="custom_checkout_page_logo" class="form-group">
                        <label class="col-sm-3 control-label"></label>
                        <div class="col-sm-1" id="logoremoteurlpreview">
                            <img src="<?php echo get_shop_meta($shop_id,"custom_checkout_page_logo"); ?>" style="width: 100px;">
                        </div>
                    </div>
                    <?php
                        }else{
                    ?>
                    <div id="custom_checkout_page_logo" class="form-group" style="display: none;">
                        <label class="col-sm-3 control-label"></label>
                        <div class="col-sm-1" id="logoremoteurlpreview">
                        </div>
                    </div>
                    <?php
                        }
                    ?>
				  	<div class="form-group">
				    	<label for="thankyoupage_contact_url" class="col-sm-3 control-label" style="text-align: left">Contact page url</label>
				    	<div class="col-sm-9">
				    		<?php 
				    			$thankyoupage_contact_url = str_replace( '\"', '"', str_replace( "\'", "'", get_shop_meta( $shop_id, 'thankyoupage_contact_url' ) ) ); 
				    			if( $thankyoupage_contact_url == '' ) $thankyoupage_contact_url = 'https://' . get_shop_meta( $shop_id, 'shop_domain' );
				    		?>
				      		<input type="text" class="form-control" name="thankyoupage_contact_url" id="thankyoupage_contact_url" value="<?php echo htmlentities( $thankyoupage_contact_url ) ?>">
				    	</div>
				  	</div>

				  	<?php 
						$cart_bump_enabled = get_shop_meta( $shop_id, 'cart_bump_enabled' ); 
						if( $cart_bump_enabled == '' ) $cart_bump_enabled = 'false';
					?>
					<div class="form-group">
						<label for="cart_bump_enabled" class="col-sm-3 control-label" style="text-align: left;">Cart bump</label>
						<div class="col-sm-9">
							<select class="form-control" name="cart_bump_enabled" id="cart_bump_enabled">
								<option value="true" <?php echo ( $cart_bump_enabled == 'true' ? 'SELECTED=""' : '' ); ?>>Activated</option>
								<option value="false" <?php echo ( $cart_bump_enabled != 'true' ? 'SELECTED=""' : '' ); ?>>Deactivated</option>
							</select>
						</div>
					</div>

					<?php 
						$cart_bump_items = get_shop_meta( $shop_id, 'cart_bump_items' ); 
						if( $cart_bump_items == '' ) $cart_bump_items = 3;
					?>
					<div class="form-group">
						<label for="cart_bump_items" class="col-sm-3 control-label" style="text-align: left;">Cart bump settings</label>
						<div class="col-sm-9">
							<select class="form-control" name="cart_bump_items" id="cart_bump_items">
								<option value="1" <?php echo ( $cart_bump_items == 1 ? 'SELECTED=""' : '' ); ?>>Upto one more copy of the product</option>
								<option value="2" <?php echo ( $cart_bump_items == 2 ? 'SELECTED=""' : '' ); ?>>Upto two more copy of the product</option>
								<option value="3" <?php echo ( $cart_bump_items == 3 ? 'SELECTED=""' : '' ); ?>>Upto three more copy of the product</option>
								<option value="4" <?php echo ( $cart_bump_items == 4 ? 'SELECTED=""' : '' ); ?>>Upto four more copy of the product</option>
								<option value="5" <?php echo ( $cart_bump_items == 5 ? 'SELECTED=""' : '' ); ?>>Upto five more copy of the product</option>
							</select>
						</div>
					</div>

					<?php 
						$cart_bump_headline = get_shop_meta( $shop_id, 'cart_bump_headline' );
						if( $cart_bump_headline == '' ) $cart_bump_headline = 'Select one option';
					?>
					<div class="form-group">
						<label for="cart_bump_headline" class="col-sm-3 control-label" style="text-align: left">Cart bump pitch</label>
						<div class="col-sm-9">
							<textarea name="cart_bump_headline" id="cart_bump_headline" class="form-control"><?php echo htmlentities( $cart_bump_headline ); ?></textarea>
						</div>
					</div>

					<?php 
						$cart_bump_template = get_shop_meta( $shop_id, 'cart_bump_template' );
						if( $cart_bump_template == '' ) $cart_bump_template = 'Add [NUMBER_OF_ITEMS] More [PRODUCT_TITLE] to Your Order! Just pay additional [PRODUCT_TOTAL_PRICE].';
					?>
					<div class="form-group">
						<label for="cart_bump_template" class="col-sm-3 control-label" style="text-align: left">Cart bump product template</label>
						<div class="col-sm-9">
							<textarea name="cart_bump_template" id="cart_bump_template" class="form-control"><?php echo htmlentities( $cart_bump_template ); ?></textarea>
							<br><p class="alert alert-info" style="color: #31708f; background-color: #d9edf7; border-color: #bce8f1;"><strong>Funnel buildr supports following shortcodes:</strong><br><strong>[NUMBER_OF_ITEMS]</strong> = Number of copies of the product to bump.<br><strong>[PRODUCT_TITLE]</strong> = Title of the product already added in the cart and to be bumped.<br><strong>[PRODUCT_TOTAL_PRICE]</strong> = Total price of the product.<br><strong>[PRODUCT_PRICE]</strong> = Original price of the product.</p>
						</div>
					</div>

                    <?php
                        $shop_country = get_shop_meta( $shop_id, 'shop_country' );
                        add_shop_meta( $_SESSION[ SESSIONNAME ]['shop_id'], 'shop_zip', $shopdata['zip'] );
                        $enable_region_tax = get_shop_meta( $shop_id, 'enable_region_tax' );
                    ?>
                    <div class="form-group <?php echo ( $shop_country != 'US' ? 'hide' : '' ) ?>">
                        <label for="enable_region_tax" class="col-sm-3 control-label" style="text-align: left">Calculate taxes automatically for USA</label>
                        <div class="col-sm-9">
                            <select name="enable_region_tax" id="enable_region_tax" class="form-control">
                                <option value="">Disabled</option>
                                <option value="enabled" <?php echo ( $enable_region_tax == 'enabled' ? 'SELECTED=""' : '' ) ?>>Enabled</option>
                            </select>
                        </div>
                    </div>
	          
	          		<div class="ln_solid"></div>
	          		<div class="form-group">
	            		<div class="col-md-12 col-sm-12 col-xs-12">
	              			<button type="submit" class="btn btn-success pull-right" style="background-color: #337ab7; border-color: #337ab7;">Update</button>
	            		</div>
	          		</div>
        		</form>
        	</div>
    	</div>
  	</div>
</div>
<?php
    footing();

    function process_save_settings() {
        $shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];
        add_shop_meta( $shop_id, 'cart_bump_enabled', $_REQUEST['cart_bump_enabled'] );
        add_shop_meta( $shop_id, 'cart_bump_enabled', $_REQUEST['cart_bump_enabled'] );
        add_shop_meta( $shop_id, 'cart_bump_enabled', $_REQUEST['cart_bump_enabled'] );

        add_shop_meta( $shop_id, 'paypal_api_username', $_REQUEST['paypal_api_username'] );
        add_shop_meta( $shop_id, 'paypal_api_password', $_REQUEST['paypal_api_password'] );
        add_shop_meta( $shop_id, 'paypal_api_signature', $_REQUEST['paypal_api_signature'] );

        add_shop_meta( $shop_id, 'paypal_reference_transaction', $_REQUEST['paypal_reference_transaction'] );
        add_shop_meta( $shop_id, 'cart_bump_enabled', $_REQUEST['cart_bump_enabled'] );
		add_shop_meta( $shop_id, 'cart_bump_headline', $_REQUEST['cart_bump_headline'] );
		add_shop_meta( $shop_id, 'cart_bump_items', $_REQUEST['cart_bump_items'] );
		add_shop_meta( $shop_id, 'cart_bump_template', $_REQUEST['cart_bump_template'] );
		add_shop_meta( $shop_id, 'thankyoupage_contact_url' , $_REQUEST['thankyoupage_contact_url']);
        add_shop_meta( $shop_id, 'enable_region_tax', $_REQUEST['enable_region_tax'] );
        add_shop_meta( $shop_id, 'rc_token', $_REQUEST['rc_token'] );

        // Gautam Editiing
        if ($_REQUEST['credit_card_processor'] == 'stripe') 
        {
            add_shop_meta( $shop_id, 'credit_card_processor', '' );
        }
        elseif($_REQUEST['credit_card_processor'] == 'bluesnap'){
            add_shop_meta($shop_id, 'credit_card_processor', 'bluesnap');
            add_shop_meta($shop_id, 'bluesnap_username', $_REQUEST['bluesnap_username']);
            add_shop_meta($shop_id, 'bluesnap_password', $_REQUEST['bluesnap_password']);
        }
        else 
        {
            add_shop_meta( $shop_id, 'credit_card_processor', 'nmi' );
            add_shop_meta( $shop_id, 'nmi_username', $_REQUEST['nmi_username'] );
            add_shop_meta( $shop_id, 'nmi_password', $_REQUEST['nmi_password'] );
        }
        // Gautam Editiing

		header("location:" . BASE . "/checkout_settings/?tab=" . $_REQUEST['tab'] . "&saved=true" );
    }

    function process_connect_stripe() {
		$shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];
		include( 'includes/oauth2/OAuth2Client.php' );
		include( 'includes/stripeoauth/StripeOAuth.class.php' );
		$oauth = (new StripeOAuth(
		        STRIPE_CLIENT_ID,
				STRIPE_SECRET_KEY
		    ));

		if( !isset( $_REQUEST['code'] ) ) {
		    $url = $oauth->getAuthorizeUri();
		    $url .= '&redirect_uri=' . BASE . '/checkout_settings/?process=connect_stripe';
		    header('location: ' . ($url));
		    exit(0);
		} else {
		    $token = $oauth->getAccessToken($_GET['code']);
		    $key = $oauth->getPublishableKey($_GET['code']);
		    if( $token != '' ) add_shop_meta( $_SESSION[ SESSIONNAME ]['shop_id'], 'stripe_secret_key', $token );
		    if( $key != '' ) add_shop_meta( $_SESSION[ SESSIONNAME ]['shop_id'], 'stripe_publishable_key', $key );
            add_shop_meta( $shop_id, 'credit_card_processor', '' );
		    header('location:' . BASE . '/checkout_settings/?redirect=payment_processor' );
		    exit(0);
		}
	}

	function process_disconnect_stripe() {
		$shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];
		delete_shop_meta( $shop_id, 'stripe_secret_key' );
		delete_shop_meta( $shop_id, 'stripe_publishable_key' );
		header('location:' . BASE . '/checkout_settings/?success=disconnect' );
	}

	function process_upload_an_image() {
        $image = upload_ajax_image( 500000, '', 'files/uploads' );
        $image = put_s3_file( AWS_FILE_BUCKET, str_replace( BASE . '/', '', $image ) );
        echo $image;
    }


    function process_get_variants(){
        $product_id = $_REQUEST['product_id'];
        require_once 'includes/shopify.php';
        $sc = new ShopifyClient($_SESSION[ SESSIONNAME ]['shop'], $_SESSION[ SESSIONNAME ]['token'], SHOPIFY_API_KEY, SHOPIFY_SECRET);
        $shopify_product = $sc->call('GET', '/admin/products/' . $product_id . '.json');
        $html_data = '';
        $i1 = 1;
        $arr = array('html_data'=>'','option' => array(),'option2' => array() );
        foreach ($shopify_product['variants'] as $variant) {
            $arr2 = array('variants_id'=>'','variant_name' => '');
            $arr2['variants_id'][] = $variant['id'];
            $arr2['variant_name'][] = $variant['title'];
            $arr['option'][] = $variant['title'];
            $arr['option2'][] = $arr2;
        }
        foreach ($shopify_product['options'] as $option) {
            $html_data .= '<div class="form-group"><label class="col-sm-3 control-label" for="option'.$i1.'">'.$option['name'].'</label>';
            $html_data .= '<div class="col-sm-9"><select class="form-control" onchange="select_sale_variant(this,'.$i1.');">';
            $html_data .= '<option>Select</option>';
            foreach ($option['values'] as $value) {
                $html_data .= '<option value ="'.$value.'">'.$value.'</option>';
            }
            $html_data .= '</select></div></div>';
            $i1++;
        }
        $arr['html_data'] = $html_data;
        echo json_encode($arr);
    }



    function process_save_bump_product_details(){
        $info = $_REQUEST['info'];
        $info = explode("@@@@", $info);
        //$page_id = $info[0];
        $product_details = $_REQUEST['product_details'];
        $product_details = explode("@@@@", $product_details);
        $product_array = $info[1];
        $product_id = $product_details[0];
        $vari_id = $product_details[1];
        require_once 'includes/shopify.php';
        $sc = new ShopifyClient($_SESSION[ SESSIONNAME ]['shop'], $_SESSION[ SESSIONNAME ]['token'], SHOPIFY_API_KEY, SHOPIFY_SECRET);
        $shopify_product_images = $sc->call('GET', '/admin/products/' . $product_id . '.json');
        $image_arr = array();

        foreach ($shopify_product_images['images'] as $images) {
            foreach ($images['variant_ids'] as $variant_arr) {
                if($variant_arr == $vari_id)
                {
                    $image_arr[] =  $images['src'];
                }
            }
        }
        if(sizeof($image_arr)==0)
        {
            $image_arr[] = $shopify_product_images['image']['src'];
        }
        $product_details[] = $image_arr;
        $arr = array('product_array'=>'','product_details' => '' );
        if ($product_array != "") {
            $product_array = json_decode($product_array);
            $product_array[] = $product_details;
            $arr['product_array'] = json_encode($product_array);
            $arr['product_details'] = $product_details;
            echo json_encode($arr);
        }
        else
        {
            $product_array = array();
            $product_array[] = $product_details;
            $arr['product_array'] = json_encode($product_array);
            $arr['product_details'] = $product_details;
            echo json_encode($arr);
        }
    }

    function process_delete_bump_product(){
        $info = $_REQUEST['info'];
        $info = explode("@@@@", $info);
        //$page_id = $info[0];
        $index_id = $info[1];
        $product_details = $_REQUEST['product_details'];
        $product_details = explode("@@@@", $product_details);
        $product_name = $product_details[0];
        $product_variant = $product_details[1];
        $product_array = $info[2];
        $product_array = json_decode($product_array);
        $arr = array('product_array'=>'','index' => $index_id );
        foreach ($product_array as $key => $product) {
            if ($product[2] == $product_name && $product[3]==$product_variant){
                array_splice($product_array, $key, 1);
                $arr['product_array'] = json_encode($product_array);
                break;
            }
        }
        echo json_encode($arr);
    }


    function process_final_save_bump_product(){
    	$shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];
        $value = $_REQUEST['product_details'];
       
    }

    function process_save_logo_image(){
        $shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];
        $url = $_REQUEST['image_url'];

        add_shop_meta($shop_id, "custom_checkout_page_logo",$url);
        echo "success";
    }
?>
