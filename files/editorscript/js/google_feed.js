var googleFeedArr = new Array();
function google_taxonomy_chosen( key, level, id, category ) {
	
	document.getElementById( id ).value = key;
	if( parseInt( level ) <= 7 ) http_get_request( base + '/editor/?process=google_sub_categories&key=' + key + '&level=' + level + '&id=' + id, 'google_taxonomy_loaded', { level : level, id : id } );
}

function google_taxonomy_loaded( response, params ) {
	if( response.trim() != '' ) document.getElementById( params.id + '_submenu_' + params.level ).innerHTML = response;
	else document.getElementById( params.id + '_submenu_' + params.level ).innerHTML = '';
	for( var j = parseInt( params.level ) + 1; j <= 9; j++ ) {
		document.getElementById( params.id + '_submenu_' + j ).innerHTML = '';
	}
}

function googleFeedChange(e){
	var res = (e.value).split("_");
	google_taxonomy_chosen(res[0],res[1],res[2]+'_'+res[3],res[4]);
	$("#google_feed_category")[0].value = res[0];
	
	if(googleFeedArr.length > res[1]){
		googleFeedArr.splice(res[1],googleFeedArr.length);
	}
	if(res[1] == 1){
		googleFeedArr = [];
		googleFeedArr[0] = res[4];
	}else if(res[1] == 2){
		googleFeedArr[1] = res[4];
	}else if(res[1] == 3){
		googleFeedArr[2] = res[4];
	}else if(res[1] == 4){
		googleFeedArr[3] = res[4];
	}else if(res[1] == 5){
		googleFeedArr[4] = res[4];
	}else if(res[1] == 6){
		googleFeedArr[5] = res[4];
	}else if(res[1] == 7){
		googleFeedArr[6] = res[4];
	}else if(res[1] == 8){
		googleFeedArr[7] = res[4];
	}else if(res[1] == 9){
		googleFeedArr[8] = res[4];
	}else if(res[1] == 10){
		googleFeedArr[9] = res[4];
	}
	$("#google_feed_category_key")[0].value = googleFeedArr.join(" > ");
	$("#google_product_cat_name_p")[0].innerHTML = googleFeedArr.join(" > ");


	console.log($("#google_feed_category")[0].value);
	console.log($("#google_product_cat_name_p")[0].innerHTML);
	
}


function showEditoption(e){
	$(e).hide();
	$("#google_cat_sel_div").show();
}
