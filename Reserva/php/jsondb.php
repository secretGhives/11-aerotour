<?php

if ($_POST && !empty($_POST['name']) && !empty($_POST['func'])) {

	$func = $_POST['func'];
	$path = 'databases/' . $_POST['name'] . '.json';


	!empty($_POST['data']) ? $func($path, $_POST['data']) : $func($path);

}

function write_file ($path, $jsonstr) {
	$stream = fopen($path, 'w');
	$jsonstr = stripslashes($jsonstr);
	fwrite($stream, $jsonstr);
}

function read_file ($path) {
	if (file_exists($path)) {
		echo file_get_contents($path);
	}
}

?>
