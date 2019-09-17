
    <div id="fb2_completed_sidebar">
			
	</div>
	<script type="text/javascript">
		$(function() {
			$.ajax({
				type: "GET",
				url: base+"/default/?process=gen_fb2_completed_sidebar",
				cache: false,
				success: function(res){
					$("#fb2_completed_sidebar")[0].innerHTML = res;
					$(".card-header").click(function(){
						$("#main_wrapper").find('.in').removeClass('in');
					});
				}
			});

			$("#fb2_completed_sidebar").click(function(e){
				console.log(e.target);
				if($(e.target).hasClass('backdrop')){
					side_bar_open = true;
					show_hide_side_bar();
				}
			});
		});
		var side_bar_open = false;

		function show_hide_side_bar(){
			if(side_bar_open){
				side_bar_open = false;
				$("#main_wrapper").animate({right: '-370px'});
				$("#fb2_completed_sidebar").removeClass('backdrop');
			}else{
				side_bar_open = true;
				$("#main_wrapper").animate({right: '0px'});
				$("#fb2_completed_sidebar").addClass('backdrop');
			}
			
		}
	</script>
		<div id="dashboard_msg" style="color:#FFFFFF;padding:10px;text-align:center;width:300px;position:fixed;bottom:0;right:40%;border-radius:4px 4px 0 0; font-size: 20px;z-index:999999" hidden>
			Successfully deleted
		</div>
		</div>
		<div class="wrapper">
			<footer>
				<div class="pull-right">
					Funnel Buildr 2.0 – powered by <a target ="_blank" href="https://ecomisoft.com/">Ecomisoft</a>
				</div>
				<div class="clearfix"></div>
			</footer>
		</div>
			
		<script> var base = '<?php echo BASE; ?>'; </script>
		<script> var this_shop_url = '<?php echo $_SESSION[ SESSIONNAME ]['shop'] ?>'; </script>
		<!-- jQuery -->
		
		<script type="text/javascript" src="<?php echo BASE; ?>/files/js/javascripts.js?ver=<?php echo SCRIPT_VERSION ?>"></script>
		<!-- MiniColors -->
		<script type="text/javascript" src="<?php echo BASE; ?>/files/js/jquery.minicolors.js"></script>
		<!-- msc popup -->
		<script type="text/javascript" src="<?php echo BASE; ?>/files/js/msc-script.js"></script>
		<!-- Bootstrap -->
		<script src="<?php echo BASE; ?>/files/dashboard/js/bootstrap.min.js"></script>
		<!-- FastClick -->
		<script src="<?php echo BASE; ?>/files/dashboard/js/fastclick.js"></script>
		<!-- NProgress -->
		<script src="<?php echo BASE; ?>/files/dashboard/js/nprogress.js"></script>
		<!-- Chart.js -->
		<script src="<?php echo BASE; ?>/files/dashboard/js/Chart.min.js"></script>
		<!-- gauge.js -->
		<script src="<?php echo BASE; ?>/files/dashboard/js/gauge.min.js"></script>
		<!-- bootstrap-progressbar -->
		<script src="<?php echo BASE; ?>/files/dashboard/js/bootstrap-progressbar.min.js"></script>
		<!-- iCheck -->
		<script src="<?php echo BASE; ?>/files/dashboard/js/icheck.min.js"></script>
		<!-- Skycons -->
		<script src="<?php echo BASE; ?>/files/dashboard/js/skycons.js"></script>
		<!-- Flot -->
		<script src="<?php echo BASE; ?>/files/dashboard/js/jquery.flot.js"></script>
		<script src="<?php echo BASE; ?>/files/dashboard/js/jquery.flot.pie.js"></script>
		<script src="<?php echo BASE; ?>/files/dashboard/js/jquery.flot.time.js"></script>
		<script src="<?php echo BASE; ?>/files/dashboard/js/jquery.flot.stack.js"></script>
		<script src="<?php echo BASE; ?>/files/dashboard/js/jquery.flot.resize.js"></script>
		<!-- Flot plugins -->
		<script src="<?php echo BASE; ?>/files/dashboard/js/jquery.flot.orderBars.js"></script>
		<script src="<?php echo BASE; ?>/files/dashboard/js/jquery.flot.spline.min.js"></script>
		<script src="<?php echo BASE; ?>/files/dashboard/js/curvedLines.js"></script>
		<!-- DateJS -->
		<script src="<?php echo BASE; ?>/files/dashboard/js/date.js"></script>
		<!-- JQVMap -->
		<script src="<?php echo BASE; ?>/files/dashboard/js/jquery.vmap.js"></script>
		<script src="<?php echo BASE; ?>/files/dashboard/js/jquery.vmap.world.js"></script>
		<script src="<?php echo BASE; ?>/files/dashboard/js/jquery.vmap.sampledata.js"></script>
		<!-- bootstrap-daterangepicker -->
		<script src="<?php echo BASE; ?>/files/dashboard/js/moment.min.js"></script>
		<script src="<?php echo BASE; ?>/files/dashboard/js/daterangepicker.js"></script>

		<!-- Custom Theme Scripts -->
		<script src="<?php echo BASE; ?>/files/dashboard/js/custom.min.js"></script>
		<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
			
		<!-- Funnel builder -->
		<?php if( $option == 'funnel' ) { ?>
			<script src="<?php echo BASE; ?>/files/js/funnel_editor.js?ver=<?php echo SCRIPT_VERSION ?>"></script>
			<script src="<?php echo BASE; ?>/files/js/funnel_builder.js?ver=<?php echo SCRIPT_VERSION ?>"></script>
			<script src="<?php echo BASE; ?>/files/js/clipboard.js"></script>
			<script>
				var clipboard =new Clipboard('.copy', {
					text: function(trigger) {
						document.getElementById('first_input').style.backgroundColor="#adadad";
						document.getElementById('url_handle').style.backgroundColor="#adadad";
						var a = document.getElementById('first_input').innerText;
						var b = document.getElementById('url_handle').value;
						$('#span_for_tooltip').addClass('tooltip_show');
						$('#span_for_tooltip').css('visibility','visible');
						return a + b;
						
					}
				});
				clipboard.on('success', function(e) {
					setTimeout(function(){
						document.getElementById('first_input').style.backgroundColor="transparent";
						document.getElementById('url_handle').style.backgroundColor="transparent";
					}, 200);
					setTimeout(function(){
						$('#span_for_tooltip').removeClass('tooltip_show');
						$('#span_for_tooltip').css('visibility','hidden');
					}, 700);
				});
				
				clipboard.on('error', function(e) {
				});


				var product_clipboard =new Clipboard('.product_url_copy', {
					text: function(trigger) {
						return $($(trigger)[0]).parent().find('.p_url')[0].value;
					}
				});
				product_clipboard.on('success', function(e) {
					
				});
				
				product_clipboard.on('error', function(e) {
				});
			</script>
		<?php } ?>
		<script src='https://cdnjs.cloudflare.com/ajax/libs/wow/0.1.12/wow.min.js'></script>
		<?php if ( $option == 'default' ||  $option == 'settings'  ||  $option == 'checkout_settings') { ?>	
			<script>
				$( document ).ready(function() {
					var current_url = window.location.href;
					var find_li = current_url.split('/')[current_url.split('/').length-1];
					if (find_li == '' ) $('#home').addClass('active');
					if (find_li == '#funnels_div' || find_li.indexOf('funnel_page=')>0 )  $('#funnels').addClass('active');
					else if (find_li == '#pages_div'  || find_li.indexOf('page=')>0)    $('#pages').addClass('active');
				});
			</script>
		<?php } ?>
		<?php if ( $option == 'default' || $option == 'pages' || $option == 'all_funnels' || $option == 'orders_recharge') { ?>
			<textarea id="bulk_action_page_id" hidden ></textarea>
			<textarea id="bulk_action_funnel_id" hidden></textarea>
			<textarea id="bulk_action_recharge" hidden></textarea>
			<textarea id="new_campaign_input_data" hidden></textarea>
			<script>
				function countChecked(type){
					  if (type=='page'){
						 "all"===checkState&&$(".bulk_action_page input[name='table_records_pages']").iCheck("check");
						 "none"===checkState&&$(".bulk_action_page input[name='table_records_pages']").iCheck("uncheck");
						 
						  var a=$(".bulk_action_page input[name='table_records_pages']:checked").length;a?($(".column-title-page").hide(),
						  $(".bulk-actions-page").show(),
						  $(".action-cnt-pages").html(a+" Records Selected")):($(".column-title-page").show(),$(".bulk-actions-page").hide())
						  var selected_pages = $(".bulk_action_page input[name='table_records_pages']:checked");
						  var pages = [];
						  for(i=0;i<selected_pages.length;i++){
							  pages.push(selected_pages[i].value);
						  }
						  $("#bulk_action_page_id")[0].value = JSON.stringify(pages);
					  }
					  
					  if (type=='funnel'){
						 "all"===checkState&&$(".bulk_action_funnel input[name='table_records_funnels']").iCheck("check");
						 "none"===checkState&&$(".bulk_action_funnel input[name='table_records_funnels']").iCheck("uncheck");
						  var a=$(".bulk_action_funnel input[name='table_records_funnels']:checked").length;a?($(".column-title-funnel").hide(),
						  $(".bulk-actions-funnel").show(),$(".action-cnt-funnels").html(a+" Records Selected")):($(".column-title-funnel").show(),$(".bulk-actions-funnel").hide())
						  var selected_funnels= $(".bulk_action_funnel input[name='table_records_funnels']:checked");
						  var funnels = [];
						  for(i=0;i<selected_funnels.length;i++){
							  funnels.push(selected_funnels[i].value);
						  }
						  $("#bulk_action_funnel_id")[0].value = JSON.stringify(funnels);
					  }
					};
				$(document).ready(function(){
					$("input.flat")[0]&&$(document).ready(function(){
						$("input.flat").iCheck({checkboxClass:"icheckbox_flat-green", radioClass:"iradio_flat-green"})});
				});
						
				$(".table_page input").on("ifChecked",function(){checkState="",$(this).parent().parent().parent().addClass("selected"),countChecked('page')});
				$(".table_page input").on("ifUnchecked",function(){checkState="",$(this).parent().parent().parent().removeClass("selected"),countChecked('page')});
				
				$(".table_funnel input").on("ifChecked",function(){checkState="",$(this).parent().parent().parent().addClass("selected"),countChecked('funnel')});
				$(".table_funnel input").on("ifUnchecked",function(){checkState="",$(this).parent().parent().parent().removeClass("selected"),countChecked('funnel')});

				var checkState="";
				
				$(".bulk_action_funnel input").on("ifChecked",function(){checkState="",$(this).parent().parent().parent().addClass("selected"),countChecked('funnel')});
				$(".bulk_action_funnel  input").on("ifUnchecked",function(){checkState="",$(this).parent().parent().parent().removeClass("selected"),countChecked('funnel')});

				$(".bulk_action_page input#check-all-page").on("ifChecked",function(){checkState="all",countChecked('page')});
				$(".bulk_action_page  input#check-all-page").on("ifUnchecked",function(){checkState="none", countChecked('page')});
				
				$(".bulk_action_funnel input#check-all-funnel").on("ifChecked",function(){checkState="all",countChecked('funnel')});
				$(".bulk_action_funnel input#check-all-funnel").on("ifUnchecked",function(){checkState="none", countChecked('funnel')});
			</script>
		<?php } ?>
		<?php if( $option == 'checkout_settings' ) { ?>
		<script>
		   $('.minicolors-input').each( function() {
				$(this).minicolors({
					control: $(this).attr('data-control') || 'hue',
					defaultValue: $(this).attr('data-defaultValue') || '',
					format: $(this).attr('data-format') || 'hex',
					keywords: $(this).attr('data-keywords') || '',
					inline: $(this).attr('data-inline') === 'true',
					letterCase: $(this).attr('data-letterCase') || 'lowercase',
					opacity: $(this).attr('data-opacity'),
					position: $(this).attr('data-position') || 'bottom left',
					swatches: $(this).attr('data-swatches') ? $(this).attr('data-swatches').split('|') : [],
					change: function(value, opacity) {
					},
					theme: 'bootstrap'
				});

			});
		</script>
		<?php } ?>
		<?php if ( $option == 'default' && (get_shop_meta($_SESSION[ SESSIONNAME ]['shop_id'], 'intro_tour') == false || (int)get_shop_meta($_SESSION[ SESSIONNAME ]['shop_id'], 'intro_tour') <= 6)) { ?>
		    	<script src="<?php echo BASE; ?>/files/js/intro.js"></script>
		    	<script type="text/javascript">

						var intro = introJs();
						intro.onexit(function(){
							document.cookie = "intro_tour=true";
							var url = base+'/default/?process=intro_tour';
							<?php
							if (get_shop_meta($_SESSION[ SESSIONNAME ]['shop_id'], 'intro_tour') == false) {
								$intro_tour = 1;
							}else{
								$intro_tour = (int)get_shop_meta($_SESSION[ SESSIONNAME ]['shop_id'], 'intro_tour') + 1;
							}
							?>
							var data = 'shop_id=<?php echo $_SESSION[ SESSIONNAME ]['shop_id']; ?>&intro_tour=<?php echo $intro_tour; ?>';
							console.log(data);
							$.ajax({
								type: "POST",
								url: url,
								data: data
							});
							console.log("skip button click");
						});
						intro.onchange(function(targetElement) {
							if (targetElement.id == 'intro_general_settings') {
								$('#settings').addClass('active');
								$("#settings .child_menu").show();
							}
						});
						intro.setOptions({
							steps: [
								{
									intro: '<div style=" width: 100%; height: auto; overflow: hidden;"> <div style=" width: 70px; float: left; border-radius: 10px; height: 100%;"> <img src="https://get-funnel-builder-mbvb38nda.netdna-ssl.com/wp-content/uploads/2017/08/MattStefanik2.png" alt="" style=" width: 70px; border-radius: 5px; padding: 1px; border: 2px solid #2A3F54;"> </div><div style=" width: 330px; float: right; padding-left: 18px;"><h5 style=" font-size: 22px; margin-top: 0px; color: #717171;">Welcome to funnel buildr!</h5><p style=" color: #6b6b6b; font-size: 14px; text-align: justify;">Hey there, I’m Matt, the CEO of Funnel Buildr 2.0 and I wanted to personally welcome you onboard and let you know that we are here to help if you need anything.<br>We would love to show you how you can create and launch your first ecommerce sales funnel and stay ahead of your competitions. Take this short tour to see how.</p></div></div>'
								},
								{
									element: ('#intro_general_settings'),
									intro: '<h5 style="margin-top: 0px;  font-size: 22px; color: #717171;">Complete FB2 general settings</h5><p style=" color: #6b6b6b; font-size: 14px; text-align: justify;">To supercharge your funnel buildr pages, setup your google analytics id, facebook pixel and newsletter services in this section. It is super easy to setup and takes only a few minutes. Let’s do it.</p><p><a style="color: #0188cc; font-size: 14px; font-weight: 600;" href="http://help.ecomisoft.com/funnel-buildr-2-0/funnel-buildr-20-general-settings" target="_blank">Learn how to configure general settings.</a></p>',
									position: 'bottom'
								},
								{
									element: ('#intro_checkout_settings'),
									intro: '<h5 style="font-size: 22px; color: #717171; margin-top: 0px;">Complete your checkout settings</h5><p style=" color: #6b6b6b; font-size: 14px; text-align: justify;">To start selling with funnel buildr custom checkout, connect your preferred payment processors. You can also configure checkout preference and order bump settings in this section.</p><p><a style="color: #0188cc; font-size: 14px; font-weight: 600;" href="http://help.ecomisoft.com/funnel-buildr-2-0/funnel-buildr-20-checkout-settings" target="_blank">Learn to configure checkout settings.</a></p>',
									position: 'right'
								},
								{
									element: ('#intro_create_page'),
									intro: '<h5 style="margin-top: 0px; font-size: 22px; color: #717171;">Design your first product page</h5><p style=" color: #6b6b6b; font-size: 14px; text-align: justify;">With Funnel buildr page editor, it literally takes 3 minutes to design your first kickass product page. Let’s try it now.</p>',
									position: 'left'
								},
								{
									element: ('#intro_create_funnel'),
									intro: '<h5 style="margin-top: 0px; font-size: 22px; color: #717171;">Create your first funnel</h5><p style=" color: #6b6b6b; font-size: 14px; text-align: justify;">Don’t keep your customer waiting. Create and launch your first funnel campaign.</p>',
									position: 'top'
								},
								{
									intro: '<h5 style="margin-top: 0px; font-size: 22px; color: #717171;">Tell us, how much you love us</h5><p style=" color: #6b6b6b; font-size: 14px; text-align: justify;">We are your friends at Ecomisoft. Tell us how much you love us and what else we can do to make you happier</p>'
								}
							],
							showBullets: false,
							showStepNumbers: false,
							showProgress: false,
							exitOnOverlayClick: false,
							<?php
							if ((int)get_shop_meta($_SESSION[ SESSIONNAME ]['shop_id'], 'intro_tour') == 6) { ?>
								skipLabel: 'End tour'
							<?php }
							else{ ?>
								skipLabel: 'Skip tour'
							<?php }
							?>
						});
					function startIntro(){
						intro.start();
					}
					$(function() {
						var cookie_data = document.cookie;
						if (cookie_data.indexOf('intro_tour=true') == -1) {
							startIntro();
						}
					});
					function tour_do_not_show_this_again(){
						intro.exit();
						var url = base+'/default/?process=intro_tour';
						var data = 'shop_id=<?php echo $_SESSION[ SESSIONNAME ]['shop_id']; ?>&intro_tour=false';
						$.ajax({
							type: "POST",
							url: url,
							data: data
						});
					}
		    	</script>
		<?php } ?>
	</body>
</html>
