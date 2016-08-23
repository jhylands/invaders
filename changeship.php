<?php
include 'scripts/sql.php';
include 'scripts/security.php';
include 'scripts/shipInfo.php';
?>
<html>
<head>
<title>Changing ship</title>
<style>
body
{
background-color:black;
color:white;
}
</style>
<script>
function useShip(shipCode){
		goto("Changeship.php?shipCode=" + shipCode);
}
</script>
</head>
<body>
<center><h1>Ship Yard</h1><center>
<input type="button" value="Back to orbit" onclick="window.location.replace('orbit.php')" />
<table border="1" style="width:100%;">
<tr>
	<td><img src="images/earth_img.jpg" width="250px" height="250px" /></td>
	<td><h2><?php echo $ship['ShipName']; ?></h2></td>
	<td style="vertical-align:text-bottom;"><input type="button" value="Use Ship" onclick="useShip(
<?php echo $ship['ShipCode']; ?>
)" /></td>
</tr>
</table>
</body>
</html>
