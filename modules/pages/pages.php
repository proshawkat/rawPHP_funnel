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
    $sc = new ShopifyClient($_SESSION[ SESSIONNAME ]['shop'], $_SESSION[ SESSIONNAME ]['token'], SHOPIFY_API_KEY, SHOPIFY_SECRET);
    if( !isset( $_SESSION[ SESSIONNAME ]['products'] ) ) {
        //Get all the products of the shop
        $all_loaded = false;
        $page = 0;
        $per_page = 250;
        while( !$all_loaded ) {
            //check if the store is not a test shop
            $products = $sc->call('GET', '/admin/products.json?fields=id,title,handle,&page=' . $page . '&limit=' . $per_page );
            foreach( $products as $product ) {
                $all_products[] = $product;
            }
            if( count( $products ) < $per_page ) $all_loaded = true;
            $page++;
        }
        $_SESSION[ SESSIONNAME ]['products'] = $all_products;
    } else $all_products = $_SESSION[ SESSIONNAME ]['products'];
?>
<div class="container" id ="pages_section" >
	<div class="text-center" style="margin-bottom: 5px;">
		<!-- Modal -->
		<div class="modal fade" id="new_champaign_input" role="dialog">
            <div class="modal-dialog modal-md">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" id="add_new_page_header" style="display: -webkit-box;">Select a name and title</h4>
                    </div>
                    <div class="modal-body form-group">
                        <div class="row">
                            <div class="col-sm-12">
                                 <form  class="form-horizontal" method="post" >
                                    <div id ="page_information_div">
                                        <div id="div_id_page_name" class="form-group required">
                                            <label for="id_page_name" class="col-xs-12 text-left" style="font-size: 14px;"> Page name<span class="asteriskField">*</span> </label>
                                            <div class="col-xs-12">
                                                <input class="input-md form-control" onkeydown="remove_warning('new_page')" onchange="remove_warning('new_page')" id="id_page_name" name="ref" placeholder="Input your new page name" style="margin-bottom: 10px" type="text" required />
                                            </div>
                                        </div>
                                        <div id="div_id_page_title" class="form-group required">
                                            <label for="id_page_title" class="col-xs-12 text-left" style="font-size: 14px;"> Page title<span class="asteriskField">*</span> </label>
                                            <div class="col-xs-12">
                                                <input class="input-md  textinput textInput form-control" onkeydown="remove_warning('new_page')" onchange="remove_warning('new_page')" id="id_page_title" name="title" placeholder="Input your page title" style="margin-bottom: 10px" type="text" required />
                                            </div>
                                        </div>
                                    </div>
                                    <div id ="product_information_div" style="display: none;">
                                        <div id="div_id_product_handle" class="form-group required">
                                            <div>
                                                <label  for="id_page_title" class="col-xs-12 text-left">
                                                    <span style="font-size: 14px;">Product</span>
                                                    <span style="display:none;" id="create_page_edit_control"> <a style="cursor:pointer;" onclick="show_search_field();"> - <span style="color: rgb(217, 83, 79);">Edit</span></a></span>
                                                    <div class="row">
                                                        <div class="col-xs-12" id="product_title_div" style="font-weight: normal;">
                                                        </div>
                                                    </div>
                                                </label>

                                            </div>
                                            <div style="" id="div_id_product" class="form-group required">
                                                <div class="col-xs-12 product_selected_div">
                                                    <div class="input-group" style="margin-bottom: 0px !important;">
                                                        <input type="text" class="form-control" id="search_text" placeholder="Search product, example: shirt">
                                                        <div class="input-group-addon" style="cursor:pointer; border-radius: 0px;" onclick="find_products()" >
                                                            Search
                                                        </div>
                                                    </div>
                                                    <div id="search_result" style="position: absolute;top:34px; width: 84.5%; z-index: 100000;"></div>
                                                    <input type="text" name="id_product" id="id_product" hidden>
                                                </div>
                                            </div>
                                       </div>
                                       <script>
                                           function show_search_field(){
                                               $('#div_id_product').fadeIn();   
                                               $('#product_title_div').html('');
                                               $('#id_page_handle').val('');    
                                               $('#id_product').val(''); 
                                           }
                                       </script>

                                        <div id="div_id_product_handle" class="form-group required">
                                            <label for="id_page_handle" class="col-xs-12 text-left"> Slug<span class="asteriskField">*</span> </label>
                                            <div class="col-xs-12">
                                                <input class="input-md  textinput textInput form-control" onkeydown="remove_warning('edit_page')" onchange="remove_warning('edit_page')"  id="id_page_handle" name="id_page_handle" placeholder="Choose your slug" value="" style="margin-bottom: 10px" type="text" required />
                                            </div>
                                        </div>

                                        <div id="div_id_product_type" class="form-group required" hidden>
                                            <label for="id_product_type" class="col-xs-12 text-left" style="font-size: 14px;"> Page type<span class="asteriskField">*</span> </label>
                                            <div class="col-xs-12">
                                                <select class="form-control" name="id_product" id="id_product_type" >
                                                    <option value="lead_magnet">Lead magnet</option>
                                                    <option value="product">Downsell/Upsell product</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                       <button type="button" class="btn btn-danger" data-dismiss="modal"> Cancel</button>
                       <button type="button" class="btn btn-primary" id="button_next" onclick="add_new_page_next_previous_button(this)"> Next</button>
                       <button type="button" class="btn btn-primary" id="button_previous"  onclick="add_new_page_next_previous_button(this)" style="display: none"> Back</button>
                       <button type="button" class="btn btn-primary" id="button_add" style="display: none"  onclick="add_new_page()"> Create page</button>
                   </div>
                </div>
            </div>
        </div>

        <!-- Modal import new page start -->
        <div class="modal fade" id="new_page_import_input" role="dialog">
            <div class="modal-dialog modal-md">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" style="display: -webkit-box;">Import page</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-12">
                                <div>
                                    <label class="sr-only" for="imported_page_json_file">Filename:</label>
                                    <input type="file" name="file" id="imported_page_json_file" /> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary"  onclick="import_new_page()">Import</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal import new page end -->

        <!-- Modal for edit_page_info popup start-->
        <div class="modal fade" id="edit_page_info_popup" role="dialog">
            <div class="modal-dialog modal-md">
                <div class="modal-content">
                    <div class="modal-header">
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                      <h4 class="modal-title" id="edit_page_header" style="display: -webkit-box;">Select a name and title</h4>
                    </div>
                    <form action="<?php echo BASE;?>/default/?process=update_page_info"  id ="update_page_info" class="form-horizontal" method="post" >
                        <div class="modal-body form-group">
                            <div class="row">
                                <div class="col-xs-12">
                                    <div id ="edit_page_information_div">
                                         <div id="div_id_page_name" class="form-group required">
                                            <label for="edit_page_name" class="col-xs-12 text-left"> Page name<span class="asteriskField">*</span> </label>
                                            <div class="col-xs-12">
                                                <input class="input-md form-control" id="edit_page_name" onkeydown="remove_warning('edit_page')" onchange="remove_warning('edit_page')" name="name" placeholder="Choose your page name"  style="margin-bottom: 10px" type="text" required />
                                                <input type="hidden" id="edit_page_id"  name="page_id" />
                                            </div>
                                        </div>
                                        <div id="div_id_page_title" class="form-group required">
                                            <label for="edit_page_title" class="col-xs-12 text-left"> Title<span class="asteriskField">*</span> </label>
                                            <div class="col-xs-12">
                                                <input class="input-md  textinput textInput form-control" onkeydown="remove_warning('edit_page')" onchange="remove_warning('edit_page')"  id="edit_page_title" name="title" placeholder="Choose your title" value="<?php echo $arr['title']?>" style="margin-bottom: 10px" type="text" required />
                                            </div>
                                        </div>
                                    </div>
                                    <!-- =================================== -->
                                    <div id="edit_product_information_div" style="display: none;">
                                        <div id="div_id_product_handle" class="form-group required">
                                            <div>
                                                <label  for="id_page_title" class="col-xs-12 text-left">
                                                    <span style="font-size: 14px;">Product</span><span > <a style="cursor:pointer;" onclick="edit_show_search_field();"> - <span style="color: rgb(217, 83, 79);">Edit</span></a></span>
                                                    <div class="row">
                                                        <div class="col-xs-12" id="edit_product_title_div" style="font-weight: normal;">No product selected</div>
                                                    </div> 
                                                </label>

                                            </div>
                                            <div style="display: none;" id="div_id_edit_product" class="form-group required">
                                                <div class="col-xs-12 product_selected_div">
                                                    <div class="input-group" style="margin-bottom: 0px !important;">
                                                        <input type="text" class="form-control" id="edit_search_text" placeholder="Search product, example: shirt">
                                                        <div style="cursor: pointer; border-radius: 0px;"  class="input-group-addon" onclick="edit_find_products()" > Search
                                                        </div>
                                                    </div>
                                                    <div id="edit_search_result" style="position: absolute;top:34px; width: 84.5%; z-index: 100000;"></div>
                                                    <input type="text" name="product" id="edit_product" hidden>
                                                </div>
                                            </div>
                                       </div>
                                       <script>
                                           function edit_show_search_field(){
                                               $('#div_id_edit_product').fadeIn();   
                                               $('#edit_product_title_div').html('');
                                               $('#edit_page_handle').val('');    
                                               $('#edit_product').val('');    
                                           }
                                       </script>
                                        <!-- =================================== -->

                                        <div id="div_id_product_handle" class="form-group required">
                                            <label for="edit_page_handle" class="col-xs-12 text-left"> Slug<span class="asteriskField">*</span> </label>
                                            <div class="col-xs-12">
                                                <input class="input-md  textinput textInput form-control" onkeydown="remove_warning('edit_page')" onchange="remove_warning('edit_page')"  id="edit_page_handle" name="edit_page_handle" placeholder="Choose your slug" value="<?php echo get_page_meta($arr[id],"product_handle");?>" style="margin-bottom: 10px" type="text" required />
                                            </div>
                                        </div>

                                        <div id="div_id_product_type" class="form-group required" hidden>
                                            <label for="edit_page_type" class="col-xs-12 text-left"> Page type<span class="asteriskField">*</span> </label>
                                            <div class="col-xs-12">
                                                <select class="form-control" name="type" id="edit_page_type" >
                                                    <option value="lead_magnet" selected>Lead magnet</option>
                                                    <option value="product">Downsell/Upsell product</option>
                                                </select>
                                            </div>
                                        </div>

                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal"> Cancel</button>

                            <button type="button" class="btn btn-primary" id="edit_button_next" onclick="add_new_page_next_previous_button(this)"> Next</button>
                            <button type="button" class="btn btn-primary" id="edit_button_previous"  onclick="add_new_page_next_previous_button(this)" style="display: none"> Back</button>
                            <button type="button" name="pageSaveBtn" class="btn btn-primary"onclick="set_button_type('save');" style="display: none;" id="edit_button_save"> Save</button>
                            <button type="button" name="pageEditBtn" class="btn btn-primary" id="edit_button_add" style="display: none;" onClick="set_button_type('proceed_to_editor');" >Proceed to editor</button>

                            <input type="hidden" name="button_type" id="button_type" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- Modal for edit_page_info popup end-->

        <!-- Modal for clone page popup start-->
        <div class="modal fade" id="clone_page_popup" role="dialog">
            <div class="modal-dialog modal-md">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title" id="clone_page_header" style="display: -webkit-box;">Select a name and title</h4>
                    </div>
                    <form id="clone_page" action="<?php echo BASE;?>/default/?process=clone_page" class="form-horizontal" method="post" >
                        <div class="modal-body form-group">
                            <div class="row">
                                <div class="col-xs-12">
                                    <div id="clone_page_information_div">
                                        <div id="div_id_page_name" class="form-group required">
                                            <label for="edit_page_name" class="col-xs-12 text-left"> Page Name<span class="asteriskField">*</span> </label>
                                            <div class="col-xs-12">
                                                <input class="input-md form-control" onkeydown="remove_warning('clone_page')" onchange="remove_warning('clone_page')"  id="clone_page_name" name="name" placeholder="Choose your page name"  style="margin-bottom: 10px" type="text" required />
                                                <input type="hidden" id="clone_page_id"  name="page_id" />
                                            </div>
                                        </div>
                                        <div id="div_id_page_title" class="form-group required">
                                            <label for="edit_page_title" class="col-xs-12 text-left"> Title<span class="asteriskField">*</span> </label>
                                            <div class="col-xs-12">
                                                <input class="input-md  textinput textInput form-control" onkeydown="remove_warning('clone_page')" onchange="remove_warning('clone_page')"  id="clone_page_title" name="title" placeholder="Choose your title" value="<?php echo $arr['title']?>" style="margin-bottom: 10px" type="text" required />
                                            </div>
                                        </div>
                                    </div>
                                     <!-- =================================== -->
                                    <div id ="clone_product_information_div" style="display: none;">
                                        <div id="div_id_product_handle" class="form-group required">
                                            <div>
                                                <label  for="id_page_title" class="col-xs-12 text-left">
                                                    <span style="font-size: 14px;">Product</span><span > <a style="cursor:pointer;" onclick="clone_show_search_field();"> - <span style="color: rgb(217, 83, 79);">Edit</span></a></span>
                                                    <div class="row">
                                                        <div class="col-xs-12" id="clone_product_title_div" style="font-weight: normal;">No product selected</div>
                                                    </div>
                                                </label>

                                            </div>
                                            <div style="display: none;" id="div_id_clone_product" class="form-group required">
                                                <div class="col-xs-12 product_selected_div">
                                                    <div class="input-group" style="margin-bottom: 0px !important;">
                                                            <input type="text" class="form-control" id="clone_search_text" placeholder="Search product, example: shirt">
                                                            <div class="input-group-addon" style="cursor: pointer; border-radius: 0px;"  onclick="clone_find_products()" >
                                                             Search
                                                        </div>
                                                    </div>
                                                    <div id="clone_search_result" style="position: absolute;top:34px; width: 84.5%; z-index: 100000;"></div>
                                                    <input type="text" name="product" id="clone_product" hidden>
                                                </div>
                                            </div>
                                       </div>
                                       <script>
                                           function clone_show_search_field(){
                                               $('#div_id_clone_product').fadeIn(); 
                                               $('#clone_product_title_div').html('');
                                               $('#clone_page_product_slug').val('');
                                               $('#clone_product').val('');   
                                           }
                                       </script>
                                        <!-- =================================== -->

                                        <div id="div_id_product_handle" class="form-group required">
                                            <label for="clone_page_product_slug" class="col-xs-12 text-left"> Slug<span class="asteriskField">*</span> </label>
                                            <div class="col-xs-12">
                                                <input class="input-md  textinput textInput form-control" onkeydown="remove_warning('edit_page')" onchange="remove_warning('edit_page')"  id="clone_page_product_slug" name="clone_page_product_slug" placeholder="Choose your slug" value="<?php echo get_page_meta($page_id,"product_handle");?>" style="margin-bottom: 10px" type="text" required />
                                            </div>
                                        </div>

                                        <div id="div_id_product_type" class="form-group required" hidden>
                                            <label for="edit_page_type" class="col-xs-12 text-left"> Page type<span class="asteriskField">*</span> </label>
                                            <div class="col-xs-12">
                                                <select class="form-control" name="type" id="clone_page_type" >
                                                    <option value="lead_magnet" selected>Lead magnet</option>
                                                    <option value="product">Downsell/Upsell product</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal"> Cancel</button>
                             <button type="button" class="btn btn-primary" id="clone_button_next" onclick="add_new_page_next_previous_button(this)"> Next</button>
                            <button type="button" class="btn btn-primary" id="clone_button_previous"  onclick="add_new_page_next_previous_button(this)" style="display: none"> Back</button>

                            <button type="button" name="cloneBtn" id="button_clone_page" class="btn btn-primary" onClick="clone_page()" style="display: none;" > Clone</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- Modal for clone page popup end-->
	</div>
