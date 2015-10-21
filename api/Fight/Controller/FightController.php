<?

/*
 * FightController class file
 *
 * @author Thomas Steinke
 */
namespace Fight\Controller;

use \Fight\Model\FightUserModel;
use \Fight\Model\FightModel;
use \Fight\Model\FightActionModel;

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
            "health" => 100
         ]);

         return $user->save();
      }

      return $user;
   }

   public static function findUserByTag($team_id, $user_tag) {
      $user_id = substr($user_tag, strlen("<@"), strlen($user_tag) - 3);

      return self::findUser($team_id, $user_id);
   }

   public static function runFight($fight, $user, $otherFight, $opponent, $action, $command) {
      if ($action === "fight") {
         return "You're already fighting " . $opponent->tag() . ". If you would like to forefeit, type `forefeit`.";
      }
      elseif ($action === "forefeit") {
         $fight->status = -1;
         $otherFight->status = 1;

         if (!$fight->save()) return SERVER_ERR . "3";
         if (!$otherFight->save()) return SERVER_ERR . "4";

         return "You gave up! " . $opponent->tag() . " wins!";
      }
      else {
         return $command;
         // return $this->runFight($existing, $user, $trigger, $cmdParts);
      }
   }

   public static function fight($user, $trigger, $command) {
      $existing = FightModel::findWhere("user_id", $user->user_id);
      $cmdParts = explode(" ", $command);

      if (!$existing) {
         if ($trigger === "fight") {
            if (count($cmdParts) === 2) {
               $opponent = FightController::findUserByTag($user->team_id, $cmdParts[1]);
               $otherExisting = FightModel::findWhere("user_id", $opponent->user_id);

               if ($otherExisting) {
                  return "Sorry, " . $opponent->tag() . " is already in a fight. Hurry up already, " . $opponent->tag() . "!";
               }

               $fight1 = FightModel::build([
                  "user_id" => $user->user_id,
                  "status" => 0
               ]);
               if (!$fight1->save()) return SERVER_ERR . "1";
            
               $fight2 = FightModel::build([
                  "fight_id" => $fight1->fight_id,
                  "user_id" => $opponent->user_id,
                  "status" => 0
               ]);
               if (!$fight2->save()) return SERVER_ERR . "2";

               return "Bright it on, " . $opponent->tag() . "!!";
            }
            else {
               return "Usage: `fight XXX`";
            }
         }
         else {
            return "Sorry, you're not fighting anyone right now. Type `fight XXX` to start a fight";
         }
      }
      else {
         $request = new \Data\Request();
         $request->Filter[] = new \Data\Filter("fight_id", $existing->fight_id);
         $request->Filter[] = new \Data\Filter("user_id", $existing->user_id, "!=");

         $otherFight = FightModel::findOne($request);
         $opponent = FightUserModel::findWhere("user_id", $otherFight->user_id);

         return self::runFight($existing, $user, $otherFight, $opponent, $trigger, $cmdParts);
      }
   }
}