<?php

include '../std.php';
$ship = new Ship($con,$ShipCode);

echo $ship->place;
