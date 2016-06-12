<?php
/**
 * Class to handle cargo comands
 */
class CargoHadler{
    function cargoHandler($con,$ship){
        $this->con = $con;
        $this->ship = $ship;
    }
    
    function handle($command){
        switch($command[1]){
        case 'drop':
                return $this->drop($command);
                break;
        case 'help':
                return "Cargo allows you to view and drop elements of cargo in the hold of your ship. cargo [drop] [resource]<br />";
                break;
        default:
                return info();
        }
    }
    
    /**
     * Function to drop a resource from the hold
     * @param type $command
     * @return Responce
     */
    function drop($command){
        $resource = new Resource($this->con);
        if(!$resource->fromCode($command[2])){return "Error bad resource code";}
        if($this->ship->hold->drop($resource)){
            return $resource->getName() . " Dropped";
        }else{
            return "Database error resource not dropped";
        }        
    }
    
    /**
     * Function to get information about the contense of the hold
     * @return responce
     */
    function info(){
        $response = "On this ship you have:";
        $response .= $this->ship->hold->__toString();
        return $response;
    }
}
?>