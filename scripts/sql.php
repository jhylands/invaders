<?php
// Create connection to database
$mysql_host = "localhost";
$mysql_database = "timepcou_invaders";
$mysql_user = "timepcou_site";
$mysql_password = "I}3C=M\$z1lT$";
$con=mysqli_connect($mysql_host,$mysql_user,$mysql_password,$mysql_database);
// Check connection
if (mysqli_connect_errno($con))
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
?>
