<?php
//include a connection to the SQL database for other functions to use
//create a connection handler $con
include 'sql.php';
//check that the user is logged in
include 'security.php';
//get information about the user from the SQL database
//creates dictionary $ship
include 'shipInfo.php';
//include standard three.js strings
/*creates variables
 * $threeSetup <-javascript to setup the scene
 */
include 'threeIncludes.php';

?>
