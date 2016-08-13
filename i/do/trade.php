<?php

include '../std.php';
$buy = new Resource($con);
$buy->fromID((int)$_GET['buyRe']);
$sell = new Resource($con);
$sell->fromID((int)$_GET['sellRe']);
$ammount = (int)$_GET['ammount'];
$trader = new Trade($con, $ship);
echo $trader->make($buy, $amount, $sell);


