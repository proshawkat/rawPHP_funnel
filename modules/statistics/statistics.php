<?php
	//require 'includes/shopify.php';
	heading();
	//if( isset( $_SESSION[ SESSIONNAME ]['shop_id'] ) ) {
	$shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];
	$shop_name=$_SESSION[ SESSIONNAME]['shop'];
	$shop_currency = get_shop_meta( $shop_id, 'shop_currency' );
	$shop_domain = get_shop_meta( $shop_id, 'shop_domain');

	$force_ssl = get_shop_meta( $shop_id, 'force_ssl');
	$full_shop_url= ( $force_ssl > 0 ? 'https://' : 'http://' ) . $shop_domain;

	$sql = "SELECT pageviews.id, pageviews.browser, pageviews.device, pageviews.platform, pageviews.city, pageviews.country FROM pageviews WHERE pageviews.shop_id='$shop_id'";
	$sql_distinct = "SELECT DISTINCT pageviews.ip FROM pageviews WHERE pageviews.shop_id='$shop_id'";
 
 	$csql = "SELECT carts.id FROM carts WHERE carts.shop_id='$shop_id'";
 	$csql7 = "SELECT carts.id FROM carts WHERE carts.shop_id='$shop_id'";
 	
 	$asql7 = "SELECT carts.id FROM carts,cart_emails WHERE carts.shop_id='$shop_id'";
 	$asql1 = "SELECT carts.id FROM carts WHERE carts.shop_id='$shop_id'";
 	$asql2 = "SELECT carts.id FROM carts,cart_emails WHERE carts.shop_id='$shop_id'";

	if( isset( $break[ $start + 1 ] )){
		$funnel_id = explode("?", $break[ $start + 1 ] )[0];
	}

	if( isset( $break[ $start + 2 ] ) )  {
		$page_id = explode("?", $break[ $start + 2 ])[0];
	}
 
	if( isset( $page_id ) ) {
	  $sql .= " AND pageviews.page_id='$page_id'";
	  $sql_distinct .= " AND pageviews.page_id='$page_id'";
	}
 
	$all_pages = [];
	if( isset( $funnel_id ) && ( $funnel_id > -1 ) && ($funnel_id != "") ) {
		$sql .= " AND pageviews.funnel_id='$funnel_id'";
		$sql_distinct .= " AND pageviews.funnel_id='$funnel_id'";
		$csql .= " AND carts.funnel_id='$funnel_id'";
		$csql7 .= " AND carts.funnel_id='$funnel_id'";
		$asql7 .= " AND carts.funnel_id='$funnel_id'";
		$asql1 .= " AND carts.funnel_id='$funnel_id'";
		$asql2 .= " AND carts.funnel_id='$funnel_id'";

		$funnel_code = get_funnel_meta($funnel_id, "funnel_code");
		$all_pages = return_pages_list_from_funnel_array(json_decode($funnel_code));
	}
	//var_dump($all_pages);
	//get total views last seven days ago
	$seven_days_ago = date( 'Y-m-d H:i:s', mktime( 0, 0, 0, date('m'), ( date('j') - 7 ), date('Y') ) );
	$sql_seven_days_ago = $sql . " AND pageviews.date<='$seven_days_ago'";
	$sql_seven_days_ago_distinct = $sql_distinct . " AND pageviews.date<='$seven_days_ago'";
	$res_seven_days_ago = $mysqli->query( $sql_seven_days_ago );
	$total_views_seven_days_ago = $res_seven_days_ago->num_rows;
	$res_seven_days_ago_distinct = $mysqli->query( $sql_seven_days_ago_distinct );	

		
	$range_date = date( 'F d, Y', mktime( 0, 0, 0, date('m'), ( date('j') - 30 ), date('Y') ) )." - ".date("F d, Y");
	if( isset( $_REQUEST['startdate'] ) ) {
		$range_date = $_REQUEST['startdate']." - ".$_REQUEST['enddate'];

		$startdate = strtotime($_REQUEST['startdate']);
		$startdate = date('Y-m-d 00:00:00',$startdate);
		$enddate = strtotime($_REQUEST['enddate']);
		$enddate = date('Y-m-d 23:59:59',$enddate);
	}else{
		$thirty_days_ago = date( 'Y-m-d 00:00:00', mktime( 0, 0, 0, date('m'), ( date('j') - 30 ), date('Y') ) );
		$startdate = $thirty_days_ago;
		$enddate = date( 'Y-m-d 23:59:59', mktime( 0, 0, 0, date('m'), ( date('j') ), date('Y') ) );
	}
	$sql .= " AND pageviews.date BETWEEN '$startdate' AND '$enddate'";
	$sql_distinct .= " AND pageviews.date BETWEEN '$startdate' AND '$enddate'";
	$csql .= " AND carts.last_modified BETWEEN '$startdate' AND '$enddate'";
	//$asql .= " AND carts.last_modified BETWEEN '$startdate' AND '$enddate'";
	$asql1 .= " AND carts.last_modified BETWEEN '$startdate' AND '$enddate'";
	$asql2 .= " AND carts.last_modified BETWEEN '$startdate' AND '$enddate'";

	$drafts = $mysqli->query( $csql . " AND carts.status=0" );
	$drafts_seven_days_ago = $mysqli->query( $csql7 . " AND carts.status=0 AND carts.created<='$seven_days_ago'" );
	//$shipping = $mysqli->query( $asql . " AND ((carts.status<=2 AND carts.status>0) OR (carts.status = 0 AND carts.token = cart_emails.token))" );
	$shipping1 = $mysqli->query( $asql1 . " AND (carts.status<=2 AND carts.status>0)" );
	$shipping2 = $mysqli->query( $asql2 . " AND (carts.token = cart_emails.token AND carts.status = 0)");

	$shipping_seven_days_ago = $mysqli->query( $asql7 . " AND carts.status<=2 AND carts.status>0 AND carts.created<='$seven_days_ago'");
	$complete = $mysqli->query( $csql . " AND carts.status=4" );
	$complete_seven_days_ago = $mysqli->query( $csql7 . " AND carts.status=4 AND carts.created<='$seven_days_ago'" );
	//pageviews
	$res = $mysqli->query( $sql );
	$res_distinct = $mysqli->query( $sql_distinct );
	$total_views = $res->num_rows;
	$total_views_distinct = $res_distinct->num_rows;
	while( $row = $res->fetch_array( MYSQLI_ASSOC ) ) {
	  //if( $row['device'] != '' ) $devices[ $row['device'] ] += 1;
	  if( $row['device'] == 'mobile' ) $devices['mobile'] += 1;
	  else $devices['desktop'] += 1; 

	  if( $row['browser'] != '' ) $browsers[ $row['browser'] ] += 1;
	  if( $row['platform'] != '' ) $platforms[ $row['platform'] ] += 1;
	  if( $row['city'] != '' ) $cities[ $row['city'] ] += 1;
	  if( $row['country'] != '' ) $countries[ $row['country'] ] += 1;
	}
	$color_arr = array("blue","green","purple","aero","red");
	$color_arr_code = array("#3498DB","#1ABB9C","#9B59B6","#9CC2CB","#E74C3C");
	$total_city_view = 0;
	$total_country_view = 0;
	foreach($cities as $key => $value){
		$total_city_view += $value;
	}
	foreach($countries as $key => $value){
		$total_country_view += $value;
	}
	$statistic_details = array("total_page_view"=>$res->num_rows,"devices"=>$devices,"browsers"=>$browsers,"cities"=>$cities,"countries"=>$countries);
	if(isset( $_REQUEST['startdate'] )){
?>
		<script type="text/javascript">
			var range_date = "<?php echo $range_date; ?>";
			$( document ).ready(function() {
				init_daterangepicker();
				$("#reportrange span").html(range_date);
			});
		</script>
<?php } ?>

