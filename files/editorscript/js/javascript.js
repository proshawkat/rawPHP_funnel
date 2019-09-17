var mdid=0;
function this_is_me(e,eve){
	if(!$(e).hasClass( "do_not_show_my_menu") && !$(e).hasClass( "hover_disable") && !$(e).hasClass("modal_close_btn") && drag_running == false && $(e)[0].type != 'checkbox' && !$(e).hasClass( "custom_checkout_shipping_method")){
		var me = e;
		eve.stopPropagation();
		remove_editor_hover_conf();//gloval_val.js
		$(e).addClass('hover_show_my_border');
		
		var add_new_btn ="";
		if($("#"+me.id)[0].className.indexOf("col-") == -1){
			add_new_btn = add_new_btn + '<div onclick="hover_add_new(\''+me.id+'\')" class="pulse animated infinite circle hover_my_settings add_new_btn text-center">';
			add_new_btn = add_new_btn + '<span class="fa fa-plus" aria-hidden="true"></span>';
			//add_new_btn = add_new_btn + '<span onclick="hover_add_new(\''+me.id+'\')" class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>';
			add_new_btn = add_new_btn + '</div>';
		}

		if(!$(me).hasClass("main_container")){
			var settings_div_with_move ="";
			settings_div_with_move += '<div  class="hover_my_settings move_me_please up_settings_menu" id="move_me_please">';
			//if($(me)[0].outerHTML.endsWith('</'+$(me)[0].tagName.toLowerCase()+'>') && !$(me).hasClass("timer_wrapper") && $(me)[0].tagName != "VIDEO"){
			if(show_menu_inner_or_outer_decision(me)){
				settings_div_with_move += '<i class="glyphicon glyphicon-move move_icon up_settings_menu_i" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Move" style="cursor: move;"></i>';
			}
			if($(me).hasClass("timer_wrapper")){
				settings_div_with_move += '<i onclick="set_hidden_timer_id(\''+me.id+'\')" class="glyphicon glyphicon-time timer_sett up_settings_menu_i" aria-hidden="true" data-toggle="modal" data-target="#timerPopup" data-placement="top" title="Settings"></i>';
			}
			if($(me).hasClass("ever_green_timer")){
				settings_div_with_move += '<i onclick="set_hidden_eg_timer_id(\''+me.id+'\')" class="glyphicon glyphicon-time timer_sett up_settings_menu_i" aria-hidden="true" data-toggle="modal" data-target="#everGreenTimerPopup" data-placement="top" title="Settings"></i>';
			}
			if($(me).hasClass("shopify_cart_bump_div_with_product")){
				settings_div_with_move += '<i onclick="hover_add_cart_bump_product(\''+me.id+'\')" class="fa fa-cart-plus up_settings_menu_i" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Add product"></i>';
			}
			settings_div_with_move += '<i onclick="hover_me(\''+me.id+'\')" class="copy_id fa fa-hashtag handle up_settings_menu_i" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Copy my id" style="cursor: pointer;"></i>';
			settings_div_with_move += '<i class="add_to_lib fa fa-bookmark handle up_settings_menu_i" onclick="$(\'#add_to_lib_id\')[0].value = \''+me.id+'\'" aria-hidden="true" data-toggle="modal" data-target="#add_to_lib_modal" data-placement="top" title="Add to library" style="cursor: pointer;"></i>';
			settings_div_with_move += '<i onclick="hover_show_settings_panel(\''+me.id+'\')" class="glyphicon glyphicon-cog up_settings_menu_i settings" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Settings"></i>';
			if(!$(me).hasClass("timer_wrapper") && $(me)[0].tagName != "IFRAME" && !$(me).hasClass("dont_clone")){
				settings_div_with_move += '<i onclick="hover_make_a_clone(\''+me.id+'\')" class="glyphicon glyphicon-duplicate up_settings_menu_i clone" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Clone"></i>';
			}
			if(!$(me).hasClass("dont_remove")){
				settings_div_with_move += '<i onclick="hover_remove_me(\''+me.id+'\')" class="glyphicon glyphicon-trash up_settings_menu_i remove" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Remove"></i>';
			}
			settings_div_with_move += '</div>';
			if ( show_menu_inner_or_outer_decision(me)) {
				var id_of_me = $(me).attr("id");
				$('#' + id_of_me ).append(settings_div_with_move);
				if(add_new_btn != ""){
					$("#div_editorpreview").append(add_new_btn);
				}
				
				if(me.id != null && me.id != ""){
					var top = $('#'+me.id).offset().top;
					var left = $('#'+me.id).offset().left;
					var width = me.offsetWidth;
					var height = me.offsetHeight;
					if(add_new_btn != ""){
						$(".add_new_btn").css({top: top+height-11.5, left: (left+(width/2)-20)});
					}
				}else{
					console.log("me another time");
					var html_data = document.getElementById('editor_preview_data').value;
					if( html_data != '' ) {
						html_data = JSON.parse( html_data );
						html_data = make_json_for_editor_preview(html_data);
						show_all_updated_view(html_data);
					}
				}
				$(".up_settings_menu").fadeIn(500);
				$(".up_settings_menu").css("display","-webkit-box");

				$(".body_container *").sortable({handle: '.move_me_please'});
			}else{
	        	$("#div_editorpreview").append(settings_div_with_move);
	        	if(add_new_btn != ""){
	        		$("#div_editorpreview").append(add_new_btn);
	        	}

	        	var top = $('#'+me.id).offset().top;
				var left = $('#'+me.id).offset().left;
				var width = me.offsetWidth;
				var height = me.offsetHeight;

				$(".up_settings_menu").fadeIn(500);
				$(".up_settings_menu").css("display","inline-table");

				var up_right = $(me).offset().left + width;
				var up_width = $(".up_settings_menu")[0].offsetWidth;
				$(".up_settings_menu").css({top: top-19.5, left: (up_right - up_width)-16 });
	        	$(".add_new_btn").css({top: top+height-11.5, left: (left+(width/2)-20)});

	        	//$(".body_container *").sortable({handle: me});

	        	$(me).addClass("show_my_cursor_as_move");
	        	if($(".sortable_disabled").length > 0){
	        		for(var i=0;i<$(".sortable_disabled").length;i++){
	        			$(".sortable_disabled")[i].style.cursor = 'default';
	        		}
	        	}
			}
		}else{
			var settings_div_for_only_settings ="";
			settings_div_for_only_settings += '<div class="hover_my_settings up_settings_menu">';
			settings_div_for_only_settings += '<i onclick="hover_me(\''+me.id+'\')" class="copy_id fa fa-hashtag handle up_settings_menu_i" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Copy my id" style="cursor: pointer;"></i>';
			settings_div_for_only_settings += '<i onclick="hover_show_settings_panel(\''+me.id+'\')" class="glyphicon glyphicon-cog up_settings_menu_i settings" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Settings"></i>';
			settings_div_for_only_settings += '</div>';

			var id_of_me = $(me).attr("id");
			$('#' + id_of_me ).append(settings_div_for_only_settings);

			$(".up_settings_menu").fadeIn(500);
			$(".up_settings_menu").css("display","-webkit-box");
		}

		$(".add_new_btn").fadeIn(250);
		$(".add_new_btn").css("display","inline-table");

		$(me).css("overflow","visible");

		if($(me).hasClass("row")){
			$(me).addClass("hover_show_my_border_row");
			$(".up_settings_menu").css("background-color","rgba(255, 218, 38,0)");
			$(".up_settings_menu_i").css("background-color","rgba(255, 218, 38,1)");
			$(".up_settings_menu_i").css("border","2px solid rgba(245, 210, 40,1)");
			$(".add_new_btn").addClass("circle_row");
		}else if($(me).hasClass("container") || $(me).hasClass("container-fluid")){
			$(me).addClass("hover_show_my_border_container");
			$(".up_settings_menu").css("background-color","rgba(232, 77, 41,0)");
			$(".up_settings_menu_i").css("background-color","rgba(232, 77, 41,1)");
			$(".up_settings_menu_i").css("border","2px solid rgba(187, 63, 34,1)");
			$(".add_new_btn").addClass("circle_container");
		}else if($(me).hasClass("main_container")){
			$(me).addClass("hover_show_my_border_main_container");
			$(".up_settings_menu").css("background-color","rgba(255,140,0,0)");
			$(".up_settings_menu_i").css("background-color","rgba(255,140,0,1)");
			$(".up_settings_menu_i").css("border","2px solid rgba(204, 114, 5,1)");
		}else if($(me)[0].tagName == "DIV"){
			$(me).addClass("hover_show_my_border_div");
			$(".up_settings_menu").css("background-color","rgba(85, 186, 65, 0)");
			$(".up_settings_menu_i").css("background-color","rgba(85, 186, 65, 1)");
			$(".up_settings_menu_i").css("border","2px solid rgba(77, 158, 60, 1)");
			$(".add_new_btn").addClass("circle_div");
		}else{
			$(me).addClass("hover_show_my_border_ele");
			$(".up_settings_menu").css("background-color","rgba(0, 96, 165, 0)");
			$(".up_settings_menu_i").css("background-color","rgba(0, 96, 165, 1)");
			$(".up_settings_menu_i").css("border","2px solid rgba(3, 82, 140, 1)");
			$(".add_new_btn").addClass("circle");
		}

		$('.hover_my_settings').mouseover(
			function(event){
				event.stopPropagation();
				//$(".div_editorpreview").find("*").removeClass('hover_show_my_border');
				$(me).addClass('hover_show_my_border');
			}
		);
		$('.hover_my_settings').mouseleave(
			function(){
				remove_editor_hover_conf();//gloval_val.js
			}
		);
	}
}

function show_menu_inner_or_outer_decision(me){
	if($(me)[0].outerHTML.endsWith('</'+$(me)[0].tagName.toLowerCase()+'>') && $(me)[0].tagName != "IMG" && $(me)[0].tagName != "VIDEO" && !$(me).hasClass("timer_wrapper") && !$(me).hasClass("time") && !$(me).hasClass("date") && $(me)[0].tagName != "TD" && $(me)[0].tagName != "TR" && $(me)[0].tagName != "TABLE" && $(me)[0].tagName != "TBODY" && $(me)[0].tagName != "THEAD" && $(me)[0].tagName != "TH" && $(me)[0].tagName != "TEXTAREA" && $(me)[0].tagName != "IFRAME" && $(me)[0].tagName != "BUTTON" && $(me)[0].tagName != "SELECT" && $(me)[0].tagName != "A" && $(me)[0].tagName != "LI"){
		return false;
	}else{
		return false;
	}
}

function hover_me(my_id){
	$("#place_below").hide();

	var clipboard =new Clipboard('.copy_id', {
		text: function(trigger) {
			return my_id;
		}
	});
	clipboard.on('success', function(e) {
		show_editor_msg("Element id ("+my_id+") copied to clipboard" , 1);
	});
	
	clipboard.on('error', function(e) {
	});
}
function hover_show_settings_panel(my_id){
	remove_editor_hover_conf();

	select_this_element(my_id);

	changed_css_element_ids(my_id);
	show_my_panel_for_settings(my_id);
	$("#place_below").hide();
	overflow_control($('#div_editorpreview'));
	show_settings();
}
function hover_make_a_clone(my_id){
	html_data = document.getElementById('editor_preview_data').value;
	if( html_data != '' ) {
		html_data = JSON.parse( html_data );
		html_data = make_my_clone(my_id,html_data);
		document.getElementById('editor_preview_data').value = JSON.stringify(html_data);
		show_all_updated_view(html_data);
	}
}
function hover_remove_me(my_id){
	$(".div_editorpreview").find(".hover_my_settings").remove();
	
	var html_data = document.getElementById('editor_preview_data').value;
	if( html_data != '' ) {
		html_data = JSON.parse( html_data );
		if(my_id != ""){
			find_timer(my_id);
		}
		html_data = delete_element_from_json(my_id,"","","",html_data);
		document.getElementById('editor_preview_data').value = JSON.stringify(html_data);
		show_all_updated_view(html_data);
	}
	add_button_inside_empty_div();
}

