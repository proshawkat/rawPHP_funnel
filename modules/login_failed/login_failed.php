<!DOCTYPE html>
<html>
<head>
	<title>Sorry, login failed</title>
	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

	<!-- Optional theme -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

	<!-- Latest compiled and minified JavaScript -->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

	<style type="text/css">
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
</head>
<body style="background-color: #f4f6f8; color: #00695C;">
	<div class="container-fluid">
	
		<div class="text-center">
			<div class="text-middle text-center">
				<h1 class="error">Sorry,</h1>
				<div class="error-msg">
					<h2 style="font-size: 22px;">App can not be loaded due to billing problem. Your license has expired.</h2>
					<p>PLEASE CONTACT ECOMISOFT SUPPORT TO RESOLVE THE ISSUE.</p>
				</div>
				<a class="btn btn-home" target="_blank" href="http://help.ecomisoft.com/">Contact support</a>
			</div>


		</div>
	</div>
</body>




</html>
