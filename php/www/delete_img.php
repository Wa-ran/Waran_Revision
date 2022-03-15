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
$image1 = $data[0];
$image2 = $data[1];
echo $data;
echo json_encode($data);
echo $image1;
echo $image2;
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
?>