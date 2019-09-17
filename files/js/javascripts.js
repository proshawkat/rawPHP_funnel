var rand = Math.floor(Math.random() * (500 - 300)) + 300;
var element_id = 0;
//Standard Javascript function for making a http get request with callback
function http_get_request( url, callback, params ) {

	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			//callback with response
			window[callback](xmlhttp.responseText, params);
		}
	}
	xmlhttp.open("GET",url,true);
	xmlhttp.send();
}

function http_post_request( url, data, callback, params ) {
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			//callback with response
			window[callback](xmlhttp.responseText, params);
		}
	}
	xmlhttp.open("POST",url,true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(data);
}


function add_new_page() {
	if(document.getElementById('id_page_name').value != "" && document.getElementById('id_page_title').value != "" ){
		$(".loader").show();
		var data = 'name=' + encodeURIComponent( document.getElementById('id_page_name').value );
		data += '&title=' + encodeURIComponent( document.getElementById('id_page_title').value );
		data += '&product_id=' + encodeURIComponent( (document.getElementById('id_product').value.split('/'))[0] );
		data += '&product_handle=' + encodeURIComponent( $("#id_page_handle")[0].value );
		data += '&type=' + encodeURIComponent( document.getElementById('id_product_type').value );
		http_post_request( base + '/default/?process=add_new_page', data , 'new_page_added' );
		$('#new_champaign_input').modal('hide');
	}else{
		if(document.getElementById('id_page_name').value == ""){
			add_new_page_next_previous_button ($('#button_previous'));
			if ( $('#warning_new_page_name')!= null ) $('#warning_new_page_name').remove();
			var span  = '<span id ="warning_new_page_name" style="color:red; font-size:13px;display:table;margin-top: -10px;" ><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Please input a page name. </span>'
			$(span).insertAfter ('#id_page_name');
		}
		if(document.getElementById('id_page_title').value == ""){
			add_new_page_next_previous_button ($('#button_previous'));
			if ( $('#warning_new_page_title')!= null ) $('#warning_new_page_title').remove();
			var span  = '<span id ="warning_new_page_title" style="color:red; font-size:13px;margin-top: -10px;display:table;" ><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Please input a page title. </span>'
			$(span).insertAfter ('#id_page_title');
		}
	}
}

function change_slug(me,type){
	if(type == "new"){
    	$("#id_page_handle")[0].value = (me.value.split('/'))[1];
	}else if(type == "edit"){
		$("#edit_page_handle")[0].value = (me.value.split('/'))[1];
	}else if(type == 'clone'){
		$("#clone_page_product_slug")[0].value = (me.value.split('/'))[1];
	}
}

function set_button_type(button_type){
	if(document.getElementById('edit_page_name').value != "" && document.getElementById('edit_page_title').value != "" ){
		$(".loader").show();
		$('#button_type').val(button_type);
		$('#update_page_info').submit();
	}else{
		if(document.getElementById('edit_page_name').value == ""){
			add_new_page_next_previous_button ($('#edit_button_previous'));
			if ( $('#warning_edit_page_name')!= null ) $('#warning_edit_page_name').remove();
			var span  = '<span id ="warning_edit_page_name" style="color:red; font-size:13px;display:table;margin-top: -10px;" ><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Please input page name. </span>'
			$(span).insertAfter ('#edit_page_name');
		}
		if(document.getElementById('edit_page_title').value == ""){
			add_new_page_next_previous_button ($('#edit_button_previous'));
			if ( $('#warning_edit_page_title')!= null ) $('#warning_edit_page_title').remove();
			var span  = '<span id ="warning_edit_page_title" style="color:red; font-size:13px;margin-top: -10px;display:table;" ><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Please input a page title. </span>'
			$(span).insertAfter ('#edit_page_title');
		}
	}
}

function remove_warning (type){
	if ( type=="new_page") {
		if(document.getElementById('id_page_name').value != ""){
			  if ( $('#warning_new_page_name')!= null ) $('#warning_new_page_name').remove();
		}
		if(document.getElementById('id_page_title').value != ""){
			  if ( $('#warning_new_page_title')!= null ) $('#warning_new_page_title').remove();
		}
	}

	if ( type=="edit_page") {
		if(document.getElementById('edit_page_name').value != ""){
			  if ( $('#warning_edit_page_name')!= null ) $('#warning_edit_page_name').remove();
		}
		if(document.getElementById('edit_page_title').value != ""){
			  if ( $('#warning_edit_page_title')!= null ) $('#warning_edit_page_title').remove();
		}
	}

	if ( type=="clone_page") {
		if(document.getElementById('clone_page_name').value != ""){
			if ( $('#warning_clone_page_name')!= null ) $('#warning_clone_page_name').remove();
		}
		if(document.getElementById('clone_page_title').value != ""){
			if ( $('#warning_clone_page_title')!= null ) $('#warning_clone_page_title').remove();
		}
	}

	if ( type=="new_funnel") {
		if(document.getElementById('funnel_title').value != ""){
			  if ( $('#warning_add_funnel_title')!= null ) $('#warning_add_funnel_title').remove();
		}
	}
}

function create_new_funnel(button_type){
	if(document.getElementById('funnel_title').value != "" ){
		$(".loader").show();
		$('#funnel').submit();
	}else{
		if(document.getElementById('funnel_title').value == ""){
			if ( $('#warning_add_funnel_title')!= null ) $('#warning_add_funnel_title').remove();
			var span  = '<span id ="warning_add_funnel_title" style="color:red; font-size:13px;display:table;margin-top: -10px;" ><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Please input a funnel name. </span>'
			$(span).insertAfter ('#funnel_title');
		}
	}
}

function clone_page(){
	if(document.getElementById('clone_page_name').value != "" && document.getElementById('clone_page_title').value != "" ){
			$('#clone_page').submit();
			$(".loader").show();
	}else{
		if(document.getElementById('clone_page_name').value == ""){
			add_new_page_next_previous_button ($('#clone_button_previous'));
			if ( $('#warning_clone_page_name')!= null ) $('#warning_clone_page_name').remove();
			var span  = '<span id ="warning_clone_page_name" style="color:red; font-size:13px;display:table;margin-top: -10px;" ><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Please input a page name. </span>'
			$(span).insertAfter ('#clone_page_name');
		}
		if(document.getElementById('clone_page_title').value == ""){
			add_new_page_next_previous_button ($('#clone_button_previous'));
			if ( $('#warning_clone_page_title')!= null ) $('#warning_clone_page_title').remove();
			var span  = '<span id ="warning_clone_page_title" style="color:red; font-size:13px;margin-top: -10px;display:table;" ><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Please input a page title. </span>'
			$(span).insertAfter ('#clone_page_title');
		}
	}
}

function import_new_page(){
    var fileInput = document.getElementById('imported_page_json_file');
    var file = fileInput.files[0];
    var textType = /json.*/;
    var reader = new FileReader();
    if (file.name.indexOf('.json') !== -1 || file.name.indexOf('.JSON') !== -1) {
        reader.onload = function(e) {
            var result = reader.result;
            result = JSON.parse(result);
            var name = result.page.name;
            var title = result.page.title;
            var type = result.page.type;
            var html = result.page.html;
            var page_meta = JSON.stringify(result.page_meta);
            if ((typeof(name) != "undefined" && name) && (typeof(title) != "undefined" && title) && (typeof(html) != "undefined" && html))
            {
                $(".loader").show();
                var data = 'name=' + encodeURIComponent(name);
                data += '&title=' + encodeURIComponent(title);
                data += '&type=' + encodeURIComponent(type);
                data += '&html=' + encodeURIComponent(html);
                data += '&page_meta=' + encodeURIComponent(page_meta);
                http_post_request( base + '/default/?process=import_new_page', data , 'new_page_imported' );
            }
            else
            {
                show_dashboard_msg("Sorry, your file is corrupted or invalid" , 0);
            }
        }
        reader.readAsText(file);
    }
    else{
        show_dashboard_msg("Sorry, your file format is invalid" , 0);
    }
    //if (file.type.match(textType)) {
}

