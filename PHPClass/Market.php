<?php

/**
 * Description of Market
 *
 * @author jameshylands
 */
class Market {
    function __construct($con,$id) {
        $this->con = $con;
        $this->id = $id;
    }
    
    /**
     * Function to get the rate of a resource
     * @param Resource $resource
     */
    function get($resource){
        $query = "select * FROM tradeRates WHERE ResourceID=$resource->ID AND MarketID=$this->id";
        $result = mysqli_query($this->con, $query);
        $rates1 = mysqli_fetch_array($result);
        return $rate1 = $rates1[0]['Rate'];
    }
    
    function getID(){
        return $this->id;
    }
    
    function getTax(){
        return 0.2;
    }
    
    /**
     * Function updates an array of all the rates in this market
     */
    function update(){
        
    }
    
    
}
