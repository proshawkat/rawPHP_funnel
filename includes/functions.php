<?php
/*
 * Project: Double-P Framework
 * Copyright: 2011-2012, Moin Uddin (pay2moin@gmail.com)
 * Version: 1.0
 * Author: Moin Uddin
 */
function heading()
{
    module_include("header");
}

function footing()
{
    $base=BASE;
    module_include("footer");
}

function set_flash_message($message, $flag)
{
    $_SESSION['flash']['message']=$message;
    $_SESSION['flash']['type']=$flag;
}

function get_flash_message()
{
    if(isset($_SESSION['flash']))
    {
        $message=array('message'=>$_SESSION['flash']['message'], 'type'=>$_SESSION['flash']['type']);
        unset($_SESSION['flash']);
        return $message;
    }
    else return 0;
}

function logged_in()
{
    if( isset( $_SESSION['shop'] ) ) {
            return true;
      } else return false;
}

//following function returns the id of current user
function current_user_info($parameter)
{
    if(isset($_SESSION['auth_user'][$parameter])) return $_SESSION['auth_user'][$parameter];
    else return false;
}

function db_connect()
{
      $link=mysql_connect(DB_HOST, DB_USER, DB_PASSWORD) or die('<h1>Could not connect to database</h1>');
      mysql_select_db(DB_NAME,$link) or die('<h1>Could not connect to database</h1>');
      return $link;
}

function module_include($module)
{
    global $option, $mysqli;
      if(file_exists("modules/".$module."/".$module.".php")) include("modules/".$module."/".$module.".php");
}

function form_processor()
{
      if(isset($_REQUEST['process']))
      {
            $func="process_".$_REQUEST['process'];
            $func();
            die();
      }
}

//following function creates a pagination
function paginate($total, $current_page, $total_every_page, $url)
{

    $total_pages=$total/$total_every_page;
    if($total_page>round($total_page)) $total_pages=round($total_pages)+1;

    if($current_page>1) echo "<a href='".$url."/page/".($current_page-1)."'><input type='submit' value='<<<Previous'></a>";
    if($current_page<($total_pages)) echo "<a href='".$url."/page/".($current_page+1)."'><input type='submit' value='Next>>>'></a>";
}

function upload_an_image($max_size, $prefix, $valid_exts) {
    $path = FILEUPLOAD; // upload directory

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
                //echo 'Invalid file!';
            }
        } else {
            //echo 'File not uploaded!';
        }
    } else {
        //echo 'Bad request!';
    }
}

function add_shop_meta( $shop_id, $meta_name, $value ) {
        global $mysqli;
        $res = $mysqli->query("SELECT meta_id FROM shops_meta WHERE meta_name='$meta_name' AND shop_id='$shop_id'");
        if( $res->num_rows > 0 ) {
              $arr = $res->fetch_array( MYSQLI_ASSOC );
              $mysqli->query("UPDATE shops_meta SET meta_value='" . $mysqli->real_escape_string( $value ) . "' WHERE meta_id='" . $arr['meta_id'] . "'");
        } else $mysqli->query("INSERT INTO shops_meta (shop_id, meta_name, meta_value) VALUES ('" . $shop_id . "', '" . $mysqli->real_escape_string( $meta_name ) . "', '" . $mysqli->real_escape_string( $value ) . "')");
        return true;
}

function delete_shop_meta( $shop_id, $meta_name ) {
        global $mysqli;
        $res = $mysqli->query("DELETE FROM shops_meta WHERE shop_id='$shop_id' AND meta_name='" . $mysqli->real_escape_string( $meta_name ) . "'");
        return true;
}

function get_shop_meta( $shop_id, $meta_name ) {
        global $mysqli;
        $res = $mysqli->query("SELECT meta_value FROM shops_meta WHERE meta_name='$meta_name' AND shop_id='$shop_id'");
        if( $res->num_rows > 0 ) {
            $arr = $res->fetch_array( MYSQLI_ASSOC );
            return $arr['meta_value'];
        } else return false;
}

function add_page_meta( $page_id, $meta_name, $value ) {
    global $mysqli;
    $res = $mysqli->query("SELECT id FROM pages_meta WHERE meta_name='$meta_name' AND page_id='$page_id'");
    if( $res->num_rows > 0 ) {
        $arr = $res->fetch_array( MYSQLI_ASSOC );
        $mysqli->query("UPDATE pages_meta SET meta_value='" . $mysqli->real_escape_string( $value ) . "' WHERE id='" . $arr['id'] . "'");
    } else $mysqli->query("INSERT INTO pages_meta (page_id, meta_name, meta_value) VALUES ('" . $page_id . "', '" . $mysqli->real_escape_string( $meta_name ) . "', '" . $mysqli->real_escape_string( $value ) . "')");
    return true;
}

