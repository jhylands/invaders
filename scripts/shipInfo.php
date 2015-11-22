<?php
include 'sql.php';
$QRY = "SELECT * FROM users,ships,shipTypes,locations,Markets WHERE users.FID=ships.OwnerID AND locations.PlaceID=Markets.PlaceID AND locations.PlaceID=ships.Location AND ships.ShipType=shipTypes.ShipType AND users.FID=";
//echo $QRY . $_COOKIE['User'];
$result = mysqli_query($con,$QRY . $_COOKIE['User']);
while($row = mysqli_fetch_array($result)){
	$ShipCode = $row['ShipCode'];
}
//echo $ship;
class resource{
    function __construct($connection){
        //require a connection to the database to check values
        $this->con = $connection;
        $this->ID = null;
        $this->Name = null;
        $this->Code = null;
    }
    function __toString(){
        return "ID:$this->ID; Code:$this->Code; Name:$this->Name;";
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
        $result = mysqli_query($this->con,$query);
        while($row = mysqli_fetch_array($result)){
                $this->ID = $row['ResourceID'];
                $this->Code = $row['Code'];
        }
    }
    function resourceFromCode($Code){
        $this->Code = $Code;
        $query = "SELECT * FROM resources WHERE Code='$Code'";
        $result = mysqli_query($this->con,$query);
        while($row = mysqli_fetch_array($result)){
                $this->ID = $row['ResourceID'];
                $this->Name = $row['Name'];
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
    function __construct($connection,$ShipCode){
        //assert ShipCode is int 
        $this->con = $connection;
        $this->ShipCode = $ShipCode;
        $this->update();
    }
    function __toString(){
        return json_encode(array("ship" => $this->_ship, "hold" => $this->_hold));
    }
    function update(){
        $this->_updateShip();
        $this->_updateHold();
        $this->_updatePosition();
    }
    function _updateShip(){
        $QRY = "SELECT * FROM ships,shipTypes,Markets WHERE ships.Location=Markets.PlaceID AND ships.ShipType=shipTypes.ShipType AND ships.ShipCode=$this->ShipCode";
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
                $this->_hold[$row['ResourceID']] = $row['Amount'];
        }
    }
    function _updatePosition(){
        $this->place = new place($this->con);
        $this->place->fromID($this->_ship['Location']);
    }
    //getPosition depreshiated to $this->place->ID
    //setPosition depreshiated to setPositionFromID
    function setPositionFromID($placeID){
        $query = "UPDATE ships SET Location=$placeID WHERE ShipCode=$this->ShipCode";
        return mysqli_query($this->con,$query);
    }
    function setPositionFromPlace($place){
        return $this->setPositionFromID($place->ID);
    }
    function getName(){
        return $this->_ship['Name'];
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
        $Amount = $this->getResource($Resource) + $Amount;
        return $this->setResource($Resource, $Amount);
    }

}

class place{
    function __construct($connect){
        $this->con = $connect;
    }
    function fromID($ID){
        $this->ID=$ID;
        $query = "SELECT * FROM locations WHERE PlaceID=$ID";
        $result = mysqli_query($this->con,$query);
        while($row = mysqli_fetch_array($result)){
                $this->Name = $row['PlaceName'];
                $this->URL = $row['PlanetURL'];
                $this->OrbitalRadius = $row['OrbitalRadius'];
                $this->InOrbitOf = $row['InOrbitOf'];
                $this->Temperature = $row['Temperature'];
                $this->SurfaceGravity = $row['SurfaceGravity'];
                $this->Radius = $row['Radius'];
        }
    }
    function __toString() {
        return $this->URL;
    }
    function eq($place){
        return $this->ID==$place->ID;
    }
    function getImage(){
        return $this->URL;
    }
    function getName(){
        return $this->Name;
    }
    function getTemperature(){
        return $this->Temperature;
    }
    function getOrbitalRadius(){
        return $this->OrbitalRadius;
    }
    function getInOrbitOfID(){
        return $this->InOrbitOf;
    }
    function getSurfaceGravity(){
        return $this->SurfaceGravity;
    }
    function getRadius(){
        return $this->Radius;
    }
}
?>
