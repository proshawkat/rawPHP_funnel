<?php
session_recovery( SESSIONNAME );
if( isset( $_SESSION[ SESSIONNAME ]['shop'] ) ) {
	$shop_id = $_SESSION[ SESSIONNAME ]['shop_id'];
	$shop_name = get_shop_meta( $shop_id, 'shop_name');
	form_processor();
}else {
	header("location:".BASE."/login");
	die();
}

?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="content-type" content="text/html;charset=utf-8" />
		<title>Funnel Buildr</title>
		<link rel="icon" href="<?php echo BASE.'/files/dashboard/images/favicon.png'; ?>" type="image/gif" sizes="16x16">
		<link rel="stylesheet" type="text/css" href="<?php echo BASE; ?>/files/css/style.css?ver=<?php echo SCRIPT_VERSION ?>" />
		<link rel="stylesheet" type="text/css" href="<?php echo BASE; ?>/files/css/loading_style.css?ver=<?php echo SCRIPT_VERSION ?>"/>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
		<!-- msc-popup -->
		<link rel="stylesheet" type="text/css" href="<?php echo BASE; ?>/files/css/msc-style.css" />
		<!-- Font Awesome -->
		<link href="<?php echo BASE; ?>/files/dashboard/css/font-awesome.css" rel="stylesheet">
		<!-- NProgress -->
		<link href="<?php echo BASE; ?>/files/dashboard/css/nprogress.css" rel="stylesheet">
		<!-- iCheck -->
		<link href="<?php echo BASE; ?>/files/dashboard/css/green.css" rel="stylesheet">
		<!-- bootstrap-progressbar -->
		<link href="<?php echo BASE; ?>/files/dashboard/css/bootstrap-progressbar-3.3.4.min.css" rel="stylesheet">
		<!-- JQVMap -->
		<link href="<?php echo BASE; ?>/files/dashboard/css/jqvmap.css" rel="stylesheet"/>
		<!-- bootstrap-daterangepicker -->
		<link href="<?php echo BASE; ?>/files/dashboard/css/daterangepicker.css" rel="stylesheet">
		<!-- Custom Theme Style -->
		<link href="<?php echo BASE; ?>/files/dashboard/css/custom.min.css" rel="stylesheet">
		<!-- Minicolors Style -->
		<link href="<?php echo BASE; ?>/files/css/jquery.minicolors.css" rel="stylesheet">
		<?php if( $option == 'default' && (get_shop_meta($shop_id, 'intro_tour') == false || (int)get_shop_meta($shop_id, 'intro_tour') <= 6)) { ?>
			<link href="<?php echo BASE; ?>/files/css/introjs.css" rel="stylesheet">
		<?php } ?>
		<!-- Loader Style -->
		<link href="<?php echo BASE; ?>/files/editorscript/css/loading_style.css?ver=<?php echo SCRIPT_VERSION ?>" rel="stylesheet">
		<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
		<!-- Funnel Builder style -->
		<?php if( $option == 'funnel' ) { ?>
			<link href="<?php echo BASE; ?>/files/css/funnel_builder.css?ver=<?php echo SCRIPT_VERSION ?>" rel="stylesheet">
		<?php } ?>
		<link rel='stylesheet prefetch' href='https://daneden.github.io/animate.css/animate.min.css'>
		<!--
				Stylesheets Ends
		-->
		<script src="<?php echo BASE; ?>/files/dashboard/js/jquery.min.js"></script>
		<style type="text/css">

			.backdrop{
				width: 100%;
			    display: flex;
			    min-height: 100%;
			    position: fixed;
			    right: 0px;
			    top: 0px;
			    z-index: 499;
			    background-color: #00000082;
			}
	      .wrapper_container{
	        width: 100%;
	        height: auto;
	      }
	      .main_wrapper{
	        width: 450px;
	        display: flex;
	        min-height: 100%;
	        position: fixed;
	        right: -370px;
	        top: 0px;
	        z-index: 500;
	      }
	      .done_count_div{
	        width: 100px;
	        height: 62px;
	        margin: auto;
	        background-color: #f8f9fa;
	      }

	      .done_count_div ul{
	        list-style: none;
		    padding: 7px;
		    box-shadow: 1px 0px 1px 1px #ccc;
		    text-align: center;
		    border-radius: 3px 0px 0px;
	      }

	      .done_count_div ul li{
	      	font-size: 14px;
	      }
	      .done_count_div ul li span{
	        color: #006400;
	        font-size: 18px;
	      }
	      .complete_msg_div{
	        float: right;
	        width: 100%;
	        padding-left: 2rem;
	        background: #f8f9fa;
	      }

	      .complete_msg_div .card{
	        border: 0px !important;
	        border-radius: 0px !important;
	        margin-top: 1rem; 
	        margin-bottom: 1rem;
	        background-color: #ffffff !important;
	        box-shadow: 2px 2px 0px 0px #ccc;
	      }

	      .complete_msg_div .card .card-header{
	        border: 0px !important;
	        border-radius: 0px !important;
	        background-color: #ffffff !important;
	      }
	      .complete_msg_div .card-body{
	      	border-top: 1px solid #ccc;
	        padding: 0px 15px 10px 15px;
	      }

	      .card_header_wrapper{
	        width: 100%;
	        display: flex;
	      }

	      .card_header_wrapper .card_header_fa{
	        margin: auto;
	        padding-left: 10px;
	        font-size: 23px;
	        color: #64da16;
	      }

	      .card_header_wrapper .card_header_fa .fa-check-circle{
	        color: #006400;
	      }
	      
	      .not_done_yet{
	        color: #696969 !important;
	      }

	      .card_header_wrapper .card_header_fa .fa-times{
	        color: #f00;
	      }

	      .complete_msg_div .mb-0{
	        cursor: pointer;
	      }

	      .card_header_wrapper .card_header_title{
	        padding: 1rem 2rem;
	        color: #006400;
	      }

	      .card_header_wrapper .card_header_title h5{
	        font-size: 16px;
	      }

	      .card_header_wrapper .card_header_title p{
	        font-size: 14px;
	        color: #7e886a;
	      }

	      .card_header_wrapper .card_header_right_fa{
	        margin: auto;
	        color: #ededee;
	        font-size: 30px;
	        padding-right: 2rem;

	      }

      	.complete_msg_div .top_card.card{
			background-color: transparent !important;
			box-shadow: none;
		}
		.complete_msg_div .top_card .card-header{
			background-color: transparent !important;
		}

		.complete_msg_div .card_header_left{
			font-size: 30px;
			width: 62px;
			background: #00bbe0;
			margin: auto;
			display: flex;
			border-radius: 50px;
		}
		.complete_msg_div .card_header_left i{
			margin: auto;
			padding: 10px;
			color: #fff;
		}

		.complete_msg_div .card_header_title_top{
			padding: 0px 2rem;
			width: 100%;
			color: #21272f;
			margin: auto;
		}

		.complete_msg_div .card_header_title_top h5{
			font-size: 1.4rem;
		}

		.complete_msg_div .card_header_right span.percen{
			color: #00bbe0;
			font-size: 18px;
		}

		.complete_msg_div .card_header_right span{
			font-size: 10px;
		}
		.complete_msg_div .card_header_right{
			padding-top: 15px;
		}
		.card_body_section{
	       width: 100%;
	       min-height: 150px;
	     }
	     
	     .card_body_col_wrapper{
	       width: 100%;
	       min-height: 150px;
	       display: flex;
	     }

	     .card_body_col{
	       width: 100px;
	       margin: auto;
	     }

	     .card_body_img{
	       width: 100px;
	     }

	     .card_body_img img{
	       width: 102px;
	     }

	     .card_body_footer{
	       width: 100%;
	       min-height: 40px;
	       text-align: center;
	     }

	     .card_body_footer .a_class{
	       width: 93%;
	       min-height: 40px;
	       margin:auto;
	       background-color: #00bbe0;
	       color: #fff;
	       border: 0px;
	       margin-right: -2px;
	     }

	     .card_body_fa{
	       width: 30px;
	       margin: auto;
	       text-align: center;
	     }
		::-webkit-scrollbar {
		  display: none;
		}
	</style>
    </head>
    <body class="nav-md">
		<div class="container body">
		  	<div class="main_container">
				<div class="col-md-3 left_col">
				  	<div class="left_col scroll-view">
						<div class="navbar nav_title" style="border: 0;">
						  <a href="<?php echo BASE;?>" class="site_title"><img src="<?php echo BASE.'/files/dashboard/images/funnel-v2-logo.svg'; ?>" style="width: 15%; min-width: 33px;"> <span>Funnel Buildr</span></a>
						</div>
						<!-- menu profile quick info -->
						<div class="profile" style="text-align:center;">
						  	<div class="">
								<span style="color:white;font-size:14px;">Welcome, </span><span  style="color:white;font-size:14px;"><?php echo $_SESSION[ SESSIONNAME]['shop_owner'] ?></span>
								<h5 style="color:white;"><a target="_blank" href="https://<?php echo $_SESSION[ SESSIONNAME]['shop'] ?>" style="color:white;"><?php echo $shop_name ; ?></a> | <a href="<?php echo BASE ?>/default/?process=logout" style="color:white">Logout</a></h5>
						  	</div>
						</div>
						<!-- /menu profile quick info -->
						<br />
						<div class="clearfix"></div>
						<!-- sidebar menu -->
						<div id="sidebar-menu" class="main_menu_side hidden-print ">
						  	<div class="menu_section">
								<ul class="nav side-menu">
									<li  id ="home" ><a a href="<?php echo BASE;?>/home"><i class="fa fa-home" style="font-size: 18px;"></i> Dashboard</a></li>
									<li  id ="pages"><a a href="<?php echo  BASE;?>/pages"><i class="fa fa-clone" style="font-size: 18px;"></i> Pages</a></li>
									<li id ="funnels" ><a a href="<?php echo  BASE;?>/all_funnels"><i class="fa fa-sitemap" style="font-size: 18px;"></i> Funnels</a></li>
									<?php
										if (htmlentities( get_shop_meta($shop_id, "rc_token") ) != ''){ ?>
											<li id ="orders_recharge" ><a a href="<?php echo  BASE;?>/orders_recharge"><i class="fa fa-retweet" style="font-size: 18px;"></i> Recharge orders</a></li>
									<?php	}
									?>

									<li id ="performance" ><a href="<?php echo  BASE;?>/global_statistics/" ><i class="fa fa-bar-chart-o" style="font-size: 18px;"></i> Performance</a></li>
									<li  id ="settings" ><a href="javascript:void 0;" ><i class="fa fa-cogs" style="font-size: 18px;"></i> Settings  </a>
										<ul class="nav child_menu" style="display: none;">
										  	<li><a id="intro_general_settings" href="<?php echo BASE;?>/settings"> General settings</a></li>
										  	<li><a id="intro_checkout_settings" href="<?php echo  BASE;?>/checkout_settings"> Checkout settings</a></li>
										  	<li><a href="<?php echo  BASE;?>/thank_you_settings">Thank you page settings</a></li>
											<li><a href="<?php echo  BASE;?>/message_settings">Message settings</a></li>
										</ul>
									</li>
									<li id ="help" ><a href="javascript:void 0;" ><i class="fa fa-windows" style="font-size: 18px;"></i> Help</a>
										<ul class="nav child_menu" style="display: none;">
										  	<li><a target="_blank" href="http://help.ecomisoft.com/funnel-buildr-2-0"> Support</a></li>
										  	<li><a href="<?php echo  BASE;?>/feedback"> Feedback</a></li>
										</ul>
									</li>
									<li id="logout_small_screen" style="display: none;"><a  href="<?php echo BASE ?>/default/?process=logout"><i class="fa fa-sign-out" style="font-size: 18px;"></i> Log out</a></li>
								</ul>
						  	</div>
						</div>
						<!-- /sidebar menu -->
				  	</div>
				</div>

				<!-- top navigation -->
				<div class="top_nav">
				  	<div class="nav_menu">
						<nav>
					  		<div class="nav toggle">
								<a id="menu_toggle"><i style="margin-top:-17px;"class="fa fa-bars"></i></a>
					  		</div>
						</nav>
				  	</div>
				</div>
				<div class="right_col" role="main">
				<br/>
				<div class="clearfix"></div>
