<?php 
//Add to 'users' table
//Add their first ship to the ships table
//add their ships hold to the hold table add add the id of that to the ships entry
//add some initial cargo to the cargo table
function createUser($db,$FID,$name){
        //get facebook ID and name from facebook
        //enter then into the users table
        try{
        echo '<h1>incliding name now</h1>';
        $a = array('FID'=>$FID,'Name'=>$name);
        echo $db->insert('OldUsers',$a);
        //echo $db->query("INSERT INTO OldUsers (FID,Name) VALUES(%d,'%s')",array($FID,$name));
        echo "<h1>" . $db->lastId() . "</h1>";
        echo $db->query("INSERT INTO ships (ShipName,ShipType,UserID,Location,Shielding) VALUES('FirstShip',1,%d,3,100)",array($FID));

        echo $db->query("INSERT INTO hold");
        $HoldCode = $db->lastId();
        for($i=1;$i<4;$i++){
            echo $db->query("INSERT INTO Cargo (HoldCode,ResourceID,Amount) VALUES(%d,%d,500)",array($HoldCode,$i));
        }
       echo '<h1>ending query</h1>'; 
} catch (Exception $e) {
    echo '<h1>Caught exception: ',  $e->getMessage(), "</h1>\n";
}
}
