<?

/*
 * Endpoint class file
 *
 * @author Thomas Steinke
 */

namespace Endpoint;

use \QuickApp\Model\QuickAppModel;

class CRUDEndpoint extends Endpoint
{
   protected static $Model = null;
   protected static $subpaths = [];

   protected function callMethod($method, $args) {
      $class = get_called_class();
      $Model = $class::$Model;

      if (func_num_args() > 2 || !is_array($args)) {
         $args = array_slice(func_get_args(), 1);
      }

      return call_user_func_array($Model . "::" . $method, $args);
   }

   public function shouldPassOn($method, $path) {
      return count($path) >= 2;
   }

   public function respond($method, $path, $params) {
      if ($this->shouldPassOn($method, $path)) {
         $this->params[] = $path[0];

         $subpaths = get_called_class();
         $subpaths = $subpaths::$subpaths;

         if ($subpaths[$path[1]]) {
            $responder = new $subpaths[$path[1]]($this->params);

            $responder->respond($method, array_slice($path, 2), $params);
         }
         else {
            $this->sendStatus(404);
         }
      }
      else {
         parent::respond($method, $path, $params);
      }
   }

   /*
    * Adds filters to a FIND
    */
   public function restrictGet($request) {

   }

   public function get($path) {
      if (count($path) === 0 || strlen($path[0]) === 0) {
         $request = new \Data\Request();
         $this->restrictGet($request);

         return $this->callMethod("find", $request);
      }
      else {
         $this->params[] = $path[0];
         return $this->callMethod("findById", $this->params);
      }
   }

   public function post($path, $params) {
      if (count($path) === 0 || strlen($path[0]) === 0) {
         $newObj = $this->callMethod("build", [$params]);

         if ($params["test"]) {
            $newObj = $newObj->read();
            $newObj["saved"] = 0;
         }
         else {
            if (!$newObj->save()) {
               return [
                  "success" => false,
                  "message" => "Object failed to save"
               ];
            }
         }

         return $newObj;
      }
      else {
         return null;
      }
   }
}
