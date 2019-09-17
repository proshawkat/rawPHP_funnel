<?php
    error_reporting(-1);
    heading();
    $i_am_admin = 'i_am_admin';
    //setcookie("i_am_admin", $i_am_admin);
    $shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];
    $shop_currency = get_shop_meta( $shop_id, 'shop_currency' );
    $shop_domain = get_shop_meta( $shop_id, 'shop_domain');

    $force_ssl = get_shop_meta( $shop_id, 'force_ssl');
    $full_shop_url= ( $force_ssl > 0 ? 'https://' : 'http://' ) . $shop_domain;

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
                    <div class="modal-body form-group">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    <label class="sr-only" for="imported_page_json_file">Filename:</label>
                                    <input type="file" class="form-control" name="file" id="imported_page_json_file" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal"> Cancel</button>
                        <button type="button" class="btn btn-primary"  onclick="import_new_page()"> Import</button>
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
                    <form action="<?php echo BASE;?>/default/?process=update_page_info"  id ="update_page_info" class="form-horizontal" method="post"  >
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
            <h2>Latest pages</h2>
            <ul class=" panel_toolbox_custom" style="list-style-type: none;margin:0px;">
                <li>
                    <a id="intro_create_page" href="#" class="btn btn-primary" data-toggle="modal" data-target="#new_champaign_input" style="color:white;"><i class="glyphicon glyphicon-plus"></i> Add new page</a>
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
                $limit = 15;
                $start = ( $page - 1 ) * $limit;
                $pres = $mysqli->query("SELECT * FROM pages WHERE (shop_id = $shop_id AND (status = '1' OR status = '0'))  ORDER BY id DESC LIMIT $start, $limit") or die(mysql_error());
                if( $pres->num_rows == 1 && $page>1 ) {
                    $page=$page-1;
                }
                if( $pres->num_rows> 0) {
                ?>
                <table class="table table-striped jambo_table bulk_action_page table_page">
                    <thead>
                      <tr class="headings">
                        <th style="padding:5px;vertical-align:initial;"><input type="checkbox" id="check-all-page" class="flat"></th>
                        <th class="column-title-page col-sm-4">Page name </th>
                        <th class="column-title-page col-sm-2">Created</th>
                        <th class="column-title-page col-sm-2">Last updated</th>
                         <th class="column-title-page no-link last text-center col-sm-4"><span class="nobr">Options</span></th>
                         <th class="bulk-actions bulk-actions-page " colspan="7">
                              <a class="antoo" style="color:#fff; font-weight:500;">Bulk Actions ( <span class="action-cnt-pages"> </span> )
                                 <li class="dropdown" style="list-style-type: none;display:inline;">
                                      <a style="color:white;" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-chevron-down"></i></a>
                                      <ul class="dropdown-menu" role="menu" >
                                        <li><a onclick="duplicate_me('page','home')"><i class="fa fa-files-o" aria-hidden="true"></i> Clone</a></li>
                                        <li><a onclick="delete_me('page' , 'home')"><i class="fa fa-trash" aria-hidden="true"></i> Delete</a></li>
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
                                     <td class="col-sm-4" style="vertical-align:initial;"><?php  echo '<a href="'.BASE.'/editor/?page='.$arr['id'].'">'.$arr['name'].'</a><br>'; ?></td>
                                     <td class="col-sm-2" style="vertical-align:initial;"><?php  $time = strtotime($arr['date']);
                                        echo humanTiming($time); ?></td>
                                     <td class="col-sm-2" style="vertical-align:initial;"><?php  $time = strtotime($arr['last_updated']);
                                        echo humanTiming($time); ?></td>
                                     <td class="col-sm-4 a-right a-right text-center" style="vertical-align:initial;">
                                          <div class=" " >
                                            <a target="_blank" type="button" class="btn btn-sm btn-primary"  href="<?php echo $full_shop_url . SHOPIFY_PROXY_PREFIX;?>/p/<?php echo $arr['id']; ?>/<?php echo $product_handle?>" title="View"><span class="glyphicon glyphicon-eye-open"></span></a>
                                            <a onclick="send_page_info_to_edit_popup('<?php echo $arr['id']; ?>');" type="button" class="btn btn-sm btn-primary"  href="#" data-toggle="modal" data-target="#edit_page_info_popup" title="Edit"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></span></a>
                                            <a onclick="send_page_info_to_clone_popup('<?php echo $arr['id']; ?>');" type="button" class="btn btn-sm btn-primary"  href="#" data-toggle="modal" data-target="#clone_page_popup" title="Clone"><span class="glyphicon glyphicon-duplicate"></span></a>
                                            <a target="_blank" type="button" class="btn btn-sm btn-primary"  href="<?php echo  BASE ?>/page_statistics/0/<?php echo $arr['id']; ?>" title="Statistics"><i class="fa fa-bar-chart" aria-hidden="true"></i></a>
                                            <a type="button" class="btn btn-sm btn-danger" onclick="delete_page_from_db(<?php echo $arr['shop_id'] ?>,<?php echo $arr['id']; ?>,<?php echo $page ; ?>,'base')"   title="Delete"> <span class="glyphicon glyphicon-trash"></a>

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
                <?php if  ($total >15) { ?>
                <a href="<?php echo BASE ?>/pages" class="btn btn-primary" style="float: right;margin-right: 0px;"><i class="fa fa-clone"></i> All pages</a>
               <?php } ?>
            </div>
        </div>
    </div>
</div>
<div class="clearfix"></div>
<br/>
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
                        <button type="button" form="funnel" onclick="create_new_funnel()" class="btn btn-primary" >Create funnel</button>
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
            <h2>Latest funnels</h2>
            <ul class=" panel_toolbox_custom" style="list-style-type: none;margin:0px;">
                    <li>
                        <a id="intro_create_funnel" href="#" class="btn btn-primary" data-toggle="modal" data-target="#new_funnel_input" style="color:white;"><i class="glyphicon glyphicon-plus"></i> Add new funnel</a>
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
                $funnel_limit = 15;
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
                            <th class="column-title-funnel col-sm-4 col-md-4 ">Funnel name </th>
                            <th class="column-title-funnel col-sm-2 col-md-2">Created</th>
                            <th class="column-title-funnel col-sm-2 col-md-2 ">Last updated</th>
                            <th class="column-title-funnel no-link last text-center col-sm-4 col-md-4 "><span class="nobr">Options</span></th>
                            <th class="bulk-actions bulk-actions-funnel" colspan="7">
                                <a class="antoo" style="color:#fff; font-weight:500;">Bulk Actions ( <span class="action-cnt-funnels"> </span>)
                                    <li class="dropdown" style="list-style-type: none;display:inline;">
                                        <a style="color:white;" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i class="fa fa-chevron-down"></i></a>
                                        <ul class="dropdown-menu" role="menu" >
                                           <li><a onclick="duplicate_me('funnel','home')"><i class="fa fa-files-o" aria-hidden="true"></i> Clone</a></li>
                                           <li><a onclick="delete_me('funnel','home')"><i class="fa fa-trash" aria-hidden="true"></i> Delete</a></li>
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
                            <td class="col-sm-4  col-md-4 a-right a-right text-center " style="vertical-align:initial;">
                                <div>
                                    <a target="_blank" type="button" class="btn btn-sm btn-primary"  href="<?php echo $funnel_url; ?>" title="View"><span class="glyphicon glyphicon-eye-open"></span></a>
                                    <a type="button" class="btn btn-sm btn-primary"  href="<?php echo BASE.'/funnel/'.$arr['id']; ?>" title="Edit"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>
                                    <a type="button" onclick ="duplicate_funnel_into_db(<?php echo $arr['shop_id'];?> , <?php echo $arr['id']; ?> , 'base' )" class="btn btn-sm btn-primary" > <span class="glyphicon glyphicon-duplicate" title="Clone"></a>
                                    <a target="_blank" type="button" class="btn btn-sm btn-primary"  href="<?php echo  BASE ?>/funnel_statistics/<?php echo $arr['id']; ?>" title="Statistics"><i class="fa fa-bar-chart" aria-hidden="true"></i></a>
                                    <a type="button" class="btn btn-sm btn-danger" onclick="delete_funnel_from_db(<?php echo $arr['shop_id'];?>,<?php echo $arr['id']; ?>,<?php echo $funnel_page; ?>,'base')"  href="javascript:void 0;" title="Delete"> <span class="glyphicon glyphicon-trash"></a>
                                </div>
                            </td>
                        </tr>
                    <?php } ?>
                    </tbody>
                </table>
                <?php } else echo "<div class='btn-danger text-center' style='height:40px;margin 0 auto;font-size:16px;position:relative;padding:10px; vertical-align: middle;'>You have not created any funnel yet.</div>";
            ?>
                <?php if  ($total_funnels>15) { ?>
                <a href="<?php echo BASE ?>/all_funnels" class="btn btn-primary" style="float: right;margin-right: 0px;"><i class="fa fa-sitemap"></i> All funnels</a>
                <?php } ?>
            </div>
        </div>
    </div>
