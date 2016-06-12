<?php

class Travel extends Distance{
    
    /**
     * Constructs with the ship traveling with
     * @param SQL_connection $connection
     * @param Ship $ship
     */
    function __construct($connection,$ship){
        $this->con = $connection;
        $this->ship = $ship;
    }
    
    /**
     * Function that returns the fuel resource
     * @return Resource
     */
    function fuel(){
        $Resource = new Resource($this->con);
        $Resource->fromCode('HE3');
        return $Resource;
    }
    
    /**
     * Function decides if a place needs traveling to if already there
     * @param Place $place
     * @return Bool
     */
    function requiresTravel($place){
        return $this->ship->place->eq($place);
    }
    
    /**
     * 
     * @param Place $place1
     * @param Place $place2
     * @return INT
     */
    function getFuelReq($place1,$place2){
        $distance = $this->getTravelDistance($place1, $place2);
        return $distance / 1000;
    }
    
    /**
     * Function to get fuel requirements to get to place from ships current location
     * @param Place $place
     * @return INT
     */
    function getFuelReqTo($place){
        $distance = $this->getTravelDistance($this->ship->place, $place);
        return $distance / 1000;
    }
    
    /**
     * Can this ship go to place
     * @param Place $place
     * @return Bool
     */
    function goNoGoForLaunch($place){
        return $ship->hull->get($this->fuel()) >= $this->getFuelReqTo($place);
    }
    
    /**
     * Function to move ship to place
     * @param Place $place
     */
    function move($place){
        $ship->setPositionFromPlace($place);
        $ship->hull->change($this->fuel(), -1 * $this->getFuelReqTo($place) );
    }
    
    /**
     * Function to check if fuel requirements are met before traveling
     * @param Place $place
     * @return boolean
     */
    function tryMove($place){
        if($this->goNoGoForLaunch($palce)){
            $this->move($palce);
            return TRUE;
        }else{
            return False;
        }
    }
    
}
