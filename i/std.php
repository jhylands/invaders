<?php
//layzy class loader
    spl_autoload_register(function ($class) {
        include '/home/timepcou/public_html/PHPClass/' . $class . '.php';
    });
include '/home/timepcou/public_html/scripts/sql.php';
include '/home/timepcou/public_html/scripts/shipInfo.php';

$ship = new Ship($con,$ShipCode);