function import_new_page_template_from_json(fileurl){
	$(".loader").show();
	var file = fileurl

	var rawFile = new XMLHttpRequest();
	rawFile.open("GET",file,false);
	rawFile.onreadystatechange = function() {
		if(rawFile.readyState === 4) {
			if(rawFile.status === 200 || rawFile.status === 0)
			{
				var result = rawFile.responseText;

				var new_campaign_input_data = JSON.parse($('#new_campaign_input_data')[0].value);
				result = JSON.parse(result);
				var html = result.page.html;

				var page_meta = JSON.stringify(result.page_meta);

				var data = 'html_data=' + encodeURIComponent(html);
				data += '&page_meta=' + encodeURIComponent(page_meta);
				data += '&page_id=' + new_campaign_input_data['page_id'];
				http_post_request( base + '/default/?process=add_new_page_with_template_json', data , 'new_page_added_with_template' );
			}
		}
	}
	rawFile.send(null);
}

function new_page_imported(res){
	window.location = base+'/pages';
}
function add_meta_funnel(funnel_id) {
	var current_index = document.getElementById('current_index').value;
	var funnel_array= document.getElementById('funnel_array').value;
	var landing_page_product_array = document.getElementById('landing_page_product_array').value;
	funnel_array=JSON.parse(funnel_array);
	if (funnel_array[current_index].type != "checkout" && check_if_product_in_funnel()==false)  {
			if ( funnel_array[current_index].pages == '' ){
				if ( $('#warning')!= null ) $('#warning').remove();
				var span  = '<div id ="warning" style="color:red; font-size:14px;margin-left:5px" class="col-sm-12"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Please select at least one page. </div>'
				$(span).insertAfter ('#add_more_page_div');
				return;
			}
	}
	if ($('#one_upsell_status').val() == 'enable') {
		if (check_if_tag_is_in_landing_page_tag_array() == true) {
			$('.msc_confirm_tag').show();
			return;
		}
		else{
			add_this_tag_to_tag_array();
		}
		var shopify_tag_name = btoa(document.getElementById('shopify_tag_name').value);
	}
	var landing_page_tag_array = document.getElementById('landing_page_tag_array').value;
	$('.loader').show();
	var funnel_title = document.getElementById('funnel_title').value;
	var funnel_array = document.getElementById('funnel_array').value;
	var url_handle = document.getElementById('url_handle').value;
	url_handle =url_handle.replace(/\s+/g, '-');
	var analytics_id = document.getElementById('analytics_id').value;
	var facebook_pixel_id = document.getElementById('facebook_pixel_id').value;
	if (document.getElementById('mailing_list_for_subscribers') != null ) var mailing_list_for_subscribers = document.getElementById('mailing_list_for_subscribers').value;
	if (document.getElementById('mailing_list_for_abandoned_customers') != null )  var mailing_list_for_abandoned_customers = document.getElementById('mailing_list_for_abandoned_customers').value;

	var abandoned_drip_list_type ='';
	var mailing_subscriber_drip_list_type ='';
	var completed_order_drip_list_type ='';
	var completed_drip_list_id ='' ;
	var completed_klaviyo_list_id ='' ;
	var completed_aweber_list_id ='' ;
	var completed_mailchimp_list_id ='' ;

	if (document.getElementById('abandoned_drip_list_type') != null ) abandoned_drip_list_type = document.getElementById('abandoned_drip_list_type').value;
	if (document.getElementById('mailing_subscriber_drip_list_type') != null ) mailing_subscriber_drip_list_type = document.getElementById('mailing_subscriber_drip_list_type').value;
	if (document.getElementById('completed_order_drip_list_type') != null ) completed_order_drip_list_type = document.getElementById('completed_order_drip_list_type').value;

	if (document.getElementById('completed_drip_list_id') !=null )completed_drip_list_id = document.getElementById('completed_drip_list_id').value;
	if (document.getElementById('completed_klaviyo_list_id') !=null )completed_klaviyo_list_id = document.getElementById('completed_klaviyo_list_id').value;
	if (document.getElementById('completed_aweber_list_id') !=null )completed_aweber_list_id = document.getElementById('completed_aweber_list_id').value;
	if (document.getElementById('completed_mailchimp_list_id') !=null )completed_mailchimp_list_id = document.getElementById('completed_mailchimp_list_id').value;

	var funnel_checkout_conf = document.getElementById('funnel_checkout_conf').value;
	console.log('funnel_array='+funnel_array+'&funnel_checkout_conf='+funnel_checkout_conf+'&url_handle='+encodeURIComponent(url_handle)+'&analytics_id='+analytics_id+'&facebook_pixel_id='+facebook_pixel_id+'&mailing_list_for_subscribers='+mailing_list_for_subscribers+'&mailing_list_for_abandoned_customers='+mailing_list_for_abandoned_customers+'&funnel_id='+funnel_id+'&funnel_title='+encodeURIComponent(funnel_title)+'&abandoned_drip_list_type='+abandoned_drip_list_type+'&mailing_subscriber_drip_list_type='+mailing_subscriber_drip_list_type+'&completed_order_drip_list_type='+completed_order_drip_list_type+'&completed_drip_list_id='+completed_drip_list_id+'&completed_klaviyo_list_id='+completed_klaviyo_list_id+'&completed_aweber_list_id='+completed_aweber_list_id+'&completed_mailchimp_list_id='+completed_mailchimp_list_id+'&landing_page_product_array='+landing_page_product_array+'&landing_page_tag_array='+landing_page_tag_array+(document.getElementById('shopify_tag_name') != null ? '&shopify_tag_name='+encodeURIComponent(shopify_tag_name) : '' ));
	http_post_request( base + '/funnel/'+funnel_id+'/?process=edit_funnel_and_create_funnel_meta_in_db','funnel_array='+funnel_array+'&funnel_checkout_conf='+funnel_checkout_conf+'&url_handle='+encodeURIComponent(url_handle)+'&analytics_id='+analytics_id+'&facebook_pixel_id='+facebook_pixel_id+'&mailing_list_for_subscribers='+mailing_list_for_subscribers+'&mailing_list_for_abandoned_customers='+mailing_list_for_abandoned_customers+'&funnel_id='+funnel_id+'&funnel_title='+encodeURIComponent(funnel_title)+'&abandoned_drip_list_type='+abandoned_drip_list_type+'&mailing_subscriber_drip_list_type='+mailing_subscriber_drip_list_type+'&completed_order_drip_list_type='+completed_order_drip_list_type+'&completed_drip_list_id='+completed_drip_list_id+'&completed_klaviyo_list_id='+completed_klaviyo_list_id+'&completed_aweber_list_id='+completed_aweber_list_id+'&completed_mailchimp_list_id='+completed_mailchimp_list_id+'&landing_page_product_array='+landing_page_product_array+'&landing_page_tag_array='+landing_page_tag_array+(document.getElementById('shopify_tag_name') != null ? '&shopify_tag_name='+encodeURIComponent(shopify_tag_name) : '' ), 'new_funnel_meta_added' );
}

function new_funnel_meta_added(response) {
	show_dashboard_msg("Settings saved successfully." , 1);
	setTimeout(function(){ window.location.href = response; }, 1000);

}

function new_page_added( response ) {
	var id_page_name = $('#id_page_name').val();
	var id_page_title = $('#id_page_title').val();
	var id_product = $('#id_product').val();
	var id_product_type = $('#id_product_type').val();

	var new_campaign_input_data = {};
	new_campaign_input_data['page_name'] = id_page_name;
	new_campaign_input_data['page_title'] = id_page_title;
	new_campaign_input_data['product'] = id_product;
	new_campaign_input_data['product_type'] = id_product_type;
	new_campaign_input_data['page_id'] = response;
	$('#new_campaign_input_data').val(JSON.stringify(new_campaign_input_data));

	show_template_for_campaign_creation();

	$('.L_M_template').css('display', 'none');
	$('.P_template').css('display', 'none');
	$('.T_Y_template').css('display', 'none');
	if(id_product_type == 'lead_magnet'){
		$('.L_M_template').css('display', 'inline');
	}else if(id_product_type == 'product'){
		$('.P_template').css('display', 'inline');
	}else if(id_product_type == 'thank_you'){
		$('.T_Y_template').css('display', 'inline');
	}
	setTimeout(function(){ $(".loader").hide();}, 1000);
}

