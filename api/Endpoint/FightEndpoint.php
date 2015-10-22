<?

/*
 * Endpoint class file
 *
 * @author Thomas Steinke
 */

namespace Endpoint;

use Fight\Controller\FightController;

class FightEndpoint extends Endpoint
{
   // Example payload from Slack
   /*
   {  
      "token":"zuE4F5lLtrHkL7DKbpiwFH4m",
      "team_id":"T0B2LSLP6",
      "team_domain":"team-pc",
      "service_id":"12884001970",
      "channel_id":"C0CS03RK4",
      "channel_name":"testslack",
      "timestamp":"1445368606.000013",
      "user_id":"U0B2QPTNU",
      "user_name":"thomassteinke",
      "text":"fight dude",
      "trigger_word":"fight"
   }
   */
   public function wrapSlack($text) {
      if ($text === null) return [];

      if (!is_string($text)) {
         $text = json_encode($text);
      }

      return [
         "text" => " " . $text
      ];
   }

   public function fight($params) {
      $user = FightController::findUser($params["team_id"], $params["user_id"]);

      return $user->tag() . ": " . FightController::fight($user, $params["channel_id"], $params["trigger_word"], $params["text"]);
   }

   public function post($path, $params) {
      return $this->wrapSlack($this->fight($_POST));
   }
}
