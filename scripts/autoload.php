<?php
$abs = '/home/timepcou/public_html/invaders';
//layzy class loader
    spl_autoload_register(function ($class) {
        include __DIR__ . '/../PHPClass/' . $class . '.php';
    });