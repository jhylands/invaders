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
        $results = $this->db->query($QRY,array($this->code));
        foreach($results as &$result){
                $this->resources[$result['ResourceID']] = $result['Amount'];
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
        $QRY = "INSERT INTO cargo (HoldCode,ResourceID,Amount) values(%d,%d,%f)";
        return $this->db->query( $QRY , [ $this->code , $resource->getID() ,$init]);
    }
    
    /**
     * Set value of resource in hold
     * @param type $resource
     * @param type $amount
     * @return success
     */
    public function set($resource,$amount){
        $RID =$resource->getID();
        $query = "UPDATE cargo SET cargo.Amount='%f' WHERE cargo.HoldCode=%d AND cargo.ResourceID=%d";
        //keep local value up to date
        $this->resources[$RID] = $amount;
        $r = $this->db->query($query,[$amount,$this->code,$RID]);
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
           $query = "UPDATE cargo SET cargo.Amount=cargo.Amount + '%f' WHERE cargo.HoldCode=%d AND cargo.ResourceID=%d"; 
            $r = $this->db->query($query,[$change,$this->code,$RID]);
        }else{
            $the_cargo = array(
                'HoldCode'   =>$this->code ,
                'ResourceID' =>$RID        ,
                'Amount'     =>$change     
            );
            $r = $this->db->insert('cargo',$the_cargo);
        }
        //echo $query;
        //keep local value up to date
        $this->resources[$RID] += $change;
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
        $query = "SELECT HoldCode FROM cargo WHERE HoldCode=%d AND ResourceID=%d";
        return $this->db->query( $query,[$this->code,$RID]);
    }
}
