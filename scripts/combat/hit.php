<?php 
include '../sql.php';
include '../shipInfo.php';
$result = mysqli_query($con, "UPDATE ships SET Shielding=" . $ship['Shielding']-5 . " WHERE ShipCode=" . $ship['ShipCode']);
?>