<?php

class App {
  public $name, $hash, $key;
  public $appInfo;

  public function App($mysqli, $hash, $key) {
    $appQuery = $mysqli->prepare("SELECT * FROM apps WHERE hash = ?");

    $appQuery->bind_param("s", $hash);
    $appQuery->execute();
    $result = $appQuery->get_result();

    //var_dump($result->fetch_assoc());
  }

  public function request($request, $method) {
    if(sizeof($request) == 0) { // IT'S ME!!
      switch($method) {
        case "GET":
          //send404AndDie();
          break;
        case "POST":
          // Baddd
          send404AndDie();
          break;
        case "PUT":
          break;
      }
    }
  }

  public function show() {
    echo "Hi!";
  }
}

?>
