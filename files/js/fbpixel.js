function fbq_init(pixel_id){
    if(check_fbq_install_or_not()){
        console.log("init event call...");
        fbq('init', pixel_id, {});
        fbq('set', 'autoConfig', true, pixel_id);
    }
}
function fbq_page_view(){
     if(check_fbq_install_or_not()){
        console.log("PageView event call...");
        fbq('track', 'PageView');
     }
}
function fbq_view_content(content_name,content_type,content_category,content_ids,value,num_items,currency,come_from){
    if(check_fbq_install_or_not()){
        if(come_from == "trackify"){
            call_trackify_end_point("ViewContent",[content_ids],value,num_items);
            //call_trackify_end_point("ViewContent",content_ids,value,num_items);
        }else{
            fbq('track', 'ViewContent', {
                content_name: content_name,
                content_type: content_type,
                content_category: content_category,
                content_ids: content_ids,
                content_timedata: current_date_time(),
                value: value,
                num_items: num_items,
                currency: currency,
                referrer: document.referrer,
                userAgent: navigator.userAgent,
                language: navigator.language
            }); 
        }
        console.log("ViewContent event call...");
    }
}
function fbq_add_to_cart(content_name,content_type,content_category,value,num_items,currency,content_ids){
    if(check_fbq_install_or_not()){
        if($("#facebook_pixel_id")[0].value != null && $("#facebook_pixel_id")[0].value != ""){
            if($("#facebook_pixel_id")[0].value == "1234567890"){
                content_name = "Trackify AddToCart";
            }
            if($("#before_after_checkout").length > 0){
                if($("#before_after_checkout")[0].value == "true"){
                    fbq_purchase(content_name,content_type,content_category,value,num_items,currency,content_ids,"");
                }else{
                    if($("#facebook_pixel_id")[0].value == "1234567890"){
                        call_trackify_end_point("AddToCart",content_ids,value,num_items);
                    }else{
                        console.log("AddToCart event call...");
                        content_ids = JSON.stringify(content_ids);
                        fbq('track', 'AddToCart', {
                            content_name: content_name,
                            content_type: content_type,
                            content_category: content_category,
                            content_ids: content_ids,
                            content_timedata: current_date_time(),
                            value: value,
                            num_items: num_items,
                            currency: currency
                        });
                    }
                }
            }else{
                if($("#facebook_pixel_id")[0].value == "1234567890"){
                    call_trackify_end_point("AddToCart",content_ids,value,num_items);
                }else{
                    console.log("AddToCart event call...");
                    content_ids = JSON.stringify(content_ids);
                    fbq('track', 'AddToCart', {
                        content_name: content_name,
                        content_type: content_type,
                        content_category: content_category,
                        content_ids: content_ids,
                        content_timedata: current_date_time(),
                        value: value,
                        num_items: num_items,
                        currency: currency
                    });
                }
            }            
        }
    }
}
 
function fbq_purchase(content_name,content_type,content_category,value,num_items,currency,content_ids,Rurl){
    if(check_fbq_install_or_not()){
        if($("#facebook_pixel_id")[0].value != null && $("#facebook_pixel_id")[0].value != ""){
            if($("#facebook_pixel_id")[0].value == "1234567890"){
                call_trackify_end_point("Purchase",content_ids,value,num_items);
            }else{
                console.log("Purchase event call...");
                content_ids = JSON.stringify(content_ids);
                fbq('track', 'Purchase', {
                    content_name: content_name,
                    content_type: content_type,
                    content_category: content_category,
                    content_ids: content_ids,
                    content_timedata: current_date_time(),
                    value: value,
                    num_items: num_items,
                    currency: currency
                });
            }

            if(Rurl != ""){
                window.location.replace( Rurl );
            }
        }
    } 
}

