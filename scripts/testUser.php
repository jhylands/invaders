<?php
include 'userUtils.php';
include '../users/init.php';
$db = DB::getInstance();
if($_GET['cd']=='d'){
    deleteUser($db,$_GET['id']);
}else{ 
    createUser($db,$_GET['id'],'name');
}