<div class="row">
	<div class="pull-right col-md-6">
		<div id="reportrange" class="pull-right" style="background: #fff; cursor: pointer; padding: 5px 10px; border: 1px solid #ccc">
			<i class="glyphicon glyphicon-calendar fa fa-calendar"></i>
			<span><?php echo $range_date; ?></span> <b class="caret"></b>
		</div>
	</div>
</div>
<div class="row tile_count">
<div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
  <span class="count_top"><i class="fa fa-user"></i> Total pageviews</span>
  <div class="count"><?php echo $res->num_rows ?></div>
  <?php $pageviews_increase = ( ( ( $res->num_rows - $res_seven_days_ago->num_rows ) / $res_seven_days_ago ) * 100 ); ?>
  <span class="count_bottom"><i class="<?php echo ( $pageviews_increase >= 0 ? 'green' : 'red' ); ?>"><i class="fa <?php echo ( $pageviews_increase >= 0 ? 'fa-sort-asc' : 'fa-sort-desc' ) ?>"></i><?php echo (number_format($pageviews_increase, 2) == "nan" ? '0':number_format($pageviews_increase, 2)); ?> % </i></span> from last week</span>
</div>
<div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
  <span class="count_top"><i class="fa fa-clock-o"></i> Unique pageviews</span>
  <div class="count"><?php echo $res_distinct->num_rows ?></div>
  <?php $unique_pageviews_increase = ( ( ( $res_distinct->num_rows - $res_seven_days_ago_distinct->num_rows ) / $res_seven_days_ago_distinct->num_rows ) * 100 ); ?>
  <span class="count_bottom"><i class="<?php echo ( $unique_pageviews_increase >= 0 ? 'green' : 'red' ) ?>"><i class="fa <?php echo ( $unique_pageviews_increase >= 0 ? 'fa-sort-asc' : 'fa-sort-desc' ) ?>"></i><?php echo (number_format($unique_pageviews_increase, 2) == "nan" ? '0':number_format($unique_pageviews_increase, 2)); ?> % </i> from last week</span>
