$(document).ready( function (){
	if ( document.getElementById('funnel_array') != '' ) {
		check_for_landing_page_broken_product_array();
		deleted_page_funnel_settings();
		regenerate_page_list();
		generate_final_tree();
		one_upsell_menu_display_show_hide();
	}
});

function deleted_page_funnel_settings () {
	var funnel_array= document.getElementById('funnel_array').value;
	funnel_array=JSON.parse(funnel_array);

	var all_pages_array= document.getElementById('all_pages_array').value;
	all_pages_array=JSON.parse(all_pages_array);

	var page_found = false ;

	if (all_pages_array == '') {
		for ( var k = 0 ; k<funnel_array.length ; k++ ) {
			if (funnel_array[k].type != 'thank_you'){
				if (funnel_array[k].type == 'checkout') {
					funnel_array[k].pages="";
				}
				else {
					for(var j=0;j<funnel_array[k].pages.length;j++ ){
						funnel_array[k].pages.splice( j , funnel_array[k].pages.length);
						break;
					}
				}
			}

		}
	}
	else {
		for ( var k = 0 ; k<funnel_array.length ; k++ ) {
			if ( funnel_array[k].type != 'thank_you'){
				if (funnel_array[k].type == 'checkout' ){
					for ( var i = 0 ; i < all_pages_array.length; i++  ){
						if(funnel_array[k].pages == all_pages_array[i]['id'] ){
							page_found = true ;
							break;
						}else {
							page_found= false;
						}
					}
					if (page_found == false) {
						funnel_array[k].pages = "";
					}

				}
				else {
					for(var j=0;j<funnel_array[k].pages.length;j++ ){
						for ( var i = 0 ; i < all_pages_array.length; i++  ){
							if(funnel_array[k].pages[j].page_id == all_pages_array[i]['id'] ){
								page_found = true ;
								break;
							}else {
								page_found= false;
							}
						}
						if (page_found == false) {
							funnel_array[k].pages.splice(j, 1);
							j = j-1;
						}

					}

				}

			}

		}

	}

	document.getElementById('funnel_array').value = JSON.stringify (funnel_array);
}

function add_more_page(){
	var all_pages_array= document.getElementById('all_pages_array').value;
	all_pages_array=JSON.parse(all_pages_array);
	if ( $('#no-page-added')[0] !=null )  $('#page_list')[0].innerHTML="";
	if (all_pages_array=='') {
		if ( $('#create-some-page')!= null ) $('#create-some-page').remove();
		var  dynamic_div='';
			dynamic_div += '<tr id ="create-some-page" style="    background-color: #e6e9ed;color: #73879c;font-size: 14px;display: table-row;">';
				dynamic_div += '<td class="col-sm-6 col-md-6" style="text-align:left;">At first,create some page.</td>';
				dynamic_div += '<td class="col-sm-4 col-md-4"></td>';
				dynamic_div += '<td class="col-sm-2 col-md-2"></td>';
			dynamic_div += '<tr >';
		$ ('#page_list').append(dynamic_div);
	}
	else {
		if ( $('#create-some-page')!= null ) $('#create-some-page').remove();
		var dynamic_div = '';
			dynamic_div += '<tr>';
				dynamic_div += '<td class="col-sm-6 col-md-6 "  style="margin-top:5px;">';
					  dynamic_div += '<select class="form-control" onchange="update_funnel_array()">';
						for ( var i =0 ; i < all_pages_array.length;i++){
							dynamic_div += ' <option value="'+all_pages_array[i]['id']+'">'+all_pages_array[i]['name']+'</option>';
						}
					  dynamic_div += '</select>';
				 dynamic_div += '</td>';
				 dynamic_div += '<td class="col-sm-4 col-md-4 col-xs-6"  style="margin-top:5px;">';
					  dynamic_div += '<input type="text" class="form-control" id="usr"  oninput ="update_funnel_array()" placeholder="Percentage(%)">';
				  dynamic_div += '</td>';
				  dynamic_div += '<td class="col-sm-2 col-md-2 text-center" style="margin-top:5px;">';
					  dynamic_div += '<button type="button"  id ="btn_delete" class="btn btn-danger" onclick="delete_this_page(this);"><i class="fa fa-trash-o" aria-hidden="true"></i> </button>';
				  dynamic_div += '</td>';
			dynamic_div += '</tr>';
		$ ('#page_list').append(dynamic_div);
		show_default_percantage();
		update_funnel_array();
	}
	if ( $('#warning')!= null ) $('#warning').remove();
}

function delete_this_page(me){
	$(me).parent().parent().remove();
	if ($ ('#page_list')[0].children.length <1 ) {
	var  dynamic_div='';
			dynamic_div += '<tr id ="no-page-added" style="    background-color: #e6e9ed;color: #73879c;font-size: 14px;display: table-row;">';
				dynamic_div += '<td class="col-sm-6 col-md-6" style="text-align:left;">No page/pages added.</td>';
				dynamic_div += '<td class="col-sm-4 col-md-4"></td>';
				dynamic_div += '<td class="col-sm-2 col-md-2"></td>';
			dynamic_div += '<tr >';
		$ ('#page_list').append(dynamic_div);
	}
	show_default_percantage();
	update_funnel_array();
}

function update_funnel_array(){
	var initial_array = '{"type":"","pages":[],"child":{"left":"","right":""},"parent":""}';
	initial_array=JSON.parse(initial_array);
	var funnel_array= document.getElementById('funnel_array').value;
	funnel_array=JSON.parse(funnel_array);
	var parent_index = document.getElementById('parent_index').value;
	var current_index = document.getElementById('current_index').value;
	var decision_type = document.getElementById('decision_type').value;
	var page_list_selected_pages = $("#page_list :input");
	var pages=[];
	for (var i=0 ; i<page_list_selected_pages.length;i++){
		var temp={};
		temp['page_id'] = $(page_list_selected_pages[i])[0].value;
		temp['percent'] = $(page_list_selected_pages[++i])[0].value;
		pages.push(temp);
		++i;
	}
	funnel_array[current_index]['pages'] = pages;
	document.getElementById('funnel_array').value = JSON.stringify(funnel_array) ;
	generate_final_tree();
}

