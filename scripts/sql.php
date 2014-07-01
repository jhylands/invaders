<?php
// Create connection to database
$con=mysqli_connect("localhost","root","space(11)","invaders");
// Check connection
if (mysqli_connect_errno($con))
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
?>
