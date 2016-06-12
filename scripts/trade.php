<?php
//aJAX handler
include "sql.php";
include "shipInfo.php";
$ship = new Ship($con, $ShipCode);
$trader= new Trade($con);
$switch= $_GET['opp'];
if($switch=="query"){
        if(isset($_GET['res1']) && isset($_GET['res2'])){
            $res1 = new resource($con);
            $res1->fromID($_GET['res1']);
            $res2 = new resource($con);
            $res2->fromID($_GET['res2']);
            echo $trader->getTradePrice($res1,$res2,$ship->place) . "STOP";
        }else{
            echo "ERROR:400STOP";
        }
}elseif($switch=="submit"){
        if(isset($_GET['res1']) && isset($_GET['res2'])){
            $res1 = new resource($con);
            $res1->fromID($_GET['res1']);
            $res2 = new resource($con);
            $res2->fromID($_GET['res2']);
            $amount = $_GET['amount'];
            echo $trader->makeTrade($res1, $amount,$res2, $ship);
        }
}else{
    echo "FFS";
}
