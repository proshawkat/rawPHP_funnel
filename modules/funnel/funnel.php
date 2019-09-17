<?php
	error_reporting(-1);
	heading();
	$shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];
	$shop_name=$_SESSION[ SESSIONNAME]['shop'];
	$shop_currency = get_shop_meta( $shop_id, 'shop_currency' );
	$shop_domain = get_shop_meta( $shop_id, 'shop_domain');
	$force_ssl = get_shop_meta( $shop_id, 'force_ssl');
	$full_shop_url= ( $force_ssl > 0 ? 'https://' : 'http://' ) . $shop_domain;

	require 'includes/shopify.php';
	global  $funnel_id;
	$funnel_id = $break[ START + 1 ];

	global $mysqli;

	$full_funnel_info = $mysqli->query("SELECT * FROM funnels WHERE id = $funnel_id");
	$full_funnel_info = $full_funnel_info->fetch_array( MYSQLI_ASSOC );
	$funnel_title = htmlspecialchars($full_funnel_info['title']);


	$pres = $mysqli->query("SELECT * FROM pages WHERE (shop_id = $shop_id AND status = '0')");
	$pres1= $mysqli->query("SELECT `id`,  `date`, `last_updated`, `shop_id`, `type`, `name`, `title`,  `status` FROM pages WHERE (shop_id = $shop_id AND status = '0')");

	$product_handles = $mysqli->query("SELECT * FROM pages_meta WHERE meta_name ='product_handle' ");
	$product_handle_array = $product_handles ->fetch_all (MYSQLI_ASSOC);

	$pages_full_array=array();
	$pages_without_html_array=array();

	while( $arr = $pres->fetch_array( MYSQLI_ASSOC ) ) {
		$pages_array[]=$arr;
	}
	while( $arr = $pres1->fetch_array( MYSQLI_ASSOC ) ) {
		$pages_without_html_array[]=$arr;
	}

	$url_handle= get_funnel_meta($funnel_id,'url_handle') ;

	$analytics_id= get_funnel_meta($funnel_id,'google_analytics_id') ;
	$facebook_pixel_id= get_funnel_meta($funnel_id,'facebook_pixel_id') ;
	$shopify_tag_name= get_funnel_meta($funnel_id,'shopify_tag_name') ;
	$shop_to_funnel_status = get_shop_meta($shop_id,'shop_to_funnel_status');

	if ($analytics_id == '') $analytics_id = get_shop_meta($shop_id,'google_analytics_id') ;
	if ($facebook_pixel_id == '') $facebook_pixel_id = get_shop_meta($shop_id,'facebook_pixel_id') ;



	$funnel = array(
					array(
						'type'          =>   'LM',
						'pages'         =>   array(),
						'child'         =>   array( 'left'   => '',  'right' =>''),
						'parent'        =>   ''
						),
						array(
						'type'          =>   'checkout',
						'checkout_type'         => 'built-in',
						'pages'         =>   '',
						'child'         =>   array( 'left'   => '',  'right' =>''),
						'parent'        =>   ''
						),
						array(
						'type'          =>   'thank_you',
						'pages'         =>   array(),
						'child'         =>   array( 'left'   => '',  'right' =>''),
						'parent'        =>   ''
						)
					);
	$funnel_checkout_conf = array("checkout_index"=>'1',"checkout_selected_indexes"=>array(), "thankyou_index"=>'2',"thankyou_selected_indexes"=>array());
