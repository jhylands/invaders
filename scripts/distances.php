<?php

class distance{
    function getTravelDistance($Place1,$Place2){
            return abs( $Place1->getOrbitalRadius()-$Place2->getOrbitalRadius() );
    }
}

class travel extends distance{
    
    function __construct($connection){
        $this->con = $connection;
    }
    function fuel(){
        $Resource = new resource($this->con);
        $Resource->resourceFromCode('HE3');
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
?>