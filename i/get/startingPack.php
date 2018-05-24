<?php

include '../std.php';

//things that need to be included in the starter pack
/**
 * Information about the location
 * Information about the current ship
 * The solarsystem information for recursive recall
 */

//$ship = new Ship();
$place = new Place($con);
$place->fromID(0);
$place->makeTreeOfPlaces();
echo json_encode([$place,$ship,$ship->place->getID()]);
/*
echo "__sun = " . json_encode($place) . ";";
echo "__ship=5;";
echo "__place =" . $ship->place->getID(). ";";*/
