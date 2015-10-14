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
      "name" => "string"
   ];

   public static $const_columns = [
      "app_id", "name"
   ];

   public $app_id;
   public $name;

   public function createPrimaryKey($rerun = null) {
      return $this->app_id;
   }
}