function add_uploads_meta( $shop_id, $type, $url ) {
    global $mysqli;
    $mysqli->query("INSERT INTO uploads (shop_id, type, url, upload_date, status) VALUES ('" . $shop_id . "', '" . $mysqli->real_escape_string( $type ) . "', '" . $mysqli->real_escape_string( $url ) . "', '" . $mysqli->real_escape_string( date("Y-m-d H:i:s") ) . "', '0')");
    return true;
}

function delete_uploads_meta( $f_url ) {
    global $mysqli;
    $res = $mysqli->query("DELETE FROM uploads WHERE url='$f_url'");
    return true;
}

function delete_page_meta( $page_id, $meta_name ) {
    global $mysqli;
    $res = $mysqli->query("DELETE FROM pages_meta WHERE page_id='$page_id' AND meta_name='" . $mysqli->real_escape_string( $meta_name ) . "'");
    return true;
}

function get_page_meta( $page_id, $meta_name ) {
    global $mysqli;
    $res = $mysqli->query("SELECT meta_value FROM pages_meta WHERE meta_name='$meta_name' AND page_id='$page_id'");
    if( $res->num_rows > 0 ) {
        $arr = $res->fetch_array( MYSQLI_ASSOC );
        return $arr['meta_value'];
    } else return false;
}

function add_funnel_meta( $funnel_id, $meta_name, $value ) {
    global $mysqli;
    $res = $mysqli->query("SELECT id FROM funnels_meta WHERE meta_name='$meta_name' AND funnel_id='$funnel_id'");
    if( $res->num_rows > 0 ) {
        $arr = $res->fetch_array( MYSQLI_ASSOC );
        $mysqli->query("UPDATE funnels_meta SET meta_value='" . $mysqli->real_escape_string( $value ) . "' WHERE id='" . $arr['id'] . "'");
    } else $mysqli->query("INSERT INTO funnels_meta (funnel_id, meta_name, meta_value) VALUES ('" . $funnel_id . "', '" . $mysqli->real_escape_string( $meta_name ) . "', '" . $mysqli->real_escape_string( $value ) . "')");
    return true;
}

function delete_funnel_meta( $funnel_id, $meta_name ) {
    global $mysqli;
    $res = $mysqli->query("DELETE FROM funnels_meta WHERE funnel_id='$funnel_id' AND meta_name='" . $mysqli->real_escape_string( $meta_name ) . "'");
    return true;
}

function get_funnel_meta( $funnel_id, $meta_name ) {
    global $mysqli;
    $res = $mysqli->query("SELECT meta_value FROM funnels_meta WHERE meta_name='$meta_name' AND funnel_id='$funnel_id'");
    if( $res->num_rows > 0 ) {
        $arr = $res->fetch_array( MYSQLI_ASSOC );
        return $arr['meta_value'];
    } else return false;
}

function diff_with_current_time( $time ) {

    $current_time = date("Y-m-d H:i:s");
    return $diff = ( strtotime( $current_time ) - strtotime( $time ) );
}

