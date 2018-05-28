<?php
include 'createUser.php';
include '../users/init.php';
$db = DB::getInstance();
if($db){
createUser($db,$_GET['id'],'js');
}else{
echo dump($db);
}