function create_upsell(){
	$('#div_funnel_thankyou_save').hide();
	$("#div_next_action").hide();
	$("#div_first_action").hide();
    $("#div_sell_settings_products").hide();
	$("#btn_funnel_next_action").show();
	var initial_array = '{"type":"","pages":[],"child":{"left":"","right":""},"parent":""}';
	initial_array=JSON.parse(initial_array);
	var funnel_array= document.getElementById('funnel_array').value;
	funnel_array=JSON.parse(funnel_array);
	var parent_index = document.getElementById('parent_index').value;
	var current_index = document.getElementById('current_index').value;


	parent_index= current_index;
	var if_selected_page = check_if_any_page_selected(parent_index);

	if (if_selected_page==''){
		if ( $('#warning')!= null ) $('#warning').remove();
		var span  = '<div id ="warning" style="color:red; font-size:14px;    text-align: left;" class="col-sm-12"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Please select at least one page. </div>'
		$(span).insertAfter ('#add_more_page_div');
	}
	if (if_selected_page != '' || funnel_array[current_index].type=='checkout' || check_if_product_in_funnel()==true) {
		if ( $('#warning')!= null ) $('#warning').remove();
		document.getElementById('decision_type').value = 'UP';
		var decision_type = document.getElementById('decision_type').value;
		document.getElementById('parent_index').value = parent_index;
		if ( funnel_array[current_index].child.left != '' ){
			current_index= funnel_array[current_index].child.left;
			document.getElementById('current_index').value = current_index;
		}
		else {
			current_index= funnel_array.length;
			funnel_array[current_index]= initial_array ;
			funnel_array[parent_index].child.left = current_index;
			document.getElementById('current_index').value = current_index;
		}
		funnel_array[current_index].type=decision_type;
		funnel_array[current_index].parent=parent_index;
		document.getElementById('funnel_array').value = JSON.stringify(funnel_array) ;
		regenerate_page_list();
		change_step_nav_message("UP",'add',current_index);
		show_wow_animation($("#funnel_builder_container_div"),"wow bounceInDown");
   	}
   	generate_final_tree();
}

function create_downsell(){
	$('#div_funnel_thankyou_save').hide();
	$("#div_next_action").hide();
	$("#btn_funnel_next_action").show();
	var initial_array = '{"type":"","pages":[],"child":{"left":"","right":""},"parent":""}';
	initial_array=JSON.parse(initial_array);
	var funnel_array= document.getElementById('funnel_array').value;
	funnel_array=JSON.parse(funnel_array);
	var parent_index = document.getElementById('parent_index').value;
	var current_index = document.getElementById('current_index').value;
	parent_index= current_index;

	var funnel_checkout_conf= document.getElementById('funnel_checkout_conf').value;
	funnel_checkout_conf=JSON.parse(funnel_checkout_conf);
	var if_selected_page = check_if_any_page_selected(parent_index);

	if (if_selected_page==''  && funnel_checkout_conf.checkout_index != current_index ){
		if ( $('#warning')!= null ) $('#warning').remove();
		var span  = '<div id ="warning" style="color:red; font-size:14px;    text-align: left;" class="col-sm-12"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Please select at least one page. </div>'
		$(span).insertAfter ('#add_more_page_div');
	}
	else {
		if ( $('#warning')!= null ) $('#warning').remove();
		document.getElementById('decision_type').value = 'DP';
		var decision_type = document.getElementById('decision_type').value;
		document.getElementById('parent_index').value = parent_index;
		if ( funnel_array[current_index].child.right != '' ){
			current_index= funnel_array[current_index].child.right;
			document.getElementById('current_index').value = current_index;
		}
		else {
			current_index= funnel_array.length;
			funnel_array[current_index]= initial_array ;
			funnel_array[parent_index].child.right = current_index;
			document.getElementById('current_index').value = current_index;
		}
		funnel_array[current_index].type=decision_type;
		funnel_array[current_index].parent=parent_index;
		document.getElementById('funnel_array').value = JSON.stringify(funnel_array) ;
		regenerate_page_list();
		change_step_nav_message("DP",'add',current_index);
		show_wow_animation($("#funnel_builder_container_div"),"wow bounceInDown");
	}
	generate_final_tree();
}

function create_thankyou(){
	$('#div_funnel_thankyou_save').show();
}

function funnel_thankyou_save (funnel_id) {
	add_meta_funnel(funnel_id);
}


// function create_thankyou(){
// 	var funnel_array= document.getElementById('funnel_array').value;
// 	funnel_array=JSON.parse(funnel_array);
// 	var parent_index = document.getElementById('parent_index').value;
// 	var current_index = document.getElementById('current_index').value;
// 	parent_index= current_index;

// 	var funnel_checkout_conf= document.getElementById('funnel_checkout_conf').value;
// 	funnel_checkout_conf=JSON.parse(funnel_checkout_conf);
// 	if(funnel_checkout_conf.thankyou_index == ""){
// 		var temp = {};
// 		temp['type'] = "thank_you";
// 		temp['pages'] = [];

// 		var child = {};
// 		child['left'] = '';
// 		child['right'] = '';
// 		temp['child'] = child;
// 		funnel_array.push(temp);
// 		funnel_checkout_conf.thankyou_index = funnel_array.length -1;
// 	}else{
// 		funnel_array[funnel_checkout_conf.thankyou_index].parent = current_index;
// 	}
// 	funnel_checkout_conf.thankyou_selected_indexes.push(current_index);
// 	document.getElementById('funnel_array').value = JSON.stringify(funnel_array) ;
// 	document.getElementById('funnel_checkout_conf').value = JSON.stringify(funnel_checkout_conf) ;
// }

