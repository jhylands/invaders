<?php
if(!isset($_GET['PlaceID'])){
	exit(404);
}
include 'scripts/sql.php';
include 'scripts/shipInfo.php';
?>
<html>
<head>
<title>Travel agents</title>
<script>
function goForLaunch(){
	window.location.replace('travel.php?PlaceID=<?php echo $_GET['PlaceID']; ?>&go=true');
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
<tr><td width="30%"><iframe width="100%" height="100%" src="planetView.php?URL=<?php echo $ship['PlanetURL']; ?>"></iframe></td><td width="20%"><center>
<?php
//get travel distance

$result = mysqli_query($con,"SELECT * FROM locations WHERE PlaceID=" . $_GET['PlaceID']);
while($row=mysqli_fetch_array($result)){
	$place = $row;
}
$fuelRequirements = intval(abs(($ship['OrbitalRadius']-$place['OrbitalRadius'])/10000));
if($fuelRequirements==0){
	echo "<script>window.location.replace('orbit.php');</script>";
}elseif($ship['Helium']>=$fuelRequirements){
	if(isset($_GET['go'])){
		if($_GET['go']="true"){
			//update ships location
			mysqli_query($con,"UPDATE ships SET Location=" . $_GET['PlaceID'] . ", Helium=" . ($ship['Helium']-$fuelRequirements) . " WHERE ShipCode=" . $ship['ShipCode']);
			echo "<script>window.location.replace('orbit.php');</script>";
		}
	}else{
		echo "<p>Traval cost: " . $fuelRequirements . " Helium</p>";
		echo "<input type='button' value='Go for launch' onclick='goForLaunch()' /><br />";
		echo "<input type='button' value='No go for launch' onclick='noGoForLaunch()' />";
	}
}else{
	echo "<p>Not enough fuel to travel to that location!</p><p>Cost: " . $fuelRequirements . " Helium.</p><p>You only have " . $ship['Helium'] . " <a href='solar.php'>Go Back</a></p>";
}
?></center>
</td><td width="30%"><iframe width="100%" height="100%" src="planetView.php?URL=<?php echo $place['PlanetURL']; ?>"></iframe></td></tr>
</table>
</body>
