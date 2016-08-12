<?php

/**
 * Description of Market
 *
 * @author jameshylands
 */
class Market{
    private $channels= array();
    
    function __construct($con,$id) {
        $this->con = $con;
        $this->id = $id;
        $query = "SELECT * FROM channels WHERE MarketID=$this->id";
        $result = mysqli_query($this->con, $query);
        while($row = mysqli_fetch_array($result)){
            $this->channels[] = new Channel($this->con,$row,true);
        }
    }
    
    /**
     * Function to get the rate of a resource
     * @param Resource $resource
     */
    function get($resource){
        foreach($this->channels as $channel){
            if($channel->getBuyResource().eq($resource)){
                return $channel;
            }
        }
        return false;
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
    
    public function __toString() {
        return json_encode(array('marketID'=>  $this->getID(),'channels'=> $this->channelsToArray()));
    }
    
    public function channelsToArray(){
        $arr = array();
        foreach($this->channels as $channel){
            $arr[] = $channel->toArray();
        }
        return $arr;
    }
    
    
}
