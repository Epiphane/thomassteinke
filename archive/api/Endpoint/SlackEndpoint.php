<?

/*
 * SlackEndpoint class file
 *
 * @author Thomas Steinke
 */

namespace Endpoint;

use Fight\SlackWrapper;

class SlackEndpoint extends Endpoint
{
   public function get($path) {
      if (!$_GET["code"]) {
         echo file_get_contents("serve/fight.html");
      }
      else {
         SlackWrapper::addApp();
      }

      return false;
   }

   public function post($path, $params) {
      SlackWrapper::respond();
      return false;
   }
}
