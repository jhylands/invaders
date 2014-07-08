<?php
$QRY = "SELECT * FROM users,ships,shipTypes,locations WHERE users.FID=ships.OwnerID AND locations.PlaceID=ships.Location AND ships.ShipType=shipTypes.ShipType AND users.FID=";
$result = mysqli_query($con,$QRY . $_COOKIE['User']);
while($row = mysqli_fetch_array($result)){
	$ship = $row;
}
?>
