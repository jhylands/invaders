<?php

include '../std.php';
$resource = new Resource($con);
$resource->fromID((int)$_GET['id']);
echo $ship->hold->drop($resource);
