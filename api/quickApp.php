<?php

class App {
  public $appInfo, $appObjects;

  public function App($mysqli, $hash, $key) {
    $appQuery = $mysqli->prepare("SELECT * FROM apps WHERE hash = ?");

    $appQuery->bind_param("s", $hash);
    $appQuery->execute();
    $this->appInfo = $appQuery->get_result()->fetch_assoc();

    $objQuery = $mysqli->prepare("SELECT name FROM objects WHERE app_id = ?");

    $objQuery->bind_param("i", $this->appInfo["id"]);
    $objQuery->execute();
    $this->appObjects = $objQuery->get_result()->fetch_assoc();
  }

  public function request($mysqli, $request, $method) {
    // IT'S ME!!
    if(sizeof($request) == 0) {
      switch($method) {
        case "GET":
          $this->show();
          break;
        case "POST":
          echo "New object";
          // Baddd
          //send404AndDie();
          break;
        case "PUT":
          break;
      }
    }
    // Pass it on!
    else {
      // Is it an object?
      if(array_search($request[0], $this->appObjects) != null) {
        // Found object! Pass on the request
        $object = new AppObject($mysqli, $this->appInfo["id"], $request[0]);
        $request = array_slice($request, 1);

        // Pass on request!
        $object->request($mysqli, $request, $method);
      }
      else {
        echo("Error: App Object not found");
      }
    }
  }

  public function show() { ?>
    <h1><?= $this->appInfo["name"] ?></h1>
    <h3>Objects:</h3>
    <ul>
      <?php foreach($this->appObjects as $obj) { ?>
        <li><a href="<?= $_SERVER[REQUEST_URI] ?>/<?= $obj ?>"><?= $obj ?></a></li>
      <? } ?>
    </ul>
  <? }
}

?>
