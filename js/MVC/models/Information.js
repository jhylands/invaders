/**
 * Class to manage global information about the game.
 * @returns {I}
 */
function Information(){
    this.system = new Celestial();
    this.place;//reference to the current position of the users current ship in the celctial tree
    this.ship;//the current ship
    this.ship;
    
    this.systemSetup = function(){
        //$.ajax('i/get/startingPack.php',function(result){system = eval(result);});
        this.system = __sun;
        __sun = null;
    };
    this.shipSetup = function(){
        //$.ajax('i/get/ship.php',function(result){system = eval(result);});
        this.shipInfo = __ship;
        __ship=null;
    };
    //setup should come from a global variable loaded in by single.js
    this.setup = function(){this.systemSetup();this.shipSetup();};
    this.getSystem = function(){
        if(this.system){
            return this.system;
        }else{
            console.warn("Read before write in I class!");
            return this.system;
        }
    };
    
}