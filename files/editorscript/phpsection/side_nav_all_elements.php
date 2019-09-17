<div class="sidenav_container">
	<div id="sidenav-for-all-element" class="sidenav-for-all-element" style="visibility:hidden;">
		<div class="sidenav-panel-container" id="sidenav-panel-container">
			<div class="sidenav-panel-content" id="sidenav-panel-content">
			  <ul class="ul">
				<li  class="li" id="menu-list-all"  onclick="show_menu_div(this , 'menu-div-all')"><a  ><i class="glyphicon glyphicon-th"></i> ALL</a></li>
				<li  class="li" id="menu-list-text"  onclick="show_menu_div(this ,'menu-div-text')"><a ><i class="glyphicon glyphicon-font" ></i> TEXT</a></li>
				<li  class="li" id="menu-list-media"  onclick="show_menu_div(this,'menu-div-media')"><a ><i class="glyphicon glyphicon-play" ></i> MEDIA</a></li>
				<li  class="li" id="menu-list-form"   onclick="show_menu_div(this,'menu-div-form')"><a ><i class="glyphicon glyphicon-envelope" ></i> FORM</a></li>
				<li  class="li" id="menu-list-countdown" onclick="show_menu_div(this,'menu-div-countdown')"><a ><i class="glyphicon glyphicon-hourglass" ></i> COUNTDOWN</a></li>
				<li class="li"><a href="#" data-toggle="modal" data-target="#custom_snippet" onclick="close_all_option(); show_snippet_panel('main');"><i class="fa fa-code" aria-hidden="true"></i> SNIPPET</a></li>
				<li class="li"><a href="#" data-toggle="modal" data-target="#personal_library" onclick="close_all_option();"><i class="fa fa-bookmark" aria-hidden="true"></i> Library</a></li>
				<?php if(count($shopify_drag_and_drop_element)>0){?>
					<li  class="li" id="menu-list-misc" onclick="show_menu_div(this,'menu-div-misc')"><a ><i class="glyphicon glyphicon-align-justify" ></i> SHOPIFY</a></li>
				<?php } ?>
			  </ul>
			</div>
		</div>
	</div>

	<div style="visibility:hidden;" id ="all-element-holder">
		<div class="menu-div-all side_panel_pull_left_border" id="menu-div-all"  >
			<div class="scrollbar" id="scrollbar">
				<div class="img" onclick="open_popup('custom_snippet');show_snippet_visual();">
					<i class="fa fa-code fa-2x" aria-hidden="true"></i>
					<div class="desc">
						<b>Rich text</b>
					</div>
				</div>			  	
				<div class="img drag_me_panel_to_editor" id="static-headline" onclick="add_me_to_editor_preview(this)">
				  <i class="fa fa-header fa-2x"></i>
				  <div class="desc ">
						<b>Headline</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="static-sub-headline" onclick="add_me_to_editor_preview(this)">
					<i class="fa fa-font fa-2x"></i>
				  <div class="desc">
						<b>Sub-headline</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="static-paragraph" onclick="add_me_to_editor_preview(this)">
					<i class="fa fa-paragraph fa-2x"></i>
				  <div class="desc">
						<b>Paragraph</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="anchor_tag" onclick="add_me_to_editor_preview(this)">
					<i class="fa fa-link fa-2x"></i>
				  <div class="desc">
						<b>Anchor tag</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="static-image" onclick="add_me_to_editor_preview(this)">
					<i class="fa fa-photo fa-2x"></i>
				  <div class="desc">
						<b>Demo image</b>
				  </div>
				</div>	
				<div class="img drag_me_panel_to_editor" id="linked_image" onclick="add_me_to_editor_preview(this)">
					<i class="fa fa-photo fa-2x"></i>
				  <div class="desc">
						<b>Linked image</b>
				  </div>
				</div>					
				<div class="img drag_me_panel_to_editor" id="static-video" onclick="add_me_to_editor_preview(this)">
					<i class="fa fa-youtube-play fa-2x"></i>
				  <div class="desc">
						<b>Video</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="static-timer" onclick="add_me_to_editor_preview(this)">
					<i class="fa fa-clock-o fa-2x"></i>
				  <div class="desc ">
						<b>Timer</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="static-ever-green-timer" onclick="add_me_to_editor_preview(this)">
					<i class="fa fa-clock-o fa-2x"></i>
					<div class="desc ">
						<b>Evergreen timer</b>
					</div>
				</div>
				<div class="img drag_me_panel_to_editor" id="static-date_and_time" onclick="add_me_to_editor_preview(this)">
					<i class="fa fa-clock-o fa-2x"></i>
				  <div class="desc ">
						<b>Date & Time</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="static-iframe" onclick="add_me_to_editor_preview(this)">
					<i class="fa fa-link fa-2x"></i>
				  <div class="desc">
						<b>Iframe</b>
				  </div>
				</div>	

				<div class="img drag_me_panel_to_editor" id="static-navbar" onclick="add_me_to_editor_preview(this)">
				  <i class="fa fa-link fa-2x"></i>  				  	                                                
				  <div class="desc">
				        <b>Navigation bar</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="input_first_name" onclick="add_me_to_editor_preview(this)">
				      <i class="fa fa-pencil-square-o fa-2x"></i>
				  <div class="desc">
				        <b>Input first name</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="input_last_name" onclick="add_me_to_editor_preview(this)">
				      <i class="fa fa-pencil-square-o fa-2x"></i>
					  <div class="desc">
					        <b>Input last name</b>
					  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="input_email" onclick="add_me_to_editor_preview(this)">
				      <i class="fa fa-pencil-square-o fa-2x"></i>
					  <div class="desc">
				        <b>Input email</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="input_subscribe_button" onclick="add_me_to_editor_preview(this)">
				      <i class="fa fa-square-o fa-2x"></i>    
				   <div class="desc">
				        <b>Button subscribe</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="static-textarea" onclick="add_me_to_editor_preview(this)">
				      <i class="fa fa-align-center fa-2x"></i>    
				   <div class="desc">
				        <b>Textarea</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="checkout_form" onclick="add_me_to_editor_preview(this)">
				      <i class="fa fa-wpforms fa-2x"></i>        
				  <div class="desc">
				        <b>Checkout form</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="paypal_checkout_form" onclick="add_me_to_editor_preview(this)">
				      <i class="fa fa-wpforms fa-2x"></i>        
				  <div class="desc">
				        <b>Paypal checkout</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="paypal_and_card_checkout_form" onclick="add_me_to_editor_preview(this)">
				      <i class="fa fa-wpforms fa-2x"></i>        
				  <div class="desc">
				        <b>Card & paypal checkout</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="two_step_checkout" onclick="add_me_to_editor_preview(this)">
				      <i class="fa fa-wpforms fa-2x"></i>        
				  <div class="desc">
				        <b>Two step checkout</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="two_step_card_checkout" onclick="add_me_to_editor_preview(this)">
				      <i class="fa fa-wpforms fa-2x"></i>        
				  <div class="desc">
				        <b>Two step checkout only card</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="two_step_paypal_checkout" onclick="add_me_to_editor_preview(this)">
				      <i class="fa fa-wpforms fa-2x"></i>        
				  <div class="desc">
				        <b>Two step checkout only paypal</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="static-email-model" onclick="add_me_to_editor_preview(this)">
				      <i class="fa fa-wpforms fa-2x"></i>        
				  <div class="desc">
				        <b>Opt-in</b>
				  </div>
				</div>	 
				<div class="img drag_me_panel_to_editor" id="shipping_form" onclick="add_me_to_editor_preview(this)">
				      <i class="fa fa-wpforms fa-2x"></i>        
				  <div class="desc">
				        <b>Shipping form</b>
				  </div>
				</div>	               
				<div class="img drag_me_panel_to_editor" id="static-modal-popup-sm"  onclick="add_me_to_editor_preview(this)">
				      <i class="fa fa-external-link fa-2x"></i>                 
					  <div class="desc">
					        <b>Button<br>small popup</b>
					  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="static-modal-popup-md" onclick="add_me_to_editor_preview(this)">
				      <i class="fa fa-external-link fa-2x"></i>          
				  <div class="desc">
				        <b>Button<br>medium popup</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor"  id="static-modal-popup-lg" onclick="add_me_to_editor_preview(this)">
				      <i class="fa fa-external-link fa-2x"></i>    
				  <div class="desc">
				        <b>Button<br>large popup</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="container_fluid" onclick="add_me_to_editor_preview(this)">
				      <i class="fa fa-arrows-alt fa-2x" aria-hidden="true"></i>  
				  <div class="desc">
				        <b>Fullscreen container</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor"  id="container" onclick="add_me_to_editor_preview(this)">
				      <i class="fa fa-square-o fa-2x"></i>  
				  <div class="desc">
				        <b>Container</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="single_div" onclick="add_me_to_editor_preview(this)">
				      <i class="fa fa-columns fa-2x"></i>   
				  <div class="desc">
				        <b>Div</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="static-row-of-1-col" onclick="add_me_to_editor_preview(this)">
				      <i class="fa fa-columns fa-2x"></i>      
				  <div class="desc">
				        <b>1 Column</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="static-row-of-2-col" onclick="add_me_to_editor_preview(this)">
				      <i class="fa fa-columns fa-2x"></i>      
				  <div class="desc">
				        <b>2 Column</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="static-row-of-3-col" onclick="add_me_to_editor_preview(this)">
				      <i class="fa fa-columns fa-2x"></i>      
				  <div class="desc">
				        <b>3 Column</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="static-row-of-4-col" onclick="add_me_to_editor_preview(this)">
				      <i class="fa fa-columns fa-2x"></i>      
				  <div class="desc">
				        <b>4 Column</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="static-row-of-6-col" onclick="add_me_to_editor_preview(this)">
				      <i class="fa fa-columns fa-2x"></i>      
				  <div class="desc">
				        <b>6 Column</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="static-side-nav-4x8" onclick="add_me_to_editor_preview(this)">
				      <i class="fa fa-columns fa-2x"></i>      
				  <div class="desc">
				        <b>1/3 2/3</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="static-side-nav-8x4" onclick="add_me_to_editor_preview(this)">
				      <i class="fa fa-columns fa-2x"></i>      
				  <div class="desc">
				        <b>2/3 1/3</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="static-side-nav-3x9" onclick="add_me_to_editor_preview(this)">
				      <i class="fa fa-columns fa-2x"></i>      
				  <div class="desc">
				        <b>1/4 3/4</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="static-side-nav-9x3" onclick="add_me_to_editor_preview(this)">
				      <i class="fa fa-columns fa-2x"></i>      
				  <div class="desc">
				        <b>3/4 1/4</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="static-side-nav-2x10" onclick="add_me_to_editor_preview(this)">
				      <i class="fa fa-columns fa-2x"></i>      
				  <div class="desc">
				        <b>1/6 5/6</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="static-side-nav-10x2" onclick="add_me_to_editor_preview(this)">				  
				      <i class="fa fa-columns fa-2x"></i>      
				  <div class="desc">
				        <b>5/6 1/6</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="static-side-nav-5x5x2" onclick="add_me_to_editor_preview(this)">
				  <i class="fa fa-columns fa-2x"></i>      
				  <div class="desc">
				        <b>5/12 5/12 2/12</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="static-side-nav-2x5x5" onclick="add_me_to_editor_preview(this)">
				  <i class="fa fa-columns fa-2x"></i>      
				  <div class="desc">
				        <b>2/12 5/12 5/12</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="static-side-nav-6x3x3" onclick="add_me_to_editor_preview(this)">
				  <i class="fa fa-columns fa-2x"></i>      
				  <div class="desc">
				        <b>2/4 1/4 1/4</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="static-side-nav-3x3x6" onclick="add_me_to_editor_preview(this)">
				  <i class="fa fa-columns fa-2x"></i>      
				  <div class="desc">
				        <b>1/4 1/4 2/4</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="static-side-nav-3x6x3" onclick="add_me_to_editor_preview(this)">
				  <i class="fa fa-columns fa-2x"></i>      
				  <div class="desc">
				        <b>1/4 2/4 1/4</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="static-side-nav-2x2x2x6" onclick="add_me_to_editor_preview(this)">
				  <i class="fa fa-columns fa-2x"></i>      
				  <div class="desc">
				        <b>1/6 1/6 1/6 3/6</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="static-side-nav-6x2x2x2" onclick="add_me_to_editor_preview(this)">
				  <i class="fa fa-columns fa-2x"></i>      
				  <div class="desc">
				        <b>3/6 1/6 1/6 1/6</b>
				  </div>
				</div>
			</div>
		</div>
		
		<div class="menu-div-text side_panel_pull_left_border" id="menu-div-text" >
			<div class="scrollbar" id="scrollbar">
				<div class="img drag_me_panel_to_editor" id="static-headline" onclick="add_me_to_editor_preview(this)">
						<i class="fa fa-header fa-2x"></i>
					  <div class="desc ">
							<b >HEADLINE</b>
					  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="static-sub-headline" onclick="add_me_to_editor_preview(this)">
						<i class="fa fa-font fa-2x"></i>
					  <div class="desc">
							<b  >SUB-HEADLINE</b>
					  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="static-paragraph" onclick="add_me_to_editor_preview(this)">
						<i class="fa fa-paragraph fa-2x"></i>
					  <div class="desc">
							<b >PARAGRAPH</b>
					  </div>
				</div>
			</div>
		</div>
		
		<div class="menu-div-media side_panel_pull_left_border" id="menu-div-media" >
			<div class="scrollbar" id="scrollbar">
					<div class="img drag_me_panel_to_editor" id="static-image" onclick="add_me_to_editor_preview(this)">
							<i class="fa fa-photo fa-2x"></i>
						  <div class="desc">
								<b >IMAGE</b>
						  </div>
					</div>
					<div class="img drag_me_panel_to_editor" id="static-video" onclick="add_me_to_editor_preview(this)">
							<i class="fa fa-youtube-play fa-2x"></i>
						  <div class="desc">
								<b>VIDEO</b>
						  </div>
					</div>
					<div class="img drag_me_panel_to_editor" id="static-iframe" onclick="add_me_to_editor_preview(this)">
							<i class="fa fa-link fa-2x"></i>
						  <div class="desc">
								<b>Youtube, Vimeo</b>
						  </div>
					</div>
					<div class="img">
						<i class="fa fa-th-large fa-2x" data-toggle="modal" onclick="load_image_library_from_json(1,'side_panel');" data-target="#show_image_library"></i>
						<div class="desc">
							<b>Media library</b>
						</div>
					</div>
			</div>
		</div>
		
		<div class="menu-div-form side_panel_pull_left_border" id="menu-div-form" >
			<div class="scrollbar" id="scrollbar">	 
				<div class="img drag_me_panel_to_editor" id="shipping_form" onclick="add_me_to_editor_preview(this)">
				      <i class="fa fa-wpforms fa-2x"></i>        
				  <div class="desc">
				        <b>Shipping form</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="checkout_form" onclick="add_me_to_editor_preview(this)">
				      <i class="fa fa-wpforms fa-2x"></i>        
				  <div class="desc">
				        <b>Checkout form</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="paypal_checkout_form" onclick="add_me_to_editor_preview(this)">
				      <i class="fa fa-wpforms fa-2x"></i>        
				  <div class="desc">
				        <b>Paypal checkout</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="paypal_and_card_checkout_form" onclick="add_me_to_editor_preview(this)">
				      <i class="fa fa-wpforms fa-2x"></i>        
				  <div class="desc">
				        <b>Card & paypal checkout</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="two_step_checkout" onclick="add_me_to_editor_preview(this)">
				      <i class="fa fa-wpforms fa-2x"></i>        
				  <div class="desc">
				        <b>Two step checkout</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="two_step_card_checkout" onclick="add_me_to_editor_preview(this)">
				      <i class="fa fa-wpforms fa-2x"></i>        
				  <div class="desc">
				        <b>Two step checkout only card</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="two_step_paypal_checkout" onclick="add_me_to_editor_preview(this)">
				      <i class="fa fa-wpforms fa-2x"></i>        
				  <div class="desc">
				        <b>Two step checkout only paypal</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="cart_bump" onclick="add_me_to_editor_preview(this)">
				      <i class="fa fa-cart-plus fa-2x"></i>        
				  <div class="desc">
				        <b>Cart bump</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="shopify_cart_bump_div_with_product" onclick="add_me_to_editor_preview(this)">
				      <i class="fa fa-cart-plus fa-2x"></i>        
				  <div class="desc">
				        <b>Custom cart bump</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="static-email-model" onclick="add_me_to_editor_preview(this)">
				      <i class="fa fa-wpforms fa-2x"></i>        
				  <div class="desc">
				        <b>Opt-in</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="input_first_name" onclick="add_me_to_editor_preview(this)">
				      <i class="fa fa-pencil-square-o fa-2x"></i>
				  <div class="desc">
				        <b>Input first name</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="input_last_name" onclick="add_me_to_editor_preview(this)">
				      <i class="fa fa-pencil-square-o fa-2x"></i>
					  <div class="desc">
					        <b>Input last name</b>
					  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="input_email" onclick="add_me_to_editor_preview(this)">
				      <i class="fa fa-pencil-square-o fa-2x"></i>
					  <div class="desc">
				        <b>Input email</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="input_subscribe_button" onclick="add_me_to_editor_preview(this)">
				      <i class="fa fa-square-o fa-2x"></i>    
				   <div class="desc">
				        <b>Button subscribe</b>
				  </div>
				</div>
				<div class="img drag_me_panel_to_editor" id="static-textarea" onclick="add_me_to_editor_preview(this)">
				      <i class="fa fa-align-center fa-2x"></i>    
				   <div class="desc">
				        <b>Textarea</b>
				  </div>
				</div>				
			</div>
		</div>
		
		<div class="menu-div-countdown side_panel_pull_left_border" id="menu-div-countdown" >
			<div class="scrollbar" id="scrollbar">
					<div class="img drag_me_panel_to_editor" id="static-timer" onclick="add_me_to_editor_preview(this)">
							<i class="fa fa-clock-o fa-2x"></i>
						  <div class="desc ">
								<b>Timer</b>
						  </div>
					</div>
					<div class="img drag_me_panel_to_editor" id="static-ever-green-timer" onclick="add_me_to_editor_preview(this)">
							<i class="fa fa-clock-o fa-2x"></i>
						  <div class="desc ">
								<b>Evergreen timer</b>
						  </div>
					</div>
					<div class="img drag_me_panel_to_editor" id="static-date_and_time" onclick="add_me_to_editor_preview(this)">
							<i class="fa fa-clock-o fa-2x"></i>
						  <div class="desc ">
								<b>Date & time</b>
						  </div>
					</div>
			</div>
		</div>
		<?php include "files/editorscript/phpsection/custom_snippet.php"; ?>

		<?php include "files/editorscript/phpsection/shopify_elements.php"; ?>


	</div>
