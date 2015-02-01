<?php
include 'scripts/security.php';
include 'scripts/sql.php';
//include consolemods
include 'consolemod/trade.php';
include 'consolemod/cargo.php';
//check for sent information

$result = mysqli_query($con,"SELECT * FROM users WHERE FID=" . $_COOKIE['User']);
while($row=mysqli_fetch_array($result)){
	$userName = $row['Name'];
}

if(isset($_GET['command'])){
echo "<a style='color:#367FCD;'>" . $userName . "></a>" . $_GET['command'] . "<br />";
$command = explode(' ',$_GET['command']);
switch($command[0]){
	case 'help':
		echo "This is your ships console. From here you control communication with other systems in orbit around your current location.<br />You can use the following commands:<br />";
		echo "trade [info|do|help] [Met|He|Ur] [Met|He|Ur] #The trade function allows you to find out trade information.<br />";
		echo "cargo [drop] [item] # The function to view what you currently have in your cargo hold<br />";
		echo "fight #This function takes you to the comabat area for this celectial bodies authoraties where you can get paid to work as a...<br /> ";
		echo "exit #Exit the console and go back to orbit view.<br />";
		echo "clear #This clears the console window<br />";
		//echo "shop [bomb|sheilding|ships] #Things you can buy on $planet<br />";
		break;
	case 'trade':
		echo trade($command);
		break;
	case 'cargo':
		echo cargo($command);
		break;
	case 'fight':
		echo "<script>window.location.replace('combat.php');</script>";
		break;
	case 'exit':
		echo "Bye<script>window.location.replace('orbit.php')</script>";
		break;
	case 'clear':
		break;
	case 'shop':
		switch($command[1]){
			case 'help':
				echo "What you can buy from $planet<br />";
				echo "Bombs<br />";
				echo "Sheilding<br />";
				echo "Ships<br />";
				break;
			case 'bombs':
				//If the $command[2]
			case 'Sheilding':
		}
	default:
		echo "Sorry I didn't understand that. Try typing 'help' for information on the commands to use<br />";
}
exit(404);
}
//fucntion to get the trading information from the server
function getTadeinfo($Res1,$Res2){
if($Res1!="met" && $Res1!="ur" && $Res1!="he"){
	return "Error first resource not understood both materials must be either Met (metal), Ur (Uranium) or He (Helium)";
}elseif($Res1!="met" && $Res1!="ur" && $Res1!="he"){
	return "Error second resource not understood both materials must be either Met (metal), Ur (Uranium) or He (Helium)";
}else{
//both resources are correct 
$result = mysqli_query($con,"SELECT * FROM users,ships,locations WHERE FID=" . $_COOKIE['User'] . " AND users.CurrentShip=ships.ShipCode AND ships.Location = Locations.PlaceID");
while($row=mysqli_fetch_array($result)){
	$ship = $row;
}
return $ship['PlaceName'] . " is currently trading " . $Res1 . "," . $Res2 . " at " . $ship['FeHe'];
}
}//end function
?>
<html>
<head>
<title>Console</title>
<style>
body
{
	background-color:black;
	color:#F0F0F0;
	font-family: "Lucida Console";
	font-size:18px;
}
input
{
width:100%;color:#F0F0F0;background-color:black;border:0;font-size:18pt;
}
</style>
<script>
var commands = ['help'];
var i=0;
function run(e){
	if(e.keyCode==13){
		var command = document.getElementById('writer').value;
		commands.push(command);
		switch(command){
			case 'clear':
				document.getElementById('console').innerHTML = "";
				break;
			case 'fight':
				nav('combat.php');
				break;
			case 'exit':
				nav('orbit.php');
				break;
		}
		var xmlhttp;
		if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp=new XMLHttpRequest();
		}else{// code for IE6, IE5
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange=function(){
			if (xmlhttp.readyState==4 && xmlhttp.status==200){
				var resp = xmlhttp.responseText;
				//take the responce and put it in the class box
				document.getElementById("console").innerHTML = 	document.getElementById("console").innerHTML + '<br />' +  resp;
	
			}
			}
		xmlhttp.open("GET","console.php?command=" + command ,true);
		xmlhttp.send();
		document.getElementById('writer').value="";
	}else if(e.keyCode==38){
		if (i<commands.length-1){
			i++;
			document.getElementById('writer').value=commands[commands.length-i];		
		}
	}else if(e.keyCode==40){
		if(i<=1){
			document.getElementById('writer').value="";
			i==0;
		}else{
			i--;
			document.getElementById('writer').value=commands[commands.length-i];
		}
	}
}
function nav(URL){
	window.location.replace(URL);
}
</script>
</head>
<body>
<p id= "console" style="height:90%;">
Welcome <?php //echo $userName; ?>, Last login <?php echo "20/11/10"; ?><br />
</p>
<div style="position:absolute;bottom:15px;left:0px;width:100%;">
<input id="writer" value="" tabindex="0" type="text" onkeydown="run(event)" style="" />
</div>
</body>
</html>
