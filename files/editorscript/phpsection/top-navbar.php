<?php
  form_processor();
?>
<!------------- Navbar -------------->
<nav class="navbar-inverse bs-dark shadow" id ="top-navbar" style="top: 0; position: fixed; border-radius:0px; width:100%; display: none;">
        <div class="navbar-div" style="width:100%;">
          <ul class="nav navbar-nav"  style="padding:12px 0px ;position:relative;left:12%;right:12%;bottom:50%;width:100%;">
           <li class="dropdown">
              <a href="<?php echo BASE ?>/home" role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-sign-out"></i> Exit</a>
           </li>
           <li class="dropdown"  >
            <a href="Javascript:void(0);" class="dropdown-toggle"  role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-cogs"></i><span class="dropdown-title"> Settings</span><span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li style="display: none;"><a onclick="Javascript: $('#current_editable_element_id').val('div_editorpreview');show_my_panel_for_settings('div_editorpreview');"><i class="fa fa-paint-brush"></i> Body settings</a></li>
              <li role="separator" class="divider" style="display: none;"></li>
              <li style="display: none;"><a onclick="Javascript:void(0);" data-toggle="modal" data-target="#app_settings_Modal"><i class="fa fa-wrench"></i> App settings</a></li>
              <li><a onclick="Javascript:void(0);" data-toggle="modal" data-target="#bundleModal"><i class="fa fa-shopping-basket"></i> Bundle products</a></li>
              <li role="separator" class="divider"></li>
              <li><a onclick="Javascript:void(0);" data-toggle="modal" data-target="#auto_add_product_Modal"><i class="fa fa-cart-plus"></i> Auto add products</a></li>
               <li><a onclick="Javascript:void(0);" data-toggle="modal" data-target="#customScriptModal"><i class="fa fa-code" aria-hidden="true"></i> Custom script</a></li>
               <li><a onclick="Javascript:void(0);" data-toggle="modal" data-target="#customBodyScriptModal"><i class="fa fa-code" aria-hidden="true"></i> Custom body script</a></li>
               <li><a onclick="Javascript:void(0);" data-toggle="modal" data-target="#customCssModal"><i class="fa fa-css3" aria-hidden="true"></i> Custom css</a></li>
               <li><a onclick="Javascript:void(0);" data-toggle="modal" data-target="#seo_settings"><i class="fa fa-search-plus"></i> SEO settings</a></li>
               <li><a onclick="select_page_mailer('<?php echo $page_id ?>')" data-toggle="modal" data-target="#opt_in_settings"><i class="fa fa-wpforms"></i> Opt-in settings</a></li>
              </ul>
            </li>
            
            <li class="dropdown">
              <a href="#" onclick="javascript: $('#pop_up_settings').modal('show'); get_all_bootstrap_modal(); return false;" data-toggle="modal" data-target="#pop_up_settings" class="dropdown-toggle" role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-external-link"></i><span class="dropdown-title">  Show pop-up </span></a>
            </li>
            
            <li class="dropdown">
              <a href="Javascript:void(0);"  class="dropdown-toggle"  role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-cube"></i><span class="dropdown-title">  Edit</span> <span class="caret"></span></a>
             <ul class="dropdown-menu">
               <li><a href="Javascript:void(0);" onclick="undo_json_change();"><i class="fa fa-undo" aria-hidden="true"></i>  Undo</a></li>
               <li role="separator" class="divider"></li>
               <li><a href="Javascript:void(0);" onclick="redo_json_change();"><i class="fa fa-repeat" aria-hidden="true"></i>  Redo</a></li>
              </ul>
            </li>
            
            <li class="dropdown">
              <a href="Javascript:void(0);" class="dropdown-toggle"  role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-bars"></i><span class="dropdown-title">  Rows</span> <span class="caret"></span></a>
          <ul class="dropdown-menu">
          <li onclick="add_rows()"><a href="Javascript:void(0);"><i class="fa fa-plus"></i>  Add row</a></li>
          </ul>
            </li>

            <li class="dropdown" >
              <a href="Javascript:void(0);"  class="dropdown-toggle" role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-plug"></i><span class="dropdown-title">  Elements </span><span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li onclick="open_all_element()"><a href="Javascript:void(0);"><i class="fa fa-plus"></i>  Add elements</a></li>
              </ul>
            </li>
            <li class="dropdown">
              <a id="show_hide_control" onclick="show_hide_control();" role="button"><i class="fa fa-eye-slash" aria-hidden="true"></i><span class="dropdown-title">  Hide control</span></a>
            </li>
            
            <li class="dropdown">
              <a target="_blank" href="<?php echo $full_shop_url . SHOPIFY_PROXY_PREFIX .'/p/' . $page_id . '/' .get_page_meta($page_id,'product_handle'); ?>" class="dropdown-toggle" role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-desktop"></i><span class="dropdown-title">  Preview</span></span></a>
            </li>
             <li class="dropdown"  onclick="save_my_settings('undo_redo');">
              <a href="Javascript:void(0);" class="dropdown-toggle"  role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-save"></i><span class="dropdown-title save_my_settings">  Save</span></span></a>
            </li>     
            
          </ul>
   
        </div>
