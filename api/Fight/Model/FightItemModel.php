<?

/*
 * FightItemModel class file
 *
 * @author Thomas Steinke
 */
namespace Fight\Model;

class FightItemModel extends \Data\Model
{
   public static $tableName = "fight_item";

   public static $columns = [
      "item_id" => "int",
      "user_id" => "int",
      "name" => "string",
      "stats" => "string",
      "type" => "string"
   ];

   public static $const_columns = [
      "item_id"
   ];

   public $item_id;
   public $user_id;
   public $name;
   public $stats;
   public $type;

   public static function build($assoc) {
      $model = forward_static_call_array([parent, "build"], func_get_args());

      if (is_string($model->stats)) {
         $model->stats = json_decode($model->stats, true);
      }

      return $model;
   }

   public function shortdesc() {
      foreach ($this->stats as $stat => $value) {
         return $stat . "=" . $value;
      }

      return "";
   }
}
