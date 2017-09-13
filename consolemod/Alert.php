<?php
//COMMAND:alert;
//HELP:alert something #Makes a box apear;

/**
 * Description of Alert
 *
 * @author jameshylands
 */
class Alert extends Handler{
        function __construct($con,$ship){
        $this->con = $con;
        $this->ship = $ship;
    }
    
    function handle($command){
        $write = $command[1];
        return "<script>alert('$write');</script>";
    }
}
