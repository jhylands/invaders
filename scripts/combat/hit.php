<?php 
include '../sql.php';
include '../shipInfo.php';
$result = mysqli_query($con, "UPDATE ships SET Sheilding=" . $ship['Sheilding']-5 . " WHERE ShipCode=" . $ship['ShipCode']);
?>