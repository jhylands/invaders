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
function getResources($con,$row,$PlaceID){
	$query = "SELECT * FROM Markets,tradeRates,resources WHERE tradeRates.ResourceID=resources.ResourceID AND Markets.MarketID=tradeRates.MarketID AND Markets.PlaceID=" . $PlaceID;
	$result = mysqli_query($con, $query);
	$resource = array();
	while($fetcher=mysqli_fetch_array($result)){
		array_push($resource, $fetcher[$row]);
	}
	return $resource;
}
?>