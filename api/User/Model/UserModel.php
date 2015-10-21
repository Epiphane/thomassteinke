<?

/*
 * UserModel class file
 *
 * @author Thomas Steinke
 */
namespace User\Model;

use \Data\DAO;

class UserModel extends \Data\Model
{
   public static $tableName = "user";

   public static $columns = [
      "id" => "int",
      "email" => "string",
      "password" => "string",
      "method" => "string"
   ];

   public static $const_columns = [
      "id", "email"
   ];

   public $id;
   public $email;
   public $password;
   public $method;

   // public static function build($assoc) {
   //    $model = parent::build($assoc);

   //    // Search for existing properties
   //    $request = new \Data\Request();
   //    $request->Filter[] = new \Data\Filter("object_id", $model->object_id);
      
   //    $props = GameObjectPropertyModel::find($request);
   //    $properties = array();
   //    foreach ($props as $property) {
   //       $properties[$property->property] = $property;
   //    }

   //    $model->properties = self::setProperties($model, $model->properties, $properties);

   //    // Search for existing ownerships
   //    $model->ownerships = GameObjectOwnershipModel::find($request);

   //    return $model;
   // }

   // public function createPrimaryKey() {
   //    return md5($this->game . ":" . $this->name . ":" . $this->region);
   // }

   // public static function findByNameRegionGame($name, $regions = array(), $game = null) {
   //    $request = new \Data\Request();

   //    for ($i = 0; $i < count($regions); $i ++) {
   //       $regions[$i] = str_replace("%20", " ", $regions[$i]);
   //    }

   //    $name = str_replace("%20", " ", $name);

   //    $request->Filter[] = new \Data\Filter("name", $name);
   //    if (is_array($regions) && count($regions) > 0)
   //       $request->Filter[] = new \Data\InFilter("region", $regions);
   //    if ($game)
   //       $request->Filter[] = new \Data\Filter("game", $game);

   //    return self::findOne($request);
   // }

   // public function setProperty($prop, $val) {
   //    // Look through existing properties
   //    foreach ($this->properties as $property) {
   //       if ($property->property === $prop) {
   //          $property->update([
   //             "value" => $val
   //          ]);

   //          return;
   //       }
   //    }

   //    // No existing property
   //    $property = GameObjectPropertyModel::build([
   //       "object_id" => $this->object_id,
   //       "property" => $prop,
   //       "value" => $val
   //    ]);

   //    $property->save();
   // }

   // public function getProperty($prop) {
   //    // Look through existing properties
   //    foreach ($this->properties as $property) {
   //       if ($property->property === $prop) {
   //          return $property->value;
   //       }
   //    }

   //    return null;
   // }

   // public function update($attrs) {
   //    $myProps = array();

   //    if ($attrs["name"]) {
   //       if ($attrs["name"] !== $this->name) {
   //          $attrs["nickname"] = $attrs["name"];
   //       }
   //    }

   //    // Don't update restricted stuff
   //    foreach (self::$const_columns as $restricted) {
   //       unset($attrs[$restricted]);
   //    }

   //    // Move properties to where they belong
   //    $properties = $attrs["properties"] ?: $attrs;
   //    foreach ($properties as $prop => $val) {
   //       if (self::$columns[$prop]) {
   //          $myProps[$prop] = $val;
   //       }
   //       else {
   //          if ($this->properties[$prop]) {
   //             $result = $this->properties[$prop]->update([
   //                "value" => $val
   //             ]);

   //             if (!$result) {
   //                throw new \Exception("Property " . $prop . " failed to update");
   //             }
   //          }
   //          else {
   //             $this->properties[$prop] = $property = \GameObject\Model\GameObjectPropertyModel::build([
   //                "object_id" => $this->object_id,
   //                "property" => $prop,
   //                "value" => $val
   //             ]);
      
   //             $result = $property->save();
   //             if (!$result) {
   //                print_r($property);
   //                throw new \Exception("Property " . $prop . " failed to create");
   //             }
   //          }
   //       }
   //    }

   //    unset($attrs["properties"]);
   //    foreach ($attrs as $prop => $val) {
   //       if (self::$columns[$prop]) {
   //          $myProps[$prop] = $val;
   //       }
   //       else {
   //          throw new \Exception("Property " . $prop . " is not part of GameObjectModel. Please add to 'properties'");
   //       }
   //    }

   //    if (count($myProps) > 0) {
   //       return parent::update($myProps);
   //    }

   //    return $this;
   // }
}
