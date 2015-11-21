<?php
include 'sql.php';
$QRY = "SELECT * FROM users,ships,shipTypes,locations,Markets WHERE users.FID=ships.OwnerID AND locations.PlaceID=Markets.PlaceID AND locations.PlaceID=ships.Location AND ships.ShipType=shipTypes.ShipType AND users.FID=";
//echo $QRY . $_COOKIE['User'];
$result = mysqli_query($con,$QRY . $_COOKIE['User']);
while($row = mysqli_fetch_array($result)){
	$ship = $row;
}
//echo $ship;
class resource{
    function _construct($connection){
        //require a connection to the database to check values
        $this->con = $connection;
        $this->ID = null;
        $this->Name = null;
        $this->Code = null;
    }
    //WARNING No check for valididty of id,name or code on creation
    function resourceFromID($ID){
        $this->ID = $ID;
        $query = "SELECT * FROM resources WHERE ResourceID=$ID";
        $result = mysqli_query($this->con,$QRY);
        while($row = mysqli_fetch_array($result)){
                $this->Name = $row['Name'];
                $this->Code = $row['Code'];
        }
    }
    function resourceFromName($Name){
        $this->Name = $Name;
        $query = "SELECT * FROM resources WHERE Name='$Name'";
        $result = mysqli_query($this->con,$QRY);
        while($row = mysqli_fetch_array($result)){
                $this->ID = $row['ResourceID'];
                $this->Code = $row['Code'];
        }
    }
    function resourceFromCode($Code){
        $this->Code = $Code;
        $query = "SELECT * FROM resources WHERE Code='$Code'";
        $result = mysqli_query($this->con,$QRY);
        while($row = mysqli_fetch_array($result)){
                $this->ID = $row['ResourceID'];
                $this->Code = $row['Code'];
        }
    }
    function getID(){
        return $this->ID;
    }
    function getName(){
        return $this->Name;
    }
    function getCode(){
        return $this->Code;
    }
}

//WARNING sets need to be followed by an update
class ship{
    function _construct($connection,$ShipCode){
        //assert ShipCode is int 
        $this->con = $connection;
        $this->ShipCode = $ShipCode;
        $this->_updateShip();
    }
    function update(){
        $this->_updateShip();
        $this->_updateHold();
    }
    function _updateShip(){
        $QRY = "SELECT * FROM users,ships,shipTypes,locations,Markets WHERE users.FID=ships.OwnerID AND locations.PlaceID=Markets.PlaceID AND locations.PlaceID=ships.Location AND ships.ShipType=shipTypes.ShipType AND users.FID=$this->ShipCode";
        $result = mysqli_query($this->con,$QRY);
        while($row = mysqli_fetch_array($result)){
                $ship = $row;
        }
        $this->_ship = $ship;
    }
    function _updateHold(){
        $QRY = "SELECT * FROM ships, cargo WHERE ships.HoldCode=cargo.HoldCode AND ships.ShipCode=$this->ShipCode";
        $result = mysqli_query($this->con,$QRY);
        while($row = mysqli_fetch_array($result)){
                $this->_hold[$row['ResourceID']] = $row['Ammount'];
        }
    }
    
    function getPosition(){
        return $this->_ship['PlaceID'];
    }
    function setPosition($place){
        $query = "UPDATE ships SET Location=$place WHERE ShipCode=$this->ShipCode";
        return mysqli_query($this->con,$query);
    }
    function getName(){
        return $this->ship['Name'];
    }
    //security floor
    function setName($name){
        $query = "UPDATE ships SET Name='$name' WHERE ShipCode=$this->ShipCode";
        return mysqli_query($this->con,$query);
    }
    function getResource($Resource){
        return $this->_hold[$Resource->getID()];
    }
    function setResource($Resource,$Amount){
        $RID =$Resource->getID();
        $query = "UPDATE ships,cargo SET cargo.Amount='$Amount' WHERE ships.ShipCode=$this->ShipCode AND ships.HoldCode=cargo.HoldCode AND cargo.ResourceID=$RID)";
        return mysqli_query($this->con,$query);
    }
    function changeResource($Resource,$Amount){
        $Amount = $this->getResource($Resource->getID()) + $Amount;
        return $this->setResource($Resouce->getID(), $Amount);
    }
    
}
?>
