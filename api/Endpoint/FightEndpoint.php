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
   public function isEndpoint($path) {
      return false;
   }

   public function get($path) {
      if (!$_GET["code"]) {
         echo file_get_contents("serve/fight.html");

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
      // Fetch and update user data
      $user = FightController::findUser($params["team_id"], $params["user_id"]);
      if ($params["user_name"] && $params["user_name"] !== $user->slack_name) {
         $user->update(["slack_name" => $params["user_name"]]);
      }

      // return ["text" => " " . $path . " -- " . $params["text"]];

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