function upload_the_image($index, $max_size, $prefix, $dir)
{
    $valid_exts = array('jpeg', 'jpg', 'png', 'gif'); // valid extensions
    //$max_size = 200 * 1024; // max file size
    $path = $dir."/"; // upload directory

    //temp
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if( ! empty($_FILES[ $index ]) ) {
            // get uploaded file extension
            echo $ext = strtolower(pathinfo($_FILES[ $index ]['name'], PATHINFO_EXTENSION));

            // looking for format and size validity
            if (in_array($ext, $valid_exts) AND $_FILES[ $index ]['size'] < $max_size*50) {

                $path = $path . uniqid(). $prefix.rand(0,100).'.' .$ext;
                // move uploaded file from temp to uploads directory
                if (move_uploaded_file($_FILES[ $index ]['tmp_name'], $path)) {
                    return BASE . '/' . $path;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function upload_ajax_image($max_size, $prefix, $dir) {
    $_FILES['image']=$_FILES['photos'];
    $valid_exts = array('jpeg', 'jpg', 'png', 'gif'); // valid extensions
    $max_size = 200 * 1024; // max file size
    $path = $dir . "/"; // upload directory

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if( ! empty($_FILES['image']) ) {
            // get uploaded file extension
            $ext = strtolower(pathinfo($_FILES['image']['name'][0], PATHINFO_EXTENSION));
            // looking for format and size validity
            if (in_array($ext, $valid_exts) AND $_FILES['image']['size'][0] < $max_size*50) {
                $path = $path . uniqid(). $prefix.rand(0,100).'.' .$ext;
                // move uploaded file from temp to uploads directory
                if (move_uploaded_file($_FILES['image']['tmp_name'][0], $path)) {
                    return BASE . '/' . $path;
                } else echo "Error";
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function ecomisoft_license_authenticated( $shop, $base ) {
    $authenticate = file_get_contents( 'https://funnelbuildrapp.com/?process=authenticate&shop=' . $shop . '&base=' . urlencode( $base ) );
    if( trim( $authenticate ) == 1 ) return true;
    else {
        module_include('login_failed');
        return false;
    }
}

function get_shop_favicon( $shop ) {
    $favicon = "";
    $html = file_get_contents( 'https://' . $shop );
    if( strpos( $html, 'shortcut icon' ) !== false ) {
        $br = explode( 'shortcut icon', $html );
        $br = explode( 'href="', $br[1] );
        $br = explode( '"', $br[1] );
        $favicon = trim( $br[0] );
    }
    return $favicon;
}

function format_money( $amount, $money_format ) {
    return str_replace( '{{amount}}', $amount, $money_format );
}

function ecomisoft_slogan() {
    return '';
}

function ecomisoft_notice() {
    return '';
}

function primary_footer() {
    return '';
}

function secondary_footer() {
    return '';
}
/*
$funnel = array(
    'landing'
);
*/

function pagination_for_pages($page, $num_page) {
    $next_page=$page+1;
    $previous_page=$page-1;
    echo'<div class="text-center" style="font-size:10px;"><nav style="display: inline-block;"> <ul style= "margin:4px;"class="pagination"> ';
        if ($num_page==1) {

        }
        else if ($page==1 && $num_page>1) {
            echo'<li> <a href="' . BASE . '/pages/?page=' . $next_page .'" aria-label="Next"><span aria-hidden="true"><i class="glyphicon glyphicon-chevron-right"></i></span></a></li> ';
        }
        else if ($page==$num_page){
            echo'<li><a href="' . BASE . '/pages/?page=' . $previous_page . '" aria-label="Next"><span aria-hidden="true"><i class="glyphicon glyphicon-chevron-left"></i></span></a></li> ';
        }
        else {
            echo'<li><a href="' . BASE . '/pages/?page=' . $previous_page . '" aria-label="Next"><span aria-hidden="true"><i class="glyphicon glyphicon-chevron-left"></i></span></a></li>  <li><a href="' . BASE . '/pages/?page=' . $next_page .  '" aria-label="Next"><span aria-hidden="true"><i class="glyphicon glyphicon-chevron-right"></i></span></a></li> ';
        }
    echo'</ul></nav></div>';
}

function pagination_for_funnels($page, $num_page) {
    $next_page=$page+1;
    $previous_page=$page-1;
    echo'<div class="text-center" style="font-size:10px;"><nav style="display: inline-block;"> <ul style= "margin:4px;"class="pagination"> ';
        if ($num_page==1) {

        }
        else if ($page==1 && $num_page>1) {
            echo'<li> <a href="' . BASE . '/all_funnels/?funnel_page=' . $next_page .'" aria-label="Next"><span aria-hidden="true"><i class="glyphicon glyphicon-chevron-right"></i></span></a></li> ';
        }
        else if ($page==$num_page){
            echo'<li><a href="' . BASE . '/all_funnels/?funnel_page=' . $previous_page . '" aria-label="Next"><span aria-hidden="true"><i class="glyphicon glyphicon-chevron-left"></i></span></a></li> ';
        }
        else {
            echo'<li><a href="' . BASE . '/all_funnels/?funnel_page=' . $previous_page . '" aria-label="Next"><span aria-hidden="true"><i class="glyphicon glyphicon-chevron-left"></i></span></a></li>  <li><a href="' . BASE . '/all_funnels/?funnel_page=' . $next_page .  '" aria-label="Next"><span aria-hidden="true"><i class="glyphicon glyphicon-chevron-right"></i></span></a></li> ';
        }
    echo'</ul></nav></div>';
}

function aweber_campaign_list() {
    $shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];
    # Code example for finding a list by its name

    require_once('includes/aweber_api/aweber_api.php');

    # not sure where to find your keys?
    # check out our authorization getting started guide
    # https://labs.aweber.com/snippets/auth/getting_started

    $consumerKey    = get_shop_meta( $shop_id, 'consumerKey' );
    $consumerSecret = get_shop_meta( $shop_id, 'consumerSecret' );
    $accessKey      = get_shop_meta( $shop_id, 'accessKey' );
    $accessSecret   = get_shop_meta( $shop_id, 'accessSecret' );
    $listName       = ''; # replace with the name of the list

    $aweber = new AWeberAPI($consumerKey, $consumerSecret);

    try {
        $account = $aweber->getAccount($accessKey, $accessSecret);
        $lists = $account->lists->find(array('name' => $listName));

        foreach( $lists->data['entries'] as $list ) {
            $campaign_lists[] = array( 'name' => $list['name'], 'link' => str_replace( 'https://api.aweber.com/1.0', '', $list['self_link'] ) );
        }
    } catch(AWeberAPIException $exc) {
        /*print "<h3>AWeberAPIException:</h3>";
        print " <li> Type: $exc->type              <br>";
        print " <li> Msg : $exc->message           <br>";
        print " <li> Docs: $exc->documentation_url <br>";
        print "<hr>";*/
    }

    return $campaign_lists;
}

function mailchimp_lists() {
    $shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];
    $access_token = get_shop_meta( $shop_id, 'mailchimp_access_token' );
    $dc = get_shop_meta( $shop_id, 'mailchimp_dc' );
    $apikey = $access_token . '-' . $dc;

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://" . $dc . ".api.mailchimp.com/3.0/lists?count=250");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");

    curl_setopt($ch, CURLOPT_USERPWD, "anystring" . ":" . $apikey);

    $result = curl_exec($ch);
    if (curl_errno($ch)) {
        echo 'Error:' . curl_error($ch);
    }
    curl_close ($ch);

    $res = json_decode( $result );

    foreach( $res->lists as $list ) {
        $campaign_lists[] = array( 'id' => $list->id, 'name' => $list->name );
    }

    return $campaign_lists;
}

function drip_campaigns() {
    $shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];
    $access_token = get_shop_meta( $shop_id, 'drip_access_token' );
    $account_id = get_shop_meta( $shop_id, 'drip_account_id' );

    //get user's campaigns
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://api.getdrip.com/v2/" . $account_id . "/campaigns");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    $headers = array();
    $headers[] = "Accept: application/vnd.api+json";
    $headers[] = "Authorization: Bearer " . get_shop_meta( $shop_id, 'drip_access_token' );
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $result = curl_exec($ch);
    if (curl_errno($ch)) {
        echo 'Error:' . curl_error($ch);
    }
    curl_close ($ch);

    $res = json_decode( $result );

    foreach( $res->campaigns as $campaign ) {
        $campaigns[] = array( 'id' => $campaign->id, 'name' => $campaign->name );
    }

    //get user's workflows
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://api.getdrip.com/v2/" . $account_id . "/workflows");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    $headers = array();
    $headers[] = "Accept: application/vnd.api+json";
    $headers[] = "Authorization: Bearer " . get_shop_meta( $shop_id, 'drip_access_token' );
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    $result = curl_exec($ch);
    if (curl_errno($ch)) {
        echo 'Error:' . curl_error($ch);
    }
    curl_close ($ch);

    $res = json_decode( $result );

    foreach( $res->workflows as $workflow ) {
        $workflows[] = array( 'id' => $workflow->id, 'name' => $workflow->name );
    }

    $lists = array(
            'campaigns' =>  $campaigns,
            'workflows' =>  $workflows
        );

    return $lists;
}

function klaviyo_lists() {
    $shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];
    $api_key = get_shop_meta( $shop_id, 'klaviyo_api_key' );
    $i = 0;
    $count = 100;
    $all_found = false;
    while( !$all_found ) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "https://a.klaviyo.com/api/v1/lists?api_key=" . $api_key . "&page=" . $i . "&count=" . $count);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        $headers = array();
        $headers[] = "Content-Type: application/x-www-form-urlencoded";
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        $result = curl_exec($ch);
        if (curl_errno($ch)) {
            echo 'Error:' . curl_error($ch);
        }
        curl_close ($ch);

        $res = json_decode( $result );

        foreach( $res->data as $list ) {
            if( $list->list_type == 'list' ) $lists[] = array( 'id' => $list->id, 'name' => $list->name );
        }

        if( count( $res->data ) < $count ) $all_found = true;
        $i++;
    }
    return $lists;
}

function session_recovery( $session_id ) {
    if( ( isset( $_SESSION[ $session_id ] ) ) && ( !isset( $_COOKIE[ $session_id ] ) ) ) {
        foreach( array_keys( $_SESSION[ $session_id ] ) as $session_key ) {
            if( !is_array( $_SESSION[ $session_id ][ $session_key ] ) ) {
                $session_data[ $session_key ] = $_SESSION[ $session_id ][ $session_key ];
                setcookie($session_id . '_' . $session_key, $_SESSION[ $session_id ][ $session_key ], time() + (172800), "/");
            }
        }
        setcookie($session_id , 1, time() + (172800), "/");
    } elseif( ( !isset( $_SESSION[ $session_id ] ) ) && ( isset( $_COOKIE[ $session_id ] ) ) ) {
        foreach( array_keys( $_COOKIE ) as $cookie_key ) {
            if( strpos( $cookie_key, $session_id ) !== false ) {
                $_SESSION[ $session_id ][ str_replace( $session_id . '_', '', $cookie_key ) ] = $_COOKIE[ $cookie_key ];
            }
        }
    }
}

function session_flash_cookie( $session_id ) {
    if( isset( $_COOKIE[ $session_id ] ) ) {
        foreach( array_keys( $_COOKIE ) as $cookie_key ) {
            if( strpos( $cookie_key, $session_id ) !== false ) {
                $_SESSION[ $session_id ][ str_replace( $session_id . '_', '', $cookie_key ) ] = $_COOKIE[ $cookie_key ];
                setcookie($cookie_key, '', time() - 272800, "/");
            }
        }
    }
    unset( $_SESSION[ SESSIONNAME ] );
}

function humanTiming ($time)
{
    $times = $time;
    define( TIMEBEFORE_NOW,         'just now' );
    define( TIMEBEFORE_MINUTE,      '{num} minute ago' );
    define( TIMEBEFORE_MINUTES,     '{num} minutes ago' );
    define( TIMEBEFORE_HOUR,        '{num} hour ago' );
    define( TIMEBEFORE_HOURS,       '{num} hours ago' );
    define( TIMEBEFORE_YESTERDAY,   'yesterday' );
    $out    = ''; // what we will print out
    $now    = time(); // current time
    $diff   = $now - $time;

    if( $diff < 60 ) {
        return TIMEBEFORE_NOW;
    }
    elseif( $diff < 3600 ) {
        return str_replace( '{num}', ( $out = round( $diff / 60 ) ), $out == 1 ? TIMEBEFORE_MINUTE : TIMEBEFORE_MINUTES );
    }
    elseif( $diff < 3600 * 24 ){
        return str_replace( '{num}', ( $out = round( $diff / 3600 ) ), $out == 1 ? TIMEBEFORE_HOUR : TIMEBEFORE_HOURS );
    }
    elseif( $diff < 3600 * 24 * 2 ){
        return TIMEBEFORE_YESTERDAY;
    }else{
        return date('Y-m-d',$times);
    }

}

function trigger_klaviyo_events( $shop_id, $cart_token, $email , $first_name , $last_name , $total_price, $event_name, $order_id = '' ) {
    global $mysqli;
    include_once( 'includes/Klaviyo.php' );
    $mailer_service = get_shop_meta( $shop_id, 'mailer_service');
    $klaviyo_api_key = get_shop_meta( $shop_id, 'klaviyo_api_key' );
    if( ( $mailer_service == 'klaviyo') && ( $klaviyo_api_key != '' ) ) {
        $res = $mysqli->query("SELECT id, cart FROM carts WHERE token='$cart_token' AND shop_id='$shop_id'");
        $arr = $res->fetch_array( MYSQLI_ASSOC );

        $shop_domain = get_shop_meta( $shop_id, 'shop_domain');
        $force_ssl = get_shop_meta( $shop_id, 'force_ssl');
        $full_shop_url = ( $force_ssl > 0 ? 'https://' : 'http://' ) . $shop_domain;
        if( $order_id == '' ) {
            $checkout_url = $full_shop_url . SHOPIFY_PROXY_PREFIX . "/checkout/" . $cart_token . "/?ref=inbox";
        } else {
            $br = explode( '_', $cart_token );
            $checkout_url = $full_shop_url . SHOPIFY_PROXY_PREFIX . "/checkout/" . $br[0] . "/" . $arr['id'] . '/thank_you/';
        }

        $customer_properties = array(
            '$email'            => $email,
            '$first_name'       => $first_name,
            '$last_name'        => $last_name
            );

        $cart = json_decode( $arr['cart'] );
        $total_quantity =0;
        foreach( $cart->items as $item ) {
            $line_items[] = array(
                                    "Title"         =>  $item->product_title,
                                    "Description"   =>  $item->product_description,
                                    "Price"         =>  ( $item->price / 100 ),
                                    "Image"         =>  $item->image,
                                    "URL"           =>  $full_shop_url . $item->url,
                                    "Quantity"      =>  $item->quantity,
                                    "Line Price"    =>  ( $item->line_price / 100 )
                                    );
			$items[] =  $item->product_title;
			$total_quantity += $item->quantity;
        }
        $properties = array(
                                'Total Price' => $total_price,
                                'Total Quantity' => $total_quantity,
                                'Line Items' =>	$line_items,
                                'Items'			=> 	$items,
                                'Item Count'			=> 	count($items),
                                'Checkout URL' => $checkout_url
                            );
        if( $order_id != '' ) $properties['Order ID'] = $order_id;

        $tracker = new Klaviyo( $klaviyo_api_key );
        $tracker->track($event_name, $customer_properties, $properties);
    }
}

function taxjar_calculate_tax_rate( $source_zip_code, $source_state, $destination_zip_code, $destination_state ){
    $states=array(  "AL"=>"Alabama",
                    "AK"=>"Alaska",
                    "AS"=>"American Samoa",
                    "AZ"=>"Arizona",
                    "AR"=>"Arkansas",
                    "CA"=>"California",
                    "CO"=>"Colorado",
                    "CT"=>"Connecticut",
                    "DE"=>"Delaware",
                    "DC"=>"District of Columbia",
                    "FM"=>"Federated States of Micronesia",
                    "FL"=>"Florida",
                    "GA"=>"Georgia",
                    "GU"=>"Guam",
                    "HI"=>"Hawaii",
                    "ID"=>"Idaho",
                    "IL"=>"Illinois",
                    "IN"=>"Indiana",
                    "IA"=>"Iowa",
                    "KS"=>"Kansas",
                    "KY"=>"Kentucky",
                    "LA"=>"Louisiana",
                    "ME"=>"Maine",
                    "MH"=>"Marshall Islands",
                    "MD"=>"Maryland",
                    "MA"=>"Massachusetts",
                    "MI"=>"Michigan",
                    "MN"=>"Minnesota",
                    "MS"=>"Mississippi",
                    "MO"=>"Missouri",
                    "MT"=>"Montana",
                    "NE"=>"Nebraska",
                    "NV"=>"Nevada",
                    "NH"=>"New Hampshire",
                    "NJ"=>"New Jersey",
                    "NM"=>"New Mexico",
                    "NY"=>"New York",
                    "NC"=>"North Carolina",
                    "ND"=>"North Dakota",
                    "MP"=>"Northern Mariana Islands",
                    "OH"=>"Ohio",
                    "OK"=>"Oklahoma",
                    "OR"=>"Oregon",
                    "PW"=>"Palau",
                    "PA"=>"Pennsylvania",
                    "PR"=>"Puerto Rico",
                    "RI"=>"Rhode Island",
                    "SC"=>"South Carolina",
                    "SD"=>"South Dakota",
                    "TN"=>"Tennessee",
                    "TX"=>"Texas",
                    "UT"=>"Utah",
                    "VT"=>"Vermont",
                    "VI"=>"Virgin Islands",
                    "VA"=>"Virginia",
                    "WA"=>"Washington",
                    "WV"=>"West Virginia",
                    "WI"=>"Wisconsin",
                    "WY"=>"Wyoming",
                    "AA"=>"Armed Forces Americas",
                    "AE"=>"Armed Forces Europe",
                    "AP"=>"Armed Forces Pacific"
                );
    $ch = curl_init();
    $source_state = array_search($source_state,$states);
    $destination_state = array_search($destination_state,$states);
    curl_setopt($ch, CURLOPT_URL, "https://api.taxjar.com/v2/taxes");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, "{\n    \"from_country\": \"US\",\n    \"from_zip\": \"".$source_zip_code."\",\n    \"from_state\": \"".$source_state."\",\n    \n    \"to_country\": \"US\",\n    \"to_zip\": \"".$destination_zip_code."\",\n    \"to_state\": \"".$destination_state."\",\n    \n    \"amount\": 100,\n    \"shipping\": 0,\n    \n    \"line_items\": [\n      {\n        \"id\": \"1\",\n        \"quantity\": 1,\n        \"unit_price\": 100,\n        \"discount\": 0\n      }\n    ]\n  }");
    curl_setopt($ch, CURLOPT_POST, 1);
    $headers = array();
    $headers[] = "Authorization: Bearer " . TAXJAR_API_KEY;
    $headers[] = "Content-Type: application/json";
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    $result = curl_exec($ch);
    $result = json_decode( $result, true );
    return $result;
}

