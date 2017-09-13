<?php
include 'scripts/sql.php';
include 'scripts/shipInfo.php';

//create ship object 
$ship = new Ship($con,$ShipCode);
//include consolemods
include 'consolemod/Handler.php';
//IMPORTCLASS INPUT
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
//HELP-TEXT INPUT
                    echo "fight #This function takes you to the comabat area for this celectial bodies authoraties where you can get paid to work as a...<br /> ";
                    echo "exit #Exit the console and go back to orbit view.<br />";
                    echo "clear #This clears the console window<br />";
                    //echo "shop [bomb|sheilding|ships] #Things you can buy on $planet<br />";
                    break;
//CASE INPUT
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
