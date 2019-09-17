var variable_for_collect_image_url = 0;
var image_url = '';
$( document ).ready(function() {
    if (check_if_customcat_vendor()==true) {
    	var cat_html = '<div id="cc-custom" style="display: none;"></div>';
    	$( ".shopify_product_variants_div" ).after( cat_html );

    }
    
});

function process_customize(){
	var id = $("#selected_valid_variant").val();
	var sku = get_sku_from_id(id);
	ccCustomize(document.getElementById("cc-custom")).customizer({
        sku: sku,
        variant: varient
    });
}

function check_if_customcat_vendor(){
	var shopify_all_product_information = JSON.parse($('#shopify_all_product_information').val());
	for (var i = 0; i < shopify_all_product_information.length; i++) {
		if (shopify_all_product_information[i].shopify_product_vendor=='CustomCat') {
			return true;
		}
	}
}






function get_sku_from_variants ( variant_id ){
	var all_variants = $('#shopify_all_product_information')[0].value;
	all_variants = JSON.parse (all_variants);
	for ( var x= 0 ; x< all_variants.length ; x++){
	   if ( all_variants[x]['shopify_product_variants_list'] ) {
	       var  shopify_product_variants_list =  all_variants[x]['shopify_product_variants_list'];
	       for (var y = 0 ; y< shopify_product_variants_list.length ; y++){
	           if ( shopify_product_variants_list[y].id == variant_id){
	               return  shopify_product_variants_list[y].sku;
	           }
	       }
	   }
	}
}



function process_customize(){
	var id = $("#selected_valid_variant").val();
	var sku = get_sku_from_variants(id);
	ccCustomize(document.getElementById("cc-custom")).customizer({
        sku: sku,
        variant: id
    });
}

ccCustomize = (function() {
    function NodeList(elems) {
        this.length = 0;
        this.merge(this, elems.nodeType ? [elems] : elems);
    }

    function ccCustomize(elems) {
        return new NodeList(elems);
    }
    ccCustomize.NodeList = NodeList;
    NodeList.prototype = {
        merge: function(first, second) {
            var i = first.length,
                j = 0;
            for (var l = second.length; j < l; ++j) {
                first[i++] = second[j];
            }
            first.length = i;
            return first;
        },
        each: function(fn) {
            for (var i = -1, l = this.length; ++i < l;) {
                fn.call(this[i], this[i], i, l, this);
            }
            return this;
        }
    };
    return ccCustomize;
})();
ccCustomize.NodeList.prototype.customizer = function(cc_obj) {
    cc_obj = (typeof cc_obj === "undefined") ? {} : cc_obj;
    return this.each(function() {
        callExternalCustomPlugin(this, cc_obj, "");
    });
};

function callExternalCustomPlugin(element, cc_obj, plugin_url) {
    var query_string = "";
    var item;
    for (item in cc_obj) {
        query_string += "&" + item + "=" + encodeURIComponent(cc_obj[item]);
    }
    sendRequestToCustomCat("//customcat.mylocker.net/CustomViewer.cfm?version=1.0" + query_string, element);
}

function createCustomRequestObject() {
    var obj;
    var browser = navigator.appName;
    if (browser == "Microsoft Internet Explorer") {
        obj = new XDomainRequest();
    } else {
        obj = new XMLHttpRequest();
    }
    return obj;
}

function sendRequestToCustomCat(req, element) {
    http = createCustomRequestObject();
    http.open("get", req, true);
    var browser = navigator.appName;
    if (browser == "Microsoft Internet Explorer") {
        http.onload = handleCCResponse(http, element);
    } else {
        http.onreadystatechange = handleCustomResponse(http, element);
    }
    http.send(null);
}

