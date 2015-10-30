<?

/*
 * SlackEndpoint class file
 *
 * @author Thomas Steinke
 */

namespace Endpoint;

use Endpoint\FightEndpoint;

class SlackEndpoint extends Endpoint
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
   public function get($path) {
      if ($path[0] === "fight") {
         return call_user_func_array([new FightEndpoint(), "get"], func_get_args());
      }
      else {
         return ["text" => "Sorry, integration " . $path[0] . " not found"];
      }
   }

   public function post($path, $params) {
      if ($path[0] === "fight") {
         $params = array_merge($params ?: [], $_POST);
         $path = $params["trigger_word"];
         $text = substr($params["text"], 6);

         if ($path === "fight") {
            $command = explode(" ", $text)[0];
            if (FightEndpoint::isEndpoint($command)) {
               $path = $command;
               $text = substr($text, strlen($command) + 1);
            }
         }

         $handler = new FightEndpoint();
         return $handler->post($path, $params);/*[
            "text" => $text,
            "user_id" => $params["user_id"],
            "user_name" => $params["user_name"],
            "team_id" => $params["team_id"],
            "channel_id" => $params["channel_id"]
         ]);*/
      }
      else {
         return ["text" => "Sorry, integration " . $path[0] . " not found"];
      }
   }
}
