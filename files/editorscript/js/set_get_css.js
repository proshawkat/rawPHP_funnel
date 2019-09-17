function get_css_attributes_value(my_id){
	if(my_id != ""){
		var tags_css_attr = JSON.parse($('#tags_css_attr').val());

		var my_tag = $("#"+my_id)[0].tagName.toLowerCase();

		var my_all_css_attr = [];
		var my_all_css_attr_with_value = Array();

		for (var tag in tags_css_attr) {
		    if(my_tag == tag){
		    	my_all_css_attr.push(tags_css_attr[tag].advanced.styles.split(','));
				my_all_css_attr.push(tags_css_attr[tag].advanced.animation.split(','));
				my_all_css_attr.push(tags_css_attr[tag].settings.split(','));
		    }
		}

		for(var i=0; i<my_all_css_attr.length;i++){
			for(var j=0; j< my_all_css_attr[i].length; j++){
				if(my_all_css_attr[i][j] != ""){
					my_all_css_attr[i][j]= my_all_css_attr[i][j].replace(/\s/g,'');
					var temp_val = get_single_css_value(my_id , my_all_css_attr[i][j]);
					var temp_attr = my_all_css_attr[i][j];
					my_all_css_attr_with_value[temp_attr] = temp_val;
				}
			}
		}
	}else{
		var html_data = document.getElementById('editor_preview_data').value;
		if( html_data != '' ) {
			html_data = JSON.parse( html_data );
			html_data = make_json_for_editor_preview(html_data);
			show_all_updated_view(html_data);
		}
	}
	
	return my_all_css_attr_with_value;
}

function get_single_css_value(my_id, attr){

	if(attr == "href-target"){
		var attr_value = $("#"+my_id)[0].target;
	}else if(attr == "position"){
		if($("#"+my_id).hasClass("position-center") || $("#"+my_id).hasClass("iframeCenter")){
			var attr_value = "center";
		}else if($("#"+my_id).hasClass("position-right") || $("#"+my_id).hasClass("iframeRight")){
			var attr_value = "right";
		}else{
			var attr_value = "left";
		}
	}else if(attr == "hide-on-mobile"){
		if($("#"+my_id).hasClass("hidden-xs")){
			var attr_value = "yes";
		}else{
			var attr_value = "no";
		}
	}else if(attr == "hide-on-desktop"){
		if($("#"+my_id).hasClass("hide-on-desktop")){
			var attr_value = "yes";
		}else{
			var attr_value = "no";
		}
	}else{
		if(attr.indexOf("border")>-1 && attr != "border-color"){
			var attr_value = $("#"+my_id).css(attr);
			attr_value = attr_value.split(" ")[0];
		}else{
			var attr_value = $("#"+my_id).css(attr);
		}
	}
	return attr_value;
}

function save_my_settings(is_undo_redo){
	remove_editor_hover_conf();//global_val.js
	var html_data = document.getElementById('editor_preview_data').value;
	if( html_data != '' ) {
		html_data = JSON.parse( html_data );
		insert_into_stack = false;
		if(is_undo_redo == "undo_redo"){
			show_all_updated_view(html_data,"undo_redo");
		}else{
			show_all_updated_view(html_data);
		}
		insert_into_stack = true;
		var html_data = make_json_for_page_preview(html_data);
		var timer_data = {};
		var all_eg_data = {};
		timer_data = $('#all_timer_data').val();
		all_eg_data = $('#all_eg_data').val();
		var body_attr = $('#div_editorpreview')[0].style.cssText.replace('("','(');
		body_attr = body_attr.replace('")',')');
		if(body_attr.indexOf("background-color: rgb(2, 52, 88)") > -1){
			body_attr = body_attr.replace("background-color: rgb(2, 52, 88)","background-color: rgba(2, 52, 88, 0)");
		}
		var data = 'page_id=' + encodeURIComponent( document.getElementById('page_id').value );
		data += '&html_data=' + encodeURIComponent( JSON.stringify(html_data) );
		data += '&body_attr=' + encodeURIComponent( body_attr );
		data += '&timer_data=' + encodeURIComponent( timer_data );
		data += '&all_eg_data=' + encodeURIComponent( all_eg_data );
		http_post_request( base + '/editor/?process=save_page_new_data', data , 'save_page_new_data_saved' );
	}	
}

