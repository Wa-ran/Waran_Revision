<?php
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

function putCard($body, $token) {
  $ch = curl_init();

  curl_setopt($ch, CURLOPT_URL,'http://localhost:3008/Card');
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
  curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
  curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json', $token));
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

  curl_exec($ch);
  $res = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  curl_close($ch);

  return $res;
};

$authorization = "Authorization: ".$user['token'];
$call = (array)getCard($card['id'], $authorization);

if($call) {
  try {
    mkdir("images/".$user['id']);

    $file_name = key($_FILES);
    $target_file = "images/".$user['id']."/".$card['id']."_".$file_name.".webp";

    if ($call[$file_name."_image"] == 1) {
      $iMagick = new Imagick($_FILES[$file_name]["tmp_name"]);
      $iMagick->scaleImage(500, 0);
      $iMagick->stripImage();
      $iMagick->writeImage($target_file);
      echo "\nAll good !";
    } else {
      unlink($target_file);
      echo "\nFile deleted.";
    }
  }
  catch (\Throwable $th) {
    $card[$file_name."_image"] = 0;
    $data = array(
      "user" => json_encode($user),
      "card" => json_encode($card),
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
?>