function create_checkout(){
	$("#div_next_action").hide();
	$("#btn_funnel_next_action").show();
	$("#div_sell_settings").hide();
	$("#div_checkout_settings").show();

	var funnel_array= document.getElementById('funnel_array').value;
	funnel_array=JSON.parse(funnel_array);

	var parent_index = document.getElementById('parent_index').value;
	var current_index = document.getElementById('current_index').value;

	document.getElementById('decision_type').value = 'checkout';
	var decision_type = document.getElementById('decision_type').value;

	var funnel_checkout_conf= document.getElementById('funnel_checkout_conf').value;
	funnel_checkout_conf=JSON.parse(funnel_checkout_conf);

	var this_have_checkout_parent = false;
	    while ( funnel_array[current_index].parent != '' ) {
			if (   funnel_array[current_index].parent == funnel_checkout_conf.checkout_index) {
				this_have_checkout_parent = true;
				break;
			}
			current_index = funnel_array[current_index].parent;
	}

	if(funnel_checkout_conf.checkout_index == ""){
		var temp = {};
		temp['type'] = "checkout";
		temp['checkout_type'] = "built-in";
		temp['parent'] = funnel_checkout_conf.checkout_selected_indexes[funnel_checkout_conf.checkout_selected_indexes.length-1];

		var child = {};
		child['left'] = '';
		child['right'] = '';
		temp['child'] = child;
		funnel_array.push(temp);
		funnel_checkout_conf.checkout_index = funnel_array.length -1;
		document.getElementById('current_index').value =  funnel_array.length -1;
	}
	if (funnel_checkout_conf.checkout_index != "" && funnel_checkout_conf.checkout_index != current_index && this_have_checkout_parent == false ) {
		document.getElementById('current_index').value =  funnel_checkout_conf.checkout_index;
		funnel_array[funnel_checkout_conf.checkout_index].parent = current_index;
	    document.getElementById('parent_index').value =current_index;
		create_thankyou();
		change_step_nav_message("CO",'add', current_index);
	}
	if ( this_have_checkout_parent == true ) {
		funnel_checkout_conf.checkout_selected_indexes.push(current_index);
		document.getElementById('parent_index').value =funnel_array[funnel_checkout_conf.checkout_index].parent;
		document.getElementById('current_index').value =  funnel_checkout_conf.checkout_index;
		change_step_nav_message("CO",'add', document.getElementById('current_index').value);

	}

		set_checkout_select_option();
		show_wow_animation($("#funnel_builder_container_div"),"wow bounceInDown");
		document.getElementById('funnel_array').value = JSON.stringify(funnel_array) ;
		document.getElementById('funnel_checkout_conf').value = JSON.stringify(funnel_checkout_conf) ;
		$("#btn_back").show();
		$("#div_funnel_thankyou_save").hide();
		if ( $("#checkout_type")[0].value == 'custom'){
			$("#btn_funnel_next_action").show();
			if (document.getElementById("custom_checkout_page_select_inner_div") == null) custom_checkout_page_select_option('insert');
		}
		else {
			$("#btn_funnel_next_action").hide();
			custom_checkout_page_select_option('remove');
		}

}

function back_to_parent(){

	var funnel_array= document.getElementById('funnel_array').value;
	funnel_array=JSON.parse(funnel_array);
	var parent_index = document.getElementById('parent_index').value;
	var current_index = document.getElementById('current_index').value;
	if(parent_index  == '' || parent_index== 'null' ){
		parent_index = 0;
	}

	if ( check_if_any_page_selected(current_index) == '' ) {
		if (funnel_array[parent_index].child.left == current_index) funnel_array[parent_index].child.left ='';
		if (funnel_array[parent_index].child.right == current_index) funnel_array[parent_index].child.right ='';
	}

	current_index = parent_index ;

	if(funnel_array[parent_index].parent == '' && funnel_array[parent_index].type != 'checkout' ){
		document.getElementById('current_index').value = 0;
		current_index = 0;
		document.getElementById('parent_index').value = "null";
		parent_index = '';
		document.getElementById('decision_type').value = funnel_array[current_index].type;
	}else{
		document.getElementById('current_index').value = parent_index;
		current_index = parent_index;
		document.getElementById('parent_index').value = funnel_array[current_index].parent;
		parent_index = funnel_array[current_index].parent;
		document.getElementById('decision_type').value = funnel_array[current_index].type;
	}

	if(funnel_array[current_index].type != 'checkout'){
		regenerate_page_list();
		show_wow_animation($("#funnel_builder_container_div"),"wow bounceInUp");
	}else{
		$("#div_sell_settings").hide();
		$("#div_checkout_settings").show();
		set_checkout_select_option();
		show_wow_animation($("#funnel_builder_container_div"),"wow bounceInUp");
	}
	show_wow_animation($("#funnel_builder_container_div"),"wow bounceInUp");
	change_step_nav_message("",'remove',current_index);
	if ( $('#warning')!= null ) $('#warning').remove();


	if(current_index == 0){
		$("#btn_funnel_next_action").show();
	}
	if (funnel_array[current_index].type=='UP' || funnel_array[current_index].type=='DP'){
		$("#btn_funnel_next_action").show();
	}
	if (funnel_array[current_index].type=='checkout'){
		$("#btn_back").show();
		if ( $("#checkout_type")[0].value == 'custom'){
			$("#btn_funnel_next_action").show();
			if (document.getElementById("custom_checkout_page_select_inner_div") == null) custom_checkout_page_select_option('insert');
		}
		else {
			$("#btn_funnel_next_action").hide();
			custom_checkout_page_select_option('remove');
		}
	}
	$("#div_next_action").hide();
	$('#div_funnel_thankyou_save').hide();
	document.getElementById('funnel_array').value = JSON.stringify(funnel_array);
	generate_final_tree();
}

