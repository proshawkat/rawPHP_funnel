<?php
	use Aws\S3\S3Client;
	use Aws\Common\Credentials\Credentials;

	define( 'AWS_ACCESS_KEY', 'AKIAJWZBG3JYU7QYM4RQ' );
	define( 'AWS_SECRET_KEY', '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' );

	function get_s3_file( $bucket, $filename ) {
		require_once 'vendor/autoload.php';

		$credentials = new Credentials( AWS_ACCESS_KEY, AWS_SECRET_KEY );

		// Instantiate the S3 client with your AWS credentials
		$s3Client = S3Client::factory(array(
		    'credentials' => $credentials
		));

		// You can also modify parameters
		$command = $s3Client->getCommand('objects', array(
		    'Bucket'  	=> $bucket,
		    'Key'		=> $filename
		));

		$result = $command->getResult();
		return $result;
	}

	function put_s3_file( $bucket, $filename ) {
		require_once 'vendor/autoload.php';

		$credentials = new Credentials( AWS_ACCESS_KEY, AWS_SECRET_KEY );

		// Instantiate the S3 client with your AWS credentials
		$s3Client = S3Client::factory(array(
		    'credentials' => $credentials
		));

		// You can also modify parameters
		$command = $s3Client->getCommand('putObject', array(
		    'Bucket'  	=> $bucket,
		    'Key'		=> $filename,
		    'Body'		=> file_get_contents( $filename )
		));
		$result = $command->getResult();
		unlink( $filename );
		return AWS_CLOUD_BASE . '/' . $filename;
	}

	function delete_s3_file( $bucket, $filename ) {
		require_once 'vendor/autoload.php';

		$credentials = new Credentials( AWS_ACCESS_KEY, AWS_SECRET_KEY );

		// Instantiate the S3 client with your AWS credentials
		$s3Client = S3Client::factory(array(
		    'credentials' => $credentials
		));

		// You can also modify parameters
		$command = $s3Client->getCommand('deleteObject', array(
		    'Bucket'  	=> $bucket,
		    'Key'		=> $filename,
		    'Body'		=> file_get_contents( $filename )
		));

		$result = $command->getResult();

		return true;
	}
?>
