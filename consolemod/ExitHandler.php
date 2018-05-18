<?php
//HELP:exit #exit back to orbit;
//COMMAND:exit;


/**
 * Description of Exit
 *
 * @author jameshylands
 */
class ExitHandler extends Handler{
   
    function __construct($con,$ship) {
        $this->con = $con;
        $this->ship = $ship;
    }
    
    function handle($command){
        return "<script>this.makeChanger(this,0)()</script>Back to orbit";
    }
}