function get_abandoned_checkout_url( $cart_token ){
    global $mysqli;

    $funnel_shop_id = $mysqli->query("SELECT funnel_id , shop_id FROM carts WHERE token='$cart_token'");
    $funnel_shop_id = $funnel_shop_id->fetch_array ( MYSQLI_ASSOC );
    $funnel_id = $funnel_shop_id['funnel_id'];
    $shop_id   = $funnel_shop_id['shop_id'];

    $shop_domain = get_shop_meta( $shop_id, 'shop_domain');
    $force_ssl = get_shop_meta( $shop_id, 'force_ssl');
    $full_shop_url= ( $force_ssl > 0 ? 'https://' : 'http://' ) . $shop_domain;

    if($funnel_id > 0) {
        $funnel_code = $mysqli->query("SELECT meta_value FROM funnels_meta WHERE funnel_id='$funnel_id' AND meta_name = 'funnel_code' ");
        $funnel_code = $funnel_code->fetch_array ( MYSQLI_ASSOC );
        $funnel_code = $funnel_code['meta_value'] ;
        $funnel_code = json_decode( $funnel_code);

        $url_handle = $mysqli->query("SELECT meta_value FROM funnels_meta WHERE funnel_id='$funnel_id' AND meta_name = 'url_handle' ");
        $url_handle = $url_handle->fetch_array ( MYSQLI_ASSOC );
        $url_handle = $url_handle[meta_value];

        for ($i=0 ; $i<count($funnel_code); $i++){
            if ($funnel_code[$i]->type == 'checkout' && $funnel_code[$i]->pages != '' ) {
                $checkout_index = $i;
                return $full_shop_url.SHOPIFY_PROXY_PREFIX.'/f/'.$funnel_id.'/'.$checkout_index.'/'.$url_handle;
            }else if ($funnel_code[$i]->type == 'checkout' && $funnel_code[$i]->pages == '' ){
                return '';
            }
        }

    }else{
        return '';
    }

}

