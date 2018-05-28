<?php

/**
 * Place Class to manage place objects
 */
class Place{
    function __construct($db){
        $this->db = $db;
    }
    function fromID($ID){
        //get information from the location table
        $this->ID=$ID;
        $query = "SELECT * FROM locations WHERE PlaceID=%d";//$ID
        $results = $this->db->query($query,array($ID));
        foreach($results as &$result){
                $this->Name = $result['PlaceName'];
                $this->URL = $result['PlanetURL'];
                $this->OrbitalRadius = $result['OrbitalRadius'];
                $this->InOrbitOf = $result['InOrbitOf'];
                $this->Temperature = $result['Temperature'];
                $this->SurfaceGravity = $result['SurfaceGravity'];
                $this->Radius = $result['Radius'];
                $this->Reflection = $result['Reflection'];
        }
        //get information from the map table
        $query = "SELECT * FROM maps WHERE PlaceID=%d";
        $results = $this->db->query( $query,array($ID));
        foreach($results as &$result){
            $this->Map[$result['MapType']] = $result['URL'];
        }
        $this->market = new Market($this->db,$this->ID);
    }
    function __toString() {
        return json_encode(array_diff_key(get_object_vars($this),["db"=>1,"market"=>1]));
    }
    function eq($place){
        return $this->ID==$place->ID;
    }
    function getImage(){
        return $this->URL;
    }
    function getName(){
        return $this->Name;
    }
    function getID(){
        return $this->ID;
    }
    function getTemperature(){
        return $this->Temperature;
    }
    function getOrbitalRadius(){
        return $this->OrbitalRadius;
    }
    function getInOrbitOfID(){
        return $this->InOrbitOf;
    }
    /**
     * Function to get a list og the things that orbit it
     * @return INT[]
     */
    function getChildrenIDs(){
        $ID = $this->getID();
        $query = "SELECT PlaceID FROM locations WHERE InOrbitOf=%d";
        $results = $this->db->query($query,array($ID));
        $iDs = [];
        foreach($results as &$result){
            $iDs[] = $result['PlaceID'];
        }
        return $iDs;
    }
    /**
     * Function get an array of the places which are in orbit of this place
     * @return Place[]
     */
    function getChildren(){
        $childrenIDs= $this->getChildrenIDs(); 
        $children = [];
        foreach ($childrenIDs as &$child){
            $place = new Place($this->db);
            $place->fromID($child);
            $children[] = $place;
        }
        $this->children = $children;
        return $children;
    }
    /**
     * Function to cause all the children of each place to create their children
     * This can then be used at the begining of the game to get all the information required 
     * from the database
     */
    function makeTreeOfPlaces(){
        $this->getChildren();
        foreach($this->children as &$child){
            try{
                $child->makeTreeOfPlaces();
            }catch (Exception $e){
                echo json_encode($child);
            }
        }
    }
    function getSurfaceGravity(){
        return $this->SurfaceGravity;
    }
    function getRadius(){
        return $this->Radius;
    }
}
?>

