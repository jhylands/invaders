<?php
$abs = '/home/timepcou/public_html/invaders/';
$relative = '../../';

$relative = __DIR__ . '/../';

include $relative . 'scripts/autoload.php';

require_once $relative . 'users/init.php';
if (!securePage($_SERVER['PHP_SELF'])){die();} 
//include $relative . 'scripts/sql.php';
include $relative . 'scripts/shipInfo.php';

$ship = new Ship($db,$ShipCode);