function make_db_start_date_format($temp_date){
    $date = strtotime($temp_date);
    $date = date('Y-m-d 00:00:00',$date);
    //return $date;
    return make_my_zone_time($date);
}
function make_db_end_date_format($temp_date){
    $date = strtotime($temp_date);
    $date = date('Y-m-d 23:59:59',$date);
    //return $date;
    return make_my_zone_time($date);
}

function get_user_time_zone_value($time_zone){
    $time_zone = explode('GMT', $time_zone);
    $time_zone = explode(')', $time_zone[1]);
    $time_zone = explode(':', $time_zone[0]);

    $dec = 0;
    if($time_zone[1] == 30){
        $dec = 5;
    }else if($time_zone[1] == 45){
        $dec = 75;
    }
    $GMT = $time_zone[0].'.'.$dec;
    return $GMT;
}

function make_my_zone_time($current_time){
    $shop_id = $_SESSION[SESSIONNAME]['shop_id'];
    $user_time_zone = get_shop_meta($shop_id,"shop_timezone");
    $user_time_zone_value = get_user_time_zone_value($user_time_zone);
    $offset=$user_time_zone_value*(60*60);
    $dateFormat="Y-m-d H:i:s";
    $new_time = strtotime($current_time)-$offset;
    $new_time = gmdate($dateFormat, $new_time);

    return $new_time;
}

