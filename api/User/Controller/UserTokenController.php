<?

/*
 * QuickAppObjectController class file
 *
 * @author Thomas Steinke
 */
namespace User\Controller;

use \User\Model\UserTokenModel;

class UserTokenController
{
   public static function generateRandomString($length = 10) {
      $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      $charactersLength = strlen($characters);
      $randomString = '';
      for ($i = 0; $i < $length; $i++) {
         $randomString .= $characters[rand(0, $charactersLength - 1)];
      }
      return $randomString;
   }

   public static function findToken($token) {
      $request = new \Data\Request();
      $request->Filter[] = new \Data\Filter("token", $token);
      $request->Filter[] = new \Data\Filter("expires", date("Y-m-d H:i:s"), ">=");

      return UserTokenModel::findOne($request);
   }

   public static function generateToken($user_id) {
      // Clean up any tokens that are expired
      $request = new \Data\Request();
      $request->Filter[] = new \Data\Filter("expires", date("Y-m-d H:i:s"), "<=");
      $res = UserTokenModel::drop($request);

      $token = UserTokenModel::build([
         "user_id" => $user_id,
         "token" => self::generateRandomString(16),
         "expires" => date("Y-m-d H:i:s", strtotime('+24 hours'))
      ]);

      return $token->save();
   }

   public static function authenticate($user_id, $token) {
      $request = new \Data\Request();
      $request->Filter[] = new \Data\Filter("expires", date("Y-m-d H:i:s"), ">=");
      $request->Filter[] = new \Data\Filter("user_id", $user_id);
      $request->Filter[] = new \Data\Filter("token", $token);

      $result = UserTokenModel::findOne($request);

      return $result !== null;
   }
}