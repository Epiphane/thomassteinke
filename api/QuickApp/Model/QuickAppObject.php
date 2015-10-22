<?

/*
 * QuickAppObject class file
 *
 * @author Thomas Steinke
 */
namespace QuickApp\Model;

use \Data\DAO;

class QuickAppObject extends \Data\Model
{
   public static $tableName = "objects";

   public static $columns = [
      "app_id" => "int",
      "name" => "string",
      "table" => "string",
      "fields" => "string",
      "associations" => "string"
   ];

   public static $const_columns = [
      "app_id", "name", "table", "fields", "associations"
   ];

   public $app_id;
   public $name;
   public $table;
   public $fields;
   public $associations;

   public static function build($assoc) {
      $model = forward_static_call_array([parent, "build"], func_get_args());

      $model->fields = json_decode($model->fields);
      $model->associations = json_decode($model->associations);

      return $model;
   }

   public function save() {
      $model = get_called_class();
      $dao = new \Data\DAO($model);
   
      if ($this->_new) {
         // Create new table
         $table = $dao->createTable($this->fields);
         if (!$table) {
            return null;
         }

         $this->table = $table["table"];
         $this->associations = $table["associations"];

         return $dao->create($this);
      }
      else {
         return $dao->update($this, $model);
      }
   }

   public function generatePrimaryKey($rerun = null) {}

   public function read() {
      return [
         "app_id" => $this->app_id,
         "name" => $this->name,
         "fields" => $this->fields,
      ];
   }
}