</nav>
    <!----------- !Navbar End ------------>


<!------------- Navbar -------------->
<nav class="navbar navbar-inverse bs-dark" id ="top-navbar-page_preview" style="top: 0; position: fixed; border-radius:0px;width:100%; display: none;">
        <div class="navbar-div"  style="margin:0px 15px 0px 15px;">
          <ul class="nav navbar-nav"  style="padding:10px 0px 10px 0px;">
            <li class="dropdown"  onclick="show_editor()">
              <a href="Javascript:void(0);"  class="dropdown-toggle" role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-reply"></i><span class="dropdown-title" onclick="close_all_option();">  Back to editor</span></span></a>
            </li>
            <li class="dropdown" style="display: none;">
              <a href="Javascript:void(0);"  class="dropdown-toggle"  role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-desktop"></i><i class="fa fa-mobile"></i><span class="dropdown-title">  Resolutions</span> <span class="caret"></span></a>
             <ul class="dropdown-menu">
                <li><a href="Javascript:void(0);" onclick="show_desktop_view();"> This device</a></li>
               <li><a href="Javascript:void(0);" onclick="show_this_resolution(1280,950);"><i class="fa fa-desktop"></i>  1280 X 950</a></li>
               <li role="separator" class="divider"></li>
               <li><a href="Javascript:void(0);" onclick="show_this_resolution(360,640);"><i class="fa fa-mobile"></i> 360 X 640</a></li>
               <li><a href="Javascript:void(0);" onclick="show_this_resolution(412,732);"><i class="fa fa-mobile"></i> 412 X 732</a></li>
               <li><a href="Javascript:void(0);" onclick="show_this_resolution(320,568);"><i class="fa fa-mobile"></i> 320 X 568</a></li>
               <li><a href="Javascript:void(0);" onclick="show_this_resolution(375,667);"><i class="fa fa-mobile"></i> 375 X 667</a></li>
               <li><a href="Javascript:void(0);" onclick="show_this_resolution(414,736);"><i class="fa fa-mobile"></i> 414 X 736</a></li>
               <li><a href="Javascript:void(0);" onclick="show_this_resolution(768,1024);"><i class="fa fa-mobile"></i> 768 X 1024</a></li>
               <li><a href="Javascript:void(0);" onclick="show_this_resolution(1024,1367);"><i class="fa fa-mobile"></i> 1024 X 1367</a></li>
               <li><a href="Javascript:void(0);" onclick="show_this_resolution(1280,800);"><i class="fa fa-mobile"></i> 1280 X 800</a></li>
               <li><a href="Javascript:void(0);" onclick="show_this_resolution(1024,768);"><i class="fa fa-mobile"></i> 1024 X 768</a></li>
              </ul>
            </li>

            <li class="dropdown" style="display: none;">
              <a href="Javascript:void(0);" class="dropdown-toggle" role="button" aria-haspopup="true" aria-expanded="false" onclick="save_as_html();"><i class="fa fa-columns"></i><span class="dropdown-title"> Save as HTML</span></span></a>
            </li>

            <li class="dropdown" style="display: _none;">
              <a target="_blank" href="<?php echo BASE.'/preview/?page='.$page_id; ?>" class="dropdown-toggle" role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-window-restore" aria-hidden="true"></i><span class="dropdown-title"> Open in new tab</span></span></a>
            </li>      
            
          </ul>
   
        </div>
</nav>


  <?php 
  // include_once("includes/shopify.php");
  // $sc = new ShopifyClient($_SESSION[ SESSIONNAME ]['shop'], $_SESSION[ SESSIONNAME ]['token'], SHOPIFY_API_KEY, SHOPIFY_SECRET);
  // if( !isset( $_SESSION[ SESSIONNAME ]['products'] ) ) {
  //       //Get all the products of the shop
  //       $all_loaded = false;
  //       $page = 0;
  //       $per_page = 250;
  //       while( !$all_loaded ) {
  //           //check if the store is not a test shop
  //           $products = $sc->call('GET', '/admin/products.json?fields=id,title,handle,variants,&page=' . $page . '&limit=' . $per_page );
  //           foreach( $products as $product ) {
  //               $all_products[] = $product;
  //           }
  //           if( count( $products ) < $per_page ) $all_loaded = true;
  //           $page++;
  //       }
  //       $_SESSION[ SESSIONNAME ]['products'] = $all_products;
  //   }
  ?>

<!--
MODAL START 
-->

