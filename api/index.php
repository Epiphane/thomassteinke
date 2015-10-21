<?php

require_once(__DIR__ . "/init.php");

use \QuickApp\Model\QuickAppModel;

header('Access-Control-Allow-Origin: *');

function _log($message) {
   file_put_contents(__DIR__ . "/requests.log", $message . "\n", FILE_APPEND);
}

$url = substr($_SERVER["REQUEST_URI"], strlen("/api/"));
_log($_SERVER["REQUEST_METHOD"] . " " . $url);
if (strrpos($url, "?"))
   $url = substr($url, 0, strrpos($url, "?"));
$path = explode("/", $url);

$params = json_decode(file_get_contents("php://input"), TRUE);

$handler = new \Endpoint\BaseEndpoint();
$handler->respond($_SERVER["REQUEST_METHOD"], $path, $params);

?>
