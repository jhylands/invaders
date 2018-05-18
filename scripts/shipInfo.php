<?php
$QRY = "SELECT * FROM OldUsers,ships,shipTypes,locations,markets WHERE OldUsers.FID=ships.OwnerID AND locations.PlaceID=markets.PlaceID AND locations.PlaceID=ships.Location AND ships.ShipType=shipTypes.ShipType AND users.FID=";
//echo $QRY . $_COOKIE['User'];
session_start();
$FID = $user->data()->id;
$result = mysqli_query($con,$QRY . $FID);
if(!$result){
    include 'createUser.php';
}
while($row = mysqli_fetch_array($result)){
  $ShipCode = $row['ShipCode'];
}