</div>
<br/>
<div class="clearfix"></div>
<div class="col-md-12 col-sm-12 col-xs-12" id ="pages_div">
    <div class="x_panel">
        <div class="x_title">
            <h2>Pages</h2>
    		<ul class=" panel_toolbox_custom" style="list-style-type: none;margin:0px;">
    			<li>
    				<a href="#" class="btn btn-primary" data-toggle="modal" data-target="#new_page_import_input" style="color:white;"><i class="glyphicon glyphicon-import"></i> Import new page</a>
    		    </li>
                <li>
                    <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#new_champaign_input" style="color:white;"><i class="glyphicon glyphicon-plus"></i> Add new page</a>
                </li>
    		</ul>
            <div class="clearfix"></div>
        </div>
        <div class="x_content">
            <div class="table-responsive">
		    <?php
				global $mysqli;
                $pres = $mysqli->query("SELECT * FROM pages WHERE (shop_id = $shop_id AND (status = '1' OR status = '0'))");
				$total = $pres->num_rows;
				$page = ( isset( $_REQUEST['page'] ) ? $_REQUEST['page'] : 1 );
				$page_pagination = ( isset( $_REQUEST['page'] ) ? $_REQUEST['page'] : 1 );
				$limit = 25;
				$start = ( $page - 1 ) * $limit;
				$pres = $mysqli->query("SELECT * FROM pages WHERE (shop_id = $shop_id AND (status = '1' OR status = '0')) ORDER BY id DESC LIMIT $start, $limit") or die(mysql_error());
				if( $pres->num_rows == 1 && $page>1 ) {
					$page=$page-1;
				}
				if( $pres->num_rows> 0) {
				?>
				<table class="table table-striped jambo_table bulk_action_page table_page">
					<thead>
					  <tr class="headings">
						<th style="padding:5px;vertical-align:initial;"><input type="checkbox" id="check-all-page" class="flat"></th>
						<th class="column-title-page col-sm-4 col-md-4">Page name </th>
						<th class="column-title-page col-sm-2 col-md-2">Created</th>
						<th class="column-title-page col-sm-2 col-md-2">Last updated</th>
						 <th class="column-title-page no-link last text-center col-sm-4 col-md-4"><span class="nobr">Options</span></th>
						 <th class="bulk-actions bulk-actions-page " colspan="7">
							  <a class="antoo" style="color:#fff; font-weight:500;">Bulk Actions ( <span class="action-cnt-pages"> </span> )
								 <li class="dropdown" style="list-style-type: none;display:inline;">
									  <a style="color:white;" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-chevron-down"></i></a>
									  <ul class="dropdown-menu" role="menu" >
										<li><a onclick="duplicate_me('page','pages')"><i class="fa fa-files-o" aria-hidden="true"></i> Clone</a></li>
                                        <li><a onclick="delete_me('page','pages')"><i class="fa fa-trash" aria-hidden="true"></i> Delete</a></li>
										<!-- <li><a onclick="export_me('page')"><i class="fa fa-external-link" aria-hidden="true"></i> Export</a></li> -->
									  </ul>
									</li>
							  </a>
						 </th>
					  </tr>
					</thead>
					<tbody>
					<?php
						$num_page = ceil($total / $limit);
						while( $arr = $pres->fetch_array( MYSQLI_ASSOC ) ) {
                            $page_id = $arr['id'];
                            $product_handle = get_page_meta($page_id,'product_handle');
                            $product_id = get_page_meta($page_id,'product_id');
							 ?>
								<tr class="even pointer" style="padding:4px;vertical-align:initial;">
								   <td class="a-center " style="padding:4px;vertical-align:initial;">
									  <input type="checkbox" class="flat" name="table_records_pages" value="<?php echo $arr['id'] ?>">
									</td>
									 <td class="col-sm-4 col-md-4" style="vertical-align:initial;"><?php  echo '<a href="'.BASE.'/editor/?page='.$arr['id'].'">'.$arr['name'].'</a><br>'; ?></td> 
									 <td class="col-sm-2 col-md-2" style="vertical-align:initial;"><?php $time = strtotime($arr['date']);
                                        echo humanTiming($time); ?></td>
									 <td class="col-sm-2 col-md-2" style="vertical-align:initial;">
                                    <?php 
                                        $time = strtotime($arr['last_updated']);
                                        echo humanTiming($time);
                                    ?>
                                     </td>
									 <td class="col-sm-4 col-md-4 a-right a-right text-center" style="vertical-align:initial;">
										  <div class=" " >
											<a target="_blank" type="button" class="btn btn-sm btn-primary"  href="<?php echo $full_shop_url . SHOPIFY_PROXY_PREFIX;?>/p/<?php echo $arr['id']; ?>/<?php echo $product_handle?>" title="View"><span class="glyphicon glyphicon-eye-open"></span></a>
											<a onclick="send_page_info_to_edit_popup('<?php echo $arr['id']; ?>');" type="button" class="btn btn-sm btn-primary"  href="#" data-toggle="modal" data-target="#edit_page_info_popup" title="Edit"><span class="glyphicon glyphicon-edit"></span></a>
											<a onclick="export_single_page('<?php echo $arr['id']; ?>')"  type="button" class="btn btn-sm btn-primary"><i class="fa fa-external-link" aria-hidden="true" title="Export"></i></a>
											<a onclick="send_page_info_to_clone_popup('<?php echo $arr['id']; ?>');" type="button" class="btn btn-sm btn-primary"  href="#" data-toggle="modal" data-target="#clone_page_popup" title="Clone"><span class="glyphicon glyphicon-duplicate"></span></a>
											<a target="_blank" type="button" class="btn btn-sm btn-primary"  href="<?php echo  BASE ?>/page_statistics/0/<?php echo $arr['id']; ?>" title="Statistics"><i class="fa fa-bar-chart" aria-hidden="true"></i></a>
											<a type="button" class="btn btn-sm btn-danger" onclick="delete_page_from_db(<?php echo $arr['shop_id'] ?>,<?php echo $arr['id']; ?>,<?php echo $page ; ?>,'pages')"   title="Delete"> <span class="glyphicon glyphicon-trash"></a>
                                            <input type="hidden" id="<?php echo $arr['id']; ?>_page_name" value="<?php echo htmlspecialchars($arr['name']) ?>">
                                            <input type="hidden" id="<?php echo $arr['id']; ?>_page_title" value="<?php echo htmlspecialchars($arr['title']) ?>">
                                            <input type="hidden" id="<?php echo $arr['id']; ?>_page_type" value="<?php echo $arr['type'] ?>">
                                            <input type="hidden" id="<?php echo $arr['id']; ?>_product_handle" value="<?php echo htmlspecialchars($product_handle) ?>">
                                            <input type="hidden" id="<?php echo $arr['id']; ?>_product_id" value="<?php echo $product_id ?>">
										</div>
									 </td>
								  </tr>
								  <?php }?>		  
							<?php
						}else echo "<div class='btn-danger text-center' style='height:40px;margin 0 auto;font-size:16px;position:relative;padding:10px; vertical-align: middle;'>You have not created any page yet.</div>";
					?>
				   </tbody>
			    </table>
               <!--  <a href="<?php echo BASE ?>/pages" class="btn btn-primary"><i class="fa fa-clone"></i> All pages</a> -->
            </div>
		</div>
		<?php
		if ($num_page > 1) {
			pagination_for_pages($page_pagination, $num_page);
		}
		?>
    </div>	
</div>	
<div class="clearfix"></div>
<div class="loader" hidden></div>
<input type="hidden" name="page_number_for_products" id="page_number_for_products" value="1">
<input type="hidden" name="page_number_for_edit_products" id="page_number_for_edit_products" value="1">
<input type="hidden" name="page_number_for_clone_products" id="page_number_for_clone_products" value="1">
<textarea id="all_products_info" hidden><?php echo json_encode($all_products); ?></textarea>
<?php 
    module_include('template-showcase');
	footing();
?>