function change_step_nav_message(message,add_or_remove,current_index){
	if (add_or_remove=='add'){
		var title;
		if(message == 'DP'){
			title = 'Downsell';
		}
		if(message == 'UP'){
			title = 'Upsell';
		}
		if(message == 'LM'){
			title= 'Landing';
		}
		if(message == 'CO'){
			title= 'Checkout';
		}
	}
	var funnel_array= document.getElementById('funnel_array').value;
	funnel_array=JSON.parse(funnel_array);
	var current_index = document.getElementById('current_index').value;

	if(funnel_array[current_index].type == 'DP'){
		$('#step_decison_message')[0].innerHTML = 'Select your downsell pages.';
	}
	if(funnel_array[current_index].type == 'UP'){
		$('#step_decison_message')[0].innerHTML = 'Select your upsell pages.';
	}
	if(funnel_array[current_index].type == 'LM'){
		$('#step_decison_message')[0].innerHTML = 'Select your landing pages.';
	}
	if(funnel_array[current_index].type == 'checkout'){
		$('#step_decison_message')[0].innerHTML = 'Customize your checkout settings.';
	}
	if(funnel_array[current_index].type == 'thank_you'){
		$('#step_decison_message')[0].innerHTML = 'Customize your thank you pages.';
	}
}


function regenerate_page_list(){
	$("#div_sell_settings").show();
	$("#div_checkout_settings").hide();
	var funnel_array= document.getElementById('funnel_array').value;
	funnel_array=JSON.parse(funnel_array);

	var parent_index = document.getElementById('parent_index').value;
	var current_index = document.getElementById('current_index').value;

	var all_pages_array= document.getElementById('all_pages_array').value;
	all_pages_array=JSON.parse(all_pages_array);


	var dynamic_div = '';
	if (  funnel_array[current_index].pages.length == 0 )  {
			dynamic_div += '<tr id ="no-page-added" style="    background-color: #e6e9ed;color: #73879c;font-size: 14px;display: table-row;">';
				dynamic_div += '<td class="col-sm-6 col-md-6" style="text-align:left;">No page/pages added.</td>';
				dynamic_div += '<td class="col-sm-4 col-md-4"></td>';
				dynamic_div += '<td class="col-sm-2 col-md-2"></td>';
			dynamic_div += '<tr >';

	}
	else {
		for(var j=0;j<funnel_array[current_index].pages.length;j++){
					dynamic_div += '<tr>';
						dynamic_div += '<td class="col-sm-6 col-md-6"  >';
							  dynamic_div += '<select class="form-control" onchange="update_funnel_array()"> ';
								for ( var i =0 ; i < all_pages_array.length;i++){
									if(all_pages_array[i]['id'] == funnel_array[current_index].pages[j].page_id){
										dynamic_div += ' <option value="'+all_pages_array[i]['id']+'" selected>'+all_pages_array[i]['name']+'</option>';
									}else{
										dynamic_div += ' <option value="'+all_pages_array[i]['id']+'">'+all_pages_array[i]['name']+'</option>';
									}
								  }
							  dynamic_div += '</select>';
						 dynamic_div += '</td>';
						 dynamic_div += '<td class="col-sm-4 col-md-4">';
							  dynamic_div += '<input type="text" class="form-control" id="usr" oninput ="update_funnel_array()" value="'+funnel_array[current_index].pages[j].percent+'" placeholder="Percentage(%)">';
						  dynamic_div += '</td>';
						  dynamic_div += '<td class="col-sm-2 col-md-2 text-center" >';
							  dynamic_div += '<button type="button"  id ="btn_delete" class="btn btn-danger" onclick="delete_this_page(this);"><i class="fa fa-trash-o" aria-hidden="true"></i> </button>';
						  dynamic_div += '</td>';
					dynamic_div += '</tr>';
		}
	}

	$ ('#page_list')[0].innerHTML = "";
	$ ('#page_list').append(dynamic_div);


	if(current_index == 0){
		$("#btn_back").hide();
	}
	$('#div_funnel_thankyou_save').hide();
}

function update_checkout(me){
	if (me != undefined) var me_id = $(me)[0].id;
	var funnel_array= document.getElementById('funnel_array').value;
	funnel_array=JSON.parse(funnel_array);
	var parent_index = document.getElementById('parent_index').value;
	var current_index = document.getElementById('current_index').value;
	funnel_array[current_index].checkout_type = $("#checkout_type")[0].value;


	if (me_id == 'custom_checkout_page' ){
		if (document.getElementById("custom_checkout_page") != null ) funnel_array[current_index].pages = $("#custom_checkout_page")[0].value;
	}

	else {
		if ( $("#checkout_type")[0].value == 'custom'){
			$("#btn_funnel_next_action").show();
			if (document.getElementById("custom_checkout_page_select_inner_div") == null) custom_checkout_page_select_option('insert');
		}
		else {
			$("#btn_funnel_next_action").hide();
			custom_checkout_page_select_option('remove');
			funnel_array[current_index].pages = '';
			funnel_array[current_index].child.left = '';
			funnel_array[current_index].child.right = '';
		}

	}

	document.getElementById('funnel_array').value = JSON.stringify(funnel_array) ;
	generate_final_tree();

}

function set_checkout_select_option(){
	var funnel_array= document.getElementById('funnel_array').value;
	funnel_array=JSON.parse(funnel_array);

	var all_pages_array= document.getElementById('all_pages_array').value;
	all_pages_array=JSON.parse(all_pages_array);


	var current_index = document.getElementById('current_index').value;

	$("#checkout_type").val(funnel_array[current_index].checkout_type);


	//$("#custom_checkout_page").val(funnel_array[current_index].pages[0]);
}

