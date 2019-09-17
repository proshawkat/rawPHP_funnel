<?php
require ('./includes/nmi_lib/nmiCustomerVault.class.php');
require ('./includes/nmi_lib/nmiDirectPost.class.php');

// heading();
form_processor();
?>
<!-- <form> -->
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="content-type" content="text/html;charset=utf-8" />
		<title>Funnel Buildr</title>
		<link rel="icon" href="<?php echo BASE.'/files/dashboard/images/favicon.png'; ?>" type="image/gif" sizes="16x16">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
		  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
		  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    </head>
    <body class="nav-md">
    	<div class="container body">
    		<div class="main_container">
    			<div class="container-fluid">
					<div class="shipping_info">
						<input type="email" name="shipping_form_email" class="form-control" placeholder="email" required value="s@gmail.com">
						<input type="text" name="shipping_first_name" class="form-control" placeholder="First Name" value="S">
						<input type="text" name="shipping_last_name"  class="form-control" placeholder="Last Name" required="required" value="H">
						<input type="text" name="shipping_address"  class="form-control" placeholder="Address" value="ABC">
						<input type="text" name="shipping_apt" class="form-control" placeholder="Apt," value="1">
						<input type="text" name="shipping_city"  class="form-control" placeholder="City" value="Dhaka">
						<input type="text" name="shipping_country"  class="form-control" placeholder="Country" value="Bangladesh">
						<input type="text" name="shipping_zip"  class="form-control" placeholder="Zip" value="1200">
					</div>

					<hr>

					<div class="panel panel-default">
						<div class="panel-heading"><h4>..:: Credit Card Details ::..</h4></div>
						<div class="panel-body">
							<div class="col-xs-12">
								<input type="text" id="card_number" placeholder="Card Number" data-stripe="number" class="form-control" value="4111111111111111">
								<p></p>
							</div>
							<div class="col-md-4 col-xs-12">
								<input type="text" id="mm" placeholder="MM" data-stripe="exp_month" class="form-control" value="01">
								<p></p>
							</div>
							<div class="col-md-4 col-xs-12">
								<input type="text" id="yy" placeholder="YY" data-stripe="exp_year" class="form-control" value="22">
								<p></p>
							</div>
							<div class="col-md-4 col-xs-12">
								<input type="text" id="cvv" placeholder="CVV" data-stripe="cvc" class="form-control" value="111">
								<p></p>
							</div>	
						</div>
						<div class="panel-fotting"></div>
					</div>

					<button class="btn btn-info form-control" onclick="get_user_details()"><b>Buy Now</b></button>
				</div>		
    		</div>
		</div>

<script>
	function get_user_details() {
		/////////////////////////Shipping Details//////////////////////////
		var email = document.getElementsByName('shipping_form_email')[0].value;
		var f_name = document.getElementsByName('shipping_first_name')[0].value;
		var l_name = document.getElementsByName('shipping_last_name')[0].value;
		var address = document.getElementsByName('shipping_address')[0].value;
		var apt = document.getElementsByName('shipping_apt')[0].value;
		var city = document.getElementsByName('shipping_city')[0].value;
		var country = document.getElementsByName('shipping_country')[0].value;
		var zip = document.getElementsByName('shipping_zip')[0].value;
		/////////////////////////Card Details///////////////////////////
		var card_number = document.getElementById('card_number').value;
		var exp_month = document.getElementById('mm').value;
		var exp_year = document.getElementById('yy').value;
		var cvv = document.getElementById('cvv').value;

		var data = "";
		data += "shipping_form_email="+email+"&shipping_first_name="+f_name+"&shipping_last_name="+l_name+"&shipping_address="+address+"&shipping_apt="+apt+"&shipping_city="+city+"&shipping_country="+country+"&shipping_zip="+zip+"&card_number="+card_number+"&exp_month="+exp_month+"&exp_year="+exp_year+"&cvv="+cvv;

		http_post_request ('http://localhost/funnel_v2/nmi/?process=user_data' , data , 'exit_func');
	}

	function exit_func(res){
		console.log(res);

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
</script>
<!-- </form> -->
</body>
</html>
<?php
function process_user_data (){
	$customer['email'] = $_REQUEST['shipping_form_email'];
	$customer['f_name'] = $_REQUEST['shipping_first_name'];
	$customer['l_name'] = $_REQUEST['shipping_last_name'];
	$customer['address'] = $_REQUEST['shipping_address'];
	$customer['apt'] = $_REQUEST['shipping_apt'];
	$customer['city'] = $_REQUEST['shipping_city'];
	$customer['country'] = $_REQUEST['shipping_country'];
	$customer['zip'] = $_REQUEST['shipping_zip'];
	$customer['cc'] = $_REQUEST['card_number'];
	$customer['exp_month'] = $_REQUEST['exp_month'];
	$customer['exp_year'] = $_REQUEST['exp_year'];
	$customer['cvv'] = $_REQUEST['cvv'];

	$vault_res = create_customer_vault($customer);
	print_r($vault_res);
	$vault_res = checkout(300,$vault_res['customer_vault_id']);
	print_r($vault_res);
	$vault_res = checkout(300,$vault_res['customer_vault_id']);
	print_r($vault_res);
	$vault_res = delete_vault($vault_res['customer_vault_id']);
	print_r($vault_res);
	$vault_res = checkout(300,$vault_res['customer_vault_id']);
	print_r($vault_res);
	$vault_res = create_customer_vault($customer);
	print_r($vault_res);
	$vault_res = checkout(300,$vault_res['customer_vault_id']);
	print_r($vault_res);
}

/**
Takes Customer Array 
Creates customer vault using customer information
@pram custome array
@return result
*/
function create_customer_vault($customer){
	$vault = new nmiCustomerVault;

	//////Shipping Details//////
	$vault->setEmail($customer['email']);
	$vault->setFirstName($customer['f_name']);
	$vault->setLastName($customer['l_name']);
	$vault->setAddress1($customer['address']);
	//$_REQUEST['shipping_apt'];
	$vault->setCity($customer['city']);
	$vault->setCountry($customer['country']);
	$vault->setZip($customer['zip']);

	///////Card Details/////////
	$vault->setCcNumber($customer['cc']);
	$vault->setCcExp($customer['exp_month'].$_REQUEST['exp_year']);
	$vault->setCvv($customer['cvv']);
	if(strlen($customer['exp_month']) == 1 ){
		$customer['exp_month'] = "0".$customer['exp_month'];
	}
	
	$vault->setTax('0.00');
	$vault->setShipping('0.00');
	$vault->add();
	$result = $vault->execute();
	return $result;
}

function checkout($amount, $vault_id){
	$transaction = new nmiDirectPost;
	$transaction->sale();
	$result = $transaction->exe($amount, $vault_id);
	return $result;
}

function delete_vault($vault_id){
	$vault = new nmiCustomerVault;
	$vault->setCustomerVaultId($vault_id);
	$vault->delete();
	$result = $vault->execute();
	return $result;
}

/**
Takes amount to as prem
adds the amount to customer vault
@pram amount
@pram vault_id
@return result
*/
function add_charge($amount, $vault_id){
	$vault = new nmiCustomerVault;
	$vault->setCustomerVaultId($vault_id);
	$vault->charge($amount);
	$result = $vault->execute();
	return $result;
}
?>