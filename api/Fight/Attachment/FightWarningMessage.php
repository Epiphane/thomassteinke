<?

/*
 * FightWarningMessage class file
 *
 * @author Thomas Steinke
 */

namespace Fight\Attachment;

class FightWarningMessage extends FightMessage
{
   public function __construct($message, $color = null) {
      parent::__construct($message, $color ?: "warning");
   }
}