function fbq_viewcart(content_name,content_type,content_category,value,num_items,currency,content_ids){
    if(check_fbq_install_or_not()){
        if($("#facebook_pixel_id")[0].value != null && $("#facebook_pixel_id")[0].value != ""){
            //if($("#facebook_pixel_id")[0].value == "1234567890"){
                //call_trackify_end_point("ViewCart",content_ids,value,num_items);
            //}else{
                console.log("ViewCart event call...");
                content_ids = JSON.stringify(content_ids);
                fbq('track', 'ViewCart', {
                    content_name: content_name,
                    content_type: content_type,
                    content_category: content_category,
                    content_ids: content_ids,
                    content_timedata: current_date_time(),
                    value: value,
                    num_items: num_items,
                    currency: currency
                });
            //}
        }
    }
}

function fbq_add_payment_info(content_name,content_category,value,num_items,currency,content_ids){
    if(check_fbq_install_or_not()){
        if($("#facebook_pixel_id")[0].value != null && $("#facebook_pixel_id")[0].value != ""){
            if($("#facebook_pixel_id")[0].value == "1234567890"){
                call_trackify_end_point("AddPaymentInfo",content_ids,value,num_items);
            }else{
                console.log("AddPaymentInfo event call...");
                content_ids = JSON.stringify(content_ids);
                fbq('track', 'AddPaymentInfo', {
                    content_name: content_name,
                    content_category: content_category,
                    content_ids: content_ids,
                    content_timedata: current_date_time(),
                    value: value,
                    num_items: num_items,
                    currency: currency
                });
            }
        }
    }
}

function fbq_initiate_checkout(content_name){
    if(check_fbq_install_or_not()){
        $.getJSON('/cart.js', function(cart) {
            var ids = [];
            for(var i=0;i<cart.items.length;i++){
                ids.push(cart.items[i].variant_id);
            }
            if($("#facebook_pixel_id")[0].value == "1234567890"){
                var item_price = parseFloat( cart.total_price/100 ).round(2).toFixed(2);
                call_trackify_end_point("InitiateCheckout",ids,item_price,cart.item_count);
            }else{
            	console.log("InitiateCheckout event call...");
                content_ids = JSON.stringify(ids);
                fbq('track', 'InitiateCheckout', {
                    content_name: content_name,
                    content_type: 'product_group',
                    content_ids: content_ids,
                    content_timedata: current_date_time()
                });
            }
        });
    }
}

function current_date_time(){
    var d = new Date();
    var n = d.toString();
    n = n.replaceAll(" ", "_");
    return n;
}
String.prototype.replaceAll = function(search, replacement) {
      var target = this;
      return target.replace(new RegExp(search, 'g'), replacement);
};

function trigger_fbq_purchase_event(Rurl){
	console.log("trigger_fbq_purchase_event");
	var grand_total = "";
	if($("#total_price_for_checkout").length > 0){
		grand_total = $("#total_price_for_checkout")[0].innerHTML;
		grand_total = grand_total.replace(/[^0-9\.]/g, '');
	}else if($("#grand_total").length > 0){
		grand_total = $("#grand_total")[0].innerHTML;
	}
	
	if(grand_total != ""){
		grand_total = parseFloat( grand_total ).round(2).toFixed(2);
	}

    if(check_fbq_install_or_not()){
        $.getJSON('/cart.js', function(cart) {
            var item_price = parseFloat( cart.total_price/100 ).round(2).toFixed(2);
            var ids = [];
            for(var i=0;i<cart.items.length;i++){
                ids.push(cart.items[i].variant_id);
            }
            if(grand_total != ""){
            	fbq_purchase("Purchase","product_group","",grand_total,cart.item_count,$("#shop_currency")[0].value,ids,Rurl);
            }else{
            	fbq_purchase("Purchase","product_group","",item_price,cart.item_count,$("#shop_currency")[0].value,ids,Rurl);
            }

        });
    }else{
        if(Rurl != ""){
            window.location.replace( Rurl );
        }
    }
}

