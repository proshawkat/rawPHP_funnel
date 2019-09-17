<?php
	heading();
	$shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];
?>

<div class="clearfix"></div>
<div class="row">
  	<div class="col-md-12 col-sm-12 col-xs-12">
    	<div class="x_panel">
      		<div class="x_title">
        		<h2>General settings</h2>                    
        		<div class="clearfix"></div>
      		</div>
      		<div class="x_content">
        		<br />
				<form style="display:_none" action="<?php echo BASE ?>/settings/?process=save_settings" method="post" enctype="multipart/form-data" class="form-horizontal form-label-left">
					
					<?php
	        			$default_checkout_type = get_shop_meta( $shop_id, 'default_checkout_type' );
	        		?>
					<div class="form-group">
						<label for="default_checkout_type" class="col-sm-3 control-label" style="text-align:left;">Default checkout</label>
						<div class="col-sm-9">
							<select name="default_checkout_type" id="default_checkout_type" class="form-control">
			      			 	<option value="built-in">Shopify checkout</option>
			      			 	<option value="custom" <?php echo ( $default_checkout_type == 'custom' ? 'SELECTED=""' : '' ) ?>>Funnel buildr checkout</option>
			      			</select>
						</div>
					</div>

					<div class="form-group">
						<label for="google_analytics_id" class="col-sm-3 control-label" style="text-align:left;">Your google analytics id</label>
						<div class="col-sm-9">
						   <input type="text" class="form-control" name="google_analytics_id" id="google_analytics_id" placeholder="example: UA-19410456-3" value="<?php echo get_shop_meta($shop_id,"google_analytics_id"); ?>">
						</div>
					</div>

					<div class="form-group">
                        <label for="trackify_id" class="col-sm-3 control-label" style="text-align: left;">Trackify</label>
                        <div class="col-sm-9">
                            <select class="form-control" name="trackify_id" id="trackify_id" onchange="trackify_selection()">
                                <option value="enable" 
                                <?php 
                                    if (get_shop_meta($shop_id, 'trackify') == "enable" ) 
                                    {
                                        echo 'selected="selected"';
                                    }
                                ?> > Enable</option>
                                <option value="disable"
                                <?php 
                                    if (get_shop_meta($shop_id, 'trackify') == "disable" || get_shop_meta($shop_id, 'trackify') == '' )
                                    {
                                        echo 'selected="selected"';
                                    }
                                ?>  > Disable </option>
                            </select>
                        </div>
                    </div> 

					<div id="facebook_id" class="form-group" <?php
                        if (get_shop_meta($shop_id, 'trackify') == "enable" ) 
                        {
                            echo "style='display:none;'";
                        }
                        else
                        { 
                            echo "style='display:_none;'";
                        }
                    ?> >
						<label for="facebook_pixel_id" class="col-sm-3 control-label" style="text-align:left;">Your facebook advertising pixel id</label>
						<div class="col-sm-9">
							<input type="text" class="form-control" name="facebook_pixel_id" id="facebook_pixel_id" placeholder="example: 298002197207590" value="<?php echo get_shop_meta($shop_id,"facebook_pixel_id"); ?>">
						</div>
					</div>

					<?php 
						$mailer_service = get_shop_meta( $shop_id, 'mailer_service' );
					?>

					<div class="form-group">
						<label for="mailer_service" class="col-sm-3 control-label" style="text-align:left;">Email service</label>
						<div class="col-sm-9">
							<select id="mailer_service" name="mailer_service" class="form-control" onchange="mailer_selected(this.value)">
								<option value="">Select</option>
								<option value="aweber" <?php echo ( $mailer_service == 'aweber' ? 'SELECTED=""' : '' ) ?> >Aweber</option>
								<option value="mailchimp" <?php echo ( $mailer_service == 'mailchimp' ? 'SELECTED=""' : '' ) ?> >Mailchimp</option>
								<option value="drip" <?php echo ( $mailer_service == 'drip' ? 'SELECTED=""' : '' ) ?> >Drip</option>
								<option value="klaviyo" <?php echo ( $mailer_service == 'klaviyo' ? 'SELECTED=""' : '' ) ?> >Klaviyo</option>
							</select>
						</div>
					</div>

					<div class="form-group" id="mailer_service_aweber" <?php echo ( $mailer_service == 'aweber' ? '' : 'style="display:none;"' ) ?> >
		  				<label for="mailer_service" class="col-sm-3 control-label" style="text-align:left;">Aweber</label>
		  				<div class="col-md-9">
		  					<?php if( get_shop_meta( $shop_id, 'consumerKey' ) != '' ) { ?>
		  					<a href="<?php echo BASE ?>/settings/?process=aweber_disconnect" class="btn btn-danger">Disconnect aweber</a>
		  					<?php } else { ?>
		  					<label for="aweber_auth_code">Insert authorization code [ <a href="https://auth.aweber.com/1.0/oauth/authorize_app/<?php echo AWEBER_APP_ID ?>" target="_blank">Get authorization code</a> ]</label>
		  					<textarea id="aweber_auth_code" name="aweber_auth_code" class="form-control"></textarea>
		  					<?php } ?>
		  				</div>
		  			</div>

		  			<div class="form-group" id="mailer_service_mailchimp" <?php echo ( $mailer_service == 'mailchimp' ? '' : 'style="display:none;"' ) ?> >
		  				<label for="mailer_service_mailchimp" class="col-sm-3 control-label" style="text-align:left;">Mailchimp</label>
		  				<div class="col-md-9">
		  					<?php if( get_shop_meta( $shop_id, 'mailchimp_access_token' ) != '' ) { ?>
		  					<a href="<?php echo BASE ?>/settings/?process=mailchimp_disconnect" class="btn btn-danger">Disconnect mailchimp</a>
		  					<?php } else { ?>
		  					<a target="_blank" href="https://login.mailchimp.com/oauth2/authorize?response_type=code&client_id=<?php echo MAILCHIMP_CLIENT_ID ?>&redirect_uri=<?php echo urlencode( BASE . '/settings/?process=mailchimp_connect' ) ?>" class ="mail_subscribe_button" >
								<span style="border-right:1px solid #7297ad;  padding-right:5px;"><i class="fa fa-sign-in" aria-hidden="true"></i></span> 
								<span>Connect mailchimp</span>
							</a>

		  					<?php } ?>
		  				</div>
		  			</div>

		  			<div class="form-group" id="mailer_service_drip" <?php echo ( $mailer_service == 'drip' ? '' : 'style="display:none;"' ) ?> >
		  				<label for="mailer_service_drip" class="col-sm-3 control-label" style="text-align:left;">Drip</label>
		  				<div class="col-md-9">
		  					<?php if( get_shop_meta( $shop_id, 'drip_access_token' ) != '' ) { ?>
		  					<a href="<?php echo BASE ?>/settings/?process=drip_disconnect" class="btn btn-danger">Disconnect drip</a>
		  					<?php } else { ?>

		  					<a target="_blank" href="https://www.getdrip.com/oauth/authorize?response_type=code&client_id=<?php echo DRIP_CLIENT_ID ?>&redirect_uri=<?php echo urlencode( BASE . '/drip_connect/' ) ?>" class ="mail_subscribe_button" >
								<span style="border-right:1px solid #7297ad;  padding-right:5px;"><i class="fa fa-sign-in" aria-hidden="true"></i></span> 
								<span>Connect drip</span>
							</a>
		  					<?php } ?>
		  				</div>
		  			</div>

		  			<div class="form-group" id="mailer_service_klaviyo" <?php echo ( $mailer_service == 'klaviyo' ? '' : 'style="display:none;"' ) ?> >
		  				<label for="mailer_service_klaviyo" class="col-sm-3 control-label" style="text-align:left;">Klaviyo private api key</label>
		  				<div class="col-md-9">
		  					<input type="text" class="form-control" id="klaviyo_api_key" name="klaviyo_api_key" value="<?php echo get_shop_meta( $shop_id, 'klaviyo_api_key' ) ?>">
		  				</div>
		  			</div>

		  			<?php 
		  				if( $mailer_service == 'mailchimp' ) {
		  					$mailchimp_lists = mailchimp_lists();
							$abandoned_mailchimp_list_id = get_shop_meta( $shop_id, 'abandoned_mailchimp_list_id' );
							$subscribed_mailchimp_list_id = get_shop_meta( $shop_id, 'subscribed_mailchimp_list_id' );
							$completed_mailchimp_list_id = get_shop_meta( $shop_id, 'completed_mailchimp_list_id' );
		  			?>
		  			<div class="form-group mailchimp_abandoned_div">
						<label for="abandoned_mailchimp_list_id" class="col-sm-3 control-label" style="text-align:left;">Mailing list for abandoned carts</label>
						<div class="col-sm-9">
							<select id="abandoned_mailchimp_list_id" name="abandoned_mailchimp_list_id" class="form-control">
								<option value="">Select</option>
								<?php foreach( $mailchimp_lists as $mailchimp_list ) { 
									echo '<option value="' . $mailchimp_list['id'] . '" ' . ( $mailchimp_list['id'] == $abandoned_mailchimp_list_id ? 'SELECTED=""' : '' ) . '>' . $mailchimp_list['name'] . '</option>';
								} ?>
							</select>
						</div>
					</div>
					<div class="form-group mailchimp_subscribed_div">
						<label for="subscribed_mailchimp_list_id" class="col-sm-3 control-label" style="text-align:left;">Mailing list for opt-in</label>
						<div class="col-sm-9">
							<select id="subscribed_mailchimp_list_id" name="subscribed_mailchimp_list_id" class="form-control">
								<option value="">Select</option>
								<?php foreach( $mailchimp_lists as $mailchimp_list ) { 
									echo '<option value="' . $mailchimp_list['id'] . '" ' . ( $mailchimp_list['id'] == $subscribed_mailchimp_list_id ? 'SELECTED=""' : '' ) . '>' . $mailchimp_list['name'] . '</option>';
								} ?>
							</select>
						</div>
					</div>
					<div class="form-group mailchimp_completed_div">
						<label for="completed_mailchimp_list_id" class="col-sm-3 control-label" style="text-align:left;">Mailing list for buyers</label>
						<div class="col-sm-9">
							<select id="completed_mailchimp_list_id" name="completed_mailchimp_list_id" class="form-control">
								<option value="">Select</option>
								<?php foreach( $mailchimp_lists as $mailchimp_list ) { 
									echo '<option value="' . $mailchimp_list['id'] . '" ' . ( $mailchimp_list['id'] == $completed_mailchimp_list_id ? 'SELECTED=""' : '' ) . '>' . $mailchimp_list['name'] . '</option>';
								} ?>
							</select>
						</div>
					</div>
			  		<?php
		  				} elseif( $mailer_service == 'aweber' ) {
		  					$aweber_lists = aweber_campaign_list();
		  					$abandoned_aweber_list_url = get_shop_meta( $shop_id, 'abandoned_aweber_list_url' );
		  					$subscribed_aweber_list_id = get_shop_meta( $shop_id, 'subscribed_aweber_list_id' );
		  					$completed_aweber_list_id = get_shop_meta( $shop_id, 'completed_aweber_list_id' );
		  					
		  			?>
		  			<div class="form-group aweber_abandoned_div">
						<label for="abandoned_aweber_list_url" class="col-sm-3 control-label" style="text-align:left;">Mailing list for abandoned carts</label>
						<div class="col-sm-9">
		  					<select id="abandoned_aweber_list_url" name="abandoned_aweber_list_url" class="form-control">
								<option value="">Select</option>
								<?php foreach( $aweber_lists as $aweber_list ) { 
									echo '<option value="' . $aweber_list['link'] . '" ' . ( $abandoned_aweber_list_url == $aweber_list['link'] ? 'SELECTED=""' : '' ) . '>' . $aweber_list['name'] . '</option>';
								} ?>
							</select>
						</div>
					</div>
					<div class="form-group aweber_subscribed_div">
						<label for="subscribed_aweber_list_id" class="col-sm-3 control-label" style="text-align:left;">Mailing list for opt-in</label>
						<div class="col-sm-9">
							<select id="subscribed_aweber_list_id" name="subscribed_aweber_list_id" class="form-control">
								<option value="">Select</option>
								<?php foreach( $aweber_lists as $aweber_list ) { 
									echo '<option value="' . $aweber_list['link'] . '" ' . ( $subscribed_aweber_list_id == $aweber_list['link'] ? 'SELECTED=""' : '' ) . '>' . $aweber_list['name'] . '</option>';
								} ?>
							</select>
						</div>
					</div>
					<div class="form-group aweber_completed_div">
						<label for="completed_aweber_list_id" class="col-sm-3 control-label" style="text-align:left;">Mailing list for buyers</label>
						<div class="col-sm-9">
							<select id="completed_aweber_list_id" name="completed_aweber_list_id" class="form-control">
								<option value="">Select</option>
								<?php foreach( $aweber_lists as $aweber_list ) { 
									echo '<option value="' . $aweber_list['link'] . '" ' . ( $completed_aweber_list_id == $aweber_list['link'] ? 'SELECTED=""' : '' ) . '>' . $aweber_list['name'] . '</option>';
								} ?>
							</select>
						</div>
					</div>
					<?php
		  				} else if( $mailer_service == 'klaviyo' ) {
		  					$klaviyo_lists = klaviyo_lists();
		  					$abandoned_klaviyo_list_id = get_shop_meta( $shop_id, 'abandoned_klaviyo_list_id' );
		  					$subscribed_klaviyo_list_id = get_shop_meta( $shop_id, 'subscribed_klaviyo_list_id' );
		  					$completed_klaviyo_list_id = get_shop_meta( $shop_id, 'completed_klaviyo_list_id' );
		  			?>
		  			<div class="form-group klaviyo_abandoned_div">
						<label for="abandoned_klaviyo_list_id" class="col-sm-3 control-label" style="text-align:left;">Mailing list for abandoned carts</label>
						<div class="col-sm-9">
							<select id="abandoned_klaviyo_list_id" name="abandoned_klaviyo_list_id" class="form-control">
								<option value="">Select</option>
								<?php foreach( $klaviyo_lists as $klaviyo_list ) { 
									echo '<option value="' . $klaviyo_list['id'] . '" ' . ( $abandoned_klaviyo_list_id == $klaviyo_list['id'] ? 'SELECTED=""' : '' ) . '>' . $klaviyo_list['name'] . '</option>';
								} ?>
							</select>
						</div>
					</div>
					<div class="form-group klaviyo_subscribed_div">
						<label for="subscribed_klaviyo_list_id" class="col-sm-3 control-label" style="text-align:left;">Mailing list for opt-in</label>
						<div class="col-sm-9">
							<select id="subscribed_klaviyo_list_id" name="subscribed_klaviyo_list_id" class="form-control">
								<option value="">Select</option>
								<?php foreach( $klaviyo_lists as $klaviyo_list ) { 
									echo '<option value="' . $klaviyo_list['id'] . '" ' . ( $subscribed_klaviyo_list_id == $klaviyo_list['id'] ? 'SELECTED=""' : '' ) . '>' . $klaviyo_list['name'] . '</option>';
								} ?>
							</select>
						</div>
					</div>
					<div class="form-group klaviyo_completed_div">
						<label for="completed_klaviyo_list_id" class="col-sm-3 control-label" style="text-align:left;">Mailing list for buyers</label>
						<div class="col-sm-9">
							<select id="completed_klaviyo_list_id" name="completed_klaviyo_list_id" class="form-control">
								<option value="">Select</option>
								<?php foreach( $klaviyo_lists as $klaviyo_list ) { 
									echo '<option value="' . $klaviyo_list['id'] . '" ' . ( $completed_klaviyo_list_id == $klaviyo_list['id'] ? 'SELECTED=""' : '' ) . '>' . $klaviyo_list['name'] . '</option>';
								} ?>
							</select>
						</div>
					</div>
			  		<?php
		  				} else if( $mailer_service == 'drip' ) {
		  					$drip_campaigns = drip_campaigns();
		  					$abandoned_drip_list_type = get_shop_meta( $shop_id, 'abandoned_drip_list_type' );
		  					$mailing_subscriber_drip_list_type = get_shop_meta( $shop_id, 'mailing_subscriber_drip_list_type' );
		  					$completed_order_drip_list_type = get_shop_meta( $shop_id, 'completed_order_drip_list_type' );
		  					
							$abandoned_drip_list_id = get_shop_meta( $shop_id, 'abandoned_drip_list_id' );
							$subscribed_drip_list_id = get_shop_meta( $shop_id, 'subscribed_drip_list_id' );
							$completed_drip_list_id = get_shop_meta( $shop_id, 'completed_drip_list_id' );
							
							$drip_abandoned_lists = ( $abandoned_drip_list_type == 'workflow' ? $drip_campaigns['workflows'] : $drip_campaigns['campaigns'] );
							$drip_completed_lists = ( $completed_order_drip_list_type == 'workflow' ? $drip_campaigns['workflows'] : $drip_campaigns['campaigns'] );
							$drip_subscriber_lists = ( $mailing_subscriber_drip_list_type == 'workflow' ? $drip_campaigns['workflows'] : $drip_campaigns['campaigns'] );

		  			?>
		  			<div class="form-group drip_abandoned_list_type_div">
						<label for="abandoned_drip_list_type" class="col-sm-3 control-label" style="text-align:left;">Abandoned customers list type</label>
						<div class="col-sm-9">
							<select id="abandoned_drip_list_type" name="abandoned_drip_list_type" class="form-control" onchange="drip_list_type_selected('abandoned')">
								<option value="campaign">Campaign</option>
								<option value="workflow" <?php echo ( $abandoned_drip_list_type == 'workflow' ? 'SELECTED=""' : '' ) ?>>Workflow</option>
							</select>
						</div>
					</div>

		  			<div class="form-group drip_abandoned_div">
						<label for="abandoned_drip_list_id" class="col-sm-3 control-label" style="text-align:left;">Abandoned customers list</label>
						<div class="col-sm-9">
							<select id="abandoned_drip_list_id" name="abandoned_drip_list_id" class="form-control">
								<option value="">Select</option>
								<?php foreach( $drip_abandoned_lists as $drip_list ) { 
									echo '<option value="' . $drip_list['id'] . '" ' . ( $abandoned_drip_list_id == $drip_list['id'] ? 'SELECTED=""' : '' ) . '>' . $drip_list['name'] . '</option>';
								} ?>
							</select>
						</div>
					</div>
					
					<div class="form-group drip_abandoned_list_type_div">
						<label for="abandoned_drip_list_type" class="col-sm-3 control-label" style="text-align:left;">Mailing list type for opt-in</label>
						<div class="col-sm-9">
							<select id="mailing_subscriber_drip_list_type" name="mailing_subscriber_drip_list_type" class="form-control" onchange="drip_list_type_selected('opt_in')">
								<option value="">Select</option>
								<option value="campaign" <?php echo ( $mailing_subscriber_drip_list_type == 'campaign' ? 'SELECTED=""' : '' ) ?>>Campaign</option>
								<option value="workflow" <?php echo ( $mailing_subscriber_drip_list_type == 'workflow' ? 'SELECTED=""' : '' ) ?>>Workflow</option>
							</select>
						</div>
					</div>
					
					<div class="form-group drip_subscribed_div">
						<label for="subscribed_drip_list_id" class="col-sm-3 control-label" style="text-align:left;">Mailing list for opt-in</label>
						<div class="col-sm-9">
							<select id="subscribed_drip_list_id" name="subscribed_drip_list_id" class="form-control">
								<option value="">Select</option>
								<?php foreach( $drip_subscriber_lists as $drip_list ) { 
									echo '<option value="' . $drip_list['id'] . '" ' . ( $subscribed_drip_list_id == $drip_list['id'] ? 'SELECTED=""' : '' ) . '>' . $drip_list['name'] . '</option>';
								} ?>
							</select>
						</div>
					</div>
					<div class="form-group drip_abandoned_list_type_div">
						<label for="abandoned_drip_list_type" class="col-sm-3 control-label" style="text-align:left;">Mailing list type for buyers</label>
						<div class="col-sm-9">
							<select id="completed_order_drip_list_type" name="completed_order_drip_list_type" class="form-control" onchange="drip_list_type_selected('buyers')">
								<option value="">Select</option>
								<option value="campaign" <?php echo ( $completed_order_drip_list_type == 'campaign' ? 'SELECTED=""' : '' ) ?>>Campaign</option>
								<option value="workflow" <?php echo ( $completed_order_drip_list_type == 'workflow' ? 'SELECTED=""' : '' ) ?>>Workflow</option>
							</select>
						</div>
					</div>
					<div class="form-group drip_completed_div">
						<label for="completed_drip_list_id" class="col-sm-3 control-label" style="text-align:left;">Mailing list for buyers</label>
						<div class="col-sm-9">
							<select id="completed_drip_list_id" name="completed_drip_list_id" class="form-control">
								<option value="">Select</option>
								<?php foreach( $drip_completed_lists as $drip_list ) { 
									echo '<option value="' . $drip_list['id'] . '" ' . ( $completed_drip_list_id == $drip_list['id'] ? 'SELECTED=""' : '' ) . '>' . $drip_list['name'] . '</option>';
								} ?>
							</select>
						</div>
					</div>
			  		<?php
		  				}
		  			?>
					<div class="form-group">
                        <label for="shop_to_funnel_status" class="col-sm-3 control-label" style="text-align: left;">Activate shopify landing page</label>
                        <div class="col-sm-9">
                            <select class="form-control" name="shop_to_funnel_status" id="shop_to_funnel_status">
                                <option value="enable" 
                                <?php 
                                    if (get_shop_meta($shop_id, 'shop_to_funnel_status') == "enable" ) 
                                    {
                                        echo 'selected="selected"';
                                    }
                                ?> > Enable</option>
                                <option value="disable"
                                <?php 
                                    if (get_shop_meta($shop_id, 'shop_to_funnel_status') == "disable" || get_shop_meta($shop_id, 'shop_to_funnel_status') == '' )
                                    {
                                        echo 'selected="selected"';
                                    }
                                ?>  > Disable </option>
                            </select>
                        </div>
                    </div> 
					<div class="ln_solid"></div>
	          		<div class="row">
	            		<div class="col-md-12 col-sm-12 col-xs-12">
	              			<button type="submit" class="btn btn-info pull-right" style="background-color: #337ab7; border-color: #337ab7;">Update</button>
	            		</div>
	          		</div>
				</form>
			</div>
		</div>
	</div>
