<?php

include '../scripts/sql.php';
include '../scripts/shipInfo.php';
$ship = new Ship($con,$ShipCode);

echo $ship;
