<?php

class Travel extends Distance{
    
    function __construct($connection){
        $this->con = $connection;
    }
    function fuel(){
        $Resource = new resource($this->con);
        $Resource->fromCode('HE3');
        return $Resource;
    }
    function requiresTravel($ship,$place){
        return $ship->place->eq($place);
    }
    function getFuelReq($place1,$place2){
        $distance = $this->getTravelDistance($place1, $place2);
        return $distance / 1000;
    }
    
    function goNoGoForLaunch($ship,$place){
        return $ship->getResource($this->fuel()) >= $this->getFuelReq($ship->place,$place);
    }
    
    function move($ship,$place){
        $ship->setPositionFromPlace($place);
        $ship->changeResource($this->fuel(), -1 * $this->getFuelReq($ship->place, $place) );
    }
    
}
