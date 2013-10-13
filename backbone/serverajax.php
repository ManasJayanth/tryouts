<?php
define('idlimit', 6);

function fetchImage($data) {
	$database = "backboneImgGallery"; 
	$server = "127.0.0.1";
	$db_user = "root";
	$db_pass = "mysqlmypass";

	$testh = new PDO ("mysql:host=$server;dbname=$database", $db_user, $db_pass);
	$testh->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
	$testh->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
	$sql = "select COUNT(*) from DATA";
	$pstatement = $testh->prepare($sql);
	$success = $pstatement->execute();
	$num = $pstatement->fetchColumn();

	$sql = "select * from DATA";
	$pstatement = $testh->prepare($sql);
	$success = $pstatement->execute();
	$results = $pstatement->fetchAll();

	// $temp = array();
	// for ($i=0; $i < $num; $i++) { 
	// 	$temp[$i] = json_encode($results[$i]);
	// }
	// return $temp;
	return $results;
}

$function = $_POST['function'];    
$response = array();
$data = "";
$result = "";

switch($function) {
	 case('sendData'):
		$response['result'] = 'sendData yet to implemented';
		break;	
	
	 case('recData'):
		$response['result'] = fetchImage();
		break;
}    
echo json_encode($response);
?>