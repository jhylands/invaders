<?php

/**
 * Description of Channel
 *
 * @author jameshylands
 */
class Channel extends Table{
    
    function __construct($link,$data,$type=false) {
        parent::__construct($link, $data, $type);
        $SQL_row = $this->getRow("channel", "ChannelID", $data);
        $this->buyRa = 1;
        $this->sellRa = $SQL_row['Rate'];
        $this->buyRe = new Resource($link);
        $this->buyRe->fromID($SQL_row['ResourceBuyID']);
        $this->sellRe = new Resource($link);
        $this->sellRe->fromID($SQL_row['ResourceSellID']);
    }

    
    private $buyRe;
    private $buyRa;
    private $sellRe;
    private $sellRa;
    
    public function getRate(){
        return $this->sellRa;
    }
    
    /**
     * 
     * @return Resource
     */
    public function getBuyResource(){
        return $this->buyRe;
    }
    /**
     * 
     * @return Resource
     */
    public function getSellResouce(){
        return $this->sellRe;
    }
    
    /**
     * Returns a tuple of tuples 
     * ((Res,Amount),(Res,Ammount))
     * (Buy_tuple,Sell_tuple)
     * @return type
     */
    public function __toString() {
        return json_encode($this->toArray());
    }
    public function toArray(){
        return array('buy'=>$this->getBuyResource()->getID(),
                'sell'=>$this->getSellResouce()->getID(),
            'rate'=>  $this->sellRa);
    }
    
    public function makeChannels(){
        //for each location
        //for each resource as buy
        //for each resource as sell
        "Insert INTO channels (MarketID,ResourceBuyID,ResourceSellID,rate) values(";
        
    }
}
