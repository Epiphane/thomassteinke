<?

/*
 * Endpoint class file
 *
 * @author Thomas Steinke
 */

namespace Endpoint;

use \QuickApp\Model\QuickAppModel;

class YesNoEndpoint extends Endpoint
{
   private function getYesNo() {
      $ch = curl_init();
      $timeout = 5;
      curl_setopt($ch, CURLOPT_URL, "http://yesno.wtf/api");
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
      curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
      $data = json_decode(curl_exec($ch));
      curl_close($ch);

      return $data;
   }

   private static $exclamations = [ "Are you mental?!", "I can't believe you're leaving this up to chance...", 
      "You know this one!" ];
   private static $noSayings = [ "Absolutely not", "No way in helllllll", "I'd rather eat my own foot",
      "My little sister knows that's a no", "N-O", "When pigs fly" ];
   private static $yesSayings = [ "Absolutely", "Naturally", "You know it to be true", "Without a doubt",
      "OBVIOUSLY", "Literally everyone says yes", "Y-E-S" ];
   private static $nameCalling = [ "you big dingus", "idiot", "oh so holy programmer", "get back to work",
      "a-hole", "jerkface", "now stop bothering me", "got it?" ];

   private function randFromArray($arr) {
      return $arr[rand(0, count($arr) - 1)];
   }

   private function getMessage($response) {
      $sayings = [];

      if ($response === "yes") {
         $sayings = self::$yesSayings;
      }
      elseif ($response === "no") {
         $sayings = self::$noSayings;
      }
      else {
         "WOAH YOU DIDN'T GET YES OR NO? DANGGG BRO (response for " . $response . " isnt implemented bro)";
      }

      $message = "";

      if (rand(0, 10) <= 2) {
         $message .= $this->randFromArray(self::$exclamations) . " ";
      }

      $message .= $this->randFromArray($sayings);

      if (rand(0, 10) <= 4) {
         $message .= ", " . $this->randFromArray(self::$nameCalling);
      }

      return $message . "!";
   }

   public function respond($method, $path, $params) {
      $data = $this->getYesNo();

      $this->sendResponse([
         "text" => $this->getMessage($data->answer) . " - " . $data->image
      ]);
   }
}
