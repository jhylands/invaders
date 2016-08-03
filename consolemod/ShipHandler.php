<?php

/**
 * Description of ShipHandler
 *
 * @author jameshylands
 */
class ShipHandler extends Handler{

    private $ship;

    function __construct($con,$ship) {
        $this->con = $con;
        $this->ship = $ship;
    }
    
    function handle($comand){
        switch($comand[1]){
            case 'sheilding':
                return $this->getSheilding($comand);
                break;
            case 'location':
                return $this->getLocation($comand);
                break;
            case 'switch':
                return $this->switchShip($comand);
                break;
            case 'help':
                return 'ship [ sheilding|location|switch [ship] ]';
            default:
                return 'for help: ship help';
        }
    }
    
    function getSheilding($comand){
        return $this->ship->getShielding();
    }
    
    //function not defined
    function getLocation($comand){
        return $this->ship->place->getID();
    }
    
    function switchShip($comand){
        return "not yet possible";
    }
}
