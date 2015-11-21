<?php
include 'sql.php';
$QRY = "SELECT * FROM users,ships,shipTypes,locations,Markets WHERE users.FID=ships.OwnerID AND locations.PlaceID=Markets.PlaceID AND locations.PlaceID=ships.Location AND ships.ShipType=shipTypes.ShipType AND users.FID=";
//echo $QRY . $_COOKIE['User'];
$result = mysqli_query($con,$QRY . $_COOKIE['User']);
while($row = mysqli_fetch_array($result)){
	$ship = $row;
}
//echo $ship;

class ship{
    function _construct($connection,$ShipCode){
        //assert ShipCode is int 
        $this->con = $connection;
        $this->ShipCode = $ShipCode;
        $this->_updateShip();
    }
    
    function _updateShip(){
        $QRY = "SELECT * FROM users,ships,shipTypes,locations,Markets WHERE users.FID=ships.OwnerID AND locations.PlaceID=Markets.PlaceID AND locations.PlaceID=ships.Location AND ships.ShipType=shipTypes.ShipType AND users.FID=$this->ShipCode";
        $result = mysqli_query($this->con,$QRY);
        while($row = mysqli_fetch_array($result)){
                $ship = $row;
        }
        $this->_ship = $ship;
    }
    
    function getPosition($update=False){
        if($update){
            $this->_updateShip();
        }
        return $this->_ship['PlaceID'];
    }
    function setPosition($place){
        $query = "UPDATE ships SET Location=$place WHERE ShipCode=$this->ShipCode";
        return mysqli_query($this->con,$query);
    }
    
    
}
?>
