<?php

//HELP:fight #This function takes you to the comabat area for this celectial bodies authoraties where you can get paid to work as a contractor.;
//COMMAND:fight;

/**
 * Description of Fight
 *
 * @author jameshylands
 */
class FightHandler extends Handler {
    function __construct($db,$ship) {
        $this->db = $db;
        $this->ship = $ship;
    }
    
    function handle($command){
        $shielding = $this->ship->getShielding();
        if($shielding<=5){
            return "You do not have the required shielding requirement, you must have more than 5 units! You have " . $shielding ."!";
        }else{
            return "<script>this.makeChanger(this,5)();</script>Fight";
        }
    }
}
