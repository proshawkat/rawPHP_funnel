<?php
	if( isset( $_REQUEST['shop'] ) && isset( $_REQUEST['token'] ) ) {
		$res = $mysqli->query("SELECT id FROM shops WHERE shop='" . $_REQUEST['shop'] . "'");
		if( $res->num_rows > 0 ) {
			$arr = $res->fetch_array(MYSQLI_ASSOC);
			session_flash_cookie( SESSIONNAME );
			$_SESSION[ SESSIONNAME ]['shop'] = $_REQUEST['shop'];
			$_SESSION[ SESSIONNAME ]['token'] = $_REQUEST['token'];
			$_SESSION[ SESSIONNAME ]['shop_id'] = $arr['id'];
			$_SESSION[ SESSIONNAME ]['not_owner'] = 'true';
			header("location:" . BASE . "/home");
		}
	}
?>