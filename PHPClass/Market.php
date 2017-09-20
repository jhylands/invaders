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
     * @param Resource $buy
     * @param Resource $sell 
     * @return Channel 
     */
    function get($buy,$sell){
        foreach($this->channels as $channel){
            if($channel->getBuyResource()->eq($buy) &&
                    $channel->getSellResouce()->eq($sell)){
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
    
    function __toString() {
        return json_encode(array('marketID'=>  $this->getID(),'channels'=> $this->channelsToArray()));
    }
    
    public function channelsToArray(){
        $arr = array();
        foreach($this->channels as $channel){
            $arr[] = $channel->toArray();
        }
        return $arr;
    }
    /**
     * function to get a list of the resources IDs
     */
    function getResources(){
        $ids = [];
        $query = "SELECT ResourceID from resources";
        $result = mysqli_query($this->con, $query);
        while($row = mysqli_fetch_array($result)){
            $ids[] = $row['ResourceID'];
        }
        return $ids;
    }
    
    //needs to take into consideration what is already in the database
    function makeChannels(){
        //make all the channels within this market 
        //given a list of ResourceID
        $resources = $this->getResources();
        $QRY = "";
        foreach($resources as &$from){
            foreach($resources as &$to){
                if($from!=$to){
                    $rate = rand(1,3);
                    $QRY = "INSERT INTO channels (ResourceBuyID,ResourceSellID,Rate,MarketID) VALUES ('" . $from . "','" . $to . "','" . $rate . "','" . $this->getID() ."');";
                    if(!mysqli_query($this->con, $QRY))
                    {
                    echo("Error description: " . mysqli_error($this->con));
                    }
                }
            }
        }
        
        
    }
    
}
