<?php
	error_reporting(-1);
    heading(); 
    global $mysqli; 
    $shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];
    $shop_currency = get_shop_meta( $shop_id, 'shop_currency' );
    $shop_domain = get_shop_meta( $shop_id, 'shop_domain');
    $force_ssl = get_shop_meta( $shop_id, 'force_ssl');
    $full_shop_url= ( $force_ssl > 0 ? 'https://' : 'http://' ) . $shop_domain;
    $shop_currency = get_shop_meta($shop_id, "shop_currency");

    $all_orders = $mysqli->query("SELECT * FROM carts WHERE  shop_id= $shop_id  AND status=4 AND cart LIKE '%subscription_id%' AND cart  NOT LIKE '%recharge_fully_processed%' ORDER BY id DESC ");
    $all_orders = $all_orders->fetch_all(MYSQLI_ASSOC);
    
    $rc_token= get_shop_meta($shop_id , 'rc_token');
    $all_unprocessed_recharge_items = [];
    
    foreach ( $all_orders as $order ) {
		$cart_info =  json_decode ($order['cart']);
		$cart_items = $cart_info->items;
		if ( $rc_token != ''){
			foreach ($cart_items as $item){
				if ( $item->properties->subscription_id != ''   && $item->recharge_processed  !='true'  ) {
					$updated_order = '';
					$updated_order = $order;
					$cart_info = json_decode($updated_order['cart']);
					$cart_info->items =  array($item);
					$updated_order['cart'] = json_encode($cart_info);
					$all_unprocessed_recharge_items[]=  $updated_order;
				}
			}
		}
	}
    $num_orders = count($all_unprocessed_recharge_items);
	$recharge_page = ( isset( $_REQUEST['page'] ) ? $_REQUEST['page'] : 1 );
	$limit = 10;
	$start = ( $recharge_page - 1 ) * $limit;
	$num_page = ceil($num_orders / $limit);
	$all_orders = array_slice($all_unprocessed_recharge_items, $start, $limit);
	if ($num_orders>0){
?>
	<!-- Modal -->
	<div id="recharge_details_modal" class="modal fade" role="dialog">
		<div class="modal-dialog">
			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h4 class="modal-title">Recharge subscription details</h4>
				</div>
				<div class="modal-body" id="recharge_details_modal_body">
				</div>
				<div class="modal-footer">
					<input id="shop_currency"  value="<?php echo $shop_currency ?>"  hidden/>
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>
	<div class="col-md-12 col-sm-12 col-xs-12" id ="pages_div">
	    <div class="x_panel">
	        <div class="x_title">
	            <h2>Pending recharge subscriber</h2>
	            <div class="clearfix"></div>
	        </div>
	        <div class="x_content">
	            <div class="table-responsive">
	                <table class="table table-striped jambo_table bulk_action_page table_page">
	                    <thead>
	                      <tr class="headings">
	                        <th class="column-title-page col-sm-4">Product name </th>
	                        <th class="column-title-page col-sm-2 text-center">Product price </th>
	                        <th class="column-title-page col-sm-2 text-center">Shipping interval</th>
	                        <th class="column-title-page col-sm-2 text-center">Buyer email</th>
	                        <th class="column-title-page no-link last text-center col-sm-2"><span class="nobr">Options</span></th>
	                         <th class="bulk-actions bulk-actions-page " colspan="7">
	                              <a class="antoo" style="color:#fff; font-weight:500;">Bulk Actions ( <span class="action-cnt-pages"> </span> )
	                                 <li class="dropdown" style="list-style-type: none;display:inline;">
	                                      <a style="color:white;" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-chevron-down"></i></a>
	                                      <ul class="dropdown-menu" role="menu" >
	                                        <li>
	                                        	<a>
	                                        		<i class="fa fa-files-o" aria-hidden="true"></i> Add selected subscriber
	                                        	</a>
	                                        </li>
	                                        <li>
	                                        	<a>
	                                        		<i class="fa fa-trash" aria-hidden="true"></i> Delete
	                                        	</a>
	                                        </li>
	                                      </ul>
	                                    </li>
	                              </a>
	                         </th>
	                      </tr>
	                    </thead>
	                    <tbody>
                            
<?php
		foreach ($all_orders as $order) {
			$funnel_id = $order['funnel_id'];
			$cart_id= $order['id'];
			$cart_token= $order['token'];
			$shopify_order_id = $order['shopify_order_id'];
			
			$cart_info = json_decode($order['cart']);
			$cart_items = $cart_info->items;	
			foreach ($cart_items as $item){
				if ( $item->properties->subscription_id != ''  && $item->recharge_processed  !='true' ){ 
					$variant_id = $item->variant_id;
					$email =$cart_info->shipping_details->email ;
					$billing_address1 = $cart_info->shipping_details->address ;
?>								
									<tr class="even pointer" style="padding:4px;vertical-align:initial;">
	                                    <td class="col-sm-4" style="vertical-align:middle;"><?php echo $item->title ;?></td>
	                                    <td class="col-sm-2" style="vertical-align:middle;text-align:center;"><?php echo $shop_currency ; echo money_format('%i', ($item->price)/100 );?></td>
	                                    <td class="col-sm-2" style="vertical-align:middle;text-align:center;">
	                                    	<?php echo $item->properties->shipping_interval_frequency;?> <?php echo $item->properties->shipping_interval_unit_type;?>
	                                    </td>
	                                    <td class="col-sm-2" style="vertical-align:middle;"><?php echo $email; ?>  </td>
	                                    <td class="col-sm-2 a-right a-right text-center" style="vertical-align:middle; text-align:center;">
	                                        <div class=" " >
												<a href="javascript:void 0;" type="button" class="btn btn-sm btn-primary" title="Details" onclick="show_recharge_details_modal(<?php echo $cart_id ; ?> , <?php echo $item->id ; ?> , <?php echo $item->quantity ; ?> )">
	                                            	<span class="glyphicon glyphicon-info-sign"></span>
	                                            </a>
	                                            <a href="javascript:void 0;" type="button" class="btn btn-sm btn-primary" title="Add to recharge" onclick="add_buyer_to_recharge(<?php echo $shop_id ; ?> , <?php echo $shopify_order_id ; ?> , <?php echo $variant_id ?>)">
	                                            	<span class="glyphicon glyphicon glyphicon-ok"></span>
	                                            </a>
	                                            <a  type="button" class="btn btn-sm btn-danger"  href="javascript:void 0;" onclick="dont_add_buyer_to_recharge(<?php echo $shop_id ; ?> , <?php echo $shopify_order_id ; ?> , <?php echo $variant_id ?>)"  title="Do not add to recharge">
	                                            	<span class="glyphicon glyphicon glyphicon-remove"></span>
	                                            </a>
	                                        </div>
	                                    </td>
	                                </tr>       

<?php
				}
			}
	    }
	}else{
?>
						<div class='btn-danger text-center' style='height:40px;margin 0 auto;font-size:16px;position:relative;padding:10px; vertical-align: middle;'>
							You have no recharge subscription request.
						</div>
<?php
}
?>
	                   </tbody>
	                </table>
	            </div>
