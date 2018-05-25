<?php

include '../std.php';
$buy = new Resource($db);
$buy->fromID((int)$_GET['buyRe']);
$sell = new Resource($db);
$sell->fromID((int)$_GET['sellRe']);
$ammount = (int)$_GET['ammount'];
$trader = new Trade($db, $ship);
echo json_encode($trader->make($buy, $ammount, $sell));