</div>

<script>
	function load_page_in_iframe(){
		var url = $("#template_url_input_val").val();
		if(!url.match('http://') && !url.match('https://')){
			url = url.replace('www.','')
			url = 'http://www.'+url;
		}
		 $('#row_for_snippets').hide();	
		 $('#row_for_templets').hide();	
		 $("#row_for_iframe").show();
		 $("#load_page_iframe").attr("src", url);
		 
		 $("#load_page_iframe").css("width", "100%");
		 $("#load_page_iframe").css("height", "100%");
		 $("#snippet_modal_body").css("overflow", "");

		 $("#add_tem_to_editor_btn").attr("onclick", "add_template_to_editor('"+url+"')");
		 $("#add_tem_to_editor_btn").show();
	}
</script>

<script>
	function add_template_to_editor(url){
		$(".loader").show();
		html_to_json(url);
		setTimeout(function(){ $(".loader").hide();}, 3000);
	}
</script>
<script>
	function toggle_view(me){
		var btn = $('#'+me.id).text();
		if(btn.trim()=='TEMPLATES'){
			$("#row_for_snippets").hide();
			$("#row_for_iframe").hide();
			$("#row_for_templets").show();
			$('#'+me.id).text('SNIPPETS');

			$("#load_page_iframe").removeAttr("src");
			$("#add_tem_to_editor_btn").removeAttr("onclick");
			$("#add_tem_to_editor_btn").hide();
		}
		else{
			$("#row_for_templets").hide();
			$("#row_for_iframe").hide();
			$("#row_for_snippets").show();
			$('#'+me.id).text('TEMPLATES');

			$("#load_page_iframe").removeAttr("src");
			$("#add_tem_to_editor_btn").removeAttr("onclick");
			$("#add_tem_to_editor_btn").hide();

		}
	}
</script>
