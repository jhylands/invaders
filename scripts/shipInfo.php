<?php
include 'sql.php';
$QRY = "SELECT * FROM users,ships,shipTypes,locations,Markets WHERE users.FID=ships.OwnerID AND locations.PlaceID=Markets.PlaceID AND locations.PlaceID=ships.Location AND ships.ShipType=shipTypes.ShipType AND users.FID=";
//echo $QRY . $_COOKIE['User'];
$result = mysqli_query($con,$QRY . $_COOKIE['User']);
while($row = mysqli_fetch_array($result)){
	$ship = $row;
}
//echo $ship;
?>