?>
	<div class="clearfix"></div>

	<div class="row x_title">
		<div class="col-xs-12">
			<h4 style="text-align: center;"><?php echo $funnel_title ?></h4>
		</div>
	</div>


	<div style="margin-top: 25px;">
		<div class="col-md-6 col-sm-6 col-xs-12" id ="funnel_tree">
			<div class="x_panel">

				<div class="x_title">
					<h2> Funnel preview </h2>
					<div class="clearfix"></div>
				</div>

				<div class="x_content">
					<form  id="funnel_tree_view" style="display:_none">
						<fieldset>
							<div class="container" >
								<div id="funnel_tree_main_div" class=" "></div>
							</div>
							<div class="clearfix"></div>
						</fieldset>
					</form>
				</div>
			</div>
		</div>
	</div>

	<div class="col-md-6 col-sm-6 col-xs-12" id="funnel_settings" style="right:0;">
		<div class="x_panel">

			<div class="x_title">
				<h2> Funnel settings </h2>
				<ul class=" panel_toolbox_custom" style="list-style-type: none;margin:0px;">
					<li>
						<button type="button" class="btn btn-primary " id="btn_back" onclick="back_to_parent();"><i class="fa fa-chevron-left" aria-hidden="true"></i> Back</button>
					</li>
				</ul>
				<div class="clearfix"></div>
			</div>
			<div class="x_content">
				<form  id="funnel_editor" style="display:_none">

					<fieldset>
						<div class="container" id="funnel_builder_main_div">
							<div id="step_nav_div" class="col-sm-12">
								<h2 id= "step_decison_message" style="text-align:center;" > Select your landing pages or products.</h2>
							</div>

							<div class="col-sm-12" id="funnel_builder_container_div" style="padding:0;">
								<div id="div_first_action" style="display: none;">
									<div class="row row-centered" style="padding-top:20px;">
										<div class="animated flipInY col-lg-4 col-md-4 col-sm-4 col-xs-12 col-centered" style="text-align:center;" id="div_first_action_select_pages">
											<div class="tile-stats div_next_action_button_style" style="background: #39ad4a;padding: 18px; cursor: pointer;color: white;" onclick="one_upsell_show_pages();">
												<h2 style="font-size:18px; position: relative;margin: 0 0 0 10px; z-index: 5;padding: 0;margin: 0px;">Pages</h2>
											</div>
										</div>
										<div class="animated flipInY col-lg-4 col-md-4 col-sm-4 col-xs-12 col-centered" style="text-align:center;" id="div_first_action_select_products">
											<div class="tile-stats div_next_action_button_style" style="background: #de7c3e;padding:18px 10px; cursor: pointer;color: white;" onclick="one_upsell_show_products();">
												<h2 style="font-size:18px;    position: relative;margin: 0 0 0 10px; z-index: 5;padding: 0; margin: 0px;">Products</h2>
											</div>
										</div>
									</div>
								</div>
								<div id="div_sell_settings" style="display: none;">
									<table class=" col-sm-12 col-md-12 table">
										<thead>
											<tr>
												<th class=" col-sm-6 col-md-4 ">Page name</th>
												<th class=" col-sm-4 col-md-4 ">Percantage</th>
												<th class=" col-sm-2 col-md-4 ">Options</th>
											</tr>
										</thead>
										<tbody id="page_list"></tbody>
									</table>
									<div class="row  text-center" id="add_more_page_div">
										<div class="col-sm-12 col-md-12"  style="text-align:right;">
											<button type="button" id="btn_add_new_page"  class ="btn btn-primary" onclick="add_more_page()" style="cursor:pointer;font-size:14px;margin-right:18px;"><i class="fa fa-plus" aria-hidden="true"></i> Add page</button>
										</div>
									</div>
								</div>
								<div id="div_sell_settings_products" style="display: none;">
									<table class=" col-sm-12 col-md-12 table">
										<thead>
											<tr>
												<th class=" col-sm-8 col-md-8 ">Product name</th>
												<th class=" col-sm-4 col-md-4 text-center">Option</th>
											</tr>
										</thead>
										<tbody id="product_list">
											<?php
												if (get_shop_meta($shop_id,'landing_page_product_array')) {
													$landing_page_product_array = get_shop_meta($shop_id,'landing_page_product_array');
													$landing_page_product_array = json_decode($landing_page_product_array);
													for ($i=0; $i < sizeof($landing_page_product_array); $i++) {
														if ($landing_page_product_array[$i]->funnel_id == $funnel_id){
															echo '<tr id="tr_'.$landing_page_product_array[$i]->product_id.'"><td class="col-sm-8 col-md-8">'.base64_decode($landing_page_product_array[$i]->product_name).'</td><td class="col-sm-4 col-md-4 text-center"><button type="button" id="btn_delete" class="btn btn-danger" onclick="delete_this_ou_product('.$landing_page_product_array[$i]->product_id.');"><i class="fa fa-trash-o" aria-hidden="true"></i> </button></td></tr>';
														}
													}
												}
												else{
													echo '<tr id="no_ou_product_added" style="display: none;"><td>No product added</td></tr>';
												}
											?>
										</tbody>
									</table>
									<div class="col-xs-12 ou_product_select_div">
                                        <div class="input-group" style="margin-bottom: 0px !important;">
                                            <input type="text" class="form-control" id="ou_product_search_text" placeholder="Search product, example: shirt">
                                            <div style="cursor: pointer; border-radius: 0px;" class="input-group-addon" onclick="ou_find_products()"> Search
                                            </div>
                                        </div>
                                        <div id="ou_search_result" style="top:34px; width: 84.5%; z-index: 100000;text-align: center;"></div>
                                        <input type="text" name="product" id="ou_product" hidden>
                                        <input type="" name="page_number_for_ou_products" id="page_number_for_ou_products" value="1" hidden>
                                    </div>
								</div>
								<div id="div_next_action" style="display:none;">

									<div class="row row-centered" style="padding-top:20px;">

										<div class="animated flipInY col-lg-4 col-md-4 col-sm-4 col-xs-12 col-centered" style="text-align:center;" id="div_next_action_upsell">
											<div class="tile-stats div_next_action_button_style" style="background: #39ad4a;padding: 18px; cursor: pointer;color: white;" onclick="create_upsell()">
												<h2 style="font-size:18px; position: relative;margin: 0 0 0 10px; z-index: 5;padding: 0;margin: 0px;">Upsell</h2>
											</div>
										</div>

										<div class="animated flipInY col-lg-4 col-md-4 col-sm-4 col-xs-12 col-centered" style="text-align:center;" id="div_next_action_downsell">
											<div class="tile-stats div_next_action_button_style" style="background: #de7c3e;padding:18px 10px; cursor: pointer;color: white;" onclick="create_downsell()">
												<h2 style="font-size:18px;    position: relative;margin: 0 0 0 10px; z-index: 5;padding: 0; margin: 0px;">Downsell</h2>
											</div>
										</div>

										<div class="animated flipInY col-lg-4 col-md-4 col-sm-4 col-xs-12 col-centered" style="text-align:center;" id="div_next_action_checkout">
											<div class="tile-stats div_next_action_button_style" style="background: #ba3ede;padding: 18px 10px; cursor: pointer;color: white;"  onclick="create_checkout()">
												<h2 style="font-size:18px;    position: relative;margin: 0 0 0 10px; z-index: 5;padding: 0; margin: 0px;">Checkout</h2>
											</div>
										</div>
										<div class="animated flipInY col-lg-4 col-md-4 col-sm-4 col-xs-12 col-centered" style="text-align:center;" id="div_next_action_thankyou">
											<div class="tile-stats div_next_action_button_style" style="background: #337ab7;padding: 18px 10px; cursor: pointer;color: white;"  onclick="create_thankyou()">
												<h2 style="font-size:18px;    position: relative;margin: 0 0 0 10px; z-index: 5;padding: 0; margin: 0px;">Thank you</h2>
											</div>
										</div>

									</div>
								</div>
								<div id="div_checkout_settings" style="width:100%">
									<div class="row" style="margin:0 auto;margin-top:20px;">
										<div class="col-sm-12 ">
											<div class="input-group">
												<span class="input-group-addon" id="basic-addon3">Checkout type:</span>
													<select class="form-control" id="checkout_type" onchange="update_checkout()">
														<option value="built-in">Shopify checkout</option>
														<option value="custom">Funnel buildr checkout</option>
													</select>
											</div>
											<div id="custom_checkout_page_select" style="margin:0 auto;margin-top:20px;">


											</div>
										</div>
									</div>
								</div>
							</div>
							<div id="step_nav_div" class="col-sm-12" style="min-height: 99px; margin-top: 0px;">
								<div id="bottom_all_buttons" >

								</div>
							</div>
						</div>
						<div class="clearfix"></div>
					</fieldset>
					<div class="col-sm-12"  style="display: block;text-align:right;">
						<button type="button" class="btn btn-primary" id="btn_funnel_next_action" onclick="funnel_next_action()" >Save and next <i class="fa fa-arrow-circle-right" aria-hidden="true"></i></button>
					</div>
					<div class="col-sm-12"  style="display:none ;text-align:right;" id="div_funnel_thankyou_save">
						<button type="button" class="btn btn-primary" id="btn_funnel_thankyou_save" onclick="funnel_thankyou_save(<?php echo $funnel_id; ?>)" >Save
						</button>
					</div>
					<div class="clearfix"></div>
				</form>
			</div>
		</div>
	</div>

	<div class="clearfix"></div>

	<div class="col-md-12 col-sm-12 col-xs-12" style="margin-top: 25px;">
		<div class="x_panel" style="display:_none;overflow:hidden;">
		  <div class="x_title">
			<h2> Other settings </h2>
			<div class="clearfix"></div>
		  </div>
		  <div class="x_content">
			  <form   id="" >
				<fieldset>
					<div >
						<div class="col-sm-12" style="margin-top:10px;">
							<label class="col-sm-3 control-label">Funnel title</label>
							<div class="col-sm-9 selectContainer">
								<div class="input-group">
									<span class="input-group-addon"><i class="fa fa-info" aria-hidden="true"></i></span>
									<input style="padding:4px;"    class="form-control " type="text"  id ="funnel_title" value="<?php echo $funnel_title;?>" placeholder="Funnel title" >
								</div>
							</div>
						</div>

						<div id="product_landing_page_url">
							<?php
								$landing_page_product_array = get_shop_meta($shop_id,'landing_page_product_array');
								$product_found = 0;
								if($landing_page_product_array != ""){
									$landing_page_product_array = json_decode($landing_page_product_array);
									foreach ($landing_page_product_array as $key => $value) {
										if($funnel_id == $value->funnel_id){
											$product_found++;
							?>
											<div class="col-sm-12">
												<label class="col-sm-3 control-label">Landing  page url <?php echo $product_found; ?></label>
												<div class="col-sm-9 selectContainer">
													<div class="input-group">
														<input type="text" class="form-control p_url" value="<?php echo $full_shop_url .'/products/'.$value->product_handle; ?>" _disabled>
														<a class=" tooltips input-group-addon btn product_url_copy"  data-clipboard-action="copy" data-clipboard-target='' ><i class="fa fa-files-o" aria-hidden="true"></i> Copy <span class="tooltip_show"><i class="fa fa-files-o" aria-hidden="true"></i> Copied!</span></a>
													</div>
												</div>
											</div>
							<?php
										}
									}
								}
							?>
						</div>

						<div class="col-sm-12" id="page_landing_page_url" style="<?php echo ($product_found != 0) ? 'display: none;' : ''; ?>">
							<label class="col-sm-3 control-label">Landing  page url handle</label>
							<div class="col-sm-9 selectContainer">
								<div class="input-group"  id="full_input">
									<span class="input-group-addon"  id="first_input"><?php echo $full_shop_url . SHOPIFY_PROXY_PREFIX ?>/f/<?php echo $funnel_id?>/0/</span>
									<?php if ($url_handle == "" ) {
											global $mysqli;
											$res = $mysqli->query('SELECT title FROM funnels WHERE id= '. $funnel_id .' ');
											$arr = $res->fetch_array( MYSQLI_ASSOC );
											$url_handle =strtolower($arr[title]) ;
											$url_handle =str_replace(' ', '-', $url_handle) ;
											$url_handle = str_replace('"', "", $url_handle);
											$url_handle = str_replace("'", "", $url_handle);
											$url_handle = str_replace("&", "", $url_handle);
											add_funnel_meta( $funnel_id, 'url_handle', $url_handle );
										}?>
									<input type="text" class="form-control" id ="url_handle" placeholder="Landing  page url handle" value="<?php echo $url_handle;?>">
									<a class=" tooltips input-group-addon btn copy"  data-clipboard-action="copy" data-clipboard-target="" ><i class="fa fa-files-o" aria-hidden="true"></i> Copy <span id="span_for_tooltip" class="tooltip_show"><i class="fa fa-files-o" aria-hidden="true"></i> Copied!</span></a>
								</div>
							</div>
						</div>


						<div class="col-sm-12">
							<label class="col-sm-3 control-label">Google analytics id </label>
							<div class="col-sm-9 selectContainer">
								<div class="input-group">
									<span class="input-group-addon"><i class="fa fa-google" aria-hidden="true"></i></span>
									<input style="padding:4px;"    class="form-control " type="text"  id ="analytics_id" placeholder="Google analytics id " value="<?php echo $analytics_id;?>">
								</div>
							</div>
						</div>
						<div class="col-sm-12">
							<label class="col-sm-3 control-label">Facebook pixel id </label>
							<div class="col-sm-9 selectContainer">
								<div class="input-group">
									<span class="input-group-addon"><i class="fa fa-facebook-official" aria-hidden="true"></i></span>
									<input style="padding:4px;"     class="form-control "  type="text"  id ="facebook_pixel_id" placeholder="Facebook pixel id " value="<?php echo $facebook_pixel_id;?>">
								</div>
							</div>
						</div>
						<?php if ($shop_to_funnel_status == 'enable') { ?>
						<div class="col-sm-12">
							<label class="col-sm-3 control-label">Tag name </label>
							<div class="col-sm-9 selectContainer">
								<div class="input-group">
									<span class="input-group-addon"><i class="fa fa-tag" aria-hidden="true"></i></span>
									<input style="padding:4px;"     class="form-control "  type="text"  id ="shopify_tag_name" placeholder="Shopify product tag " value="<?php echo htmlentities(base64_decode($shopify_tag_name));?>">
								</div>
							</div>
						</div>
						<?php } ?>
						<?php
							$mailer_service = get_shop_meta( $shop_id, 'mailer_service' );
							$mailer_service_lists = "";
							$mailing_list_for_subscribers_selected = "";
							$mailing_list_for_abandoned_customers_selected = "";
							if ($mailer_service == 'mailchimp') {
								$mailer_service_lists = mailchimp_lists();
								$mailing_list_for_subscribers_selected = get_funnel_meta($funnel_id,'subscribed_mailchimp_list_id');
								$mailing_list_for_abandoned_customers_selected = get_funnel_meta($funnel_id,'abandoned_mailchimp_list_id');
								$mailing_list_for_completed_customers_selected = get_funnel_meta($funnel_id,'completed_mailchimp_list_id');
							}elseif ($mailer_service == 'aweber') {
								$mailer_service_lists = aweber_campaign_list();
								$mailing_list_for_subscribers_selected = get_funnel_meta($funnel_id,'subscribed_aweber_list_id');
								$mailing_list_for_abandoned_customers_selected = get_funnel_meta($funnel_id,'abandoned_aweber_list_id');
								$mailing_list_for_completed_customers_selected = get_funnel_meta($funnel_id,'completed_aweber_list_id');
							}elseif ($mailer_service == 'klaviyo') {
								$mailer_service_lists = klaviyo_lists();
								$mailing_list_for_subscribers_selected = get_funnel_meta($funnel_id,'subscribed_klaviyo_list_id');
								$mailing_list_for_abandoned_customers_selected = get_funnel_meta($funnel_id,'abandoned_klaviyo_list_id');
								$mailing_list_for_completed_customers_selected = get_funnel_meta($funnel_id,'completed_klaviyo_list_id');
							}elseif($mailer_service == 'drip'){
								$drip_campaigns = drip_campaigns();
								$mailing_list_for_subscribers_selected = get_funnel_meta($funnel_id,'subscribed_drip_list_id');
								$mailing_list_for_abandoned_customers_selected = get_funnel_meta($funnel_id,'abandoned_drip_list_id');
								$mailing_list_for_completed_customers_selected = get_funnel_meta($funnel_id,'completed_drip_list_id');

			  					$abandoned_drip_list_type = get_funnel_meta( $funnel_id, 'abandoned_drip_list_type' );
			  					$mailing_subscriber_drip_list_type = get_funnel_meta( $funnel_id, 'mailing_subscriber_drip_list_type' );
			  					$completed_order_drip_list_type = get_funnel_meta( $funnel_id, 'completed_order_drip_list_type' );

			  					$completed_drip_list_id = get_shop_meta( $shop_id, 'completed_drip_list_id' );
			  					$subscribed_drip_list_id = get_shop_meta( $shop_id, 'subscribed_drip_list_id' );
			  					$abandoned_drip_list_id = get_shop_meta( $shop_id, 'abandoned_drip_list_id' );

								$mailer_service_lists = ( $abandoned_drip_list_type == 'workflow' ? $drip_campaigns['workflows'] : $drip_campaigns['campaigns'] );
								$subscribed_mailer_service_lists = ( $mailing_subscriber_drip_list_type == 'workflow' ? $drip_campaigns['workflows'] : $drip_campaigns['campaigns'] );
								$completed_mailer_service_lists = ( $completed_order_drip_list_type == 'workflow' ? $drip_campaigns['workflows'] : $drip_campaigns['campaigns'] );
							}
						?>
						<?php if ($mailer_service != "") {

						if ($mailer_service == 'drip') { ?>
							<div class="col-sm-12">
								<label class="col-sm-3 control-label">Mailing list type for abandoned carts</label>
								<div class="col-sm-9 selectContainer">
									<div class="input-group">
										<span class="input-group-addon"><i class="fa fa-envelope-o" aria-hidden="true"></i></span>
										<select class="form-control" id="abandoned_drip_list_type" onchange="drip_list_type_selected('abandoned')">
											<option value="">Select</option>
											<option value="campaign" <?php echo ( $abandoned_drip_list_type == 'campaign' ? 'SELECTED=""' : '' ) ?>>Campaign</option>
											<option value="workflow" <?php echo ( $abandoned_drip_list_type == 'workflow' ? 'SELECTED=""' : '' ) ?>>Workflow</option>
										</select>
									</div>
								</div>
							</div>
						<?php } ?>
						<div class="col-sm-12 abandoned_cart_div">
							<label class="col-sm-3 control-label">Mailing list for abandoned carts </label>
							<div class="col-sm-9 selectContainer">
								<div class="input-group">
									<span class="input-group-addon"><i class="fa fa-envelope-o" aria-hidden="true"></i></span>
									<select class="form-control" id="mailing_list_for_abandoned_customers">
								        <option value="">Select</option>
										<?php foreach( $mailer_service_lists as $mailer_service_list ) {
											if ($mailer_service == 'aweber') {
												echo '<option value="' . $mailer_service_list['link'] . '" ' . ( $mailing_list_for_abandoned_customers_selected == $mailer_service_list['link'] ? 'SELECTED=""' : '' ) . '>' . $mailer_service_list['name'] . '</option>';
											}
											else
											{
												echo '<option value="' . $mailer_service_list['id'] . '" ' . ( $mailing_list_for_abandoned_customers_selected == $mailer_service_list['id'] ? 'SELECTED=""' : '' ) . '>' . $mailer_service_list['name'] . '</option>';
											}
										} ?>
								    </select>
								</div>
							</div>
						</div>

						<?php if ($mailer_service == 'drip') { ?>
							<div class="col-sm-12">
								<label class="col-sm-3 control-label">Mailing list type for opt-in</label>
								<div class="col-sm-9 selectContainer">
									<div class="input-group">
										<span class="input-group-addon"><i class="fa fa-envelope-o" aria-hidden="true"></i></span>
										<select class="form-control" id="mailing_subscriber_drip_list_type" onchange="drip_list_type_selected('opt_in')">
											<option value="">Select</option>
											<option value="campaign" <?php echo ( $mailing_subscriber_drip_list_type == 'campaign' ? 'SELECTED=""' : '' ) ?>>Campaign</option>
											<option value="workflow" <?php echo ( $mailing_subscriber_drip_list_type == 'workflow' ? 'SELECTED=""' : '' ) ?>>Workflow</option>
										</select>
									</div>
								</div>
							</div>
						<?php } ?>

						<div class="col-sm-12 opt_in_div">
							<label class="col-sm-3 control-label">Mailing list for opt-in</label>
							<div class="col-sm-9 selectContainer">
								<div class="input-group">
									<span class="input-group-addon"><i class="fa fa-envelope-o" aria-hidden="true"></i></span>
									<select class="form-control" id="mailing_list_for_subscribers">
								        <option value="">Select</option>

										<?php
										if ($mailer_service == 'drip') {
											$mailer_service_lists = $subscribed_mailer_service_lists;
										}
										foreach( $mailer_service_lists as $mailer_service_list ) {
											if ($mailer_service == 'aweber') {
												echo '<option value="' . $mailer_service_list['link'] . '" ' . ( $mailing_list_for_subscribers_selected == $mailer_service_list['link'] ? 'SELECTED=""' : '' ) . '>' . $mailer_service_list['name'] . '</option>';
											}
											else
											{
												echo '<option value="' . $mailer_service_list['id'] . '" ' . ( $mailing_list_for_subscribers_selected == $mailer_service_list['id'] ? 'SELECTED=""' : '' ) . '>' . $mailer_service_list['name'] . '</option>';
											}

										} ?>
								    </select>
								</div>
							</div>
						</div>
						<?php if ($mailer_service == 'drip') { ?>
							<div class="col-sm-12">
								<label class="col-sm-3 control-label">Mailing list type for buyers </label>
								<div class="col-sm-9 selectContainer">
									<div class="input-group">
										<span class="input-group-addon"><i class="fa fa-envelope-o" aria-hidden="true"></i></span>
										<select class="form-control" id="completed_order_drip_list_type" onchange="drip_list_type_selected('completed')">
											<option value="">Select</option>
											<option value="campaign" <?php echo ( $completed_order_drip_list_type == 'campaign' ? 'SELECTED=""' : '' ) ?>>Campaign</option>
											<option value="workflow" <?php echo ( $completed_order_drip_list_type == 'workflow' ? 'SELECTED=""' : '' ) ?>>Workflow</option>
										</select>
									</div>
								</div>
							</div>
						<?php } ?>

						<?php
							if ($mailer_service == 'aweber') {
								$id_for_completed_list = 'completed_aweber_list_id';
							}else if ($mailer_service == 'klaviyo'){
								$id_for_completed_list = 'completed_klaviyo_list_id';
							}else if ($mailer_service == 'drip'){
								$id_for_completed_list = 'completed_drip_list_id';
							}else if ($mailer_service == 'mailchimp'){
								$id_for_completed_list = 'completed_mailchimp_list_id';
							}
						?>

						<div class="col-sm-12 buyers_div">
							<label class="col-sm-3 control-label">Mailing list for buyers</label>
							<div class="col-sm-9 selectContainer">
								<div class="input-group">
									<span class="input-group-addon"><i class="fa fa-envelope-o" aria-hidden="true"></i></span>
									<select id="<?php echo $id_for_completed_list ?>" name="<?php echo $id_for_completed_list ?>" class="form-control">
									<option value="">Select</option>
										<?php
										if ($mailer_service == 'drip') {
											$mailer_service_lists = $completed_mailer_service_lists;
										}
										foreach( $mailer_service_lists as $mailer_service_list ) {
											if ($mailer_service == 'aweber') {
												echo '<option value="' . $mailer_service_list['link'] . '" ' . ( $mailing_list_for_completed_customers_selected == $mailer_service_list['link'] ? 'SELECTED=""' : '' ) . '>' . $mailer_service_list['name'] . '</option>';
											}
											else
											{
												echo '<option value="' . $mailer_service_list['id'] . '" ' . ( $mailing_list_for_completed_customers_selected == $mailer_service_list['id'] ? 'SELECTED=""' : '' ) . '>' . $mailer_service_list['name'] . '</option>';
											}
										} ?>
									</select>
								</div>
							</div>
						</div>
						<?php } ?>
					</div>
				</fieldset>
			</form>
		  </div>
		</div>
	  </div>
		<!-- Button -->
	<div class="col-sm-12 pull-right" style="width:100%;text-align:right;">
			<button  type="button" style="margin-right:-1px;margin-bottom: 17px;" class="btn btn-primary"  onclick="add_meta_funnel( <?php echo $funnel_id; ?>)">Save settings</button>
	</div>
	<div class="clearfix"></div>

	<div class="loader" hidden></div>

	<input type="text" id="one_upsell_status" value="<?php echo get_shop_meta($shop_id,'shop_to_funnel_status'); ?>" hidden>

	<input type="text" id="parent_index"  value="null" hidden />
	<input type="text" id="current_index" value="0" hidden />
	<input type="text" id="decision_type" value="LM" hidden />
	<textarea  id="funnel_array"  rows="20" cols="100" hidden >
	<?php
		if ( get_funnel_meta($funnel_id,'funnel_code') == "") {
			echo json_encode($funnel);
		}
		else if (get_funnel_meta($funnel_id,'funnel_code') != "") {
			echo get_funnel_meta($funnel_id,'funnel_code');
		}
	 ?>
	 </textarea>
	<?php
		// echo '<textarea  id="landing_page_product_array"  rows="20" cols="100" hidden>'.(get_shop_meta($shop_id,'shop_to_funnel_status') == 'enable' ? get_shop_meta($shop_id,'landing_page_product_array') : "").'</textarea>';
		$landing_page_product_array = get_shop_meta($shop_id,'landing_page_product_array');
		if($landing_page_product_array == 'null'){
			$landing_page_product_array = "";
		}
		$landing_page_tag_array = get_shop_meta($shop_id,'landing_page_tag_array');
		if($landing_page_tag_array == 'null'){
			$landing_page_tag_array = "";
		}
	?>

	<textarea  id="landing_page_product_array"  rows="20" cols="100" hidden><?php echo $landing_page_product_array; ?></textarea>
	<textarea  id="landing_page_tag_array"  rows="20" cols="100" hidden><?php echo $landing_page_tag_array; ?></textarea>

	<div class="msc-confirm" style="display: none; z-index: 100001;"><div class="msc-overlay"><button class="msc-close" onclick="hide_landing_page_product_warning();">×</button></div><div class="msc-content msc-confirm--animate"><h3 class="msc-title">Sorry</h3><div class="msc-body"><p class="msc-sub">Product is already enlisted in a funnel</p></div><div class="msc-action"><button class="msc-cancel pull-right" onclick="hide_landing_page_product_warning();">Cancel</button></div></div></div>
	<div class="msc-confirm msc_confirm_tag" style="display: none; z-index: 100001;"><div class="msc-overlay"><button class="msc-close" onclick="hide_landing_page_product_warning();">×</button></div><div class="msc-content msc-confirm--animate"><h3 class="msc-title">Sorry</h3><div class="msc-body"><p class="msc-sub">Tag is already enlisted in a funnel</p></div><div class="msc-action"><button class="msc-cancel pull-right" onclick="hide_landing_page_product_warning();">Cancel</button></div></div></div>
	<textarea  id="funnel_checkout_conf"  rows="20" cols="100" hidden>
		<?php
			if ( get_funnel_meta($funnel_id,'funnel_checkout_conf') == "") {
				echo json_encode($funnel_checkout_conf);
			}
			else if (get_funnel_meta($funnel_id,'funnel_checkout_conf') != "") {
				echo get_funnel_meta($funnel_id,'funnel_checkout_conf');
			}
		 ?>
	</textarea>

	<textarea id="all_pages_array" hidden>
			<?php echo json_encode($pages_without_html_array); ?>
	</textarea>

	<textarea id="latest_funnel_array" hidden>
		<?php echo get_funnel_meta($funnel_id,'funnel_code'); ?>
	</textarea>
	<textarea id="full_shop_url" hidden><?php echo $full_shop_url ?></textarea>
	<textarea id="shopify_proxy_prefix" hidden><?php echo SHOPIFY_PROXY_PREFIX ?></textarea>
	<textarea id="product_handle_array" hidden><?php echo json_encode($product_handle_array) ?></textarea>


