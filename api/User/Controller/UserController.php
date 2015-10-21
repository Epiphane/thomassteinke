<?

/*
 * QuickAppObjectController class file
 *
 * @author Thomas Steinke
 */
namespace User\Controller;

use \User\Model\UserModel;
use \User\Model\UserTokenModel;

class UserController
{
   public static function createUser($email, $password) {
      if (!$email || !$password) {
         return [
            "success" => false,
            "message" => "Email or password missing"
         ];
      }

      $pw = self::saltPassword("md5", $password);

      $user = UserModel::build([
         "email" => $email,
         "password" => $pw,
         "method" => "md5"
      ]);

      return $user->save();
   }

   public static function getUserByEmail($email) {      
      $request = new \Data\Request();
      $request->Filter[] = new \Data\Filter("email", $email);

      $user = UserModel::findOne($request);

      return $user;
   }

   public static function verifyPassword($user, $password) {
      return $user->password === self::saltPassword($user->method, $password);
   }

   public static function saltPassword($method, $password, $salt = "") {
      if ($method === "md5") {
         return md5($password);
      }
      else {
         throw new \Exception("Method " . $method . " doesn't exist");
      }
   }
}