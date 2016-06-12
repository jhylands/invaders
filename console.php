<?php
include 'scripts/sql.php';
include 'scripts.shipInfo.php';
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
		$handler =  new TradeHandler($con);
		break;
	case 'cargo':
		$handler = new cargoHadler($con,$ship);
		break;
        case 'travel':
                $handler = new TravelHandler($con);
                break;
	case 'fight':
		echo "ERROR: Should be handled by user side console";
		break;
	case 'exit':
		echo "ERROR: should be handled by user side console";
		break;
	case 'clear':
                echo "ERROR: should be handled by user side console";
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
if(isset($handler))
{
    echo $handler->handle($command);
}
exit(404);


}else{
    echo '<commandNotPresented>';
}
?>