function show_template_for_campaign_creation(){
	$(".loader").hide();
	$('#snippet_popup').modal('toggle');
}

function add_this_template(url){
	html_to_json(url);
}

function html_to_json(myUrl){
	var myUrl_relative = myUrl.substring(0, myUrl.lastIndexOf('/') + 1);
 	var proxy = 'https://cors-anywhere.herokuapp.com/';
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", function () {
    	var data = this.response;
        var doc = (new DOMParser()).parseFromString(data,"text/html");
        var head_part = doc.getElementsByTagName("head")[0].innerHTML;
        var body_part  = doc.getElementsByTagName("body")[0].innerHTML;

        var all_style_elements = doc.getElementsByTagName('link');
        var head_style_elements =doc.getElementsByTagName("head")[0].getElementsByTagName('style');
        var body_style_elements =doc.getElementsByTagName("body")[0].getElementsByTagName('style');
        var css= "";

        for (l=0 ; l<head_style_elements.length ; l++){
            css+= head_style_elements[l].innerHTML;
        }
        for (l=0 ; l<body_style_elements.length ; l++){
            css+= body_style_elements[l].innerHTML;
        }
        $('#template_dependent_css_link').val('<style>'+css+'</style>');

		var myurl=[];

        for (var i =0 ; i<all_style_elements.length;i++){
            if ( all_style_elements[i].href =="" ) {
                var user_css_link = all_style_elements[i].outerHTML;
                user_css_link= user_css_link.match(/href="(.*?)"/)[1];
                if (myUrl_relative.endsWith('/') == true ) myUrl_relative.substring(0, myUrl_relative.length - +(myUrl_relative.lastIndexOf('/')==myUrl_relative.length-1));
                if ( user_css_link.startsWith ('/') !=true ) user_css_link='/'+user_css_link;
                user_css_link = myUrl_relative +user_css_link;
                myurl.push(user_css_link);
            }
            else {
                myurl.push(all_style_elements[i].href);
            }
        }

        for ( var k=0 ; k<myurl.length;k++){
                if (myurl[k].indexOf('.css') > 0 ){
                     var proxy1 = 'https://cors-anywhere.herokuapp.com/';
                     var oReq1 = new XMLHttpRequest();
                     oReq1.addEventListener("load", function () {
                            $("#template_dependent_css_link").val($("#template_dependent_css_link").val()+'<style>'+this.response+'</style>');
                        });
                    oReq1.open("GET", myurl[k]);
                    oReq1.send();
                }
        }
       	var iDiv = document.createElement('div');
       	$(iDiv).addClass("do_not_show_my_menu");

    	iDiv.innerHTML = body_part;
    	var elements = iDiv.getElementsByTagName('script');
        while (elements[0]) elements[0].parentNode.removeChild(elements[0]);
        elements = iDiv.getElementsByTagName('noscript');
        while (elements[0]) elements[0].parentNode.removeChild(elements[0]);
        elements = iDiv.getElementsByTagName('style');
        while (elements[0]) elements[0].parentNode.removeChild(elements[0]);

    	var json_data = html_to_json_generator($($(iDiv)[0].innerHTML));
    	json_data = JSON.stringify(new Array(json_data));
    	save_html_to_db(json_data);
     });
     oReq.open("GET", myUrl);
     oReq.send();
}

function html_to_json_generator(ele){
	var json_data_arr = {};
	json_data_arr["tag"] = ele[0].tagName.toLowerCase();
	if ($(ele)[0].outerHTML.endsWith('</'+$(ele)[0].tagName.toLowerCase()+'>')){json_data_arr["endtag"] = 1;}
	else{json_data_arr["endtag"] = 0;}
	var attr = ele[0].attributes;
	var tmp = {};
	var hasId = false;
	var hasClass = false;
	for(var l=0; l<Object.keys(attr).length; l++){
		if(attr[l].name == 'id'){
			hasId = true;
		}
	}
	if(!hasId){
		tmp['id'] = ele[0].tagName.toLowerCase()+'_'+(element_id++);
	}
	for(var k=0; k<Object.keys(attr).length; k++){
		tmp[attr[k].name] = attr[k].nodeValue;
	}
	json_data_arr["attributes"]= tmp;
	var content = $(ele[0]).clone().children().remove().end().text();

	if($(ele).children().length == 0){
		json_data_arr["content"] = content;
		if(ele[0].tagName.toLowerCase() == 'div'){
			json_data_arr["nodes"] = new Array();
		}
	}
	if($(ele).children().length > 0){
		json_data_arr["content"] = content;
		json_data_arr["nodes"] = [new Array()];
		var ele_childs = $(ele).children();
		for(var i=0; i<ele_childs.length;i++){
			json_data_arr["nodes"][i] = html_to_json_generator($(ele_childs[i]));
		}
	}
	return json_data_arr;
}

function save_html_to_db(html_data){
	var new_campaign_input_data = JSON.parse($('#new_campaign_input_data').val());
	var data = 'page_id=' + new_campaign_input_data['page_id'];
	data += '&html_data=' +  encodeURIComponent(html_data) ;
	data += '&html_style=' +  encodeURIComponent($("#template_dependent_css_link").val()) ;
	http_post_request( base + '/default/?process=add_new_page_with_template', data , 'new_page_added_with_template' );
}

function new_page_added_with_template(response){
	window.location.replace(base+'/editor/?page='+response);
}

function duplicate_me(page_or_funnel , redirect){
	if(page_or_funnel == "page"){
		var bulk_action_page_id = $("#bulk_action_page_id")[0].value;
		var data = 'bulk_action_page_id=' + bulk_action_page_id;
		data += '&redirect=' + redirect;
		http_post_request( base + '/default/?process=bulk_duplicate_page', data , 'bulk_response' );
	}else if(page_or_funnel == "funnel"){
		var bulk_action_funnel_id = $("#bulk_action_funnel_id")[0].value;
		var data = 'bulk_action_funnel_id=' + bulk_action_funnel_id;
		data += '&redirect=' + redirect;
		http_post_request( base + '/default/?process=bulk_duplicate_funnel', data , 'bulk_response' );
	}
}

function delete_me(page_or_funnel,redirect){
	if(page_or_funnel == "page"){
		mscConfirm("Delete", "Are you sure you want to delete pages?", function(){
			var bulk_action_page_id = $("#bulk_action_page_id")[0].value;
			var data = 'bulk_action_page_id=' + bulk_action_page_id;
			data += '&redirect=' + redirect;
			http_post_request( base + '/default/?process=bulk_delete_page', data , 'bulk_response' );
		},
		function() {

		});
	}else if(page_or_funnel == "funnel"){
		mscConfirm("Delete", "Are you sure you want to delete funnels?", function(){
			var bulk_action_funnel_id = $("#bulk_action_funnel_id")[0].value;
			var data = 'bulk_action_funnel_id=' + bulk_action_funnel_id;
			data += '&redirect=' + redirect;
			http_post_request( base + '/default/?process=bulk_delete_funnel', data , 'bulk_response' );
		},
		function() {

		});
	}
}

function export_single_page(id){
	var page_id =id;
	var data = 'page_id=' + page_id;
	http_post_request( base + '/default/?process=export_page', data , 'single_page_exported' );
}

function single_page_exported (res) {
	res = JSON.parse(res);
	make_downloadable_json_file(JSON.stringify(res),res.page.name+'.json');
}

function export_me(page_or_funnel){
	if(page_or_funnel == "page"){
		var bulk_action_page_id = $("#bulk_action_page_id")[0].value;
		var data = 'bulk_action_page_id=' + bulk_action_page_id;
		http_post_request( base + '/default/?process=bulk_export_page', data , 'bulk_page_exported' );
	}else if(page_or_funnel == "funnel"){
		var bulk_action_funnel_id = $("#bulk_action_funnel_id")[0].value;
		var data = 'bulk_action_funnel_id=' + bulk_action_funnel_id;
		http_post_request( base + '/default/?process=bulk_export_funnel', data , 'bulk_page_exported' );
	}
}
function bulk_response(res){
	if(res != '') window.location = base+'/'+res;
}
function bulk_page_exported(res){
	res = JSON.parse(res);
	for(var i=0;i<res.length;i++){
		make_downloadable_json_file(JSON.stringify(res[i]),res[i].page.name+'.json');
	}
}