</div>
<?php if( !isset( $page_id ) ) { ?>
<div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
  <span class="count_top"><i class="fa fa-cart-plus"></i> Total checkouts</span>
  <div class="count green"><?php echo $complete->num_rows; ?></div>
  <?php $complete_increase = ( ( ( $complete->num_rows - $complete_seven_days_ago->num_rows ) / $complete_seven_days_ago->num_rows ) * 100 ); ?>
  <span class="count_bottom"><i class="<?php echo ( $complete_increase >= 0 ? 'green' : 'red' ); ?>"><i class="fa <?php echo ( $complete_increase >= 0 ? 'fa-sort-asc' : 'fa-sort-desc' ) ?>"></i><?php echo (number_format($complete_increase, 2) == "nan" ? '0':number_format($complete_increase, 2)); ?> % </i></span> from last week</span>
</div>
<div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
  <span class="count_top"><i class="fa fa-cart-arrow-down"></i> Total abandons</span>
  <div class="count"><?php echo $shipping1->num_rows + $shipping2->num_rows  ?></div>
  <?php $shipping_increase = ( ( ( ($shipping1->num_rows+$shipping2->num_rows) - $shipping_seven_days_ago->num_rows ) / $shipping_seven_days_ago->num_rows ) * 100 ); ?>
  <span class="count_bottom"><i class="<?php echo ( $shipping_increase >= 0 ? 'green' : 'red' ); ?>"><i class="fa <?php echo ( $shipping_increase >= 0 ? 'fa-sort-asc' : 'fa-sort-desc' ) ?>"></i><?php echo (number_format($shipping_increase, 2) == "nan" ? '0':number_format($shipping_increase, 2)); ?> % </i></span> from last week</span>
</div>
<?php }?>
<?php 
    if(!isset($page_id)) {
        $pres = $mysqli->query("SELECT id FROM pages WHERE shop_id='$shop_id'AND (status = '1' OR status = '0')");
        $fres = $mysqli->query("SELECT id FROM funnels WHERE shop_id='$shop_id'");
        ?>
        <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
          <span class="count_top"><i class="fa fa-clone"></i> Total pages</span>
          <div class="count"><?php echo $pres->num_rows ?></div>
        </div>
        <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
          <span class="count_top"><i class="fa fa-sitemap"></i> Total funnels</span>
          <div class="count"><?php echo $fres->num_rows ?></div>
        </div>
    <?php } ?>
