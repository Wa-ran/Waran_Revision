<?php
$res = $app->response;

$res->headers->set('Content-Type', 'application/json', 'multipart/form-data');
$res->headers->set('Access-Control-Allow-Origin', '*');
$res->headers->set('Access-Control-Allow-Credentials', 'true');
$res->headers->set('Access-Control-Max-Age', '60');
$res->headers->set('Access-Control-Allow-Headers', 'AccountKey,x-requested-with, Content-Type, origin, authorization, accept, client-security-token, host, date, cookie, cookie2');
$res->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

if ( ! $req->isOptions()) {
  $user = $_POST["user"];
  $user = json_decode($user, true);
  $card = $_POST["card"];
  $card = json_decode($card, true);

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

  function sendCard($body, $token) {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL,'http://localhost:3008/Card');
    if ($card['id']) curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
    else curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json', $token));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    curl_exec($ch);
    $res = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    return $res;
  };

  $authorization = "Authorization: ".$user['token'];
  $time = '_'.time();
  $dir = substr($time, -3);
  $file_name = key($_FILES);
  echo $FILES;
  $target_file = "images/".$dir."/".$time.$card['id'].".webp";   
  $card[$file_name] = $target_file;
  $data = array(
    "user" => $user,
    "card" => $card,
  );
  sendCard($data, $authorization);
  $call = (array)getCard($card['id'], $authorization);

  if($call) {
    try {
      mkdir("images/".$dir);

      $iMagick = new imagick($_FILES[$file_name]["tmp_name"]);
      $iMagick->scaleImage(500, 0);
      $iMagick->stripImage();
      $iMagick->writeImage($target_file);
      echo "\nAll good !";
    }
    catch (\Throwable $th) {
      unlink($target_file);
      $card[$file_name] = "Image non trouvée";
      $card[$file_name."_image"] = 0;
      $data = array(
        "user" => $user,
        "card" => $card,
      );
      echo "\nPb with image write... ";
      if (putCard($data, $authorization) == 200) {
        echo "\nDTB unwriting ok.";
      } else {
        echo "\nDTB unwriting failed...";
      }
    }
  } else {
    echo "\nServer failed...";
  }
} else {
  return $res;
}
?>