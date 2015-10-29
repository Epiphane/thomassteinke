<?

/*
 * FightInfoMessage class file
 *
 * @author Thomas Steinke
 */

namespace Fight\Attachment;

class FightInfoMessage extends FightMessage
{
   public function __construct($message, $color = null) {
      parent::__construct($message, $color ?: "#23D5E4");
   }

   public function toAttachment($user) {
      return parent::toAttachment();
   }
}
