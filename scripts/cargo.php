<?php
//file outdated 
//it doesn't need to exist

function changeCargo($con,$ShipCode,$amount,$resource){
  $query= "SELECT * FROM ships,hold,cargo,resources WHERE ship.ShipCode=" . $ShipCode . " AND ships.HoldCode=hold.HoldCode AND hold.HoldCode = cargo.HoldCode AND cargo.ResourceID=resources.ResourceID AND resources.Name='" . $resource . "'";
  $query= "UPDATE cargo SET Amount=" . $row['Amount'] - $amount . "WHERE CargoID=" . $row['CargoID'];
}
?>
  
