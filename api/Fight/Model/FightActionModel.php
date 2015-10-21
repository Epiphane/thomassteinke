<?

/*
 * FightModel class file
 *
 * @author Thomas Steinke
 */
namespace Fight\Model;

use \Data\DAO;

class FightActionModel extends \Data\Model
{
   public static $tableName = "fight_action";

   public static $columns = [
      "fight_id" => "int",
      "action_id" => "int",
      "description" => "string"
   ];

   public static $const_columns = [
      "fight_id", "action_id"
   ];

   public $fight_id;
   public $action_id;
   public $description;

   // Not implemented yet you dingus
   public static $pKey = ["fight_id", "action_id"];

   public function createPrimaryKey() {
      $dao = new \Data\DAO(get_called_class());

      return 1 + $dao->query("SELECT COUNT(*) FROM " . self::$tableName . " WHERE fight_id = ?", $this->fight_id);
   }

   public static function build($assoc) {
      $m = get_called_class();
      $model = new $m();

      foreach($assoc as $col => $val) {
         $model->$col = $val;
      }

      if (!$model->action_id) {
         $model->action_id = $model->createPrimaryKey();
      }

      return $model;
   }

   public static function findById($fight_id, $action_id) {
      $request = new \Data\Request();
      $request->Filter[] = new \Data\Filter("fight_id", $fight_id);
      $request->Filter[] = new \Data\Filter("action_id", $action_id);

      return self::findOne($request);
   }
}
