<?php
include 'createUser.php';
include '../users/init.php';
$db = DB::getInstance();
createUser($db,$_GET['id'],'js');
