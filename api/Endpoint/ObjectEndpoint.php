<?

/*
 * Endpoint class file
 *
 * @author Thomas Steinke
 */

namespace Endpoint;

use \QuickApp\Model\QuickAppModel;
use \QuickApp\Controller\QuickAppObjectController;
use \Data\Filter;

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
}