function handleCustomResponse(http, element) {
    return function() {
        if (http.readyState == 4 || http.timeout == -1) {
            var response = http.responseText;
            element.innerHTML = response;
            var myscripts = element.getElementsByTagName("script");
            for (var i = 0; i < myscripts.length; i++) {
                eval(myscripts[i].innerHTML);
            }
            jQuery.getScript("//customcat.mylocker.net/js/jquery.fancybox.js?v=2.1.5", function() {});
            if (typeof CCLoaded == "function") {
                CCLoaded(element);
            }
        }
    };
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function CCLoaded() {
    var ccImage = document.getElementById("cc-image");
    ccImage.style.height = "385px";
    ccImage.style.width = "385px";
    var dataToLoad = document.getElementById("cc-custom").innerHTML;
    document.getElementById("cc-custom").innerHTML = "";
    jQuery.fancybox(dataToLoad, {
        "autoDimensions": false,
        "width": 400,
        "height": 500,
        "autoScale": false
    });
    $("#cc-tt").click(function(){
    	if (variable_for_collect_image_url == 0) {
    		get_image_url();
    		variable_for_collect_image_url =1;
    	}
    });
    $("#cc-tt").keyup(function(){
    	var img = new URLSearchParams(image_url);
    	var tt_id = document.getElementById("cc-tt");
    	img.set("tt", tt_id.value);
    	image_url = img.toString();
    	setTimeout(function(){ $("#cc-image").attr("src",decodeURIComponent(image_url).replace('http://','//')); }, 1000);
    	
    });
    $("#cc-bt").click(function(){
    	if (variable_for_collect_image_url == 0) {
    		get_image_url();
    		variable_for_collect_image_url =1;
    	}
    });
    $("#cc-bt").keyup(function(){
    	var img = new URLSearchParams(image_url);
    	var bt_id = document.getElementById("cc-bt");
    	img.set("bt", bt_id.value);
    	image_url = img.toString(); 
    	setTimeout(function(){ $("#cc-image").attr("src",decodeURIComponent(image_url).replace('http://','//')); }, 1000);   
    });
    $("#cc-tn").click(function(){
    	if (variable_for_collect_image_url == 0) {
    		get_image_url();
    		variable_for_collect_image_url =1;
    	}
    });
    $("#cc-tn").keyup(function(){
    	var img = new URLSearchParams(image_url);
    	var tn_id = document.getElementById("cc-tn");
    	img.set("tn", tn_id.value);
    	image_url = img.toString();
    	setTimeout(function(){ $("#cc-image").attr("src",decodeURIComponent(image_url).replace('http://','//')); }, 1000);
    });
    $("#cc-tm").click(function(){
    	if (variable_for_collect_image_url == 0) {
    		get_image_url();
    		variable_for_collect_image_url =1;
    	}
    });
    $("#cc-tm").keyup(function(){
    	var img = new URLSearchParams(image_url);
    	var tm_id = document.getElementById("cc-tm");
    	img.set("tm", tm_id.value);
    	image_url = img.toString();
    	setTimeout(function(){ $("#cc-image").attr("src",decodeURIComponent(image_url).replace('http://','//')); }, 1000);
    });
    return false;
}

function setDIURLS() {
    custom_url = '';
    custom_url_2submit = '';
    tt_id = document.getElementById("cc-tt");
    bt_id = document.getElementById("cc-bt");
    tn_id = document.getElementById("cc-tn");
    tm_id = document.getElementById("cc-tm");
    if (document.body.contains(tt_id)) {
        custom_url = custom_url + "&tt=" + encodeURIComponent(tt_id.value);
        custom_url_2submit = custom_url_2submit + "\u0026tt=" + encodeURIComponent(tt_id.value);
    }
    if (document.body.contains(bt_id)) {
        custom_url = custom_url + "&bt=" + encodeURIComponent(bt_id.value);
        custom_url_2submit = custom_url_2submit + "\u0026bt=" + encodeURIComponent(bt_id.value);
    }
    if (document.body.contains(tn_id)) {
        custom_url = custom_url + "&tn=" + encodeURIComponent(tn_id.value);
        custom_url_2submit = custom_url_2submit + "\u0026tn=" + encodeURIComponent(tn_id.value);
    }
    if (document.body.contains(tm_id)) {
        custom_url = custom_url + "&tm=" + encodeURIComponent(tm_id.value);
        custom_url_2submit = custom_url_2submit + "\u0026tm=" + encodeURIComponent(tm_id.value);
    }
    return custom_url_2submit;
}

function get_image_url(){
	image_url = $("#cc-image")[0].src;
}







