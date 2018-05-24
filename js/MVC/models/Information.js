/**
 * Class to manage global information about the game.
 * @returns {I}
 */
function Information(){
    this.system = new Celestial();
    this.place;//reference to the current position of the users current ship in the celctial tree
    this.ship;//the current ship
    this.ship;
    
    this.setup = function(){
        var self=this;
        $.ajax('i/get/startingPack.php').done(function(){return function(result){
            var parsing = JSON.parse(result);
            var __sun=parsing[0];
            var __ship=parsing[1];
            var __place=parsing[2];
            self.system.fromPackage(__sun);
            self.shipInfo = __ship;
            self.place = self.system.findFromChildren(__place);
            start();
        };}());
        //this.system.fromPackage(__sun);
        //__sun = null;
    };
    this.update = function(){
        var self=this;
        $.ajax('i/get/startingPack.php').done(function(){return function(result){
            var parsing = JSON.parse(result);
            var __sun=parsing[0];
            var __ship=parsing[1];
            var __place=parsing[2];
            self.system.fromPackage(__sun);
            self.shipInfo = __ship;
            self.place = self.system.findFromChildren(__place);
        };}());
    };
    this.shipSetup = function(){
        //$.ajax('i/get/ship.php',function(result){system = eval(result);});
        this.shipInfo = __ship;
        __ship=null;
    };
    this.placeSetup = function(){
        this.place = this.system.findFromChildren(__place);
        __place =null;
    };
    //setup should come from a global variable loaded in by single.js
    //this.setup = function(){this.systemSetup();this.shipSetup();this.placeSetup();};
    this.getSystem = function(){
        if(this.system){
            return this.system;
        }else{
            console.warn("Read before write in I class!");
            return this.system;
        }
    };
    
}