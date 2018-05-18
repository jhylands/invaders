<?php
$QRY = "SELECT * FROM OldUsers,ships,shipTypes,locations,markets WHERE OldUsers.FID=ships.OwnerID AND locations.PlaceID=markets.PlaceID AND locations.PlaceID=ships.Location AND ships.ShipType=shipTypes.ShipType AND OldUsers.FID=";
$FID = $user->data()->id;
$result = mysqli_query($con,$QRY . $FID);
if(!$result){
    echo "<script>document.write('" . $QRY. "');</script>";
    die();
}
while($row = mysqli_fetch_array($result)){
  $ShipCode = $row['ShipCode'];
}