</div>
<!-- /top tiles -->

<div class="row">

	<?php if(count($all_pages) > 0){ ?>
	<div class="col-md-12 col-sm-12 col-xs-12">
		<div class="x_panel">
		  <div class="x_title">
		    <h2>Pages information</h2>
		    <div class="clearfix"></div>
		  </div>
		  <div class="x_content">
		    <table class="table">
		      <thead>
		        <tr>
		          <th>Page name</th>
		          <th class="text-center">Total pageviews</th>
		          <th class="text-center">Unique pageviews</th>
		          <th class="text-center">Total checkouts</th>
		          <th class="text-center">Total abandons</th>
		          <th class="text-center">See fullview</th>
		        </tr>
		      </thead>
		      <tbody>
		      	<?php 
		      		$count = 1;
		      		foreach ($all_pages as $key => $page_id) {
		      			$all_pages_sql = "SELECT name,id FROM pages where shop_id = '$shop_id' AND id = '$page_id'";
			          	$all_pages_res = $mysqli->query( $all_pages_sql );
			          	$all_pages_row = $all_pages_res->fetch_array( MYSQLI_ASSOC );

			          	$total_views = 0;
		      	?>
		        <tr>
		          <td>
		          	<a target="_blank" href="<?php echo $full_shop_url . SHOPIFY_PROXY_PREFIX . '/p/'.$page_id ?>" style="cursor: pointer;">
			          <?php echo $all_pages_row["name"];?>
		          	</a>
		          </td>
		          <td class="text-center">
		          	<?php
		          		$all_pages_sql = "SELECT pageviews.id FROM pageviews WHERE pageviews.shop_id='$shop_id' AND pageviews.page_id = '$page_id' AND pageviews.funnel_id = '$funnel_id' AND pageviews.date BETWEEN '$startdate' AND '$enddate'";
						$all_pages_res = $mysqli->query( $all_pages_sql );
						$total_views = $all_pages_res->num_rows;
						if($total_views == "nan"){
		          			$total_views = 0;
		          		}
		          		echo $total_views;
		          	?>
		          </td>
		          <td class="text-center">
		          	<?php
		          		$all_pages_sql_distinct = "SELECT DISTINCT pageviews.ip FROM pageviews WHERE pageviews.shop_id='$shop_id' AND pageviews.page_id = '$page_id' AND pageviews.funnel_id = '$funnel_id' AND pageviews.date BETWEEN '$startdate' AND '$enddate'";
						$all_pages_res = $mysqli->query( $all_pages_sql_distinct );
						$unique_view = $all_pages_res->num_rows;
						if($unique_view == "nan"){
		          			$unique_view = 0;
		          		}
		          		echo $unique_view;
		          		//$sql_distinct = "SELECT DISTINCT pageviews.ip FROM pageviews, pages WHERE pageviews.page_id=pages.id AND pages.shop_id='$shop_id'";
		          	?> 
		          </td>
		          <?php
		          		$page_checkout_sql = "SELECT DISTINCT carts.token FROM pageviews,carts WHERE pageviews.page_id = '$page_id' AND pageviews.funnel_id = '$funnel_id' AND carts.funnel_id = '$funnel_id' AND carts.token LIKE CONCAT(pageviews.token, '%') AND carts.status = 4 AND carts.last_modified BETWEEN '$startdate' AND '$enddate'";
		          		$page_checkout = $mysqli->query($page_checkout_sql);
		          		$total_page_checkouts = $page_checkout->num_rows;

		          		$page_abandons_sql = "SELECT DISTINCT carts.token FROM pageviews,carts WHERE pageviews.page_id = '$page_id' AND pageviews.funnel_id = '$funnel_id' AND carts.funnel_id = '$funnel_id' AND carts.token LIKE CONCAT(pageviews.token, '%') AND (carts.status<=2 AND carts.status>0) AND carts.last_modified BETWEEN '$startdate' AND '$enddate'";
		          		$page_abandons = $mysqli->query($page_abandons_sql);
		          		$total_page_abandons = $page_abandons->num_rows; 

		          		$page_abandons_sql = "SELECT DISTINCT carts.token FROM pageviews,carts,cart_emails WHERE pageviews.page_id = '$page_id' AND pageviews.funnel_id = '$funnel_id' AND carts.funnel_id = '$funnel_id' AND carts.token LIKE CONCAT(pageviews.token, '%') AND (carts.token = cart_emails.token AND carts.status = 0) AND carts.last_modified BETWEEN '$startdate' AND '$enddate'";

		          		$page_abandons = $mysqli->query($page_abandons_sql);
		          		$total_page_abandons += $page_abandons->num_rows;

		          		$total_page_checkouts = number_format((($total_page_checkouts/$total_views)*100),2);
		          		$total_page_abandons = number_format((($total_page_abandons/$total_views)*100),2);

		          		if($total_page_checkouts == "nan"){
		          			$total_page_checkouts = 0;
		          		}
		          		if($total_page_abandons == "nan"){
		          			$total_page_abandons = 0;
		          		}
		          ?>
		          <td class="text-center"><?php echo $total_page_checkouts."%"; ?></td>
		          <td class="text-center"><?php echo $total_page_abandons."%"; ?></td>
		          <td class="text-center"><a target="_blank" href="<?php echo BASE.'/statistics/'.$funnel_id.'/'.$page_id;?>" style="cursor: pointer;">Details</a></td>
		        </tr>
		        <?php
		    		} 
		    	?>
		      </tbody>
		    </table>
		  </div>
		</div>
		</div>
	<?php } ?>
    <div class="col-md-6 col-sm-6 col-xs-12">
      <div class="x_panel tile fixed_height_320 overflow_hidden">
        <div class="x_title">
          <h2>Devices</h2>
          <div class="clearfix"></div>
        </div>
        <div class="x_content">
          <table class="" style="width:100%">
            <tr>
              <?php 
                if(count($devices)>0){
              ?>
              <th style="width:37%;">
                <p>Top 5</p>
              </th>
              <th>
                <div class="col-lg-7 col-md-7 col-sm-7 col-xs-7">
                  <p class="">Device</p>
                </div>
                <div class="col-lg-5 col-md-5 col-sm-5 col-xs-5">
                  <p class="">Views</p>
                </div>
              </th>
              <?php
                }
              ?>
            </tr>
            <tr>
              <?php 
                if(count($devices)>0){
              ?>
              <td>
                <canvas id="devices_chart" height="140" width="140" style="margin: 15px 10px 10px 0"></canvas>
              </td>
              <td>
                <table class="tile_info">
			<?php $i=0; foreach($devices as $key => $value){ ?>
                  <tr>
                    <td>
                      <p><i class="fa fa-square <?php echo $color_arr[$i]; ?>"></i><?php echo ucfirst($key); ?> </p>
                    </td>
                    <td><?php echo number_format((($value/$res->num_rows)*100), 2, '.', '')."%"; ?></td>
                  </tr>
            <?php $i++; } ?>
                </table>
              </td>
              <?php
                }else{
                  echo "<p class='text-center' style='font-size: 17px; margin-top: 23%;'>No data found</p>" ;
                }
              ?>
            </tr>
          </table>
        </div>
      </div>
    </div>
    
    <div class="col-md-6 col-sm-6 col-xs-12">
      <div class="x_panel tile fixed_height_320 overflow_hidden">
        <div class="x_title">
          <h2>Browsers</h2>
          <div class="clearfix"></div>
        </div>
        <div class="x_content">
          <table class="" style="width:100%">
            <tr>
              <?php 
                if(count($browsers)>0){
              ?>
              <th style="width:37%;">
                <p>Top 5</p>
              </th>
              <th>
                <div class="col-lg-7 col-md-7 col-sm-7 col-xs-7">
                  <p class="">Browser</p>
                </div>
                <div class="col-lg-5 col-md-5 col-sm-5 col-xs-5">
                  <p class="">Views</p>
                </div>
              </th>
              <?php
                }
              ?>
            </tr>
            <tr>
              <?php 
                if(count($browsers)>0){
              ?>
              <td>
                <canvas id="browsers_chart" height="140" width="140" style="margin: 15px 10px 10px 0"></canvas>
              </td>
              <td>
                <table class="tile_info">
				<?php $i=0; foreach($browsers as $key => $value){ ?>
					  <tr>
						<td>
						  <p><i class="fa fa-square <?php echo $color_arr[$i]; ?>"></i><?php echo ucfirst($key); ?> </p>
						</td>
						<td><?php echo number_format((($value/$res->num_rows)*100), 2, '.', '')."%"; ?></td>
					  </tr>
					  
				<?php $i++; } ?>
                </table>
              </td>
              <?php
                }else{
                  echo "<p class='text-center' style='font-size: 17px; margin-top: 23%;'>No data found</p>" ;
                }
              ?>
            </tr>
          </table>
        </div>
      </div>
    </div>
