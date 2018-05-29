<?php

/**
 * Class to hold information about the user
 */
class Owner {
    function __construct($connection,$FID){
        $this->db = $connection;
        $this->FIN = $FID;
        $query = "SELECT * FROM OldUsers WHERE FID=?";
        $this->__user = $this->db->query($query,[$FID])->first(true);
    }
    function getID(){
        return $this->__user['FID'];
    }
    function getQuality(){
        return $this->__user['Quality'];
    }
    function setQuality($quality){
        $query = "UPDATE OldUsers SET Quality=? WHERE FID=?";
        return $this->db->query($query,[$quality,$this->FID]);
    }
    function update(){}
    function getName(){
        return $this->__user['Name'];
    }

}
        