<?php
	footing();
	function process_add_new_funnel() {
		global $mysqli;
		$mysqli->query("INSERT INTO funnels ( date, last_updated, shop_id, title ) VALUES ('" . date("Y-m-d H:i:s") . "', '" . date("Y-m-d H:i:s") . "', '" . $_SESSION[ SESSIONNAME ]['shop_id'] . "', '" .addslashes ($_REQUEST['funnel_title'] ). "')");
		$res = $mysqli->query("SELECT id FROM funnels ORDER BY id DESC LIMIT 1");
		$arr = $res->fetch_array( MYSQLI_ASSOC );
		header("location:" . BASE . "/funnel/" . $arr['id'] );
	}

	function process_edit_funnel_and_create_funnel_meta_in_db(){
		global $mysqli;
		$funnel_title = $_REQUEST['funnel_title'];
		$funnel_array = $_REQUEST['funnel_array'];
		$landing_page_product_array = $_REQUEST['landing_page_product_array'];
		$landing_page_tag_array = $_REQUEST['landing_page_tag_array'];
		$funnel_checkout_conf = $_REQUEST['funnel_checkout_conf'];
		$url_handle = $_REQUEST['url_handle'];
		$url_handle = str_replace('"', "", $url_handle);
		$url_handle = str_replace("'", "", $url_handle);
		$url_handle = str_replace("&", "", $url_handle);
		$analytics_id = $_REQUEST['analytics_id'];
		$facebook_pixel_id = $_REQUEST['facebook_pixel_id'];
		$mailing_list_for_subscribers = $_REQUEST['mailing_list_for_subscribers'];
		$mailing_list_for_abandoned_customers = $_REQUEST['mailing_list_for_abandoned_customers'];
		$abandoned_drip_list_type = $_REQUEST['abandoned_drip_list_type'];
		$mailing_subscriber_drip_list_type = $_REQUEST['mailing_subscriber_drip_list_type'];
		$completed_order_drip_list_type = $_REQUEST['completed_order_drip_list_type'];

		$completed_drip_list_id = $_REQUEST['completed_drip_list_id'];
		$completed_klaviyo_list_id = $_REQUEST['completed_klaviyo_list_id'];
		$completed_aweber_list_id = $_REQUEST['completed_aweber_list_id'];
		$completed_mailchimp_list_id = $_REQUEST['completed_mailchimp_list_id'];


		$funnel_id =  $_REQUEST['funnel_id'];
		$mysqli->query("UPDATE funnels SET title = '$funnel_title' WHERE id = $funnel_id ");
		add_funnel_meta( $funnel_id, 'funnel_code',  $funnel_array );
		add_funnel_meta( $funnel_id, 'funnel_checkout_conf',  $funnel_checkout_conf );
		add_funnel_meta( $funnel_id, 'url_handle', $url_handle );
		add_funnel_meta( $funnel_id, 'google_analytics_id', $analytics_id );
		add_funnel_meta( $funnel_id, 'facebook_pixel_id', $facebook_pixel_id );
		if (isset($_REQUEST['shopify_tag_name'])) {
			add_funnel_meta( $funnel_id, 'shopify_tag_name', $_REQUEST['shopify_tag_name'] );
		}
		$shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];
		if (get_shop_meta($shop_id,'shop_to_funnel_status') == 'enable') {
			add_shop_meta($shop_id, 'landing_page_product_array', $landing_page_product_array);
			add_shop_meta($shop_id, 'landing_page_tag_array', $landing_page_tag_array);
		}
		$mailer_service = get_shop_meta( $shop_id, 'mailer_service' );
		if ($mailer_service == 'mailchimp') {
			add_funnel_meta( $funnel_id, 'subscribed_mailchimp_list_id', $mailing_list_for_subscribers );
			add_funnel_meta( $funnel_id, 'abandoned_mailchimp_list_id', $mailing_list_for_abandoned_customers );
			add_funnel_meta( $funnel_id, 'completed_mailchimp_list_id', $completed_mailchimp_list_id );
		}
		elseif ($mailer_service == 'aweber'){
			add_funnel_meta( $funnel_id, 'subscribed_aweber_list_id', $mailing_list_for_subscribers );
			add_funnel_meta( $funnel_id, 'abandoned_aweber_list_id', $mailing_list_for_abandoned_customers );
			add_funnel_meta( $funnel_id, 'completed_aweber_list_id', $completed_aweber_list_id );
		}
		elseif ($mailer_service == 'klaviyo'){
			add_funnel_meta( $funnel_id, 'subscribed_klaviyo_list_id', $mailing_list_for_subscribers );
			add_funnel_meta( $funnel_id, 'abandoned_klaviyo_list_id', $mailing_list_for_abandoned_customers );
			add_funnel_meta( $funnel_id, 'completed_klaviyo_list_id', $completed_klaviyo_list_id );
		}
		elseif ($mailer_service == 'drip'){
			add_funnel_meta( $funnel_id, 'subscribed_drip_list_id', $mailing_list_for_subscribers );
			add_funnel_meta( $funnel_id, 'abandoned_drip_list_id', $mailing_list_for_abandoned_customers );
			add_funnel_meta( $funnel_id, 'abandoned_drip_list_type', $abandoned_drip_list_type );
			add_funnel_meta( $funnel_id, 'mailing_subscriber_drip_list_type', $mailing_subscriber_drip_list_type );
			add_funnel_meta( $funnel_id, 'completed_order_drip_list_type', $completed_order_drip_list_type );
			add_funnel_meta( $funnel_id, 'completed_drip_list_id', $completed_drip_list_id );

		}

		$BASE =BASE;
		echo "$BASE/funnel/$funnel_id";
	}
?>
