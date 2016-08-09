<?php
//include 'sql.php';
$QRY = "SELECT * FROM users,ships,shipTypes,locations,markets WHERE users.FID=ships.OwnerID AND locations.PlaceID=markets.PlaceID AND locations.PlaceID=ships.Location AND ships.ShipType=shipTypes.ShipType AND users.FID=";

if($_COOKIE['User']){
  $result = mysqli_query($con,$QRY . $_COOKIE['User']);
  while($row = mysqli_fetch_array($result)){
    $ShipCode = $row['ShipCode'];
  }
}else{
  echo "ERROR user not logged in";
}

function classLoader($class) {
    include '/home/a9206732/public_html/invaders-master/PHPClass/' . $class . '.php';
}
spl_autoload_register(classLoader);

?>
