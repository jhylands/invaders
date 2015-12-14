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
//echo join(",",$rates);
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
    <table border="1" style="width:100%;height:100%;">
        <tr>
            <td colspan="2" width="50%">Buy Sell Box</td>
            <td colspan="1" width="50%">Graph</td>
        </tr>
        <tr>
            <td rowspan="2" width="33%">listbox</td>
            <td colspan="2"><img src="images/moon.jpg" width="100%" height="100%"></td>
        </tr>
        <tr height="20px">
            <td colspan="2" width="50%"><marquee>Newsweek</marquee></td>
        </tr>
    </table>
</body>
</html>

