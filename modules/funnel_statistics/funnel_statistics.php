<?php 
	heading();
	
	$range_date = date( 'F d, Y', mktime( 0, 0, 0, date('m'), ( date('j') - 30 ), date('Y') ) )." - ".date("F d, Y");
	if( isset( $_REQUEST['startdate'] ) ) {
		$range_date = $_REQUEST['startdate']." - ".$_REQUEST['enddate'];

		$startdate = make_db_start_date_format($_REQUEST['startdate']);
		$enddate = make_db_end_date_format($_REQUEST['enddate']);
	}else{
		$thirty_days_ago = date( 'Y-m-d 00:00:00', mktime( 0, 0, 0, date('m'), ( date('j') - 30 ), date('Y') ) );
		$startdate = $thirty_days_ago;
		$startdate = make_my_zone_time($startdate);
		$enddate = date( 'Y-m-d 23:59:59', mktime( 0, 0, 0, date('m'), ( date('j') ), date('Y') ) );
		$enddate = make_my_zone_time($enddate);
	}

	$funnel_id = explode("?", $break[ $start + 1 ] )[0];
	$full_funnel_info = $mysqli->query("SELECT * FROM funnels WHERE id = $funnel_id"); 
	$full_funnel_info = $full_funnel_info->fetch_array( MYSQLI_ASSOC );
	$funnel_title = htmlspecialchars($full_funnel_info['title']);

	echo "<script>console.log('startdate: ".$startdate."');</script>";
	echo "<script>console.log('enddate: ".$enddate."');</script>";
?>
<div class="row">
	<div class="pull-right col-md-6">
		<div id="reportrange" class="pull-right" style="background: #fff; cursor: pointer; padding: 5px 10px; border: 1px solid #ccc">
			<i class="glyphicon glyphicon-calendar fa fa-calendar"></i>
			<span id="stats_range_date"><?php echo $range_date; ?></span> <b class="caret"></b>
		</div>
	</div>
	<div class="pull-left col-md-6">
		<h4><i class="fa fa-sitemap"></i> <?php echo $funnel_title; ?></h4>
	</div>
</div>
<div class="text-center" id="stats_section1">
	<div class="row tile_count" style="min-height: 105px;">
		<div id="stats_section1_1">
		</div>
		<div id="stats_section1_2">
			<i class="fa fa-refresh fa-spin fa-fw" id="stats_section1_loading_1" style="font-size: 50px;"></i>
		</div>
	</div>
</div>

<div class="row text-center">
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
							<th class="text-center">Unique visitors</th>
							<th class="text-center hidden">Total checkouts</th>
							<th class="text-center hidden">Total abandons</th>
							<th class="text-center">See fullview</th>
						</tr>
					</thead>
					<tbody id="section_funnel_page_info">

					</tbody>
				</table>
			</div>
		</div>
	</div>
	<i class="fa fa-refresh fa-spin fa-fw" id="page_info_loading" style="font-size: 50px;"></i>
</div>

<div class="text-center" id="stats_section2">
	<div class="row">
	    <div class="col-md-6 col-sm-6 col-xs-12">
	      <div class="x_panel tile fixed_height_320 overflow_hidden">
	        <div class="x_title">
	          <h2>Devices</h2>
	          <div class="clearfix"></div>
	        </div>
	        <div class="x_content">
	          <i class="fa fa-refresh fa-spin fa-fw" style="font-size: 50px; margin-top: 50px;"></i>
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
	          <i class="fa fa-refresh fa-spin fa-fw" style="font-size: 50px;  margin-top: 50px;"></i>
	        </div>
	      </div>
	    </div>
	</div>
</div>

