<?php
//COMMAND:alert;
//HELP:alert something #Makes a box apear;

/**
 * Description of Alert
 *
 * @author jameshylands
 */
class AlertHandler extends Handler{
        function __construct($db,$ship){
        $this->db = $db;
        $this->ship = $ship;
    }
    
    function handle($command){
        $write = $command[1];
        return "<script>alert('$write');</script>";
    }
}
