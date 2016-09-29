<?

/*
 * Endpoint class file
 *
 * @author Thomas Steinke
 */

namespace Endpoint;

use \QuickApp\Model\QuickAppModel;

class TacoEndpoint extends Endpoint
{
   public static $prefixes = ['Fresco', 'XXL', 'spicy', 'cheesy', 'beefy', 'chili cheese', 'chipotle', 'express', 'mini', 'double crispy', 'loaded'];
   public static $meats = ['steak', 'chicken', 'Doritos', 'beef', 'carne asada', 'caramel apple'];
   public static $adjectives = ['5-layer', '7-layer', 'beefy', 'fiesta', 'crunchy', 'triple', 'grilled', 'volcano', 'baja', 'cinnamon', 'Mexican', 'bean', 'Fritos', 'shredded'];
   public static $foodTypes = ['doubledia', 'quesarrito', 'soft taco', 'crunchwrap', 'burrito', 'taco', 'quesadilla', 'nachoes', 'salad', 'taco salad', 'potatoes', 'Mexican rice', 'Mexican pizza', 'roll-up', 'gordita', 'chalupa'];
   public static $endings = [
      'with cheese' => 0.3, 
      'with rice' => 0.2, 
      'supreme' => 0.4, 
      'with baja blast' => 0.1,
      'crunch' => 0.7
   ];
   public static $ends = ['with cheese', ];

   private function randomFromArray($arr) {
      return $arr[rand(0, count($arr) - 1)];
   }

   public function randomProduct() {
      $prefix = $this->randomFromArray(self::$prefixes);
      $meat = $this->randomFromArray(self::$meats);
      $adjective = $this->randomFromArray(self::$adjectives);
      $foodType = $this->randomFromArray(self::$foodTypes);

      $name = (rand(0, 2) === 0) ? $prefix . ' ' : '';
      $name .= $meat . ' ' . $adjective . ' ' . $foodType;

      $ends = [];
      foreach (self::$endings as $end) {
         array_push($ends, $end);
      }

      $ending = $this->randomFromArray($ends);
      if (rand(0, 10) / 10 < self::$endings[$ending])
         $name .= ' ' . $ending;

      return $name;
   }

   public function getMessage() {
      $message = "Try our new " . $this->randomProduct() . "!";
      $price = rand(50, 899) / 100;

      return $message . " Only \$" . $price . "!";
   }

   public function respond($method, $path, $params) {
      if (isset($_GET["json"])) {
         $this->sendResponse([
            "text" => $this->getMessage()
         ]);
      }
      else {
         echo $this->getMessage();
      }
   }
}
