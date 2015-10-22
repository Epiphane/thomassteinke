<?

/*
 * FightUserModel class file
 *
 * @author Thomas Steinke
 */
namespace Fight\Model;

class FightUserModel extends \Data\Model
{
   public static $tableName = "fight_user";

   public static $columns = [
      "user_id" => "int",
      "team_id" => "string",
      "name" => "string",
      "level" => "int",
      "experience" => "int"
   ];

   public static $const_columns = [
      "user_id", "team_id"
   ];

   public $user_id;
   public $team_id;
   public $name;
   public $level;
   public $experience;

   public function tag() {
      return "<@" . $this->name . ">";
   }
}
