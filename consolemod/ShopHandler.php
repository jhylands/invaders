<?php

//HELP:shop [bomb|sheilding|ships] #Things you can buy on this plannet;
//COMMAND:shop;

/**
 * Description of Shop
 *
 * @author jameshylands
 */
class ShopHandler extends Handler{
    function __construct($con,$ship) {
        $this->con = $con;
        $this->ship = $ship;
    }
    
    function handle($command){
        
    switch($command[1]){
            case 'help':
                    echo "What you can buy from $planet<br />";
                    echo "Bombs<br />";
                    echo "Sheilding<br />";
                    echo "Ships<br />";
                    break;
            case 'bombs':
                    //If the $command[2]
            case 'Sheilding':
    }
    }
}
