//Add to 'users' table
//Add their first ship to the ships table
//add their ships hold to the hold table add add the id of that to the ships entry
//add some initial cargo to the cargo table
<?php 
include 'scripts/sql.php';
function createUser($FID,$name){
        //get facebook ID and name from facebook
        //enter then into the users table
        $db->query("INSERT INTO Oldusers (FID,Name) VALUES(%d,'%s')",array($FID,$name));
        $oldUserID = $db->lastId();
        $db->query("INSERT INTO ships (ShipName,ShipType,UserID,Location,Shielding) VALUES('FirstShip',1,%d,3,100)",array($FID));

        $db->query("INSERT INTO hold");
        $HoldCode = $db->lastId();
        for($i=1;$i<4;$i++){
            $db->query("INSERT INTO Cargo (HoldCode,ResourceID,Amount) VALUES(%d,%d,500)",array($HoldCode,$i));
        }
        $result = $db->query($con,$QRY . $_SESSION['User']);
}
