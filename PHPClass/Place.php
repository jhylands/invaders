<?php

/**
 * Place Class to manage place objects
 */
class Place{
    function __construct($connect){
        $this->con = $connect;
        $this->market = new Market($connect);
    }
    function fromID($ID){
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
        }
    }
    function __toString() {
        return json_encode(get_object_vars($this));;
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
    function getSurfaceGravity(){
        return $this->SurfaceGravity;
    }
    function getRadius(){
        return $this->Radius;
    }
}
?>

