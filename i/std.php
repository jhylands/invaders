<?php

//layzy class loader
    spl_autoload_register(function ($class) {
        include '/home/timepcou/public_html/PHPClass/' . $class . '.php';
    });

require_once '/home/timepcou/public_html/users/init.php';
if (!securePage($_SERVER['PHP_SELF'])){die();} 
include '/home/timepcou/public_html/scripts/shipInfo.php';

$ship = new Ship($db,$ShipCode);