</div>
<div class="clearfix"></div>
<?php module_include('template-showcase');?>

<div class="loader" hidden></div>
<input type="hidden" name="page_number_for_products" id="page_number_for_products" value="1">
<input type="hidden" name="page_number_for_edit_products" id="page_number_for_edit_products" value="1">
<input type="hidden" name="page_number_for_clone_products" id="page_number_for_clone_products" value="1">
<textarea id="template_dependent_css_link" hidden></textarea>
<textarea id="template_html_data" hidden></textarea>
<textarea id="bulk_action_page_id" hidden ></textarea>
<textarea id="bulk_action_funnel_id" hidden></textarea>
<textarea id="all_products_info" hidden><?php echo json_encode($all_products); ?></textarea>
<?php
        footing();
?>
<?php
    function process_add_new_page() {
        global $mysqli;
        $empty_div = '[{"tag":"div","endtag":1,"attributes":{"class":"body_container do_not_show_my_menu text-center","style":"background-color: white;"},"content":"","nodes":[{"tag":"div","endtag":1,"attributes":{"class":"main_container"},"content":"","nodes":[{"tag":"div","endtag":1,"attributes":{"class":"container"},"content":"","nodes":[{"tag":"div","endtag":1,"attributes":{"class":"row"},"content":"","nodes":[{"tag":"div","endtag":1,"attributes":{"class":"col-sm-12"},"content":"","nodes":[{"tag":"div","endtag":1,"attributes":{"class":""},"content":"","nodes":[]}]}]}]}]}]}]';
        $res = $mysqli->query("INSERT INTO pages  ( `date`, `last_updated`, `shop_id`, `type`, `name`, `title`, `html`, `status`) VALUES ( '" . date("Y-m-d H:i:s") . "', '" . date("Y-m-d H:i:s") . "', '" . $_SESSION[ SESSIONNAME ]['shop_id'] . "', '" . $mysqli->real_escape_string( $_REQUEST['type'] ) . "', '" . $mysqli->real_escape_string( urldecode ($_REQUEST['name']) ) . "', '" . $mysqli->real_escape_string( urldecode( $_REQUEST['title'] )) . "', '" . $empty_div . "', '0')");
        $pres = $mysqli->query("SELECT id FROM pages ORDER BY id DESC LIMIT 1");
        $arr = $pres->fetch_array( MYSQLI_ASSOC );
        $page_id = $arr['id'];
        $product_id = $mysqli->real_escape_string( $_REQUEST['product_id'] );
        $product_handle = $_REQUEST['product_handle'];
        $product_handle = str_replace('"', "", $product_handle);
        $product_handle = str_replace("'", "", $product_handle);
        $product_handle = $mysqli->real_escape_string( preg_replace('!\s+!', ' ',$product_handle ));
        $product_handle = str_replace( " " ,"-" , $product_handle );

        add_page_meta( $page_id, 'product_id', $product_id );
        add_page_meta( $page_id, 'product_handle', $product_handle );
        echo $page_id;
    }

    function process_add_new_page_with_template(){
        global $mysqli;
        $html = $_REQUEST['html_data'];
        $page_id = $_REQUEST['page_id'];
        $html_style = $_REQUEST['html_style'];

        $product_id = get_page_meta( $page_id, 'product_id' );
        if($product_id != ""){
            $html = get_new_product_json($html,$product_id);
        }

        $sql = "UPDATE pages SET `html` = '" . $mysqli->real_escape_string( $html ) . "' WHERE id = '$page_id'";
        $res = $mysqli->query($sql);

        echo $page_id;
    }

    function process_add_new_page_with_template_json(){
        global $mysqli;
        $html = $_REQUEST['html_data'];
        $page_id = $_REQUEST['page_id'];
        $page_meta = json_decode($_REQUEST['page_meta']);

        $product_id = get_page_meta( $page_id, 'product_id' );
        if($product_id != ""){
            $html = get_new_product_json($html,$product_id);
        }

        $sql = "UPDATE pages SET `html` = '" . $mysqli->real_escape_string( $html ) . "' WHERE id = '$page_id'";
        $res = $mysqli->query($sql);
        foreach($page_meta as $meta) {
            if( trim( $meta->meta_value ) != '' ) add_page_meta( $page_id, $meta->meta_name, $meta->meta_value );
        }
        echo $page_id;
    }

    function process_import_new_page() {
        global $mysqli;
        $res = $mysqli->query("INSERT INTO pages  ( `date`, `last_updated`, `shop_id`, `type`, `name`, `title`, `html`, `status`) VALUES ( '" . date("Y-m-d H:i:s") . "', '" . date("Y-m-d H:i:s") . "', '" . $_SESSION[ SESSIONNAME ]['shop_id'] . "', '" . $mysqli->real_escape_string( $_REQUEST['type'] ) . "', '" . $mysqli->real_escape_string( $_REQUEST['name'] ) . "', '" . $mysqli->real_escape_string( $_REQUEST['title'] ) . "', '" . $mysqli->real_escape_string( $_REQUEST['html'] ) . "', '0')");

        $pres = $mysqli->query("SELECT id FROM pages ORDER BY id DESC LIMIT 1");
        $arr = $pres->fetch_array( MYSQLI_ASSOC );
        $page_id=$arr['id'];

        $page_meta = json_decode($_REQUEST['page_meta']);
        foreach($page_meta as $meta) {
            add_page_meta( $page_id, $meta->meta_name, $meta->meta_value );
        }
        echo $page_id;
    }

    /*function process_delete_page_from_db() {
        global $mysqli;
        $mysqli->query("DELETE FROM pages WHERE shop_id='"  . $_REQUEST['shop_id'] ."' AND id='" . $_REQUEST['page_id'] . "'");
        $mysqli->query("DELETE FROM pages_meta WHERE  page_id='" . $_REQUEST['page_id'] . "'");
        echo $_REQUEST['redirect'] ;
    }*/

    function process_delete_page_from_db() {
        global $mysqli;
        $sql = "UPDATE pages SET `status` = '2' WHERE id = '".$_REQUEST['page_id']."'";
        $res = $mysqli->query($sql);
        echo $_REQUEST['redirect'] ;
    }

    function process_delete_funnel_from_db() {
        global $mysqli;
        $mysqli->query("DELETE FROM funnels WHERE shop_id='"  . $_REQUEST['shop_id'] ."' AND id='" . $_REQUEST['funnel_id'] . "'");
        $mysqli->query("DELETE FROM funnels_meta WHERE  funnel_id='" . $_REQUEST['funnel_id'] . "'");
        $landing_page_product_array = get_shop_meta($_REQUEST['shop_id'],'landing_page_product_array');
        $landing_page_product_array = json_decode($landing_page_product_array);
        for ($i = 0; $i < sizeof($landing_page_product_array); $i++) {
            if ($landing_page_product_array[$i]->funnel_id == $_REQUEST['funnel_id']) {
                array_splice($landing_page_product_array, $i, 1);
                $i--;
            }
        }
        add_shop_meta($_REQUEST['shop_id'], 'landing_page_product_array', json_encode($landing_page_product_array));
        echo $_REQUEST['redirect'] ;
    }

    function process_duplicate_page_into_db() {
        global $mysqli;
        $mysqli->query("INSERT INTO pages (`date`, `last_updated`, `shop_id`, `type`, `name`, `title`, `html`, `status`) SELECT '" . date("Y-m-d H:i:s") . "', '" . date("Y-m-d H:i:s") . "', `shop_id`, `type`, `name`, `title`, `html`, `status`   FROM pages  WHERE shop_id='"  . $_REQUEST['shop_id'] ."' AND id='" . $_REQUEST['page_id'] . "'");
        $pres = $mysqli->query("SELECT id FROM pages ORDER BY id DESC LIMIT 1");
        $arr = $pres->fetch_array( MYSQLI_ASSOC );
        $latest_page_id=$arr['id'];
        $mysqli->query("INSERT INTO pages_meta (`page_id`, `meta_name`, `meta_value`) SELECT $latest_page_id , `meta_name`, `meta_value`  FROM pages_meta  WHERE  page_id='" . $_REQUEST['page_id'] . "'");
        header("location:" . BASE ."/home");
    }

    function process_duplicate_funnel_into_db() {
        global $mysqli;

        $title_sqli = $mysqli->query("SELECT title FROM funnels WHERE shop_id='"  . $_REQUEST['shop_id'] ."' AND id='" . $_REQUEST['funnel_id'] . "' ");
        $arr = $title_sqli->fetch_array( MYSQLI_ASSOC );
        $latest_funnel_title=$arr['title']." copy";

        $mysqli->query("INSERT INTO funnels (`date`, `last_updated`, `shop_id`,`title`) SELECT '" . date("Y-m-d H:i:s") . "', '" . date("Y-m-d H:i:s") . "', `shop_id`,  '" . $mysqli->real_escape_string( $latest_funnel_title ) . "' FROM funnels  WHERE shop_id='"  . $_REQUEST['shop_id'] ."' AND id='" . $_REQUEST['funnel_id'] . "'");
        
        $pres = $mysqli->query("SELECT id FROM funnels ORDER BY id DESC LIMIT 1");
        $arr = $pres->fetch_array( MYSQLI_ASSOC );
        $latest_funnel_id=$arr['id'];

        $mysqli->query("INSERT INTO funnels_meta (`funnel_id`, `meta_name`, `meta_value`) SELECT $latest_funnel_id , `meta_name`, `meta_value`  FROM funnels_meta  WHERE  funnel_id='" . $_REQUEST['funnel_id'] . "'");
        echo  $_REQUEST['redirect'];
        // header("location:". BASE . "/home");
    }

    function process_clone_page() {
        $shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];
        global $mysqli;
        $id = $_REQUEST['page_id'];
        $name =  $_REQUEST['name'];
        $title =  $_REQUEST['title'];
        $type = $_REQUEST['type'];
        $product = $_REQUEST['product'];
        $product = explode("/",$product);
        $product_id = $product[0];
        $product_handle = $_REQUEST['clone_page_product_slug'];
        $product_handle = str_replace('"', "", $product_handle);
        $product_handle = str_replace("'", "", $product_handle);
        $product_handle=str_replace(" ","-",trim($product_handle));

        $pres = $mysqli->query("SELECT name,html FROM pages  WHERE  id='$id'");
        $arr = $pres->fetch_array( MYSQLI_ASSOC );
        $page_name=$arr['name'];
        $html=$arr['html'];
        if ( $page_name == $name ) {
            $name = $_REQUEST['name'].' copy';
        }

        if($product_id != ""){
            if(get_page_meta( $id, 'product_id') != $product_id){
                $html = get_new_product_json($html,$product_id);
            }
        }
        
        $mysqli->query("INSERT INTO pages  ( `date`, `last_updated`, `shop_id`, `type`, `name`, `title`, `html`, `status`) VALUES ( '" . date("Y-m-d H:i:s") . "', '" . date("Y-m-d H:i:s") . "', '$shop_id', '$type', '".$mysqli->real_escape_string( urldecode($name) )."', '".$mysqli->real_escape_string(urldecode($title) )."', '" . $mysqli->real_escape_string( $html ) . "', '0')");
        if($mysqli->error){
            echo $mysqli->error;
        }else{
            $body_css = get_page_meta($id,"body_css");
            $custom_script = get_page_meta($id,"custom_script");
            $custom_css = get_page_meta($id,"custom_css");
            
            
            $bundle_products = get_page_meta($id,"bundle_products");
            $all_timer_data = get_page_meta($id,"all_timer_data");
            $exit_popup_status = get_page_meta($id,"exit_popup_status");
            $klaviyo_list_id = get_page_meta($id,"klaviyo_list_id");
            $aweber_list_url = get_page_meta($id,"aweber_list_url");
            $mailchimp_list_id = get_page_meta($id,"mailchimp_list_id");
            $drip_account_id = get_page_meta($id,"drip_account_id");
            $drip_campaign_id = get_page_meta($id,"drip_campaign_id");
            $drip_campaign_type = get_page_meta($id,"drip_campaign_type");
            $drip_workflow_id = get_page_meta($id,"drip_workflow_id");
            $seo_page_title = get_page_meta($id,"seo_page_title");
            $seo_page_description = get_page_meta($id,"seo_page_description");
            $seo_page_image = get_page_meta($id,"seo_page_image");
            $all_eg_data = get_page_meta($id,"all_eg_data");
            
            
            $pres = $mysqli->query("SELECT id FROM pages ORDER BY id DESC LIMIT 1");
            $arr = $pres->fetch_array( MYSQLI_ASSOC );
            $page_id=$arr['id'];
            
            if ($product_id != '') add_page_meta( $page_id, 'product_id', $product_id );
            if ($product_handle != '') add_page_meta( $page_id, 'product_handle', $product_handle);
            if ($body_css != '') add_page_meta( $page_id, 'body_css', $body_css);
            if ($custom_script != '') add_page_meta( $page_id, 'custom_script', $custom_script);
            if ($custom_css != '') add_page_meta( $page_id, 'custom_css', $custom_css);
            
            if ($bundle_products != '') add_page_meta( $page_id, 'bundle_products', $bundle_products);
            if ($all_timer_data != '') add_page_meta( $page_id, 'all_timer_data', $all_timer_data);
            if ($exit_popup_status != '') add_page_meta( $page_id, 'exit_popup_status', $exit_popup_status);
            if ($klaviyo_list_id != '') add_page_meta( $page_id, 'klaviyo_list_id', $klaviyo_list_id);
            if ($aweber_list_url != '') add_page_meta( $page_id, 'aweber_list_url', $aweber_list_url);
            if ($mailchimp_list_id != '') add_page_meta( $page_id, 'mailchimp_list_id', $mailchimp_list_id);
            if ($drip_account_id != '') add_page_meta( $page_id, 'drip_account_id', $drip_account_id);
            if ($drip_campaign_id != '') add_page_meta( $page_id, 'drip_campaign_id', $drip_campaign_id);
            if ($drip_campaign_type != '') add_page_meta( $page_id, 'drip_campaign_type', $drip_campaign_type);
            if ($drip_workflow_id != '') add_page_meta( $page_id, 'drip_workflow_id', $drip_workflow_id);
            if ($seo_page_title != '') add_page_meta( $page_id, 'seo_page_title', $seo_page_title);
            if ($seo_page_description != '') add_page_meta( $page_id, 'seo_page_description', $seo_page_description);
            if ($seo_page_image != '') add_page_meta( $page_id, 'seo_page_image', $seo_page_image);
            if ($all_eg_data != '') add_page_meta( $page_id, 'all_eg_data', $all_eg_data);
            
            header("location:" . BASE . "/home");
        }
    }

    function process_update_page_info() {
		global $mysqli;
        $button_type = $_REQUEST['button_type'];
        $id = $_REQUEST['page_id'];
        $name = $mysqli->real_escape_string( urldecode ( $_REQUEST['name']));
        $title = $mysqli->real_escape_string( urldecode ( $_REQUEST['title']));

        $type = $_REQUEST['type'];
        $product = $_REQUEST['product'];
        $product = explode("/",$product);
        $product_id = $product[0];
        $product_handle = $_REQUEST['edit_page_handle'];
        $product_handle = str_replace('"', "", $product_handle);
        $product_handle = str_replace("'", "", $product_handle);
        $product_handle= preg_replace('/\s+/', '-', trim($product_handle));
        
        if ($product_id != "" && get_page_meta($id, 'product_id') != $product_id) {
            $sql = "SELECT html FROM pages WHERE id = '$id'";
            $res = $mysqli->query($sql);
            $html = $res->fetch_array( MYSQLI_ASSOC );
            $html = $html['html'];
            $html = get_new_product_json($html,$product_id);
            $html = $mysqli->real_escape_string( $html );
            $sql = "UPDATE pages SET type='$type', name='$name', title='$title', html = '$html' WHERE id='$id'";
        }else{
            $sql = "UPDATE pages SET type='$type', name='$name', title='$title' WHERE id='$id'";
        }
        $mysqli->query($sql);
        add_page_meta( $id, 'product_id', $product_id );
        add_page_meta( $id, 'product_handle', $product_handle );
        if ( $button_type == 'save' )  {
             header( "Location:" . BASE . "/home");
        }
        if ( $button_type == 'proceed_to_editor' )  {
             header("Location:".BASE. '/editor/?page='.$id);
        }
    }

    function process_bulk_duplicate_page(){
        global $mysqli;
        $shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];
        $bulk_action_page_id = $_REQUEST['bulk_action_page_id'];
        $bulk_action_page_id = json_decode($bulk_action_page_id);
        foreach($bulk_action_page_id as $page_id){
            $mysqli->query("INSERT INTO pages (`date`, `last_updated`, `shop_id`, `type`, `name`, `title`, `html`, `status`) SELECT '" . date("Y-m-d H:i:s") . "', '" . date("Y-m-d H:i:s") . "',`shop_id`, `type`, `name`, `title`, `html`, `status`   FROM pages  WHERE shop_id='"  . $shop_id ."' AND id='" .$page_id. "'");
            $pres = $mysqli->query("SELECT id FROM pages ORDER BY id DESC LIMIT 1");
            $arr = $pres->fetch_array( MYSQLI_ASSOC );
            $latest_page_id=$arr['id'];
            $mysqli->query("INSERT INTO pages_meta (`page_id`, `meta_name`, `meta_value`) SELECT $latest_page_id , `meta_name`, `meta_value`  FROM pages_meta  WHERE  page_id='" . $page_id . "'");
        }
        echo $_REQUEST['redirect'];
    }

    function process_bulk_delete_page(){
        $shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];
        $bulk_action_page_id = $_REQUEST['bulk_action_page_id'];
        $bulk_action_page_id = json_decode($bulk_action_page_id);
        foreach($bulk_action_page_id as $page_id){
            global $mysqli;
            $mysqli->query("DELETE FROM pages WHERE shop_id='"  . $shop_id ."' AND id='" . $page_id . "'");
            $mysqli->query("DELETE FROM pages_meta WHERE  page_id='" . $page_id . "'");
        }
        echo $_REQUEST['redirect'];
    }

    function process_bulk_duplicate_funnel(){
        $shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];
        $bulk_action_funnel_id = $_REQUEST['bulk_action_funnel_id'];
        $bulk_action_funnel_id = json_decode($bulk_action_funnel_id);
        foreach($bulk_action_funnel_id as $funnel_id){
            global $mysqli;
            $mysqli->query("INSERT INTO funnels (`date`, `last_updated`, `shop_id`,`title`) SELECT '" . date("Y-m-d H:i:s") . "', '" . date("Y-m-d H:i:s") . "', `shop_id`, `title`  FROM funnels  WHERE shop_id='"  . $shop_id ."' AND id='" . $funnel_id . "'");
            $pres = $mysqli->query("SELECT id FROM funnels ORDER BY id DESC LIMIT 1");
            $arr = $pres->fetch_array( MYSQLI_ASSOC );
            $latest_funnel_id=$arr['id'];
            $mysqli->query("INSERT INTO funnels_meta (`funnel_id`, `meta_name`, `meta_value`) SELECT $latest_funnel_id , `meta_name`, `meta_value`  FROM funnels_meta  WHERE  funnel_id='" . $funnel_id . "'");
        }
        echo $_REQUEST['redirect'];
    }

    function process_bulk_delete_funnel(){
        $shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];
        $bulk_action_funnel_id = $_REQUEST['bulk_action_funnel_id'];
        $bulk_action_funnel_id = json_decode($bulk_action_funnel_id);
        $landing_page_product_array = get_shop_meta($shop_id,'landing_page_product_array');
        $landing_page_product_array = json_decode($landing_page_product_array);
        foreach($bulk_action_funnel_id as $funnel_id){
            global $mysqli;
            $mysqli->query("DELETE FROM funnels WHERE shop_id='"  . $shop_id."' AND id='" . $funnel_id. "'");
            $mysqli->query("DELETE FROM funnels_meta WHERE  funnel_id='" . $funnel_id . "'");
            for ($i = 0; $i < sizeof($landing_page_product_array); $i++) {
                if ($landing_page_product_array[$i]->funnel_id == $funnel_id) {
                    array_splice($landing_page_product_array, $i, 1);
                    $i--;
                }
            }
        }
        add_shop_meta($shop_id, 'landing_page_product_array', json_encode($landing_page_product_array));
        echo $_REQUEST['redirect'];
    }

     function process_export_page(){
        $shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];
        $page_id = $_REQUEST['page_id'];

        global $mysqli;
        $temp_arr = [];

        $pres = $mysqli->query("SELECT name,title,type,html FROM pages  WHERE  id='$page_id'");
        $page = $pres->fetch_array( MYSQLI_ASSOC );
        $temp_arr['page'] = $page;
        $pres = $mysqli->query("SELECT meta_name, meta_value FROM pages_meta  WHERE  page_id='$page_id'");
        while( $page_meta = $pres->fetch_array( MYSQLI_ASSOC ) ) {
            $temp_arr['page_meta'][] = $page_meta;
        }
        echo json_encode($temp_arr);
    }

    function process_bulk_export_page(){
        $shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];
        $bulk_action_page_id = $_REQUEST['bulk_action_page_id'];
        $bulk_action_page_id = json_decode($bulk_action_page_id);

        $res_arr = [];
        foreach($bulk_action_page_id as $page_id){
            global $mysqli;
            $temp_arr = [];

            $pres = $mysqli->query("SELECT name,title,type,html FROM pages  WHERE  id='$page_id'");
            $page = $pres->fetch_array( MYSQLI_ASSOC );
            $temp_arr['page'] = $page;

            $pres = $mysqli->query("SELECT meta_name, meta_value FROM pages_meta  WHERE  page_id='$page_id'");
            //$page_meta = $pres->fetch_array( MYSQLI_ASSOC );
            while( $page_meta = $pres->fetch_array( MYSQLI_ASSOC ) ) {
                $temp_arr['page_meta'][] = $page_meta;
            }
            $res_arr[] = $temp_arr;

        }
        echo json_encode($res_arr);
    }

    function process_logout() {
        $shop = $_SESSION[ SESSIONNAME ]['shop'];
        unset( $_SESSION[ SESSIONNAME ] );
        $i_am_admin = 'i_am_not_admin';
        //setcookie("i_am_admin", $i_am_admin);
        session_flash_cookie( SESSIONNAME );
        header('location:https://' . $shop.'/admin');
    }


    function process_find_products(){
        $title = str_replace("'","\'",$_REQUEST['title']);
        $page = $_REQUEST['page'];
        require_once 'includes/shopify.php';
        $sc = new ShopifyClient($_SESSION[ SESSIONNAME ]['shop'], $_SESSION[ SESSIONNAME ]['token'], SHOPIFY_API_KEY, SHOPIFY_SECRET);
        try {
            $pro = $sc->call('GET', '/admin/products.json?title='. urlencode($title) .'&limit=100&page='. $page . '&fields=id,title,handle' );
        } catch (Exception $e) {
        }
        echo json_encode($pro);
        echo $_REQUEST['option'];
    }

    function process_get_product_title(){
        require_once 'includes/shopify.php';
        $sc = new ShopifyClient($_SESSION[ SESSIONNAME ]['shop'], $_SESSION[ SESSIONNAME ]['token'], SHOPIFY_API_KEY, SHOPIFY_SECRET);
        $product_id = str_replace("'","\'",$_REQUEST['product_id']);
        try {
            $product_title = $sc->call('GET', '/admin/products/'.$product_id.'.json?fields=title,handle');
        } catch (Exception $e) {
        }
        echo json_encode($product_title);
    }

    function process_find_products_title_using_handle(){
       require_once 'includes/shopify.php';
       $sc = new ShopifyClient($_SESSION[ SESSIONNAME ]['shop'], $_SESSION[ SESSIONNAME ]['token'], SHOPIFY_API_KEY, SHOPIFY_SECRET);
     
	   $handle = str_replace("'","\'",$_REQUEST['handle']);
       try {
            $pro = $sc->call('GET', '/admin/products.json?handle='. $handle .'&limit=100&fields=title,handle' );
        } catch (Exception $e) {
        }
       //echo json_encode($pro);
       for($i=0;$i<count($pro);$i++){
           if($pro[$i]['handle'] == $handle){
               echo $pro[$i]['title'];
           }
       }
    }

    function process_intro_tour(){
        add_shop_meta($_REQUEST['shop_id'], 'intro_tour', $_REQUEST['intro_tour']);
    }

    // function get_new_product_json($html,$product_id){
    //     if ($product_id != "") {
    //         $html =json_decode($html);
    //         require_once 'includes/shopify.php';
    //         $sc = new ShopifyClient($_SESSION[ SESSIONNAME ]['shop'], $_SESSION[ SESSIONNAME ]['token'], SHOPIFY_API_KEY, SHOPIFY_SECRET);
    //         $shopify_product = $sc->call('GET', '/admin/products/'.$product_id.'.json');
    //         $div = array('tag' => 'div','endtag' => 1,'attributes' => array(),'content' => '','nodes'=> array());
    //         $select = array('tag' => 'select','endtag' => 1,'attributes' => array('class'=>'form-control','onchange'=>'change_variant(this)'),'content' => '','nodes'   => array());
    //         $select_option = array('tag' => 'option','endtag' => 1,'attributes' => array('value'=>''),'content' => '');
    //         $variant_div = $div;
    //         $variant_div['attributes']['class'] = "shopify_product_variants_div text-left";
    //         $variant_div['attributes']['style'] = "padding: 15px;";
    //         foreach ($shopify_product['options'] as $option) {
    //             $temp_select = $select;
    //              if(count($option['values']) > 1){
    //                 $label = array('tag' => 'label','endtag' => 1,'attributes' => array("style"=>"display: block;"),'content'   => $option['name']);
    //                 $temp_select['attributes']['class'] .= ' variant_'.str_replace(' ', '-', $option['name']);
    //              }else{
    //                 $label = array('tag' => 'label','endtag' => 1,'attributes' => array("class"=>"hidden","style"=>"display: block;"),'content' => $option['name']);
    //                 $temp_select['attributes']['class'] .= ' variant_'.str_replace(' ', '-', $option['name']).' hidden';
    //             }
    //             $temp_select['attributes']['onchange'] = 'change_product_variant(this);';
    //             $id_number++;
    //             $temp_select_option = $select_option;

    //             foreach ($option['values'] as $value) {
    //                 $temp_select_option['attributes']['value'] = $value;
    //                 $temp_select_option['content'] = $value;
    //                 $temp_select['nodes'][] = $temp_select_option;
    //             }
    //             $variant_div['nodes'][] = $label;
    //             $variant_div['nodes'][] = $temp_select;         
    //         }
    //         $quantity = '{"tag":"div","endtag":1,"attributes":{"style":"padding: 0px;"},"content":"","nodes":[{"tag":"label","endtag":1,"attributes":{"class":"","style":"display: block;"},"content":"Quantity"},{"tag":"select","endtag":1,"attributes":{"class":"form-control shopify_product_quantity","onchange":"shopify_change_product_quantity(this);"},"content":"","nodes":[{"tag":"option","endtag":1,"attributes":{"value":"1"},"content":"1"},{"tag":"option","endtag":1,"attributes":{"value":"2"},"content":"2"},{"tag":"option","endtag":1,"attributes":{"value":"3"},"content":"3"},{"tag":"option","endtag":1,"attributes":{"value":"4"},"content":"4"},{"tag":"option","endtag":1,"attributes":{"value":"5"},"content":"5"},{"tag":"option","endtag":1,"attributes":{"value":"6"},"content":"6"},{"tag":"option","endtag":1,"attributes":{"value":"7"},"content":"7"},{"tag":"option","endtag":1,"attributes":{"value":"8"},"content":"8"},{"tag":"option","endtag":1,"attributes":{"value":"9"},"content":"9"},{"tag":"option","endtag":1,"attributes":{"value":"10"},"content":"10"}]}]}';
            

    //         $temp_variant_msg = $div;
    //         $temp_variant_msg['content'] = '<span style="color:green; font-size:13px; margin-top: 10px; display: block;"  class="text-center"><i class="fa fa-shopping-basket" aria-hidden="true">&nbsp;</i> Product available. </span>';
    //         $temp_variant_msg['attributes']['class'] = 'variant_message';

    //         $add_to_cart_btn_with_variant = '{"tag":"div","endtag":1,"attributes":{"class":"text-center"},"content":"","nodes":[{"tag":"button","endtag":1,"attributes":{"type":"button","class":"btn btn-success btn-md btn-block","onclick":"shopify_add_to_cart(this,\'\');","style":"margin-top: 10px; white-space: normal;"},"content":"Yes! I Need This In My Life >>"}]}';
            
    //         $variant_div['nodes'][] = json_decode($quantity);
    //         $variant_div['nodes'][] = $temp_variant_msg;
    //         $variant_div['nodes'][] = json_decode($add_to_cart_btn_with_variant,true);

    //         $product_title = $shopify_product['title'];
    //         $product_desc = $shopify_product['body_html'];
    //         $imgage_src = $shopify_product['image']['src'];

    //         $html = update_with_latest_product_details($html,$variant_div,$product_title,$product_desc,$imgage_src);
    //         $html = json_encode($html);
    //     }
    //     return $html;
    // }

    function get_new_product_json($html,$product_id){
        if ($product_id != "") {
            $html =json_decode($html);
            require_once 'includes/shopify.php';
            $sc = new ShopifyClient($_SESSION[ SESSIONNAME ]['shop'], $_SESSION[ SESSIONNAME ]['token'], SHOPIFY_API_KEY, SHOPIFY_SECRET);
            $shopify_product = $sc->call('GET', '/admin/products/'.$product_id.'.json');
            $div = array('tag' => 'div','endtag' => 1,'attributes' => array(),'content' => '','nodes'=> array());
            $select = array('tag' => 'select','endtag' => 1,'attributes' => array('class'=>'form-control','onchange'=>'change_variant(this)'),'content' => '','nodes'   => array());
            $select_option = array('tag' => 'option','endtag' => 1,'attributes' => array('value'=>''),'content' => '');
            $variant_div = $div;
            $variant_div['attributes']['class'] = "shopify_product_new_variants_div text-left";
            $variant_div['attributes']['style'] = "padding: 15px;";
            foreach ($shopify_product['options'] as $option) {
                $temp_select = $select;
                 if(count($option['values']) > 1){
                    $label = array('tag' => 'label','endtag' => 1,'attributes' => array("style"=>"display: block;"),'content'   => $option['name']);
                    $temp_select['attributes']['class'] .= ' variant_'.str_replace(' ', '-', $option['name']);
                 }else{
                    $label = array('tag' => 'label','endtag' => 1,'attributes' => array("class"=>"hidden","style"=>"display: block;"),'content' => $option['name']);
                    $temp_select['attributes']['class'] .= ' variant_'.str_replace(' ', '-', $option['name']).' hidden';
                }
                $temp_select['attributes']['onchange'] = 'change_product_variant(this);';
                $id_number++;
                $temp_select_option = $select_option;

                foreach ($option['values'] as $value) {
                    $temp_select_option['attributes']['value'] = $value;
                    $temp_select_option['content'] = $value;
                    $temp_select['nodes'][] = $temp_select_option;
                }
                $variant_div['nodes'][] = $label;
                $variant_div['nodes'][] = $temp_select;         
            }
            

            
            $product_title = $shopify_product['title'];
            $product_desc = $shopify_product['body_html'];
            $imgage_src = $shopify_product['image']['src'];

            $html = update_with_latest_product_details($html,$variant_div,$product_title,$product_desc,$imgage_src);
            $html = json_encode($html);
        }
        return $html;
    }

    function update_with_latest_product_details($html_data,$new_variant_div,$product_title,$product_desc,$imgage_src){
        for($i=0;$i<count($html_data);$i++){
            if (strpos($html_data[$i]->attributes->class, 'shopify_product_variants_div') !== false) {
               
                $_SESSION['select_found'] = false;
                $_SESSION['label_found'] = false;
                $new_variant_div = change_only_variant_select_and_label($html_data[$i], $new_variant_div);
                $new_variant_div = json_encode($new_variant_div);
                $html_data[$i] = remove_label_and_select($html_data[$i]);

                $new_variant_div = json_decode($new_variant_div);



                for($k=count($new_variant_div->nodes)-1;$k>=0;$k--){
                    array_unshift($html_data[$i]->nodes,$new_variant_div->nodes[$k]);
                }
                
            }
            if (strpos($html_data[$i]->attributes->class, 'shopify_product_title') !== false) {
                $html_data[$i]->content = $product_title;
            }
            if (strpos($html_data[$i]->attributes->class, 'shopify_product_description') !== false) {
                $html_data[$i]->content = $product_desc;
            }
            if (strpos($html_data[$i]->attributes->class, 'primary_image_for_variant') !== false) {
                $html_data[$i]->attributes->src = $imgage_src;
            }
            if($html_data[$i]->endtag == 1){
                if(count($html_data[$i]->nodes)>0){
                    $html_data[$i]->nodes= update_with_latest_product_details($html_data[$i]->nodes,$new_variant_div,$product_title,$product_desc,$imgage_src);
                }
            }
        }

        return $html_data;
    }

    function change_only_variant_select_and_label($variant_div_data, $new_variant){
        for($i=0;$i<count($variant_div_data->nodes);$i++){
            if($variant_div_data->nodes[$i]->tag == "label" && strpos($variant_div_data->nodes[$i]->attributes->class, 'hidden') === false && $_SESSION['label_found'] == false){
                $_SESSION['label_found'] = true;
                $new_variant = json_encode($new_variant);
                $new_variant = json_decode($new_variant);
                $new_variant = change_only_variant_select_and_label_style($new_variant, array("class"=>$variant_div_data->nodes[$i]->attributes->class,"style"=>$variant_div_data->nodes[$i]->attributes->style), []);
            }
            if($variant_div_data->nodes[$i]->tag == "select" && $variant_div_data->nodes[$i]->attributes->onchange == "change_product_variant(this);" && strpos($variant_div_data->nodes[$i]->attributes->class, 'hidden') === false && $_SESSION['select_found'] == false){
                $_SESSION['select_found'] = true;
                $new_variant = json_encode($new_variant);
                $new_variant = json_decode($new_variant);
                $new_variant = change_only_variant_select_and_label_style($new_variant,[], array("class"=>$variant_div_data->nodes[$i]->attributes->class,"style"=>$variant_div_data->nodes[$i]->attributes->style));
            }
            if($variant_div_data->nodes[$i]->tag == 'div' && ($_SESSION['select_found'] == false || $_SESSION['label_found'] == false)){
                $new_variant = change_only_variant_select_and_label($variant_div_data->nodes[$i], $new_variant);
            }
        }
        return $new_variant;
    }


    function change_only_variant_select_and_label_style($new_variant, $label_style, $select_style){
        for($i=0;$i<count($new_variant->nodes);$i++){

            if($new_variant->nodes[$i]->tag == "label" && strpos($new_variant->nodes[$i]->attributes->class, 'hidden') === false){
                if(count($label_style) > 0){
                    if($label_style['class'] != NULL){
                        $a = $label_style['class'];
                        $a = explode(" " , $a);
                        $b = "";
                        foreach ($a as $key => $value) {
                            if(strpos($value, 'variant') !== false){

                            }else{
                                $b .= " ".$value." ";
                            }
                            
                        }
                        $b = implode(' ', array_unique(explode(' ', $b)));
                        $new_variant->nodes[$i]->attributes->class .= $b;
                        $new_variant->nodes[$i]->attributes->class = implode(' ', array_unique(explode(' ', $new_variant->nodes[$i]->attributes->class)));
                    }
                    if($label_style['style'] != NULL){
                        $new_variant->nodes[$i]->attributes->style = $label_style['style'];
                    }
                }
            }
            if($new_variant->nodes[$i]->tag == "select" && $new_variant->nodes[$i]->attributes->onchange == "change_product_variant(this);"){

                if(count($select_style) > 0){
                    if($select_style['class'] != NULL){
                        $a = $select_style['class'];
                        $a = explode(" " , $a);
                        $b = "";
                        foreach ($a as $key => $value) {
                            if(strpos($value, 'variant') !== false){

                            }else{
                                $b .= " ".$value." ";
                            }
                        }
                        $new_variant->nodes[$i]->attributes->class .= $b;

                        $new_variant->nodes[$i]->attributes->class = implode(' ', array_unique(explode(' ', $new_variant->nodes[$i]->attributes->class)));
                    }
                    if($select_style['style'] != NULL){
                        $new_variant->nodes[$i]->attributes->style = $select_style['style'];

                    }
                }
                
            }
            
            if($new_variant->nodes[$i]->tag == 'div'){
                $new_variant->nodes[$i] = change_only_variant_select_and_label_style($new_variant->nodes[$i],$label_style,$select_style);
            }

        }


        return $new_variant;
    }

    function remove_label_and_select($old){
        for($i=0;$i<count($old->nodes);$i++){
            if($old->nodes[$i]->tag == "label" && $old->nodes[$i]->content != 'Quantity'){
                array_splice($old->nodes,$i,1);
                $i--;
            }
            if($old->nodes[$i]->tag == "select" && $old->nodes[$i]->attributes->onchange == "change_product_variant(this);"){
                array_splice($old->nodes,$i,1);
                $i--;
            }
            if($old->nodes[$i]->tag == 'div'){
                $old->nodes[$i] = remove_label_and_select($old->nodes[$i]);
            }
        }
        return $old;
    }

    function process_gen_fb2_completed_sidebar(){
        global $mysqli;
        $shop_id = $_SESSION[SESSIONNAME]['shop_id'];
        $total_percentage = 10;
        $status_array = array('step1'=>true,'step2'=>false,'step3'=>false,'step4'=>false,'step5'=>false,'step6'=>false);
        $step2 = get_shop_meta($shop_id,"google_analytics_id");
        if($step2 !== false){
            $total_percentage += 20;
            $status_array['step2'] = true;
        }else{
        }

        $step3 = get_shop_meta($shop_id, 'credit_card_processor');
        if($step2 !== false){
             $total_percentage += 20;
             $status_array['step3'] = true;
        }else{
        }

        $pres = $mysqli->query("SELECT id FROM pages WHERE shop_id=$shop_id LIMIT 1");
        if( $pres->num_rows > 0 ) {
             $total_percentage += 20;
             $status_array['step4'] = true;
        }

        $pres = $mysqli->query("SELECT id FROM funnels WHERE shop_id=$shop_id LIMIT 1");
        if( $pres->num_rows > 0 ) {
             $total_percentage += 20;
             $status_array['step5'] = true;
        }

        $step6 = get_shop_meta($shop_id, 'user_rating');
        if($step6 !== false){
             $total_percentage += 10;
             $status_array['step6'] = true;
        }else{
        }
?>
            <section>
              <div class="container-fluid">
                <div class="row">
                  <div class="col-md-12">
                    <div class="wrapper_container">
                      <div class="main_wrapper" id="main_wrapper">
                        <div class="done_count_div">
                          <ul style="cursor: pointer;" onclick="show_hide_side_bar();">
                            <li> <span><?php echo $total_percentage; ?>%</span> DONE</li>
                          </ul>
                        </div>
                        <div class="complete_msg_div">
                          <div id="accordion">
                            <div class="top_card card">
                             <div class="card-header">
                               <h5 class="mb-0">
                                   <div class="card_header_wrapper">
                                     <div class="card_header_left">
                                       <i class="fa fa-server"></i>
                                     </div>
                                     <div class="card_header_title_top">
                                       <h5>Complete your profile</h5>
                                       <div class="progress" style="height:20px">
                                         <div class="progress-bar" style="width:<?php echo $total_percentage; ?>%;height:20px"><?php echo $total_percentage; ?>%</div>
                                       </div>
                                     </div>
                                     <div class="card_header_right">
                                       <span class="percen"><?php echo $total_percentage; ?>%</span>
                                       <span>complete</span>
                                     </div>
                                   </div>
                               </h5>
                             </div>
                            </div>
                            <div style="position: absolute; overflow-y: auto; height: 100%; padding-bottom: 100px;">
                                <div class="card">
                                  <div class="card-header" id="headingOne">
                                    <h5 class="mb-0" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        <div class="card_header_wrapper">
                                          <div class="card_header_fa">
                                            <i class="fa fa-check-circle <?php echo ($status_array['step1']==true)?'' : 'not_done_yet' ;?>" aria-hidden="true"></i>
                                          </div>
                                          <div class="card_header_title">
                                            <h5>Register with Funnel Buildr 2.0</h5>
                                            <p>You have made a great choice for your business. Now let’s make it big</p>
                                          </div>
                                          <div class="card_header_right_fa">
                                            <i class="fa fa-registered" aria-hidden="true"></i>
                                          </div>
                                        </div>
                                    </h5>
                                  </div>

                                  <div id="collapseOne" class="collapse <?php echo ($status_array['step1']==true)?'' : 'in';?>" aria-labelledby="headingOne" data-parent="#accordion">
                                    <div class="card-body">
                                      <div class="card_body_section">
                                        <div class="card_body_col_wrapper">
                                            <div class="card_body_col">
                                                <div class="card_body_img">
                                                    <img src="https://d67lzadkyx0.cloudfront.net/files/uploads/5b029001ea786uploaded_11.png">
                                                </div>

                                            </div>
                                            <div class="card_body_fa">
                                                <img src="https://d67lzadkyx0.cloudfront.net/files/uploads/5b028f83aa8aduploaded_13.png" width="30">
                                            </div>
                                            <div class="card_body_col">
                                                <div class="card_body_img">
                                                    <img src="https://d67lzadkyx0.cloudfront.net/files/uploads/5b029010ace91uploaded_79.png">
                                                </div>
                                            </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="card">
                                  <div class="card-header" id="headingTwo">
                                    <h5 class="mb-0" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                        <div class="card_header_wrapper">
                                          <div class="card_header_fa">
                                            <i class="fa fa-check-circle <?php echo ($status_array['step2']==true)?'' : 'not_done_yet' ;?>" aria-hidden="true"></i>
                                          </div>
                                          <div class="card_header_title">
                                            <h5>Complete FB2 general settings</h5>
                                            <p>Setup your google analytics id, facebook pixel and email marketing service to supercharge your funnel buildr pages.</p>
                                          </div>
                                          <div class="card_header_right_fa">
                                            <i class="fa fa-cog" aria-hidden="true"></i>
                                          </div>
                                        </div>
                                    </h5>
                                  </div>

                                  <div id="collapseTwo" class="collapse <?php echo ($status_array['step2']==true)?'' : 'in';?>" aria-labelledby="headingTwo" data-parent="#accordion">
                                    <div class="card-body">
                                      <div class="card_body_section">
                                        <div class="card_body_col_wrapper">
                                            <div class="card_body_col">
                                                <div class="card_body_img">
                                                    <img src="https://d67lzadkyx0.cloudfront.net/files/uploads/5b0290297bd36uploaded_94.png">
                                                </div>

                                            </div>
                                            <div class="card_body_fa">
                                                <img src="https://d67lzadkyx0.cloudfront.net/files/uploads/5b028f83aa8aduploaded_13.png" width="30">
                                            </div>
                                            <div class="card_body_col">
                                                <div class="card_body_img">
                                                    <img src="https://d67lzadkyx0.cloudfront.net/files/uploads/5b0290447c69auploaded_12.png">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card_body_footer">
                                            <a class="a_class btn" href="<?php echo BASE; ?>/settings">Let's configure your general settings</a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="card">
                                  <div class="card-header" id="headingThree">
                                    <h5 class="mb-0" data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                                        <div class="card_header_wrapper">
                                          <div class="card_header_fa">
                                            <i class="fa fa-check-circle <?php echo ($status_array['step3']==true)?'' : 'not_done_yet' ;?>" aria-hidden="true"></i>
                                          </div>
                                          <div class="card_header_title">
                                            <h5>Complete your checkout settings</h5>
                                            <p>Setup your checkout preferences; payment processors, cart bump offers and let’s start selling right away.</p>
                                          </div>
                                          <div class="card_header_right_fa">
                                            <i class="fa fa-credit-card" aria-hidden="true"></i>
                                          </div>
                                        </div>
                                    </h5>
                                  </div>

                                  <div id="collapseThree" class="collapse <?php echo ($status_array['step3']==true)?'' : 'in';?>" aria-labelledby="headingThree" data-parent="#accordion">
                                    <div class="card-body">
                                      <div class="card_body_section">
                                        <div class="card_body_col_wrapper">
                                            <div class="card_body_col">
                                                <div class="card_body_img">
                                                    <img src="https://d67lzadkyx0.cloudfront.net/files/uploads/5b0290650d8bfuploaded_60.png">
                                                </div>

                                            </div>
                                            <div class="card_body_fa">
                                                <img src="https://d67lzadkyx0.cloudfront.net/files/uploads/5b028f83aa8aduploaded_13.png" width="30">
                                            </div>
                                            <div class="card_body_col">
                                                <div class="card_body_img">
                                                    <img src="https://d67lzadkyx0.cloudfront.net/files/uploads/5b02907b22674uploaded_6.png">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card_body_footer">
                                            <a class="a_class btn" href="<?php echo BASE; ?>/checkout_settings">Let's complete your checkout settings</a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="card">
                                  <div class="card-header" id="headingFour">
                                    <h5 class="mb-0" data-toggle="collapse" data-target="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
                                        <div class="card_header_wrapper">
                                          <div class="card_header_fa">
                                            <i class="fa fa-check-circle <?php echo ($status_array['step4']==true)?'' : 'not_done_yet' ;?>" aria-hidden="true"></i>
                                          </div>
                                          <div class="card_header_title">
                                            <h5>Design your first product page</h5>
                                            <p>With Funnel buildr page editor, it literally takes 3 minutes to design your first kickass product page. Let’s try it now.</p>
                                          </div>
                                          <div class="card_header_right_fa">
                                            <i class="fa fa-clone" aria-hidden="true"></i>
                                          </div>
                                        </div>
                                    </h5>
                                  </div>

                                  <div id="collapseFour" class="collapse <?php echo ($status_array['step4']==true)?'' : 'in';?>" aria-labelledby="headingFour" data-parent="#accordion">
                                    <div class="card-body">
                                      <div class="card_body_section">
                                        <div class="card_body_col_wrapper">
                                            <div class="card_body_col">
                                                <div class="card_body_img">
                                                    <img src="https://d67lzadkyx0.cloudfront.net/files/uploads/5b02908fcf5deuploaded_77.png">
                                                </div>

                                            </div>
                                            <div class="card_body_fa">
                                                <img src="https://d67lzadkyx0.cloudfront.net/files/uploads/5b028f83aa8aduploaded_13.png" width="30">
                                            </div>
                                            <div class="card_body_col">
                                                <div class="card_body_img">
                                                    <img src="https://d67lzadkyx0.cloudfront.net/files/uploads/5b0290a31e7a7uploaded_45.png">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card_body_footer">
                                            <a class="a_class btn" href="<?php echo BASE; ?>/pages">Let's create your first page</a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div class="card">
                                  <div class="card-header" id="headingFive">
                                    <h5 class="mb-0" data-toggle="collapse" data-target="#collapseFive" aria-expanded="true" aria-controls="collapseFive">
                                        <div class="card_header_wrapper">
                                          <div class="card_header_fa">
                                            <i class="fa fa-check-circle <?php echo ($status_array['step5']==true)?'' : 'not_done_yet' ;?>" aria-hidden="true"></i>
                                          </div>
                                          <div class="card_header_title">
                                            <h5>Create your first funnel</h5>
                                            <p>Don’t keep your customer waiting. Create and launch your first funnel campaign.</p>
                                          </div>
                                          <div class="card_header_right_fa">
                                            <i class="fa fa-sitemap" aria-hidden="true"></i>
                                          </div>
                                        </div>
                                    </h5>
                                  </div>

                                  <div id="collapseFive" class="collapse <?php echo ($status_array['step5']==true)?'' : 'in';?>" aria-labelledby="headingFive" data-parent="#accordion">
                                    <div class="card-body">
                                      <div class="card_body_section">
                                        <div class="card_body_col_wrapper">
                                            <div class="card_body_col">
                                                <div class="card_body_img">
                                                    <img src="https://d67lzadkyx0.cloudfront.net/files/uploads/5b0290b82522cuploaded_91.png">
                                                </div>

                                            </div>
                                            <div class="card_body_fa">
                                                <img src="https://d67lzadkyx0.cloudfront.net/files/uploads/5b028f83aa8aduploaded_13.png" width="30">
                                            </div>
                                            <div class="card_body_col">
                                                <div class="card_body_img">
                                                    <img src="https://d67lzadkyx0.cloudfront.net/files/uploads/5b0290cac9754uploaded_75.png">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card_body_footer">
                                            <a class="a_class btn" href="<?php echo BASE; ?>/all_funnels">Let's create your first funnel</a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div class="card">
                                  <div class="card-header" id="headingSix">
                                    <h5 class="mb-0" data-toggle="collapse" data-target="#collapseSix" aria-expanded="true" aria-controls="collapseSix">
                                        <div class="card_header_wrapper">
                                          <div class="card_header_fa">
                                            <i class="fa fa-check-circle <?php echo ($status_array['step6']==true)?'' : 'not_done_yet' ;?>" aria-hidden="true"></i>
                                          </div>
                                          <div class="card_header_title">
                                            <h5>Tell us, how much you love us</h5>
                                            <p>We are your friends at Ecomisoft. Tell us how much you love us and what else we can do to make you happier.</p>
                                          </div>
                                          <div class="card_header_right_fa">
                                            <i class="fa fa-star" aria-hidden="true"></i>
                                          </div>
                                        </div>
                                    </h5>
                                  </div>

                                  <div id="collapseSix" class="collapse <?php echo ($status_array['step6']==true)?'' : 'in';?>" aria-labelledby="headingSix" data-parent="#accordion">
                                    <div class="card-body">
                                        <div class="card_body_col_wrapper">
                                            <div class="card_body_col">
                                                <div class="card_body_img">
                                                    <img src="https://d67lzadkyx0.cloudfront.net/files/uploads/5b0290f4bc35cuploaded_31.png">
                                                </div>

                                            </div>
                                            <div class="card_body_fa">
                                                <img src="https://d67lzadkyx0.cloudfront.net/files/uploads/5b028f83aa8aduploaded_13.png" width="30">
                                            </div>
                                            <div class="card_body_col">
                                                <div class="card_body_img">
                                                    <img src="https://d67lzadkyx0.cloudfront.net/files/uploads/5b029107005feuploaded_57.png">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card_body_footer">
                                            
                                            <a class="a_class btn" href="<?php echo BASE; ?>/feedback">Give us a feedback</a>
                                        </div>
                                    </div>
                                  </div>
                                </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
<?php
    }
?>
