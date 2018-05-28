<?php 
//Add to 'users' table
//Add their first ship to the ships table
//add their ships hold to the hold table add add the id of that to the ships entry
//add some initial cargo to the cargo table
function createUser($db,$FID,$name){
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
        for($i=1;$i<4;$i++){
            $hold= array(
            'HoldCode'=>    $holdCode,
            'ResourceID'=>  $i,
            'Amount'=>      500
             );
            //echo $db->insert("cargo",$hold);
        }
       //echo '<h1>ending query</h1>'; 
} catch (Exception $e) {
    echo '<h1>Caught exception: ',  $e->getMessage(), "</h1>\n";
}
}
