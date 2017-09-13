<?php
include 'scripts/sql.php';
include 'scripts/shipInfo.php';

//create ship object 
$ship = new Ship($con,$ShipCode);
//include consolemods
include 'consolemod/Handler.php';
include "consolemod/Alert.php";
include "consolemod/CargoHandler.php";
include "consolemod/RescourceHandler.php";
include "consolemod/ShipHandler.php";
include "consolemod/TradeHandler.php";
include "consolemod/TravelHandler.php";

//check for sent information

$result = mysqli_query($con,"SELECT * FROM users WHERE FID=" . $_SESSION['User']);
while($row=mysqli_fetch_array($result)){
	$userName = $row['Name'];
}

if(isset($_GET['command'])){
$comands = explode(";",$_GET['command']);
foreach($comands as $strcommand){
    echo "<a style='color:#367FCD;'>" . $userName . "></a>" . $strcommand . "<br />";
    $command = explode(' ',$strcommand);
    //if there is no second command set the second command to help
    if(count($command)<=1){
        $command[1] = 'help';
    }
    switch($command[0]){
            case 'help':
                    echo "This is your ships console. From here you control communication with other systems in orbit around your current location.<br />You can use the following commands:<br />";
                    echo "alert something #Makes a box apear<br />";
                    echo "cargo [drop] [item] # The function to view what you currently have in your cargo hold<br />";
                    echo "rescode #A program to get information about resource codes.<br />";
                    echo "ship [ name|sheilding|location|switch [ship] ]<br />";
                    echo "trade [info|do|help] [Met|He|Ur] [Met|He|Ur] #The trade function allows you to find out trade information.<br />";
                    echo "Travel help not yet written<br />";

                    echo "fight #This function takes you to the comabat area for this celectial bodies authoraties where you can get paid to work as a...<br /> ";
                    echo "exit #Exit the console and go back to orbit view.<br />";
                    echo "clear #This clears the console window<br />";
                    //echo "shop [bomb|sheilding|ships] #Things you can buy on $planet<br />";
                    break;
            case "alert":
                    $handler = new Alert($con,$ship);
                     break;
            case "cargo":
                    $handler = new CargoHadler($con,$ship);
                     break;
            case "rescode":
                    $handler = new RescourceHandler($con,$ship);
                     break;
            case "ship":
                    $handler = new ShipHandler($con,$ship);
                     break;
            case "trade":
                    $handler = new TradeHandler($con,$ship);
                     break;
            case "travel":
                    $handler = new TravelHandler($con,$ship);
                     break;

            case 'fight':
                    echo "ERROR: Should be handled by user side console";
                    break;
            case 'exit':
                    echo "ERROR: should be handled by user side console";
                    break;
            case 'clear':
                    //echo "ERROR: should be handled by user side console";
                    break;
            case 'hello':
                    echo "I'm not a chat-bot I am your ship console!<br />";
                    break;
            case 'cd':
                    echo "No directory selected<br />";
                    break;
            case 'ls':
                    echo "Nothing to list<br />";
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
        echo $handler->handle($command) . "<br />";
    }
}
exit(404);


}else{
    echo '<commandNotPresented>';
}
?>
