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


<div class="clearfix"></div>
<div class="col-md-12 col-sm-12 col-xs-12" id ="pages_div">
    <div class="x_panel">
        <div class="x_title">
            <h2>Feedback</h2>
            <div class="clearfix"></div>
        </div>
        <div class="x_content">
            <h3 class="text-center">We would like your feedback to improve our application</h3>
            <h5 class="text-center">What is your opinion on this application</h5>
            <input type="number" id="hidden_rating" value="<?php echo((int)get_shop_meta($shop_id,'user_rating') != false ? (int)get_shop_meta($shop_id,'user_rating') : 3); ?>" hidden>
            <input type="text" id="shop_id" value="<?php echo $shop_id; ?>" hidden>
            <p class="text-center" style="font-size:40px !important;">
                <style type="text/css">
                    .checked {
                        color: orange !important;
                    }
                </style>
                <script type="text/javascript">
                    function change_rating_status(id){
                        $('#hidden_rating').val(id);
                        for (var i = 0; i < 6; i++) {
                            if (i <= id) {
                                $( "#rating_"+i ).addClass( "checked" );
                                $( "#rating_"+i ).addClass( "fa-star" );
                                $( "#rating_"+i ).removeClass( "fa-star-o" );
                            }
                            else{
                                $( "#rating_"+i ).removeClass( "checked" );
                                $( "#rating_"+i ).removeClass( "fa-star" );
                                $( "#rating_"+i ).addClass( "fa-star-o" );
                            }
                        }
                    }
                </script>
            <?php
                for ($i=1; $i <= 5; $i++) { 
                    if (!get_shop_meta($shop_id,'user_rating')) {
                        if ($i <= 3 ) {
                            echo '<span onclick="change_rating_status('.$i.');" class="fa fa-star checked" id="rating_'.$i.'"></span>';
                        }
                        else{
                            echo '<span onclick="change_rating_status('.$i.');" class="fa fa-star-o" id="rating_'.$i.'"></span>';
                        }
                    }
                    else{
                        if ($i <= (int)get_shop_meta($shop_id,'user_rating')) {
                            echo '<span onclick="change_rating_status('.$i.');" class="fa fa-star checked" id="rating_'.$i.'"></span>';
                        }
                        else{
                            echo '<span onclick="change_rating_status('.$i.');" class="fa fa-star-o" id="rating_'.$i.'"></span>';
                        }
                    }
                }
            ?>
            </p>
            <h5>Give us your feedback</h5>
            <div class="form-group">
                <label for="comment">Feedback:</label>
                <textarea class="form-control" rows="5" id="feedback_text"></textarea>
            </div>
            <div class="row">
                <div class="col-md-12 col-sm-12 col-xs-12">
                    <button class="btn btn-info pull-right" onclick="update_feedback_status();" style="background-color: #337ab7; border-color: #337ab7;">Update</button>
                </div>
            </div>

        </div>
    </div>	

</div>	

<?php
    footing();


    function process_save_feedback(){
        add_shop_meta($_REQUEST['shop_id'], 'user_rating', $_REQUEST['rating']);
        $feedback_json = get_shop_meta($_REQUEST['shop_id'], 'feedback_text');
        if($_REQUEST['feedback_text'] != ""){
            if (!$feedback_json) {
                $feedback_json = array();
                $feedback_json[] = $_REQUEST['feedback_text'];    
            }else{
                $feedback_json = json_decode($feedback_json,true);
                array_push($feedback_json, $_REQUEST['feedback_text']);
            }
            $feedback_json = json_encode($feedback_json);
            add_shop_meta($_REQUEST['shop_id'], 'feedback_text', $feedback_json);
        }
        
    }
?>