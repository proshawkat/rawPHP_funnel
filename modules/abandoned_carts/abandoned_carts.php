<?php 
    heading(); 
    $session_id = $_REQUEST['mysession'];
    $shop_id = $_SESSION[ $session_id ]['shop_id'];
    $money_format = $_SESSION[ $session_id ]['money_format'];
    $shop_domain = get_shop_meta( $shop_id, 'shop_domain' );
    
?>
<div class="container-fluid">
	<?php if( !isset( $_REQUEST['order_id'] ) ) { ?>
		<div class="panel panel-default panel">
	        <div class="panel-heading">
	            <h3 class="panel-title" style="text-align: left; font-weight: bold;">Abandoned Carts</h3>
	        </div>
	        <div class="panel-body" style="text-align: left;">
				<?php
					if( isset( $_REQUEST['page'] ) ) $page = $_REQUEST['page'];
					else $page = 1;
					$y = 25;
					$x = ( $page - 1 ) * $y;

					$sql = "SELECT orders.id, orders.uuid, orders.date, order_meta.meta_value FROM orders, order_meta WHERE orders.id = order_meta.order_id AND order_meta.meta_name='cart' AND meta_value LIKE '%shipping_details%' AND orders.status=0 AND orders.shop_id='$shop_id'";
					$tres = $mysqli->query( $sql );
					$total_pages = ceil( $tres->num_rows / $y );

					$res = $mysqli->query($sql . " LIMIT $x, $y");
					if( $res->num_rows > 0 ) {
						echo '<table class="table">';
							echo '<tr><th>Date</th><th>Customer</th><th>Total</th><th>Options</th></tr>';
							while( $row = $res->fetch_array( MYSQLI_ASSOC ) ) {
								$cart = json_decode( str_replace( '\"', '"', str_replace( "\'", "'", $row['meta_value'] ) ) );

								echo '<tr>';
									echo '<td>' . date( 'l, H:i', strtotime( $row['date'] ) ) . '</td>';
									echo '<td>' . $cart->shipping_details->first_name . ' ' . $cart->shipping_details->last_name . '</td>';
									echo '<td>' . format_money( ( $cart->total_price / 100 ), $money_format ) . '</td>';
									echo '<td><a href="' . BASE . '/abandoned_carts/?mysession=' . $session_id . '&order_id=' . $row['id'] . '" style="text-decoration: underline; color: #337ab7;">Details</a></td>';
								echo '</tr>';
							}
						echo '</table>';
						?>

						<?php if( $total_pages > 1 ) { ?>
							<nav class="text-center">
								<ul class="pagination" style="margin: 0px;">
									<?php if( $page > 1 ) { ?>
									<li>
										<a href="<?php echo BASE ?>/abandoned_carts/?mysession=<?php echo $session_id ?>&page=<?php echo ( $page - 1 ) ?>" aria-label="Previous">
											<span aria-hidden="true">&laquo;</span>
										</a>
									</li>
									<?php } ?>

									<?php
										$s = ( $page - 3 );
										$s = ( $s > 0 ? $s : 1 );
									?>

									<?php for( $n =  $s; $n < ( $s + 10 ) ; $n++ ) { ?>
										<?php if( $n <= $total_pages ) { ?>
											<li<?php if( $n == $page ) { ?> class="active"<?php } ?>><a href="<?php echo BASE ?>/abandoned_carts/?mysession=<?php echo $session_id ?>&page=<?php echo $n ?>" ><?php echo $n ?></a></li>
										<?php } ?>
									<?php } ?>
									
									<?php if( $total_pages > $page ) { ?>
									<li>
										<a href="<?php echo BASE ?>/abandoned_carts/?mysession=<?php echo $session_id ?>&page=<?php echo ( $page + 1 ) ?>" aria-label="Next">
											<span aria-hidden="true">&raquo;</span>
										</a>
									</li>
									<?php } ?>
								</ul>
							</nav>
						<?php } ?>
					<?php
					} else {
						?>
						<div class="text-center" style="margin-top: 50px;">
							<div style="font-size: 500%;" class="glyphicon glyphicon-list-alt"></div>
							<h3>No abandoned cart found</h3>
						</div>
						<?php
					}
				?>
			</div>
		</div>
	<?php } else { ?>
		<?php
			$res = $mysqli->query("SELECT orders.id, orders.uuid, orders.date, order_meta.meta_value FROM orders, order_meta WHERE orders.id = order_meta.order_id AND order_meta.meta_name='cart' AND meta_value LIKE '%shipping_details%' AND orders.status=0 AND orders.shop_id='$shop_id' AND orders.id='" . $_REQUEST['order_id'] . "'");
			if( $res->num_rows > 0 ) {
				$arr = $res->fetch_array( MYSQLI_ASSOC );
				$cart = json_decode( str_replace( '\"', '"', str_replace( "\'", "'", $arr['meta_value'] ) ) );
			$variant_ids = '';
				
		?>
				<div class="row">
					<div class="col-sm-8">
						<div class="panel panel-default panel">
					        <div class="panel-heading">
					            <h3 class="panel-title" style="text-align: left; font-weight: bold;">Cart Details</h3>
					        </div>
					        <div class="panel-body" style="text-align: left;">
						        <?php
						        	foreach( $cart->items as $item ) {
						        		$variant_ids .= ( $variant_ids != '' ? ',' : '' ) . $item->variant_id . '_' . $item->quantity;
						        		echo '<div class="row">';
						        			echo '<div class="col-xs-1 vertical-middle">';
						        				echo '<img src="' . $item->image . '" alt="' . $item->title . '" class="img-responsive img-rounded">';
						        			echo '</div>';
						        			echo '<div class="col-xs-5 vertical-middle">' . $item->title . '</div>';
						        			echo '<div class="col-xs-3 vertical-middle">' . format_money( ( $item->price / 100 ), $money_format ) . ' x ' . $item->quantity . '</div>';
						        			echo '<div class="col-xs-3 vertical-middle text-right">' . format_money( ( $item->price * $item->quantity / 100 ), $money_format ) . '</div>';
						        		echo '</div>';
						        		echo '<hr>';
						        	}
						        ?>
						        <div class="row">
						        	<div class="col-xs-9 text-right">Subtotal</div>
						        	<div class="col-xs-3 text-right"><?php echo format_money( ( $cart->total_price / 100 ), $money_format ); ?></div>
						        </div>

						        <?php if( isset( $cart->shipping_details->shipping_option ) && isset( $cart->shipping_details->shipping_options[ $cart->shipping_details->shipping_option ] ) ) { ?>
						        		<?php $total_price = ( $cart->total_price / 100 ); ?>
						        	<div class="row">
						        		<?php $total_price += $cart->shipping_details->shipping_options[ $cart->shipping_details->shipping_option ]->price; ?>
							        	<div class="col-xs-9 text-right">Shipping<br><?php echo $cart->shipping_details->shipping_options[ $cart->shipping_details->shipping_option ]->name ?></div>
							        	<div class="col-xs-3 text-right vertical-bottom"><br><?php echo format_money( $cart->shipping_details->shipping_options[ $cart->shipping_details->shipping_option ]->price, $money_format ); ?></div>
							        </div>
						       	<?php } ?>

						       	<?php if( isset( $cart->shipping_details->tax_rate ) && isset( $cart->shipping_details->tax_title ) ) { ?>
						       		<div class="row">
						        		<?php 
						        			$total_tax = number_format( ( $total_price * $cart->shipping_details->tax_rate ), 2, '.', '' );
						        			$total_price += $total_tax; 
						        		?>
							        	<div class="col-xs-9 text-right"><?php echo $cart->shipping_details->tax_title; ?></div>
							        	<div class="col-xs-3 text-right"><?php echo format_money( $total_tax, $money_format ); ?></div>
							        </div>
						       	<?php } ?>

						       	<div class="row">
						       		<div class="col-xs-9 text-right"><strong>Total</strong></div>
						       		<div class="col-xs-3 text-right"><strong><?php echo $total_price; ?></strong></div>
						       	</div>

							</div>
						</div>
					</div>

					<div class="col-sm-4">
						<div class="panel panel-default panel">
					        <div class="panel-heading">
					            <h3 class="panel-title" style="text-align: left; font-weight: bold;">Customer</h3>
					        </div>
					        <div class="panel-body" style="text-align: left;">
					        	<?php echo $cart->shipping_details->first_name . ' ' . $cart->shipping_details->last_name ?>
					        	<br>
					        	<?php echo $cart->shipping_details->email ?>
					        	<hr>
					        	<strong>Shipping Address</strong><br>
					        	<?php echo ( $cart->shipping_details->address != '' ? $cart->shipping_details->address . '<br>' : '' ) ; ?>
					        	<?php echo ( $cart->shipping_details->apt != '' ? $cart->shipping_details->apt . '<br>' : '' ); ?>
					        	<?php echo ( $cart->shipping_details->city != '' ? $cart->shipping_details->city . '<br>' : '' ); ?>
					        	<?php echo ( $cart->shipping_details->country != '' ? $cart->shipping_details->country . '<br>' : '' ); ?>
					        	<br>
					        	
					        	<?php 
					        	/*
					        	** Example of reviving cart in shop site
					        	** URL LIKE https://tshirtify-2.myshopify.com/?recycle=true&cart=variant_id-1,variant_id-2
					        	**
					        	*/
					        	?>
					        	<strong>Checkout URL: </strong> <a href="https://<?php echo $shop_domain ?>/apps/secure-payment/<?php echo $arr['uuid'] ?>/<?php echo $variant_ids ?>" target="_blank">https://<?php echo $shop_domain ?>/apps/secure-payment/<?php echo $arr['uuid'] ?>/<?php echo $variant_ids ?></a>
							</div>
						</div>
					</div>
				</div>
		<?php } else { ?>
			<div class="text-center" style="margin-top: 50px;">
				<div style="font-size: 500%;" class="glyphicon glyphicon-list-alt"></div>
				<h3>No abandoned cart found</h3>
			</div>
		<?php } ?>
	<?php } ?>
</div>
<?php
    footing();
?>