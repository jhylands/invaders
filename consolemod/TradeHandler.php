<?php
//COMMAND:trade;
//HELP:trade [info|do|help] [Met|He|Ur] [Met|He|Ur] #The trade function allows you to find out trade information.;
class TradeHandler extends Handler{
    
    function __construct($db,$ship) {
        $this->db = $db;
        $this->ship = $ship;
        $this->trade = new Trade($db,$ship);
    }

    function handle($command){
        
        switch($command[1]){
        case 'do':
                return $this->_do($command);
                break;
        case 'info':
                return $this->info($command);
        case 'make':
            return $this->makeChannels();
        case 'help':
                return "trade has three commands, do, info and help. The help function is what you have just asked for. The other two functions are explained here. <br />To use info type 'trade info' followed by the two materials you would like information on. For example you might type 'trade info MET UR' which would give you the trade rate of Metal and Uranium on this planet.<br />To use the do function type 'trade do' followed by the amount of the first material you wish to trade, the code for the first material you would like to trade and then the material you wish to trade to. For example 'trade do 100 MET UR' will trade 100 units of metal into uranium.<br />";
                break;
        default:
                return "For information on how to use the trade function type 'trade help'<br />";
        }
    }
    
    /**
     *  Function to carry out trade
     * @param type $comand
     * @return responce
     */
    function _do($command){
        //command[0] = trade
        //command[1] = do
        //command[2] should be an ammount
        //command[3] should be what the user is selling
        //command[4] should be what the user is buying
        
        $res1 = new Resource($this->db);
        $res2 = new Resource($this->db);
        $ammount = $command[2];
        //commands need cleaning
        if($res1->fromCode($command[3]) && $res2->fromCode($command[4])){
                //check if the user has enough to sell that much
                if($this->ship->hold->get($res1)<$ammount){
                        return "Not enough " . $res1->getName() .  "<br />";
                }else{
                        if($this->trade->make($res1,$ammount,$res2)){
                            return "Trade made<br />";
                        }else{
                            return "The planet is on international holiday, please try again later.<br />";
                        }
                }
        }else{
                return "ERROR: incorrect material codes<br /> The correct format is trade do [ammount] [sell resource] [buy resource]";
        }
    }
    
    /**
     * Fucntion to get information about a trade 
     */
    function info($command){
        //command[0] = trade
        //command[1] = info
        //command[2] should be the first material
        //command[3] should be the second material
        $res1 = new Resource($this->db);
        $res2 = new Resource($this->db);
        //commands need cleaning
        if($res1->fromCode($command[2]) && $res2->fromCode($command[3])){
            $channel = $this->trade->getChannel($res1,$res2);
            $info = "The current rates are " . $res1->getName() . ":" . $res2->getName() . " @ ";
            $info .= 1 . ":" . $channel->getRate();
            $info .=" respectively with a tax rate of " . ($this->ship->place->market->getTax()*100) . "%<br />";
                return $info;
        }else{
                return "ERROR: incorrect material codes<br />";
        }
    }
    
    function makeChannels(){
        $market = $this->ship->place->market;
        return $market->makeChannels();
    }
}
