<?php

class AppObject {
  public $objectInfo, $objectName, $objectTable;

  public function AppObject($mysqli, $app_id, $table) {
    $this->objectTable = $app_id . "_" . $table;
    $objQuery = $mysqli->prepare("SELECT * FROM " . $this->objectTable . " WHERE 1");

    $objQuery->execute();

    $this->objectInfo = $objQuery->get_result()->fetch_fields();
    $this->objectName = $table;

  }

  public function request($mysqli, $request, $method) {
    if(sizeof($request) == 0) { // IT'S ME!!
      switch($method) {
        case "GET":
          $this->show();
          break;
        case "POST":
          // Add new object
          $this->create($mysqli, $_POST);
          break;
        case "PUT":
          break;
      }
    }
  }

  public function show() { ?>
    <h1><?= $this->objectName ?></h1>
    <h3>Fields:</h3>
    <ul>
      <?php foreach($this->objectInfo as $field) { ?>
        <li><?= $field->name ?></li>
      <? } ?>
    </ul>
  <? }

  public function create($mysqli, $params) {
    $fieldList = "";
    $qMarkList = NULL;
    $fieldData = array("");
    foreach($this->objectInfo as $field) {
      // Param in the object
      if($params[$field->name] != NULL) {
        array_push($fieldData, $params[$field->name]);
        $fieldData[0] .= "s";

        if($qMarkList) {
          $qMarkList .= ", ?";
          $fieldList .= ", `" . $field->name . "`";
        }
        else {
          $qMarkList = "?";
          $fieldList .= "`" . $field->name . "`";
        }
      }
    }
    $createQuery = $mysqli->prepare("INSERT INTO " . $this->objectTable . " (" . $fieldList . ") VALUES (" . $qMarkList . ")");
    call_user_func_array(array($createQuery, 'bind_param'), refValues($fieldData));

    $createQuery->execute();

    header('HTTP/1.0 201 Created');
    header('Location: /api');
  }
}

?>