function hover_add_cart_bump_product(my_id){
	$("#div_id_product_bump").hide();
	$("#current_editable_element_id").val(my_id);
	open_popup("cart_bump_modal");
	var str = $("#"+my_id+" :input").attr('onchange');
	if(str != undefined){
		var params = str.split("bump_cart_with(")[1].split(',');
		params[params.length - 1] = params[params.length - 1].replace(')',"");
		$("#cart_bump_product_number").val(params[3].replace(/'/g,"").trim());
		$("#cart_bump_product_handle").val(params[1].replace(/'/g,"").trim());

		var handle = params[1].replace(/'/g,"").trim();
        if(handle != ""){
        	$("#product_title_div_bump")[0].innerHTML = '<i class="fa fa-spinner fa-spin"></i>';
            find_products_bump_title_using_handle(handle);
        }else{
        	$("#cart_bump_product_edit_control").hide();
        	$("#product_title_div_bump")[0].innerHTML = '';
        	$("#div_id_product_bump").show();
        }
	}else{
		$("#cart_bump_product_number").val("1");
		$("#cart_bump_product_edit_control").hide();
		$("#product_title_div_bump")[0].innerHTML = '';
		$("#div_id_product_bump").show();
	}
	$("#cart_bump_product_template").val($("#"+my_id)[0].textContent.trim());
}

function hover_add_new(my_id){
	my_new_parent_id = $('#'+my_id).parent().attr('id');
	my_new_prev_id = my_id;

	$("#current_editable_element_id").val(my_id);

	className = $('#'+my_id).attr('class');
    classNames = className.split(" ");
    var row_found = false;
    if($('#'+my_id).hasClass("container-fluid") || $('#'+my_id).hasClass("container") || $('#'+my_id).hasClass("row")){
    	add_rows();
    	row_found = true;
    }
    if(!row_found){
        open_all_element();
    }
	select_this_element(my_id);

	var top = $('#'+my_id).offset().top;
	var left = $('#'+my_id).offset().left;
	var width = $('#'+my_id)[0].offsetWidth;
	var height = $('#'+my_id)[0].offsetHeight;

	$("#place_below").css({top: top+height-24, left: (left+(width/2)-10), position:'absolute'});
	$("#place_below").show("slide", { direction: "right" }, 500);

	$("#pull_line_div").css({top: top+height-22, left: (left+(width/2)+11), position:'absolute'});
	$("#pull_line_div").show("slide", { direction: "right" }, 500);
}
  
//~JSON TO HTML GENERATOR
function what_is_my_id(me,event){
	event.stopPropagation();
	console.log('My ID: '+me.id);
	console.log('My Parent ID: '+$("#"+me.id).parent().attr('id'));
	console.log('My Prev ID: '+$("#"+me.id).prev().attr('id'));
}
//~JSON TO HTML GENERATOR END 


function open_all_element() {
	close_all_option();
	document.getElementById("sidenav-for-all-element").style.visibility = 'visible';  
    document.getElementById("sidenav-for-all-element").style.width = "150px";
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("sidenav-for-add-rows").style.width = "0";
    show_menu_div(this , 'menu-div-all');
}


function close_all_option(){
	$(".div_editorpreview").find("*").removeClass('hover_disable');
	
	$("#place_below").hide();
	$("#pull_line_div").hide();
	close_all_menu_div();
	document.getElementById("mySidenav").style.width = "0";
    document.getElementById("sidenav-for-all-element").style.width = "0";
    document.getElementById("sidenav-for-add-rows").style.width = "0";
    if($('#div_editorpreview')[0] != undefined){
		document.getElementById("div_editorpreview").style.marginRight = "0px";
    }
}

function close_all_menu_div(){
	  $("#menu-div-all").hide();
	  $("#menu-div-text").hide();
	  $("#menu-div-media").hide();
	  $("#menu-div-form").hide();
	  $("#menu-div-content").hide();
	  $("#menu-div-countdown").hide();
	  $("#menu-div-misc").hide();
	  $("#add-rows-div-layout").hide();
}
 
function show_menu_div(e,div){
    close_all_menu_div();
    document.getElementById("all-element-holder").style.visibility = 'visible';  
    $('#'+div)[0].style.cssText+=' margin-left: 100%;z-index:10000';
    var width = document.body.clientWidth;
   $('#'+div).show().animate({ marginLeft: (width-320)+'px'} , 1000);
   setTimeout(function(){ $('#'+div)[0].style.cssText+=' z-index: 10050;';}, 1000);
}
function add_rows_layout(e,div){
    
    close_all_menu_div();
    document.getElementById("add-rows-holder").style.visibility = 'visible';  
    $('#'+div)[0].style.cssText+=' margin-left: 100%;z-index:10000';
    var width = document.body.clientWidth;
   $('#'+div).show().animate({ marginLeft: (width-320)+'px'} , 1000);
   setTimeout(function(){ $('#'+div)[0].style.cssText+=' z-index: 10050;';}, 1000);
}
function add_rows () {
	close_all_menu_div();
	document.getElementById("mySidenav").style.width = "0";
    document.getElementById("sidenav-for-all-element").style.width = "0";
	document.getElementById('sidenav-for-add-rows').style.visibility = 'visible';  
	document.getElementById("sidenav-for-add-rows").style.width = "150px";
	add_rows_layout(this , 'add-rows-div-layout');
}
function open_all_element_option() {
	close_all_menu_div();
    document.getElementById("mySidenav").style.width = "400px";
    document.getElementById("div_editorpreview").style.marginRight = "400px";
    document.getElementById("sidenav-for-all-element").style.width = "0";
    document.getElementById("sidenav-for-add-rows").style.width = "0";
    $('.validate_input_special_character').keyup(function (){
        validate_input_special_character(this);
    });
}

function show_settings(){
	$("#advanced_button").css("opacity", ".8");
	$("#settings_button").css("opacity", "1");
	$("#advanced").hide();
	$("#settings").show();
}
function show_advanced(){
	$("#advanced_button").css("opacity", "1");
	$("#settings_button").css("opacity", ".8");
	$("#settings").hide();
	$("#advanced").show();
}
function show_styles(){
	$("#animation").hide();
	$("#styles").show();
	

}
function show_animation(){
	$("#styles").hide();
	$("#animation").show();

}

function enable_colorpicker(myid){
	$('.demo').each( function() {
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
				var tempID = this.id.split("_")[0];
				$("#"+myid).css(tempID, value);
				if( !value ) return;
				if( opacity ) value += ', ' + opacity;
			},
			theme: 'bootstrap'
		});

	});

}

function enable_slider(myid, slider_array){
 
    slider_array = JSON.parse(slider_array);

    for ( var i =0 ; i<slider_array.length;i++){
	    var id ="";
	    var min_value ="";
	    var max_value ="";
	    var suffix="";
	    var slider_array_splitted = slider_array[i].split(';');
		id = slider_array_splitted[0];
		var property = id.replace('_slider',"");
		min_value = parseInt(slider_array_splitted[1]);
		max_value= parseInt(slider_array_splitted[2]);
		suffix= parseInt(slider_array_splitted[3]);
		var min_max = get_slider_min_max_value(myid, property, [min_value,max_value,'px']);
		min_value = min_max[0];
		max_value= min_max[1];
		suffix= min_max[2];
		var value= slider_array_splitted[4];
		value = value.split("p");
		value=value[0];
		if (value=='') value=min_value;
	    $("#"+id+"_input").val(value);
	    if($("#"+myid)[0].tagName == "IMG"){
	    	var slider_function_body = [
                                    '$("#'+id+'").slider({'+
	                                    'orientation: 	"horizontal",'+
	                                    'range: 		"min",'+
	                                    'min: 			'+min_value+','+
	                                    'max: 			'+max_value+','+
	                                    'value:  		'+value+','+
	                                    'slide: 		function (event, ui) {'+
				                                         '$("#'+id+'_input").val(ui.value);'+
				                                         'var pro = $("#'+id+'_input").val();'+
				                                         'set_image_ratio("'+property+'","'+myid+'",pro);'+
				                                         '$("#'+myid+'").css("'+property+'", pro+"'+suffix+'");'+
	                                        			'}'+
                                    '});'];
	    }else{
	    	var slider_function_body = [
                                    '$("#'+id+'").slider({'+
	                                    'orientation: 	"horizontal",'+
	                                    'range: 		"min",'+
	                                    'min: 			'+min_value+','+
	                                    'max: 			'+max_value+','+
	                                    'value:  		'+value+','+
	                                    'slide: 		function (event, ui) {'+
				                                         '$("#'+id+'_input").val(ui.value);'+
				                                         'var pro = $("#'+id+'_input").val();'+
				                                         '$("#'+myid+'").css("'+property+'", pro+"'+suffix+'");'+
	                                        			'}'+
                                    '});'];
	    }
	    
	                                        

	    window['custom_slider_'+i]= new Function(slider_function_body);
	    window['custom_slider_'+i]();

    }

}

function set_image_ratio(property,my_id,pro){
	var height = $("#"+my_id)[0].offsetHeight;
	var width = $("#"+my_id)[0].offsetWidth;
	
	if($("#"+my_id)[0].tagName == 'IMG'){
		if(property == "height"){
			var ratio = width/height;
			height = pro;
			var value = height*ratio;
			$("#width_slider").slider({value: value});
			$("#width_slider_input")[0].value = value;
	        $("#"+my_id).css("width",value+"px");
	        $("#"+my_id).css("height","");
		}else if(property == "width"){
			var ratio = height/width;
			width = pro;
			var value = width*ratio;
			$("#height_slider").slider({value: value});
			$("#height_slider_input")[0].value = value;
			$("#"+my_id).css("width",width+"px");
	        $("#"+my_id).css("height","");
		}
	}
} 

function show_preview(){
    $('#top-navbar-page_preview')[0].style.cssText+=' margin-left: 100%;';
    $('#top-navbar')[0].style.cssText+=' margin-left: 0%;';
    
    $('#page_preview')[0].style.cssText = $('#div_editorpreview')[0].style.cssText.replace("background-color: rgb(2, 52, 88)","background-color: rgba(2, 52, 88, 0)");
    $('#page_preview').show();

    page_preview_style =  $('#page_preview')[0].style.cssText;

    $('#top-navbar').animate({ marginLeft: "-100%"} , 1000);
    $('#top-navbar-page_preview').animate({ marginLeft: "0%"} , 1000);
    $('#top-navbar-page_preview').show();

    //$('body').css('background-image', 'none');
    save_my_settings();

    var iDiv = document.createElement('div');
      iDiv.innerHTML =  $("#div_editorpreview")[0].innerHTML;
    div_editorpreview = iDiv;
    $("#div_editorpreview")[0].innerHTML = "";
    $("#div_editorpreview").hide();
    if ( $('#mobile_preview') != null)
        $('#mobile_preview').css("display","none");
}

function show_editor(){
    $('#top-navbar-page_preview')[0].style.cssText+=' margin-left: 0%;';
    $('#top-navbar')[0].style.cssText+=' margin-left: -100%;';
    
    $("#div_editorpreview").show();
    $('#page_preview').hide();
    
    $('#top-navbar').animate({ marginLeft: "0%"} , 1000);
    $('#top-navbar-page_preview').animate({ marginLeft: "100%"} , 1000);

    
    //$('body').css('background-image', 'url('+base+'/files/editorscript/images/background5.jpg)');
    $("#div_editorpreview")[0].innerHTML = $(div_editorpreview)[0].innerHTML;

    if ( $('#mobile_preview') != null)
        $('#mobile_preview').css("display","none");
}
		
function clear_previous_panel_settings(){
	if ( $('#settings').length > 0 ){
		$('#settings').remove();
		$('#advanced').remove();
	}
}
function show_my_panel_for_settings(myid){
	clear_previous_panel_settings();
	var attr_val = get_css_attributes_value(myid);
	var  html_element_type = $("#"+myid)[0].tagName.toLowerCase();

	$("#element_tag_name")[0].innerHTML = "<b>"+$("#"+myid)[0].tagName+"</b> settings";
	
	var tags_css_attr= document.getElementById("tags_css_attr").value;
	var style_property= document.getElementById("style_property").value;
	
	tags_css_attr=JSON.parse(tags_css_attr);
    style_property=JSON.parse(style_property);

    if(myid == "div_editorpreview"){
    	tags_css_attr['div']['settings'] = 'text-align,background-color,font-size,background-repeat,background-position,background-size,background-attachment,color';
	    var temp = {};
	    temp['styles'] = "inline_css";
	    temp['animation'] = "";
	    tags_css_attr['div']['advanced']= temp;
    }
    if($("#"+myid).hasClass("row") || $("#"+myid).hasClass("main_container") || $("#"+myid)[0].className.indexOf("col-") > -1 ){
    	tags_css_attr['div']['settings'] = tags_css_attr['div']['settings'].replace(",width,height","");
    }
    if($("#"+myid).hasClass("fb-comments")){
    	tags_css_attr['div']['settings'] = "fb_comments_width,fb_comments_num_comments";
    	tags_css_attr['div']['advanced']= null;
    }

	if ( tags_css_attr [html_element_type]['settings'] !=null) var settings = tags_css_attr [html_element_type]['settings'].split(',');
	if ( tags_css_attr[html_element_type]['advanced'] != null) {  
		var advanced_styles =  tags_css_attr [html_element_type]['advanced']['styles'].split(',');
		var advanced_animation=  tags_css_attr [html_element_type]['advanced']['animation'].split(',');
	}else{
		advanced_styles = [];
		advanced_animation = [];
	}

	var dynamic_div_previous = document.getElementById('panel-body');
	
	var dynamic_div_settings = document.createElement('div');
	dynamic_div_settings.id = 'settings';
	dynamic_div_settings.style.cssText = 'padding:10px';
	
	var dynamic_div_advanced= document.createElement('div');
	dynamic_div_advanced.id = 'advanced';
	dynamic_div_advanced.style.cssText = 'padding:10px';
	
	var dynamic_div_advanced_styles= document.createElement('div');
	dynamic_div_advanced_styles.id = 'styles';

	var dynamic_div_advanced_animation= document.createElement('div');
	dynamic_div_advanced_animation.id = 'animation';

	var slider_id_array =new Array();
	var id = "";
	var min =  "";
	var max= "";
	var suffix="";
	var value = "";
	var counter = true;
	
	for ( var j=0 ; j<settings.length;j++){
		for (var k=0;k<Object.keys(style_property).length;k++){
			settings[j] = settings[j].replace(/\s/g,'');
			if (settings[j] == Object.keys(style_property[k]) ){
				var dynamic_div_child = document.createElement('div');
				dynamic_div_child.className="col-sm-12";
				dynamic_div_child.style.cssText="margin-top:10px;padding:0;";
			   
			    var dynamic_div="";
			    if ( style_property[k][settings[j]]['type']=='colorpicker' ){
					dynamic_div+='<label  style="margin-top:8px;" class="labeling_style col-sm-4">' +style_property[k][settings[j]]['label']+'</label>';
					dynamic_div+='<div style="padding-left:6.5%;padding-right:2%;" class=" pull-right col-sm-8" >';
						dynamic_div+='<div style="margin-bottom:0px;" class="form-group">';
							dynamic_div+='<input type="text" id="'+Object.keys(style_property[k])[0]+'_'+k+'" class="form-control demo" data-format="rgb" data-opacity="1" data-swatches="#fff|#000|#f00|#0f0|#00f|#ff0|rgba(0,0,255,0.5)"  value="'+attr_val[Object.keys(style_property[k])]+'">';
						dynamic_div+='</div>';
					 dynamic_div+='</div>';
				}else if ( style_property[k][settings[j]]['type']=='slider' ){
					dynamic_div+= '<label  style="margin-top:8px;" class="labeling_style col-sm-4">' +style_property[k][settings[j]]['label']+'</label>';
					dynamic_div+= '<div style="padding-left:7.5%;padding-right:2%;" class="pull-right col-sm-8" >';
						dynamic_div+= '<div class="pull-left" style="width: 76%;margin-top:5%;">';
							dynamic_div+= '<div class="custom_slider" id="'+Object.keys(style_property[k])+'_slider">';
							dynamic_div+='</div>';
						dynamic_div+='</div>';
						dynamic_div+= '<div class="pull-right text-center" style="width: 20%;">';
							dynamic_div+='<input id="'+Object.keys(style_property[k])+'_slider_input" onkeyup="slider_input_change_property(this,\''+myid+'\')" onchange="slider_input_change_property(this,\''+myid+'\')" type="number" class="form-control input-sm" style="text-align: center;font-size:12px;padding:1px 1px;">';
						dynamic_div+='</div>';
					dynamic_div+= '</div>';
							
					id = Object.keys(style_property[k])+"_slider";
					min =  style_property[k][settings[j]]['min'];
					max= style_property[k][settings[j]]['max'];
					suffix=style_property[k][settings[j]]['suffix'];
					value = attr_val[Object.keys(style_property[k])];
					if (value=='') value=min;
					slider_id_array.push ( id+';'+min+';'+max+';'+suffix+';'+value);	
				}else if ( style_property[k][settings[j]]['type']=='dropdown' ){
					dynamic_div+= '<label  style="margin-top:8px;" class="labeling_style col-sm-4">' +style_property[k][settings[j]]['label']+'</label>';
					dynamic_div+= '<div style="padding-left:6.5%;padding-right:2%;" class="pull-right col-sm-8" >';
					dynamic_div+= '<select class="form-control" id="'+Object.keys(style_property[k])+'_'+k+'" onchange="dropdown_live_preview(this,\''+myid+'\')">';
					for ( i=0 ; i<Object.keys(style_property[k][settings[j]]['options']).length;i++){
						if( attr_val[Object.keys(style_property[k])].includes(style_property[k][settings[j]]['options'][Object.keys(style_property[k][settings[j]]['options'])[i]])){
							dynamic_div+= '<option value="'+style_property[k][settings[j]]['options'][Object.keys(style_property[k][settings[j]]['options'])[i]]+'" selected>'+Object.keys(style_property[k][settings[j]]['options'])[i]+'</option>';
						}else{
							dynamic_div+= '<option value="'+style_property[k][settings[j]]['options'][Object.keys(style_property[k][settings[j]]['options'])[i]]+'">'+Object.keys(style_property[k][settings[j]]['options'])[i]+'</option>';
						}
					}
					dynamic_div+= '</select>';
					dynamic_div+= '</div>';
				}else if ( style_property[k][settings[j]]['type']=='placeholder' ){
				  var placeholder = document.getElementById( myid).placeholder;
					dynamic_div+= '<div id="settings_option" class="col-sm-12" style="padding:0;">';
						dynamic_div+='<label  style="margin-top:8px;" class="labeling_style col-sm-4">' +style_property[k][settings[j]]['label']+'</label>';
						dynamic_div+='<div style="padding-left:6.5%;padding-right:2%;" class=" pull-right col-sm-8" >';
							dynamic_div+='<div style="margin-bottom:0px;" class="form-group">';
								dynamic_div+='<input onblur ="set_attributes(\''+myid+'\',this,\'placeholder\',1)" onkeyup ="set_attributes(\''+myid+'\',this,\'placeholder\',0)" type="text" id="'+Object.keys(style_property[k])[0]+'_'+k+'"  value="'+placeholder+'" class="form-control" >';
							dynamic_div+='</div>';
						 dynamic_div+='</div>';		
					dynamic_div+= '</div>';
				}else if ( style_property[k][settings[j]]['type']=='href' ){
                  var href = document.getElementById( myid).href;
                        dynamic_div+='<label  style="margin-top:8px;" class="labeling_style col-sm-4">' +style_property[k][settings[j]]['label']+'</label>';
                        dynamic_div+='<div style="padding-left:6.5%;padding-right:2%;" class=" pull-right col-sm-8" >';
                            dynamic_div+='<div style="margin-bottom:0px;" class="form-group">';
                                dynamic_div+='<input onblur ="set_attributes(\''+myid+'\',this,\'href\',1)" onkeyup ="set_attributes(\''+myid+'\',this,\'href\',0)" type="text" id="'+Object.keys(style_property[k])[0]+'_'+k+'"  value="'+href+'" class="form-control" >';
                            dynamic_div+='</div>';
                         dynamic_div+='</div>';
                }else if ( style_property[k][settings[j]]['type']=='alt' ){
                  var alt = document.getElementById( myid).alt;
                        dynamic_div+='<label  style="margin-top:8px;" class="labeling_style col-sm-4">' +style_property[k][settings[j]]['label']+'</label>';
                        dynamic_div+='<div style="padding-left:6.5%;padding-right:2%;" class=" pull-right col-sm-8" >';
                            dynamic_div+='<div style="margin-bottom:0px;" class="form-group">';
                                dynamic_div+='<input onblur ="set_attributes(\''+myid+'\',this,\'alt\',1)" onkeyup ="set_attributes(\''+myid+'\',this,\'alt\',0)" type="text" id="'+Object.keys(style_property[k])[0]+'_'+k+'"  value="'+alt+'" class="form-control validate_input_special_character" >';
                            dynamic_div+='</div>';
                         dynamic_div+='</div>';
                }else if ( style_property[k][settings[j]]['type']=='text_input' ){
					var text_input = $("#"+myid)[0].innerHTML;
					dynamic_div+= '<div class="col-sm-12" style="padding:0;">';
					    dynamic_div+='<label  style="margin-top:8px;" class="labeling_style col-sm-4">' +style_property[k][settings[j]]['label']+'</label>';
					    dynamic_div+='<div style="padding-left:6.5%;padding-right:2%;" class=" pull-right col-sm-8" >';
					        dynamic_div+='<div style="margin-bottom:0px;" class="form-group">';
					            dynamic_div+='<textarea onblur="set_content(\''+myid+'\',this,1)" onkeyup="set_content(\''+myid+'\',this,0)" id="'+Object.keys(style_property[k])[0]+'_'+k+'" class="form-control" style="resize: vertical;">'+text_input+'</textarea>';
					            if($("#"+myid)[0].tagName != "LI"){
					            	dynamic_div+='<a class="pull-right" style="cursor: pointer; color: #0074c7 !important; font-size: 12px;" data-toggle="modal" data-target="#editor_popup_to_change_text" onclick="open_editor_to_edit_text(\''+Object.keys(style_property[k])[0]+'_'+k+'\')">Edit with editor</a>'; 
					            }
					        dynamic_div+='</div>';
					     dynamic_div+='</div>';       
					dynamic_div+= '</div>';
                }else if ( style_property[k][settings[j]]['type']=='fb_comments_width' ){
                  	var fb_comments_width = $("#"+myid)[0].dataset.width;
                        dynamic_div+='<label  style="margin-top:8px;" class="labeling_style col-sm-4">' +style_property[k][settings[j]]['label']+'</label>';
                        dynamic_div+='<div style="padding-left:6.5%;padding-right:2%;" class=" pull-right col-sm-8" >';
                            dynamic_div+='<div style="margin-bottom:0px;" class="form-group">';
                                dynamic_div+='<input onblur ="set_attributes(\''+myid+'\',this,\'data-width\',1)" onkeyup ="set_attributes(\''+myid+'\',this,\'data-width\',0)" type="text" id="'+Object.keys(style_property[k])[0]+'_'+k+'"  value="'+fb_comments_width+'" class="form-control" >';
                            dynamic_div+='</div>';
                         dynamic_div+='</div>';
                }else if ( style_property[k][settings[j]]['type']=='fb_comments_num_comments' ){
                  	var fb_comments_num_comments = $("#"+myid)[0].dataset.numposts;
                        dynamic_div+='<label  style="margin-top:8px;" class="labeling_style col-sm-4">' +style_property[k][settings[j]]['label']+'</label>';
                        dynamic_div+='<div style="padding-left:6.5%;padding-right:2%;" class=" pull-right col-sm-8" >';
                            dynamic_div+='<div style="margin-bottom:0px;" class="form-group">';
                                dynamic_div+='<input onblur ="set_attributes(\''+myid+'\',this,\'data-numposts\',1)" onkeyup ="set_attributes(\''+myid+'\',this,\'data-numposts\',0)" type="text" id="'+Object.keys(style_property[k])[0]+'_'+k+'"  value="'+fb_comments_num_comments+'" class="form-control" >';
                            dynamic_div+='</div>';
                         dynamic_div+='</div>';
                }

                if ( (html_element_type =='img' || html_element_type == 'video' || html_element_type == 'iframe' || html_element_type == 'div') && counter && !$("#"+myid).hasClass("fb-comments")){
					var src ="";
					var label_img = "Src";
					if(html_element_type =='img'){src = $("#"+myid)[0].src; label_img="Image src";}
					if(html_element_type =='video'){src = $("#"+myid)[0].currentSrc; label_img="Video src";}
					if(html_element_type =='iframe'){src = $("#"+myid)[0].src; label_img="Embeded src";}
					if(html_element_type =='div'){
						src = ($("#"+myid)[0].style.backgroundImage.replace('url("','')).replace('")','');
						label_img="BG image";
					}

					dynamic_div+= '<div class="col-sm-12" style="padding:0; margin-top:10px;">';
						dynamic_div+= '<label  style="margin-top:8px;" class="labeling_style col-sm-4">'+label_img+'</label>';
						dynamic_div+= '<div style="padding-left:6.5%;padding-right:2%;" class="pull-right col-sm-8 input-group" >';
							dynamic_div+='<input type="text" class="form-control" id="image_src_input_'+k+'" onchange="set_attributes(\''+myid+'\',this,\'src\',1)" value="'+src+'"  placeholder="Paste your url here.">';
							if(html_element_type != 'iframe'){
								dynamic_div+='<span class="input-group-btn">';
									dynamic_div+='<button class="btn btn-secondary" type="button" style="padding: 6px 10px; margin-top:0; " onclick="document.getElementById(\'image_file_upload\').click();"><i class="fa fa-cloud-upload" aria-hidden="true"></i></button>';
								dynamic_div+='</span>';
								dynamic_div+='<span class="input-group-btn">';
									dynamic_div+='<button class="btn btn-secondary" type="button" onclick="$(\'#image_src_input_field_id\')[0].value = \'image_src_input_'+k+'\'; load_image_library_from_json(1,\'settings\');" data-toggle="modal" data-target="#show_image_library" style="padding: 6px 10px; margin-top:0; border-left: 1px solid #b7b7b7;"><i class="fa fa-th-large" aria-hidden="true"></i></button>';
								dynamic_div+='</span>';
							}
						dynamic_div+= '</div>';
						dynamic_div+='<input style="display:none;" type="file"  id="image_file_upload" onchange="javascript:upload_image_raw(this,\'contestHeaderImagePreview\', \''+base+'/editor/?process=upload_an_image_to_cloud&preview_width=100&preview_height=100\', \''+base+'\', \'file_uploaded\');">';
						dynamic_div+='<span style="display:none;color:green;64px;width:100%;"  id="contestHeaderImagePreview"></span>';
						dynamic_div+='<input  style="display:none;"  id="last_changed_img_video_id" value="image_src_input_'+k+'">';
					dynamic_div+= '</div>';
					counter = false;
				}

				dynamic_div_child.innerHTML += dynamic_div;
				dynamic_div_settings.appendChild(dynamic_div_child);

			}
		}
	}
	document.getElementById("settings_div").appendChild( dynamic_div_settings ); 

	var buttons = "";
	if($("#"+myid).hasClass("main_container")){
		buttons +='<div id="settings_save"  onclick="save_my_settings();" style="width: 100%">Save</div>';
	}else if($("#"+myid)[0].tagName == "IFRAME" || $("#"+myid).hasClass("timer_wrapper") || $("#"+myid).hasClass("dont_clone")){
		buttons +='<div id="settings_save"  onclick="save_my_settings();" style="width: 50%">Save</div>';
		buttons +='<div id="settings_remove"  onclick="hover_remove_me(\''+myid+'\');" style="width: 50%">Remove</div>';
	}else{
		buttons +='<div id="settings_save"  onclick="save_my_settings();" style="width: 33.3%">Save</div>';
		buttons +='<div id="settings_clone"  onclick="hover_make_a_clone(\''+myid+'\');" style="width: 33.3%" >Clone</div>';
		buttons +='<div id="settings_remove"  onclick="hover_remove_me(\''+myid+'\');" style="width: 33.3%">Remove</div>';
	}

	document.getElementById("footer-buttons").innerHTML = buttons; 
	
	for ( var j=0 ; j<advanced_styles.length;j++){
		for (var k=0;k<Object.keys(style_property).length;k++){
			if (advanced_styles[j] == Object.keys(style_property[k]) ){
				var dynamic_div_child = document.createElement('div');
				dynamic_div_child.className="col-sm-12";
				dynamic_div_child.style.cssText="margin-top:10px;padding:0";
			    var dynamic_div="";
			    
				if ( style_property[k][advanced_styles[j]]['type']=='colorpicker' ){
					dynamic_div+='<label  style="margin-top:8px;" class="labeling_style col-sm-4">' +style_property[k][advanced_styles[j]]['label']+'</label>';
					dynamic_div+='<div style="padding-left:6.5%;padding-right:2%;" class=" pull-right col-sm-8" >';
						dynamic_div+='<div style="margin-bottom:0px;" class="form-group">';
							dynamic_div+='<input type="text" id="'+Object.keys(style_property[k])[0]+'_'+k+'" class="form-control demo" data-format="rgb" data-opacity="1" data-swatches="#fff|#000|#f00|#0f0|#00f|#ff0|rgba(0,0,255,0.5)"  value="'+attr_val[Object.keys(style_property[k])]+'">';
						dynamic_div+='</div>';
					 dynamic_div+='</div>';		
					dynamic_div+= '</div>';	
				}
				
					if ( style_property[k][advanced_styles[j]]['type']=='slider' ){
						dynamic_div+= '<label  style="margin-top:8px;" class="labeling_style col-sm-4">' +style_property[k][advanced_styles[j]]['label']+'</label>';
						dynamic_div+= '<div style="padding-left:7.5%;padding-right:2%;" class="pull-right col-sm-8" >';
							dynamic_div+= '<div class="pull-left" style="width: 76%;margin-top:5%;">';
								dynamic_div+= '<div class="custom_slider" id="'+Object.keys(style_property[k])+'_slider">';
								dynamic_div+='</div>';
							dynamic_div+='</div>';
							dynamic_div+= '<div class="pull-right text-center" style="width: 20%;">';
								dynamic_div+='<input id="'+Object.keys(style_property[k])+'_slider_input" onkeyup="slider_input_change_property(this,\''+myid+'\')" onchange="slider_input_change_property(this,\''+myid+'\')" type="number" class="form-control input-sm" style="text-align: center;font-size:12px;padding:1px 1px;">';
							dynamic_div+='</div>';
						dynamic_div+= '</div>';
							
						id = Object.keys(style_property[k])+"_slider";
						min =  style_property[k][advanced_styles[j]]['min'];
						max= style_property[k][advanced_styles[j]]['max'];
						suffix=style_property[k][advanced_styles[j]]['suffix'];
						value = attr_val[Object.keys(style_property[k])];
						if (value=='') value=min;
						slider_id_array.push ( id+';'+min+';'+max+';'+suffix+';'+value);	
						
				}		
				if ( style_property[k][advanced_styles[j]]['type']=='dropdown' ){
					dynamic_div+= '<label  style="margin-top:8px;" class="labeling_style col-sm-4">' +style_property[k][advanced_styles[j]]['label']+'</label>';
					dynamic_div+= '<div style="padding-left:6.5%;padding-right:2%;" class="pull-right col-sm-8" >';
					dynamic_div+= '<select class="form-control" id="'+Object.keys(style_property[k])+'_'+k+'" onchange="dropdown_live_preview(this,\''+myid+'\')">';

					for ( i=0 ; i<Object.keys(style_property[k][advanced_styles[j]]['options']).length;i++){
						if( style_property[k][advanced_styles[j]]['options'][Object.keys(style_property[k][advanced_styles[j]]['options'])[i]] == attr_val[Object.keys(style_property[k])]){
							dynamic_div+= '<option value="'+style_property[k][advanced_styles[j]]['options'][Object.keys(style_property[k][advanced_styles[j]]['options'])[i]]+'" selected>'+Object.keys(style_property[k][advanced_styles[j]]['options'])[i]+'</option>';
						}else{
							dynamic_div+= '<option value="'+style_property[k][advanced_styles[j]]['options'][Object.keys(style_property[k][advanced_styles[j]]['options'])[i]]+'">'+Object.keys(style_property[k][advanced_styles[j]]['options'])[i]+'</option>';
						}
					 }
					 dynamic_div+= '</select>';
					dynamic_div+= '</div>';
				}	

				if ( style_property[k][advanced_styles[j]]['type']=='add_class' ){
                    var text_input = get_original_classes(myid);
                    text_input = text_input.trim();
                    dynamic_div+= '<div class="col-sm-12" style="padding:0;">';
                        dynamic_div+='<label  style="margin-top:8px;" class="labeling_style col-sm-4">' +style_property[k][advanced_styles[j]]['label']+'</label>';
                        dynamic_div+='<div style="padding-left:6.5%;padding-right:2%;" class=" pull-right col-sm-8" >';
                            dynamic_div+='<div style="margin-bottom:0px;" class="form-group">';
                                dynamic_div+='<textarea onblur="add_class_into_element(\''+myid+'\',this)" id="'+Object.keys(style_property[k])[0]+'_'+k+'" class="form-control validate_input_special_character" style="resize: vertical;">'+text_input+'</textarea>';
                            dynamic_div+='</div>';
                         dynamic_div+='</div>';       
                    dynamic_div+= '</div>';
                }

				if ( style_property[k][advanced_styles[j]]['type']=='inline_css' ){
                    var text_input = $("#"+myid)[0].style.cssText;
                    dynamic_div+= '<div class="col-sm-12" style="padding:0;">';
                        dynamic_div+='<label  style="margin-top:8px;" class="labeling_style col-sm-4">' +style_property[k][advanced_styles[j]]['label']+'</label>';
                        dynamic_div+='<div style="padding-left:6.5%;padding-right:2%;" class=" pull-right col-sm-8" >';
                            dynamic_div+='<div style="margin-bottom:0px;" class="form-group">';
                                dynamic_div+='<textarea onblur="set_inline_css(\''+myid+'\',this)" id="'+Object.keys(style_property[k])[0]+'_'+k+'" class="form-control" style="resize: vertical;">'+text_input+'</textarea>';
                            dynamic_div+='</div>';
                         dynamic_div+='</div>';       
                    dynamic_div+= '</div>';
                }
				
				dynamic_div_child.innerHTML+=dynamic_div;
				dynamic_div_advanced_styles.appendChild(dynamic_div_child);  
				
			}
		}
	}
	
	for ( var j=0 ; j<advanced_animation.length;j++){
		for (var k=0;k<Object.keys(style_property).length;k++){
			if (advanced_animation[j] == Object.keys(style_property[k]) ){
				var dynamic_div_child = document.createElement('div');
				dynamic_div_child.className="col-sm-12";
				dynamic_div_child.style.cssText="margin-top:10px;padding:0;";
			    var dynamic_div="";
				if ( style_property[k][advanced_animation[j]]['type']=='colorpicker' ){
					dynamic_div+='<label  style="margin-top:8px;" class="labeling_style col-sm-4">' +style_property[k][advanced_animation[j]]['label']+'</label>';
					dynamic_div+='<div style="padding-left:6.5%;padding-right:2%;" class=" pull-right col-sm-8" >';
						dynamic_div+='<div  style="margin-bottom:0px;" class="form-group">';
							dynamic_div+='<input type="text" id="'+Object.keys(style_property[k])[0]+'_'+k+'" class="form-control demo" data-format="rgb" data-opacity="1" data-swatches="#fff|#000|#f00|#0f0|#00f|#ff0|rgba(0,0,255,0.5)"  value="'+attr_val[Object.keys(style_property[k])]+'">';
						dynamic_div+='</div>';
					 dynamic_div+='</div>';
				}
			
				if ( style_property[k][advanced_animation[j]]['type']=='slider' ){
					dynamic_div+= '<label  style="margin-top:8px;" class="labeling_style col-sm-4">' +style_property[k][advanced_animation[j]]['label']+'</label>';
					dynamic_div+= '<div style="padding-left:7.5%;padding-right:2%;" class="pull-right col-sm-8" >';
						dynamic_div+= '<div class="pull-left" style="width: 76%;margin-top:5%;">';
							dynamic_div+= '<div class="custom_slider" id="'+Object.keys(style_property[k])+'_slider">';
							dynamic_div+='</div>';
						dynamic_div+='</div>';
						dynamic_div+= '<div class="pull-right text-center" style="width: 20%;">';
							dynamic_div+='<input id="'+Object.keys(style_property[k])+'_slider_input" onkeyup="slider_input_change_property(this,\''+myid+'\')" onchange="slider_input_change_property(this,\''+myid+'\')" type="number" class="form-control input-sm" style="text-align: center;font-size:12px;padding:1px 1px;">';
						dynamic_div+='</div>';
					dynamic_div+= '</div>';
					
				    id = Object.keys(style_property[k])+"_slider";
					min =  style_property[k][advanced_animation[j]]['min'];
					max= style_property[k][advanced_animation[j]]['max'];
					suffix=style_property[k][advanced_animation[j]]['suffix'];
					value = attr_val[Object.keys(style_property[k])];
					if (value=='') value=min;
					slider_id_array.push ( id+';'+min+';'+max+';'+suffix+';'+value);	
					
			}		
			if ( style_property[k][advanced_animation[j]]['type']=='dropdown' ){
				dynamic_div+= '<label  style="margin-top:8px;" class="labeling_style col-sm-4">' +style_property[k][advanced_animation[j]]['label']+'</label>';
				dynamic_div+= '<div style="padding-left:6.5%;padding-right:2%;" class="pull-right col-sm-8" >';
				dynamic_div+= '<select class="form-control" id="'+Object.keys(style_property[k])+'_'+k+'" onchange="dropdown_live_preview(this,\''+myid+'\')">';
				 for ( i=0 ; i<Object.keys(style_property[k][advanced_animation[j]]['options']).length;i++){
					if( style_property[k][advanced_animation[j]]['options'][Object.keys(style_property[k][advanced_animation[j]]['options'])[i]] == attr_val[Object.keys(style_property[k])]){
						dynamic_div+= '<option value="'+style_property[k][advanced_animation[j]]['options'][Object.keys(style_property[k][advanced_animation[j]]['options'])[i]]+'" selected>'+Object.keys(style_property[k][advanced_animation[j]]['options'])[i]+'</option>';
					}else{
						dynamic_div+= '<option value="'+style_property[k][advanced_animation[j]]['options'][Object.keys(style_property[k][advanced_animation[j]]['options'])[i]]+'">'+Object.keys(style_property[k][advanced_animation[j]]['options'])[i]+'</option>';
					}
				 }
				 dynamic_div+= '</select>';
				dynamic_div+= '</div>';
			}	
			dynamic_div_child.innerHTML+=dynamic_div;
			dynamic_div_advanced_styles.appendChild(dynamic_div_child);  
			}
		}
	}
	
	dynamic_div_advanced.appendChild(dynamic_div_advanced_styles);  
	dynamic_div_advanced.appendChild(dynamic_div_advanced_animation);  
	document.getElementById("advanced_div").appendChild( dynamic_div_advanced ); 
	
	$("#advanced").hide();
	enable_colorpicker(myid);
	enable_slider (myid , JSON.stringify(slider_id_array));
	open_all_element_option();
}

function add_class_into_element(my_id,me){
	var input_classes = $(me)[0].value;
	input_classes = input_classes.split(" ");
	var editor_classes = get_editor_classes(my_id);
	editor_classes = editor_classes.split(" ");
	$("#"+my_id)[0].className = "";
	for(var i=0;i<editor_classes.length;i++){
		$("#"+my_id).addClass(editor_classes[i]);
	}
	for(var i=0;i<input_classes.length;i++){
		$("#"+my_id).addClass(input_classes[i]);
	}

	$("#"+my_id).removeClass('click_show_my_border');
	$("#"+my_id).removeClass('hover_disable');
	$("#"+my_id).removeClass('ui-sortable-handle');
	$("#"+my_id).removeClass('ui-sortable');

	var value = $("#"+my_id)[0].className;
	var change_type = 'class';
    var html_data = document.getElementById('editor_preview_data').value;
    html_data = JSON.parse(html_data);
    html_data = set_attributes_to_json(my_id , value , change_type  , html_data);
    document.getElementById('editor_preview_data').value = JSON.stringify(html_data);
}

function set_inline_css(my_id,me){
	var value = $(me).val();
	$("#"+my_id)[0].style.cssText = value;
}

function set_content(my_id,me,fun){
	if(fun == 1){
		var html_data = document.getElementById('editor_preview_data').value;
		if( html_data != '' ) {
			html_data = JSON.parse( html_data );
			html_data = set_json_content_value(my_id,html_data);
			document.getElementById('editor_preview_data').value = JSON.stringify(html_data);
		}
	}
	$("#"+my_id)[0].innerHTML = $(me)[0].value;
}

function upload_image_raw(image, preview_div, uploadUrl, base, callback ,type) {
    if( preview_div != "" ) document.getElementById(preview_div).style.display = 'inline-block';
    if( preview_div != "" ) document.getElementById(preview_div).innerHTML = '<span><img src=" '+base+'/files/editorscript/images/scanningwoohoo.gif  "  width="10%" /><span style="display:inline-block;"><h5 style="color:#85c0e7 ;">Uploading...</h5></span></span>';
  // Get the selected files from the input.
   var files = image.files;
   // Create a new FormData object.
   var formData = new FormData();
   // Loop through each of the selected files.
   for (var i = 0; i < files.length; i++) {
     var file = files[i];
     // Check the file type.
     if (file.type.match('image.*')) {
        formData.append('image[]', file, file.name);
     }
      if (file.type.match('video.*')) {
        formData.append('image[]', file, file.name);
     }
     // Add the file to the request.
   }    
   // Set up the request.
   var xhr = new XMLHttpRequest();
   // Open the connection.
   xhr.open('POST', uploadUrl, true);
   // Set up a handler for when the request finishes.
   xhr.onload = function () {
     if (xhr.status === 200) {
       // File(s) uploaded.
       if( preview_div != "" ) document.getElementById(preview_div).style.display = 'inline-block';
        if( preview_div != "" ) document.getElementById(preview_div).innerHTML = '<span><img src=" '+base+'/files/editorscript/images/check.gif  "  width="10%" /><span style="display:inline-block;"><h5 style="color:#85c0e7 ;">File uploaded successfully.</h5></span></span>';
       setTimeout(function(){
              if( preview_div != "" ) document.getElementById(preview_div).style.display = 'none';
        },2000);
       var responseText = xhr.responseText;
       if(callback != '' ) {            
           window[callback](preview_div, responseText,type);
       }
     } else {
        if( preview_div != "" ) document.getElementById(preview_div).style.display = 'none';
        if( preview_div != "" ) document.getElementById(preview_div).style.display = 'inline-block';
        if( preview_div != "" ) document.getElementById(preview_div).innerHTML = '<span style="color:#FF5D5D ;"><i class="fa fa-times" aria-hidden="true"></i> '+xhr.responseText+'</span>';
        setTimeout(function(){
              if( preview_div != "" ) document.getElementById(preview_div).style.display = 'none';
        },3000);
     }
   };
   // Send the Data.
   xhr.send(formData);
   return false;
}

function file_uploaded( preview_div, response ,type ) {    

    if (type=="seo"){
        var element = document.getElementById('seo_page_image');
        element.value=response;
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("change", false, true);
        element.dispatchEvent(evt);
    }

    else {
        var last_changed_img_video_id = document.getElementById('last_changed_img_video_id').value;
        var element = document.getElementById(last_changed_img_video_id);
        element.value=response;
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("change", false, true);
        element.dispatchEvent(evt);
    } 
    var data = 'shop_id='+ $("#shop_id")[0].value;
    data += '&uploaded_url='+response;
    http_post_request( base + '/editor/?process=upload_this_image', data , 'nothing_to_do' );
    add_current_image_to_media(response);
}

function nothing_to_do(res){
	show_editor_msg(res , 1);
}

function add_current_image_to_media(url){
	var drag_and_drop_elements = JSON.parse($("#drag_and_drop_elements")[0].value);
    var img = '{"tag":"img","endtag":1,"attributes":{"style":"width: 500px; max-width:100%;text-align:center;","src":"'+url+'"}}';
    var temp = {};
    temp['html'] = JSON.parse(img);
    temp['id'] = "uploads_image_url_js_"+mdid;
    drag_and_drop_elements.push(temp);
    $("#drag_and_drop_elements")[0].value = JSON.stringify(drag_and_drop_elements);

    var all_image = $("#image_library")[0].value;
    all_image = JSON.parse(all_image);
    //all_image.push(temp);
    all_image.splice(0,0,temp);

    $("#image_library")[0].value = JSON.stringify(all_image);
    mdid++;
}

function dropdown_live_preview(me){
	my_id = $('#current_editable_element_id').val();
	var type = me.id.split("_")[0];
	var html_data = document.getElementById('editor_preview_data').value;
    html_data = JSON.parse(html_data);
	if(type == 'href-target'){
        html_data = set_attributes_to_json(my_id , me.value , "target"  , html_data);
        document.getElementById('editor_preview_data').value = JSON.stringify(html_data);
	}else if(type == 'position'){
		var tagname = document.getElementById(my_id).tagName;
		if(tagname == 'IFRAME'){
			if(me.value == "center"){
				var class_name = "iframeCenter";
				if(!$("#"+my_id).hasClass(class_name)){
					html_data = add_class_to_json(my_id,class_name,html_data);
					$("#"+my_id).addClass(class_name);
					var remove_this_class = 'iframeRight';
					html_data = remove_class_from_json(my_id,remove_this_class,html_data);
					$("#"+my_id).removeClass(remove_this_class);
				}
			}else if(me.value == "right"){
				var class_name = "iframeRight";
				if(!$("#"+my_id).hasClass(class_name)){
					html_data = add_class_to_json(my_id,class_name,html_data);
					$("#"+my_id).addClass(class_name);
					var remove_this_class = 'iframeCenter';
					html_data = remove_class_from_json(my_id,remove_this_class,html_data);
					$("#"+my_id).removeClass(remove_this_class);
				}
			}else if(me.value == "left"){
				if($("#"+my_id).hasClass('iframeCenter')){
					class_name = 'iframeCenter';
					html_data = remove_class_from_json(my_id,class_name,html_data);
					$("#"+my_id).removeClass(class_name);
				}else if($("#"+my_id).hasClass('iframeRight')){
					class_name = 'iframeRight';
					html_data = remove_class_from_json(my_id,class_name,html_data);
					$("#"+my_id).removeClass(class_name);
				}
			}
		}else{
			if(me.value == "center"){
				var class_name = "position-center";
				if(!$("#"+my_id).hasClass(class_name)){
					html_data = add_class_to_json(my_id,class_name,html_data);
					$("#"+my_id).addClass(class_name);
					var remove_this_class = 'position-right';
					html_data = remove_class_from_json(my_id,remove_this_class,html_data);
					$("#"+my_id).removeClass(remove_this_class);
				}
			}else if(me.value == "right"){
				var class_name = "position-right";
				if(!$("#"+my_id).hasClass(class_name)){
					html_data = add_class_to_json(my_id,class_name,html_data);
					$("#"+my_id).addClass(class_name);
					var remove_this_class = 'position-center';
					html_data = remove_class_from_json(my_id,remove_this_class,html_data);
					$("#"+my_id).removeClass(remove_this_class);
				}
			}else if(me.value == "left"){
				if($("#"+my_id).hasClass('position-center')){
					class_name = 'position-center';
					html_data = remove_class_from_json(my_id,class_name,html_data);
					$("#"+my_id).removeClass(class_name);
				}else if($("#"+my_id).hasClass('position-right')){
					class_name = 'position-right';
					html_data = remove_class_from_json(my_id,class_name,html_data);
					$("#"+my_id).removeClass(class_name);
				}
			}
		}
			
	}else if(type == 'hide-on-mobile'){
		var class_name = "hidden-xs";
		if(me.value == "yes"){
			if(!$("#"+my_id).hasClass(class_name)){
				html_data = add_class_to_json(my_id,class_name,html_data);
				$("#"+my_id).addClass(class_name);
			}
		}else if(me.value == "no"){
			if($("#"+my_id).hasClass(class_name)){
				html_data = remove_class_from_json(my_id,class_name,html_data);
				$("#"+my_id).removeClass(class_name);
			}
		}
	}else if(type == 'hide-on-desktop'){
		var class_name = "hide-on-desktop";
		if(me.value == "yes"){
			if(!$("#"+my_id).hasClass(class_name)){
				html_data = add_class_to_json(my_id,class_name,html_data);
				$("#"+my_id).addClass(class_name);
			}
		}else if(me.value == "no"){
			if($("#"+my_id).hasClass(class_name)){
				html_data = remove_class_from_json(my_id,class_name,html_data);
				$("#"+my_id).removeClass(class_name);
			}
		}
	}else{
		$("#"+my_id).css(type, me.value);
	}

	document.getElementById('editor_preview_data').value = JSON.stringify(html_data);
}

function changed_css_element_ids(my_id){
	$('#current_editable_element_id').val(my_id);
	var edited_all_elements_id = $('#edited_all_elements_id').text();
	if(edited_all_elements_id == ""){
		edited_all_elements_id = new Array();
	}else{
		edited_all_elements_id = JSON.parse(edited_all_elements_id);
	}
	edited_all_elements_id.push(my_id);
	$('#edited_all_elements_id').text(JSON.stringify(edited_all_elements_id));
}


function get_slider_min_max_value(my_id, property, default_min_max){
	var tag_name = my_id.split("_")[0].toLowerCase();
	if(tag_name == 'img'){
		if(property == 'width')return [10,2560,'px'];
		if(property == 'height')return [10,1440,'px'];
		else return default_min_max;
	}
	if(tag_name == 'video'){
		if(property == 'width')return [50,2560,'px'];
		if(property == 'height')return [50,1440,'px'];
		else return default_min_max;
	}	
	return default_min_max;
}

function set_attributes(my_id , option , change_type,set_type){
    //~var my_id = $("#current_editable_element_id").val();
    if ( change_type== 'placeholder' ) {
         document.getElementById(my_id).placeholder = $(option).val();
    }
    if(my_id.split("_")[0] == 'div' && !$("#"+my_id).hasClass("fb-comments")){
        var url= 'url('+$(option).val()+')';
        $("#"+my_id).css('background-image',url);
    }else{
    	if(set_type == 1){
	        var value = $(option).val();
	        var html_data = document.getElementById('editor_preview_data').value;
	        html_data = JSON.parse(html_data);
	        html_data = set_attributes_to_json(my_id , value , change_type  , html_data);
	        document.getElementById('editor_preview_data').value = JSON.stringify(html_data);
	        $("#"+my_id)[0][change_type] = value;
	        //show_all_updated_view(html_data);
	    }
    }
}

function upload_image_or_video(me){

}

function slider_input_change_property(me,my_id){
	var value= $('#'+me.id).val();
	var property = me.id.split('_')[0];
	$('#'+my_id).css(property,value+"px");

	var slider_id = me.id.split('_input')[0];
	$("#"+slider_id).slider({
        value:  value                               
    });
	//enable_slider(myid, slider_array)
}
function show_variants(me){
	$( ".modal-content" ).removeClass( "modal_height_350" );
	$('#search_result').fadeOut();
	$('#search_result').empty();
	$('#select_product_from_bundle').val(me);
    var product_id = me.split('@@@@')[0];
    $('#info_1').val(product_id);
    var data = 'product_id=' + product_id;
    http_post_request( base + '/editor/?process=get_variants', data , 'received_variants' );
}
function received_variants(response){
    response = JSON.parse(response);
    document.getElementById('variant_options').innerHTML = response.html_data;
    $('#hidden_varient_options').val(response.option);
    $('#hidden_varient_options_name').val(JSON.stringify(response.option2));
}
function select_sale_variant(me,option){
	$("#add_bundle_product_btn").show();
    var select_val = $("#variant_options :input");
    var options = $('#hidden_varient_options').val();
    var combind_option = "";
    for(var i=0; i<select_val.length; i++){
        if (i == 0) { combind_option += $(select_val[i])[0].value ; }
        else{ combind_option += " / " + $(select_val[i])[0].value ; }
    }
    if (options.indexOf(combind_option) > -1) {
        document.getElementById('variant_message').innerHTML = "";
        $('#add_bundle_product_btn').prop('disabled', false);
    }
    else{
        document.getElementById('variant_message').innerHTML = "Out of stock";
        $('#add_bundle_product_btn').prop('disabled', true);
    }
}
function add_bundle_product(){
    var select_val = $("#variant_options :input");
    var combind_option = "";
    for(var i=0; i<select_val.length; i++){
        if (i == 0) { combind_option += $(select_val[i])[0].value ; }
        else{ combind_option += " / " + $(select_val[i])[0].value ; }
    }
    var product_id = document.getElementById('info_1').value;
    var product_name = $("#select_product_from_bundle")[0].value.split('@@@@')[1];
    var pro_det = product_name +'-'+ combind_option;
    var check_option = document.getElementById('added_bundle_products').innerHTML;
    check_option =  check_option.split('<br>');
    for (var i = 0; i < check_option.length; i++) {
        check_option[i]=check_option[i].trim();
    }
    if (jQuery.inArray( pro_det, check_option ) == -1) {
        var product_variants_arr = $("#hidden_varient_options_name")[0].value;
        product_variants_arr = JSON.parse(product_variants_arr);
        var variant_id = "";
        for (var i = 0; i < product_variants_arr.length; i++) {
            if(combind_option == product_variants_arr[i].variant_name[0])
            {
                variant_id = product_variants_arr[i].variants_id[0];
                break;
            }
        }
        var product_details = product_id + "@@@@" + variant_id + "@@@@" + product_name + "@@@@" + combind_option;
        $('#info_1').val(product_details);
        var page_id = document.getElementById('page_id').value;
        var product_array = document.getElementById('hidden_all_bundle_product').value;
        var info = page_id + "@@@@" + product_array;
        var data = 'product_details=' + encodeURIComponent(product_details);
        http_post_request( base + '/editor/?process=save_bundle_product_details&info='+info, data , 'saved_bundle_product_details' );
        //
        product_name +=  '-'+combind_option+'<br>';
        //
        document.getElementById('added_bundle_products').innerHTML += product_name;
        document.getElementById('variant_options').innerHTML = '';
        $('#add_bundle_product_btn').prop('disabled', true);
    }
    else
    {
        document.getElementById('variant_message').innerHTML = "Product already added";
    }
    
}

function saved_bundle_product_details(response){
   	if (response !="" ) {
       	var product = JSON.parse(response);
		var tableRef = document.getElementById('bundle_product_table').getElementsByTagName('tbody')[0];
		//var table = document.getElementById("bundle_product_table");
		var row = tableRef.insertRow(tableRef.rows.length);
		row.id = 'bundle_product_row'+rand;
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		cell1.className = 'bundle_table_product_image';
		cell2.className = 'bundle_table_product';
		cell3.className = 'bundle_table_td_variant';
		cell4.className = 'bundle_table_td_option';
		cell1.id = 'bundle_product_product_image'+rand;
		cell2.id = 'bundle_product_productname'+rand;
		cell3.id = 'bunble_product_productvariant'+rand;
		cell4.id = 'bundle_table_td_option'+rand;
		var img_url = product['product_details'][4][0];
		if (img_url) {
			img_url =  img_url.replace('.png','_thumb.png');
		    img_url =  img_url.replace('.jpg','_thumb.jpg');
		    img_url =  img_url.replace('.jpeg','_thumb.jpeg');
		    img_url =  img_url.replace('.gif','_thumb.gif');
		}
		cell1.innerHTML = '<img style="height:20px;" src="' + img_url + '">';
		cell2.innerHTML = product['product_details'][2];
		cell3.innerHTML = product['product_details'][3];
		cell4.innerHTML = '<a href="#" onclick="delete_bundle_product(' + rand + ');"><span class="label label-danger">Delete</span><a>';
		$('#hidden_all_bundle_product').val(product['product_array']);
		document.getElementById("product_table_div").style.display = "inline";
		document.getElementById("product_table_alternative_div").style.display = "none";
		rand = rand + 1;
   	}
   	$("#add_bundle_product_btn").hide();
}
function delete_bundle_product(index){
    var product_name = document.getElementById('bundle_product_productname'+index).innerHTML;
    var product_variant = document.getElementById('bunble_product_productvariant'+index).innerHTML;
    var page_id = document.getElementById('page_id').value;
    var product_array = document.getElementById('hidden_all_bundle_product').value;
    var info = page_id + "@@@@" + index + "@@@@" + product_array;
    var product_details = product_name + "@@@@" + product_variant;
    var data = 'product_details=' + product_details;
    var products = document.getElementById('added_bundle_products').innerHTML;
    products = products.trim();
    var va = product_name+"-"+product_variant+"<br>";
    var products = products.replace(va, "");
    document.getElementById('added_bundle_products').innerHTML = products;
    http_post_request( base + '/editor/?process=delete_bundle_product&info='+info, data , 'deleted_bundle_product_response' );
}
function deleted_bundle_product_response(response){
    response = JSON.parse(response);
    $('#hidden_all_bundle_product').val(response.product_array);
    var arr_size = JSON.parse(response.product_array);
    if (arr_size.length == 0) {
    	document.getElementById("product_table_div").style.display = "none";
        document.getElementById("product_table_alternative_div").style.display = "inline";
    }
    var index = response.index;
    $('table#bundle_product_table tr#bundle_product_row'+index).remove();
}
function final_save_bundle_product(){
    var page_id = document.getElementById('page_id').value;
    var product_array = document.getElementById('hidden_all_bundle_product').value;
    var data = 'product_details=' + encodeURIComponent(product_array);
    http_post_request( base + '/editor/?process=final_save_bundle_product&page_id='+page_id, data , 'saved_final_bundle_product' );
}
function saved_final_bundle_product(response){
    if (response!='') {
        var urll = base + '/editor/?page='+response;
        window.location = urll;
    }
}

//~CUSTOM SCRIPT


function insert_custom_script(){
	var page_id = document.getElementById('page_id').value;
	var custom_script = document.getElementById('custom_script_textarea').value;
	var temp_div = document.createElement("DIV");
	$(temp_div).append(custom_script);
	custom_script = "";
	for(var i=0;i<$(temp_div)[0].childNodes.length;i++){
		if($($(temp_div)[0].childNodes[i])[0].nodeName == "#text" && $($(temp_div)[0].childNodes[i])[0].textContent.trim() != ""){
			custom_script += '<script>'+$($(temp_div)[0].childNodes[i])[0].textContent.trim()+"</script>\n";
		}else if($($(temp_div)[0].childNodes[i])[0].nodeName == "SCRIPT"){
			custom_script += $($(temp_div)[0].childNodes[i])[0].outerHTML+"\n";
		}
	}

	var data = '&custom_script='+encodeURIComponent(custom_script);
    http_post_request( base + '/editor/?process=insert_custom_script&page_id='+page_id, data , 'insert_custom_script_finished' );
}

function insert_custom_body_script(){
	var page_id = document.getElementById('page_id').value;
	var custom_body_script = document.getElementById('custom_body_script_textarea').value;
	var temp_div = document.createElement("DIV");
	$(temp_div).append(custom_body_script);
	custom_body_script = "";
	for(var i=0;i<$(temp_div)[0].childNodes.length;i++){
		if($($(temp_div)[0].childNodes[i])[0].nodeName == "#text" && $($(temp_div)[0].childNodes[i])[0].textContent.trim() != ""){
			custom_body_script += '<script>'+$($(temp_div)[0].childNodes[i])[0].textContent.trim()+"</script>\n";
		}else if($($(temp_div)[0].childNodes[i])[0].nodeName == "SCRIPT"){
			custom_body_script += $($(temp_div)[0].childNodes[i])[0].outerHTML+"\n";
		}
	}

	var data = '&custom_body_script='+encodeURIComponent(custom_body_script);
    http_post_request( base + '/editor/?process=insert_custom_body_script&page_id='+page_id, data , 'insert_custom_body_script_finished' );
}

function insert_custom_script_finished(res){
	document.getElementById('custom_script_textarea').value = res;
	show_editor_msg("Script saved" , 1);
}

function insert_custom_body_script_finished(res){
	document.getElementById('custom_body_script_textarea').value = res;
	show_editor_msg("Script saved" , 1);
}

function insert_custom_css(){
	var page_id = document.getElementById('page_id').value;
	var custom_css = document.getElementById('custom_css_textarea').value;
	var temp_div = document.createElement("DIV");
	$(temp_div).append(custom_css);
	custom_css = "";
	for(var i=0;i<$(temp_div)[0].childNodes.length;i++){
		if($($(temp_div)[0].childNodes[i])[0].nodeName == "#text" && $($(temp_div)[0].childNodes[i])[0].textContent.trim() != ""){
			custom_css += '<style>'+$($(temp_div)[0].childNodes[i])[0].textContent.trim()+"</style>\n";
		}else if($($(temp_div)[0].childNodes[i])[0].nodeName == "STYLE"){
			custom_css += $($(temp_div)[0].childNodes[i])[0].outerHTML+"\n";
		}else if($($(temp_div)[0].childNodes[i])[0].nodeName == "LINK"){
			custom_css += $($(temp_div)[0].childNodes[i])[0].outerHTML+"\n";
		}
	}
	var data = '&custom_css='+encodeURIComponent(custom_css);
    http_post_request( base + '/editor/?process=insert_custom_css&page_id='+page_id, data , 'insert_custom_css_finished' );
}

function insert_custom_css_finished(res){
	document.getElementById('custom_css_textarea').value = res;
	show_editor_msg("CSS saved" , 1);
	var url = base + '/editor/?page='+document.getElementById('page_id').value;
	save_my_settings();
    window.location = url;
}

function overflow_control(element){
	var Overflow_Items = [];
	Overflow_Items = get_overflow_elements(element, Overflow_Items);
	for(var i=0;i<Overflow_Items.length;i++){
		if(!$(Overflow_Items[i]).hasClass("row")){
			$(Overflow_Items[i]).css("max-height", "100%");
			$(Overflow_Items[i]).css("max-width", "100%");
		}
	}
}

function get_overflow_elements(element,Overflow_Items){
	for(var i=0; i<element.children().length; i++){
		if (element.children()[i].offsetTop + element.children()[i].offsetHeight > element[0].offsetTop + element[0].offsetHeight || element.children()[i].offsetLeft + element.children()[i].offsetWidth > element[0].offsetLeft + element[0].offsetWidth ){
			Overflow_Items.push(element.children()[i]);
		}
		get_overflow_elements($(element.children()[i]),Overflow_Items);
	}
	return Overflow_Items;
}



function get_all_bootstrap_modal(){
	var all_modal = $('div.div_editorpreview').find('.modal');
	//show_all_pop_up_list
	var pop_up = "";

	pop_up += '<tr>';
    pop_up += '<td>1. Exit popup</td>';
    pop_up += '<td><input type="radio" id="exit_popup_on" name="exit_popup" value="on" onchange="exit_popup_status(1);"> On <input type="radio" id="exit_popup_off" name="exit_popup" value="off" onchange="exit_popup_status(0);"> Off <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#exit_popup" data-dismiss="modal" style="margin-left: 10px;">View</button></td>';
    pop_up += '</tr>';
	var k=2;
	for(var i=1;i<all_modal.length;i++){
		pop_up += '<tr>';
	    pop_up +='<td>'+k+'. Popup-'+i+'</td>'
	    pop_up +='<td><button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#'+all_modal[i].id+'" data-dismiss="modal" >View</button><button class="btn btn-sm btn-primary" style="margin-left: 10px; margin-right: 10px;" onclick="add_pop_up_button_to_json(\''+all_modal[i].id+'\')">Add pop up button</button><button class="btn btn-sm btn-danger" onclick="delete_this_popup(\''+all_modal[i].id+'\',this)">Delete</button></td>';
	    pop_up +='</tr>';
	    k++;
	}
    $("#show_all_pop_up_list")[0].innerHTML = pop_up;

    if($("#exit_popup_status")[0].value == 1){
    	document.getElementById("exit_popup_on").checked = true;
    }else{
    	document.getElementById("exit_popup_off").checked = true;
    }
    $("button[data-toggle='modal']").click(function(){
        setTimeout(function(){ sortable_state_change (); }, 500);
    });
}

function add_pop_up_button_to_json(modal_id){

	var deleted_element = '{"tag":"button","endtag":1,"attributes":{"class":"btn btn-primary","id":"'+get_valid_element_id("BUTTON")+'","onmouseover":"this_is_me(this,event)","ondblclick":"medium_edit_text(this,event)","onblur":"disable_medium_edit_text(this,event)","type":"button","data-toggle":"modal","data-target":"#'+modal_id+'"},"content":"Click me"}';
	
	my_new_prev_id = $("#current_editable_element_id")[0].value;
	if(my_new_prev_id == ""){
		my_new_prev_id = null;
		my_new_parent_id = "body_container";
	}else{
		my_new_parent_id = $("#"+my_new_prev_id).parent()[0].id;
	}
	
	var html_data = document.getElementById('editor_preview_data').value;
	if( html_data != '' ) {
		html_data = JSON.parse( html_data );
		html_data = insert_element_to_json(JSON.parse(deleted_element), my_new_parent_id, my_new_prev_id, html_data);
		document.getElementById('editor_preview_data').value = JSON.stringify(html_data);
		show_all_updated_view(html_data);
	}
	
}

function exit_popup_status(status){
	var data = 'page_id=' + encodeURIComponent( document.getElementById('page_id').value );
	data += '&exit_popup=' + encodeURIComponent( status );
	http_post_request( base + '/editor/?process=save_exit_popup_status', data , 'save_exit_popup_status_saved' );
}
function save_exit_popup_status_saved(res){
	$("#exit_popup_status")[0].value = res;
}

function delete_this_popup(my_id,me){
	$(me).parent().parent().remove();
	var html_data = document.getElementById('editor_preview_data').value;
	if( html_data != '' ) {
		html_data = JSON.parse( html_data );
		html_data = delete_element_from_json(my_id,"","","",html_data);
		document.getElementById('editor_preview_data').value = JSON.stringify(html_data);
	}
	add_button_inside_empty_div();
}

function find_timer(my_id){
	if(my_id != ""){
	    if($("#"+my_id).hasClass("timer_wrapper") || $("#"+my_id).hasClass("ever_green_timer") ){
	    	// remove_timer(my_id);
	    }else if($("#"+my_id)[0].children.length > 0){
	    	for(var i=0; i<$("#"+my_id)[0].children.length; i++){
		    	var tempid = $($("#"+my_id)[0].children[i])[0].id;
		    	find_timer(tempid);
		    }
	    }
	}
    
}

function set_hidden_timer_id(my_id){
	document.getElementById('hidden_timer_id').value = my_id;

	var all_timer_data = document.getElementById('all_timer_data').value;
	all_timer_data = JSON.parse(all_timer_data);
	
	if(all_timer_data != '' &&  all_timer_data.indexOf('[]') < 0 ){ 
		for (var i=0 ; i<all_timer_data.length;i++){
			if (all_timer_data[i]['timer_id']==my_id){
				console.log(all_timer_data[i]);
				$("#datepicker")[0].value = all_timer_data[i]['deadline'];
				if(all_timer_data[i]['datepicker_url'] != 'undefined'){
					$("#datepicker_url")[0].value = all_timer_data[i]['datepicker_url'];
				}
			}
		}
	}
}

function remove_timer(my_id){
	remove_editor_hover_conf();
	var timer_id = my_id;
	var all_timer_data = document.getElementById('all_timer_data').value;
	var all_eg_data = $('#all_eg_data').val();
	if(all_timer_data != ""){
		all_timer_data = JSON.parse(all_timer_data);
		for (var i=0 ; i<all_timer_data.length;i++){		
			if (all_timer_data[i]['timer_id']==timer_id){
				all_timer_data.splice(i,1);
			}
		}
		document.getElementById('all_timer_data').value = JSON.stringify(all_timer_data);
	}
	if(all_eg_data != ""){
		all_eg_data = JSON.parse(all_eg_data);
		for (var i=0 ; i<all_eg_data.length;i++){		
			if (all_eg_data[i]['eg_timer_id']==timer_id){
				all_eg_data.splice(i,1);
			}
		}
		document.getElementById('all_eg_data').value = JSON.stringify(all_eg_data);
	}
}

function save_timer_deadline(){
	interval_id_flag = 1;
	var all_timer_data = {};
	var timer_data = {};
	var timer_id = document.getElementById('hidden_timer_id').value;
	var deadline = document.getElementById('datepicker').value;
	all_timer_data = document.getElementById('all_timer_data').value;

	var datepicker_url = $("#datepicker_url")[0].value;

	if(all_timer_data != '' &&  all_timer_data.indexOf('[]') < 0 ){ 
		all_timer_data = JSON.parse(all_timer_data);
		var matched =false;
		for (var i=0 ; i<all_timer_data.length;i++){
			if (all_timer_data[i]['timer_id']==timer_id){
				timer_data['timer_id'] = timer_id;
				timer_data['deadline'] = deadline;
				timer_data['datepicker_url'] = datepicker_url;
				all_timer_data[i]=timer_data;
				matched=true;
			}
		}
		if (matched == false) {
			timer_data['timer_id'] = timer_id;
			timer_data['deadline'] = deadline;
			timer_data['datepicker_url'] = datepicker_url;
			all_timer_data.push(timer_data);
		}

		console.log("all_timer_data1");
		console.log(all_timer_data);
		document.getElementById('all_timer_data').value = JSON.stringify(all_timer_data);
	}
	else{		
		timer_data['timer_id'] = timer_id;
		timer_data['deadline'] = deadline;
		timer_data['datepicker_url'] = datepicker_url;
		all_timer_data = timer_data;
		console.log("all_timer_data2");
		console.log(all_timer_data);
		document.getElementById('all_timer_data').value = JSON.stringify(new Array(all_timer_data));
	}
	funnel_countdown( timer_id, deadline );
}
      

function funnel_show_the_clock(id, endtime) {
	var t = Date.parse(endtime) - Date.parse(new Date());
	if( t < 0 ) t = 0;
	var seconds = Math.floor((t / 1000) % 60);
	var minutes = Math.floor((t / 1000 / 60) % 60);
	var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
	var days = Math.floor(t / (1000 * 60 * 60 * 24));

	if( document.getElementById( id + '_timer_days_segment' ) != null ) document.getElementById( id + '_timer_days_segment' ).innerHTML = two_digit_number_format( days );
	if( document.getElementById( id + '_timer_hours_segment' ) != null ) document.getElementById( id + '_timer_hours_segment' ).innerHTML = two_digit_number_format( hours );
	if( document.getElementById( id + '_timer_minutes_segment' ) != null ) document.getElementById( id + '_timer_minutes_segment' ).innerHTML = two_digit_number_format( minutes );
	if( document.getElementById( id + '_timer_seconds_segment' ) != null ) document.getElementById( id + '_timer_seconds_segment' ).innerHTML = two_digit_number_format( seconds );
}

function funnel_countdown( id, endtime ) {
    
    if(interval_id_flag == 1){
        clearInterval(intervalId[id]);
    }    
    intervalId[id] = setInterval( function() {
	    funnel_show_the_clock( id, endtime );
	}, 1000 );
    
}

function two_digit_number_format(n){
	return parseInt(n) > 9 ? "" + n: "0" + n;
}

function seo_settings_saved_to_db(res){
    $( "#seo_settings_popup_close_btn" ).click();
    show_editor_msg("SEO settings saved" , 1);
}

function select_page_mailer( page_id ) {
	document.getElementById('mailer_selection_form').innerHTML = 'Loading..';
	http_get_request( base + '/settings/?process=reload_page_mailer&page_id=' + page_id, 'page_mailer_reloaded' );
}

function page_mailer_reloaded( response ) {
	document.getElementById('mailer_selection_form').innerHTML = response;
}

function save_page_mailer( page_id ) {
    var mailer_service = document.getElementById('mailer_service').value;
    var page_id = document.getElementById('mailer_page_id').value;
    var list = '';
    if( mailer_service == 'aweber' ) list = document.getElementById('aweber_list_url').value;
    else if( mailer_service == 'mailchimp' ) list = document.getElementById('mailchimp_list_id').value;
    else if( mailer_service == 'klaviyo' ) list = document.getElementById('klaviyo_list_id').value;
    else if( mailer_service == 'drip' ) {
        var drip_campaign_type = document.getElementById('drip_campaign_type').value;
        if( drip_campaign_type == 'campaign' ) list = document.getElementById('drip_campaign_id').value;
        else if( drip_campaign_type == 'workflow' ) list = document.getElementById('drip_workflow_id').value;
    }
    var data = 'mailer_service=' + mailer_service + '&list=' + encodeURIComponent( list ) + '&page_id=' + page_id;
    if( mailer_service == 'drip' ) data += '&drip_campaign_type=' + drip_campaign_type;
    http_post_request( base + '/settings/?process=save_page_mailer_list', data, 'page_mailer_saved' );
}

function page_mailer_saved( response ) {
	show_editor_msg("Settings saved" , 1);
}

function save_app_settings_data() {
    var ecomisoft_app_recommendr = $('#ecomisoft_app_recommendr:checked').val();
    var ecomisoft_app_lately = $('#ecomisoft_app_lately:checked').val();
    var ecomisoft_app_product_timer = $('#ecomisoft_app_product_timer:checked').val();
    if (!ecomisoft_app_lately) {
        ecomisoft_app_lately = "off";
    }
    if (!ecomisoft_app_recommendr) {
        ecomisoft_app_recommendr = "off";
    }

    var data = 'ecomisoft_app_recommendr=' + ecomisoft_app_recommendr;
    data += '&ecomisoft_app_lately=' + ecomisoft_app_lately;
    data += '&page_id=' + $("#page_id")[0].value;
    http_post_request( base + '/editor/?process=save_app_settings_data', data , 'app_settings_saved_to_db' );
}

function app_settings_saved_to_db(){
    show_editor_msg("App settings saved" , 1);
}

function show_snippet_panel(type){
	if(type == "custom"){
		$("#custom_insert_btn").show();
	}else{
		$("#custom_snippet_body").hide();
		$("#custom_insert_btn").hide();
		$("#pre_snippet_body").show();
	}
}

function show_snippet_visual(){
	show_snippet_body('custom');
	show_snippet_panel('custom');
	$("#custom_snippet_textarea_text").hide();
	$("#cke_custom_snippet_textarea").show();
	
}

function show_snippet_text(){
	show_snippet_body('custom');
	show_snippet_panel('custom');
	$("#cke_custom_snippet_textarea").hide();
	$("#custom_snippet_textarea_text").show();
}

function add_this_snippet(id){
	var this_ui_item_array = drag_and_drop_elements(id);
	if(this_ui_item_array != null){
		var deleted_element = JSON.stringify(this_ui_item_array['html']);
		var html_data = document.getElementById('editor_preview_data').value;
		if( html_data != '' ) {
			html_data = JSON.parse( html_data );
		}

		var div = '{"tag":"div","endtag":1,"attributes":{},"content":"","nodes":[]}';
		div = JSON.parse(div);
		div.nodes.push(JSON.parse(deleted_element));

		deleted_element = JSON.stringify(change_some_tag(div.nodes)[0]);

		document.getElementById('editor_preview_deleted_item').innerHTML = deleted_element;
		html_data = insert_element_to_json(JSON.parse(deleted_element), my_new_parent_id, my_new_prev_id, html_data);
		document.getElementById('editor_preview_data').value = JSON.stringify(html_data);
		show_all_updated_view(html_data);
	}
}

function show_this_cat_snippet(me){
	var id = me.id;
	var snippet_all = $(".snippet_all");
	for(var i=0;i<snippet_all.length;i++){
		$(snippet_all[i]).css("display","none");
	}

	if($("#"+id)[0].checked == true){
		var this_cat = $("."+id);
		for(var i=0;i<this_cat.length;i++){
			$(this_cat[i]).show("100");
		}
		var checkbox_snippet = $('#checkbox_snippet').find(':checkbox');
	    for(i=0;i<checkbox_snippet.length;i++){
	    	$(checkbox_snippet[i])[0].checked = false;
	    }
		$("#"+id)[0].checked = true;
	}else{
		var this_cat = $("."+id);
		for(var i=0;i<this_cat.length;i++){
			$(this_cat[i]).hide("100");
		}
	}
}

function show_snippet_body(type){
	if(type == 'custom'){
		$("#pre_snippet_body").hide();
		$("#custom_snippet_body").show();
	}else{
		$("#pre_snippet_body").show();
		$("#custom_snippet_body").hide();
	}
	CKEDITOR.instances.custom_snippet_textarea.setData("");
	// tinyMCE.activeEditor.setContent("");\

}

function add_this_custom_snippet(){
	var iDiv = document.createElement('div');
	var innerhtml = "";
	if($("#custom_snippet_textarea_text").is(":visible")){
		var text_html = $("#custom_snippet_textarea_text")[0].value;
    	iDiv.innerHTML = text_html;
		innerhtml = set_editor_conf_for_element($(iDiv));
		$("#custom_snippet_textarea_text")[0].value = "";
	}else{
		var text_html = CKEDITOR.instances.custom_snippet_textarea.getData();
    	iDiv.innerHTML = text_html;
		innerhtml = set_editor_conf_for_element($(iDiv));
		CKEDITOR.instances.custom_snippet_textarea.setData("");
		// tinyMCE.activeEditor.setContent("");
	}
	my_id = my_new_parent_id;
	//$p = array('tag' => 'span','endtag' => 1,'attributes' => array('class'=>'span_but_p_tag'),'content'	=> '');
	var deleted_element = {};
	deleted_element["tag"] = "span";
	deleted_element["endtag"] = 1;
	deleted_element["attributes"] = {};
	deleted_element["attributes"]["id"] = get_valid_element_id("span");
	deleted_element["attributes"]["class"] = "hover_show_my_border";
	deleted_element["attributes"]["style"] = "display: block; max-width: 100%;";
	deleted_element["attributes"]["onmouseover"] = 'this_is_me(this,event)';
	deleted_element["nodes"] = [];
	deleted_element["content"] = innerhtml[0].innerHTML;
	//deleted_element = make_json_for_editor_preview(deleted_element);
	var html_data = document.getElementById('editor_preview_data').value;
	if( html_data != '' ) {
		html_data = JSON.parse( html_data );
		html_data = insert_element_to_json(deleted_element, my_new_parent_id, my_new_prev_id, html_data);
		//html_data = set_json_content_value_for_snippet(my_id, innerhtml[0].innerHTML, html_data );
		document.getElementById('editor_preview_data').value = JSON.stringify(html_data);
		show_all_updated_view(html_data);
	}
}

function set_editor_conf_for_element(ele){
	for(var i=0;i<ele[0].children.length;i++){
		$(ele[0].children[i]).addClass("sortable_disabled");
		if($(ele[0].children[i])[0].children.length > 0){
			set_editor_conf_for_element($(ele[0].children[i]))
		}else{
			$(ele[0].children[i]).addClass("do_not_add_empty_button");
		}
	}
	return ele;
}

//come with input text field id;
function open_editor_to_edit_text(id){
    var text = $("#"+id)[0].value;
	CKEDITOR.instances.input_text_text_editor.setData( text );
	$("#text_editor_save_btn").attr("onclick", "insert_this_custom_snippet('"+id+"')");
}
        
        
function insert_this_custom_snippet(id){
    var text = CKEDITOR.instances.input_text_text_editor.getData() ;
    text = set_editor_conf_for_element($('<div>'+text+'</div>'));
    text = $(text)[0].innerHTML;
    document.getElementById(id).value = text;
    document.getElementById(id).focus();
    document.getElementById(id).blur();
    $("#"+id).trigger("focus");
    $("#"+id).trigger("blur");
}

function HtmlEncode(s) {
    return $('<div>').text(s).html();
}

function HtmlDecode(s) {
    return $('<div>').html(s).text();
}


function set_hidden_eg_timer_id(id){
	$('#eg_hidden_id').val(id);

	var all_eg_data = $('#all_eg_data').val();
    if(all_eg_data != '' &&  all_eg_data.indexOf('[]') < 0 ){
        all_eg_data = JSON.parse(all_eg_data);
        for (var i=0 ; i<all_eg_data.length;i++){
        	if (all_eg_data[i].eg_timer_id==id){

        		var t = all_eg_data[i].duration;

        		var seconds = Math.floor((t / 1000) % 60);
				var minutes = Math.floor((t / 1000 / 60) % 60);
				var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
				var days = Math.floor(t / (1000 * 60 * 60 * 24));

				if (days == 0) days = '';
				if (hours == 0) hours = '';
				if (minutes == 0) minutes = '';
				if (seconds == 0) seconds = '';

				$('#eg_days_input')[0].value = days;
				$('#eg_hours_input')[0].value = hours;
				$('#eg_minutes_input')[0].value = minutes;
				$('#eg_seconds_input')[0].value = seconds;
				if(all_eg_data[i].eg_seconds_input_url != 'undefined'){
					$('#eg_seconds_input_url')[0].value = all_eg_data[i].eg_seconds_input_url;
				}
        	}
        }
    }

}

function save_eg_timer_deadline(){
	var days = $('#eg_days_input').val();
	var hours = $('#eg_hours_input').val();
	var minutes = $('#eg_minutes_input').val();
	var seconds = $('#eg_seconds_input').val();
	var eg_timer_id = $('#eg_hidden_id').val();

	if(days == "") days = 0;
	if(hours == "") hours = 0;
	if(minutes == "") minutes = 0;
	if(seconds == "") seconds = 0;

	if(  days < 0 || hours >24 || hours<0 || minutes>60 || minutes < 0 || seconds >60 || seconds<0 ){
		$("#eg_error_msg").show();
	}
	if ( isNaN(days)==true || isNaN(hours)==true || isNaN(minutes)==true || isNaN(seconds)==true) {
		$("#eg_error_msg").show();
	}
	else{
		$('#everGreenTimerPopup').modal('hide');
		$("#eg_error_msg").hide();
		days = days * 86400 * 1000;
		hours = hours *3600*1000;
		minutes = minutes * 60 *1000;
		seconds = seconds *1000;
		var duration = days + hours + minutes + seconds;
		var deadline = (Date.parse(new Date())) + duration;


		interval_id_flag = 1;
		var all_eg_data = {};
		var eg_timer_data = {};
		var eg_timer_id = $('#eg_hidden_id').val();
		all_eg_data = $('#all_eg_data').val();

		var eg_seconds_input_url = $("#eg_seconds_input_url")[0].value;
		if(all_eg_data != '' &&  all_eg_data.indexOf('[]') < 0 ){ 

			all_eg_data = JSON.parse(all_eg_data);
			var matched =false;
			for (var i=0 ; i<all_eg_data.length;i++){
				if (all_eg_data[i]['eg_timer_id']==eg_timer_id){
					eg_timer_data['eg_timer_id'] = eg_timer_id;
					eg_timer_data['duration'] = duration;
					eg_timer_data['eg_seconds_input_url'] = eg_seconds_input_url;
					all_eg_data[i]=eg_timer_data;
					matched=true;
				}
			}
			if (matched == false) {
				eg_timer_data['eg_timer_id'] = eg_timer_id;
				eg_timer_data['duration'] = duration;
				eg_timer_data['eg_seconds_input_url'] = eg_seconds_input_url;
				all_eg_data.push(eg_timer_data);
			}
			document.getElementById('all_eg_data').value = JSON.stringify(all_eg_data);
		}
		else{		
			eg_timer_data['eg_timer_id'] = eg_timer_id;
			eg_timer_data['duration'] = duration;
			eg_timer_data['eg_seconds_input_url'] = eg_seconds_input_url;
			all_eg_data = eg_timer_data;
			document.getElementById('all_eg_data').value = JSON.stringify(new Array(all_eg_data));
		}

		eg_countdown( eg_timer_id, deadline );
	}

}
function eg_countdown( id, endtime ) {
    
    if(interval_id_flag == 1){
        clearInterval(intervalId[id]);
    }    
    intervalId[id] = setInterval( function() {
	    eg_show_the_clock( id, endtime );
	}, 1000 );
	
}

function eg_show_the_clock(id, endtime) {
	var t = endtime - Date.parse(new Date());
	if(t<0){
		t = 0;
	}
	var seconds = Math.floor((t / 1000) % 60);
	var minutes = Math.floor((t / 1000 / 60) % 60);
	var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
	var days = Math.floor(t / (1000 * 60 * 60 * 24));

	if( document.getElementById( id + '_timer_days_segment' ) != null ) document.getElementById( id + '_timer_days_segment' ).innerHTML = two_digit_number_format( days );
	if( document.getElementById( id + '_timer_hours_segment' ) != null ) document.getElementById( id + '_timer_hours_segment' ).innerHTML = two_digit_number_format( hours );
	if( document.getElementById( id + '_timer_minutes_segment' ) != null ) document.getElementById( id + '_timer_minutes_segment' ).innerHTML = two_digit_number_format( minutes );
	if( document.getElementById( id + '_timer_seconds_segment' ) != null ) document.getElementById( id + '_timer_seconds_segment' ).innerHTML = two_digit_number_format( seconds );
	
}

function find_products(){
	$('#search_result').empty();
	var page = $('#page_number_for_products').val();
    page = 1;
    $("#page_number_for_products").val(page);
    var title = $('#search_text').val();
    if (title != '') {
    	$('#search_result').show();
		$('#search_result').html('<i class="product_spinner fa fa-spinner fa-spin" style="font-size:24px"></i>');
    	var data ='';
    	http_post_request( base + '/default/?process=find_products&page='+page+'&title='+encodeURIComponent(title),data,'found_products');
    }
}

function load_more_products(){
    var title = $('#search_text').val();
    var page = $('#page_number_for_products').val();
    page = parseInt(page);
    page = page + 1;
    $("#page_number_for_products").val(page);
    if (title != '') {
		var loader = '<i class="product_spinner fa fa-spinner fa-spin" style="font-size:24px"></i>';
		$(".product_spinner" ).remove();
		$("#search_result").append(loader);
		$( ".modal-content" ).addClass( "modal_height_350" );
    	var data ='';
    	http_post_request( base + '/default/?process=find_products&page='+page+'&title='+encodeURIComponent(title),data,'found_products');
    }
}

function found_products(res){
	var products = JSON.parse(res);
	var html = '';
	var html_for_creat_page = '';
	if (products.length == 0) {
		if (parseInt($('#page_number_for_products').val()) == 1) {
			html = '<span id="warning_new_page_search" style="color:red; font-size:13px;display:table;margin-top: 0px;"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> No search result found. </span>';
			$("#search_result").append(html);
		}
		else
		{
			$("#load_more" ).remove();
		}
	}
	else if(products.length < 100)
	{
		if (parseInt($('#page_number_for_products').val()) == 1){
			html_for_creat_page = '<ul id="search_ul"  style="height: 182px; overflow-y: auto; margin-bottom: 0px !important;" class="text-left list-group" class="text-left list-group">';
			for (i = 0; i < products.length; i++) { 
				var id = products[i]['id'];
				var handle = products[i]['handle'];
				var title = products[i]['title'];
				title = title.replace(/\\/g, '');
				var title2 = title.replaceAll("'","\\&#39;");
				title2 = title2.replaceAll('"','&quot;');
			    html_for_creat_page += '<a class="list-group-item" style="cursor:pointer;" onclick="show_variants(\''+id+"@@@@"+title2+'\');">'+ title +'</a>';
			}
			html_for_creat_page += '</ul>';

			$("#search_result").append(html_for_creat_page);
		}
		else{
			for (i = 0; i < products.length; i++) { 
				var id = products[i]['id'];
				var handle = products[i]['handle'];
				var title = products[i]['title'];
				title = title.replace(/\\/g, '');
				var title2 = title.replaceAll("'","\\&#39;");
				title2 = title2.replaceAll('"','&quot;');
			    html_for_creat_page += '<a class="list-group-item" style="cursor:pointer;" onclick="show_variants(\''+id+"@@@@"+title2+'\');">'+ title +'</a>';
			}
			$("#load_more" ).remove();
			$("#search_ul").append(html_for_creat_page);
		}
	}
	else
	{
		if (parseInt($('#page_number_for_products').val()) == 1){
			html_for_creat_page = '<ul id="search_ul"  style="height: 182px; overflow-y: auto; margin-bottom: 0px !important;" class="text-left list-group" class="text-left list-group">';
			for (i = 0; i < products.length; i++) { 
				var id = products[i]['id'];
				var handle = products[i]['handle'];
				var title = products[i]['title'];
				title = title.replace(/\\/g, '');
				var title2 = title.replaceAll("'","\\&#39;");
				title2 = title2.replaceAll('"','&quot;');
			    html_for_creat_page += '<a class="list-group-item" style="cursor:pointer;" onclick="show_variants(\''+id+"@@@@"+title2+'\');">'+ title +'</a>';
			     
			}
			html_for_creat_page += '<a class="list-group-item text-center"  id="load_more" style="background-color: #ccc;padding: 5px;cursor:pointer;" onclick="load_more_products()"><span style="color:#337ab7;">Load more</span></a></ul>';
			$( "#load_more" ).remove();
			$("#search_result").append(html_for_creat_page);
		}
		else{
			for (i = 0; i < products.length; i++) { 
				var id = products[i]['id'];
				var handle = products[i]['handle'];
				var title = products[i]['title'];
				title = title.replace(/\\/g, '');
				var title2 = title.replaceAll("'","\\&#39;");
				title2 = title2.replaceAll('"','&quot;');
			    html_for_creat_page += '<a class="list-group-item" style="cursor:pointer;" onclick="show_variants(\''+id+"@@@@"+title2+'\');">'+ title +'</a>';
			     
			}
			html_for_creat_page += '<a class="list-group-item text-center"  id="load_more" style="background-color: #ccc;padding: 5px;cursor:pointer;" onclick="load_more_products()"><span style="color:#337ab7;">Load more</span></a>';
			$("#load_more" ).remove();
			$("#search_ul").append(html_for_creat_page);
		}
	}
	$(".product_spinner" ).remove();
}
function find_products_bump(){
	$('#search_result_bump').empty();
	var page = $('#page_number_for_bump_products').val();
    page = 1;
    $("#page_number_for_bump_products").val(page);
    var title = $('#search_text_bump').val();
    if (title != '') {
    	$('#search_result_bump').show();
		$('#search_result_bump').html('<i class="product_spinner fa fa-spinner fa-spin" style="font-size:24px"></i>');
    	var data ='';
    	http_post_request( base + '/default/?process=find_products&page='+page+'&title='+encodeURIComponent(title),data,'found_products_bump');
    }
}
function load_more_bump_products(){
	var title = $('#search_text_bump').val();
    var page = $('#page_number_for_bump_products').val();
    page = parseInt(page);
    page = page + 1;
    $("#page_number_for_bump_products").val(page);
    if (title != '') {
		var loader = '<i class="product_spinner fa fa-spinner fa-spin" style="font-size:24px"></i>';
		$(".product_spinner" ).remove();
		$("#search_result").append(loader);
		$( ".modal-content" ).addClass( "modal_height_350" );
    	var data ='';
    	http_post_request( base + '/default/?process=find_products&page='+page+'&title='+encodeURIComponent(title),data,'found_products_bump');
    }
}

function found_products_bump(res){
	var products = JSON.parse(res);
	var html = '';
	var html_for_creat_page = '';
	if (products.length == 0) {
		if (parseInt($('#page_number_for_bump_products').val()) == 1) {
			html = '<span id="warning_new_page_search" style="color:red; font-size:13px;display:table;margin-top: 0px;"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> No search result found. </span>';
			$("#search_result_bump").append(html);
		}
		else
		{
			$("#load_more" ).remove();
		}
	}
	else if(products.length < 100)
	{
		if (parseInt($('#page_number_for_bump_products').val()) == 1){
			html_for_creat_page = '<ul id="bump_search_ul"  style="height: 182px; overflow-y: auto; margin-bottom: 0px !important;" class="text-left list-group" class="text-left list-group">';
			for (i = 0; i < products.length; i++) { 
				var id = products[i]['id'];
				var handle = products[i]['handle'];
				var title = products[i]['title'];
				title = title.replace(/\\/g, '');
				var title2 = title.replaceAll("'","\\&#39;");
				title2 = title2.replaceAll('"','&quot;');
			    html_for_creat_page += '<a class="list-group-item" style="cursor:pointer;" onclick="get_product_handle(\''+handle+'\',\''+title2+'\');">'+ title +'</a>';
			}
			html_for_creat_page += '</ul>';

			$("#search_result_bump").append(html_for_creat_page);
		}
		else{
			for (i = 0; i < products.length; i++) { 
				var id = products[i]['id'];
				var handle = products[i]['handle'];
				var title = products[i]['title'];
				title = title.replace(/\\/g, '');
				var title2 = title.replaceAll("'","\\&#39;");
				title2 = title2.replaceAll('"','&quot;');
			    html_for_creat_page += '<a class="list-group-item" style="cursor:pointer;" onclick="get_product_handle(\''+handle+'\',\''+title2+'\');">'+ title +'</a>';
			}
			$("#load_more" ).remove();
			$("#bump_search_ul").append(html_for_creat_page);
		}
	}
	else
	{
		if (parseInt($('#page_number_for_bump_products').val()) == 1){
			html_for_creat_page = '<ul id="bump_search_ul"  style="height: 182px; overflow-y: auto; margin-bottom: 0px !important;" class="text-left list-group" class="text-left list-group">';
			for (i = 0; i < products.length; i++) { 
				var id = products[i]['id'];
				var handle = products[i]['handle'];
				var title = products[i]['title'];
				title = title.replace(/\\/g, '');
				var title2 = title.replaceAll("'","\\&#39;");
				title2 = title2.replaceAll('"','&quot;');
			    html_for_creat_page += '<a class="list-group-item" style="cursor:pointer;" onclick="get_product_handle(\''+handle+'\',\''+title2+'\');">'+ title +'</a>';
			}
			html_for_creat_page += '<a class="list-group-item text-center"  id="load_more" style="background-color: #ccc;padding: 5px;cursor:pointer;" onclick="load_more_bump_products()"><span style="color:#337ab7;">Load more</span></a></ul>';
			$( "#load_more" ).remove();
			$("#search_result_bump").append(html_for_creat_page);
		}
		else{
			for (i = 0; i < products.length; i++) { 
				var id = products[i]['id'];
				var handle = products[i]['handle'];
				var title = products[i]['title'];
				title = title.replace(/\\/g, '');
				var title2 = title.replaceAll("'","\\&#39;");
				title2 = title2.replaceAll('"','&quot;');
			    html_for_creat_page += '<a class="list-group-item" style="cursor:pointer;" onclick="get_product_handle(\''+handle+'\',\''+title2+'\');">'+ title +'</a>';
			}
			html_for_creat_page += '<a class="list-group-item text-center"  id="load_more" style="background-color: #ccc;padding: 5px;cursor:pointer;" onclick="load_more_bump_products()"><span style="color:#337ab7;">Load more</span></a>';
			$("#load_more" ).remove();
			$("#bump_search_ul").append(html_for_creat_page);
		}
	}
	$(".product_spinner" ).remove();
}

String.prototype.replaceAll = function(search, replacement) {
   var target = this;
   return target.split(search).join(replacement);
};

function get_product_handle(handle,title){
	$('#cart_bump_product_handle')[0].value = handle;
	$('#search_result_bump').fadeOut(); 
	$('#product_title_div_bump')[0].innerHTML = '<a href="https://' + this_shop_url + '/products/' + handle + '" target="_blank">' + title + '</a>';
	$("#product_title_div_bump").show();
	$("#div_id_product_bump").hide();
	$("#cart_bump_product_edit_control").show();
}

function find_products_bump_title_using_handle(handle){
    var data ='';
    http_post_request( base + '/default/?process=find_products_title_using_handle&handle='+handle,data,'find_products_title_using_handle_done', handle);
}

function find_products_title_using_handle_done(res, handle){
    $("#cart_bump_product_edit_control").show();
    $("#product_title_div_bump")[0].innerHTML = '<a href="https://' + this_shop_url + '/products/' + handle + '" target="_blank">' + res + '</a>';
    $("#product_title_div_bump").show();
}

function auto_add_find_products(){
	$('#auto_add_search_result').empty();
    var page = 1;
    $("#auto_add_page_number_for_products").val(page);
    var title = $('#auto_add_search_text').val();
    if (title != '') {
    	$('#auto_add_search_result').show();
		$('#auto_add_search_result').html('<i class="product_spinner fa fa-spinner fa-spin" style="font-size:24px"></i>');
    	var data ='';
    	http_post_request( base + '/default/?process=find_products&page='+page+'&title='+encodeURIComponent(title),data,'auto_add_found_products');
    }
}

function auto_add_load_more_products(){
    var title = $('#auto_add_search_text').val();
    var page = $('#auto_add_page_number_for_products').val();
    page = parseInt(page);
    page = page + 1;
    $("#auto_add_page_number_for_products").val(page);
    if (title != '') {
		var loader = '<i class="product_spinner fa fa-spinner fa-spin" style="font-size:24px"></i>';
		$(".product_spinner" ).remove();
		$("#auto_add_search_result").append(loader);
		$( ".modal-content" ).addClass( "modal_height_350" );
    	var data ='';
    	http_post_request( base + '/default/?process=find_products&page='+page+'&title='+encodeURIComponent(title),data,'auto_add_found_products');
    }
}

function auto_add_found_products(res){
	var products = JSON.parse(res);
	var html = '';
	var html_for_creat_page = '';
	if (products.length == 0) {
		if (parseInt($('#auto_add_page_number_for_products').val()) == 1) {
			html = '<span id="warning_new_page_search" style="color:red; font-size:13px;display:table;margin-top: 0px;"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> No search result found. </span>';
			$("#auto_add_search_result").append(html);
		}
		else
		{
			$("#auto_add_load_more" ).remove();
		}
	}
	else if(products.length < 100)
	{
		if (parseInt($('#auto_add_page_number_for_products').val()) == 1){
			html_for_creat_page = '<ul id="auto_add_search_ul"  style="height: 182px; overflow-y: auto; margin-bottom: 0px !important;" class="text-left list-group" class="text-left list-group">';
			for (i = 0; i < products.length; i++) { 
				var id = products[i]['id'];
				var handle = products[i]['handle'];
				var title = products[i]['title'];
				title = title.replace(/\\/g, '');
				var title2 = title.replaceAll("'","\\&#39;");
				title2 = title2.replaceAll('"','&quot;');
			    html_for_creat_page += '<a class="list-group-item" style="cursor:pointer;" onclick="auto_add_show_variants(\''+id+"@@@@"+title2+'\');">'+ title +'</a>';
			}
			html_for_creat_page += '</ul>';

			$("#auto_add_search_result").append(html_for_creat_page);
		}
		else{
			for (i = 0; i < products.length; i++) { 
				var id = products[i]['id'];
				var handle = products[i]['handle'];
				var title = products[i]['title'];
				title = title.replace(/\\/g, '');
				var title2 = title.replaceAll("'","\\&#39;");
				title2 = title2.replaceAll('"','&quot;');
			    html_for_creat_page += '<a class="list-group-item" style="cursor:pointer;" onclick="auto_add_show_variants(\''+id+"@@@@"+title2+'\');">'+ title +'</a>';
			}
			$("#auto_add_load_more" ).remove();
			$("#auto_add_search_ul").append(html_for_creat_page);
		}
	}
	else
	{
		if (parseInt($('#auto_add_page_number_for_products').val()) == 1){
			html_for_creat_page = '<ul id="auto_add_search_ul"  style="height: 182px; overflow-y: auto; margin-bottom: 0px !important;" class="text-left list-group" class="text-left list-group">';
			for (i = 0; i < products.length; i++) { 
				var id = products[i]['id'];
				var handle = products[i]['handle'];
				var title = products[i]['title'];
				title = title.replace(/\\/g, '');
				var title2 = title.replaceAll("'","\\&#39;");
				title2 = title2.replaceAll('"','&quot;');
			    html_for_creat_page += '<a class="list-group-item" style="cursor:pointer;" onclick="auto_add_show_variants(\''+id+"@@@@"+title2+'\');">'+ title +'</a>';
			     
			}
			html_for_creat_page += '<a class="list-group-item text-center"  id="auto_add_load_more" style="background-color: #ccc;padding: 5px;cursor:pointer;" onclick="auto_add_load_more_products()"><span style="color:#337ab7;">Load more</span></a></ul>';
			$("#auto_add_load_more").remove();
			$("#auto_add_search_result").append(html_for_creat_page);
		}
		else{
			for (i = 0; i < products.length; i++) { 
				var id = products[i]['id'];
				var handle = products[i]['handle'];
				var title = products[i]['title'];
				title = title.replace(/\\/g, '');
				var title2 = title.replaceAll("'","\\&#39;");
				title2 = title2.replaceAll('"','&quot;');
			    html_for_creat_page += '<a class="list-group-item" style="cursor:pointer;" onclick="auto_add_show_variants(\''+id+"@@@@"+title2+'\');">'+ title +'</a>';
			     
			}
			html_for_creat_page += '<a class="list-group-item text-center"  id="auto_add_load_more" style="background-color: #ccc;padding: 5px;cursor:pointer;" onclick="auto_add_load_more_products()"><span style="color:#337ab7;">Load more</span></a>';
			$("#auto_add_load_more").remove();
			$("#auto_add_search_ul").append(html_for_creat_page);
		}
	}
	$(".product_spinner" ).remove();
}

function auto_add_show_variants(me){
	$( ".modal-content" ).removeClass( "modal_height_350" );
	$('#auto_add_search_result').fadeOut();
	$('#auto_add_search_result').empty();
	$('#auto_add_select_product_from_bundle').val(me);
    var product_id = me.split('@@@@')[0];
    $('#auto_add_info_1').val(product_id);
    var data = 'product_id=' + product_id;
    http_post_request( base + '/editor/?process=auto_add_get_variants', data , 'auto_add_received_variants' );
}

function auto_add_received_variants(response){
    response = JSON.parse(response);
    document.getElementById('auto_add_variant_options').innerHTML = response.html_data;
    $('#auto_add_hidden_varient_options').val(response.option);
    $('#auto_add_hidden_varient_options_name').val(JSON.stringify(response.option2));
}

function auto_add_select_sale_variant(me,option){
	$("#auto_add_product_btn").show();
    var select_val = $("#auto_add_variant_options :input");
    var options = $('#auto_add_hidden_varient_options').val();
    var combind_option = "";
    for(var i=0; i<select_val.length; i++){
        if (i == 0) { combind_option += $(select_val[i])[0].value ; }
        else{ combind_option += " / " + $(select_val[i])[0].value ; }
    }
    if (options.indexOf(combind_option) > -1) {
        document.getElementById('auto_add_variant_message').innerHTML = "";
        $('#auto_add_product_btn').prop('disabled', false);
    }
    else{
        document.getElementById('auto_add_variant_message').innerHTML = "Out of stock";
        $('#auto_add_product_btn').prop('disabled', true);
    }
}

function auto_add_product(){
    var select_val = $("#auto_add_variant_options :input");
    var combind_option = "";
    for(var i=0; i<select_val.length; i++){
        if (i == 0) { combind_option += $(select_val[i])[0].value ; }
        else{ combind_option += " / " + $(select_val[i])[0].value ; }
    }
    var product_id = document.getElementById('auto_add_info_1').value;
    var product_name = $("#auto_add_select_product_from_bundle")[0].value.split('@@@@')[1];
    var pro_det = product_name +'-'+ combind_option;
    var check_option = document.getElementById('added_auto_add_products').innerHTML;
    check_option =  check_option.split('<br>');
    for (var i = 0; i < check_option.length; i++) {
        check_option[i]=check_option[i].trim();
    }
    if (jQuery.inArray( pro_det, check_option ) == -1) {
        var product_variants_arr = $("#auto_add_hidden_varient_options_name")[0].value;
        product_variants_arr = JSON.parse(product_variants_arr);
        var variant_id = "";
        for (var i = 0; i < product_variants_arr.length; i++) {
            if(combind_option == product_variants_arr[i].variant_name[0])
            {
                variant_id = product_variants_arr[i].variants_id[0];
                break;
            }
        }
        var product_details = product_id + "@@@@" + variant_id + "@@@@" + product_name + "@@@@" + combind_option;
        $('#auto_add_info_1').val(product_details);
        var page_id = document.getElementById('page_id').value;
        var product_array = document.getElementById('hidden_all_auto_add_product').value;
        var info = page_id + "@@@@" + product_array;
        var data = 'product_details=' + encodeURIComponent(product_details);
        http_post_request( base + '/editor/?process=save_auto_add_product_details&info='+info, data , 'saved_auto_add_product_details' );
        //
        product_name +=  '-'+combind_option+'<br>';
        //
        document.getElementById('added_auto_add_products').innerHTML += product_name;
        document.getElementById('auto_add_variant_options').innerHTML = '';
        $('#auto_add_product_btn').prop('disabled', true);
    }
    else
    {
        document.getElementById('auto_add_variant_message').innerHTML = "Product already added";
    }
    
}

function saved_auto_add_product_details(response){
   	if (response !="" ) {
       	var product = JSON.parse(response);
		var tableRef = document.getElementById('auto_add_product_table').getElementsByTagName('tbody')[0];
		//var table = document.getElementById("bundle_product_table");
		var row = tableRef.insertRow(tableRef.rows.length);
		row.id = 'auto_add_product_row'+rand;
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		cell1.className = 'auto_add_table_product_image';
		cell2.className = 'auto_add_table_product';
		cell3.className = 'auto_add_table_td_variant';
		cell4.className = 'auto_add_table_td_option';
		cell1.id = 'auto_add_product_product_image'+rand;
		cell2.id = 'auto_add_product_productname'+rand;
		cell3.id = 'auto_add_product_productvariant'+rand;
		cell4.id = 'auto_add_table_td_option'+rand;
		var img_url = product['product_details'][4][0];
		if (img_url) {
			img_url =  img_url.replace('.png','_thumb.png');
		    img_url =  img_url.replace('.jpg','_thumb.jpg');
		    img_url =  img_url.replace('.jpeg','_thumb.jpeg');
		    img_url =  img_url.replace('.gif','_thumb.gif');
		}
		cell1.innerHTML = '<img style="height:20px;" src="' + img_url + '">';
		cell2.innerHTML = product['product_details'][2];
		cell3.innerHTML = product['product_details'][3];
		cell4.innerHTML = '<a href="#" onclick="delete_auto_add_product(' + rand + ');"><span class="label label-danger">Delete</span><a>';
		$('#hidden_all_auto_add_product').val(product['product_array']);
		document.getElementById("auto_add_product_table_div").style.display = "inline";
		document.getElementById("auto_add_product_table_alternative_div").style.display = "none";
		rand = rand + 1;
   	}
   	$("#auto_add_product_btn").hide();
}

function delete_auto_add_product(index){
    var product_name = document.getElementById('auto_add_product_productname'+index).innerHTML;
    var product_variant = document.getElementById('auto_add_product_productvariant'+index).innerHTML;
    var page_id = document.getElementById('page_id').value;
    var product_array = document.getElementById('hidden_all_auto_add_product').value;
    var info = page_id + "@@@@" + index + "@@@@" + product_array;
    var product_details = product_name + "@@@@" + product_variant;
    var data = 'product_details=' + product_details;
    var products = document.getElementById('added_auto_add_products').innerHTML;
    products = products.trim();
    var va = product_name+"-"+product_variant+"<br>";
    var products = products.replace(va, "");
    document.getElementById('added_auto_add_products').innerHTML = products;
    http_post_request( base + '/editor/?process=delete_auto_add_product&info='+info, data , 'deleted_auto_add_product_response' );
}

function deleted_auto_add_product_response(response){
    response = JSON.parse(response);
    $('#hidden_all_auto_add_product').val(response.product_array);
    var arr_size = JSON.parse(response.product_array);
    if (arr_size.length == 0) {
    	document.getElementById("auto_add_product_table_div").style.display = "none";
        document.getElementById("auto_add_product_table_alternative_div").style.display = "inline";
    }
    var index = response.index;
    $('table#auto_add_product_table tr#auto_add_product_row'+index).remove();
}

function final_save_auto_add_product(){
	var auto_add_clear_cart = $('#auto_add_clear_cart').prop('checked');
    var page_id = document.getElementById('page_id').value;
    var product_array = document.getElementById('hidden_all_auto_add_product').value;
    var data = 'product_details=' + encodeURIComponent(product_array);
    http_post_request( base + '/editor/?process=final_save_auto_add_product&page_id='+page_id+'&auto_add_clear_cart='+auto_add_clear_cart, data , 'saved_final_auto_add_product' );
}

function saved_final_auto_add_product(response){
    if (response!='') {
        var urll = base + '/editor/?page='+response;
        window.location = urll;
    }
}