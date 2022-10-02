<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
header("Access-Control-Allow-Methods: POST, OPTIONS");
$method = $_SERVER['REQUEST_METHOD'];
if ($method == "OPTIONS") {
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
  header("HTTP/1.1 200 OK");
  die();
}

$imgs = $_POST["imgs"];
$imgs = json_decode($imgs, true);

$del = $_POST["del"];
$del = json_decode($del, true);

foreach ($del as &$value) {
  if (file_exists('images/'.$value.'.webp')) unlink('images/'.$value.'.webp');
}

function writeImg($img_path, $pos) {
  $dir = substr($img_path, 0, 3);
  try {
    mkdir("images/".$dir);
    $iMagick = new imagick();
    $iMagick->readImage($_FILES['files']['tmp_name'][$pos]);
    if ($iMagick->getImageWidth() > 500) $iMagick->scaleImage(500, 0);
    if ($iMagick->getImageHeigth() > 500) $iMagick->scaleImage(0, 500);
    $iMagick->stripImage();
    $iMagick->writeImage('images/'.$img_path.".webp");
    echo "\nAll good !";
  }
  catch (\Throwable $th) {
    unlink('images/'.$img_path.".webp");
    echo "\nPb with image write : ".$img_path;
  }
};

writeImg($imgs[0], 0);
if (count($_FILES['files']['name']) == 2) writeImg(writeImg($imgs[1], 1));
die();
?>