function trigger_fbq_viewcart_event(){
    if(check_fbq_install_or_not()){
        $.getJSON('/cart.js', function(cart) {
            var item_price = parseFloat( cart.total_price/100 ).round(2).toFixed(2);
            var ids = [];
            for(var i=0;i<cart.items.length;i++){
                ids.push(cart.items[i].variant_id);
            }
            fbq_viewcart("ViewCart","product_group","",item_price,cart.item_count,$("#shop_currency")[0].value,ids);
        });
    }
}

function trigger_fbq_add_payment_info_event(){
    console.log("Add payment info call but not trigger");
    if(check_fbq_install_or_not()){
        $.getJSON('/cart.js', function(cart) {
            var item_price = parseFloat( cart.total_price/100 ).round(2).toFixed(2);
            var ids = [];
            for(var i=0;i<cart.items.length;i++){
                ids.push(cart.items[i].variant_id);
            }
            //ids = JSON.stringify(ids);
            fbq_add_payment_info("AddPaymentInfo","",item_price,cart.item_count,$("#shop_currency")[0].value,ids);
        }); 
    }
}

function check_fbq_install_or_not(){
    if(typeof fbq === "function"){
        console.log("fbq found");
        return true;
    }else{
        console.log("fbq not found");
        return false;
    }
}

function call_trackify_end_point(event_type,varient_ids,value,num_items){
    console.log("Trackify => "+ event_type);
    var shop_url = shop;
    if(check_valid_ele('#shop_currency')){
        var shop_currency = $("#shop_currency")[0].value
    }else{
        shop_currency = "USD";
    }
    var product_ids = "";
    for(i=0;i<varient_ids.length;i++){
        product_ids += '&product_ids[]='+varient_ids[i];
    }

    var url = 'https://app.redretarget.com/sapp/pixel?store_name='+shop_url+'&event_type='+event_type+''+product_ids+'&value='+value+'&currency='+shop_currency+'&num_items='+num_items;
    console.log("Trackify call url: "+url);
    // create script element
    var script = document.createElement('script');
    // assing src with callback name
    script.src = url;
    // insert script to document and load content
    $('head').append(script);
}

function check_valid_ele(ele_id_class_or_something){
    if($(ele_id_class_or_something).length > 0){
        return true;
    }else{
        return false;
    }
}

function check_if_google_analytics_id_exist(){
    if (typeof(google_analytics_id_found) !== 'undefined') {
        if (google_analytics_id_found == true) {
            return true;
        }
        else{
            return false;
        }
    }
    else{
        return false;
    }
}

function gaee_page_view(){
    console.log("gaee page view");
    var title = document.title;
    var url = window.location.href;
    var page = window.location.pathname;
    ga("send", "pageview", {page: page, title: title, location: url});
}

function gaee_product_view(shopify_all_product_info,shop_currency){
    console.log("gaee product view");
    var id = shopify_all_product_info[1].shopify_product_variants_list[0].product_id;
    var title = shopify_all_product_info[3].shopify_product_name;
    var price = parseFloat( shopify_all_product_info[5].shopify_product_price).round(2).toFixed(2);
    var currency = shop_currency;
    ga('ec:addProduct', {
        'id' : id,
        'name': title,
        'price': price,
        'currency': currency
    });
    ga("ec:setAction", "detail");
    ga("send", "event", {eventCategory: "EnhancedEcommerce", eventAction: "Viewed Product"});
}

function gaee_product_added(id,title,quantity,variant,price,currency){
    console.log("gaee product added");
    if($("#before_after_checkout").length > 0){
        if ($("#before_after_checkout").val() == "true") {
            gaee_single_purchase(id,title,quantity,variant,price,currency);
        }
        else{
            ga('ec:addProduct', {
                'id' : id,
                'name': title,
                'quantity': quantity,
                'variant': variant,
                'price': price,
                'currency': currency
            });
            ga("ec:setAction", "add");
            ga("send", "event", {eventCategory: "EnhancedEcommerce", eventAction: "Added Product"});
        }
    }
}

