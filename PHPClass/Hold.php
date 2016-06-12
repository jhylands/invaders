<?php

/**
 * Class represents the hold of a ship
 */

class Hold{
    public function __construct($con,$holdCode) {
        $this->con = $con;
        $this->code = $holdCode;
        $this->update();
    }
    
    /**
     * Update information for the database
     */
    function update(){
        $QRY = "SELECT * FROM cargo WHERE cargo.HoldCode =$this->code";
        $result = mysqli_query($this->con,$QRY);
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
        return mysqli_query($this->con, $QRY);
    }
    
    /**
     * Add resource to cargo
     * @param type $resource
     * @param type $initial value
     * @return success
     */
    public function add($resource,$init){
        $QRY = "INSERT INTO cargo (HoldCode,ResourceID,Amount) values(" . $this->code . "," . $resource->getID() . "," . $init . ")";
        return mysqli_query($this->con, $QRY);
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
        return mysqli_query($this->con,$query);
    }
    
    /**
     * Set value of resource in hold
     * @param type $resource
     * @param type $change
     * @return success
     */
    function change($resource,$change){
        //can be done as a single sql query
        $RID =$resource->getID();
        $query = "UPDATE cargo SET cargo.Amount=cargo.Amount + '$change' WHERE cargo..HoldCode=" . $this->code . " AND cargo.ResourceID=$RID";
        //keep local value up to date
        $this->resources[$RID] += $change;
        return mysqli_query($this->con,$query);
    }
    
    /**
     * Convert class to string
     * @return string
     */
    function __toString() {
        return json_encode(get_object_vars($this));
    }
}