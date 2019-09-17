<?php 
    session_recovery( SESSIONNAME );
    $base_url = BASE; 
    $g_taxonomy = file_get_contents( 'files/.google_shopping_taxonomy' );
    $lbr = explode( PHP_EOL, $g_taxonomy );
    foreach( $lbr as $l ) {
        $idbr = explode( ' - ', $l );
        if( trim( $idbr[0] != '' ) ) $google_taxonomies[ trim( $idbr[0] ) ] = trim( $idbr[1] );
    }
?>
<?php
	if( !isset( $_SESSION[ SESSIONNAME ]['shop_id'] ) ) {
		header("location:" . BASE . "/login/" );
        die();
	} else {
		form_processor();
		$page_id = $_REQUEST['page'];
		$res = $mysqli->query("SELECT id, name, title, html FROM pages WHERE id='$page_id' AND shop_id='" . $_SESSION[ SESSIONNAME ]['shop_id'] . "'");
		if( $res->num_rows > 0 ) {
			$arr = $res->fetch_array( MYSQLI_ASSOC );
            $body_nodes_encoded = $arr['html'];
            
            //$body_nodes =  json_decode(preg_replace('/[\x00-\x1F\x80-\xFF]/', '', $body_nodes_encoded), true);
			$body_nodes =  json_decode($body_nodes_encoded);

			get_page_meta( $page_id, 'css' );

            $shop_id = $_SESSION[SESSIONNAME]['shop_id'];
            $shop_domain = get_shop_meta( $shop_id, 'shop_domain');
            $force_ssl = get_shop_meta( $shop_id, 'force_ssl');
            $full_shop_url= ( $force_ssl > 0 ? 'https://' : 'http://' ) . $shop_domain;
            $product_id = get_page_meta($page_id,"product_id");
            if($product_id != "") {
                require 'includes/shopify.php';
                $sc = new ShopifyClient($_SESSION[ SESSIONNAME ]['shop'], $_SESSION[ SESSIONNAME ]['token'], SHOPIFY_API_KEY, SHOPIFY_SECRET);
                try {
                    $this_product = $sc->call('GET', '/admin/products/'.$product_id.'.json');
                } catch (Exception $e) {
                    $product_id = '';
                    add_page_meta( $page_id, "product_id", $product_id );
                }
            }

?>
<!DOCTYPE HTML>
<html>
<head>
	<meta http-equiv="Content-Type" content=" charset=UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Funnel Buildr</title>
    <link rel="icon" href="<?php echo BASE.'/files/dashboard/images/favicon.png'; ?>" type="image/gif" sizes="16x16">
	<link rel="stylesheet" href="<?php echo BASE; ?>/files/css/jquery.datetimepicker.css"/ >
	
	<link rel="stylesheet" href="<?php echo BASE; ?>/files/editorscript/css/z-index.css?ver=<?php echo SCRIPT_VERSION ?>"> 
	<link rel="stylesheet" href="<?php echo BASE; ?>/files/editorscript/css/top-navbar.css?ver=<?php echo SCRIPT_VERSION ?>"> 
	<link rel="stylesheet" href="<?php echo BASE; ?>/files/editorscript/css/loading_style.css?ver=<?php echo SCRIPT_VERSION ?>">
	<link rel="stylesheet" href="<?php echo BASE; ?>/files/editorscript/css/jquery.minicolors.css">

	<link rel="stylesheet" href="<?php echo BASE; ?>/files/editorscript/css/font-awesome.min.css">
	<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="<?php echo BASE; ?>/files/editorscript/css/style.css?ver=<?php echo SCRIPT_VERSION ?>"> 
    <link rel="stylesheet" href="<?php echo BASE; ?>/files/editorscript/css/editor/animate.css">
    <link rel="stylesheet" href="<?php echo BASE; ?>/files/css/common_style.css?ver=<?php echo SCRIPT_VERSION ?>">

    
    <script> var base = '<?php echo BASE; ?>'; </script>
    <script> var this_shop_url = '<?php echo $_SESSION[ SESSIONNAME ]['shop'] ?>'; </script>

    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="<?php echo BASE; ?>/files/js/bootstrap.min.js"></script>
    <script src="<?php echo BASE; ?>/files/editorscript/js/jquery.minicolors.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="<?php echo BASE; ?>/files/js/jquery.datetimepicker.full.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.4.0/moment.min.js"></script>
    <script src="<?php echo BASE; ?>/files/js/clipboard.js"></script>
    <script src="<?php echo BASE; ?>/files/editorscript/js/set_get_css.js?ver=<?php echo SCRIPT_VERSION ?>"></script>
    <script src="<?php echo BASE; ?>/files/editorscript/js/javascript.js?ver=<?php echo SCRIPT_VERSION ?>"></script>
    <script src="<?php echo BASE; ?>/files/editorscript/js/drag_and_drop.js?ver=<?php echo SCRIPT_VERSION ?>"></script>
    <script src="<?php echo BASE; ?>/files/editorscript/js/json.js?ver=<?php echo SCRIPT_VERSION ?>"></script>
    <script src="<?php echo BASE; ?>/files/editorscript/js/shopify_display.js?ver=<?php echo SCRIPT_VERSION ?>"></script>
    <script src="<?php echo BASE; ?>/files/editorscript/js/global_val.js?ver=<?php echo SCRIPT_VERSION ?>"></script>
    <script src="<?php echo BASE; ?>/files/editorscript/js/easyUndoRedo.js?ver=<?php echo SCRIPT_VERSION ?>"></script>
    <script src="<?php echo BASE; ?>/files/editorscript/js/ckeditor/ckeditor.js?ver=<?php echo SCRIPT_VERSION ?>"></script>
    <script src="<?php echo BASE; ?>/files/editorscript/js/google_feed.js?ver=<?php echo SCRIPT_VERSION ?>"></script>
    <script>
        var editor_class_list = ['main_container','span_but_h1_tag','span_but_h2_tag','span_but_h3_tag','span_but_h4_tag','span_but_h5_tag','span_but_h6_tag','span_but_p_tag','ui-sortable-handle','ui-sortable','hover_disable','click_show_my_border','image','padding-10px','dont_clone','dont_remove','do_not_add_empty_button','container_box_shadow','row_box_shadow','div_box_shadow'];
        var element_id = 0;
        var my_id = "";
        var my_prev_parent_id = "";
        var my_new_parent_id = "";
        var my_new_prev_id = null;
        var editable_text_changed = "";
        //~HOVER OVER  ELEMENT 
        var rand = Math.floor(Math.random() * (500 - 300)) + 300;
        var interval_id_flag = 0;
        var intervalId = {};
        var drag_running = false;
        var show_hide = "hide";
        var UndoRedo;

        $( document ).ready(function() {
            pageeditor_regenerate_html();
            $( ".drag_me_panel_to_editor" ).draggable({
                connectToSortable: ".body_container div",
                helper: "clone",
                revert: "invalid",
                start : function(event, ui){
                },
                stop : function(event, ui){
                    drag_running = false;
                },
            });

            $(".visual_tab").click(function () {
                $(".text_tab").removeClass("active");
                $(this).addClass("active");   
            });
            
            $(".text_tab").click(function () {
                $(".visual_tab").removeClass("active");
                $(this).addClass("active");   
            });

            $("#advanced").hide();
            $("#animation").hide();

            setTimeout(function(){ $('#top-navbar').show("slide", { direction: "up" }, 500); }, 200);

            setInterval(function(){ setTime(); }, 1000);

            $( "#datepicker" ).datetimepicker();
            var all_timer_data = $("#all_timer_data")[0].value;
            if(all_timer_data != '' &&  all_timer_data.indexOf('[]') < 0 ){
                all_timer_data = JSON.parse(all_timer_data);
                interval_id_flag = 0;
                for (var i=0 ; i<all_timer_data.length;i++){
                   var id = all_timer_data[i].timer_id;
                   var endtime = all_timer_data[i].deadline;
                   funnel_countdown(id, endtime);                    
                }
            }

            
            var all_eg_data = $('#all_eg_data').val();
            if(all_eg_data != '' &&  all_eg_data.indexOf('[]') < 0 ){
                all_eg_data = JSON.parse(all_eg_data);
                for (var i=0 ; i<all_eg_data.length;i++){

                    var id = all_eg_data[i].eg_timer_id;
                    var duration = all_eg_data[i].duration;


                    if (checkCookie ('eg_timer_'+id) == false){
                        var today_date = new Date();
                        today_date.setTime(today_date.getTime()+duration);
                        var expires = "; expires="+today_date.toGMTString();
                        document.cookie = 'eg_timer_'+id+' = '+Date.parse(new Date())+expires+'';
                    }

                    else if (checkCookie ('eg_timer_'+id) == true){
                        var starting_time = getCookie('eg_timer_'+id);
                        var current_time = Date.parse(new Date()) ;

                        duration = duration - (current_time - starting_time);  
                    }

                    var deadline = (Date.parse(new Date())) + duration;

                    eg_countdown(id,deadline);
                }
            }

            //get screen height
            var h = window.innerHeight;
            document.getElementsByTagName('body')[0].style.minHeight = h + 'px';
            $('#div_editorpreview')[0].style.minHeight = h + 'px';
            $('#mobile_preview')[0].style.minHeight = (h-60) + 'px';

            for(var i=0;i<$(".fb-comments").length;i++){
                $(".fb-comments")[i].innerHTML = '<img width="100%" src="'+base+'/files/editorscript/images/snippets/fb-comments.png">';
            }
            overflow_control($('#div_editorpreview'));
            document.onkeydown = KeyPress;
            $(document).mouseup(function (e)
            {
                var container = $(".sidenav_container");
                if (!container.is(e.target) // if the target of the click isn't the container...
                    && container.has(e.target).length === 0) // ... nor a descendant of the container
                {
                    close_all_option();
                }

                overflow_control($('#div_editorpreview'));
            });

            var ck = CKEDITOR.replace("custom_snippet_textarea",
            {
                 height: 230
            });


            var ck2 = CKEDITOR.replace("input_text_text_editor",
            {
                 height: 230
            });

            /*$(".body_container .modal").on("shown.bs.modal", function () {
                console.log("editor sortable_state_change shown");
                setTimeout(function(){ sortable_state_change (); }, 500);
            });*/

            $("button[data-toggle='modal']").click(function(){
                setTimeout(function(){ sortable_state_change (); }, 500);
            });

            $('.validate_input_special_character').keyup(function () {
                validate_input_special_character(this);
            });
        });

        //temporary function to enable bootstrap modals
        function enableBootstrapAttributes(event) {
            var dataToggleValue = event.target.getAttribute('data-toggle');
            if( dataToggleValue == 'modal' ) {
                var dataTarget = event.target.getAttribute('data-target');
                $(dataTarget).modal('show');
            }
        }
        if (document.addEventListener) {
            document.addEventListener('click', enableBootstrapAttributes);
        } else {
            document.attachEvent('click', enableBootstrapAttributes);
        }

        function getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for(var i = 0; i <ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }
        function checkCookie(cname) {
            var username = getCookie(cname);
            if (username != "") {
               return true ;
            } else {
                return false;
            }
        }
    </script>

    <?php echo get_page_meta($page_id,"custom_css"); ?>
</head>
<body>

<?php include "files/editorscript/phpsection/top-navbar.php" ?>
<?php include "files/editorscript/phpsection/add_rows.php" ?>
<?php include "files/editorscript/phpsection/side_nav_settings.php" ?>
<?php include "files/editorscript/phpsection/shopify_elements_array.php" ?>

<?php include "files/editorscript/phpsection/side_nav_all_elements.php" ?>
<?php include "files/editorscript/phpsection/all_element_array.php" ?>
<?php include "files/editorscript/phpsection/pop_up_settings.php" ?>

<br><br><br>
<?php
    $body_css = str_replace("display: none","display: _none",get_page_meta( $page_id, 'body_css' ));
    $body_css = str_replace("background-color: rgba(2, 52, 88, 0)","background-color: rgba(2, 52, 88, 1)",$body_css);
?>
<div class="div_editorpreview" id="div_editorpreview" style="background-color: #023458;<?php echo $body_css; ?>"></div>


<div class="page_preview" id="page_preview"></div>
<div class="mobile_preview" id="mobile_preview" style="background-color: rgb(2, 52, 88); display:none;"></div>

<!-- timer popup -->
<div class="modal fade" id="timerPopup" role="dialog" style="margin-top: 100px">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Set deadline </h4>
        </div>
        <div class="modal-body">
             <div class="form-group">
                <h5 >Date-time:</h5>
                <input class="form-control" type="text" id="datepicker" placeholder="Date-time">
                <h5 >URL:</h5>
                <input class="form-control" type="text" id="datepicker_url" placeholder="URL">
                <input type="hidden" id="hidden_timer_id">
            </div>        
        </div>
        <div class="modal-footer">
          <button onclick="save_timer_deadline()" type="button" class="btn btn-primary" data-dismiss="modal">Save</button>
        </div>
      </div>      
    </div>
</div>

<!-- timer popup -->
<div class="modal fade" id="everGreenTimerPopup" role="dialog" style="margin-top: 100px">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Set Evergreen timer</h4>
        </div>
        <div class="modal-body row">
             <div class="form-group col-sm-3" >
                <label class="col-sm-12" style="text-align: left ; padding-left: 0px;">Days</label>
                <input class="col-sm-3 form-control" type="text" placeholder="Days" id="eg_days_input" name="eg_days_input">
            </div>  
            <div class="form-group col-sm-3" >
                <label class="col-sm-12" style="text-align: left ; padding-left: 0px;">Hours</label>
                <input class="col-sm-3 form-control" type="text" placeholder="Hours" id="eg_hours_input" name="eg_hours_input">
            </div>  
            <div class="form-group col-sm-3" >
                <label class="col-sm-12" style="text-align: left ; padding-left: 0px;">Minutes</label>
                <input class="col-sm-3 form-control" type="text" placeholder="Minutes" id="eg_minutes_input" name="eg_minutes_input">
            </div>  
            <div class="form-group col-sm-3" >
                <label class="col-sm-12" style="text-align: left ; padding-left: 0px;">Seconds</label>
                <input class="col-sm-3 form-control" type="text" placeholder="Seconds" id="eg_seconds_input" name="eg_seconds_input">
                <input type="text" hidden id="eg_hidden_id">
            </div>  
            <div class="form-group col-sm-12" >
                <label for="" id="eg_error_msg" style="color:red; display: none;"> Invalid time format </label>
            </div>   
            <div class="form-group col-sm-12" >
                <label class="col-sm-12" style="text-align: left ; padding-left: 0px;">URL</label>
                <input class="col-sm-3 form-control" type="text" placeholder="URL" id="eg_seconds_input_url">
            </div>   
        </div>
        <div class="modal-footer">
          <button onclick="save_eg_timer_deadline()" type="button" class="btn btn-primary">Save</button>
        </div>
      </div>      
    </div>
</div>

<div id="editor_popup_to_change_text" class="modal fade" role="dialog" >
  <div class="modal-dialog modal-lg">

    <!-- Modal content-->
    <div class="modal-content sidenav_container">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal">&times;</button>
        <h4 class="modal-title">Text editor</h4>
      </div>
      <div class="modal-body">
         <textarea class="col-sm-12 col-md-12 col-xs-12 col-lg-12" name="input_text_text_editor" id="input_text_text_editor" rows="7"></textarea>
      </div>
      <div class="modal-footer">
        <button id="text_editor_save_btn" type="button" class="btn btn-primary" data-dismiss="modal">Save</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>

  </div>
</div>
	 		
    <?php 
        $all_timer_data = get_page_meta( $page_id, 'all_timer_data' );
        $all_eg_data = get_page_meta( $page_id, 'all_eg_data' );
     ?>
    <textarea id="all_timer_data" rows="2" cols="100" hidden><?php echo $all_timer_data ?></textarea>
    <textarea id="all_eg_data" rows="2" cols="100" hidden><?php echo $all_eg_data ?></textarea>
	<textarea id="tags_css_attr" rows="4" cols="100" hidden><?php echo json_encode($tags_css_attr); ?></textarea>
	<textarea id="style_property" rows="4" cols="100" hidden><?php echo json_encode($style_property); ?></textarea>
	<textarea id="drag_and_drop_elements" rows="4" cols="100" hidden><?php echo json_encode($drag_and_drop_elements); ?></textarea>
    <textarea id="image_library" rows="4" cols="100" hidden><?php echo json_encode($uploads_images_url); ?></textarea>
    <input type="hidden" id="image_src_input_field_id" value="">
    <?php 
        if($body_nodes == null) { 
            $body_nodes = json_decode('[{"tag":"div","endtag":1,"attributes":{"class":"container text-center","style":"padding: 10px;"},"nodes":[]}]'); 
            echo json_encode( $body_nodes );
        } else {
            $body_nodes = str_replace("&quot;",'\"',json_encode( $body_nodes ));
        }
    ?>
	<textarea id="page_preview_data" cols="100" rows="3" hidden><?php echo $body_nodes; ?></textarea>
	<textarea id="editor_preview_deleted_item" cols="100" rows="4" hidden></textarea>
	<textarea id="editor_preview_data" cols="100" rows="10" hidden></textarea>
	<textarea id="edited_all_elements_id" cols="100" rows="10" hidden></textarea>
	<textarea id="template_dependent_css_link" cols="100" rows="10" hidden><?php echo get_page_meta( $page_id, 'css' ); ?></textarea>
	<input type="hidden" id="current_editable_element_id" value="">
	<input type="hidden" id="current_editable_element_image_src" value="">
    <input type="hidden" id="exit_popup_status" value="<?php echo get_page_meta( $page_id, 'exit_popup_status' ); ?>">
    <input type="hidden" id="page_id" value="<?php echo $page_id; ?>">
	<input type="hidden" id="shop_id" value="<?php echo $shop_id; ?>">
		
	<div id="pull_line_div"></div>
    <span id="place_below" class="glyphicon glyphicon-pushpin"></span>
    <div class="loader" hidden></div>
    <div id="editor_msg" style="color:#FFFFFF;padding:10px;text-align:center;width:300px;position:fixed;bottom:0;right:40%;border-radius:4px 4px 0 0; font-size: 20px;" hidden>
		Settings Saved Success
	</div>

    <div style="color: white; padding-right: 10px; min-width: 100%;">
      <div class="pull-right">
        Funnel Buildr 2.0 – powered by <a target="_blank" href="https://ecomisoft.com/" style="color: white;">Ecomisoft</a>
      </div>
    </div>
</body>
</html>
<?php	
		}
	}
	function process_save_page_new_data(){
		global $mysqli;
        $shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];
        $html_data = $_REQUEST['html_data'];
        $page_id = $_REQUEST['page_id'];
        $body_attr = $_REQUEST['body_attr'];
        $timer_data = $_REQUEST['timer_data'];
        $all_eg_data = $_REQUEST['all_eg_data'];
        $sql = "UPDATE pages SET `last_updated` = '". date("Y-m-d H:i:s"). "', `html` = '" . $mysqli->real_escape_string( $html_data ) . "' WHERE id = '$page_id' AND shop_id=$shop_id";
        if($mysqli->query($sql)){
            add_page_meta( $page_id, 'body_css', $body_attr );
            add_page_meta( $page_id, 'all_timer_data', $timer_data );
            add_page_meta( $page_id, 'all_eg_data', $all_eg_data );
            echo "success";
        }else{
            echo "fail";
        }
	}
	function process_get_variants(){
        $product_id = $_REQUEST['product_id'];
        require_once 'includes/shopify.php';
        $sc = new ShopifyClient($_SESSION[ SESSIONNAME ]['shop'], $_SESSION[ SESSIONNAME ]['token'], SHOPIFY_API_KEY, SHOPIFY_SECRET);
        $shopify_product = $sc->call('GET', '/admin/products/' . $product_id . '.json');
        $html_data = '';
        $i1 = 1;
        $arr = array('html_data'=>'','option' => array(),'option2' => array() );
        foreach ($shopify_product['variants'] as $variant) {
            $arr2 = array('variants_id'=>array(),'variant_name' => array());
            $arr2['variants_id'][] = $variant['id'];
            $arr2['variant_name'][] = $variant['title'];
            $arr['option'][] = $variant['title'];
            $arr['option2'][] = $arr2;
        }
        foreach ($shopify_product['options'] as $option) {
            $html_data .= '<label for="option'.$i1.'">'.$option['name'].'</label>';
            $html_data .= '<select class="form-control" onchange="select_sale_variant(this,'.$i1.');">';
            $html_data .= '<option>Select</option>';
            foreach ($option['values'] as $value) {
                $html_data .= '<option value ="'.$value.'">'.$value.'</option>';
            }
            $html_data .= '</select><br>';
            $i1++;
        }
        $arr['html_data'] = $html_data;
        echo json_encode($arr);
    }
    function process_save_bundle_product_details(){
        $info = $_REQUEST['info'];
        $info = explode("@@@@", $info);
        $page_id = $info[0];
        $product_details = $_REQUEST['product_details'];
        $product_details = explode("@@@@", $product_details);
        $product_array = $info[1];
        $product_id = $product_details[0];
        $vari_id = $product_details[1];
        require_once 'includes/shopify.php';
        $sc = new ShopifyClient($_SESSION[ SESSIONNAME ]['shop'], $_SESSION[ SESSIONNAME ]['token'], SHOPIFY_API_KEY, SHOPIFY_SECRET);
        $shopify_product_images = $sc->call('GET', '/admin/products/' . $product_id . '.json');
        $image_arr = array();

        foreach ($shopify_product_images['images'] as $images) {
            foreach ($images['variant_ids'] as $variant_arr) {
                if($variant_arr == $vari_id)
                {
                    $image_arr[] =  $images['src'];
                }
            }
        }
        if(sizeof($image_arr)==0)
        {
            $image_arr[] = $shopify_product_images['image']['src'];
        }
        $product_details[] = $image_arr;
        $arr = array('product_array'=>'','product_details' => '' );
        if ($product_array != "") {
            $product_array = json_decode($product_array);
            $product_array[] = $product_details;
            $arr['product_array'] = json_encode($product_array);
            $arr['product_details'] = $product_details;
            echo json_encode($arr);
        }
        else
        {
            $product_array = array();
            $product_array[] = $product_details;
            $arr['product_array'] = json_encode($product_array);
            $arr['product_details'] = $product_details;
            echo json_encode($arr);
        }
    }
    function process_delete_bundle_product(){
        $info = $_REQUEST['info'];
        $info = explode("@@@@", $info);
        $page_id = $info[0];
        $index_id = $info[1];
        $product_details = $_REQUEST['product_details'];
        $product_details = explode("@@@@", $product_details);
        $product_name = $product_details[0];
        $product_variant = $product_details[1];
        $product_array = $info[2];
        $product_array = json_decode($product_array);
        $arr = array('product_array'=>'','index' => $index_id );
        foreach ($product_array as $key => $product) {
            if ($product[2] == $product_name && $product[3]==$product_variant){
                array_splice($product_array, $key, 1);
                $arr['product_array'] = json_encode($product_array);
                break;
            }
        }
        echo json_encode($arr);
    }
    
    function process_final_save_bundle_product(){
        $page_id = $_REQUEST['page_id'];
        $value = $_REQUEST['product_details'];
        add_page_meta($page_id, 'bundle_products' , $value);
        echo $page_id;
    }
	
	
	function process_upload_an_image_to_cloud(){
			$full_image_url= upload_an_image_to_own_server(5000000, 'uploaded_', array('png', 'jpg', 'gif','jpeg', 'bmp'));
			$output = explode("/",$full_image_url);
			$partial_image_url = $output[count($output)-3].'/'.$output[count($output)-2].'/'.$output[count($output)-1];
		     echo put_s3_file( AWS_FILE_BUCKET, $partial_image_url);
			die();
		}
		
	function upload_an_image_to_own_server($max_size, $prefix, $valid_exts) {        
		   $path='files/uploads/';
		   if ($_SERVER['REQUEST_METHOD'] === 'POST') {
			   if( ! empty($_FILES['image']) ) {
				   // get uploaded file extension
				   $ext = strtolower(pathinfo($_FILES['image']['name'][0], PATHINFO_EXTENSION));
				   // looking for format and size validity
				   if (in_array($ext, $valid_exts) AND $_FILES['image']['size'][0] < $max_size*50) {
					   $path = $path . uniqid(). $prefix.rand(0,100).'.' .$ext;
					   // move uploaded file from temp to uploads directory
					   if (move_uploaded_file($_FILES['image']['tmp_name'][0], $path)) {  
						   return $path;
					   } //else echo $_FILES['image']['tmp_name'][0];
				   } else {
					   echo 'File not uploaded , we supports only .png, .jpg, .jpeg, .gif, .bmp and max-size 5mb.';
				   }
			   } else {
				   echo 'File not uploaded , we supports only .png, .jpg, .jpeg, .gif, .bmp and max-size 5mb.';
			   }
		   } else {
			   echo 'Bad request , please try later.';
		   }
	}

    function process_insert_custom_script(){
        $page_id = $_REQUEST['page_id'];
        $custom_script = $_REQUEST['custom_script'];
        add_page_meta( $page_id, 'custom_script', $custom_script );
        echo $custom_script;
    }
    function process_insert_custom_body_script(){
        $page_id = $_REQUEST['page_id'];
        $custom_body_script = $_REQUEST['custom_body_script'];
        add_page_meta( $page_id, 'custom_body_script', $custom_body_script );
        echo $custom_body_script;
    }
    function process_insert_custom_css(){
        $page_id = $_REQUEST['page_id'];
        $custom_css = $_REQUEST['custom_css'];
        add_page_meta( $page_id, 'custom_css', $custom_css );
        echo $custom_css;
    }
    function process_save_exit_popup_status(){
        $page_id = $_REQUEST['page_id'];
        $exit_popup = $_REQUEST['exit_popup'];
        add_page_meta( $page_id, 'exit_popup_status', $exit_popup );
        echo $exit_popup;
    }  

    function process_save_seo_settings_to_db() {
        global $mysqli;
        $page_id = $_REQUEST['page_id'];
        $title = $_REQUEST['title'];
        $description = $_REQUEST['description'];
        $image = $_REQUEST['image'];
        $gfeed = $_REQUEST['gfeed'];

        add_page_meta( $page_id, 'seo_page_title', $title );
        add_page_meta( $page_id, 'seo_page_description', $description);
        add_page_meta( $page_id, 'seo_page_image', $image);
        add_page_meta( $page_id, 'gfeed', $gfeed);
    }  

     function process_save_app_settings_data(){
        $ecomisoft_app_recommendr = $_REQUEST['ecomisoft_app_recommendr'];
        $ecomisoft_app_lately = $_REQUEST['ecomisoft_app_lately'];
        $page_id = $_REQUEST['page_id'];
        add_page_meta( $page_id, 'ecomisoft_app_recommendr', $ecomisoft_app_recommendr ); 
        add_page_meta( $page_id, 'ecomisoft_app_lately', $ecomisoft_app_lately ); 
        header("Location:".BASE. '/editor/?page='.$page_id);
    }

    function process_upload_this_image(){
        add_uploads_meta( $_REQUEST['shop_id'], "image", $_REQUEST['uploaded_url'] );
        echo "Image uploaded";
    }
    function process_delete_this_image(){
        $field_url = $_REQUEST['image_url'];
        delete_uploads_meta($field_url);
        echo "Image deleted";
    }


    function process_google_sub_categories( $level = 0, $id, $key = '' ) {
        global $google_taxonomies;
        if( isset( $_REQUEST['level'] ) ) $level = $_REQUEST['level'];
        if( isset( $_REQUEST['key'] ) ) $key = $_REQUEST['key'];
        if( isset( $_REQUEST['id'] ) ) $id = $_REQUEST['id'];

        $html = '';
        foreach( array_keys( $google_taxonomies ) as $gkey ) {
          $br = explode( '>', $google_taxonomies[ $gkey ] );
          if( ( ( count( $br ) == ( $level + 1 ) ) && ( strpos( $google_taxonomies[ $gkey ], $google_taxonomies[ $key ] ) !== false ) ) || ( ( $_REQUEST['level'] < 1 ) && ( strpos( $google_taxonomies[ $gkey ], '>' ) === false ) ) ) {
            $html .= '<option value="' . $gkey . '_' . ( $level + 1 ) . '_' . $id . '_' . trim( $br[ $level ] ) . '">' . trim( $br[ $level ] ) . '</option>';
          }
        }

        if( trim( $html ) != '' ) {
          echo '<div class="col-xs-3" style="padding-left: 0px;">';
          echo '<select class="form-control" onchange="googleFeedChange(this);">';
            echo '<option value="">Select category</option>';
            echo $html;
          echo '</select>';
          echo '</div>';
        } else echo '';
    }

    function empty_divs_for_cats( $id ) {
        for( $i = 0; $i <= 9; $i++ ) {
          echo '<span id="' . $id . '_submenu_' . $i . '">';
            if( $i == 0 ) process_google_sub_categories( 0, $id, '' );
          echo '</span>' . PHP_EOL;
        }
    }

    function process_add_me_to_personal_lib(){
        global $mysqli;
        $shop_id = $_SESSION[SESSIONNAME]['shop_id'];
        $ele_name = $_REQUEST['ele_name'];
        $copied_element = $_REQUEST['copied_element'];

        $code["name"] = $ele_name;
        $code["element"] = json_decode($copied_element);

        $code = $mysqli->real_escape_string(json_encode($code));

        $sql = "INSERT INTO library (shop_id, code)VALUES ('$shop_id', '$code')";
        $pres = $mysqli->query($sql);

        $sql = "SELECT * from library WHERE shop_id = $shop_id ORDER BY id DESC";
        $pres = $mysqli->query($sql);
        while( $arr = $pres->fetch_array( MYSQLI_ASSOC ) ) {
            $lib = $arr['code'];
            $lib = json_decode($lib);
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
        $pres = $mysqli->query("SELECT id FROM library ORDER BY id DESC LIMIT 1");
        $arr = $pres->fetch_array( MYSQLI_ASSOC );
        $lib_id = $arr['id'];
?>      
        <input type="hidden" id="last_index_my_personal_element_lib" value="personal_lib_<?php echo $lib_id; ?>">
<?php
    }

    function process_remove_this_lib(){
        global $mysqli;
        $shop_id = $_SESSION[SESSIONNAME]['shop_id'];
        $ele_id = $_REQUEST['ele_id'];
        $sql = "DELETE FROM library WHERE id=$ele_id";
        $pres = $mysqli->query($sql);
    }

    function process_auto_add_get_variants(){
        $product_id = $_REQUEST['product_id'];
        require_once 'includes/shopify.php';
        $sc = new ShopifyClient($_SESSION[ SESSIONNAME ]['shop'], $_SESSION[ SESSIONNAME ]['token'], SHOPIFY_API_KEY, SHOPIFY_SECRET);
        $shopify_product = $sc->call('GET', '/admin/products/' . $product_id . '.json');
        $html_data = '';
        $i1 = 1;
        $arr = array('html_data'=>'','option' => array(),'option2' => array() );
        foreach ($shopify_product['variants'] as $variant) {
            $arr2 = array('variants_id'=>array(),'variant_name' => array());
            $arr2['variants_id'][] = $variant['id'];
            $arr2['variant_name'][] = $variant['title'];
            $arr['option'][] = $variant['title'];
            $arr['option2'][] = $arr2;
        }
        foreach ($shopify_product['options'] as $option) {
            $html_data .= '<label for="option'.$i1.'">'.$option['name'].'</label>';
            $html_data .= '<select class="form-control" onchange="auto_add_select_sale_variant(this,'.$i1.');">';
            $html_data .= '<option>Select</option>';
            foreach ($option['values'] as $value) {
                $html_data .= '<option value ="'.$value.'">'.$value.'</option>';
            }
            $html_data .= '</select><br>';
            $i1++;
        }
        $arr['html_data'] = $html_data;
        echo json_encode($arr);
    }

    function process_save_auto_add_product_details(){
        $info = $_REQUEST['info'];
        $info = explode("@@@@", $info);
        $page_id = $info[0];
        $product_details = $_REQUEST['product_details'];
        $product_details = explode("@@@@", $product_details);
        $product_array = $info[1];
        $product_id = $product_details[0];
        $vari_id = $product_details[1];
        require_once 'includes/shopify.php';
        $sc = new ShopifyClient($_SESSION[ SESSIONNAME ]['shop'], $_SESSION[ SESSIONNAME ]['token'], SHOPIFY_API_KEY, SHOPIFY_SECRET);
        $shopify_product_images = $sc->call('GET', '/admin/products/' . $product_id . '.json');
        $image_arr = array();

        foreach ($shopify_product_images['images'] as $images) {
            foreach ($images['variant_ids'] as $variant_arr) {
                if($variant_arr == $vari_id)
                {
                    $image_arr[] =  $images['src'];
                }
            }
        }
        if(sizeof($image_arr)==0)
        {
            $image_arr[] = $shopify_product_images['image']['src'];
        }
        $product_details[] = $image_arr;
        $arr = array('product_array'=>'','product_details' => '' );
        if ($product_array != "") {
            $product_array = json_decode($product_array);
            $product_array[] = $product_details;
            $arr['product_array'] = json_encode($product_array);
            $arr['product_details'] = $product_details;
            echo json_encode($arr);
        }
        else
        {
            $product_array = array();
            $product_array[] = $product_details;
            $arr['product_array'] = json_encode($product_array);
            $arr['product_details'] = $product_details;
            echo json_encode($arr);
        }
    }

    function process_delete_auto_add_product(){
        $info = $_REQUEST['info'];
        $info = explode("@@@@", $info);
        $page_id = $info[0];
        $index_id = $info[1];
        $product_details = $_REQUEST['product_details'];
        $product_details = explode("@@@@", $product_details);
        $product_name = $product_details[0];
        $product_variant = $product_details[1];
        $product_array = $info[2];
        $product_array = json_decode($product_array);
        $arr = array('product_array'=>'','index' => $index_id );
        foreach ($product_array as $key => $product) {
            if ($product[2] == $product_name && $product[3]==$product_variant){
                array_splice($product_array, $key, 1);
                $arr['product_array'] = json_encode($product_array);
                break;
            }
        }
        echo json_encode($arr);
    }
    
    function process_final_save_auto_add_product(){
        $page_id = $_REQUEST['page_id'];
        $value = $_REQUEST['product_details'];
        $auto_add_clear_cart = $_REQUEST['auto_add_clear_cart'];
        add_page_meta($page_id, 'auto_add_products' , $value);
        add_page_meta($page_id, 'auto_add_clear_cart' , $auto_add_clear_cart);
        echo $page_id;
    }
?>