<div class="modal fade" id="bundleModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="margin-top:70px;">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="bundleModalLabel">Select bundle prooducts</h4>
            </div>
            <div class="modal-body">
              <div style="margin-bottom: 10px;" id="div_id_product" class="form-group required" >
                <div class="col-xs-12 product_selected_div" style="margin-bottom: 20px;padding-left: 0;padding-right: 0;">
                    <div class="input-group" style="margin-bottom: 0px !important;">
                        <input type="text" class="form-control" id="search_text" placeholder="Search product, example: shirt">
                        <input type="text" name="page_number_for_products" id="page_number_for_products" value="1" hidden>
                        <div class="input-group-addon"  style="cursor: pointer;" onclick="find_products()" > Search </div>
                    </div>
                    <div class="text-center" id="search_result"  style="display:none;position: absolute;top:34px; width: 88%; z-index: 100000;"></div>
                </div>
            </div>
                <form>
                    <div class="form-group">
                        <input type="text" name="select_product_from_bundle" id="select_product_from_bundle" hidden>
                    </div>
                    <div id="variant_options"></div>
                    <div id="variant_message"></div>
                    <input type="" id="info_1" value="" hidden>
                    <textarea id="hidden_varient_options" hidden></textarea>
                    <textarea id="hidden_varient_options_name" hidden></textarea>
                    <textarea id="hidden_all_bundle_product" hidden><?php
                        echo get_page_meta($page_id,'bundle_products');
                    ?></textarea>
                    <button type="button" class="btn btn-primary" id="add_bundle_product_btn" onclick="add_bundle_product();" style="display: none;">Add product</button>
                </form>
                <br>
                <?php
                    $info = get_page_meta($page_id,'bundle_products');
                    $infos = json_decode($info);
                ?>
                <div id="product_table_alternative_div" style="<?php echo (sizeof($infos) == 0 ? 'display:block;' : 'display:none;'); ?>">No product added</div>
                <div class="table-responsive"  id="product_table_div" style="<?php echo (sizeof($infos) > 0 ? 'display:inline;margin-top: 10px;' : 'display:none;'); ?>">
                    <table class="table" id="bundle_product_table" style="width: 100%;">
                        <thead style="background: rgba(52,73,94,.94);color: #ECF0F1 ;">
                            <tr>
                                <th class="col-sm-2">Image</th>
                                <th class="col-sm-4">Product</th>
                                <th class="col-sm-3 bundle_table_td_variant">Variant</th>
                                <th class="col-sm-3 bundle_table_td_option">Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                                $i = 1;
                                foreach ($infos as $info) {
                                    $img_url = $info[4][0];
                                    $img_url = str_replace('.png','_thumb.png',$img_url);
                                    $img_url = str_replace('.jpg','_thumb.jpg',$img_url);
                                    $img_url = str_replace('.jpeg','_thumb.jpeg',$img_url);
                                    $img_url = str_replace('.gif','_thumb.gif',$img_url);
                                    echo '<tr id="bundle_product_row'.$i.'">';
                                        echo '<td class="bundle_table_product_image"  id="bundle_product_product_image'.$i.'"><img style="height:20px;" src="'.$img_url.'"></td>';
                                        echo '<td class="bundle_table_product"  id="bundle_product_productname'.$i.'">'.$info[2].'</td>';
                                        echo '<td class="bundle_table_td_variant"  id="bunble_product_productvariant'.$i.'">'.$info[3].'</td>';
                                        echo '<td class ="bundle_table_td_option"><a href="#" onclick="delete_bundle_product('.$i.');"><span class="label label-danger">Delete</span></a></td>';
                                    echo '</tr>';
                                    $i++;
                                }
                            ?>
                        </tbody>
                    </table>
                </div>
                <div id="added_bundle_products" hidden>
        <?php
          $info = get_page_meta($page_id,'bundle_products');
          $infos = json_decode($info);
          foreach ($infos as $info) {
            echo $info[2] . '-' . $info[3]. '<br>';
          }
        ?>
                </div>
                  
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="final_save_bundle_product();">Save changes</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="auto_add_product_Modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="margin-top:70px;">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="auto_add_product_ModalLabel">Select auto add prooducts</h4>
            </div>
            <div class="modal-body">
              <div style="margin-bottom: 10px;" id="div_id_product" class="form-group required" >
                <div class="col-xs-12 product_selected_div" style="margin-bottom: 20px;padding-left: 0;padding-right: 0;">
                    <div class="input-group" style="margin-bottom: 0px !important;">
                        <?php
                            $auto_add_clear_cart = get_page_meta($page_id,'auto_add_clear_cart');
                        ?>
                        <div class="checkbox">
                            <label><input id="auto_add_clear_cart" type="checkbox" <?php echo ($auto_add_clear_cart == 'true' ? 'checked' : ''); ?>>Clear cart before add products to the cart</label>
                        </div>
                    </div>
                    <div class="input-group" style="margin-bottom: 0px !important;">
                        <input type="text" class="form-control" id="auto_add_search_text" placeholder="Search product, example: shirt">
                        <input type="text" name="auto_add_page_number_for_products" id="auto_add_page_number_for_products" value="1" hidden>
                        <div class="input-group-addon"  style="cursor: pointer;" onclick="auto_add_find_products()" > Search </div>
                    </div>
                    <div class="text-center" id="auto_add_search_result"  style="display:none;position: absolute;top:34px; width: 88%; z-index: 100000;"></div>
                </div>
              </div>
                <form>
                    <div class="form-group">
                        <input type="text" name="auto_add_select_product_from_bundle" id="auto_add_select_product_from_bundle" hidden>
                    </div>
                    <div id="auto_add_variant_options"></div>
                    <div id="auto_add_variant_message"></div>
                    <input type="" id="auto_add_info_1" value="" hidden>
                    <textarea id="auto_add_hidden_varient_options" hidden></textarea>
                    <textarea id="auto_add_hidden_varient_options_name" hidden></textarea>
                    <textarea id="hidden_all_auto_add_product" hidden><?php
                        echo get_page_meta($page_id,'auto_add_products');
                    ?></textarea>
                    <button type="button" class="btn btn-primary" id="auto_add_product_btn" onclick="auto_add_product();" style="display: none;">Add product</button>
                </form>
                <br>
                <?php
                    $info = get_page_meta($page_id,'auto_add_products');
                    $infos = json_decode($info);
                ?>
                <div id="auto_add_product_table_alternative_div" style="<?php echo (sizeof($infos) == 0 ? 'display:block;' : 'display:none;'); ?>">No product added</div>
                <div class="table-responsive"  id="auto_add_product_table_div" style="<?php echo (sizeof($infos) > 0 ? 'display:inline;margin-top: 10px;' : 'display:none;'); ?>">
                    <table class="table" id="auto_add_product_table" style="width: 100%;">
                        <thead style="background: rgba(52,73,94,.94);color: #ECF0F1 ;">
                            <tr>
                                <th class="col-sm-2">Image</th>
                                <th class="col-sm-4">Product</th>
                                <th class="col-sm-3 auto_add_table_td_variant">Variant</th>
                                <th class="col-sm-3 auto_add_table_td_option">Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                                $i = 1;
                                foreach ($infos as $info) {
                                    $img_url = $info[4][0];
                                    $img_url = str_replace('.png','_thumb.png',$img_url);
                                    $img_url = str_replace('.jpg','_thumb.jpg',$img_url);
                                    $img_url = str_replace('.jpeg','_thumb.jpeg',$img_url);
                                    $img_url = str_replace('.gif','_thumb.gif',$img_url);
                                    echo '<tr id="auto_add_product_row'.$i.'">';
                                        echo '<td class="auto_add_table_product_image"  id="auto_add_product_product_image'.$i.'"><img style="height:20px;" src="'.$img_url.'"></td>';
                                        echo '<td class="auto_add_table_product"  id="auto_add_product_productname'.$i.'">'.$info[2].'</td>';
                                        echo '<td class="auto_add_table_td_variant"  id="auto_add_product_productvariant'.$i.'">'.$info[3].'</td>';
                                        echo '<td class ="auto_add_table_td_option"><a href="#" onclick="delete_auto_add_product('.$i.');"><span class="label label-danger">Delete</span></a></td>';
                                    echo '</tr>';
                                    $i++;
                                }
                            ?>
                        </tbody>
                    </table>
                </div>
                <div id="added_auto_add_products" hidden>
        <?php
          $info = get_page_meta($page_id,'auto_add_products');
          $infos = json_decode($info);
          foreach ($infos as $info) {
            echo $info[2] . '-' . $info[3]. '<br>';
          }
        ?>
                </div>
                  
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="final_save_auto_add_product();">Save changes</button>
            </div>
        </div>
    </div>