function make_downloadable_json_file(text, filename) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}

function logoremoteurluploaded( response ) {
	document.getElementById('logoremoteurl').value = response;
	var data = 'image_url=' + response;
	http_post_request( base + '/checkout_settings/?process=save_logo_image', data , 'image_saved' );
}

function image_saved(res){

}


function upload_image(image, preview_div, uploadUrl, callback) {
	$("#custom_checkout_page_logo").show();
	if( preview_div != "" ) document.getElementById(preview_div).innerHTML = '<img src="' + base + '/files/images/loader.gif" class="img-responsive">';

	// Get the selected files from the input.
	var files = image.files;

	// Create a new FormData object.
	var formData = new FormData();

	// Loop through each of the selected files.
	for (var i = 0; i < files.length; i++) {
	  var file = files[i];

	  // Check the file type.
	  /*if (!file.type.match('image.*')) {
		continue;
	  }*/

	  // Add the file to the request.
	  formData.append('photos[]', file, file.name);
	}


	// Set up the request.
	var xhr = new XMLHttpRequest();

	// Open the connection.
	xhr.open('POST', uploadUrl, true);

	// Set up a handler for when the request finishes.
	xhr.onload = function () {
	  if (xhr.status === 200) {
		// File(s) uploaded.
		if( preview_div != "" ) document.getElementById(preview_div).innerHTML = '<img src="' + xhr.responseText + '" style="width: 100px;">';
		var responseText = xhr.responseText;
		if(callback != '' ) {
			window[callback](responseText);
		}

	  } else {
		alert('An error occurred!');
	  }
	};

	// Send the Data.
	xhr.send(formData);

	return false;
}






function show_variants(me){
    var product_id = $(me).val().split('@@@@')[0];
    $('#info_1').val(product_id);
    var data = 'product_id=' + product_id;
    http_post_request( base + '/checkout_settings/?process=get_variants', data , 'received_variants' );
}
function received_variants(response){
    response = JSON.parse(response);
    document.getElementById('variant_options').innerHTML = response.html_data;
    $('#hidden_varient_options').val(response.option);
    $('#hidden_varient_options_name').val(JSON.stringify(response.option2));
}
function select_sale_variant(me,option){
    var select_val = $("#variant_options :input");
    var options = $('#hidden_varient_options').val();
    var combind_option = "";
    for(var i=0; i<select_val.length; i++){
        if (i == 0) { combind_option += $(select_val[i])[0].value ; }
        else{ combind_option += " / " + $(select_val[i])[0].value ; }
    }
    if (options.indexOf(combind_option) > -1) {
        document.getElementById('variant_message').innerHTML = "";
        $('#add_bump_product_btn').prop('disabled', false);
    }
    else{
        document.getElementById('variant_message').innerHTML = "Out of stock";
        $('#add_bump_product_btn').prop('disabled', true);
    }
}
function add_bump_product(){
    var select_val = $("#variant_options :input");
    var combind_option = "";
    for(var i=0; i<select_val.length; i++){
        if (i == 0) { combind_option += $(select_val[i])[0].value ; }
        else{ combind_option += " / " + $(select_val[i])[0].value ; }
    }


    var product_id = document.getElementById('info_1').value;
    var product_name = $("#select_bump_product")[0].value.split('@@@@')[1];
    var pro_det = product_name +'-'+ combind_option;
    var check_option = document.getElementById('added_bump_products').innerHTML;

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
        var page_id = "null";
        var product_array = document.getElementById('hidden_all_bump_product').value;
        var info = page_id + "@@@@" + product_array;
        var data = 'product_details=' + product_details;
        http_post_request( base + '/checkout_settings/?process=save_bump_product_details&info='+info, data , 'saved_bump_product_details' );
        //
        product_name +=  '-'+combind_option+'<br>';
        //
        document.getElementById('added_bump_products').innerHTML += product_name;
        document.getElementById('variant_options').innerHTML = '';
        $('#add_bump_product_btn').prop('disabled', true);
        var element = document.getElementById('select_bump_product');
        element.value = "Select";
    }
    else
    {
        document.getElementById('variant_message').innerHTML = "Product already added";
    }

}

function saved_bump_product_details(response){
    if (response !="" ) {
        var product = JSON.parse(response);
        var tableRef = document.getElementById('bump_product_table').getElementsByTagName('tbody')[0];
        //var table = document.getElementById("bump_product_table");
        var row = tableRef.insertRow(tableRef.rows.length);
        row.id = 'bump_product_row'+rand;
        var img_url = product['product_details'][4][0];
        img_url =  img_url.replace('.png','_thumb.png');
        img_url =  img_url.replace('.jpg','_thumb.jpg');
        img_url =  img_url.replace('.jpeg','_thumb.jpeg');
        img_url =  img_url.replace('.gif','_thumb.gif');
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        cell1.className = 'bump_table_product_image';
        cell2.className = 'bump_table_product';
        cell3.className = 'bump_table_td_variant';
        cell4.className = 'bump_table_td_option';
        cell1.id = 'bump_product_product_image'+rand;
        cell2.id = 'bump_product_productname'+rand;
        cell3.id = 'bunble_product_productvariant'+rand;
        cell4.id = 'bump_table_td_option'+rand;
        cell1.innerHTML = '<img style="height:20px;" src="' + img_url + '">';
        cell2.innerHTML = product['product_details'][2];
        cell3.innerHTML = product['product_details'][3];
        cell4.innerHTML = '<a href="#" onclick="delete_bump_product(' + rand + ');"><span class="label label-danger">Delete</span><a>';
        $('#hidden_all_bump_product').val(product['product_array']);
        document.getElementById("product_table_div").style.display = "block";
        document.getElementById("product_table_alternative_div").style.display = "none";
        rand = rand + 1;
    }
}
function delete_bump_product(index){
    var product_name = document.getElementById('bump_product_productname'+index).innerHTML;
    var product_variant = document.getElementById('bunble_product_productvariant'+index).innerHTML;
    var page_id = "null";
    var product_array = document.getElementById('hidden_all_bump_product').value;
    var info = page_id + "@@@@" + index + "@@@@" + product_array;
    var product_details = product_name + "@@@@" + product_variant;
    var data = 'product_details=' + product_details;
    var products = document.getElementById('added_bump_products').innerHTML;
    products = products.trim();
    var va = product_name+"-"+product_variant+"<br>";
    var products = products.replace(va, "");
    document.getElementById('added_bump_products').innerHTML = products;
    http_post_request( base + '/checkout_settings/?process=delete_bump_product&info='+info, data , 'deleted_bump_product_response' );
}
function deleted_bump_product_response(response){
    response = JSON.parse(response);
    $('#hidden_all_bump_product').val(response.product_array);
    var arr_size = JSON.parse(response.product_array);
    if (arr_size.length == 0) {
    	document.getElementById("product_table_div").style.display = "none";
        document.getElementById("product_table_alternative_div").style.display = "block";
    }
    var index = response.index;
    $('table#bump_product_table tr#bump_product_row'+index).remove();
}

function send_page_info_to_edit_popup(id) {
	document.getElementById("edit_product_title_div").innerHTML = '<i class="fa fa-spinner fa-spin"></i>';
    var page_type = document.getElementById(id+'_page_type').value;
    var product_handle = "";
    var product_id = document.getElementById(id+'_product_id').value;

    if(product_id != ""){
    	get_product_title(product_id,'edit_product_title_div');
    }

    document.getElementById('edit_page_id').value = id;
    document.getElementById('edit_page_name').value = document.getElementById(id+'_page_name').value;
    document.getElementById('edit_page_title').value = document.getElementById(id+'_page_title').value;
    if(product_id) {
        document.getElementById("edit_product").value = product_id+"/"+product_handle;
    } else{
        document.getElementById("edit_product_title_div").innerHTML = 'No product selected';

    }
    document.getElementById("edit_page_handle").value = document.getElementById(id+'_product_handle').value;

    document.getElementById("edit_page_type").value = page_type;
}

