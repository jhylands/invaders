<?php
if(!isset($_GET['PlaceID'])){
	exit(404);
}
//include a connection to the database
include 'scripts/sql.php';
//include the genral query from the database
include 'scripts/shipInfo.php';
//needs to bet exported to a sperate file
include 'scripts/distances.php';
$place = new place($con);
$place->fromID($_GET['PlaceID']);
$ship = new ship($con,$ShipCode);
$aTravel = new travel($con);
$fuelReq=$aTravel->getFuelReq($ship->place, $place);
$URL = $ship->place->URL;
$currentPlanetFrame = <<<code
<iframe width="100%" height="100%" src="planetView.php?URL=$URL"></iframe>
code;
$destinationPlanetFrame = <<<code
<iframe width="100%" height="100%" src="planetView.php?URL=$place->URL"></iframe>
code;
if($aTravel->requiresTravel($ship, $place)){
	$page = "<script>window.location.replace('orbit.php');</script>";
}elseif($aTravel->goNoGoForLaunch($ship, $place)){
	if(isset($_GET['go'])){
		if($_GET['go']="true"){
			//update ships location
			$aTravel->move($ship, $place);
                        $currentPlanetFrame="";
                        $destinationPlanetFrame="";
			$page =  "<script>window.location.replace('orbit.php');</script>";
		}
	}else{
                $page = <<<code
                <p>Travel cost:  $fuelReq Helium</p>
		<input type='button' value='Go for launch' onclick='goForLaunch()' /><br />
		<input type='button' value='No go for launch' onclick='noGoForLaunch()' />
code;
        
	}
}else{
	$page = "<p>Not enough fuel to travel to that location!</p><p>Cost: " . $fuelReq . " Helium.</p><p>You only have " . $ship->getResource($aTravel->fuel()) . " <a href='solar.php'>Go Back</a></p>";
}
?>
<html>
<head>
<title>Travel agents</title>
<script>
function goForLaunch(){
	window.location.replace('travel.php?PlaceID=<?php echo $place->ID; ?>&go=true');
}
function noGoForLaunch(){
	window.location.replace('orbit.php');
}
</script>
<style>
body
{
background-color:black;
color:white;
}
</style>
</head>
<body>
<table style="width:100%;height:100%;">
<tr>
<td colspan="3"><center><h1>Travel agents</h1></td></tr>
<tr><td width="30%"><?php echo $currentPlanetFrame;?></td><td width="20%"><center>
<?php
echo $page;
?></center>
</td><td width="30%">
<?php echo $destinationPlanetFrame;?></td></tr>
</table>
</body>
