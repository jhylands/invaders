<?php

/**
 * Class resources to handle resource requests
 */
class Resource{
    function __construct($connection){
        //require a connection to the database to check values
        $this->db = $connection;
        $this->ID = null;
        $this->Name = null;
        $this->Code = null;
    }
    function __toString(){
        return "ID:$this->ID; Code:$this->Code; Name:$this->Name;";
    }
    //WARNING No check for valididty of id,name or code on creation
    function fromID($ID){
        $this->ID = $ID;
        $query = "SELECT * FROM resources WHERE ResourceID=?";
        $results = $db->query($query,[$ID]);
        foreach($results as &$result){
                $this->Name = $result['Name'];
                $this->Code = $result['Code'];
        }
    }
    /**
     * Function makes resource from name
     * @param  $Name
     */
    function fromName($Name){
        $this->Name = $Name;
        $query = "SELECT * FROM resources WHERE Name='?'";
        $results = $db->query($query,[$name]);
        foreach($results as &$result){
                $this->ID = $result['ResourceID'];
                $this->Code = $result['Code'];
        }
    }
    /**
     * function make resource from the code
     * @param $Code
     */
    function fromCode($Code){
        $this->Code = mysqli_real_escape_string($this->db,strtoupper($Code));
        $query = "SELECT * FROM resources WHERE Code='?'";
        $results = $db->query($query,[$Code]);
        foreach($results as &$result){
                $this->ID = $result['ResourceID'];
                $this->Name = $result['Name'];
                return true;
        }
        return false;
    }
    function getID(){
        return $this->ID;
    }
    function getName(){
        return $this->Name;
    }
    function getCode(){
        return $this->Code;
    }
    /**
     * 
     * @param Resource $resource
     * @return BOOLEAN
     */
    public function eq($resource){
        return $resource->getID()==$this->getID();
    }
}

