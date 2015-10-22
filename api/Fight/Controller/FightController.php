<?

/*
 * FightController class file
 *
 * @author Thomas Steinke
 */
namespace Fight\Controller;

use \Fight\Model\FightUserModel;
use \Fight\Model\FightModel;
use \Fight\Model\FightItemModel;
use \Fight\Model\FightActionModel;
use \Fight\Controller\FightActionController;

define("SERVER_ERR", "Sorry! Server Error! Code: ");

class FightController
{
   public static function findUser($team_id, $user_id) {
      $request = new \Data\Request();
      $request->Filter[] = new \Data\Filter("team_id", $team_id);
      $request->Filter[] = new \Data\Filter("name", $user_id);

      $user = FightUserModel::findOne($request);

      if (!$user) {
         // Create user
         $user = FightUserModel::build([
            "team_id" => $team_id,
            "name" => $user_id,
            "level" => 1,
            "experience" => 0
         ]);

         if (!$user->save()) return null;

         // Give them a basic attack
         $attack = FightItemModel::build([
            "user_id" => $user->user_id,
            "name" => "Attack",
            "stats" => [ "physical" => 5 ],
            "type" => "move"
         ]);

         $attack->save();
      }

      return $user;
   }

   public static function findUserByTag($team_id, $user_tag) {
      if (strpos($user_tag, "<@") === false) {
         return false;
      }

      $user_id = substr($user_tag, strlen("<@"), strlen($user_tag) - 3);

      return self::findUser($team_id, $user_id);
   }

   public static function fight($user, $channel_id, $trigger, $command) {
      if ($command === "fight help") {
         return self::displayHelp();
      }

      $existing = FightModel::findOneWhere([
         "user_id" => $user->user_id,
         "channel_id" => $channel_id,
         "status" => "progress"
      ]);
      $cmdParts = explode(" ", $command);

      if (!$existing) {
         if ($trigger === "fight") {
            if (count($cmdParts) === 2 && $cmdParts[1] !== "help") {
               $opponent = FightController::findUserByTag($user->team_id, $cmdParts[1]);
               if (!$opponent) {
                  return "Sorry, `" . $cmdParts[1] . "` is not recognized as a name";
               }

               $otherExisting = FightModel::findOneWhere([
                  "user_id" => $opponent->user_id,
                  "channel_id" => $channel_id,
                  "status" => "progress"
               ]);

               if ($otherExisting) {
                  return "Sorry, " . $opponent->tag() . " is already in a fight. Maybe take this somewhere else?";
               }

               $fight1 = FightModel::build([
                  "user_id" => $user->user_id,
                  "channel_id" => $channel_id,
                  "status" => "progress"
               ]);
               if (!$fight1->save()) return SERVER_ERR . "1";
            
               $fight2 = FightModel::build([
                  "fight_id" => $fight1->fight_id,
                  "user_id" => $opponent->user_id,
                  "channel_id" => $channel_id,
                  "status" => "progress"
               ]);
               if (!$fight2->save()) return SERVER_ERR . "2";

               FightActionController::registerAction($user, $fight1->fight_id, $user->tag() . " challenges " . $opponent->tag() . " to a fight!");

               return "Bright it on, " . $opponent->tag() . "!!";
            }
            else {
               return "Usage: `fight XXX`\nType `fight help` for more commands";
            }
         }
         else if ($trigger === "status") {
            return FightController::status($user, $cmdParts[1]);
         }
         else {
            return "Sorry, you're not fighting anyone right now. Type `fight XXX` to start a fight!";
         }
      }
      else {
         $request = new \Data\Request();
         $request->Filter[] = new \Data\Filter("fight_id", $existing->fight_id);
         $request->Filter[] = new \Data\Filter("channel_id", $channel_id);
         $request->Filter[] = new \Data\Filter("user_id", $existing->user_id, "!=");

         $otherFight = FightModel::findOne($request);
         $opponent = FightUserModel::findOneWhere([ "user_id" => $otherFight->user_id ]);

         return self::runFight($existing, $user, $otherFight, $opponent, $trigger, $cmdParts);
      }
   }

   public static $COMMANDS = [
      "`fight @XXX` : Pick a fight with @XXX",
      "`forefeit` : Quit your current fight (counts as a loss)",
      "`status` : Get your health, your opponent's health, and other info about the fight",
      "`use item|move` : Use an item in your inventory",
      "`do ______` : Try and do something"
   ];
   public static function displayHelp() {
      return "Available Commands:\n\n" . implode("\n", self::$COMMANDS);
   }

   public static function runFight($fight, $user, $otherFight, $opponent, $action, $command) {
      $request = new \Data\Request();
      $request->Sort[] = new \Data\Sort("action_id", "DESC");
      $request->Filter[] = new \Data\Filter("fight_id", $fight->fight_id);
      $request->Filter[] = new \Data\Filter("created_at", date('Y-m-d H:i:s', strtotime('-5 minutes')), ">=");
      $lastAction = FightActionModel::findOne($request);

      if (!in_array($action, ["status", "forefeit"]) && $lastAction->actor_id === $user->user_id) {
         return "It's not your turn! (if your opponent does not go for 5 minutes, it will become your turn)";
      }

      $action = "_" . $action;

      return FightActionController::$action($fight, $user, $otherFight, $opponent, $action, $command);
   }

   public static function status($user, $section = "") {
      if (!$section) {
         $info = "Status update for " . $user->tag() . " (level " . $user->level . ")";

         return $info . "\nType `status help` for more status options";
      }
      elseif ($section === "help") {
         return "```status\nstatus help\nstatus moves\nstatus items```";
      }
      elseif ($section === "items" || $section === "moves") {
         $items = FightItemModel::findWhere([
            "user_id" => $user->user_id,
            "type" => substr($section, 0, 4)
         ]);

         if ($items->size() === 0) {
            return "You have no " . $section . ".";
         }
         else {
            $output = "Your " . $section . ", " . $user->tag() . ":";

            foreach ($items->objects as $index => $item) {
               $output .= "\n " . ($index + 1) . ". " . $item->name . " - " . $item->shortdesc();
            }

            return $output;
         }
      }
      else {
         return "Command " . $section . " not found.";
      }
   }
}