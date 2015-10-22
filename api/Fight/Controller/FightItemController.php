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
use \Fight\Controller\FightActionController;
use \Fight\Controller\FightController;

class FightItemController
{
   public static function useItem($item, $user, $fight, $opponent, $otherFight) {
      // Physical attack
      if ($damage = $item->stats["physical"]) {
         $newHealth = $otherFight->health - $damage;

         if ($newHealth > 0) {
            $otherFight->update([
               "health" => $newHealth
            ]);

            return $opponent->tag() . " now has " . $newHealth . " health.";
         }
         else {
            $fight     ->update(["status" => "win" ]);
            $otherFight->update([
               "health" => $newHealth,
               "status" => "lose"
            ]);

            return $opponent->tag() . " fainted!!";
         }
      }
      else {
         return false;
      }
   }
}