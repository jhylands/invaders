<?php

/**
 * Abstract class Handler that handles command input
 *
 * @author jameshylands
 */
class Handler {
    function handle($comand){
        return "Abstract function handle not overwritten: " . $command[0];
    }
}
