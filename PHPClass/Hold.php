<?php

/**
 * Class represents the hold of a ship
 */

class Hold{
    private $link;
    public function __construct($con,$holdCode) {
        $this->link = $con;
        $this->code = $holdCode;
        $this->update();
    }
    
    /**
     * Update information for the database
     */
    function update(){
        $QRY = "SELECT * FROM cargo WHERE cargo.HoldCode =$this->code";
        $result = mysqli_query($this->link,$QRY);
        while($row = mysqli_fetch_array($result)){
                $this->resources[$row['ResourceID']] = $row['Amount'];
        }
    }
    
    /**
     * Get amount of resource in hold
     * @param type $resource
     * @return int
     */
    public function get($resource){
        return $this->resources[$resource->getID()];
    }
    
    /**
     * Drop resource from cargo 
     * @param type $resource
     * @return success
     */
    public function drop($resource){
        $QRY = "DELETE FROM cargo WHERE HoldCode=" . $this->code . " AND ResourceID=" . $resource->getID ;
        return mysqli_query($this->link, $QRY);
    }
    
    /**
     * Add resource to cargo
     * @param type $resource
     * @param type $initial value
     * @return success
     */
    public function add($resource,$init){
        $QRY = "INSERT INTO cargo (HoldCode,ResourceID,Amount) values(" . $this->code . "," . $resource->getID() . "," . $init . ")";
        return mysqli_query($this->link, $QRY);
    }
    
    /**
     * Set value of resource in hold
     * @param type $resource
     * @param type $amount
     * @return success
     */
    public function set($resource,$amount){
        $RID =$resource->getID();
        $query = "UPDATE cargo SET cargo.Amount='$amount' WHERE cargo..HoldCode=" . $this->code . " AND cargo.ResourceID=$RID";
        //keep local value up to date
        $this->resources[$RID] = $amount;
        return mysqli_query($this->link,$query);
    }
    
    /**
     * Set value of resource in hold
     * @param type $resource
     * @param type $change
     * @return success
     */
    function change($resource,$change){
        $RID =$resource->getID();
        if($this->checkExistance($resource)){
           $query = "UPDATE cargo SET cargo.Amount=cargo.Amount + '$change' WHERE cargo.HoldCode=" . $this->code . " AND cargo.ResourceID=$RID"; 
        }else{
            $query = "INSERT INTO cargo (HoldCode,ResourceID,Amount) values($this->code,$RID,$change)";
        }
        //echo $query;
        //keep local value up to date
        $this->resources[$RID] += $change;
        return mysqli_query($this->link,$query);
    }
    
    /**
     * Convert class to string
     * @return string
     */
    function __toString() {
        return json_encode(get_object_vars($this));
    }
    
    /**
     * Return all the resources in the hold
     * @return array
     */
    function all(){
        return $this->resources;
    }
    
    /**
     * Function to check if resource in hold
     * @param Resource $resource
     * @return boolean
     */
    private function checkExistance($resource){
        $RID = $resource->getID();
        $query = "SELECT HoldCode FROM cargo WHERE HoldCode=$this->code AND ResourceID=$RID";
        return mysqli_query($this->link, $query);
    }
}
