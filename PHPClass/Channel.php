<?php

/**
 * Description of Channel
 *
 * @author jameshylands
 */
class Channel {
    
    private $buyRe;
    private $buyRa;
    private $sellRe;
    private $sellRa;
    
    public function getRate(){
        return $this->buyRa/$this->sellRa;
    }
}
