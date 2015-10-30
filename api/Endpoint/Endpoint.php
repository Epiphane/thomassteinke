<?

/*
 * Endpoint class file
 *
 * @author Thomas Steinke
 */

namespace Endpoint;

use \Data\Collection;
use \Data\Model;

class Endpoint
{
   protected $params = [];

   public function __construct($params = []) {
      $this->params = $params;
   }

   public function sendResponse($response, $status = 200) {
      $status_header = 'HTTP/1.1 ' . $status . ' ' . getStatusCodeMessage($status);
      header($status_header);
      header('Content-Type: application/json');

      echo json_encode($response);
   }

   public function sendStatus($status = 200) {
      $status_header = 'HTTP/1.1 ' . $status . ' ' . getStatusCodeMessage($status);
      header($status_header);
      header('Content-Type: text/html');

      if ($status === 404) {
         echo file_get_contents("serve/404.html");
      }
   }

   public function respond($method, $path, $params) {
      if ($method === "GET") {
         $this->respondWith($this->get($path));
      }
      elseif ($method === "POST") {
         $this->respondWith($this->post($path, $params));
      }
      elseif ($method === "PUT") {
         $this->respondWith($this->put($path, $params));
      }
      elseif ($method === "DELETE") {
         $this->respondWith($this->delete($path));
      }
      else {
         $this->sendStatus(404);
      }
   }

   public function respondWith($result) {
      if ($result) {
         if ($result instanceof Collection || $result instanceof Model) {
            $this->sendResponse($result->read());
         }
         else {
            $this->sendResponse($result);
         }
      }
      elseif ($result !== false) {
         $this->sendStatus(404);
      }
   }

   public function get($path) {
      return null;
   }

   public function post($path, $params) {
      return null;
   }

   public function put($path, $params) {
      return null;
   }

   public function delete($path) {
      return null;
   }
}

// From http://www.gen-x-design.com/archives/create-a-rest-api-with-php/ 
$codes = parse_ini_file(__DIR__ . "/codes.ini");
function getStatusCodeMessage($status) {
   return (isset($codes[$status])) ? $codes[$status] : '';
}