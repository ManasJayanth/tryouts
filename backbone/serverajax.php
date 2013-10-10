<?php
define('idlimit', 6);

function createTest($data) {
	$tname = $data[0];
	$totalQs = $data[1];
	$neg = $data[2] == 'on' ? true: false;
	$timelimit = $data[3];
	include('serverspecific.php');
	$id = md5(uniqid(rand()));
	$str = rand();
	$str = substr($str, 0, idlimit);
	$str = "testid" . $str;
	$testh = new PDO ("mysql:host=$server;dbname=$database", $db_user, $db_pass);
	$testh->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
	$testh->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
	$sql = "select COUNT(*) from questions";
	$pstatement = $testh->prepare($sql);
	$success = $pstatement->execute();
	$num = $pstatement->fetchColumn();
	$Qnos = array();
	for ($i=0; $i < $totalQs; $i++) { 
		$temp = (rand() % $num) + 1;
		$j=0;
		while($j < sizeof($Qnos)) { 
			if ($temp == $Qnos[$j]) {
				$temp = (rand() % $num) + 1;
				$j = 0;
				continue;
			}
			$j++;
		}
		$Qnos[$i] = $temp;
	}
	$sql = "insert into test(testname,questions,testnos,timelimit,negmarking) values(:tname,:questions,:totalQs,:timelimit,:neg)";
	$pstatement = $testh->prepare($sql);
	$success = $pstatement->execute(array(':tname' => $tname, ':questions' => implode(";",$Qnos), ':totalQs' => $totalQs, ':neg' => $neg,':timelimit' => $timelimit ));

	$sql = "select COUNT(*) from test";
	$pstatement = $testh->prepare($sql);
	$success = $pstatement->execute();
	$num = $pstatement->fetchColumn();
	return 'Your TestID : ' . $num;
}
$function = $_POST['function'];    
$response = array();
$data = "";
$result = "";

switch($function) {
	 case('sendData'):
		$data = $_POST['data'];
		$data = explode(";", $data);
		$response['result'] = createTest($data);
		break;	
	
	 case('recData'):
		$response['result'] = $result;
		break;
}    
echo json_encode($response);
?>