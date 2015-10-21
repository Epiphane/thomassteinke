<?

/*
 * QuickAppObjectController class file
 *
 * @author Thomas Steinke
 */
namespace QuickApp\Controller;

use \QuickApp\Model\QuickAppObject;

class QuickAppObjectController
{
   public static function createDAO($ObjectType) {
      $dao = new \Data\DAO("\QuickApp\Model\QuickAppObjectSkeleton");

      $associations = $ObjectType->associations;
      $fields = $ObjectType->fields;
      $columns = [];
      foreach ($associations as $niceName => $generatedName) {
         $columns[$generatedName] = $fields->$niceName;
      }

      $dao->tableName = $ObjectType->table;
      $dao->setColumns($columns);

      return $dao;
   }

   public static function translateToObject($ObjectType, $model) {
      $result = [];

      if ($model instanceof \Data\Collection) {
         foreach ($model->objects as $object) {
            $result[] = self::translateToObject($ObjectType, $object);
         }

         return $result;
      }

      $properties   = $model->read();
      $associations = $ObjectType->associations;
      $fields       = $ObjectType->fields;
      foreach ($associations as $niceName => $generatedName) {
         $result[$niceName] = $properties[$generatedName];
      }

      return $result;
   }

   public static function createObject($ObjectType, $params) {
      $dao = self::createDAO($ObjectType);
      $associations = $ObjectType->associations;

      $model = new \QuickApp\Model\QuickAppObjectSkeleton();

      foreach ($params as $column => $value) {
         $colName = $associations->$column;
         $model->$colName = $value;

         $model->assoc[$colName] = $value;
      }

      return self::translateToObject($ObjectType, $dao->create($model));
   }

   public static function getObjects($ObjectType) {
      $dao = self::createDAO($ObjectType);

      $request = new \Data\Request();
      if ($sortProperty = $_GET["sort"]) {
         $sortProperty = $ObjectType->associations->$sortProperty;

         if (!$sortProperty) {
            return [
               "success" => false,
               "message" => "Property " . $_GET["sort"] . " does not exist on model"
            ];
         }

         $request->Sort[] = new \Data\Sort($sortProperty, strtoupper($_GET["dir"]));
      }

      if (is_numeric($_GET["limit"])) {
         $request->limit = $_GET["limit"];
      }

      return self::translateToObject($ObjectType, $dao->find($request));
   }
}