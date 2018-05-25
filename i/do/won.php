<?php

include '../std.php';
//definatly needs changing 
$res = new Resource($db);
$res->fromID(2);
$ship->hold->change($res, 100);

