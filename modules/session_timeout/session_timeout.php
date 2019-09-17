<!DOCTYPE html>
<html>
<head>
	<title>Oops, session expired</title>
	<meta charset="utf-8">
  	<meta name="viewport" content="width=device-width, initial-scale=1">
  	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  	<!-- Font -->
  	<link href="https://fonts.googleapis.com/css?family=Rakkas" rel="stylesheet">

  	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>
<style>
	body{
		background-color: #f4f6f8;
	}
	.text-middle{
		position: absolute;
		top: 45%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.error{
		font-size: 100px;
		color: #1A237E;
		/*color: #00695C;*/
		padding: 0px;
		margin: 0px;
		border: 0px;
	}

	.error-msg{
		padding-top: 0px;
		padding-bottom: 10px;
		color: #2e6da4;
	}
	.btn-home{
		color: #1A237E;
		font-weight: bold;
		border-radius: 50px;
		border: 2px solid #1A237E;
		padding: 10px 30px 10px 30px;
	}

	.btn-home:hover{
		background-color: #eee;
    	color: #1a237e ;
	}
</style>
<body style="background-color: #f4f6f8; color: #00695C;">
	<div class="container-fluid">
		<div class="text-center">
			<div class="text-middle text-center">
				<h1 class="error">Oops,</h1>
				<div class="error-msg">
					<h2 style="font-size: 22px;">Your session has expired. Please reload the app or re-login to continue.</h2>
					<p>PLEASE CLOSE THIS TAB AND LOGIN AGAIN.</p>
				</div>
				<a class="btn btn-home"  href="https://www.shopify.com/login">Login again</a>
			</div>
		</div>
	</div>
</body>
</html>
