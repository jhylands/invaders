<?php
function getResourceInfo($con,$resource,$PlaceID){
	$QRY = "SELECT * FROM tradeRates,resources,Markets,locations WHERE resources.Name='" . $resource . "' AND resources.ResourceID=tradeRates.ResourceID AND Markets.MarketID=tradeRates.MarketID AND Markets.PlaceID=locations.PlaceID AND locations.PlaceID=" . $PlaceID;
	//echo $QRY;
	$result = mysqli_query($con, $QRY);
	while($row=mysqli_fetch_array($result)){
		$rate = $row['Rate'];
	}
	return $rate;
}

?>