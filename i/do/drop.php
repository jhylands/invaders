<?php

include '../std.php';
$resource = new Resource($db);
$resource->fromID((int)$_GET['id']);
echo $ship->hold->drop($resource);
