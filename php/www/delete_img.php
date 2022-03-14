<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
$method = $_SERVER['REQUEST_METHOD'];
if ($method == "OPTIONS") {
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
  header("HTTP/1.1 200 OK");
  die();
}

$data = json_decode(substr($_SERVER['PATH_INFO'], 1), true);
$user = $data["user"];
$image1 = $data["images"][0];
$image2 = $data["images"][1];

function getCard($id, $token) {
  $ch = curl_init();

  curl_setopt($ch, CURLOPT_URL,'http://localhost:3008/Card/card/'.$id);
  curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json', $token));
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

  $res = json_decode(curl_exec($ch));
  if (curl_getinfo($ch, CURLINFO_HTTP_CODE) != 200) {
    $res = false;
  }
  curl_close($ch);

  return $res;
};

$authorization = "Authorization: ".$user['token'];

$call = (array)getCard($card['id'], $authorization);

if($call) {
  if (file_exists($image1.'.webp')) {
    unlink($image1.'.webp');
    echo "\nRecto deleted.";
  } else {
    echo "\nNothing to delete (recto).";
  };
  if(file_exists($image2.'.webp')) {
    unlink($image2.'.webp');
    echo "\nVerso deleted.";
  }
  else {
    echo "\nNothing to delete (verso).";
  };
}
?>