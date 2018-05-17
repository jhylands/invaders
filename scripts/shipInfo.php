<?php
$QRY = "SELECT * FROM users,ships,shipTypes,locations,markets WHERE users.FID=ships.OwnerID AND locations.PlaceID=markets.PlaceID AND locations.PlaceID=ships.Location AND ships.ShipType=shipTypes.ShipType AND users.FID=";
//echo $QRY . $_COOKIE['User'];
session_start();
$FID = $_SESSION['User'];
if(isset($_SESSION['User'])){
  $result = mysqli_query($con,$QRY . $FID);
  if(!$result){
      include 'createUser.php';
  }
  while($row = mysqli_fetch_array($result)){
    $ShipCode = $row['ShipCode'];
  }
  
}else{
  echo "ERROR user not logged in! <a href='login.php'>Click here</a> to login.";
}
