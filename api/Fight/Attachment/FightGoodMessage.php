<?

/*
 * FightGoodMessage class file
 *
 * @author Thomas Steinke
 */

namespace Fight\Attachment;

class FightGoodMessage extends FightMessage
{
   public function __construct($message, $color = null) {
      parent::__construct($message, $color ?: "good");
   }
}
