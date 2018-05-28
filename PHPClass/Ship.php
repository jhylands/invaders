<?php

/**
 * Class to manage a ship object and its relations with the db
 */
class Ship{
    /**
     *
     * @var Hold 
     */
    public $hold;
    /**
     *
     * @var Place 
     */
    public $place;
    
    function __construct($connection,$ShipCode){
        //assert ShipCode is int 
        $this->con = $connection;
        $this->ShipCode = $ShipCode['ShipCode'];
        $this->_updateShip();
        $this->hold = new Hold($connection, $this->_ship['HoldCode']);
        $this->place = new Place($this->con);
        $this->update();
    }
    function __toString(){
        return json_encode(array("ship" => $this->_ship, "hold" => $this->hold->__toString()));
    }
    function update(){
        $this->_updateShip();
        $this->_updateHold();
        $this->_updatePosition();
    }
    function _updateShip(){
        $QRY = "SELECT * FROM ships,shipTypes WHERE ships.ShipType=shipTypes.ShipType AND ships.ShipCode=$this->ShipCode";
        $result = mysqli_query($this->con,$QRY);
        while($row = mysqli_fetch_array($result)){
                $ship = $row;
        }
        $this->_ship = $ship;
    }
    function _updateHold(){
        $this->hold->update();
    }
    function _updatePosition(){
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
        if($this->_ship['ShipName']){
            return $this->_ship['ShipName'];
            
        }else{ 
            return 0;
        }
    }
    function getCode(){
        return $this->_ship['ShipCode'];
    }
    //security floor
    function setName($name){
        $query = "UPDATE ships SET Name='$name' WHERE ShipCode=$this->ShipCode";
        return mysqli_query($this->con,$query);
    }
    function getShielding(){
        return $this->_ship['Shielding'];
    }
    function setShielding($value){
        $query = "UPDATE ships SET Shielding='$value' WHERE ShipCode=$this->ShipCode";
        return mysqli_query($this->con,$query);
    }
    /**
     * Set value of resource in hold
     * @param type $resource
     * @param type $change
     * @return success
     */
    function changeShielding($change){
        $change = (INT) $change;
        $query = "UPDATE ships SET ships.Shielding=ships.Shielding + '$change' WHERE ShipCode=$this->ShipCode"; 
       //echo $query;
        $r = mysqli_query($this->con,$query);
        $this->update();
        return $r;
    }
    function getBuildCode(){
        return $this->_ship['BuildCode'];
    }
    
    /**
     * Function changed the current ship of a user
     * @param type $shipCode
     */
    function change($shipCode){
        
    }
}
?>
