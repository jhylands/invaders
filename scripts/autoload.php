<?php

//layzy class loader
    spl_autoload_register(function ($class) {
        include '/home/timepcou/public_html/PHPClass/' . $class . '.php';
    });