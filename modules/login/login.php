<?php
	require 'includes/shopify.php';
	if (isset($_GET['code'])) {
		session_flash_cookie( SESSIONNAME );
		$shopifyClient = new ShopifyClient($_GET['shop'], "", SHOPIFY_API_KEY, SHOPIFY_SECRET);
        $_SESSION[ SESSIONNAME ]['token'] = $shopifyClient->getAccessToken($_GET['code']);
        if ($_SESSION[ SESSIONNAME ]['token'] != '') {
			
			$_SESSION[ SESSIONNAME ]['hmac'] = $_REQUEST['hmac'];
			$_SESSION[ SESSIONNAME ]['signature'] = $_REQUEST['signature'];
			$_SESSION[ SESSIONNAME ]['shop'] = $_REQUEST['shop'];
			
			$query = "SELECT id FROM shops WHERE shop='" . $_REQUEST['shop'] . "'";
			$res = $mysqli->query( $query );
			if( $res->num_rows < 1 ) {
				
				$mysqli->query( "INSERT INTO shops (shop, token) VALUES ('" . $_REQUEST['shop'] . "', '" . $_SESSION[ SESSIONNAME ]['token'] . "')" );
				$res = $mysqli->query( $query ) or die(mysql_error());
			} else $mysqli->query( "UPDATE shops SET token='" . $_SESSION[ SESSIONNAME ]['token'] . "' WHERE shop='" . $_REQUEST['shop'] . "'" );
			
			$arr = $res->fetch_array(MYSQLI_ASSOC);
			$_SESSION[ SESSIONNAME ]['shop_id'] = $arr['id'];

			?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta charset="UTF-8" />
		<title>Please, wait…</title>
		<script src="<?php echo BASE ?>/files/js/javascripts.js"></script>
		<script src="https://cdn.shopify.com/s/assets/external/app.js"></script>
		
		<script type="text/javascript">
		  	function ecomisoft_loading() {
			  	var loading_progress = 25;
			  	var loading_messages = ['Syncing your collections', 'Syncing your products', 'Syncing your orders', 'Syncing your settings'];
			  	var interval = 0;
			  	var message = 0;
			  	setInterval(function() {
			  		if( loading_progress < 97 ) loading_progress = loading_progress + 1;
			  		document.getElementById('ecomisoft-loader-progress').style.width = loading_progress + '%';
			  		if( interval == 0 ) {
			  			document.getElementById('ecomisoft-loading-message').innerHTML = loading_messages[ message ];
			  			message++;
			  			if( message >= loading_messages.length ) message = 0;
			  		}
			  		interval++;
			  		if( interval >= 20 ) interval = 0;
			  	}, 200);

			  	http_get_request( '<?php echo BASE ?>/login/?mysession=<?php echo SESSIONNAME ?>', 'login_process_shop_data_fetched' );
			}

			function login_process_shop_data_fetched( res ) {
				if( res.trim() == 'continue' ) {
					window.location = '<?php echo BASE."/home" ?>';
				} else console.log( res );
			}
		</script>
	</head>
	<body style="background-color: #ebeef0">
		<div style="top: 40%;left: 50%;position: absolute;transform: translate(-50%,-50%);">
			<div style="display: inline-block; text-align: center; max-width: 400px">
				<img src="https://dicuzr12u9udx.cloudfront.net/images/fb_2_logo.png">
				<p style="font-size: 18px;font-weight: 300; opacity: 0.6;">Hang on! The app is syncing with your store. It may take some time depending on your store size.</p>
				<div>
					<div style="height: 8px; margin-top: 10px; overflow: hidden; background-color: #e1e1e1; border-radius: 10px; -webkit-box-shadow: inset 0 1px 2px rgba(0,0,0,.1); box-shadow: inset 0 1px 2px rgba(0,0,0,.1);">
							<div id="ecomisoft-loader-progress" style="float: left; height: 100%; font-size: 12px; line-height: 20px; color: rgb(76,158,217); text-align: center; background-color: rgb(76,158,217); box-shadow: rgba(0, 0, 0, 0.14902) 0px -1px 0px inset; transition: width 0.6s ease; width: 0%;"></div>
					</div>
				</div>
				<div id="ecomisoft-loading-message" style="opacity: 0.5; margin-top: 8px;">Initializing...</div>
			</div>
		</div>
		<script>ecomisoft_loading();</script>
	</body>
</html>
<?php
		}
        exit;
    } elseif( isset( $_REQUEST['mysession'] ) ) {
    	//fetch shop settings
		$sc = new ShopifyClient($_SESSION[ SESSIONNAME ]['shop'], $_SESSION[ SESSIONNAME ]['token'], SHOPIFY_API_KEY, SHOPIFY_SECRET);

		//Common shop data
		$shopdata = $sc->call('GET', '/admin/shop.json' );
		$_SESSION[ SESSIONNAME ]['plan_name'] = $shopdata['plan_name'];
		$_SESSION[ SESSIONNAME ]['currency'] = $shopdata['currency'];
		$_SESSION[ SESSIONNAME ]['name'] = $shopdata['name'];
		$_SESSION[ SESSIONNAME ]['shop_owner'] = $shopdata['shop_owner'];
		//add/update shop information in the database for shipping calculation
		add_shop_meta( $_SESSION[ SESSIONNAME ]['shop_id'], 'shop_domain', $shopdata['domain'] );
		add_shop_meta( $_SESSION[ SESSIONNAME ]['shop_id'], 'force_ssl', $shopdata['force_ssl'] );
		add_shop_meta( $_SESSION[ SESSIONNAME ]['shop_id'], 'shop_plan_name', $shopdata['plan_name'] );
		add_shop_meta( $_SESSION[ SESSIONNAME ]['shop_id'], 'shop_country', $shopdata['country'] );
		add_shop_meta( $_SESSION[ SESSIONNAME ]['shop_id'], 'shop_province', $shopdata['province'] );
		add_shop_meta( $_SESSION[ SESSIONNAME ]['shop_id'], 'shop_province_code', $shopdata['province_code'] );
		add_shop_meta( $_SESSION[ SESSIONNAME ]['shop_id'], 'shop_zip', $shopdata['zip'] );
		add_shop_meta( $_SESSION[ SESSIONNAME ]['shop_id'], 'shop_currency', $shopdata['currency'] );
		add_shop_meta( $_SESSION[ SESSIONNAME ]['shop_id'], 'shop_money_format', str_replace( array( 'amount_no_decimals', 'amount_with_comma_separator', 'amount_no_decimals_with_comma_separator', 'amount_with_apostrophe_separator', ' amount ', ' amount', 'amount ' ), 'amount', $shopdata['money_format'] ) );
		add_shop_meta( $_SESSION[ SESSIONNAME ]['shop_id'], 'shop_name', $shopdata['name'] );
		add_shop_meta( $_SESSION[ SESSIONNAME ]['shop_id'], 'shop_tax_shipping', $shopdata['tax_shipping'] );
		add_shop_meta( $_SESSION[ SESSIONNAME ]['shop_id'], 'shop_taxes_included', $shopdata['taxes_included'] );
		add_shop_meta( $_SESSION[ SESSIONNAME ]['shop_id'], 'shop_county_taxes', $shopdata['county_taxes'] );
		add_shop_meta( $_SESSION[ SESSIONNAME ]['shop_id'], 'shop_timezone', $shopdata['timezone'] );
		add_shop_meta( $_SESSION[ SESSIONNAME ]['shop_id'], 'shop_favicon', get_shop_favicon( $_SESSION[ SESSIONNAME ]['shop'] ) );

		//locations of shops
		$locations = $sc->call('GET', '/admin/locations.json' );
		foreach( $locations as $location ) {
			$shop_locations[] = array(
					'city' 			=> $location['city'],
					'zip'			=> $location['zip'],
					'province'		=> $location['province'],
					'province_code'	=> $location['province_code'],
					'country'		=> $location['country'],
					'country_code'	=> $location['country_code']
				);
		}
		add_shop_meta( $_SESSION[ SESSIONNAME ]['shop_id'], 'shop_locations', json_encode( $shop_locations ) );

		echo 'continue';
    } elseif(isset($_REQUEST['shop'])) {
        $shop = $_REQUEST['shop'];

        //authenticate for checking the license
        if( !ecomisoft_license_authenticated( $_REQUEST['shop'], BASE ) ) {
        	die();
        }
        
        $shopifyClient = new ShopifyClient($shop, "", SHOPIFY_API_KEY, SHOPIFY_SECRET);
		
        $pageURL = BASE."/login/";
        $authUrl = $shopifyClient->getAuthorizeUrl(SHOPIFY_SCOPE, $pageURL);
        if( strpos( BASE, 'https://' ) !== false ) $authUrl = str_replace( 'http://', 'https://', $authUrl );
        	
		header("location: " . $authUrl);
		
        exit;
    } else {
    	if( isset( $_SESSION[ SESSIONNAME ] ) ) {
			header("location:" . BASE . "/home");
			die();
		} else {
			module_include('session_timeout');
		}
    }
?>
