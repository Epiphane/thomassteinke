<?

/*
 * Endpoint class file
 *
 * @author Thomas Steinke
 */

namespace Endpoint;

use \QuickApp\Model\QuickAppModel;
use \User\Controller\UserTokenController;
use \QuickApp\Controller\QuickAppObjectController;
use \Data\Filter;

if (!function_exists('getallheaders')) 
{ 
   function getallheaders() { 
      $headers = ''; 
      foreach ($_SERVER as $name => $value) { 
         if (substr($name, 0, 5) == 'HTTP_') { 
            $headers[str_replace(' ', '-', ucwords(strtolower(str_replace('_', ' ', substr($name, 5)))))] = $value; 
         } 

         if ($name === "REDIRECT_HTTP_AUTHORIZATION") {
            $headers["Authorization"] = $value;
         }
      } 
      return $headers; 
   } 
} 

class ObjectEndpoint extends CRUDEndpoint
{
   protected static $Model = "\QuickApp\Model\QuickAppObject";

   public function restrictGet($request) {
      $request->Filter[] = new Filter("app_id", $this->params[0]);
   }

   public function get($path) {
      $result = parent::get($path);

      if (count($path) === 0 || strlen($path[0]) === 0) {
         return $result;
      }
      else {
         return QuickAppObjectController::getObjects($result);
      }
   }

   public function post($path, $params) {
      $app = QuickAppModel::findById($this->params[0]);

      $authorization = getallheaders()["Authorization"];
      $token = substr($authorization, strlen("Bearer "));

      if (!UserTokenController::authenticate($app->owner_id, $token)) {
         $this->sendStatus(403);
         return false;
      }

      if (count($path) === 0 || strlen($path[0]) === 0) {
         $params["app_id"] = $this->params[0];

         if (!$params["fields"]) {
            return [
               "success" => false,
               "message" => "No fields provided"
            ];
         }

         return parent::post($path, $params);
      }
      else {
         $model = parent::get($path);

         if (!$model) {
            return null;
         }

         return QuickAppObjectController::createObject($model, $params);
      }
   }

   public function put($path, $params) {
      var_dump($path);
      var_dump($params);
   }
}
