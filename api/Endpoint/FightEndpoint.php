<?

/*
 * Endpoint class file
 *
 * @author Thomas Steinke
 */

namespace Endpoint;

use Fight\APIWrapper;

class FightEndpoint extends Endpoint
{
   public function isEndpoint($path) {
      return false;
   }

   public function get($path) {
      if (!$_GET["code"]) {
         echo file_get_contents("serve/fight.html");
      }
      else {
         // APIWrapper::addApp();
      }

      return false;
   }

   // Example params
   /*
   Path: "fight"
   [
      "text" => "<@USLACKBOT>,
      "user_id" => "U0B2QPTNU",
      "user_name" => "thomassteinke",
      "team_id" => "T0B2LSLP6",
      "channel_id":"C0CS03RK4"
   ]
   */
   public function post($path, $params) {
      APIWrapper::respond();
      return false;
   }
}
