var queue = [];
$( document ).ready(function() {
    if ( $("#funnel_array") != null ){
        var full_shop_url = $('#full_shop_url')[0].value;
        var shopify_proxy_prefix = $('#shopify_proxy_prefix')[0].value;
    }
});
function generate_final_tree () {
    if ( document.getElementById('all_pages_array') != null) var all_pages_array = document.getElementById('all_pages_array').value;
    all_pages_array = JSON.parse(all_pages_array);
    var latest_funnel_array = $("#funnel_array")[0].value;
    latest_funnel_array = JSON.parse(latest_funnel_array);
    
    var arr = latest_funnel_array;
    arr[1].parent='';
    queue.push(0);
    html_data ='<ul class="list-unstyled timeline" id="tree_ul"></ul>';
    $("#funnel_tree_main_div")[0].innerHTML = html_data;
    generate_tree_li(arr,queue,all_pages_array);
    queue.push(1);
    generate_tree_li(arr,queue,all_pages_array);
    queue.push(2);
    generate_tree_li(arr,queue,all_pages_array);
    if($("#one_upsell_status")[0].value == 'enable'){
        if ($("#decision_type").val()=='LM' && JSON.parse($("#funnel_array")[0].value)[0].pages.length == 0) {
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
    change_left_hand_index_for_ou();
}

function get_parent_for_breadcrumb(arr,index){
    var page_type = "";
    if(arr[index].type == "LM"){
          page_type = "Landing page_"+index+" ";
    }
    if(arr[index].type == "DP"){
        page_type = "Downsell page_"+index+" ";
    }
    if(arr[index].type == "UP"){
        page_type = "Upsell page_"+index+" ";
    }
    if(arr[index].type == "thank_you"){
        page_type = "Thank you page_"+index+" ";
    }
    if(arr[index].type == "checkout"){
        page_type = "Checkout page_"+index+" ";
    }
    var bc= new Array();
    bc.push(page_type) ;
    var v1 = arr[index].parent;
    while( v1 != ""){
        var page_type = "";
        if(arr[v1].type == "LM"){
            page_type = "Landing page_"+v1+" ";
        }
        if(arr[v1].type == "DP"){
            page_type = "Downsell page_"+v1+" ";
        }
        if(arr[v1].type == "UP"){
            page_type = "Upsell page_"+v1+" ";
        }
        if(arr[v1].type == "thank_you"){
            page_type = "Thank you page_"+v1+" ";
        }
        if(arr[v1].type == "checkout"){
            page_type = "Checkout page_"+v1+" ";
        }
        bc.push(page_type) ;
        if (arr[v1].parent != "" ) {
            v1 = arr[v1].parent;
        }
        else
            v1 = '';
    }
    return bc;
}

function generate_tree_li(arr,queue,all_pages_array){
    if (queue.length > 0) {
        var data ="";
        var index = queue.shift();
        var product_handle_array = $('#product_handle_array')[0].value;
        product_handle_array = JSON.parse (product_handle_array);
        var full_shop_url = $('#full_shop_url')[0].value;
        var shopify_proxy_prefix = $('#shopify_proxy_prefix')[0].value;
        var page_type = "";
        var color = "";
        if(arr[index].type == "LM"){
            page_type = "Landing page";
        }
        if(arr[index].type == "DP"){
            page_type = "Downsell page";
        }
        if(arr[index].type == "UP"){
            page_type = "Upsell page";
        }
        if(arr[index].type == "thank_you"){
            page_type = "Thank you page";
        }
        if(arr[index].type == "checkout"){
            page_type = "Checkout page";
        }
        if (index == 2) {
            data += '<li><div class="block" style="margin:0 0 0 135px;"><div class="tags" style="width:110px;"><a  href="javascript:void 0;" class="tag tag_thankyou"><span style="line-height: 1;    overflow: initial;">'+page_type+'</span></a></div><div class="block_content" style="color:#337ab7;" ><h2 class="title"><a></a></h2>Thank you page';
            data += '</div></div></li>';
        }
        else{
            data += '<li><div class="block" style="margin:0 0 0 135px;"><div class="tags" style="width:110px;">';
            if(arr[index].type == "LM"){
                data += '<a href="javascript:void 0;" class="tag">';
            }
            if(arr[index].type == "DP"){
                data += '<a href="javascript:void 0;" class="tag tag_downsell">';
            }
            if(arr[index].type == "UP"){
                data += '<a href="javascript:void 0;" class="tag tag_upsell">';
            }
            if(arr[index].type == "checkout"){
                data += '<a href="javascript:void 0;" class="tag tag_checkout">';
            }
            var breadcrumb = get_parent_for_breadcrumb(arr,index);
          
            var breadcrumb_html_data = "";
            for (var i = breadcrumb.length - 1; i >= 0; i--) {
                if (i==0) {
                    var this_index='';
                    var this_page_type='';
                    this_page_type = breadcrumb[i].split ("_")[0] ;
                    this_index = breadcrumb[i].split ("_")[1] ;
                    if ( arr[parseInt(this_index)].type == 'LM'){
                        color='#1ABB9C' ;
                    }
                    if ( arr[parseInt(this_index)].type == 'UP'){
                        color='#39ad4a' ;
                    }
                    if ( arr[parseInt(this_index)].type == 'DP'){
                        color='#de7c3e' ;
                    }
                    if ( arr[parseInt(this_index)].type == 'checkout'){
                        color='#ba3ede' ;
                    }
                    breadcrumb_html_data += '<span style="cursor:pointer;color:'+color+'" onclick="generate_funnel_settings('+this_index+')">'+ this_page_type+'</span>';
                }
                else{
                    var this_index='';
                    var this_page_type='';
                    this_page_type = breadcrumb[i].split ("_")[0] ;
                    this_index = breadcrumb[i].split ("_")[1] ;
                    if ( arr[parseInt(this_index)].type == 'LM'){
                        color='#1ABB9C' ;
                    }
                    if ( arr[parseInt(this_index)].type == 'UP'){
                        color='#39ad4a' ;
                    }
                    if ( arr[parseInt(this_index)].type == 'DP'){
                        color='#de7c3e' ;
                    }
                    if ( arr[parseInt(this_index)].type == 'checkout'){
                        color='#ba3ede' ;
                    }
                    breadcrumb_html_data +='<span style="cursor:pointer;color:'+color+'"  onclick="generate_funnel_settings('+this_index+')">'+ this_page_type+'</span>' + '&nbsp❯&nbsp';
                }
            }
            data += '<span  onclick="generate_funnel_settings('+index+')" style="overflow: initial;"><span style="line-height: 1;    overflow: initial;">'+page_type+'</span></span></a></div><div class="block_content"  ><h2 class="title"><a></a></h2>';
            data +=  breadcrumb_html_data;
            var flag = 0;
            if (arr[index].pages.length > 0 && arr[index].type != 'checkout' ) {
                data += '<table class="table"><thead><tr><th>Page name</th><th>Percentage</th></tr> </thead><tbody>';
                flag = 1;
            }


            if($("#landing_page_product_array")[0].value != '' && JSON.parse($("#landing_page_product_array")[0].value).length > 0 && check_if_product_in_funnel() == true && index == 0){
                data += '<table class="table"><thead><tr><th>Product name</th></tr> </thead><tbody>';
                var landing_page_product_array = $("#landing_page_product_array")[0].value;
                landing_page_product_array = JSON.parse(landing_page_product_array);
                var funnel_id = String(window.location.pathname.split('/').pop());
                for (var i = 0; i < landing_page_product_array.length; i++) {
                    if (landing_page_product_array[i].funnel_id == funnel_id) {
                        data += '<tr><td>'+'<a target="_blank"  href=" '+full_shop_url+'/products/'+landing_page_product_array[i].product_handle+'" >'+window.atob(landing_page_product_array[i].product_name)+'</a>'+'</td></tr>';
                    }
                }
                flag = 1;
            }


            for(var k=0;k<arr[index].pages.length;k++){
                for ( var m=0 ; m<all_pages_array.length;m++){
                    if (all_pages_array[m].id == arr[index].pages[k].page_id) {
                        var page_name = all_pages_array[m].name;
                        for(var key in product_handle_array){
                            if (product_handle_array[key].page_id == arr[index].pages[k].page_id) {
                                var product_handle= product_handle_array[key].meta_value;
                            }
                        }
                        data += '<tr><td>'+'<a target="_blank"  href=" '+full_shop_url+shopify_proxy_prefix+'/p/'+arr[index].pages[k].page_id+'/'+product_handle+'  " >'+page_name+'</a>'+'</td><td style="text-align: center;">'+arr[index].pages[k].percent+'</td></tr>';
                    }
                } 
            }
            if (flag==1) {
                data += '</tbody></table>';
            }



            else{
                if (page_type=='Checkout page') {
                    var checkout_type; 
                    if ( arr[index].checkout_type =='built-in'){

                        checkout_type = 'Shopify checkout';
                        data += '<p>'+ checkout_type +'</p>';
                    }
                    if ( arr[index].checkout_type =='custom'){
                        checkout_type='Funnel buildr checkout';
                        data += '<p>'+ checkout_type +'</p>';
                        var custom_checkout_page;
                        if (arr[index].pages=='') {
                            custom_checkout_page = 'Default';
                            data += '<table class="table"><thead><tr><th>Checkout page name</th></thead><tbody><tr><td>'+custom_checkout_page+' </td></tr></tbody></table>';
                        }

                        else {

                                for ( var m=0 ; m<all_pages_array.length;m++){
                                    if (all_pages_array[m].id == arr[index].pages) {
                                        var page_name = all_pages_array[m].name;
                                        for(var key in product_handle_array){
                                            if (product_handle_array[key].page_id == arr[index].pages) {
                                                var product_handle= product_handle_array[key].meta_value;
                                            }
                                        }
                                        data += '<table class="table"><thead><th>Checkout page name</th></thead><tbody><tr><td>'+'<a target="_blank"  href=" '+full_shop_url+shopify_proxy_prefix+'/p/'+arr[index].pages+'/'+product_handle+'  " >'+page_name+'</a>'+'</td></tr></tbody></table>';
                                    }
                                } 

                        }

                        
                    }
                   
                }
                else{
                    data += '<p>No page/pages added.</p>';
                }
            }
            if (  arr[index].type=="UP" ||  arr[index].type=="DP" ) {
                data += '</div></div><button class="btn btn-danger"  style="position: absolute;display: inline-block;top: 5px; right: 0; padding: 2px 3px;margin-right:0px;"  onclick="delete_this_index('+index+')"><i class="fa fa-trash-o" aria-hidden="true"></i></button></li>';
            }
            else {
                data += '</div></div></li>';
            }
        }
        if (arr[index].child.left != "") {
            queue.push(arr[index].child.left);
        }
        if (arr[index].child.right != "") {
            queue.push(arr[index].child.right);
        }
       
        ($('#tree_ul')).append (data);
        generate_tree_li(arr,queue,all_pages_array);
    }
}
