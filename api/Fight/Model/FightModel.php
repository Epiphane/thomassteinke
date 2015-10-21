<?

/*
 * FightModel class file
 *
 * @author Thomas Steinke
 */
namespace Fight\Model;

use \Data\DAO;

class FightModel extends \Data\Model
{
   public static $tableName = "fight";

   public static $columns = [
      "fight_id" => "int",
      "user_id" => "int",
      "status" => "int"
   ];

   public static $const_columns = [
      "fight_id", "user_id"
   ];

   public $fight_id;
   public $user_id;
   public $status;
}
