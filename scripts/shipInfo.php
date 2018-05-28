<?php
include __DIR__ . '/../users/init.php';
$db = DB::getInstance();
$QRY = "SELECT * FROM OldUsers,ships,shipTypes,locations,markets WHERE OldUsers.FID=ships.OwnerID AND locations.PlaceID=markets.PlaceID AND locations.PlaceID=ships.Location AND ships.ShipType=shipTypes.ShipType AND OldUsers.FID=?";
$FID = $user->data()->id;
$results = $db->query($QRY, [$FID]);
if(!$results){
    //something needs to go in here for error checking
    echo "<script>document.write('" . $QRY. "');</script>";
    die();
}
$ShipCode =$results->first()->ShipCode;
