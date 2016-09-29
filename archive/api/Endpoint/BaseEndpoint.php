<?

/*
 * Endpoint class file
 *
 * @author Thomas Steinke
 */

namespace Endpoint;

use \QuickApp\Model\QuickAppModel;

class BaseEndpoint extends Endpoint
{
   public function respond($method, $path, $params) {
      if ($path[0] === "quick") {
         $handler = new \Endpoint\QuickEndpoint();
      }
      elseif ($path[0] === "user") {
         $handler = new \Endpoint\UserEndpoint();
      }
      elseif ($path[0] === "yesno") {
         $handler = new \Endpoint\YesNoEndpoint();
      }
      elseif ($path[0] === "taco") {
         $handler = new \Endpoint\TacoEndpoint();
      }
      elseif ($path[0] === "fight") {
         $handler = new \Endpoint\FightEndpoint();
      }
      elseif ($path[0] === "slack") {
         $handler = new \Endpoint\SlackEndpoint();
      }

      if ($handler) {
         $handler->respond($_SERVER["REQUEST_METHOD"], array_slice($path, 1), $params);
      }
      else {
         $this->sendStatus(404);
      }
   }
}