function get_msg_val(){
    global $shop_id;
    $msg_arr = json_decode(get_shop_meta($shop_id,'translator_settings'));
    $default_msg = msg_default_value();
    $result = array();
    foreach ($default_msg as $meta_name => $msg) {
        if(empty($msg_arr->$meta_name)){
            $result[$meta_name] = $default_msg[$meta_name];
        }else{
            $result[$meta_name] = $msg_arr->$meta_name;
        }
    }
    return $result;
}

function msg_default_value(){
    return array(
        'product_available' => 'Product available',
        'out_of_stock' => 'Out of stock',
        'cart_empty_msg' => 'Your cart is currently empty',
        'error_shipping_method' => 'Please, complete your shipping address with zip code, state/territory/province and country information.',
        'error_shipping_form_email' =>'Please enter a valid email address',
        'error_shipping_last_name' => 'Please enter your last name',
        'error_shipping_address' => 'Please enter your address',
        'error_shipping_city' => 'Please enter your city',
        'error_shipping_country' => 'Please select your country',
        'error_shipping_province' => 'Please select your state/province',
        'error_shipping_postal_code' => 'Please enter your zip/postal code',
        'card_messager_for_checkout_form' => 'Oops! Your billing info is incorrect.',
        'opt_in_message_success' => 'Thank you for subscribing',
        'opt_in_invalid_email' => 'Please enter valid email',
        'error_shipping_method2' => 'No shipping method found for your given shipping address',
        'card_details_msg' => 'All transactions are secure and encrypted. Credit card information is never stored.',
        'paypal_msg' => 'After clicking &#39;Complete order&#39;, you will be redirected to PayPal to complete your purchase securely.',
        'cart_subtotal' => 'Subtotal',
        'cart_shipping' => 'Shipping',
        'cart_taxes' => 'Taxes',
        'cart_total' => 'Total',
        'default_first_name_placeholder' => 'First name',
        'default_last_name_placeholder' => 'Last name',
        'default_email_placeholder' => 'Email',
        'default_address_placeholder' => 'Address',
        'default_apt_placeholder' => 'Apt, suite, etc. (optional)',
        'default_city_placeholder' => 'City',
        'default_postal_code_placeholder' => 'Zip/postal code',
        'default_phone_placeholder' => 'Phone',
        'default_credit_card_placeholder' => 'Card number',
        'default_exp_year_placeholder' => 'YY',
        'default_exp_month_placeholder' => 'MM',
        'default_cvv_placeholder' => 'CVV',
        'save_this_information_for_next_time' => 'Save this information for next time',
        'return_to_cart' => 'Return to cart',
        'continue_to_shipping_method' => 'Continue to shipping method',
        'show_order_summary'=> 'Show order summary',
        'hide_order_summary' => 'Hide order summary',
        'edit_shipping_address' => 'Edit shipping address',
        'return_to_customer_information' => 'Return to customer information',
        'continue_to_payment_method' => 'Continue to payment method',
        'same_as_shipping_address' => 'Same as shipping address',
        'use_a_different_billing_address' => 'Use a different billing address',
        'subscribe_to_our_newsletter' => 'Subscribe to our newsletter',
        'return_to_shipping_method' => 'Return to shipping method',
        'complete_order' => 'Complete order',
        'cart' => 'Cart',
        'customer_information' => 'Customer information',
        'shipping_method' => 'Shipping method',
        'payment_method' => 'Payment method',
        'billing_information' => 'Billing address',
        'shipping_information' => 'Shipping address',
        'redirecting_to_checkout_msg' => 'We are taking you to secure checkout by Shopify.',
        'do_not_reload_msg' => 'Please do not reload or close the tab.',
        'cart_bump_popup_title' => 'Please select variant',
        'cart_bump_add_to_cart_btn' => 'Add to cart',
        'cart_bump_cancel_btn' => 'Cancel',
        'cart_tax_prefix' => 'including',
        'cart_tax_suffix' => 'in tax',
    );
}

