function change_product_variant(me){
	return false;
}
function shopify_add_to_cart(me){
	return false;
}
function shopify_decline(me){
	return false;
}
function shopify_change_product_quantity(me){
	return false;
}
function show_billing_address_div(me){
    if($(me)[0].checked){
        $("#different_billing_address_div").show();
    }else{
        $("#different_billing_address_div").hide();
    }
    return false;
}
function checkout_now(me){
	return false;
}
function redirect_to_checkout(me){
	return false;
}
function embedded_payment_method_selection(element){
	document.getElementById('payment_method_credit_card').style.display = 'none';
    document.getElementById('payment_method_paypal').style.display = 'none';
    document.getElementById('payment_method_' + element.value ).style.display = 'block';
}