/**
 * 
 * Class representing a fleet of ships
 */
function Fleet(bulletHandler){
    //inherits from ship class because the fleet can be treadted as a single ship entity
    this.__proto__ = new Ship(bulletHandler);
}
