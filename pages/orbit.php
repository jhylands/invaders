<?php
include '../scripts/sql.php';
include '../scripts/shipInfo.php';

$ship = new ship($con,$ShipCode);

echo $ship->place->__toString();

?>