function send_page_info_to_clone_popup(id) {
	document.getElementById("clone_product_title_div").innerHTML = '<i class="fa fa-spinner fa-spin"></i>';
    var page_type = document.getElementById(id+'_page_type').value;
    var product_handle = "";
    var product_id = document.getElementById(id+'_product_id').value;
    document.getElementById('clone_page_id').value = id;
    document.getElementById('clone_page_name').value = document.getElementById(id+'_page_name').value;
    document.getElementById('clone_page_title').value = document.getElementById(id+'_page_title').value;

    if(product_id != ""){
    	get_product_title(product_id,'clone_product_title_div');
    }
    if(product_id) {
        document.getElementById("clone_product").value = product_id+"/"+product_handle;
    } else{
        document.getElementById("clone_product").value = '';
        document.getElementById("clone_product_title_div").innerHTML = "No product selected";
    }

    document.getElementById("clone_page_product_slug").value = document.getElementById(id+'_product_handle').value;

    document.getElementById("clone_page_type").value = page_type;
}


function duplicate_funnel_into_db(shop_id,funnel_id,redirect) {
	$(".loader").show();
	var data='shop_id='+shop_id;
	data+='&funnel_id='+funnel_id;
	data+='&redirect='+redirect;
	http_post_request( base + '/default/?process=duplicate_funnel_into_db',data,'duplicate_funnel_into_db_successfull');

}


function duplicate_funnel_into_db_successfull (res) {
	show_dashboard_msg("Successfully cloned" , 1);
	if (res=='base'){
		setTimeout(function(){ window.location = base+'/home'; }, 500);
	}
	else {
		setTimeout(function(){ window.location = base+'/all_funnels'; }, 500);
	}

}

//~Page/Funnel Delete related function

function delete_page_from_db(shop_id,page_id,page,redirect) {
	mscConfirm("Delete", "Are you sure you want to delete this page?", function(){
		$(".loader").show();
		var data='shop_id='+shop_id;
		data+='&page_id='+page_id;
		data+='&page='+page;
		data+='&redirect='+redirect;
		http_post_request( base + '/default/?process=delete_page_from_db',data,'delete_page_from_db_successfull');
	},
	function() {

	});
}

function delete_page_from_db_successfull(res) {
	$(".loader").hide();
	show_dashboard_msg("Successfully deleted" , 1);
	if (res=='base'){
		setTimeout(function(){ window.location = base+'/home'; }, 500);
	}
	else {
		setTimeout(function(){ window.location = base+'/pages'; }, 500);
	}
}


function delete_funnel_from_db(shop_id,funnel_id , funnel_page,redirect) {
	mscConfirm("Delete", "Are you sure you want to delete this funnel?", function(){
		$(".loader").show();
		var data='shop_id='+shop_id;
		data+='&funnel_id='+funnel_id;
		data+='&funnel_page='+funnel_page;
		data+='&redirect='+redirect;
		http_post_request( base + '/default/?process=delete_funnel_from_db',data,'delete_funnel_from_db_successfull');
	},
	function() {

	});
}

function delete_funnel_from_db_successfull(res) {
	$(".loader").hide();
	show_dashboard_msg("Successfully deleted" , 1);
	if (res=='base'){
		setTimeout(function(){ window.location = base+'/home'; }, 500);
	}
	if (res=='all_funnels'){
		setTimeout(function(){ window.location = base+'/all_funnels'; }, 500);

	}
}

function show_dashboard_msg(msg , msg_type){
	if ( msg_type == 1 ) {
		$("#dashboard_msg").css("background-color" ,"rgba(52,73,94,.8)");
		$("#dashboard_msg").slideDown();
		$("#dashboard_msg")[0].innerHTML = msg;
		setTimeout(function(){ $("#dashboard_msg").slideUp() }, 2500);
	}
	else if ( msg_type == 0) {
		$("#dashboard_msg").css("background-color" ,"rgba(139,0,0,.8)");
		$("#dashboard_msg").slideDown();
		$("#dashboard_msg")[0].innerHTML = msg;
		setTimeout(function(){ $("#dashboard_msg").slideUp() }, 2500);
	}
}

function mailer_selected( option ) {
	document.getElementById('mailer_service_aweber').style.display = 'none';
	document.getElementById('mailer_service_mailchimp').style.display = 'none';
	document.getElementById('mailer_service_drip').style.display = 'none';
	document.getElementById('mailer_service_klaviyo').style.display = 'none';

	$(".mailchimp_abandoned_div").hide();
	$(".aweber_abandoned_div").hide();
	$(".klaviyo_abandoned_div").hide();
	$(".drip_abandoned_div").hide();

	$(".mailchimp_subscribed_div").hide();
	$(".aweber_subscribed_div").hide();
	$(".klaviyo_subscribed_div").hide();
	$(".drip_subscribed_div").hide();

	$(".mailchimp_completed_div").hide();
	$(".aweber_completed_div").hide();
	$(".klaviyo_completed_div").hide();
	$(".drip_completed_div").hide();

	$(".drip_abandoned_list_type_div").hide();
	if (option != '') {
		document.getElementById('mailer_service_' + option ).style.display = 'block';
	}
}

function drip_list_type_selected(a){
	if (a=='abandoned') {
		$(".drip_abandoned_div").hide();
		$(".abandoned_cart_div").hide();
	}
	else if (a=='opt_in') {
		$(".drip_subscribed_div").hide();
		$(".opt_in_div").hide();
	}
	else
	{
		$(".drip_completed_div").hide();
		$(".buyers_div").hide();
	}
}

function update_performance_details(a,b){
	var startdate = encodeURIComponent(b.startDate.format("MMMM D, YYYY"));
	var enddate = encodeURIComponent(b.endDate.format("MMMM D, YYYY"));

	window.location.href = window.location.pathname+"?startdate="+startdate+"&enddate="+enddate;
}

function find_products(){
	$('#search_result').empty();
    var title = $('#search_text').val();
    var page = $('#page_number_for_products').val();
    page = 1;
    $("#page_number_for_products").val(page);
    if (title != '') {
		var loader = '<i class="product_spinner fa fa-spinner fa-spin" style="font-size:24px"></i>';
		$(".product_spinner" ).remove();
		$("#search_result").append(loader);
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
			//$("#search_ul").append('<a class="list-group-item" id="warning_new_page_search" style="color:red; font-size:13px;margin-top: 0px;"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> No more product left.</a>');
		}
	}
	else if(products.length < 100){
		if (parseInt($('#page_number_for_products').val()) == 1){
			html_for_creat_page = '<ul id="search_ul"  style="height: 182px; overflow-y: auto; margin-bottom: 0px !important;" class="text-left list-group" class="text-left list-group">';
			for (i = 0; i < products.length; i++) {
				var id = products[i]['id'];
				var handle = products[i]['handle'];
				var title = products[i]['title'];
				title = title.replace(/\\/g, '');
				var title2 = title.replaceAll("'","\\&#39;");
				title2 = title2.replaceAll('"','&quot;');
			    html_for_creat_page += '<a class="list-group-item" style="cursor:pointer;" onclick="selected_value('+id+',\''+handle+'\',\''+title2+'\');">'+ title +'</a>';

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
			    html_for_creat_page += '<a class="list-group-item" style="cursor:pointer;" onclick="selected_value('+id+',\''+handle+'\',\''+title2+'\');">'+ title +'</a>';
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
			    html_for_creat_page += '<a class="list-group-item" style="cursor:pointer;" onclick="selected_value('+id+',\''+handle+'\',\''+title2+'\');">'+ title +'</a>';

			}
			html_for_creat_page += '<a class="list-group-item text-center"  id="load_more" style="background-color: #ccc;padding: 5px;" onclick="load_more_products()"><span style="color:#337ab7;">Load more</span></a></ul>';
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
			    html_for_creat_page += '<a class="list-group-item" style="cursor:pointer;" onclick="selected_value('+id+',\''+handle+'\',\''+title2+'\');">'+ title +'</a>';

			}
			html_for_creat_page += '<a class="list-group-item text-center"  id="load_more" style="background-color: #ccc;padding: 5px;" onclick="load_more_products()"><span style="color:#337ab7;">Load more</span></a>';
			$("#load_more" ).remove();
			$("#search_ul").append(html_for_creat_page);
		}
	}
	$(".product_spinner" ).remove();

}