<input type="hidden" id="funnel_id" value="<?php echo $funnel_id ?>">
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
	function process_get_stats_section1_1(){
		global $mysqli;
		$shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];
		$stats_range_date = $_REQUEST["stats_range_date"];
		$funnel_id = $_REQUEST["funnel_id"];

		$startdate = explode("-", $stats_range_date)[0];
		$enddate = explode("-", $stats_range_date)[1];
		$startdate = make_db_start_date_format($startdate);
		$enddate = make_db_end_date_format($enddate);

		$seven_days_ago = date( 'Y-m-d H:i:s', mktime( 0, 0, 0, date('m'), ( date('j') - 7 ), date('Y') ) );
		$seven_days_ago = make_my_zone_time($seven_days_ago);
		$sql_seven_days_ago = "SELECT pageviews.id, pageviews.browser, pageviews.device, pageviews.platform, pageviews.city, pageviews.country FROM pageviews WHERE pageviews.shop_id='$shop_id' AND pageviews.funnel_id = '$funnel_id' AND pageviews.date<='$seven_days_ago'";
		$res_seven_days_ago = $mysqli->query( $sql_seven_days_ago );
		$total_views_seven_days_ago = $res_seven_days_ago->num_rows;

		$sql_seven_days_ago_distinct = "SELECT DISTINCT pageviews.ip FROM pageviews WHERE pageviews.shop_id='$shop_id' AND pageviews.funnel_id = '$funnel_id' AND pageviews.date<='$seven_days_ago'";
		$res_seven_days_ago_distinct = $mysqli->query( $sql_seven_days_ago_distinct );

		$sql = "SELECT pageviews.id, pageviews.browser, pageviews.device, pageviews.platform, pageviews.city, pageviews.country FROM pageviews WHERE pageviews.shop_id='$shop_id' AND pageviews.funnel_id = '$funnel_id' AND pageviews.date BETWEEN '$startdate' AND '$enddate'";
		$res = $mysqli->query( $sql );

		$sql_distinct = "SELECT DISTINCT pageviews.ip FROM pageviews WHERE pageviews.shop_id='$shop_id' AND pageviews.funnel_id = '$funnel_id' AND pageviews.date BETWEEN '$startdate' AND '$enddate'";

		$res_distinct = $mysqli->query( $sql_distinct );
		$total_views = $res->num_rows;
		$total_views_distinct = $res_distinct->num_rows;
?>
	<div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
	  <span class="count_top"><i class="fa fa-user"></i> Total pageviews</span>
	  <div class="count"><?php echo $res->num_rows ?></div>
	  <?php 
	  	if($res_seven_days_ago->num_rows == 0){
	  		$pageviews_increase = 100;
	  	}else{
	  		$pageviews_increase = ( ( ( $res->num_rows - $res_seven_days_ago->num_rows ) / $res_seven_days_ago->num_rows ) * 100 );
	  	}
	  ?>
	  <span class="count_bottom"><i class="<?php echo ( $pageviews_increase >= 0 ? 'green' : 'red' ); ?>"><i class="fa <?php echo ( $pageviews_increase >= 0 ? 'fa-sort-asc' : 'fa-sort-desc' ) ?>"></i><?php echo (number_format($pageviews_increase, 2) == "nan" ? '0':number_format($pageviews_increase, 2)); ?> % </i></span> from last week</span>
	</div>
	<div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
	  <span class="count_top"><i class="fa fa-clock-o"></i> Unique visitors</span>
	  <div class="count"><?php echo $res_distinct->num_rows ?></div>
	  <?php 
	  	if($res_seven_days_ago_distinct->num_rows == 0){
	  		$unique_pageviews_increase = 100;
	  	}else{
	  		$unique_pageviews_increase = ( ( ( $res_distinct->num_rows - $res_seven_days_ago_distinct->num_rows ) / $res_seven_days_ago_distinct->num_rows ) * 100 );
	  	}
	  ?>
	  <span class="count_bottom"><i class="<?php echo ( $unique_pageviews_increase >= 0 ? 'green' : 'red' ) ?>"><i class="fa <?php echo ( $unique_pageviews_increase >= 0 ? 'fa-sort-asc' : 'fa-sort-desc' ) ?>"></i><?php echo (number_format($unique_pageviews_increase, 2) == "nan" ? '0':number_format($unique_pageviews_increase, 2)); ?> % </i> from last week</span>
	</div>
