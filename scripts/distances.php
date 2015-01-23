<?php
function getTravelDistance($place1ID,$place2ID){
	return abs(getOrbitalRadius($Place1ID)-getOrbitalRadius($Place2ID));
}
function getOrbitalRadius($PlaceID){
	$result = mysqli_query($con,"SELECT * FROM locations WHERE PlaceID=" . $_GET['PlaceID']);
	while($row=mysqli_fetch_array($result)){
		$orbitalRadi = $row['OrbitalRadius'];
	}
	return $orbitalRadi;
}
?>