<?php
				if ($num_page > 1) {
					pagination_for_recharge($recharge_page, $num_page);
				}
?>
	        </div>
	    </div>
	</div>
	<textarea id="all_recharge_orders"  hidden><?php echo json_encode($all_orders) ?></textarea>
	<div class="clearfix"></div>
	<div class="loader" hidden></div>

<?php
    footing();
    
    function pagination_for_recharge($page, $num_page) {
		$next_page=$page+1;
		$previous_page=$page-1;
		echo'<div class="text-center" style="font-size:10px;"><nav style="display: inline-block;"> <ul style= "margin:4px;"class="pagination"> ';
			if ($num_page==1) {
				
			} 
			else if ($page==1 && $num_page>1) {
				echo'<li> <a href="' . BASE . '/orders_recharge/?page=' . $next_page .'" aria-label="Next"><span aria-hidden="true"><i class="glyphicon glyphicon-chevron-right"></i></span></a></li> ';
			}
			else if ($page==$num_page){
				echo'<li><a href="' . BASE . '/orders_recharge/?page=' . $previous_page . '" aria-label="Next"><span aria-hidden="true"><i class="glyphicon glyphicon-chevron-left"></i></span></a></li> ';
			}
			else {
				echo'<li><a href="' . BASE . '/orders_recharge/?page=' . $previous_page . '" aria-label="Next"><span aria-hidden="true"><i class="glyphicon glyphicon-chevron-left"></i></span></a></li>  <li><a href="' . BASE . '/orders_recharge/?page=' . $next_page .  '" aria-label="Next"><span aria-hidden="true"><i class="glyphicon glyphicon-chevron-right"></i></span></a></li> ';
			}
		echo'</ul></nav></div>'; 
	}
?>
