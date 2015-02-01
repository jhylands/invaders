<?php 
include 'scripts/sql.php';
include 'scripts/security.php';
include 'scripts/shipInfo.php';
include 'scripts/resourceInfo.php';
?>
<html>
<head>
<title>Trading</title>
<style>
body
{
background-color:black;
color:white;
}
</style>
<script>
var stock = new Array(<?php
$names = getResources($con,'Name',$ship['PlaceID']);
$rates = getResources($con,'Rate',$ship['PlaceID']);
$id = getResources($con,'ResourceID',$ship['PlaceID']);
echo join(",",$rates);
?>);
function updateAmount(){
var amount=document.getElementById('amount').value;
if(amount!=""){
	var res1 = document.getElementById('firstResource').value;
	var res2 = document.getElementById('secondResouce').value;
	revenue = stock[res2]/stock[res1]*amount*(1-tax);
	document.getElementById('result').innerHTML=revenue;
}
}
function doTrade(){
	
}
</script>
</head>
<body>
<div style="position: absolute;top:10px;left: 10px;"><a href="orbit.php"><h1>Back to orbit</h1></a></div>
<center><h1>Trading information</h1></center>
<marquee></marquee>
<input type="number" id="amount" />
<select id="res1" onchange="updateAmount();">
<?php
for($i=0;$i<count($names);$i++){
	echo "<option id='" . $id[$i] . "'>" . $names[$i] . "</option>";
}
?>
</select>
<select id="res2" onchange="updateAmount();">
<?php
for($i=0;$i<count($names);$i++){
	echo "<option id='" . $id[$i] . "'>" . $names[$i] . "</option>";
}

?>
</select>
<br />
<p>This will yeild <x id='result'></x></p>
<input type="button" value="Trade on this" onclick="doTrade();"/>
</body>
</html>

