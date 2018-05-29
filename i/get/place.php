<?php

include '../std.php';
$ship = new Ship($db,$ShipCode);

echo $ship->place;
