<?

/*
 * Endpoint class file
 *
 * @author Thomas Steinke
 */

namespace Endpoint;

use \QuickApp\Model\QuickAppModel;
use \Data\Filter;

class ObjectEndpoint extends CRUDEndpoint
{
   protected static $Model = "\QuickApp\Model\QuickAppObject";

   public function restrictGet($request) {
      $request->Filter[] = new Filter("app_id", $this->params[0]);
   }
}
