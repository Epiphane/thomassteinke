<?

/*
 * Endpoint class file
 *
 * @author Thomas Steinke
 */

namespace Endpoint;

use \User\Controller\UserController;
use \User\Controller\UserTokenController;

class UserEndpoint extends CRUDEndpoint
{
   public function get($path) {
      var_dump($path);
   }

   public function post($path, $params) {
      if (!$path[0]) {
         return UserController::createUser($params["email"], $params["password"]);
      }
      else if ($path[0] === "login") {
         if (isset($params["token"])) {
            $token = UserTokenController::findToken($params["token"]);

            if (!$token) {
               $this->sendStatus(403);
               return false;
            }
            else {
               return $token;
            }
         }

         $user = UserController::getUserByEmail($params["email"]);

         if ($user && UserController::verifyPassword($user, $params["password"])) {
            $token = UserTokenController::generateToken($user->id);
            return $token;
         }
      }

      return null;
   }
}
