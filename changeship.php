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
<table style="position:absolute;width:100%;height:100%;top:0px;left:0px;">
<tr>
	<td><img src="<?php //ships image ?>" ?></td>
	<td><h2><?php echo $ship['ShipName']; ?></h2></td>
	<td style="vertical-align:text-bottom;"><input type="button" value="Use Ship" onclick="useShip(<?php echo ships['ShipCode']; ?>)" /></td>
</tr>
</table>
</body>
</html>
