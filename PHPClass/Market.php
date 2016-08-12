<?php

/**
 * Description of Market
 *
 * @author jameshylands
 */
class Market {
    private $channels= array();
    private $rates;
    function __construct($con,$id) {
        $this->con = $con;
        $this->id = $id;
    }
    
    /**
     * Function to get the rate of a resource
     * @param Resource $resource
     */
    function get($resource){
        $query = "SELECT * FROM channels WHERE MarketID=$this->id";
        $result = mysqli_query($this->con, $query);
        while($row = mysqli_fetch_array($result)){
            $channels[] = new Channel($row);
        }
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
