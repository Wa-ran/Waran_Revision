<?php
header('Access-Control-Allow-Origin: http://195.110.59.46:3008');
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
echo "\n";
echo json_encode($data);
echo "\n";
echo $image1;
echo "\n";
echo $image2;
echo "\n";
if (file_exists('images/'.$image1.'.webp')) {
  unlink('images/'.$image1.'.webp');
  echo "\nRecto deleted.";
} else {
  echo "\nNothing to delete (recto).";
};
if(file_exists('images/'.$image2.'.webp')) {
  unlink('images/'.$image2.'.webp');
  echo "\nVerso deleted.";
}
else {
  echo "\nNothing to delete (verso).";
};
die();
?>