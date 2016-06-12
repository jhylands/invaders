<?php
//class to handle cargo comands
class cargoHadler{
    function cargoHandler($con,$ship){
        $this->con = $con;
        $this->ship = $ship;
    }
    
    function review($command){
        switch($command[1]){
        case 'drop':
                return drop($command);
                break;
        case 'help':
                return "Cargo allows you to view and drop elements of cargo in the hold of your ship. cargo [drop] [item id]<br />";
                break;
        default:
                return info();
        }
    }

    function drop($command){
            include '/scripts/sql.php';
            if (mysqli_query($con, "SELECT * FROM cargo WHERE"))
            $QRY = "DELETE FROM cargo WHERE CargoID=" . intval($command[3]);
            mysqli_query($con, $QRY);
    }

    function info(){
            $response = "On this ship you have:";
            $query = "SELECT * FROM cargo,hold,ships,resources WHERE cargo.ResourceID = resources.ResourceID and cargo.HoldCode = hold.HoldCode AND ships.HoldCode=hold.HoldCode AND ships.ShipCode=" . $this->ship->get;
            //echo $query;
            $result = mysqli_query($con, $query);
            if($result){
                while($row = mysqli_fetch_array($result)){
                        $response  = $response . "<br />" . $row['Name'] . ":" . $row['Amount'];
                }
            }
            return $response;
    }
}
?>