//Add to 'users' table
//Add their first ship to the ships table
//add their ships hold to the hold table add add the id of that to the ships entry
//add some initial cargo to the cargo table
<?php 
include 'scripts/sql.php';
//get facebook ID and name from facebook
//enter then into the users table
mysqli_query($con,"INSERT INTO users (FID,Name) VALUES(" . $FID . ",'" . $name . "')");

mysqli_query($con,"INSERT INTO ships (ShipName,ShipType,UserID,Location,Sheilding) VALUES('FirstShip',1," . $FID . ",3,100)");

mysqli_query($con,"INSERT INTO hold");

mysqli_query($con, "INSERT INTO Cargo (HoldCode,ResourceID,Amount) VALUES(" . $holdCode . ",1,500)");
mysqli_query($con, "INSERT INTO Cargo (HoldCode,ResourceID,Amount) VALUES(" . $holdCode . ",2,500)");
mysqli_query($con, "INSERT INTO Cargo (HoldCode,ResourceID,Amount) VALUES(" . $holdCode . ",3,500)");

?>
