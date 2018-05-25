<?php

/**
 * Description of Market
 *
 * @author jameshylands
 */
class Market{
    private $channels= array();
    
    function __construct($db,$id) {
        $this->db = $db;
        $this->id = $id;
        $query = "SELECT * FROM channels WHERE MarketID=%d";
        $results = $db->query( $query,array($this->id));
        foreach($results as &$result){
            $this->channels[] = new Channel($this->db,$result,true);
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
        $results = $db->query( $query);
        foreach($results as &$result){
            $ids[] = $result['ResourceID'];
        }
        return $ids;
    }
    
    //needs to take into consideration what is already in the database
    function makeChannels(){
        //make all the channels within this market 
        //given a list of ResourceID
        $resources = $this->getResources();
        foreach($resources as &$from){
            foreach($resources as &$to){
                if($from!=$to){
                    $rate = rand(1,3);
                    $channel = array(
                        'ResourceBuyID' => $from,
                        'ResourceSellID'=> $to,
                        'Rate'          => $rate,
                        'MarketID'      => $this->getID()
                    );
                    
                    if(!$db->insert('channels',$channel))
                    {
                    echo("Error description: cannout be provided because I don't know how to do this using the API. We are in PHPClass/Market.php btw ");
                    }
                }
            }
        }
        
        
    }
    
}