<?php
	}

	function process_get_stats_section1_2(){
		global $mysqli;
		$shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];
		$stats_range_date = $_REQUEST["stats_range_date"];
		$funnel_id = $_REQUEST["funnel_id"];

		$startdate = explode("-", $stats_range_date)[0];
		$enddate = explode("-", $stats_range_date)[1];
		$startdate = make_db_start_date_format($startdate);
		$enddate = make_db_end_date_format($enddate);

		$seven_days_ago = date( 'Y-m-d H:i:s', mktime( 0, 0, 0, date('m'), ( date('j') - 7 ), date('Y') ) );
		$seven_days_ago = make_my_zone_time($seven_days_ago);

		modify_shopify_order_made_by_funnel_buildr();

		$csql = "SELECT carts.id FROM carts WHERE carts.shop_id='$shop_id' AND carts.funnel_id='$funnel_id' AND carts.last_modified BETWEEN '$startdate' AND '$enddate' AND (carts.status=4 OR carts.status=6)";
		$complete = $mysqli->query( $csql );
		$csql7 = "SELECT carts.id FROM carts WHERE carts.shop_id='$shop_id' AND carts.funnel_id='$funnel_id' AND (carts.status=4 OR carts.status=6) AND carts.created<='$seven_days_ago'";
		$complete_seven_days_ago = $mysqli->query( $csql7 );

		$asql1 = "SELECT carts.id FROM carts WHERE carts.shop_id='$shop_id' AND carts.funnel_id='$funnel_id' AND carts.last_modified BETWEEN '$startdate' AND '$enddate' AND (carts.status<=2 AND carts.status>0)";
		$asql2 = "SELECT carts.id FROM carts,cart_emails WHERE carts.shop_id='$shop_id' AND carts.funnel_id='$funnel_id' AND carts.last_modified BETWEEN '$startdate' AND '$enddate' AND (carts.token = cart_emails.token AND carts.status = 0)";
		$asql7 = "SELECT carts.id FROM carts,cart_emails WHERE carts.shop_id='$shop_id' AND carts.funnel_id='$funnel_id' AND carts.status<=2 AND carts.status>0 AND carts.created<='$seven_days_ago'";
		$shipping1 = $mysqli->query( $asql1 );
		$shipping2 = $mysqli->query( $asql2 );
		$shipping_seven_days_ago = $mysqli->query( $asql7 );
?>
	<div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count" style="border-left: 2px solid #ADB2B5;">
	  <span class="count_top"><i class="fa fa-cart-plus"></i> Total checkouts</span>
	  <div class="count green"><?php echo $complete->num_rows; ?></div>
	  <?php 
	  	if($complete_seven_days_ago->num_rows == 0){
	  		$complete_increase = 100;
	  	}else{
	  		$complete_increase = ( ( ( $complete->num_rows - $complete_seven_days_ago->num_rows ) / $complete_seven_days_ago->num_rows ) * 100 );
	  	}
	  ?>
	  <span class="count_bottom"><i class="<?php echo ( $complete_increase >= 0 ? 'green' : 'red' ); ?>"><i class="fa <?php echo ( $complete_increase >= 0 ? 'fa-sort-asc' : 'fa-sort-desc' ) ?>"></i><?php echo (number_format($complete_increase, 2) == "nan" ? '0':number_format($complete_increase, 2)); ?> % </i></span> from last week</span>
	</div>
	<div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
	  <span class="count_top"><i class="fa fa-cart-arrow-down"></i> Total abandons</span>
	  <div class="count"><?php echo $shipping1->num_rows + $shipping2->num_rows  ?></div>
	  <?php 
	  	if($shipping_seven_days_ago->num_rows == 0){
	  		$shipping_increase = 100;
	  	}else{
	  		$shipping_increase = ( ( ( ($shipping1->num_rows+$shipping2->num_rows) - $shipping_seven_days_ago->num_rows ) / $shipping_seven_days_ago->num_rows ) * 100 );
	  	}
	  ?>
	  <span class="count_bottom"><i class="<?php echo ( $shipping_increase >= 0 ? 'green' : 'red' ); ?>"><i class="fa <?php echo ( $shipping_increase >= 0 ? 'fa-sort-asc' : 'fa-sort-desc' ) ?>"></i><?php echo (number_format($shipping_increase, 2) == "nan" ? '0':number_format($shipping_increase, 2)); ?> % </i></span> from last week</span>
	</div>
<?php 
        $funnel_id = $_REQUEST["funnel_id"];
        $all_pages = [];
		$funnel_code = get_funnel_meta($funnel_id, "funnel_code");
		$all_pages = return_pages_list_from_funnel_array(json_decode($funnel_code));

        //$pres = $mysqli->query("SELECT id FROM pages WHERE shop_id='$shop_id'AND (status = '1' OR status = '0')");
        //$fres = $mysqli->query("SELECT id FROM funnels WHERE shop_id='$shop_id'");
?>
        <div class="col-md-2 col-sm-4 col-xs-6 tile_stats_count">
          <span class="count_top"><i class="fa fa-clone"></i> Total pages</span>
          <div class="count"><?php echo count($all_pages); ?></div>
        </div>
