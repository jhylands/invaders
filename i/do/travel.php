<?php

include '../std.php';
$to = new Place($con);
$to->fromID((int)$_GET['to']);
$travel = new Travel($con, $ship);
echo json_encode($travel->tryMove($to));
