<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
header("Access-Control-Allow-Methods: POST, OPTIONS");
$method = $_SERVER['REQUEST_METHOD'];
if ($method == "OPTIONS") {
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
  header("HTTP/1.1 200 OK");
  die();
}

$server_address = 'http://195.110.59.46:3008';
$user = $_POST["user"];
$user = json_decode($user, true);
$card = $_POST["card"];
$card = json_decode($card, true);

function getCard($address, $id, $token) {
  $ch = curl_init();

  curl_setopt($ch, CURLOPT_URL, $address.'/Card/card/'.$id);
  curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json', $token));
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

  $res = json_decode(curl_exec($ch));
  if (curl_getinfo($ch, CURLINFO_HTTP_CODE) != 200) {
    $res = false;
  }
  curl_close($ch);

  return $res;
};

function sendCard($address, $body, $token) {
  $ch = curl_init();

  curl_setopt($ch, CURLOPT_URL, $address.'/Card');
  if ((bool)$body['card']['id']) {
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
  } else {
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
  }
  curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
  curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json', $token));
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

  curl_exec($ch);
  $res = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  curl_close($ch);

  return $res;
};

function writeImg($dir_name, $img_name, $face, $pos, $address) {
  $write = true;
  try {
    mkdir("images/".$dir_name);

    $iMagick = new imagick();
    $iMagick->readImage($_FILES['files']['tmp_name'][$pos]);
    $iMagick->scaleImage(500, 0);
    $iMagick->stripImage();
    $iMagick->writeImage($img_name);
    echo "\nAll good !";
  }
  catch (\Throwable $th) {
    $write = false;
    unlink($img_name);
    $card[$face] = "Image non trouvée";
    $card[$face."_image"] = null;
    $data = array(
      "user" => $user,
      "card" => $card,
    );
    echo "\nPb with image write... ";
    if (sendCard($address, $data, $authorization) == 200) {
      echo "\nDTB unwriting ok.";
    } else {
      echo "\nDTB unwriting failed...";
    }
  }
  return $write;
};

$authorization = "Authorization: ".$user['token'];

$time = time();
$dir = substr($time, -3);
$file_name = "images/".$dir."/".$time.$card['id'];
$target_file = $file_name.".webp";

if ((bool)$card['recto_image'] && !file_exists($file_name)) {
  $card['recto_image'] = $file_name;
  $card_face = 'recto';
} else {
  $card['verso_image'] = $file_name;
  $card_face = 'verso';
}

if (count($_FILES['files']['name']) == 2) {
  $time2 = time() + 1;
  $dir2 = substr($time2, -3);
  $file_name2 = "images/".$dir2."/".$time2.$card['id'];
  $target_file2 = $file_name2.".webp";
  $card['verso_image'] = $file_name2;
}

$data = array(
  "user" => $user,
  "card" => $card,
);

$call = (array)getCard($server_address, $card['id'], $authorization);

if($call) {
  $img_array = array($card['recto_image'], $card['verso_image']);
  if (!in_array($call['recto_image'], $img_array)) unlink($call['recto_image'].'.webp');
  if (!in_array($call['verso_image'], $img_array)) unlink($call['verso_image'].'.webp');
  writeImg($dir, $target_file, $card_face, 0, $server_address);
  if (count($_FILES['files']['name']) == 2) writeImg($dir2, $target_file2, 'verso', 1, $server_address);
  if (sendCard($server_address, $data, $authorization) != 200) {
    unlink($target_file);
    if ($target_file2) unlink($target_file2);
    echo "\nBad server response";
    die();
  }
} else {
  echo "\nServer failed...";
}
die();
?>