function selected_value(id,handle,title){
	$( ".modal-content" ).removeClass( "modal_height_350" );
	var data = id + "/" + handle;
	$('#div_id_product').fadeOut();
	$('#search_text').val("");
	$('#id_product').val(data);
	$('#product_title_div').html('<a href="https://' + this_shop_url + '/products/' + handle + '" target="_blank">' + title + '</a>'+'<button class="pull-right close" onclick="remove_product_from_all()">&times;</button>');
	$('#search_result').empty();
	$("#id_page_handle").val(handle);
	$("#create_page_edit_control").show();
	$("#product_title_div").show();
}
function remove_product_from_all(){
	$('#product_title_div').text('No product selected').next().addClass("hidden");
	$('#edit_product_title_div').text('No product selected').next().addClass("hidden");
	$('#clone_product_title_div').text('No product selected').next().addClass("hidden");
	$('#id_product').val('');
	$('#edit_product').val('');
	$('#clone_product').val('');
	$('#id_page_handle').val('');
	$('#edit_page_handle').val('');
	$('#clone_page_product_slug').val('');
	$('#div_id_product').fadeOut();
	$('#div_id_edit_product').fadeOut();
	$('#div_id_clone_product').fadeOut();
}
String.prototype.replaceAll = function(search, replacement) {
   var target = this;
   return target.split(search).join(replacement);
};

function edit_find_products(){
	$('#edit_search_result').empty();
    var title = $('#edit_search_text').val();
    var page = 1;
    $("#page_number_for_edit_products").val(page);
    if (title != '') {
    	var loader = '<i class="product_spinner fa fa-spinner fa-spin" style="font-size:24px"></i>';
    	$(".product_spinner" ).remove();
		$("#edit_search_result").append(loader);
    	var data ='';
    	http_post_request( base + '/default/?process=find_products&page='+page+'&title='+encodeURIComponent(title),data,'edit_found_products');
    }
}
function load_more_edit_products(){
    var title = $('#edit_search_text').val();
    var page = $('#page_number_for_edit_products').val();
    page = parseInt(page);
    page = page + 1;
    $("#page_number_for_edit_products").val(page);
    if (title != '') {
    	var loader = '<i class="product_spinner fa fa-spinner fa-spin" style="font-size:24px"></i>';
		$(".product_spinner" ).remove();
		$("#edit_search_result").append(loader);
		$( ".modal-content" ).addClass( "modal_height_350" );
    	var data ='';
    	http_post_request( base + '/default/?process=find_products&page='+page+'&title='+encodeURIComponent(title),data,'edit_found_products');
    }
}
function edit_found_products(res){
	var products = JSON.parse(res);
	var html = '';
	var html_for_edit = '';
	if (products.length == 0) {
		if (parseInt($('#page_number_for_edit_products').val()) == 1) {
			html = '<span id="warning_new_page_search" style="color:red; font-size:13px;display:table;margin-top: 0px;"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> No search result found. </span>';
	    	$("#edit_search_result").append(html);
		}
		else{
			$("#load_more" ).remove();
			//$("#edit_search_ul").append('<a class="list-group-item" id="warning_new_page_search" style="color:red; font-size:13px;margin-top: 0px;"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> No more product left.</a>');
		}

	}
	else if(products.length < 100)
	{
		if (parseInt($('#page_number_for_edit_products').val()) == 1){
			html_for_edit = '<ul id="edit_search_ul" style="height: 182px; overflow-y: auto; margin-bottom: 0px !important;" class="text-left list-group" class="text-left list-group">';
			for (i = 0; i < products.length; i++) {
				var id = products[i]['id'];
				var handle = products[i]['handle'];
				var title = products[i]['title'];
				title = title.replace(/\\/g, '');
				var title2 = title.replaceAll("'","\\&#39;");
				title2 = title2.replaceAll('"','&quot;');
			    html_for_edit += '<a class="list-group-item" style="cursor:pointer;" onclick="edit_selected_value('+id+',\''+handle+'\',\''+title2+'\');">'+ title +'</a>';

			}
			html_for_edit += '</ul>';
			$("#edit_search_result").append(html_for_edit);
		}
		else{
			for (i = 0; i < products.length; i++) {
				var id = products[i]['id'];
				var handle = products[i]['handle'];
				var title = products[i]['title'];
				title = title.replace(/\\/g, '');
				var title2 = title.replaceAll("'","\\&#39;");
				title2 = title2.replaceAll('"','&quot;');
			    html_for_edit += '<a class="list-group-item" style="cursor:pointer;" onclick="edit_selected_value('+id+',\''+handle+'\',\''+title2+'\');">'+ title +'</a>';

			}
			$("#load_more" ).remove();
			$("#edit_search_ul").append(html_for_edit);
		}

	}
	else{
		if (parseInt($('#page_number_for_edit_products').val()) == 1){
			html_for_edit = '<ul id="edit_search_ul"  style="height: 182px; overflow-y: auto; margin-bottom: 0px !important;" class="text-left list-group" class="text-left list-group">';
			for (i = 0; i < products.length; i++) {
				var id = products[i]['id'];
				var handle = products[i]['handle'];
				var title = products[i]['title'];
				title = title.replace(/\\/g, '');
				var title2 = title.replaceAll("'","\\&#39;");
				title2 = title2.replaceAll('"','&quot;');
			    html_for_edit += '<a class="list-group-item" style="cursor:pointer;" onclick="edit_selected_value('+id+',\''+handle+'\',\''+title2+'\');">'+ title +'</a>';

			}
			html_for_edit += '<a class="list-group-item text-center"  id="load_more" style="background-color: #ccc;padding: 5px;" onclick="load_more_edit_products()"><span style="color:#337ab7;">Load more</span></a></ul>';
			$( "#load_more" ).remove();
			$("#edit_search_result").append(html_for_edit);
		}
		else{
			for (i = 0; i < products.length; i++) {
				var id = products[i]['id'];
				var handle = products[i]['handle'];
				var title = products[i]['title'];
				title = title.replace(/\\/g, '');
				var title2 = title.replaceAll("'","\\&#39;");
				title2 = title2.replaceAll('"','&quot;');
			    html_for_edit += '<a class="list-group-item" style="cursor:pointer;" onclick="edit_selected_value('+id+',\''+handle+'\',\''+title2+'\');">'+ title +'</a>';

			}
			html_for_edit += '<a class="list-group-item text-center"  id="load_more" style="background-color: #ccc;padding: 5px;" onclick="load_more_edit_products()"><span style="color:#337ab7;">Load more</span></a>';
			$("#load_more" ).remove();
			$("#edit_search_ul").append(html_for_edit);
		}
	}
	$(".product_spinner" ).remove();

}
function clone_find_products(){
	$('#clone_search_result').empty();
    var title = $('#clone_search_text').val();
    var page = 1;
    $("#page_number_for_clone_products").val(page);
    if (title != '') {
    	var loader = '<i class="product_spinner fa fa-spinner fa-spin" style="font-size:24px"></i>';
		$(".product_spinner" ).remove();
		$("#clone_search_result").append(loader);
    	var data ='';
    	http_post_request( base + '/default/?process=find_products&page='+page+'&title='+encodeURIComponent(title),data,'clone_found_products');
    }
}
function load_more_clone_products(){
	var title = $('#clone_search_text').val();
    var page = $('#page_number_for_clone_products').val();
    page = parseInt(page);
    page = page + 1;
    $("#page_number_for_clone_products").val(page);
    if (title != '') {
    	var loader = '<i class="product_spinner fa fa-spinner fa-spin" style="font-size:24px"></i>';
		$(".product_spinner" ).remove();
		$("#clone_search_result").append(loader);
		$( ".modal-content" ).addClass( "modal_height_350" );
    	var data ='';
    	http_post_request( base + '/default/?process=find_products&page='+page+'&title='+encodeURIComponent(title),data,'clone_found_products');
    }
}
function clone_found_products(res){
	var products = JSON.parse(res);
	var html = '';
	var html_for_edit = '';
	if (products.length == 0) {
		if (parseInt($('#page_number_for_clone_products').val()) == 1) {
			html = '<span id="warning_new_page_search" style="color:red; font-size:13px;display:table;margin-top: 0px;"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> No search result found. </span>';
	    	$("#clone_search_result").append(html);
		}
		else{
			$("#load_more" ).remove();
			//$("#clone_search_ul").append('<a class="list-group-item" id="warning_new_page_search" style="color:red; font-size:13px;margin-top: 0px;"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> No more product left.</a>');
		}

	}
	else if(products.length < 100)
	{
		if (parseInt($('#page_number_for_clone_products').val()) == 1){
			html_for_edit = '<ul id="clone_search_ul" style="height: 182px; overflow-y: auto; margin-bottom: 0px !important;" class="text-left list-group" class="text-left list-group">';
			for (i = 0; i < products.length; i++) {
				var id = products[i]['id'];
				var handle = products[i]['handle'];
				var title = products[i]['title'];
				title = title.replace(/\\/g, '');
				var title2 = title.replaceAll("'","\\&#39;");
				title2 = title2.replaceAll('"','&quot;');
			    html_for_edit += '<a class="list-group-item" style="cursor:pointer;" onclick="clone_selected_value('+id+',\''+handle+'\',\''+title2+'\');">'+ title +'</a>';

			}
			html_for_edit += '</ul>';
			$("#clone_search_result").append(html_for_edit);
		}
		else{
			for (i = 0; i < products.length; i++) {
				var id = products[i]['id'];
				var handle = products[i]['handle'];
				var title = products[i]['title'];
				title = title.replace(/\\/g, '');
				var title2 = title.replaceAll("'","\\&#39;");
				title2 = title2.replaceAll('"','&quot;');
			    html_for_edit += '<a class="list-group-item" style="cursor:pointer;" onclick="clone_selected_value('+id+',\''+handle+'\',\''+title2+'\');">'+ title +'</a>';

			}
			$("#load_more" ).remove();
			$("#clone_search_ul").append(html_for_edit);
		}

	}
	else{
		if (parseInt($('#page_number_for_clone_products').val()) == 1){
			html_for_edit = '<ul id="clone_search_ul"  style="height: 182px; overflow-y: auto; margin-bottom: 0px !important;" class="text-left list-group" class="text-left list-group">';
			for (i = 0; i < products.length; i++) {
				var id = products[i]['id'];
				var handle = products[i]['handle'];
				var title = products[i]['title'];
				title = title.replace(/\\/g, '');
				var title2 = title.replaceAll("'","\\&#39;");
				title2 = title2.replaceAll('"','&quot;');
			    html_for_edit += '<a class="list-group-item" style="cursor:pointer;" onclick="clone_selected_value('+id+',\''+handle+'\',\''+title2+'\');">'+ title +'</a>';

			}
			html_for_edit += '<a class="list-group-item text-center"  id="load_more" style="background-color: #ccc;padding: 5px;" onclick="load_more_clone_products()"><span style="color:#337ab7;">Load more</span></a></ul>';
			$( "#load_more" ).remove();
			$("#clone_search_result").append(html_for_edit);
		}
		else{
			for (i = 0; i < products.length; i++) {
				var id = products[i]['id'];
				var handle = products[i]['handle'];
				var title = products[i]['title'];
				title = title.replace(/\\/g, '');
				var title2 = title.replaceAll("'","\\&#39;");
				title2 = title2.replaceAll('"','&quot;');
			    html_for_edit += '<a class="list-group-item" style="cursor:pointer;" onclick="clone_selected_value('+id+',\''+handle+'\',\''+title2+'\');">'+ title +'</a>';

			}
			html_for_edit += '<a class="list-group-item text-center"  id="load_more" style="background-color: #ccc;padding: 5px;" onclick="load_more_clone_products()"><span style="color:#337ab7;">Load more</span></a>';
			$("#load_more" ).remove();
			$("#clone_search_ul").append(html_for_edit);
		}
	}
	$(".product_spinner" ).remove();

}
function edit_selected_value(id,handle,title){
	var data = id + "/" + handle;
	$('#div_id_edit_product').fadeOut();
	$('#edit_product').val(data);
	$('#edit_product_title_div').html('<a href="https://' + this_shop_url + '/products/' + handle + '" target="_blank">' + title + '</a>'+'<button class="pull-right close" onclick="remove_product_from_all()">&times;</button>');
	$('#edit_search_result').empty();
	$('#edit_search_text').val("").blur();
	$("#edit_page_handle").val(handle);
}
function clone_selected_value(id,handle,title){
	var data = id + "/" + handle;
	$('#div_id_clone_product').fadeOut();
	$('#clone_product').val(data);
	$('#clone_product_title_div').html('<a href="https://' + this_shop_url + '/products/' + handle + '" target="_blank">' + title + '</a>'+'<button class="pull-right close" onclick="remove_product_from_all()">&times;</button>');
	$('#clone_search_result').empty();
	$('#clone_search_text').val("").blur();
	$("#clone_page_product_slug").val(handle);
}

