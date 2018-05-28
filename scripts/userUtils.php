<?php 
//Add to 'users' table
//Add their first ship to the ships table
//add their ships hold to the hold table add add the id of that to the ships entry
//add some initial cargo to the cargo table
function INVADERScreateUser($db,$FID,$name){
        //get facebook ID and name from facebook
        //enter then into the users table
        try{
        //echo '<h1>incliding name now</h1>';
        //get the values for inclusion in db 
        $shipCode=$db->query("Select ShipCode from ships order by ShipCode DESC limit 1")->first()->ShipCode+1;
        $holdCode=$db->query("Select HoldCode from hold order by HoldCode DESC limit 1")->results()[0]->HoldCode+1;
        //echo "<br />ShipCode:$shipCode<br />";
        //echo "<br />HoldCode:$holdCode<br />";
        


        $ship = array('FID'=>$FID,'Name'=>$name,'Experiance'=>0,'quality'=>1,'CurrentShip'=>$shipCode);
        $db->insert('OldUsers',$ship);
        $ship = array(
            'ShipCode'=>$shipCode,
            'ShipName'=>'FirstShip',
            'ShipType'=>1          ,
            'OwnerID'=> $FID        ,
            'Location'=>3          ,
            'Shielding'=>100,
            'holdCode'=> $holdCode
        );
        if($db->insert('ships',$ship)){echo'ships(1)';}else{echo 'ships(0)';}
        $db->insert('hold',['HoldCode'=>$holdCode]);
        for($i=2;$i<5;$i++){
            $hold= array(
            'HoldCode'=>    $holdCode,
            'ResourceID'=>  $i,
            'Amount'=>      500
             );
            if($db->insert("cargo",$hold)){echo 'cargoo';}else{echo'carstop';}
        }
    } catch (Exception $e) {
        echo '<h1>Caught exception: ',  $e->getMessage(), "</h1>\n";
    }
}

function INVADERSdeleteUser($db,$id){
    echo "<h1>id:$id</h1>";
    echo dump($db->query("SELECT * FROM ships WHERE OwnerID = ? ",[$id]));
    $HoldCode = $db->query("SELECT HoldCode FROM ships WHERE OwnerID = ?",array($id))->first()->HoldCode;
    echo "<h1>HoldCode:$HoldCode</h1>";
    $query4 = $db->query("DELETE FROM OldUsers WHERE FID = ?",array($id));
    $query5 = $db->query("DELETE FROM ships WHERE OwnerID = ?",array($id));
    $query6 = $db->query("DELETE FROM hold WHERE HoldCode = ?",array($HoldCode));
    $query7 = $db->query("DELETE FROM cargo WHERE HoldCode = ?",array($HoldCode));
}
