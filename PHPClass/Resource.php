<?php

/**
 * Class resources to handle resource requests
 */
class Resource{
    function __construct($connection){
        //require a connection to the database to check values
        $this->con = $connection;
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
        $query = "SELECT * FROM resources WHERE ResourceID=$ID";
        $result = mysqli_query($this->con,$query);
        while($row = mysqli_fetch_array($result)){
                $this->Name = $row['Name'];
                $this->Code = $row['Code'];
        }
    }
    /**
     * Function makes resource from name
     * @param  $Name
     */
    function fromName($Name){
        $this->Name = $Name;
        $query = "SELECT * FROM resources WHERE Name='$Name'";
        $result = mysqli_query($this->con,$query);
        while($row = mysqli_fetch_array($result)){
                $this->ID = $row['ResourceID'];
                $this->Code = $row['Code'];
        }
    }
    /**
     * function make resource from the code
     * @param $Code
     */
    function fromCode($Code){
        $this->Code = $Code;
        $query = "SELECT * FROM resources WHERE Code='$Code'";
        $result = mysqli_query($this->con,$query);
        while($row = mysqli_fetch_array($result)){
                $this->ID = $row['ResourceID'];
                $this->Name = $row['Name'];
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

