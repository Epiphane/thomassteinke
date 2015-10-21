<?

/*
 * QuickAppObject class file
 *
 * @author Thomas Steinke
 */
namespace QuickApp\Model;

use \Data\DAO;

class QuickAppObjectSkeleton extends \Data\Model
{
   public static $tableName = "";
   public static $columns = [];
   public static $const_columns = [];

   public $assoc = [];

   public static function build($assoc) {
      $model = new QuickAppObjectSkeleton();

      $model->assoc = $assoc;

      return $model;
   }

   public function read() {
      return $this->assoc;
   }
}