</div>

<!--
MODAL FOR  CUSTOM SCRIPT
-->
<?php  
    if( isset( $_SESSION[ SESSIONNAME ]['shop_id'] ) ) {
    global $mysqli;
    $shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];
    $page_id = $_REQUEST['page'];
    $pres = $mysqli->query("SELECT * FROM pages_meta WHERE page_id = $page_id");
    
    $pages_meta_array = $pres->fetch_all( MYSQLI_ASSOC );
    foreach (  $pages_meta_array as $array) {
      if ($array['meta_name']== 'custom_script'){
          $custom_script= $array['meta_value'];
      }
    }

    $custom_css = get_page_meta($page_id,"custom_css");
    $custom_body_script = get_page_meta($page_id,"custom_body_script");
  }

?>

<div class="modal fade" id="customScriptModal" tabindex="-1" role="dialog" aria-labelledby="customScriptModalLabel" style="margin-top:70px;">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="customScriptModalLabel">Custom script</h4>
            </div>
            <div class="modal-body" style="min-height: 267px;">
                <p>Add custom script</p>
                <form id="custom_script_form" method="post"  name="custom_script_form" action="">
                  <textarea class="col-sm-12 col-md-12 col-xs-12 col-lg-12"  id="custom_script_textarea" rows="10" style="border-radius: 4px; resize: none;"><?php echo $custom_script ?></textarea>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary"  onclick="insert_custom_script()" data-dismiss="_modal">Save changes</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="customBodyScriptModal" tabindex="-1" role="dialog" aria-labelledby="customBodyScriptModalLabel" style="margin-top:70px;">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="customBodyScriptModalLabel">Custom body script</h4>
            </div>
            <div class="modal-body" style="min-height: 267px;">
                <p>Add custom script inside body</p>
                <form id="custom_body_script_form" method="post"  name="custom_body_script_form" action="">
                  <textarea class="col-sm-12 col-md-12 col-xs-12 col-lg-12"  id="custom_body_script_textarea" rows="10" style="border-radius: 4px; resize: none;"><?php echo $custom_body_script ?></textarea>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary"  onclick="insert_custom_body_script()" data-dismiss="_modal">Save changes</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="customCssModal" tabindex="-1" role="dialog" aria-labelledby="customCssModalLabel" style="margin-top:70px;">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="customCssModalLabel">Custom css</h4>
            </div>
            <div class="modal-body" style="min-height: 267px;">
              <p>Add custom css or CDN link</p>
              <textarea class="col-sm-12 col-md-12 col-xs-12 col-lg-12"  id="custom_css_textarea" rows="10" style="border-radius: 4px; resize: none;"><?php echo $custom_css ?></textarea>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary"  onclick="insert_custom_css()" data-dismiss="_modal">Save changes</button>
            </div>
        </div>
    </div>