</div>

<?php 
	footing();
	function process_save_settings(){
		$shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];
		add_shop_meta( $shop_id, 'default_checkout_type', $_REQUEST['default_checkout_type'] );
		add_shop_meta( $shop_id, "facebook_pixel_id", $_REQUEST["facebook_pixel_id"] );
		add_shop_meta( $shop_id, "google_analytics_id", $_REQUEST["google_analytics_id"] );
		add_shop_meta( $shop_id, 'mailer_service', $_REQUEST['mailer_service'] );
		add_shop_meta( $shop_id, 'klaviyo_api_key', $_REQUEST['klaviyo_api_key'] );
		add_shop_meta( $shop_id, 'abandoned_mailchimp_list_id', $_REQUEST['abandoned_mailchimp_list_id'] );
		add_shop_meta( $shop_id, 'abandoned_aweber_list_url', $_REQUEST['abandoned_aweber_list_url'] );
		add_shop_meta( $shop_id, 'abandoned_klaviyo_list_id', $_REQUEST['abandoned_klaviyo_list_id'] );
		
		add_shop_meta( $shop_id, 'abandoned_drip_list_type', $_REQUEST['abandoned_drip_list_type'] );
		add_shop_meta( $shop_id, 'mailing_subscriber_drip_list_type', $_REQUEST['mailing_subscriber_drip_list_type'] );
		add_shop_meta( $shop_id, 'completed_order_drip_list_type', $_REQUEST['completed_order_drip_list_type'] );
		
		add_shop_meta( $shop_id, 'abandoned_drip_list_id', $_REQUEST['abandoned_drip_list_id'] );
		

		add_shop_meta( $shop_id, 'subscribed_mailchimp_list_id', $_REQUEST['subscribed_mailchimp_list_id'] );
		add_shop_meta( $shop_id, 'subscribed_aweber_list_id', $_REQUEST['subscribed_aweber_list_id'] );
		add_shop_meta( $shop_id, 'subscribed_klaviyo_list_id', $_REQUEST['subscribed_klaviyo_list_id'] );
		add_shop_meta( $shop_id, 'subscribed_drip_list_id', $_REQUEST['subscribed_drip_list_id'] );

		add_shop_meta( $shop_id, 'completed_mailchimp_list_id', $_REQUEST['completed_mailchimp_list_id'] );
		add_shop_meta( $shop_id, 'completed_aweber_list_id', $_REQUEST['completed_aweber_list_id'] );
		add_shop_meta( $shop_id, 'completed_klaviyo_list_id', $_REQUEST['completed_klaviyo_list_id'] );
		add_shop_meta( $shop_id, 'completed_drip_list_id', $_REQUEST['completed_drip_list_id'] );
		add_shop_meta( $shop_id, 'shop_to_funnel_status', $_REQUEST['shop_to_funnel_status'] );
		if ($_REQUEST['shop_to_funnel_status'] == 'enable') {
			$the_script_tag = BASE . '/funnel_v2_js/';
			require_once 'includes/shopify.php';
        	$sc = new ShopifyClient($_SESSION[ SESSIONNAME ]['shop'], $_SESSION[ SESSIONNAME ]['token'], SHOPIFY_API_KEY, SHOPIFY_SECRET);
        	$script_tags = $sc->call('GET', '/admin/script_tags.json' );
	    	$exists = false;
			foreach( $script_tags as $script_tag ) {
				if( $script_tag['src'] == $the_script_tag ) $exists = true;
			}
			if( !$exists ) $sc->call('POST', '/admin/script_tags.json', array( 'script_tag' => array( 'event' => 'onload', 'src' => $the_script_tag ) ) );
			
		}
		else if($_REQUEST['shop_to_funnel_status'] == 'disable'){
			$the_script_tag = BASE . '/funnel_v2_js/';
			require_once 'includes/shopify.php';
        	$sc = new ShopifyClient($_SESSION[ SESSIONNAME ]['shop'], $_SESSION[ SESSIONNAME ]['token'], SHOPIFY_API_KEY, SHOPIFY_SECRET);
        	$script_tags = $sc->call('GET', '/admin/script_tags.json?src='.$the_script_tag);
			foreach( $script_tags as $script_tag ) {
				$sc->call('DELETE', '/admin/script_tags/'.$script_tag['id'].'.json');
			}
		}
		if( $_REQUEST['aweber_auth_code'] != '' ) {
			require_once('includes/aweber_api/aweber_api.php');
			try {
			    $authorization_code = $_REQUEST['aweber_auth_code'];
			    $auth = AWeberAPI::getDataFromAweberID($authorization_code);
			    list($consumerKey, $consumerSecret, $accessKey, $accessSecret) = $auth;
			} catch(AWeberAPIException $exc) {
			    print "<h3>AWeberAPIException:</h3>";
			    print " <li> Type: $exc->type              <br>";
			    print " <li> Msg : $exc->message           <br>";
			    print " <li> Docs: $exc->documentation_url <br>";
			    print "<hr>";
			}

			add_shop_meta( $shop_id, 'consumerKey', $consumerKey );
			add_shop_meta( $shop_id, 'consumerSecret', $consumerSecret );
			add_shop_meta( $shop_id, 'accessKey', $accessKey );
			add_shop_meta( $shop_id, 'accessSecret', $accessSecret );
		}

		//gautam editing
		if ($_REQUEST['trackify_id'] == "disable") 
		{
			add_shop_meta($shop_id, 'trackify', "disable");
		}
		else
		{
			add_shop_meta($shop_id, 'trackify', 'enable');
		}
		//gautam editing

		header("location:".BASE. '/settings');
	}

	function process_aweber_complete_connection() {
		$shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];
		# Complete example on how to parse an authorization code.

		# Refer to our getting started guide for a complete API walkthrough
		# https://labs.aweber.com/snippets/gs/using_the_api

		require_once('includes/aweber_api/aweber_api.php');

		try {
		    # set $authorization_code to the code that is given to you from
		    # https://auth.aweber.com/1.0/oauth/authorize_app/YOUR_APP_ID
		    $authorization_code = $_REQUEST['code'];

		    $auth = AWeberAPI::getDataFromAweberID($authorization_code);
		    list($consumerKey, $consumerSecret, $accessKey, $accessSecret) = $auth;

		    # Store the Consumer key/secret, as well as the AccessToken key/secret
		    # in your app, these are the credentials you need to access the API.
		}
		catch(AWeberAPIException $exc) {
		    print "<h3>AWeberAPIException:</h3>";
		    print " <li> Type: $exc->type              <br>";
		    print " <li> Msg : $exc->message           <br>";
		    print " <li> Docs: $exc->documentation_url <br>";
		    print "<hr>";
		}

		# store api keys
		# redirect to integration page with message

		add_shop_meta( $shop_id, 'consumerKey', $consumerKey );
		add_shop_meta( $shop_id, 'consumerSecret', $consumerSecret );
		add_shop_meta( $shop_id, 'accessKey', $accessKey );
		add_shop_meta( $shop_id, 'accessSecret', $accessSecret );

		header('location:' . BASE . '/integrations/?msg=aweber_success');
	}

	function process_aweber_disconnect() {
		$shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];
		delete_shop_meta( $shop_id, 'consumerKey' );
		delete_shop_meta( $shop_id, 'consumerSecret' );
		delete_shop_meta( $shop_id, 'accessKey' );
		delete_shop_meta( $shop_id, 'accessSecret' );
		header('location:' . BASE . '/settings/?msg=aweber_success');
	}

	function add_aweber_subscriber() {
		$shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];
		// Complete example on how to add a subscriber to your List.

		// Refer to our getting started guide for a complete API walkthrough
		// https://labs.aweber.com/getting_started/main

		require_once('includes/aweber_api/aweber_api.php');

		$consumerKey    = get_shop_meta( $shop_id, 'consumerKey' );
	    $consumerSecret = get_shop_meta( $shop_id, 'consumerSecret' );
	    $accessKey      = get_shop_meta( $shop_id, 'accessKey' );
	    $accessSecret   = get_shop_meta( $shop_id, 'accessSecret' );
	    $listName       = ''; # replace with the name of the list
		$campaign_list = aweber_campaign_list();

		$aweber = new AWeberAPI($consumerKey, $consumerSecret);

		try {
		    $account = $aweber->getAccount($accessKey, $accessSecret);
		    $listURL = $campaign_list[0]['link'];
		    $list = $account->loadFromUrl($listURL);

		    # create a subscriber
		    $params = array(
		        'email' => 'pay2moin@gmail.com',
		        'ip_address' => '127.0.0.1',
		        'ad_tracking' => 'client_lib_example',
		        'misc_notes' => 'my cool app',
		        'name' => 'John Doe',
		        'custom_fields' => array(
		            'Car' => 'Ferrari 599 GTB Fiorano',
		            'Color' => 'Red',
		        ),
		        'tags' => array('cool_app', 'client_lib', 'other_tag'),
		    );
		    $subscribers = $list->subscribers;
		    $new_subscriber = $subscribers->create($params);

		    # success!
		    print "A new subscriber was added to the $list->name list!";

		} catch(AWeberAPIException $exc) {
		    print "<h3>AWeberAPIException:</h3>";
		    print " <li> Type: $exc->type              <br>";
		    print " <li> Msg : $exc->message           <br>";
		    print " <li> Docs: $exc->documentation_url <br>";
		    print "<hr>";
		    exit(1);
		}
	}

	function process_mailchimp_connect() {
		$shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];

		//Get authorization code
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, "https://login.mailchimp.com/oauth2/token");
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, "grant_type=authorization_code&client_id=" . MAILCHIMP_CLIENT_ID . "&client_secret=" . MAILCHIMP_CLIENT_SECRET . "&redirect_uri=" . urlencode( BASE . '/settings/?process=mailchimp_connect') . "&code=" . $_REQUEST['code'] );
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
			//Get authorization code
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, "https://login.mailchimp.com/oauth2/metadata");
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

			$headers = array();
			$headers[] = "User-Agent: oauth2-draft-v10";
			$headers[] = "Accept: application/json";
			$headers[] = "Authorization: OAuth " . $res->access_token;
			curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

			$result = curl_exec($ch);
			if (curl_errno($ch)) {
			    echo 'Error:' . curl_error($ch);
			}
			curl_close ($ch);

			$meta = json_decode( $result );

			add_shop_meta( $shop_id, 'mailer_service', 'mailchimp' );
			add_shop_meta( $shop_id, 'mailchimp_access_token', $res->access_token );
			add_shop_meta( $shop_id, 'mailchimp_dc', $meta->dc );
			add_shop_meta( $shop_id, 'mailchimp_api_endpoint', $meta->api_endpoint );
		}
		header("location:" . BASE . "/settings");
	}

	function process_mailchimp_disconnect() {
		$shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];
		add_shop_meta( $shop_id, 'mailer_service', '' );
		add_shop_meta( $shop_id, 'mailchimp_access_token', '' );
		add_shop_meta( $shop_id, 'mailchimp_dc', '' );
		add_shop_meta( $shop_id, 'mailchimp_api_endpoint', '' );
		header("location:" . BASE . "/settings");
	}

	function process_drip_disconnect() {
		$shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];
		add_shop_meta( $shop_id, 'mailer_service', '' );
		add_shop_meta( $shop_id, 'drip_access_token', '' );
		header("location:" . BASE . "/settings");
	}

	function process_reload_page_mailer() {
		$shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];
		$page_id = $_REQUEST['page_id'];
		$mailer_service = get_shop_meta( $shop_id, 'mailer_service' );
		$aweber_list_url = get_page_meta( $page_id, 'aweber_list_url' );
		$mailchimp_list_id = get_page_meta( $page_id, 'mailchimp_list_id' );
		$klaviyo_list_id = get_page_meta( $page_id, 'klaviyo_list_id' );
		$drip_campaign_type = get_page_meta( $page_id, 'drip_campaign_type' );
		$drip_campaign_id = get_page_meta( $page_id, 'drip_campaign_id' );
		$drip_workflow_id = get_page_meta( $page_id, 'drip_workflow_id' );


		if( $mailer_service != '' ) {
			echo '<input type="hidden" id="mailer_page_id" value="' . $page_id . '">';
			echo '<input type="hidden" id="mailer_service" value="' . $mailer_service . '">';
			echo '<div class="form-group">';
			if( $mailer_service == 'aweber' ) {
				$aweber_list = aweber_campaign_list();
				echo '<label for="aweber_list_url" class="col-sm-4 control-label" style="text-align:left;">Select aweber list</label>';
				echo '<div class="col-sm-8">';
					echo '<select name="aweber_list_url" id="aweber_list_url" class="form-control">';
					echo '<option value="">Select list</option>';
					foreach( $aweber_list as $list ) {
						echo '<option value="' . $list['link'] . '" ' . ( $aweber_list_url == $list['link'] ? 'SELECTED=""' : '' ) . '>' . $list['name'] . '</option>';
					}
					echo '</select>';
				echo '</div>';
			} elseif( $mailer_service == 'mailchimp' ) {
				$mailchimp_list = mailchimp_lists();
				echo '<label for="mailchimp_list_id" class="col-sm-4 control-label" style="text-align:left;">Select mailchimp list</label>';
				echo '<div class="col-sm-8">';
					echo '<select name="mailchimp_list_id" id="mailchimp_list_id" class="form-control">';
					echo '<option value="">Select list</option>';
					foreach( $mailchimp_list as $list ) {
						echo '<option value="' . $list['id'] . '" ' . ( $mailchimp_list_id == $list['id'] ? 'SELECTED=""' : '' ) . '>' . $list['name'] . '</option>';
					}
					echo '</select>';
				echo '</div>';
			} elseif( $mailer_service == 'klaviyo' ) {
				$klaviyo_list = klaviyo_lists();
				echo '<label for="klaviyo_list_id" class="col-sm-4 control-label" style="text-align:left;">Select klaviyo list</label>';
				echo '<div class="col-sm-8">';
					echo '<select name="klaviyo_list_id" id="klaviyo_list_id" class="form-control">';
					echo '<option value="">Select list</option>';
					foreach( $klaviyo_list as $list ) {
						echo '<option value="' . $list['id'] . '" ' . ( $klaviyo_list_id == $list['id'] ? 'SELECTED=""' : '' ) . '>' . $list['name'] . '</option>';
					}
					echo '</select>';
				echo '</div>';
			} elseif( $mailer_service == 'drip' ) {
				$drip_list = drip_campaigns();
				$drip_campaigns = $drip_list['campaigns'];
				$drip_workflows = $drip_list['workflows'];

				echo '<label for="drip_list_type" class="col-sm-4 control-label" style="text-align:left;">Select type</label>';
				echo '<div class="col-sm-8">';
					echo '<select name="drip_campaign_type" id="drip_campaign_type" class="form-control" onchange="javascript: document.getElementById(\'drip_select_campaign\').style.display = \'none\'; document.getElementById(\'drip_select_workflow\').style.display = \'none\'; if( this.value != \'\' ) { document.getElementById(\'drip_select_\' + this.value ).style.display = \'block\'; }">';
						echo '<option value="">Select type</option>';
						echo '<option value="campaign" ' . ( $drip_campaign_type == 'campaign' ? 'SELECTED=""' : '' ) . '>Campaign</option>';
						echo '<option value="workflow" ' . ( $drip_campaign_type == 'workflow' ? 'SELECTED=""' : '' ) . '>Workflow</option>';
					echo '</select>';
				echo '</div>';
				echo '<br><br>';
				echo '<div class="form-group" id="drip_select_campaign" style="' . ( $drip_campaign_type == 'campaign' ? '' : 'display:none' ) . '">';
					echo '<label for="drip_list_id" class="col-sm-4 control-label" style="text-align:left;">Select drip campaign</label>';
					echo '<div class="col-sm-8">';
						echo '<select name="drip_campaign_id" id="drip_campaign_id" class="form-control">';
						echo '<option value="">Select campaign</option>';
						foreach( $drip_campaigns as $campaign ) {
							echo '<option value="' . $campaign['id'] . '" ' . ( $drip_campaign_id == $campaign['id'] ? 'SELECTED=""' : '' ) . '>' . $campaign['name'] . '</option>';
						}
						echo '</select>';
					echo '</div>';
				echo '</div>';
				
				echo '<div class="form-group" id="drip_select_workflow" style="' . ( $drip_campaign_type == 'workflow' ? '' : 'display:none' ) . '">';
					echo '<label for="drip_workflow_id" class="col-sm-4 control-label" style="text-align:left;">Select drip workflow</label>';
					echo '<div class="col-sm-8">';
						echo '<select name="drip_workflow_id" id="drip_workflow_id" class="form-control">';
						echo '<option value="">Select workflow</option>';
						foreach( $drip_workflows as $workflow ) {
							echo '<option value="' . $workflow['id'] . '" ' . ( $drip_workflow_id == $workflow['id'] ? 'SELECTED=""' : '' ) . '>' . $workflow['name'] . '</option>';
						}
						echo '</select>';
					echo '</div>';
				echo '</div>';
			}
			echo '</div>';
		} else {
			echo '<p class="alert alert-danger">No mailing service is selected - <a href="' . BASE . '/settings/">select mailing service</a></p>';
		}
	}

	function process_save_page_mailer_list() {
		$shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];
		$page_id = $_REQUEST['page_id'];
		$mailer_service = $_REQUEST['mailer_service'];

		if( $mailer_service == 'aweber' ) add_page_meta( $page_id, 'aweber_list_url', $_REQUEST['list'] );
		elseif( $mailer_service == 'mailchimp' ) add_page_meta( $page_id, 'mailchimp_list_id', $_REQUEST['list'] );
		elseif( $mailer_service == 'klaviyo' ) add_page_meta( $page_id, 'klaviyo_list_id', $_REQUEST['list'] );
		elseif( $mailer_service == 'drip' ) {
			if( $_REQUEST['drip_campaign_type'] == 'campaign' ) add_page_meta( $page_id, 'drip_campaign_id', $_REQUEST['list'] );
			elseif( $_REQUEST['drip_campaign_type'] == 'workflow' ) add_page_meta( $page_id, 'drip_workflow_id', $_REQUEST['list'] );
			add_page_meta( $page_id, 'drip_campaign_type', $_REQUEST['drip_campaign_type'] );
		}
		echo '1';
	}
?>