function get_product_title(product_id,div_id){
	var data ='product_id='+product_id;
    http_post_request( base + '/default/?process=get_product_title',data,'get_product_title_done',div_id);
}

function get_product_title_done(res,div_id){
	res = JSON.parse(res);
	var product_title = res.title;
	var product_handle = res.handle;
	$("#"+div_id)[0].innerHTML ='<a href="https://' + this_shop_url + '/products/' + product_handle + '" target="_blank">' + product_title + '</a>'+'<button class="pull-right close" onclick="remove_product_from_all()">&times;</button>';
}


// $(document).ready(function(){
//    $('.modal').on('hidden.bs.modal', function () {
//        $(this).find('form').trigger('reset');
//    })
// });



function add_new_page_next_previous_button (button){

   if ($(button)[0].id == 'button_next'){
       $(button).hide();

       $('#add_new_page_header')[0].innerHTML = "Select a product for your page";

       $('#page_information_div').hide();
       $('#product_information_div').fadeIn();
       $('#product_information_div').show();

       $('#button_previous').show();
       $('#button_add').show();
   }


   if ($(button)[0].id == 'button_previous'){
       $(button).hide();

       $('#add_new_page_header')[0].innerHTML = "Select a name and title";

       $('#product_information_div').hide();
       $('#page_information_div').fadeIn();
       $('#page_information_div').show();

       $('#button_next').show();
       $('#button_add').hide();
   }

   if ($(button)[0].id == 'edit_button_next'){
       $(button).hide();

       $('#edit_page_header')[0].innerHTML = "Select a product for your page";

       $('#edit_page_information_div').hide();
       $('#edit_product_information_div').fadeIn();
       $('#edit_product_information_div').show();

       $('#edit_button_previous').show();
       $('#edit_button_save').show();
       $('#edit_button_add').show();
   }
   if ($(button)[0].id == 'edit_button_previous'){
       $(button).hide();

       $('#edit_page_header')[0].innerHTML = "Select a name and title";

       $('#edit_product_information_div').hide();
       $('#edit_page_information_div').fadeIn();
       $('#edit_page_information_div').show();

       $('#edit_button_next').show();
       $('#edit_button_save').hide();
       $('#edit_button_add').hide();
   }

   if ($(button)[0].id == 'clone_button_next'){
       $(button).hide();

       $('#clone_page_header')[0].innerHTML = "Select a product for your page";

       $('#clone_page_information_div').hide();
       $('#clone_product_information_div').fadeIn();
       $('#clone_product_information_div').show();

       $('#clone_button_previous').show();
       $('#clone_button_save').show();
       $('#button_clone_page').show();
   }
   if ($(button)[0].id == 'clone_button_previous'){
       $(button).hide();

       $('#clone_page_header')[0].innerHTML = "Select a name and title";

       $('#clone_product_information_div').hide();
       $('#clone_page_information_div').fadeIn();
       $('#clone_page_information_div').show();

       $('#clone_button_next').show();
       $('#clone_button_save').hide();
       $('#button_clone_page').hide();
   }

}


