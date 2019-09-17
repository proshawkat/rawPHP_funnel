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
	?>
<div class="container " id="funnels_section">
    <div class="text-center" style="margin-bottom: 5px;">                       
        <!--Add funnel Modal -->
        <div class="modal fade" id="new_funnel_input" role="dialog">
            <div class="modal-dialog modal-md">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" style="display: -webkit-box;">Create a new funnel</h4>
                    </div>
                    <div class="modal-body form-group">
                        <div class="row">
                            <div class="col-sm-12">
                                <form  class="form-horizontal" method="post"  id="funnel"  name="funnel" action="<?php echo BASE;?>/funnel/?process=add_new_funnel">
                                    <div id="div_id_page_name" class="form-group required">
                                        <label for="edit_page_name" class="col-xs-12 text-left" style="font-size: 14px;"> Funnel name<span class="asteriskField">*</span> </label>
                                        <div class="col-xs-12">
                                            <input class="input-md  textinput textInput form-control" onkeydown="remove_warning('new_funnel')" onchange="remove_warning('new_funnel')"  id="funnel_title" name="funnel_title" placeholder="Input your new funnel name" style="margin-bottom: 10px" type="text" required />
                                        </div>
                                    </div>
                                </form>
                            </div>
                       </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                        <button type="button" form="funnel" onclick="create_new_funnel()" class="btn btn-primary" >Create</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<br/>
