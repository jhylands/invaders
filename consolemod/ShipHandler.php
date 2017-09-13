<?php
//COMMAND:ship;
//HELP:ship [ name|sheilding|location|switch [ship] ];
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
    
    function handle($command){
        switch($command[1]){
            case 'sheilding':
                return $this->getSheilding($command);
                break;
            case 'location':
                return $this->getLocation($command);
                break;
            case 'switch':
                return $this->switchShip($command);
                break;
            case 'name':
                return $this->getName($command);
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
    function getLocation($command){
        return $this->ship->place->getID();
    }
    
    function switchShip($command){
        return "not yet possible";
    }
    function getName($command){
        return $this->ship->getName();
    }
}
