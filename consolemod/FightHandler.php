<?php

//HELP:fight #This function takes you to the comabat area for this celectial bodies authoraties where you can get paid to work as a contractor.;
//COMMAND:fight;

/**
 * Description of Fight
 *
 * @author jameshylands
 */
class FightHandler extends Handler {
    function __construct($con,$ship) {
        $this->con = $con;
        $this->ship = $ship;
    }
    
    function handle($command){
        return "<script>this.makeChanger(this,5)();</script>Fight";
    }
}
