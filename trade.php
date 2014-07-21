<?php 
include 'scripts/sql.php';
include 'scripts/security.php';
include 'scripts/shipInfo.php';
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
$QRY = "SELECT * FROM resources, tradeRates WHERE tradeRates.ResourceID = resouces.ResourceID";
$result = mysqli_query($con,$QRY);
$flip = true;
$catcher = "";
$i=0;
while($row=mysqli_fetch_array($result)){
	$names[$i] = $row['Names'];
	if($flip){
		$catcher = $row['Rate'];
		$flip=true;
	}else{
		$catcher = $catcher . "," . $row['Rate'];
	}
}
echo $catcher;
?>);
function updateAnount(){
var amount=document.getElementById('amount').value;
if(amount!=""){
	var res1 = document.getElementById('firstResource').value;
	var res2 = document.getElementById('secondResouce').value;
	revenue = stock[res2]/stock[res1]*amount*(1-tax);
	document.getElementById('result').innerHTML=revenue;
}
}
</script>
</head>
<body>
<center><h1>Trading information</h1></center>
<marquee></marquee>
<input type="number" id="amount" />
<select id="res1">
<?php
for($i=0;$i<=names.length;$i++;){
	echo "<option id='" . $i . "'>" . $names[$i] . "</option>";
}
?>
</select>
<select id="res2">
<?php
for($i=0;$i<=names.length;$i++;){
	echo "<option id='" . $i . "'>" . $names[$i] . "</option>";
}
?>
</select>
<br />
<p>This will yeild <x id='result'></x></p>
<input type="button" value="Trade on this" />
</body>
</html>

