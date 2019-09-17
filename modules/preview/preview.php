<?php 
	header('Access-Control-Allow-Origin: *');
	$_REQUEST['shop'] = $_SESSION[ SESSIONNAME ]['shop'];
	$shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];
	form_processor();
	$token = $_SESSION[ SESSIONNAME ]['token'];
	module_include("page_creator");
	if( isset( $_REQUEST['page'] ) ) {
		$page_id = $_REQUEST['page'];
		display_page( $page_id );
	}
?>