function smart_navigation(index, me){
	var funnel_array= document.getElementById('funnel_array').value;
	funnel_array=JSON.parse(funnel_array);
	var parent_index = index;
	if(parent_index  == ''){
		parent_index = 0;
	}
	var current_index = parent_index;
	if(funnel_array[parent_index].parent == ''){
		document.getElementById('current_index').value = 0;
		current_index = 0;
		document.getElementById('parent_index').value = "";
		parent_index = '';
		document.getElementById('decision_type').value = funnel_array[current_index].type;
	}else{
		document.getElementById('current_index').value = parent_index
		current_index = parent_index;
		document.getElementById('parent_index').value = funnel_array[current_index].parent;
		parent_index = funnel_array[current_index].parent;
		document.getElementById('decision_type').value = funnel_array[current_index].type;
	}

	if(funnel_array[current_index].type != 'checkout'){
		regenerate_page_list();
	}else{
		set_checkout_select_option();
	}

	for (var k =0 ; k < $('.progress')[0].children.length;k++){
		if ($('.progress')[0].children[k] == $(me)[0]){
			var clicked_index= k;
		}
	}

	$(".progress").children().slice(clicked_index+1).remove();

	$(".progress").children().css("font-weight",'400');
	$(".progress").children().css("color",'#414659');
	$(me).css("font-weight",'900');
	$(me).css("color",'greenyellow');
	show_wow_animation($("#funnel_builder_container_div"),"wow bounceInDown");

}

function show_wow_animation(me,slide_type){
	$(me).removeClass('wow bounceInDown');
	$(me).removeClass('wow bounceInUp');
	$(me).removeClass('wow bounceInDown');
	$(me).removeClass('wow bounceInUp');
	$(me).removeClass('wow tada');
	$(me).removeClass('wow bounce');
	$(me).removeClass('animated');
	$(me).removeAttr('style');
	$(me).addClass(" "+slide_type);
	new WOW().init();
}

function show_default_percantage() {
	var page_list_selected_pages = $("#page_list :input");
	var max_percent = 100;
	var current_percent ='';
	var input_array = new Array();
	for (var i=0 ; i<page_list_selected_pages.length;i++){
			input_array.push ($(page_list_selected_pages[++i])[0]);
			++i;
	}
	current_percent = max_percent/input_array.length;
	current_percent = current_percent.toPrecision(4);
	for (var i=0 ; i<input_array.length;i++){
		 $($(input_array[i]))[0].value =current_percent + '%' ;
	}
}




function generate_funnel_settings (index) {
	var funnel_array= document.getElementById('funnel_array').value;
	funnel_array=JSON.parse(funnel_array);
	var parent =  funnel_array[index].parent;
	if (parent =='' ) {
		parent = 0;
	}

	var current_index = document.getElementById('current_index').value;
	var parent_index = document.getElementById('parent_index').value;

	document.getElementById('current_index').value = index;
	document.getElementById('parent_index').value = parent;
	document.getElementById('decision_type').value = funnel_array[index].type;
	if ( $('#warning')!= null ) $('#warning').remove();
	if ( check_if_any_page_selected(current_index) == ''  && current_index != '0') {
		if (funnel_array[parent_index].child.left == current_index) funnel_array[parent_index].child.left ='';
		if (funnel_array[parent_index].child.right == current_index) funnel_array[parent_index].child.right ='';
		document.getElementById('current_index').value = parent_index;
		document.getElementById('parent_index').value = funnel_array[parent_index].parent;
	}

	var current_index= document.getElementById('current_index').value;
	var parent_index = document.getElementById('parent_index').value;
	if(parent_index  == ''){
		parent_index = 0;
	}
	if(funnel_array[current_index].type == 'DP'){
	$('#step_decison_message')[0].innerHTML = 'Select your downsell pages.';
	}
	if(funnel_array[current_index].type == 'UP'){
	$('#step_decison_message')[0].innerHTML = 'Select your upsell pages.';
	}
	if(funnel_array[current_index].type == 'LM'){
		$('#step_decison_message')[0].innerHTML = 'Select your landing pages.';
	}
	if(funnel_array[current_index].type == 'checkout'){
		$('#step_decison_message')[0].innerHTML = 'Customize your checkout settings.';
	}
	if(funnel_array[current_index].type == 'thank_you'){
		$('#step_decison_message')[0].innerHTML = 'Customize your thank you pages.';
	}
	if(funnel_array[current_index].type != 'checkout'){
		regenerate_page_list();
		show_wow_animation($("#funnel_builder_container_div"),"wow bounceInUp");
	}else{
		$("#div_sell_settings").hide();
		$("#div_checkout_settings").show();
		set_checkout_select_option();
		show_wow_animation($("#funnel_builder_container_div"),"wow bounceInUp");
	}
	if(current_index == 0){
		$("#btn_back").hide();
		$("#btn_funnel_next_action").show();
	}
	else {
		$("#btn_back").show();
	}
	if (funnel_array[current_index].type=='UP' || funnel_array[current_index].type=='DP'){
		$("#btn_funnel_next_action").show();
	}
	if (funnel_array[current_index].type=='checkout'){
		$("#btn_back").show();
		$("#div_funnel_thankyou_save").hide();
		if ( $("#checkout_type")[0].value == 'custom'){
			$("#btn_funnel_next_action").show();
			if (document.getElementById("custom_checkout_page_select_inner_div") == null) custom_checkout_page_select_option('insert');
		}
		else {
			$("#btn_funnel_next_action").hide();
			custom_checkout_page_select_option('remove');
		}
	}
	$("#div_next_action").hide();
	if($("#one_upsell_status")[0].value == 'enable'){
		if ($("#decision_type").val()=='LM' && JSON.parse($("#funnel_array")[0].value)[0].pages.length == 0) {
			$("#div_first_action").show();
			$("#div_sell_settings").hide();

		}
		else{
			$("#div_first_action").hide();
		}
		$("#div_sell_settings_products").hide();
	}
	$('#div_funnel_thankyou_save').hide();
	document.getElementById('funnel_array').value = JSON.stringify(funnel_array);
	generate_final_tree();
}

function delete_this_index (current_index) {
	var funnel_array= document.getElementById('funnel_array').value;
	funnel_array=JSON.parse(funnel_array);
	var parent_index = funnel_array[current_index].parent;
	if ( funnel_array[current_index].type=='UP'){
		funnel_array[parent_index].child.left ='';
	}
	if (  funnel_array[current_index].type=='DP'){
		funnel_array[parent_index].child.right ='';
	}
	document.getElementById('funnel_array').value = JSON.stringify(funnel_array) ;
	generate_final_tree();
	generate_funnel_settings(parent_index);
}