</div>


<div class="row">
<div class="col-md-4 col-sm-4 col-xs-12">
  &nbsp;
</div>

<div class="col-md-12 col-sm-8 col-xs-12">

  <div class="row">

    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="x_panel">
        <div class="x_title">
          <h2>Visitors location </h2>
          <div class="clearfix"></div>
        </div>
        <div class="x_content">
          <div class="dashboard-widget-content">
            <div class="col-md-3 hidden-small">
              <h2 class="line_30"><?php echo $total_city_view; ?> <?php if  ($total_city_view=='1' ) echo 'view'; else echo 'views';?> from <?php echo count($cities); ?> <?php if  (( count($cities)=='1' ) ) echo 'city'; else echo 'cities';?> </h2>

              <table class="countries_list">
                <tbody>
				<?php $i=0; foreach($cities as $key => $value){ ?>
				  <tr>
					<td><?php echo $key ; ?></td>
					<td class="fs15 fw700 text-right"><?php echo number_format((($value/$res->num_rows)*100), 2, '.', '')."%"; ?></td>
				  </tr>
				<?php if($i == 4) break; $i++;} ?>
                </tbody>
              </table>
            </div>
            <div class="col-md-3 hidden-small">
              <h2 class="line_30"><?php echo $total_country_view; ?> <?php if  ($total_country_view=='1' ) echo 'view'; else echo 'views';?>  from <?php echo count($countries); ?> <?php if  (( count($countries)=='1' ) ) echo 'country'; else  echo 'countries';?></h2>

              <table class="countries_list">
                <tbody>
				<?php $i=0; foreach($countries as $key => $value){ ?>
				  <tr>
					<td><?php echo $key ; ?></td>
					<td class="fs15 fw700 text-right"><?php echo number_format((($value/$res->num_rows)*100), 2, '.', '')."%"; ?></td>
				  </tr>
				<?php if($i == 4) break; $i++;} ?>
                </tbody>
              </table>
            </div>
            <div id="world-map-gdp" class="col-md-6 col-sm-12 col-xs-12" style="height:230px;"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