</div>


<?php
$seo_page_title = get_page_meta($page_id,"seo_page_title");
if($seo_page_title == ""){
  global $mysqli;
  $sql = $mysqli->query("SELECT title FROM pages  WHERE  id='$page_id'");
  $arr = $pres->fetch_array( MYSQLI_ASSOC );
  $seo_page_title=$arr['title'];
}
$seo_page_description = get_page_meta($page_id,"seo_page_description");
$seo_page_image = get_page_meta($page_id,"seo_page_image");
?>


<div class="modal fade" id="seo_settings" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="margin-top:70px;">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="bundleModalLabel">SEO settings</h4>
            </div>
            <div class="modal-body form-group">
                        <div class="row">
                            <div class="col-sm-12">
                                 <form  class="form-horizontal" method="post" >
                                    <div id="div_id_page_name" class="form-group required">
                                        <label for="id_page_name" class="col-xs-12 text-left" style="font-size: 14px;"> Page title</label>
                                        <div class="col-xs-12">
                                            <input class="input-md form-control"  id="seo_page_title" name="seo_page_title" placeholder="Page title" style="margin-bottom: 10px" type="text" required value="<?php echo $seo_page_title;?>" />
                                            <input  class="input-md form-control hidden"  id="seo_page_id" name="page_id" value="<?php echo $page_id;?>" />
                                        </div>
                                    </div>
                                    <div id="div_id_page_name" class="form-group required">
                                        <label for="id_page_name" class="col-xs-12 text-left" style="font-size: 14px;"> Page description</label>
                                        <div class="col-xs-12">
                                            <textarea class="col-sm-12 col-md-12 col-xs-12 col-lg-12"  id="seo_page_description" rows="3" style="border-radius: 4px; resize: none;" ><?php echo $seo_page_description;?></textarea>
                                        </div>
                                    </div>
                                    <div id="div_id_page_name" class="form-group required">
                                        <label for="id_page_name" class="col-xs-12 text-left" style="font-size: 14px;"> Page image</label>

                                        <div class="col-xs-12">
                                           <div class="input-group">
                                              <input type="text" class="form-control" id="seo_page_image" placeholder="Upload image" value="<?php echo $seo_page_image; ?>">
                                              <div class="input-group-addon" onclick="document.getElementById('seo_image_upload').click();" style="cursor: pointer;border-radius: 0 4px 4px 0;" ><i class="fa fa-file-image-o" aria-hidden="true" ></i></div>

                                              <input type="file" name="seo_image_upload" id="seo_image_upload" style="display:none;" onchange="javascript:upload_image_raw(this,'contestHeaderImagePreview_seo','<?php echo BASE ?>/editor/?process=upload_an_image_to_cloud&preview_width=100&preview_height=100', '<?php echo BASE ?>', 'file_uploaded' ,'seo');">
                                          </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label class="col-xs-12 text-left" style="font-size: 14px; padding-left: 0;">Google product category</label>
                                        <p id="google_product_cat_name_p"><?php echo get_page_meta($page_id,"gfeed"); ?></p>
                                        <button type="button" class="btn btn-info btn-sm" onclick="showEditoption(this);">Edit</button>
                                        <input type="hidden" name="google_cat" id="google_cat">
                                        <div id="google_cat_sel_div" style="display: none;">
                                          <?php empty_divs_for_cats( 'google_cat');?>
                                          <textarea style="display: none;" id="google_feed_category" name="google_feed_category" rows="3" style="margin-top: 5px;"><?php echo $google_product_category ?></textarea>
                                          <textarea style="display: none;" id="google_feed_category_key" name="google_feed_category_key" rows="3" style="margin-top: 5px;"><?php echo $google_product_category_key ?></textarea>
                                        </div>
                                    </div>
                                    <div class="row " style="display:none;color:green;width:100%;" id="contestHeaderImagePreview_seo"></div>
                                </form>
                            </div>
                        </div>
                    </div>
            <div class="modal-footer">
                <button type="button" id="seo_settings_popup_close_btn" class="btn btn-danger" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="save_seo_settings_data()">Save changes</button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="opt_in_settings" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="margin-top:70px;">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="bundleModalLabel">Opt-in settings</h4>
            </div>
            <div class="modal-body">
              <div class="row">
                  <div class="col-md-12">
                    <div id="mailer_selection_form"></div>
                  </div>
              </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="save_page_mailer('<?php echo $page_id ?>')">Save changes</button>
            </div>
        </div>
    </div>