function funnel_next_action() {
	var funnel_array= document.getElementById('funnel_array').value;
	funnel_array=JSON.parse(funnel_array);
	var parent_index = document.getElementById('parent_index').value;
	var current_index = document.getElementById('current_index').value;
	var if_selected_page = check_if_any_page_selected(current_index);
	var checkout_is_my_parent = check_checkout_is_my_parent(current_index);
	if (if_selected_page=='' && check_if_product_in_funnel()==false){
		if ( $('#warning')!= null ) $('#warning').remove();
		var span  = '<div id ="warning" style="color:red; font-size:14px;    text-align: left;" class="col-sm-12"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> Please select at least one page. </div>'
		$(span).insertAfter ('#add_more_page_div');
	}
	if (if_selected_page != '' || funnel_array[current_index].type == 'checkout' || check_if_product_in_funnel()==true) {
		$("#div_sell_settings_products").hide();
		$('#step_decison_message')[0].innerHTML = 'Choose your next action.';
		$("#div_sell_settings").hide();
		$("#div_checkout_settings").hide();
		$("#btn_funnel_next_action").hide();
		$("#div_next_action").show();
		show_wow_animation($("#div_next_action"),"wow bounceInDown");
		if (current_index== 0 ) {
			$("#div_next_action_upsell").show();
			$("#btn_back").show();
			$("#div_next_action_checkout").show();
			$("#div_next_action_downsell").hide();
			$("#div_next_action_thankyou").hide();
		}
		else if (funnel_array[current_index].type=='checkout' ) {
			$("#div_next_action_upsell").show();
			$("#div_next_action_thankyou").show();
			$("#div_next_action_downsell").hide();
			$("#div_next_action_checkout").hide();
		}
		else {
			$("#div_next_action_upsell").show();
			$("#div_next_action_checkout").show();
			$("#div_next_action_downsell").show();
			$("#div_next_action_thankyou").hide();
			$('#div_funnel_thankyou_save').hide();
			if (checkout_is_my_parent == 'found'){
				$("#div_next_action_checkout").hide();
				$("#div_next_action_thankyou").show();
			}
		}
	}
}

function check_checkout_is_my_parent (current_index){
	var funnel_array= document.getElementById('funnel_array').value;
	funnel_array=JSON.parse(funnel_array);

	var found= false;
	while (found == false  && current_index >0 ) {
		if ( funnel_array[current_index].type=='checkout') {
			found = true;
			return 'found';
		}
		current_index = funnel_array[current_index].parent;
	}
}

function check_if_any_page_selected (current_index) {
	var funnel_array= document.getElementById('funnel_array').value;
	funnel_array=JSON.parse(funnel_array);
	if ( funnel_array[current_index].pages == '' ){
		return '' ;
	}
	else return 'page_selected';
}

function custom_checkout_page_select_option ( insert_remove ){
	var all_pages_array= document.getElementById('all_pages_array').value;
	all_pages_array=JSON.parse(all_pages_array);
	var funnel_array= document.getElementById('funnel_array').value;
	funnel_array=JSON.parse(funnel_array);

	var parent_index = document.getElementById('parent_index').value;
	var current_index = document.getElementById('current_index').value;


	if (insert_remove=='insert') {

		var dynamic_div = '<div id="custom_checkout_page_select_inner_div"> ';
				dynamic_div += '<h4 class=""> Select a custom checkout page : </h4>';
				dynamic_div += '<select class="form-control" id="custom_checkout_page" onchange="update_checkout(this)">';
					dynamic_div += '<option value=""> Default </option>';
					for (var i=0 ;i<all_pages_array.length;i++){
						if (funnel_array[current_index].type=='checkout' &&  funnel_array[current_index].pages !='' && all_pages_array[i].id == funnel_array[current_index].pages ){
							dynamic_div += '<option selected value="'+all_pages_array[i].id+'"> '+all_pages_array[i].name+'  </option>';
						}
						else {
							dynamic_div += '<option value="'+all_pages_array[i].id+'"> '+all_pages_array[i].name+'  </option>';
						}
					}
				dynamic_div += '</select>';
			dynamic_div += '</div>';
		$('#custom_checkout_page_select').append(dynamic_div);
	}

	if (insert_remove=='remove') {
		if (document.getElementById("custom_checkout_page_select_inner_div") != null) $("#custom_checkout_page_select_inner_div").remove();
	}
}

function one_upsell_menu_display_show_hide(){
	if ($("#current_index").val() == 0 && JSON.parse($("#funnel_array")[0].value)[0].pages.length == 0) {
		if($("#one_upsell_status")[0].value == 'enable'){
			if(check_if_product_in_funnel() == true){
                $("#div_sell_settings_products").show();
                $("#div_first_action").hide();
                $("#div_sell_settings").hide();
            }
            else{
                $("#div_first_action").show();
                $("#div_sell_settings").hide();
                $("#div_sell_settings_products").hide();
            }
	    }
	}
}

function one_upsell_show_pages(){
	$("#div_sell_settings").show();
	$("#div_first_action").hide();
}

function one_upsell_show_products(){
	$("#div_sell_settings_products").show();
	$("#div_first_action").hide();
}

function ou_find_products(){
	$('#ou_search_result').empty();
    var title = $('#ou_product_search_text').val();
    var page = $('#page_number_for_ou_products').val();
    if (title != '') {
    	var loader = '<i class="product_spinner fa fa-spinner fa-spin" style="font-size:24px"></i>';
		$(".product_spinner" ).remove();
		$("#ou_search_result").append(loader);
    	var data ='';
    	http_post_request( base + '/default/?process=find_products&page='+page+'&title='+encodeURIComponent(title),data,'found_ou_products');
    }
}

