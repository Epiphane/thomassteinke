<?

/*
 * Endpoint class file
 *
 * @author Thomas Steinke
 */

namespace Endpoint;

use \QuickApp\Model\QuickAppModel;

class QuickEndpoint extends CRUDEndpoint
{
   protected static $Model = "\QuickApp\Model\QuickAppModel";
   protected static $subpaths = [
      "objects" => "\Endpoint\ObjectEndpoint"
   ];

   public function shouldPassOn($method, $path) {
      return count($path) >= 2 && $path[0] !== "find";
   }

   public function get($path) {
      if (count($path) === 0 || strlen($path[0]) === 0) {
         return $this->callMethod("find", new \Data\Request());
      }
      elseif ($path[0] === "find") {
         $request = new \Data\Request();
         $request->Filter[] = new \Data\Filter("name", $path[1]);

         return $this->callMethod("find", $request);
      }
      elseif (is_numeric($path[0])) {
         return $this->callMethod("findById", $path[0]);
      }
   }
}
