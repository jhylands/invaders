<?php
//COMMAND:ship;
//HELP:ship [ name|shielding|location|switch [ship] ];
/**
 * Description of ShipHandler
 *
 * @author jameshylands
 */
class ShipHandler extends Handler{

    private $ship;

    function __construct($db,$ship) {
        $this->db = $db;
        $this->ship = $ship;
    }
    
    function handle($command){
        switch($command[1]){
            case 'shielding':
                return $this->getShielding($command);
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
                return 'ship [ shielding|location|switch [ship] ]';
            default:
                return 'for help: ship help';
        }
    }
    
    function getShielding($comand){
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
