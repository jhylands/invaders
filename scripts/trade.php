<?php
//aJAX handler
include "sql.php";
include "shipInfo.php";
$ship = new ship($con, $ShipCode);
$trader= new trade($con);
$switch= $_GET['opp'];
if($switch=="query"){
        if(isset($_GET['res1']) && isset($_GET['res2'])){
            $res1 = new resource($con);
            $res1->resourceFromID($_GET['res1']);
            $res2 = new resource($con);
            $res2->resourceFromID($_GET['res2']);
            echo $trader->getTradePrice($res1,$res2,$ship->place) . "STOP";
        }else{
            echo "ERROR:400STOP";
        }
}elseif($switch=="submit"){
        if(isset($_GET['res1']) && isset($_GET['res2'])){
            $res1 = new resource($con);
            $res1->resourceFromID($_GET['res1']);
            $res2 = new resource($con);
            $res2->resourceFromID($_GET['res2']);
            $amount = $_GET['amount'];
            echo $trader->makeTrade($res1, $amount,$res2, $ship);
        }
}else{
    echo "FFS";
}
//end of ajax handler-----------------------------------------------------------

class trade{

    private $con;

    function __construct($connection) {
        $this->con = $connection;
    }
    function getTradePrice($res1,$res2,$place){
        $query = "select * FROM tradeRates, markets, locations WHERE ResourceID=$res1->ID AND markets.PlaceID=$place->ID AND markets.PlaceID=locations.PlaceID AND markets.marketID=tradeRates.MarketID";
        $result = mysqli_query($this->con, $query);
        $rates1 = mysqli_fetch_array($result);
        $rate1 = $rates1[0]['Rate'];
        $query = "select * from tradeRates where ResourceID=" . $res2->getID();
        $result = mysqli_query($this->con, $query);
        $rates2 = mysqli_fetch_array($result);
        $rate2= $rates2[0]['Rate'];
        return $rate1/$rate2;
    }
    
    function makeTrade($res1,$amount /*of res1*/,$res2,$ship){
        //check trade is valid
        if($ship->getResource($res1)>$amount){
            //changeResources
            $ship->changeResource($res1,-1*$amount);
            $ship->changeResource($res2,$amount*$this->getTradePrice($res1, $res2,$ship->place));
            //make trade card
            //TODO MUST BE DONE!!!!
            echo "compl";
        }else{
            return $ship->getResource($res1);
        }
    }
    
    
}