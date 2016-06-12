<?php

class Trade{

    private $con;

    function __construct($connection,$ship) {
        $this->con = $connection;
        $this->ship = $ship;
    }
    
    
    /**
     * Function to make a trade of an amount of res1 for the correct amount of res2
     * @param Resource $res1
     * @param int $amount
     * @param Resource $res2
     * @return success
     */
    function make($res1,$amount /*of res1*/,$res2){
        //function needs better error handleing
        
        //check trade is valid
        if($ship->hold->get($res1)>$amount){
            //changeResources
            $ship->hold->change($res1,-1*$amount);
            $ship->hold->change($res2,$amount*$this->get($res1,$res2));
            //make trade card
            return $this->makeCard($res1, $amount, $res2);
        }else{
            return false;
        }
    }
    
    
    /**
     * Function to calculate the rate between two resources
     * @param Resource $res1
     * @param Resource $res2
     * @return float
     */
    function get($res1,$res2){
        return $this->getMarket($res1)/$this->getMarket($res1);
    }
    
    /**
     * Function to generate trade card from trade activity
     * @param Resource $res1
     * @param INT $amount
     * @param Resource $res2
     * @return success
     */
    private function makeCard($res1,$amount,$res2){
        $QRY = "INSERT INTO trades (ShipCode,ResourceSold,ResourceBought,MarketID,Amount) values(";
        $QRY.= $this->ship->getCode() . ",";
        $QRY.= $res1->getID() . ",";
        $QRY.= $res2->getID() . ",";
        $QRY.= $this->ship->place->market->getID() . ",";
        $QRY.= $amount . ")";
        return mysqli_query($this->con, $QRY);
    }
    
    //SHORTHANDS
    //functions that are referenced for shorthand here from markets
    
    /**
     * Shorthand for $this->ship->place->market->get
     * @param type $resource
     * @return type
     */
    function getMarket($resource){
        return $this->ship->place->market->get($resource);
    }
    
    
}