function modify_shopify_order_made_by_funnel_buildr(){
    global $mysqli;
    $shop_id = $_SESSION[SESSIONNAME]['shop_id'];
    $all_orders = [];
    $flag = 0;
    $shopify_last_order_id = '';
    $meta_found = false;
    require_once 'includes/shopify.php';
    $sc = new ShopifyClient($_SESSION[ SESSIONNAME ]['shop'], $_SESSION[ SESSIONNAME ]['token'], SHOPIFY_API_KEY, SHOPIFY_SECRET);
    if(get_shop_meta($shop_id,"shopify_last_order_id") == ""){
        $all_loaded = false;
        $page = 0;
        $per_page = 250;
        while( !$all_loaded ) {
            //check if the store is not a test shop
            $orders = $sc->call('GET', '/admin/orders.json?fields=id,cart_token,&page=' . $page . '&limit=' . $per_page );
            $sql_token_extension = '';
            foreach( $orders as $key => $order) {
                if($page == 0 && $flag == 0){
                    $shopify_last_order_id = $order['id'];
                    $flag = 1;
                }
                //process all order 
                if($order["cart_token"] != NULL){
                    $token = $order["cart_token"];
                    $sql_token_extension .= ( $sql_token_extension != '' ? " || " : "" ) . " token = '$token'";
                }
            }
            if( $sql_token_extension != '' ) $mysqli->query("UPDATE carts SET status=6 WHERE shop_id = '$shop_id' AND ( $sql_token_extension ) AND status = 0");
            if( count( $orders ) < $per_page ) $all_loaded = true;
            $page++;
        }
    }else{
        $all_loaded = false;
        $page = 0;
        $per_page = 250;
        while( !$all_loaded ) {
            //check if the store is not a test shop
            $orders = $sc->call('GET', '/admin/orders.json?since_id='.get_shop_meta($shop_id,"shopify_last_order_id").'&fields=id,cart_token,&page=' . $page . '&limit=' . $per_page );
            $sql_token_extension = '';
            foreach( $orders as $key => $order) {
                if($page == 0 && $flag == 0){
                    $shopify_last_order_id = $order['id'];
                    $flag = 1;
                }
                //process all order 
                if($order["cart_token"] != NULL){
                    $token = $order["cart_token"];
                    $sql_token_extension .= ( $sql_token_extension != '' ? " || " : "" ) . " token = '$token'";
                }
            }
            if( $sql_token_extension != '' ) $mysqli->query("UPDATE carts SET status=6 WHERE shop_id = '$shop_id' AND ( $sql_token_extension ) AND status = 0");
            if( count( $orders ) < $per_page ) $all_loaded = true;
            $page++;
        }
    }

    if($shopify_last_order_id != ''){
        add_shop_meta($shop_id,"shopify_last_order_id",$shopify_last_order_id);
    }
}



?>
