<?

/*
 * UserTokenModel class file
 *
 * @author Thomas Steinke
 */
namespace User\Model;

use \Data\DAO;

class UserTokenModel extends \Data\Model
{
   public static $tableName = "access_token";

   public static $columns = [
      "user_id" => "int",
      "token" => "string",
      "expires" => "string"
   ];

   public static $const_columns = [
      "user_id", "token"
   ];

   public static $pKey = "token";

   public $user_id;
   public $token;
   public $expires;

   public static function drop($request) {
      $dao = new \Data\DAO(get_called_class());

      return $dao->dropPermanently($request);
   }
}
