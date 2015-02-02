<?php
function changeCargo($con,$ShipCode,$amount,$resource){
  $query= "SELECT * FROM ships,hold,cargo,resources WHERE ship.ShipCode=" . $ShipCode . " AND ships.HoldCode=hold.HoldCode AND hold.HoldCode = cargo.HoldCode AND cargo.ResourceID=resources.ResourceID AND resources.Name='" . $resource . "'";
?>
  
