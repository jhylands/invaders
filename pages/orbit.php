<?php
include '../scripts/sql.php';
include '../scripts/shipInfo.php';

$ship = new ship($con,$shipCode);

echo $ship->place->toString();

?>
