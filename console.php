<?php
include 'scripts/autoload.php';
include 'scripts/shipInfo.php';

//create ship object 
$ship = new Ship($db,$ShipCode);
//include consolemods
include 'consolemod/Handler.php';
include "consolemod/AlertHandler.php";
include "consolemod/CargoHandler.php";
include "consolemod/ExitHandler.php";
include "consolemod/FightHandler.php";
include "consolemod/RescourceHandler.php";
include "consolemod/ShipHandler.php";
include "consolemod/ShopHandler.php";
include "consolemod/TradeHandler.php";
include "consolemod/TravelHandler.php";

//check for sent information

$userName = $ship->owner->getName();

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
                    echo "exit #exit back to orbit<br />";
                    echo "fight #This function takes you to the comabat area for this celectial bodies authoraties where you can get paid to work as a contractor.<br />";
                    echo "rescode #A program to get information about resource codes.<br />";
                    echo "ship [ name|shielding|location|switch [ship] ]<br />";
                    echo "shop [bomb|shielding|ships] #Things you can buy on this plannet<br />";
                    echo "trade [info|do|help] [Met|He|Ur] [Met|He|Ur] #The trade function allows you to find out trade information.<br />";
                    echo "Travel help not yet written<br />";

                    echo "clear #This clears the console window<br />";
                    //echo "<br />";
                    break;
            case "alert":
                    $handler = new AlertHandler($db,$ship);
                     break;
            case "cargo":
                    $handler = new CargoHadler($db,$ship);
                     break;
            case "exit":
                    $handler = new ExitHandler($db,$ship);
                     break;
            case "fight":
                    $handler = new FightHandler($db,$ship);
                     break;
            case "rescode":
                    $handler = new RescourceHandler($db,$ship);
                     break;
            case "ship":
                    $handler = new ShipHandler($db,$ship);
                     break;
            case "shop":
                    $handler = new ShopHandler($db,$ship);
                     break;
            case "trade":
                    $handler = new TradeHandler($db,$ship);
                     break;
            case "travel":
                    $handler = new TravelHandler($db,$ship);
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
