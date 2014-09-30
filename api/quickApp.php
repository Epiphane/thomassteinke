<?php

class App {
  public $name, $hash, $key;
  public $appInfo;

  public function App($mysqli, $hash, $key) {
    $appQuery = $mysqli->prepare("SELECT * FROM apps WHERE hash = ?");

    $appQuery->bind_param("s", $hash);
    $appQuery->execute();

    var_dump($appQuery->fetch());
  }

  public function request($request, $method) {

  }

  public function show() {
    echo "Hi!";
  }
}

?>