function save_page_new_data_saved(res){
	//editor_msg
	if(res == "success"){
		show_editor_msg("Settings saved" , 1);
	}else{
		show_editor_msg("Settings save failed. Reload this page." , 0);
	}
}

function save_seo_settings_data() {
	var all_seo_data =  'title=' + encodeURIComponent( document.getElementById('seo_page_title').value );
	all_seo_data +=  '&description=' + encodeURIComponent( document.getElementById('seo_page_description').value );
	all_seo_data +=  '&image=' + encodeURIComponent( document.getElementById('seo_page_image').value );
	all_seo_data +=  '&page_id=' + encodeURIComponent( document.getElementById('seo_page_id').value );
	all_seo_data +=  '&gfeed=' + encodeURIComponent( $("#google_product_cat_name_p")[0].innerHTML );

	http_post_request( base + '/editor/?process=save_seo_settings_to_db', all_seo_data , 'seo_settings_saved_to_db' );
}

function set_new_style_into_json(my_id, nodes){
	for( var i = 0; i < nodes.length; i++ ) {
		var element = nodes[i];
		if(element.attributes.id == my_id){
			var element_attr = $('#'+my_id)[0].style.cssText.replace('("','(');
			element_attr = element_attr.replace('")',')');

			var find = '"';
			var re = new RegExp(find, 'g');
			element_attr = element_attr.replace(re, '');
			if(element.attributes.style != null){
				nodes[i].attributes.style = element_attr;
			}else{
				nodes[i].attributes['style'] = element_attr;
			}
			break;
		}else{
			if( element.endtag == 1 ) {
				if( element.nodes != undefined ) {
					if( element.nodes.length > 0 ) {
						nodes[i].nodes = set_new_style_into_json(my_id, element.nodes);
					}
				}
			}
		}
	}
	return nodes;
}

function set_new_style_from_web_into_json(nodes){
	for( var i = 0; i < nodes.length; i++ ) {
		var element = nodes[i];
		if(document.getElementById(element.attributes.id) != undefined){
			//var element_attr = $('#'+my_id)[0].style.cssText.replace('("','(');
			var element_attr = dumpCSSText(document.getElementById(element.attributes.id));
			if(element.attributes.style != null){
				nodes[i].attributes.style = element_attr;
			}else{
				nodes[i].attributes['style'] = element_attr;
			}
		}
		if( element.endtag == 1 ) {
			if( element.nodes != undefined ) {
				if( element.nodes.length > 0 ) {
					nodes[i].nodes = set_new_style_from_web_into_json(element.nodes);
				}
			}
		}
	}
	return nodes;
}


function dumpCSSText(element){
  var s = '';
  var o = getComputedStyle(element);
  for(var i = 0; i < o.length; i++){
    s+=o[i] + ':' + o.getPropertyValue(o[i])+';';
  }
  return s;
}

function show_editor_msg(msg , msg_type){
	if ( msg_type == 1 ) {
		$("#editor_msg").css("background-color" ,"rgba(52,73,94,.8)");
		$("#editor_msg").slideDown();
		$("#editor_msg")[0].innerHTML = msg;
		setTimeout(function(){ $("#editor_msg").slideUp() }, 2500);
	}
	else if ( msg_type == 0) {
		$("#editor_msg").css("background-color" ,"rgba(139,0,0,.8)");
		$("#editor_msg").slideDown();
		$("#editor_msg")[0].innerHTML = msg;
		setTimeout(function(){ $("#editor_msg").slideUp() }, 2500);
	}
}
