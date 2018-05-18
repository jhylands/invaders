<?php

/**
 * Place Class to manage place objects
 */
class Place{
    function __construct($connect){
        $this->con = $connect;
    }
    function fromID($ID){
        //get information from the location table
        $this->ID=$ID;
        $query = "SELECT * FROM locations WHERE PlaceID=$ID";
        $result = mysqli_query($this->con,$query);
        while($row = mysqli_fetch_array($result)){
                $this->Name = $row['PlaceName'];
                $this->URL = $row['PlanetURL'];
                $this->OrbitalRadius = $row['OrbitalRadius'];
                $this->InOrbitOf = $row['InOrbitOf'];
                $this->Temperature = $row['Temperature'];
                $this->SurfaceGravity = $row['SurfaceGravity'];
                $this->Radius = $row['Radius'];
                $this->Reflection = $row['Reflection'];
        }
        //get information from the map table
        $query = "SELECT * FROM maps WHERE PlaceID=$ID";
        $result = mysqli_query($this->con, $query);
        while($row = mysqli_fetch_array($result)){
            $this->Map[$row['MapType']] = $row['URL'];
        }
        $this->market = new Market($this->con,$this->ID);
    }
    function __toString() {
        return json_encode(array_diff_key(get_object_vars($this),["con"=>1,"market"=>1]));
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
        $query = "SELECT PlaceID FROM locations WHERE InOrbitOf=$ID";
        $result = mysqli_query($this->con,$query);
        $iDs = [];
        while($row = mysqli_fetch_array($result)){
            $iDs[] = $row['PlaceID'];
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
            $place = new Place($this->con);
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

