<?php
//COMMAND:travel;
//HELP:Travel help not yet written;

/**
 * Description of TravelHandler
 *
 * @author jameshylands
 */
class TravelHandler extends Handler{
    
    function __construct($con,$ship) {
        $this->con = $con;
        $this->ship = $ship;
        $this->travel = new Travel($con,$ship);
    }
    

    function handle($comand){
        switch($comand[1]){
            case 'cost':
                return $this->getCost($comand);
                break;
            case 'goto':
                return $this->_goto($comand);
                break;
            case 'help':
                return "travel [cost|goto] [place]";
        }
        return "For trade commands: trade help";
    }
    
    /**
     * Get the cost of traveling to a place
     * @param type $comand
     * @return INT
     */
    function getCost($comand){
        $place = new Place($this->con);
        $place->fromID($comand[2]);
        return $this->travel->getFuelReqTo($place);
    }
    
    
    /**
     * Move ship to place
     * @param type $comand
     * @return string
     */
    function _goto($comand){
        $place = new Place($this->con);
        $place->fromID($comand[2]);
        if($this->travel->tryMove($place)){
            return "<PLCEUP />Traveled to :" . $place->getName();
        }
        else{
            return "Not enough fuel";
        }
    }
    
    
}