</div>

<!--
MODAL App settings START 
-->

<div class="modal fade" id="app_settings_Modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="margin-top:70px;">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="bundleModalLabel">App settings</h4>
            </div>
            <div class="modal-body">
                <?php
                    $ecomisoft_app_recommendr = get_page_meta($page_id,"ecomisoft_app_recommendr");
                    $ecomisoft_app_lately = get_page_meta($page_id,"ecomisoft_app_lately");
                ?>
                <div class="checkbox">
                    <label>
                    <input type="checkbox" id="ecomisoft_app_recommendr" value="on" <?php if ($ecomisoft_app_recommendr == "on") {
                            echo "checked";
                        } ?>>Enable recommendr</label>
                </div>
                <div class="checkbox">
                  <label><input type="checkbox" id="ecomisoft_app_lately" value="on" <?php if ($ecomisoft_app_lately == "on") {
                            echo "checked";
                        } ?>>Enable lately</label>
                </div>
                  
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="save_app_settings_data()">Save changes</button>
            </div>
        </div>
    </div>
</div>

<!--
MODAL App settings END 
-->
<!--
MODAL image library START 
-->

<div class="modal fade sidenav_container" id="show_image_library" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="margin-top:70px;">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="bundleModalLabel">Media library</h4>
            </div>
            <div class="modal-body" style="overflow-y: scroll;overflow-x: hidden;max-height: 400px;">
                <div class="row" id="media_img_sidepanel_lib">
                  
                    
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
  function load_image_library_from_json(page,type){
    var max_img = 12;
    $("#image_library_pagination").remove();
    var all_image = $("#image_library")[0].value;
    all_image = JSON.parse(all_image);
    var img_div = "";var pagination_div = "";
    if(all_image.length > 0){
      var max = max_img * page;
      var min = max-max_img;
      if(max > all_image.length){
        max = all_image.length;
      }
      if(min < 0){
        min = 0;
      }
      for(i=min;i<max;i++){
        var image_db_id = all_image[i].id.replace("uploads_image_url_", "");
        img_div += '<div style="max-height: 80px;min-height: 80px; margin-top:10px;" class="main_image_div" >';
          img_div += '<img class="media_image" style="max-height: 80px;min-height: 80px; border:2px solid rgba(80, 80, 255, 0.65)"  src="'+all_image[i].html.attributes.src+'" width="100%">';
          img_div += '<div class="col-sm-12 col-md-12">';
            img_div += '<div class="button">';
            if(type == "side_panel"){
              img_div += '<button style="padding:2px;background: rgba(14, 65, 210, 0.41);border: 1px solid blue;border-radius: 0px; " class="btn btn-primary col-sm-6 col-md-6" id="'+all_image[i].id+'" onclick="add_me_to_editor_preview(this);" data-dismiss="modal"> Insert </button>';
            }else{          //(type == "settings"){
              img_div += '<button style="padding:2px;background: rgba(14, 65, 210, 0.41);border: 1px solid blue;border-radius: 0px; " class="btn btn-primary col-sm-6 col-md-6" id="'+all_image[i].id+'" onclick="add_this_url_to_input_field(\''+all_image[i].html.attributes.src+'\');" data-dismiss="modal"> Insert </button>';
            }
               img_div += '<button style="padding:2px;background: rgba(255, 1, 1, 0.45);border:1px solid #b70d01;border-radius: 0px;" onclick="delete_this_image_form_db(\''+all_image[i].html.attributes.src+'\',this)" class="btn btn-primary col-sm-6 col-md-6"> Delete </button>';
            img_div += '</div>';
      
          img_div += '</div>';
        img_div += '</div>';
      }

      pagination_div += '<div class="row" id="image_library_pagination">';
        pagination_div += '<div class="col-xs-12">';
          pagination_div += '<nav aria-label="Page navigation example" style="text-align: center;">';
            pagination_div += '<ul class="pagination" style="margin-bottom: 0;">';
            if(page != 1){
              pagination_div += '<li class="page-item" onclick="load_image_library_from_json('+(page-1)+',\''+type+'\')"><a class="page-link" href="#"><span style="color:blue;">&laquo; Previous</span></a></li>';
            }
              // pagination_div += '<li class="page-item" onclick="load_image_library_from_json(1)"><a class="page-link" href="#"><span style="color:blue;">1</span></a></li>';
              // pagination_div += '<li class="page-item"><a class="page-link" href="#"><span style="color:blue;">2</span></a></li>';
              // pagination_div += '<li class="page-item"><a class="page-link" href="#"><span style="color:blue;">3</span></a></li>';
              if((page*max_img)<all_image.length){
                pagination_div += '<li class="page-item" onclick="load_image_library_from_json('+(page+1)+',\''+type+'\')"><a class="page-link" href="#"><span style="color:blue;">Next &raquo;</span></a></li>';
              }
            pagination_div += '</ul>';
          pagination_div += '</nav>';
        pagination_div += '</div>';
      pagination_div += '</div>';

      $(pagination_div).insertAfter($("#media_img_sidepanel_lib"));

    }else{
      img_div += '<div class="col-md-12 col-sm-12 col-lg-12 no_image_error_msg" style="background-color: #d9534f">';
        img_div += '<h5 style="text-align: center;color:white;">No images uploaded yet.</h5>';
      img_div += '</div>';
    }

    $("#media_img_sidepanel_lib")[0].innerHTML = img_div;

  }