function gaee_checkout_step1() {
    console.log("gaee gaee_checkout_step1 view");
    $.getJSON('/cart.js', function(cart) {
        for(var i = 0; i < cart.items.length; i++) {
            var product = cart.items[i];
            ga('ec:addProduct', {
              'id': product.product_id,
              'name': product.product_title,
              'variant':  product.variant_title,
              'price': parseFloat( product.price/100 ).round(2).toFixed(2),
              'quantity': product.quantity
            });
        }
        ga("ec:setAction", "checkout", {step: 1});
        ga("send", "event", {eventCategory: "EnhancedEcommerce", eventAction: "Started Order"});
    });
}

function gaee_checkout_step2() {
    console.log("gaee gaee_checkout_step2 view");
    $.getJSON('/cart.js', function(cart) {
        for(var i = 0; i < cart.items.length; i++) {
            var product = cart.items[i];
            ga('ec:addProduct', {
              'id': product.product_id,
              'name': product.product_title,
              'variant':  product.variant_title,
              'price': parseFloat( product.price/100 ).round(2).toFixed(2),
              'quantity': product.quantity
            });
        }
        ga("send", "event", {eventAction: "Viewed Checkout - Shipping Page", eventCategory: "All"});
    });
}

function gaee_checkout_step3() {
    console.log("gaee gaee_checkout_step3 view");
    $.getJSON('/cart.js', function(cart) {
        for(var i = 0; i < cart.items.length; i++) {
            var product = cart.items[i];
            ga('ec:addProduct', {
              'id': product.product_id,
              'name': product.product_title,
              'variant':  product.variant_title,
              'price': parseFloat( product.price/100 ).round(2).toFixed(2),
              'quantity': product.quantity
            });
        }
        ga("send", "event", {eventAction: "Viewed Checkout - Payment Page", eventCategory: "All"});
    });
}

function gaee_checkout_step4() {
    console.log("gaee gaee_checkout_step4 view");
    $.getJSON('/cart.js', function(cart) {
        for(var i = 0; i < cart.items.length; i++) {
            var product = cart.items[i];
            ga('ec:addProduct', {
              'id': product.product_id,
              'name': product.product_title,
              'variant':  product.variant_title,
              'price': parseFloat( product.price/100 ).round(2).toFixed(2),
              'quantity': product.quantity
            });
        }
        ga("send", "event", {eventAction: "Viewed Checkout - Checkout - Receipt", eventCategory: "All"});
    });
}

function gaee_purchase() {
    console.log("gaee purchase view");
    if (check_if_google_analytics_id_exist() == true) {
        $.getJSON('/cart.js', function(cart) {
            for(var i = 0; i < cart.items.length; i++) {
                var product = cart.items[i];
                ga('ec:addProduct', {
                  'id': product.product_id,
                  'name': product.product_title,
                  'variant':  product.variant_title,
                  'price': parseFloat( product.price/100 ).round(2).toFixed(2),
                  'quantity': product.quantity
                });
            }
            ga("ec:setAction", "purchase", {id: cart.token});
            ga("send", "event", {eventCategory: "EnhancedEcommerce", eventAction: "Completed Order"});
        });
    }
}

function gaee_single_purchase(product_id,product_title,product_quantity,product_variant,product_price,product_currency) {
    console.log("gaee single purchase view");
    $.getJSON('/cart.js', function(cart) {
        ga('ec:addProduct', {
            'id' : product_id,
            'name': product_title,
            'quantity': product_quantity,
            'price': product_price,
            'variant': product_variant
        });
        ga("ec:setAction", "purchase", {id: cart.token});
        ga("send", "event", {eventCategory: "EnhancedEcommerce", eventAction: "Completed Order"});
    });
}