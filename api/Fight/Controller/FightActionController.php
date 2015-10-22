<?

/*
 * FightActionController class file
 *
 * @author Thomas Steinke
 */
namespace Fight\Controller;

use \Fight\Model\FightUserModel;
use \Fight\Model\FightModel;
use \Fight\Model\FightItemModel;
use \Fight\Model\FightActionModel;
use \Fight\Controller\FightController;
use \Fight\Controller\FightItemController;

class FightActionController
{
   public static function _fight($fight, $user, $otherFight, $opponent, $action, $command) {
      return "You're already fighting " . $opponent->tag() . ". If you would like to forefeit, type `forefeit`.";
   }
   
   public static function _forefeit($fight, $user, $otherFight, $opponent, $action, $command) {
      FightActionController::registerAction($user, $fight->fight_id, $user->tag() . " forefeits to " . $opponent->tag() . "!");

      if (!$fight     ->update(["status" => "lose"])) return SERVER_ERR . "3";
      if (!$otherFight->update(["status" => "win" ])) return SERVER_ERR . "4";

      return "You gave up! " . $opponent->tag() . " wins!";
   }

   public static function _status($fight, $user, $otherFight, $opponent, $action, $command) {
      if (count($command) === 1) {
         $info = "Status update for " . $user->tag() . " (level " . $user->level . ")";
         $info .= " - Health: " . $fight->health;
         $info .= "\n\nYou are fighting " . $opponent->tag() . " (level " . $opponent->level . ")";
         $info .= " - Health: " . $otherFight->health;

         return $info . "\nType `status help` for more status options";
      }
      else {
         return FightController::status($user, $command[1]);
      }
   }

   public static function _use($fight, $user, $otherFight, $opponent, $action, $command) {
      $action = $command[1];

      $item = FightItemModel::findOneWhere([
         "name" => $action,
         "user_id" => $user->user_id
      ]);

      if (!$item) {
         $result = $action . " not available! Options:";

         $items = FightItemModel::findWhere([
            "user_id" => $user->user_id
         ]);

         foreach ($items->objects as $item) {
            $result .= "\n`" . $item->name . "`";
         }

         return $result;
      }
      else {
         $action = $user->tag() . " uses " . $item->name . "!";

         $itemResult = FightItemController::useItem($item, $user, $fight, $opponent, $otherFight);
         
         if (!$itemResult) {
            return $action . "\n But it doesn't do anything!";
         }

         $action = $action . "\n" . $itemResult;
         FightActionController::registerAction($user, $fight->fight_id, $action);

         return $action;
      }
   }

   public static function registerAction($user, $fight_id, $description) {
      $action = FightActionModel::build([
         "fight_id" => $fight_id,
         "description" => $description,
         "actor_id" => $user->user_id
      ]);

      return $action->save();
   }
}