<textarea id="statistic_details" hidden><?php echo json_encode($statistic_details); ?></textarea>
<textarea id="chart_color_arr" hidden><?php echo json_encode($color_arr); ?></textarea>
<textarea id="chart_color_arr_code" hidden><?php echo json_encode($color_arr_code); ?></textarea>
 <script>
		window.onload = function() {
			var statistic_details = $("#statistic_details")[0].value;
			statistic_details = JSON.parse(statistic_details);
			var devices_text = statistic_details.devices;
			var browsers_text = statistic_details.browsers;
			var chart_color_arr = $("#chart_color_arr")[0].value;
			chart_color_arr = JSON.parse(chart_color_arr);
			var chart_color_arr_code = $("#chart_color_arr_code")[0].value;
			chart_color_arr_code = JSON.parse(chart_color_arr_code);
			
			var devices = [];
			var datas = [];
			var colors = [];
			var count = 0;
			for(var i in devices_text){
				devices.push(i.charAt(0).toUpperCase() + i.slice(1));
				datas.push(((devices_text[i]/statistic_details.total_page_view)*100).toFixed(2));
				colors.push(chart_color_arr_code[count]);
				
				if(count == 4) break;
				count ++;
			}
			<?php
				 if(count($devices)>0){
			?>
			var ctx = document.getElementById("devices_chart").getContext('2d');
			window.devices_chart = new Chart(ctx, {
				type: 'doughnut',
				data: {
					labels: devices,
					datasets: [{
						label: '# of Votes',
						data: datas,
						backgroundColor: colors,
						borderColor: [
							'white',
							'white'
						],
						borderWidth: 2
					}]
				},
				options: {
					legend: !1,
					responsive: !1
				}
			});
			
			var browsers = [];
			var datas = [];
			var colors = [];
			var count = 0;
			for(var i in browsers_text){
				browsers.push(i.charAt(0).toUpperCase() + i.slice(1));
				datas.push(((browsers_text[i]/statistic_details.total_page_view)*100).toFixed(2));
				colors.push(chart_color_arr_code[count]);
				
				if(count == 4) break;
				count ++;
			}
			var ctx = document.getElementById("browsers_chart").getContext('2d');
			window.devices_chart = new Chart(ctx, {
				type: 'doughnut',
				data: {
					labels: browsers,
					datasets: [{
						label: '# of Votes',
						data: datas,
						backgroundColor: colors,
						borderColor: [
							'white',
							'white'
						],
						borderWidth: 2
					}]
				},
				options: {
					legend: !1,
					responsive: !1
				}
			});

			<?php
				}
			?>
		}
		
    </script> 
