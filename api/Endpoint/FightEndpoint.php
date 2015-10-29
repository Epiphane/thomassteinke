<?

/*
 * Endpoint class file
 *
 * @author Thomas Steinke
 */

namespace Endpoint;

use Fight\Model\FightAppModel;
use Fight\Controller\FightController;
use Fight\Controller\FightPrefsController;

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

   public function get($path) {
      if (!$_GET["code"]) {
         echo '<a href="https://slack.com/oauth/authorize?scope=post&client_id=11088904788.13274729057"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"></a>';

         return false;
      }
      else {
         $request = curl_init("https://slack.com/api/oauth.access");

         $params = [
            "client_id" => "11088904788.13274729057",
            "client_secret" => "b8d1c5e5875ea444adcbc595c52ee26c",
            "code" => $_GET["code"]
         ];

         curl_setopt($request, CURLOPT_POST, true);
         curl_setopt($request, CURLOPT_POSTFIELDS, $params);
         curl_setopt($request, CURLOPT_RETURNTRANSFER, 1);

         $response = json_decode(curl_exec($request), true);

         var_dump($response);

         $app = FightAppModel::build([
            "team" => $response["team_id"],
            "api_token" => $response["access_token"],
            "channel" => $response["incoming_webhook"]["channel"]
         ]);

         return $app->save();
      }
   }

   public function post($path, $params) {
      $user = FightController::findUser($_POST["team_id"], $_POST["user_id"]);
      if ($_POST["user_name"] !== $user->slack_name) {
         $user->update(["slack_name" => $_POST["user_name"]]);
      }

      $result = FightController::fight($user, $_POST["channel_id"], $_POST["trigger_word"], $_POST["text"]);

      if (!is_array($result)) {
         $result = [$result];
      }
      if (is_string($result)) {
         $result = [new \Fight\Attachment\FightMessage($result)];
      }

      $app = FightAppModel::findById($_POST["team_id"]);
      $prefs = FightPrefsController::findById($_POST["channel_id"]);
      if (!$prefs->api_token && !$app) {
         $attachments = [];
         foreach ($result as $update) {
            $attachments[] = $update->toString();
         }

         return implode("\n", $attachments);
      }
      else {
         $request = curl_init("https://slack.com/api/chat.postMessage");

         $attachments = [];
         foreach ($result as $update) {
            if (!is_a($update, "\Fight\Attachment\FightAttachment")) {
               var_dump($update);
            }
            $ap = $update->toAttachment($user);
            if ($ap) $attachments[] = $ap;
         }

         $params = [
            "token" => $app ? $app->api_token : $prefs->api_token,
            "channel" => $_POST["channel_id"],
            "username" => "Fight Club",
            "attachments" => json_encode($attachments),
            "text" => ""
         ];

         curl_setopt($request, CURLOPT_POST, true);
         curl_setopt($request, CURLOPT_POSTFIELDS, $params);
         curl_setopt($request, CURLOPT_RETURNTRANSFER, 1);

         return json_decode(curl_exec($request), true);
      }
   }
}
