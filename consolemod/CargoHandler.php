<?php
//COMMAND:cargo;
//HELP:cargo [drop] [item] # The function to view what you currently have in your cargo hold;
/**
 * Class to handle cargo comands
 */
class CargoHadler extends Handler{
    function __construct($con,$ship){
        $this->con = $con;
        $this->ship = $ship;
    }
    
    function handle($command){
        $helpText = "Cargo allows you to view and drop elements of cargo in the hold of your ship. cargo [drop] [resource]<br />";
        switch($command[1]){
        case 'drop':
                return $this->drop($command);
                break;
        case 'help':
                return $helpText;
                break;
        default:
                return $this->info();
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
        $response = "On this ship you have:<br />";
        $resources = $this->ship->hold->all();
        foreach($resources as $key=>$value){
            $res = new Resource($this->con);
            $res->fromID($key);
            $response.= $res->getName() . " : " . $value . "<br />";
        }
        return $response;
    }
}
?>