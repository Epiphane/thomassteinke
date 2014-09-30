<?php
include("db.php");

include("quick.php");

$request = array_slice(explode("/", $_SERVER[REQUEST_URI]), 2);
$method = $_SERVER[REQUEST_METHOD];

switch($request[0]) {
  case "quick":
    quickAndEasy($connect, $request, $method);
    break;
  default:
    echo "Welcome to my secret hideout!";
}

?>