</script>

<div class="modal fade" id="cart_bump_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="margin-top:70px;">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="cart_bump_modal_label">Select cart bump product</h4>
            </div>
            <div class="modal-body">
                <div id="div_id_product_handle" class="form-group required">
                    <div>
                        <label  for="id_page_title" class="text-left">
                            <span style="font-size: 14px;">Product</span><span id="cart_bump_product_edit_control"  style="display: none;"> <a style="cursor:pointer;text-decoration: none;" onclick="show_search_field_bump();"> - <span style="color: rgb(217, 83, 79);">Edit</span></a></span>                           
                        </label>
                        <div class="row">
                            <div id="product_title_div_bump" style="font-weight: normal;">
                            </div>
                        </div>

                    </div>
                    <div style="display: none;" id="div_id_product_bump" class="form-group required">
                        <div style="margin-bottom: 20px;padding-right: 0px; padding-left: 0px;" class="col-xs-12 product_selected_div">
                            <div class="input-group" style="margin-bottom: 0px !important;">
                                <input type="text" class="form-control" id="search_text_bump" placeholder="Search product, example: shirt">
                                <div class="input-group-addon" style="cursor: pointer;" onclick="find_products_bump()" >
                                    Search
                                </div>
                            </div>
                            <div class="text-center" id="search_result_bump" style="position: absolute;top:34px; width: 88%; z-index: 100000;"></div>
                            <input type="text" name="id_product" id="id_product" hidden>
                        </div>
                    </div>
                    <input type="text" name="page_number_for_bump_products" id="page_number_for_bump_products" value="1" hidden>
                    <input type="hidden" id="cart_bump_product_handle" value="">
                </div>
                 <script>
                     function show_search_field_bump(){
                         $('#div_id_product_bump').fadeIn(); 
                         $("#product_title_div_bump").hide();  
                     }
                 </script>
                <div class="form-group">
                    <label for="cart_bump_product_number">Number of products</label>
                    <select class="form-control" name="cart_bump_product_number" id="cart_bump_product_number">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="cart_bump_product_template">Text</label>
                    <textarea name="cart_bump_product_template" id="cart_bump_product_template" class="form-control"></textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="save_cart_bump_product_info();">Save changes</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="add_to_lib_modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="margin-top:70px;">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="cart_bump_modal_label">Add this element to personal library</h4>
            </div>
            <div class="modal-body">
                <div class="form-group">
                  <label for="email">Element name:</label>
                  <input type="email" class="form-control" id="add_to_lib_name">
                </div>
            </div>
            <div class="modal-footer">
                <input type="hidden" id="add_to_lib_id">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="add_me_to_personal_lib();">Add</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="personal_library" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="margin-top:70px;">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="cart_bump_modal_label">Element library</h4>
            </div>
            <div class="modal-body">
                <div class="row" id="my_personal_element_lib_div">
                    <?php 
                      $drag_and_drop_element_library = [];

                      $sql = "SELECT * from library WHERE shop_id = $shop_id ORDER BY id DESC";
                      $pres = $mysqli->query($sql);
                      while( $arr = $pres->fetch_array( MYSQLI_ASSOC ) ) {
                        $lib = $arr['code'];
                        $lib = json_decode($lib);
                        $temp = array();
                        $temp['id']= 'personal_lib_'.$arr['id'];
                        $temp['html']= $lib->element;
                        $drag_and_drop_element_library[] = $temp;
                    ?>
                        <div title="<?php echo $lib->name; ?>" style="max-height: 80px;min-height: 80px; margin-top:10px; background-color: #34495e; position: relative; border-radius: 5px;" class="main_image_div">
                            <div>
                                <p style="color: #fff; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"><?php echo $lib->name; ?></p>
                                <div style="display: table; width:100%; text-align: center; z-index: 99; position: absolute; top:18px; left: 0px;">
                                  <i style="display: table-cell; vertical-align: middle; font-size: 42px; opacity: 0.6; color: #fff;" class="fa fa-codepen" aria-hidden="true"></i>
                                </div>
                                <div style="position: absolute; bottom: 5px; right:8px; left: 8px; z-index: 9999;">
                                  <button class="btn btn-info btn-sm" style="width: 45%; float: left; text-align: left;" id="<?php echo'personal_lib_'.$arr['id']; ?>" onclick="add_me_to_editor_preview(this);" data-dismiss="modal">Insert</button>
                                  <button class="btn btn-danger btn-sm" style="width: 45%;float: right; text-align: right;"  onclick="remove_this_lib(this,'<?php echo $arr['id']; ?>');">Delete</button>
                                </div>
                            </div>
                        </div>

                    <?php
                        }
                    ?>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
  function add_this_url_to_input_field(val){
    var my_id = $("#current_editable_element_id")[0].value;
    var value = val;
    $("#"+$("#image_src_input_field_id")[0].value)[0].value = val;
    //$("#"+$("#image_src_input_field_id")[0].value).change();

    fire_this_event(document.getElementById($("#image_src_input_field_id")[0].value),"change");
  }

  function delete_this_image_form_db(image_url,me){
    var data = 'image_url='+ image_url;
    var all_image = $("#image_library")[0].value;
    all_image = JSON.parse(all_image);

    for(i=0;i<all_image.length;i++){
      if(all_image[i].html.attributes.src == image_url){
        all_image.splice(i,1);
      }
    }
    $("#image_library")[0].value = JSON.stringify(all_image);
    
    http_post_request( base + '/editor/?process=delete_this_image', data , 'nothing_to_do' );
    $(me).parent().parent().parent().remove();
  }
  function save_cart_bump_product_info(){
      var cart_bump_product_handle = $("#cart_bump_product_handle")[0].value;
      var cart_bump_product_number = $("#cart_bump_product_number")[0].value;
      var cart_bump_product_template = $("#cart_bump_product_template")[0].value;
      /*var cart_bump_product_data = $("#cart_bump_product_data")[0].value;*/
      var div_id = $("#current_editable_element_id")[0].value;
      /*var page_id = $("#page_id")[0].value;*/
      var cart_bump_table = '<table>';
      cart_bump_table += '<tr style="border: none"><td style="padding: 8px; vertical-align: top;"> <input type="checkbox" class="cart_bump_checkbox_input" onchange="bump_cart_with(this, \''+cart_bump_product_handle+'\', \'\', \''+cart_bump_product_number+'\')">&nbsp; </td> <td style="padding: 8px; vertical-align: top;">'+ cart_bump_product_template +'</td></tr>'
      cart_bump_table += '</table>';
      $("#"+div_id)[0].innerHTML = cart_bump_table;
      var html_data = document.getElementById('editor_preview_data').value;
      if( html_data != '' ) {
          html_data = JSON.parse( html_data );
          html_data = set_json_content_value(div_id,html_data);
          document.getElementById('editor_preview_data').value = JSON.stringify(html_data);
      }
  }

  function add_me_to_personal_lib(){
    var ele_id = $("#add_to_lib_id")[0].value;
    var ele_name = $("#add_to_lib_name")[0].value;
    if(ele_name != ""){
      var html_data = document.getElementById('editor_preview_data').value;
      if( html_data != '' ) {
        html_data = JSON.parse( html_data );
        get_element_from_json(ele_id,html_data);
        var copied_element = $("#editor_preview_deleted_item")[0].value;
        var data = 'ele_name='+ encodeURIComponent(ele_name);
        data += '&copied_element='+ encodeURIComponent(copied_element);
        http_post_request( base + '/editor/?process=add_me_to_personal_lib', data , 'add_me_to_personal_lib_done' );
        $('#add_to_lib_modal').modal('toggle');
      }
    }else{
      alert("Please give a name");
    }
  }
  function add_me_to_personal_lib_done(res){
    $("#my_personal_element_lib_div")[0].innerHTML = res;

    var drag_and_drop_elements = JSON.parse($("#drag_and_drop_elements")[0].value);
    var copied_element = $("#editor_preview_deleted_item")[0].value;
    var temp = {};
    temp['html'] = JSON.parse(copied_element);
    temp['id'] = $("#last_index_my_personal_element_lib")[0].value;
    drag_and_drop_elements.push(temp);
    $("#drag_and_drop_elements")[0].value = JSON.stringify(drag_and_drop_elements);
  }

  function remove_this_lib(me,id){
    ele_id = id
    var data = 'ele_id='+ encodeURIComponent(ele_id);
    http_post_request( base + '/editor/?process=remove_this_lib', data , 'remove_this_lib_done',me );
  }

  function remove_this_lib_done(res,me){
    $(me).parent().parent().parent().remove();
  }
</script>