function credit_card_processor_selection()
{
	var card = document.getElementById("credit_card_processor").value;
    if (card == 'stripe')
    {
    	$('#nmi_id').hide();
    	$('#bluesnap_id').hide();
    	$('#stripe_id').show();
    }
    else if(card == 'bluesnap'){
    	$('#nmi_id').hide();
    	$('#bluesnap_id').show();
    	$('#stripe_id').hide();
    }
    else
    {
    	$('#stripe_id').hide();
    	$('#bluesnap_id').hide();
    	$('#nmi_id').show();
    }
}


function trackify_selection()
{
	var trackify = document.getElementById("trackify_id").value;
    if (trackify == 'disable')
    {
    	$('#facebook_id').show();
    }

    else
    {
    	$('#facebook_id').hide();
    }
}

function add_buyer_to_recharge(shop_id , shopify_order_id , variant_id){
	mscConfirm("Add", "Are you sure you want to add this customer ?", function(){
		$(".loader").show();
		var data = 'shop_id='+shop_id;
		data+= '&shopify_order_id='+shopify_order_id;
		data+= '&variant_id='+variant_id;
		http_post_request( base+'/api_recharge/?process=add_buyer_to_recharge', data , 'added_buyer_to_recharge' );
    },
    function() {

    });
}

function dont_add_buyer_to_recharge (shop_id , shopify_order_id , variant_id){
	mscConfirm("Delete", "Are you sure you want to remove this customer ?", function(){
		$(".loader").show();
		var data = 'shop_id='+shop_id;
		data+= '&shopify_order_id='+shopify_order_id;
		data+= '&variant_id='+variant_id;
		http_post_request( base+'/api_recharge/?process=dont_add_buyer_to_recharge', data , 'dont_added_buyer_to_recharge' );
    },
    function() {

    });
}

function added_buyer_to_recharge(res){
	show_dashboard_msg("Successfully added to recharge." , 1);
	setTimeout(function(){
		window.location.href = base+'/orders_recharge';
	}, 1000);
}

function dont_added_buyer_to_recharge(res){
	show_dashboard_msg("Removed from recharge successfully." , 0);
	setTimeout(function(){
		window.location.href = base+'/orders_recharge';
	}, 1000);

}

function show_recharge_details_modal (order_id , cart_item_id, quantity){
	$('#recharge_details_modal').modal('show');
	var html = '' ;
	$( "#recharge_details_modal_body" ).append(html);
	var all_orders = $("#all_recharge_orders").val();
	all_orders = JSON.parse ( all_orders);
	var cart_items  ='';
	var cart ='';
	var shop_currency = $('#shop_currency').val();
	var product_information_html = '';
	var customer_information_html = '';

	html+= '<div style="width:100%;height:300px; overflow-y:auto;">';
	product_information_html+='<div id ="product_information" style="width:100%;min-height:150px; overflow:hidden;">';
	product_information_html+='<h4 style="font-weight:600; font-size:16px; border-bottom:1px solid #e5e5e5; padding-bottom: 5px;"> Product Information</h4>';

	customer_information_html+='<div id = "customer_information" style="width:100%; min-height:100px; margin-top:30px;">';
	customer_information_html+='<h4 style="font-weight:600; font-size:16px; border-bottom:1px solid #e5e5e5; padding-bottom: 5px;"> Customer Information </h4>';

	for ( var i =0 ; i <all_orders.length ; i++) {
		if ( all_orders[i].id == order_id ) {
			cart = all_orders[i].cart ;
			cart= JSON.parse(cart);
			cart_items = cart.items;
			for ( var j = 0 ; j<cart_items.length ; j++ ) {
				if ( cart_items[j].id == cart_item_id && cart_items[j].quantity == quantity) {

					product_information_html+='<div style="min-height:100px; width:100%; display:flex;">';
					product_information_html+='<div class="col-md-4 col-sm-4" style="margin:auto; width:50%;">';
					product_information_html+= '<img style="height:100px;margin:0 auto;" class="img-responsive" src = '+cart_items[j].image+'></img>';
					product_information_html+='</div>';
					product_information_html+='<div class="col-md-8 col-sm-8">';
					product_information_html+= '<h5>'+cart_items[j].product_title+'</h5>';
					product_information_html+= '<h5> Price: '+(cart_items[j].original_price/100).toFixed(2)+' '+ shop_currency +'</h5>';
					if(cart_items[j].variant_title == null){
						product_information_html+= '<h5> Variant: Default</h5>';
					}
					else
					{
						product_information_html+= '<h5> Variant: '+cart_items[j].variant_title+'</h5>';
					}
					product_information_html+= '<h5> Quantity: '+cart_items[j].quantity+'</h5>';
					product_information_html+= '<h5> Ordered at: '+all_orders[0].last_modified+'</h5>';
					product_information_html+='</div>';
					product_information_html+='</div>';
					break;
				}
			}
			break;
		}
	}
	if(cart.billing_details.same_as_shipping == 'true'){
		customer_information_html += '<h4 style="font-weight:400;font-size:15px;">Shipping and billing information</h4>';
		customer_information_html+='<div class="col-md-6 col-sm-6">';
		customer_information_html += '<h5>'+cart.shipping_details.first_name+' '+cart.shipping_details.last_name+'</h5>';
		customer_information_html += '<h5>'+cart.shipping_details.address+'</h5>';
		customer_information_html += '<h5>'+cart.shipping_details.city+' '+cart.shipping_details.province +' '+ cart.shipping_details.postal_code +'</h5>';
		customer_information_html += '<h5>'+cart.shipping_details.country+'</h5>';
		customer_information_html+='</div>';

	}
	else{
		customer_information_html+='<div class="col-md-6 col-sm-6">';
		customer_information_html += '<h4 style="font-weight:400;font-size:15px;">Shipping information</h4>';
		customer_information_html += '<h5>'+cart.shipping_details.first_name+' '+cart.shipping_details.last_name+'</h5>';
		customer_information_html += '<h5>'+cart.shipping_details.address+'</h5>';
		customer_information_html += '<h5>'+cart.shipping_details.city+' '+cart.shipping_details.province +' '+ cart.shipping_details.postal_code +'</h5>';
		customer_information_html += '<h5>'+cart.shipping_details.country+'</h5>';
		customer_information_html+='</div>';
		customer_information_html+='<div class="col-md-6 col-sm-6">';
		customer_information_html += '<h4 style="font-weight:400;font-size:15px;">Billing information</h4>';
		customer_information_html += '<h5>'+cart.billing_details.first_name+' '+cart.billing_details.last_name+'</h5>';
		customer_information_html += '<h5>'+cart.billing_details.address+'</h5>';
		customer_information_html += '<h5>'+cart.billing_details.city+' '+cart.billing_details.province +' '+ cart.billing_details.postal_code +'</h5>';
		customer_information_html += '<h5>'+cart.billing_details.country+'</h5>';
		customer_information_html+='</div>';
	}

	product_information_html+='</div>';
	customer_information_html+='</div>';
	html+= product_information_html;
	html+= customer_information_html;
	html+='</div>';
	$( "#recharge_details_modal_body" )[0].innerHTML = '';
	$( "#recharge_details_modal_body" ).append(html);
}

function check_for_landing_page_broken_product_array(){
    if($("#landing_page_product_array")[0].value != ''){
        try {
            var landing_page_product_array = JSON.parse($("#landing_page_product_array")[0].value);
        } catch (e) {
            $("#landing_page_product_array")[0].value = '';
        }
    }
}

function update_feedback_status(){
	var rating = $('#hidden_rating').val();
	var shop_id = $('#shop_id').val();
	var feedback_text = $('#feedback_text')[0].value;
	feedback_text = encodeURIComponent(feedback_text);
	data = {'rating':rating,'feedback_text':feedback_text, 'shop_id':shop_id};
	$.ajax({
	    url : base+'/feedback/?process=save_feedback',
	    data: data,
	    type : 'POST',
	    success : function(res) {  
	    console.log(res);            
	        window.location.href = base+'/feedback';
	    }
	});
}