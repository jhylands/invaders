<?php

class Distance{
    function getTravelDistance($Place1,$Place2){  
        return abs( $Place1->getOrbitalRadius()-$Place2->getOrbitalRadius() );
    }
}