function found_ou_products(res){
	var products = JSON.parse(res);
	var html = '';
	var html_for_creat_page = '';
	if (products.length == 0) {
		if (parseInt($('#page_number_for_ou_products').val()) == 1) {
			html = '<span id="warning_new_page_search" style="color:red; font-size:13px;display:table;margin-top: 0px;"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> No search result found. </span>';
			$("#ou_search_result").append(html);
		}
		else
		{
			$("#load_more" ).remove();
			//$("#search_ul").append('<a class="list-group-item" id="warning_new_page_search" style="color:red; font-size:13px;margin-top: 0px;"><i class="fa fa-exclamation-circle" aria-hidden="true"></i> No more product left.</a>');
		}
	}
	else if(products.length < 100){
		if (parseInt($('#page_number_for_ou_products').val()) == 1){
			html_for_creat_page = '<ul id="ou_search_ul"  style="height: 182px; overflow-y: auto; margin-bottom: 0px !important;" class="text-left list-group" class="text-left list-group">';
			for (i = 0; i < products.length; i++) {
				var id = products[i]['id'];
				var handle = products[i]['handle'];
				var title = products[i]['title'];
				title = title.replace(/\\/g, '');
				var title2 = title.replaceAll("'","\\&#39;");
				title2 = title2.replaceAll('"','&quot;');
			    html_for_creat_page += '<a class="list-group-item" style="cursor:pointer;" onclick="add_this_product_to_landing_page('+id+',\''+handle+'\',\''+title2+'\');">'+ title +'</a>';

			}
			html_for_creat_page += '</ul>';

			$("#ou_search_result").append(html_for_creat_page);
		}
		else{
			for (i = 0; i < products.length; i++) {
				var id = products[i]['id'];
				var handle = products[i]['handle'];
				var title = products[i]['title'];
				title = title.replace(/\\/g, '');
				var title2 = title.replaceAll("'","\\&#39;");
				title2 = title2.replaceAll('"','&quot;');
			    html_for_creat_page += '<a class="list-group-item" style="cursor:pointer;" onclick="add_this_product_to_landing_page('+id+',\''+handle+'\',\''+title2+'\');">'+ title +'</a>';
			}
			$("#load_more" ).remove();
			$("#ou_search_ul").append(html_for_creat_page);
		}
	}
	else
	{
		if (parseInt($('#page_number_for_ou_products').val()) == 1){
			html_for_creat_page = '<ul id="ou_search_ul"  style="height: 182px; overflow-y: auto; margin-bottom: 0px !important;" class="text-left list-group" class="text-left list-group">';
			for (i = 0; i < products.length; i++) {
				var id = products[i]['id'];
				var handle = products[i]['handle'];
				var title = products[i]['title'];
				title = title.replace(/\\/g, '');
				var title2 = title.replaceAll("'","\\&#39;");
				title2 = title2.replaceAll('"','&quot;');
			    html_for_creat_page += '<a class="list-group-item" style="cursor:pointer;" onclick="add_this_product_to_landing_page('+id+',\''+handle+'\',\''+title2+'\');">'+ title +'</a>';

			}
			html_for_creat_page += '<a class="list-group-item text-center"  id="load_more" style="background-color: #ccc;padding: 5px;" onclick="load_more_ou_products()"><span style="color:#337ab7;">Load more</span></a></ul>';
			$( "#load_more" ).remove();
			$("#ou_search_result").append(html_for_creat_page);
		}
		else{
			for (i = 0; i < products.length; i++) {
				var id = products[i]['id'];
				var handle = products[i]['handle'];
				var title = products[i]['title'];
				title = title.replace(/\\/g, '');
				var title2 = title.replaceAll("'","\\&#39;");
				title2 = title2.replaceAll('"','&quot;');
			    html_for_creat_page += '<a class="list-group-item" style="cursor:pointer;" onclick="add_this_product_to_landing_page('+id+',\''+handle+'\',\''+title2+'\');">'+ title +'</a>';

			}
			html_for_creat_page += '<a class="list-group-item text-center"  id="load_more" style="background-color: #ccc;padding: 5px;" onclick="load_more_ou_products()"><span style="color:#337ab7;">Load more</span></a>';
			$("#load_more" ).remove();
			$("#ou_search_ul").append(html_for_creat_page);
		}
	}
	$(".product_spinner" ).remove();
}

function load_more_ou_products(){
	var title = $('#ou_product_search_text').val();
    var page = $('#page_number_for_ou_products').val();
    page = parseInt(page);
    page = page + 1;
    $("#page_number_for_ou_products").val(page);
    if (title != '') {
		var loader = '<i class="product_spinner fa fa-spinner fa-spin" style="font-size:24px"></i>';
		$(".product_spinner" ).remove();
		$("#ou_search_result").append(loader);
    	var data ='';
    	http_post_request( base + '/default/?process=find_products&page='+page+'&title='+encodeURIComponent(title),data,'found_ou_products');
    }
}



function add_this_product_to_landing_page(product_id,handle,title){
	title = window.btoa(title);
	if (check_if_product_is_in_landing_page_product_array(product_id) == false) {
		if ($("#landing_page_product_array")[0].value == '') {
			var landing_page_product_array = [];
			var temp_array = {};
			temp_array.product_id = String(product_id);
			temp_array.product_name = String(title);
			temp_array.product_handle = handle;
			temp_array.funnel_handle = $("#url_handle").val();
			temp_array.funnel_id = String(window.location.pathname.split('/').pop());
			temp_array.left_hand = String(JSON.parse($("#funnel_array")[0].value)[0].child.left);
			landing_page_product_array.push(temp_array);
		}
		else{
			var temp_array = {};
			temp_array.product_id = String(product_id);
			temp_array.product_name = String(title);
			temp_array.product_handle = handle;
			temp_array.funnel_handle = $("#url_handle").val();
			temp_array.funnel_id = String(window.location.pathname.split('/').pop());
			temp_array.left_hand = String(JSON.parse($("#funnel_array")[0].value)[0].child.left);
			var landing_page_product_array = $("#landing_page_product_array")[0].value;
			landing_page_product_array = JSON.parse(landing_page_product_array);
			landing_page_product_array.push(temp_array);
		}
		$("#landing_page_product_array")[0].value = JSON.stringify(landing_page_product_array);
		var product_td = '<tr id="tr_'+product_id+'"><td class="col-sm-8 col-md-8">'+window.atob(title)+'</td><td class="col-sm-4 col-md-4 text-center"><button type="button" id="btn_delete" class="btn btn-danger" onclick="delete_this_ou_product('+product_id+');"><i class="fa fa-trash-o" aria-hidden="true"></i> </button></td></tr>';
		$("#product_list").append(product_td);

	}
	else if(check_if_product_is_in_landing_page_product_array(product_id) == true){
		$(".msc-confirm").show();
	}
	$('#ou_product_search_text').val("");
	$('#ou_search_result').empty();
	generate_final_tree();
}

