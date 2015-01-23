<?php
function trade($command){
switch($command[1]){
case 'do':
	return doTrade($command);
	break;
case 'info':
	return infoTrade($command);
case 'help':
	return "trade has three commands, do, info and help. The help function is what you have just asked for. The other two functions are explained here. <br />To use info type 'trade info' followed by the two materials you would like information on. For example you might type 'trade info MET UR' which would give you the trade rate of Metal and Uranium on this planet.<br />To use the do function type 'trade do' followed by the amount of the first material you wish to trade, the code for the first material you would like to trade and then the material you wish to trade to. For example 'trade do 100 MET UR' will trade 100 units of metal into uranium.<br />";
	break;
default:
	return "For information on how to use the trade function type 'trade help'<br />";
}
}

function doTrade($command){
include 'scritps/sql.php';
include 'scripts/shipInfo.php';
//command[0] = trade
//command[1] = do
//command[2] should be an ammount
//command[3] should be what the user is selling
//command[4] should be what the user is buying

//check for errors in the code for what is being traded
if(codeTocolumnLocations($command[3])!="ERR" && codeToColumnLocations($command[4])!="ERR"){
	//check if the user has enough to sell that much
	if($command[2]>$ship[codeToColumnShips($command[3])]){
		return "Not enough " . $ship['Metal'] . $ship[codeToColumnShips($command[3])] . "<br />";
	}else{
		mysqli_query($con,"UPDATE ships SET " . codeToColumnShips($command[3]) . "=" . ($ship[codeToColumnShips($command[3])] - $command[2]) . " WHERE ShipCode=" . $ship['ShipCode']);
		//setprofit
		//mysqli_query($con,"UPDATE ships SET " . codeToColumnSh
		return "trade failed planet on international holiday";
		//tell the user something
	}
}else{
	return "ERROR: incorrect material codes<br />";
}
}
function infoTrade($command){
//command[0] = trade
//command[1] = info
//command[2] should be the first material
//command[3] should be the second material
include 'scripts/sql.php';
include 'scripts/shipInfo.php';
if(codeTocolumnLocations($command[2])!="ERR" && codeToColumnLocations($command[3])!="ERR"){
	$info = "The current rates are " . codeToColumnShips($command[2]) . ":" . codeToColumnShips($command[3]) . " @ " . $ship[codeToColumnLocations($command[2])] . ":" . $ship[codeToColumnLocations($command[3])] . " respectively with a tax rate of " . ($ship['Tax']*100) . "%<br />";
	return $info;
}else{
	return "ERROR: incorrect material codes<br />";
}
}

//function to convert the code that the user enters into the column from which to get the information from the database
function codeToColumnLocations($code){
	switch(strtolower($code)){
		case 'met':
			return "MetalPrice";
			break;
		case 'ur':
			return "UraniumPrice";
			break;
		case 'he':
			return "HeliumPrice";
			break;
		default:
			return "ERR";
	}
}

//function to convert the code that the user enters into the column from which to get the information from the database
function codeToColumnShips($code){
	switch(strtolower($code)){
		case 'met':
			return "Metal";
			break;
		case 'ur':
			return "Uranium";
			break;
		case 'he':
			return "Helium";
			break;
		default:
			return "ERR";
	}
}
