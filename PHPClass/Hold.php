<?php

/**
 * Class represents the hold of a ship
 */

class Hold{
    private $db;
    public function __construct($db,$holdCode) {
        $this->db = $db;
        $this->code = $holdCode;
        $this->update();
    }
    
    /**
     * Update information for the database
     */
    function update(){
        $QRY = "SELECT * FROM cargo WHERE cargo.HoldCode =%d";
        $result = $this->db->query($QRY,array($this->code));
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
     * WARNING
     * If this function doesn't work check SQL permissions it requies the permission to delete
     * @param type $resource
     * @return success
     */
    public function drop($resource){
        //$QRY = "DELETE FROM cargo WHERE HoldCode='" . $this->code . "' AND ResourceID='" . $resource->getID() ."'" ;
        return $this->set($resource,0);
    }
    
    /**
     * Add resource to cargo
     * @param type $resource
     * @param type $initial value
     * @return success
     */
    public function add($resource,$init){
        $QRY = "INSERT INTO cargo (HoldCode,ResourceID,Amount) values(" . $this->code . "," . $resource->getID() . "," . $init . ")";
        return $this->db->query( $QRY);
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
        $r = $this->db->query($query);
        $this->update();
        return $r;
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
        $r = $this->db->query($query);
        $this->update();
        return $r;
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
        return $this->db->query( $query);
    }
}
