<?php

//HELP:shop [bomb|shielding|ships] #Things you can buy on this plannet;
//COMMAND:shop;

/**
 * Description of Shop
 *
 * @author jameshylands
 */
class ShopHandler extends Handler{
    function __construct($db,$ship) {
        $this->db = $db;
        $this->ship = $ship;
    }
    
    function handle($command){
        $planet = $this->ship->place->getName();
        switch($command[1]){
            case 'help':
                    return "At the moment you can only purchase shielding, do this with the command shielding and then the ammount you would like to buy. It costs 100 metal per Shielding unit.";
            case 'bombs':
                    //If the $command[2]
            case 'shielding':
                return $this->buyShielding($command[2]);
        }
    }
    
    function buyShielding($ammount){
        //What is the cost of the ammount 
        $cost = $ammount*100;
        //$this->ship = new Ship();
        $resource = new Resource($this->db);
        $resource->fromID(3);//metal
        //can they afford this
        if($this->ship->hold->get($resource)>$cost){
            if($this->ship->hold->change($resource,-$cost)){
                $this->ship->changeShielding($ammount);
                return "<script>I.update()</script>$ammount of shielding purchased at a cost of $cost.";
            }else{
                return "Error!";
            }
        }else{
            return "The cost of $ammount of shielding is $cost Metal. You do not have enough metal!";
        }
    }
}
