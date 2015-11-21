<?php
class distance{
    function getTravelDistance($place1ID,$place2ID){
            return abs(getOrbitalRadius($Place1ID)-getOrbitalRadius($Place2ID));
    }
    function getOrbitalRadius($PlaceID){
            $result = mysqli_query($con,"SELECT * FROM locations WHERE PlaceID=" . $_GET['PlaceID']);
            while($row=mysqli_fetch_array($result)){
                    $orbitalRadi = $row['OrbitalRadius'];
            }
            return $orbitalRadi;
    }
}

class travel extends distance{
    
    function _construct($connection){
        $this->con = $connection;
    }
    
    function getLocationURL($place){
        //asert($place, isINT)
        $query ="SELECT * FROM locations WHERE PlaceID=" . $place;
        $result = mysqli_query($this->con,$query);
        if($result){
            $row = mysqli_fetch_array($result);
            return $row[0]['PlanetURL'];
        }else{
            return "Planet does not Exist!";
        }
    }
    function getShipsFuel($ship){
        $query = "SELECT * FROM ships,resources,cargo WHERE ships.HoldCode=cargo.HoldCode AND cargo.ResourceID=resources.ResourceID AND ships.ShipCode=". $ship['ShipCode'] . " AND resources.Code='He'";
        $result = mysqli_query($this->con,$query);
        if($result){
            $row = mysqli_fetch_array($result);
            return $row[0]['Amount'];
        }else{
            return -1;
        }
    }
    function getFuelReq($place1,$place2){
        $distance = $this->getTravelDistance($place1, $place2);
        return $distance * 100;
    }
    
    function goNoGoForLaunch($ship,$place){
        return $this->getShipsFuel($ship) >= $this->getFuelReq($ship['PlaceID'],$place);
    }
    
    function move($ship,$place){
        if($this->goNoGoForLaunch($ship, $place)){
            $query = "UPDATE ships SET Location=" . $place . " WHERE ShipCode=" . $ship['ShipCode'];
            return mysqli_query($this->con,$query);
        }else{
            return False;
        }
    }
    
}
?>