function add_this_tag_to_tag_array(){
	var flag = 0;
	if ($("#landing_page_tag_array")[0].value == '') {
		var landing_page_tag_array = [];
		var temp_array = {};
		var tag_name = $('#shopify_tag_name').val();
		var tag_name = btoa(tag_name);
		temp_array.tag_name = tag_name;
		temp_array.funnel_handle = $("#url_handle").val();
		temp_array.funnel_id = String(window.location.pathname.split('/').pop());
		temp_array.left_hand = String(JSON.parse($("#funnel_array")[0].value)[0].child.left);
		landing_page_tag_array.push(temp_array);
	}
	else{
		try {
			var temp_array = {};
			var tag_name = $('#shopify_tag_name').val();
			var tag_name = btoa(tag_name);
			temp_array.tag_name = tag_name;
			temp_array.funnel_handle = $("#url_handle").val();
			temp_array.funnel_id = String(window.location.pathname.split('/').pop());
			temp_array.left_hand = String(JSON.parse($("#funnel_array")[0].value)[0].child.left);
			var landing_page_tag_array = $("#landing_page_tag_array")[0].value;
			landing_page_tag_array = JSON.parse(landing_page_tag_array);
			for (var i = 0; i < landing_page_tag_array.length; i++) {
				if (landing_page_tag_array[i]['funnel_id'] == temp_array.funnel_id) {
					landing_page_tag_array[i] = temp_array;
					flag = 1;
				}
			}
			if (flag == 0) {
				landing_page_tag_array.push(temp_array);
			}
		} catch (e) {
			$("#landing_page_tag_array")[0].value = '';
			var landing_page_tag_array = [];
			var temp_array = {};
			var tag_name = $('#shopify_tag_name').val();
			var tag_name = btoa(tag_name);
			temp_array.tag_name = tag_name;
			temp_array.funnel_handle = $("#url_handle").val();
			temp_array.funnel_id = String(window.location.pathname.split('/').pop());
			temp_array.left_hand = String(JSON.parse($("#funnel_array")[0].value)[0].child.left);
			landing_page_tag_array.push(temp_array);
		}
	}
	$("#landing_page_tag_array")[0].value = JSON.stringify(landing_page_tag_array);
}

function check_if_product_is_in_landing_page_product_array(product_id){
	var landing_page_product_array = $("#landing_page_product_array")[0].value;
	if (landing_page_product_array == '') {
		return false;
	}
	else{
		landing_page_product_array = JSON.parse(landing_page_product_array);
		for (var i = 0; i < landing_page_product_array.length; i++) {
			if (landing_page_product_array[i]['product_id'] == product_id) {
				return true;
			}
		}
	}
	return false;
}

function check_if_tag_is_in_landing_page_tag_array(){
	var tag_name = $('#shopify_tag_name').val();
	if (tag_name == '') {
		return false;
	}
	var tag_name = btoa(tag_name);
	var landing_page_tag_array = $("#landing_page_tag_array")[0].value;
	if (landing_page_tag_array == '') {
		return false;
	}
	else{
		landing_page_tag_array = JSON.parse(landing_page_tag_array);
		for (var i = 0; i < landing_page_tag_array.length; i++) {
			if (landing_page_tag_array[i]['tag_name'] == tag_name) {
				if(String(window.location.pathname.split('/').pop()) != landing_page_tag_array[i]['funnel_id']){
					return true;
				}
			}
		}
	}
	return false;
}

function hide_landing_page_product_warning(){
	$(".msc-confirm").hide();
}

function delete_this_ou_product(id){
	var landing_page_product_array = $("#landing_page_product_array")[0].value;
	landing_page_product_array = JSON.parse(landing_page_product_array);
	for (var i = 0; i < landing_page_product_array.length; i++) {
		if (landing_page_product_array[i].product_id == String(id)) {
			landing_page_product_array.splice(i, 1);
		}
	}
	$("#landing_page_product_array")[0].value = JSON.stringify(landing_page_product_array);
	$("#tr_"+id).remove();
	generate_final_tree();
}

function check_if_product_in_funnel(){
	var funnel_id = String(window.location.pathname.split('/').pop());
	var landing_page_product_array = $("#landing_page_product_array")[0].value;
	if (landing_page_product_array != '') {
		landing_page_product_array = JSON.parse(landing_page_product_array);
		for (var i = 0; i < landing_page_product_array.length; i++) {
			if (landing_page_product_array[i].funnel_id == funnel_id) {
				return true;
			}
		}
	}
	return false;
}

function change_left_hand_index_for_ou(){
	if($("#one_upsell_status")[0].value == 'enable'){
		var landing_page_product_array = $("#landing_page_product_array")[0].value;
		if (landing_page_product_array != '') {
			landing_page_product_array = JSON.parse(landing_page_product_array);
			var funnel_id = String(window.location.pathname.split('/').pop());
			for (var i = 0; i < landing_page_product_array.length; i++) {
				if (landing_page_product_array[i].funnel_id == funnel_id) {
					landing_page_product_array[i].left_hand = String(JSON.parse($("#funnel_array")[0].value)[0].child.left);
				}
			}
			$("#landing_page_product_array")[0].value = JSON.stringify(landing_page_product_array);
		}
	}
}