<?php
	}

	function process_get_funnel_all_pages_id(){
		$funnel_id = $_REQUEST["funnel_id"];
		$all_pages = [];
		$funnel_code = get_funnel_meta($funnel_id, "funnel_code");
		$all_pages = return_pages_list_from_funnel_array(json_decode($funnel_code));
		$all_pages = array_values($all_pages);
		echo json_encode($all_pages);
	}

	function process_section_funnel_page_info(){
		global $mysqli;
		$shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];
		$shop_domain = get_shop_meta( $shop_id, 'shop_domain');
		$force_ssl = get_shop_meta( $shop_id, 'force_ssl');
		$full_shop_url= ( $force_ssl > 0 ? 'https://' : 'http://' ) . $shop_domain;

		$stats_range_date = $_REQUEST["stats_range_date"];
		$funnel_id = $_REQUEST["funnel_id"];
		$page_id = $_REQUEST["page_id"];

		$startdate = explode("-", $stats_range_date)[0];
		$enddate = explode("-", $stats_range_date)[1];
		$startdate = make_db_start_date_format($startdate);
		$enddate = make_db_end_date_format($enddate);

		$all_pages_sql = "SELECT name,id FROM pages where shop_id = '$shop_id' AND id = '$page_id'";
      	$all_pages_res = $mysqli->query( $all_pages_sql );
      	$all_pages_row = $all_pages_res->fetch_array( MYSQLI_ASSOC );

      	$total_views = 0;
?>
        <tr>
          <td class="text-left">
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
          		/*$page_checkout_sql = "SELECT DISTINCT carts.token FROM pageviews,carts WHERE pageviews.page_id = '$page_id' AND pageviews.funnel_id = '$funnel_id' AND carts.funnel_id = '$funnel_id' AND carts.token LIKE CONCAT(pageviews.token, '%') AND (carts.status=4 OR carts.status=6) AND carts.last_modified BETWEEN '$startdate' AND '$enddate'";
          		$page_checkout = $mysqli->query($page_checkout_sql);
          		$total_page_checkouts = $page_checkout->num_rows;

          		$page_abandons_sql = "SELECT DISTINCT carts.token FROM pageviews,carts,cart_emails WHERE pageviews.page_id = '$page_id' AND pageviews.funnel_id = '$funnel_id' AND carts.funnel_id = '$funnel_id' AND carts.token LIKE CONCAT(pageviews.token, '%') AND (carts.token = cart_emails.token AND carts.status = 0) AND carts.last_modified BETWEEN '$startdate' AND '$enddate'";

          		$page_abandons = $mysqli->query($page_abandons_sql);
          		$total_page_abandons += $page_abandons->num_rows;

          		$total_page_checkouts_p = number_format((($total_page_checkouts/$total_views)*100),2);
          		$total_page_abandons_p = number_format((($total_page_abandons/$total_views)*100),2);

          		if($total_page_checkouts_p == "nan"){
          			$total_page_checkouts_p = 0;
          		}
          		if($total_page_abandons_p == "nan"){
          			$total_page_abandons_p = 0; 
          		}*/
          ?>
          <td class="text-center hidden"><?php echo $total_page_checkouts."(".$total_page_checkouts_p."%)"; ?></td>
          <td class="text-center hidden"><?php echo $total_page_abandons."(".$total_page_abandons_p."%)"; ?></td>
          <td class="text-center"><a target="_blank" href="<?php echo BASE.'/page_statistics/'.$funnel_id.'/'.$page_id;?>" style="cursor: pointer;">Details</a></td>
        </tr>
