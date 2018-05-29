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
        $this->db = $connection;
        $this->ShipCode = $ShipCode;
        $this->_updateShip();
        $this->hold = new Hold($connection, $this->_ship['HoldCode']);
        $this->place = new Place($this->db);
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
        $QRY = "SELECT * FROM ships,shipTypes WHERE ships.ShipType=shipTypes.ShipType AND ships.ShipCode=?";
        $this->_ship = $this->db->query($QRY,[$this->ShipCode])->first(true);
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
        $query = "UPDATE ships SET Location=? WHERE ShipCode=%d";
        return $this->db->query($query,[$placeID,$this->ShipCode]);
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
        $query = "UPDATE ships SET Name='?' WHERE ShipCode=?";
        return $this->db->query($query,[$name,$this->ShipCode]);
    }
    function getShielding(){
        return $this->_ship['Shielding'];
    }
    function setShielding($value){
        $query = "UPDATE ships SET Shielding='?' WHERE ShipCode=%s";
        return $this->db->query($query,[$value,$this->ShipCode]);
    }
    /**
     * Set value of resource in hold
     * @param type $resource
     * @param type $change
     * @return success
     */
    function changeShielding($change){
        $change = (INT) $change;
        $query = "UPDATE ships SET ships.Shielding=ships.Shielding + '?' WHERE ShipCode=?"; 
       //echo $query;
        $r = $this->db->query($query,[$change,$this->ShipCode]);
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