<?php
    footing();
    function return_pages_list_from_funnel_array ($funnel_array){
        $pages_array = [];
        for ($i=0 ; $i<count($funnel_array); $i++){
            if ($funnel_array[$i]->type == 'LM') {
                if ( $funnel_array[$i]->pages != '' ){
                    $pages_array[] = $funnel_array[$i]->pages;
                }
            }
            else if ($funnel_array[$i]->type == 'checkout') {
                if ( $funnel_array[$i]->pages != '' ) {
                    $checkout_pages = array();
                    $checkout_obj = (object)[];
                    $checkout_obj->page_id = ''.$funnel_array[$i]->pages.'';
                    array_push($checkout_pages, $checkout_obj);
                    $pages_array[] = $checkout_pages;
                }
            }
            else{
                for ($j=0 ; $j<count($funnel_array); $j++){
                    if ($i == $funnel_array[$j]->child->left || $i == $funnel_array[$j]->child->right) {
                        if ($funnel_array[$i]->pages != '' ) {
                            $pages_array[] = $funnel_array[$i]->pages;
                        }
                    }
                }

            }
        }
        $all_pages_array = array();
        foreach ( $pages_array as $p_array) {
            foreach ($p_array as $page) {
                array_push($all_pages_array, $page->page_id);
            }
        }
        return array_unique($all_pages_array);
    }