<div class="clearfix"></div>
<div class="col-md-12 col-sm-12 col-xs-12" id="funnels_div">
    <div class="x_panel">
        <div class="x_title">
            <h2>Funnels</h2>
            <ul class=" panel_toolbox_custom" style="list-style-type: none;margin:0px;">
                    <li>
                        <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#new_funnel_input" style="color:white;"><i class="glyphicon glyphicon-plus"></i> Add new funnel</a>
                    </li>
            </ul>
            <div class="clearfix"></div>
        </div>
        <div class="x_content">
            <div class="table-responsive">
            <?php
                global $mysqli;
                $pres_funnels = $mysqli->query("SELECT * FROM funnels WHERE shop_id = $shop_id"); 
                $total_funnels = $pres_funnels->num_rows;
                $funnel_page = ( isset( $_REQUEST['funnel_page'] ) ? $_REQUEST['funnel_page'] : 1 );
                $funnel_limit = 25;
                $funnel_start = ( $funnel_page - 1 ) * $funnel_limit;
                
                $pres_funnels = $mysqli->query("SELECT * FROM funnels WHERE shop_id = $shop_id ORDER BY id DESC LIMIT $funnel_start, $funnel_limit") or die(mysql_error());
                $funnel_page_pagination= ( isset( $_REQUEST['funnel_page'] ) ? $_REQUEST['funnel_page'] : 1 );
                if( $pres_funnels->num_rows == 1 && $funnel_page>1 ) {
                    $funnel_page=$funnel_page-1;
                }
                if( $pres_funnels->num_rows> 0) {
             ?>
                <table class="table table-striped jambo_table bulk_action_funnel table_funnel">
                    <thead>
                        <tr class="headings">
                            <th style="padding:5px;vertical-align:initial;"><input type="checkbox" id="check-all-funnel" class="flat"></th>
                            <th class="column-title-funnel col-sm-4 col-md-4">Funnel name </th>
                            <th class="column-title-funnel col-sm-2 col-md-2">Created</th>
                            <th class="column-title-funnel col-sm-2 col-md-2">Last updated</th>
                            <th class="column-title-funnel no-link last text-center col-sm-4 col-md-4"><span class="nobr">Options</span></th>
                            <th class="bulk-actions bulk-actions-funnel" colspan="7">
                                <a class="antoo" style="color:#fff; font-weight:500;">Bulk Actions ( <span class="action-cnt-funnels"> </span>) 
                                    <li class="dropdown" style="list-style-type: none;display:inline;">
                                        <a style="color:white;" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-chevron-down"></i></a>
                                        <ul class="dropdown-menu" role="menu" >
                                           <li><a onclick="duplicate_me('funnel','all_funnels')"><i class="fa fa-files-o" aria-hidden="true"></i> Clone</a></li>
                                           <li><a onclick="delete_me('funnel','all_funnels')"><i class="fa fa-trash" aria-hidden="true"></i> Delete</a></li>
                                        </ul>
                                    </li>
                                </a>
                             </th>
                        </tr>
                    </thead>
                    <tbody>
                    <?php
                        $num_funnel = ceil($total_funnels / $funnel_limit);
                        
                        $shop_to_funnel_status = get_shop_meta($shop_id,'shop_to_funnel_status');
                        while( $arr = $pres_funnels->fetch_array( MYSQLI_ASSOC ) ) {
                            $handle = get_funnel_meta( $arr['id'], 'url_handle');

                            $landing_page_product_array = get_shop_meta($shop_id,'landing_page_product_array');
                            $funnel_url = "";
                            $product_found = 0;
                            if($landing_page_product_array != "" && $shop_to_funnel_status == 'enable'){
                                $landing_page_product_array = json_decode($landing_page_product_array);
                                foreach ($landing_page_product_array as $key => $value) {
                                    if($value->funnel_id == $arr['id']){
                                        $product_found = 1;
                                        $funnel_url = $full_shop_url .'/products/'.$value->product_handle;
                                        break;
                                    }
                                }
                            }

                            if($product_found == 0){
                                $funnel_url = $full_shop_url . SHOPIFY_PROXY_PREFIX . '/f/'.$arr['id'].'/0/'.$handle;
                            }
                        ?>
                        <tr style="padding:4px;vertical-align:initial;">
                            <td class="a-center " style="padding:4px;vertical-align:initial;">
                               <input type="checkbox" class="flat" name="table_records_funnels" value="<?php echo $arr['id'] ?>">
                            </td>
                            <td class="col-sm-4 col-md-4" style="vertical-align:initial;"><?php  echo '<a href="'.BASE.'/funnel/'.$arr['id'].'">'.$arr['title'].'</a><br>'; ?></td>
                            <td class="col-sm-2 col-md-2" style="vertical-align:initial;"><?php  $time = strtotime($arr['date']);
                                echo humanTiming($time); ?></td>
                            <td class="col-sm-2 col-md-2" style="vertical-align:initial;"><?php  $time = strtotime($arr['last_updated']);
                                echo humanTiming($time); ?></td>
                            <td class="col-sm-4 col-md-4 a-right a-right text-center " style="vertical-align:initial;">
                                <div class=" " >                                                            
                                    <a target="_blank" type="button" class="btn btn-sm btn-primary"  href="<?php echo $funnel_url; ?>" title="View"><span class="glyphicon glyphicon-eye-open"></span></a>
                                    <a type="button" class="btn btn-sm btn-primary"  href="<?php echo BASE.'/funnel/'.$arr['id']; ?>" title="Edit"><span class="glyphicon glyphicon-edit"></span></a>


                                    <a type="button" onclick ="duplicate_funnel_into_db(<?php echo $arr['shop_id'];?> , <?php echo $arr['id']; ?> , 'all_funnels' )" class="btn btn-sm btn-primary" > <span class="glyphicon glyphicon-duplicate" title="Clone"></a>

                                    <a target="_blank" type="button" class="btn btn-sm btn-primary"  href="<?php echo  BASE ?>/funnel_statistics/<?php echo $arr['id']; ?>" title="Statistics"><i class="fa fa-bar-chart" aria-hidden="true"></i></a>
                                   <a type="button" class="btn btn-sm btn-danger" onclick="delete_funnel_from_db(<?php echo $arr['shop_id'];?>,<?php echo $arr['id']; ?>,<?php echo $funnel_page; ?>,'all_funnels')"  href="javascript:void 0;" title="Delete"> <span class="glyphicon glyphicon-trash"></a>
                                </div>
                            </td>
                        </tr>
                    <?php } ?>
                    </tbody>
                </table>
                <?php } else echo "<div class='btn-danger text-center' style='height:40px;margin 0 auto;font-size:16px;position:relative;padding:10px; vertical-align: middle;'>You have not created any funnel yet.</div>";
            ?>
               <!--  <a href="<?php echo BASE ?>/all_funnels" class="btn btn-primary"><i class="fa fa-sitemap"></i> All funnels</a> -->
            </div>
        </div> 
        <?php
        if ($num_funnel > 1) {
            pagination_for_funnels($funnel_page_pagination, $num_funnel);
        }
        ?>
    </div>  
</div>  
<div class="clearfix"></div>
<div class="loader" hidden></div>
<?php
		footing();
?>