<?php
	}

	function process_get_stats_section2(){
		global $mysqli;
		$shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];

		$stats_range_date = $_REQUEST["stats_range_date"];
		$funnel_id = $_REQUEST["funnel_id"];

		$startdate = explode("-", $stats_range_date)[0];
		$enddate = explode("-", $stats_range_date)[1];
		$startdate = make_db_start_date_format($startdate);
		$enddate = make_db_end_date_format($enddate);

		$sql = "SELECT pageviews.id, pageviews.browser, pageviews.device, pageviews.platform, pageviews.city, pageviews.country FROM pageviews WHERE pageviews.shop_id='$shop_id' AND pageviews.funnel_id = '$funnel_id' AND pageviews.date BETWEEN '$startdate' AND '$enddate'";
		$res = $mysqli->query( $sql );
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
?>
<div class="row">
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
              <h2 class="line_30 text-left"><?php echo $total_city_view; ?> <?php if  ($total_city_view=='1' ) echo 'view'; else echo 'views';?> from <?php echo count($cities); ?> <?php if  (( count($cities)=='1' ) ) echo 'city'; else echo 'cities';?> </h2>

              <table class="countries_list">
                <tbody>
				<?php $i=0; foreach($cities as $key => $value){ ?>
				  <tr>
					<td class="text-left" style="padding-left: 0;"><?php echo $key ; ?></td>
					<td class="fs15 fw700 text-right"><?php echo number_format((($value/$res->num_rows)*100), 2, '.', '')."%"; ?></td>
				  </tr>
				<?php if($i == 4) break; $i++;} ?>
                </tbody>
              </table>
            </div>
            <div class="col-md-3 hidden-small">
              <h2 class="line_30 text-left"><?php echo $total_country_view; ?> <?php if  ($total_country_view=='1' ) echo 'view'; else echo 'views';?>  from <?php echo count($countries); ?> <?php if  (( count($countries)=='1' ) ) echo 'country'; else  echo 'countries';?></h2>

              <table class="countries_list">
                <tbody>
				<?php $i=0; foreach($countries as $key => $value){ ?>
				  <tr>
					<td class="text-left" style="padding-left: 0;"><?php echo $key ; ?></td>
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
<?php
	}
?>
<script type="text/javascript">
	var all_pages;
	$(function() {
		init_daterangepicker();
		get_stats_section1_1();
	});

	function get_stats_section1_1(){
		var data = 'stats_range_date=' + encodeURIComponent($("#stats_range_date")[0].innerHTML);
		data += '&funnel_id=' + $("#funnel_id")[0].value;
	    http_post_request( base + '/funnel_statistics/?process=get_stats_section1_1', data , 'get_stats_section1_1_done' );
	}
	function get_stats_section1_1_done(res){
		$("#stats_section1_1")[0].innerHTML = res;
		get_stats_section1_2();

	}

	function get_stats_section1_2(){
		var data = 'stats_range_date=' + encodeURIComponent($("#stats_range_date")[0].innerHTML);
		data += '&funnel_id=' + $("#funnel_id")[0].value;
	    http_post_request( base + '/funnel_statistics/?process=get_stats_section1_2', data , 'get_stats_section1_2_done' ); 
	}
	function get_stats_section1_2_done(res){
		$("#stats_section1_2")[0].innerHTML = res;
		//section_funnel_page_info();
		get_funnel_all_pages_id();
	}

	function get_funnel_all_pages_id(){
		var data = 'funnel_id=' + $("#funnel_id")[0].value;
	    http_post_request( base + '/funnel_statistics/?process=get_funnel_all_pages_id', data , 'get_funnel_all_pages_id_done' ,"http_call");
	}
	function get_funnel_all_pages_id_done(res,from){
		all_pages = JSON.parse(res);
		var status = "not_done";
		if(all_pages.length == 1){
			status = "done";
		}

		if(all_pages.length > 0){
			var data = 'stats_range_date=' + encodeURIComponent($("#stats_range_date")[0].innerHTML);
			data += '&funnel_id=' + $("#funnel_id")[0].value;
			data += '&page_id=' + all_pages.pop();
		    http_post_request( base + '/funnel_statistics/?process=section_funnel_page_info', data , 'section_funnel_page_info_done',status );
		}

		if(from == "http_call" && all_pages.length == 0 ){
			$("#page_info_loading").remove();
			setTimeout(function(){ get_stats_section2(); }, 3000);
		}
	}
	function section_funnel_page_info_done(res,status){
		$("#section_funnel_page_info")[0].innerHTML += res;
		if(status == "done"){
			$("#page_info_loading").remove();
			get_stats_section2();
		}else{
			get_funnel_all_pages_id_done(JSON.stringify(all_pages),"");
		}
	}

	function get_stats_section2(){
		var data = 'stats_range_date=' + encodeURIComponent($("#stats_range_date")[0].innerHTML);
		data += '&funnel_id=' + $("#funnel_id")[0].value;
	    http_post_request( base + '/funnel_statistics/?process=get_stats_section2', data , 'get_stats_section2_done' );
	}
	function get_stats_section2_done(res){
		$("#stats_section2")[0].innerHTML = res;
		show_related_graph();
	}

	function show_related_graph(){
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
		if(devices.length > 0){
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
		}
		init_JQVmap();
	}
</script>