<?php

include '../std.php';
//definatly needs changing 
$res = new Resource($con);
$res->fromID(2);
$ship->hold->change($res, 100);

