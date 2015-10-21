<?

/*
 * QuickAppModel class file
 *
 * @author Thomas Steinke
 */
namespace QuickApp\Model;

use \Data\DAO;

class QuickAppModel extends \Data\Model
{
   public static $tableName = "apps";

   public static $columns = [
      "id" => "int",
      "name" => "string",
      "hash" => "string",
      "owner_id" => "int"
   ];

   public static $const_columns = [
      "id", "hash", "name"
   ];

   public $object_id;
   public $hash;
   public $name;
   public $owner_id;
}
