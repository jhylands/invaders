<?php

class Trade{

    private $con;
    private $ship;

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
        if($this->ship->hold->get($res1)>$amount){
            $worked = true;
            //changeResources
            $worked &=  $this->ship->hold->change($res1,-1*$amount);
            $worked &=  $this->ship->hold->change($res2,$amount*$this->get($res2,$res1));
            //make trade card
            return $worked;//$this->makeCard($res1, $amount, $res2);
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
        return $this->getChannel($res2, $res1)->getRate();
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
     * function has chnaged it now doesn't really have a reason for exitence
     * @param type $resource
     * @return type
     */
    function getRate($resource){
        return $this->ship->place->market->get($resource)->getRate();
    }
    
    /**
     * Function to get a channel for a particular resource pair
     * @param Resource $buy
     * @param Resource $sell
     * @return Channel
     */
    function getChannel($buy,$sell){
        return $this->ship->place->market->get($buy,$sell);
    }
    
    
}

