/**
 * Class to manage global information about the game.
 * @returns {I}
 */
function I(){
    this.system = new Celestial();
    this.place;//reference to the current position of the users current ship in the celctial tree
    this.ship;//the current ship
    this.init = function(){
        this.system.fromPackage(Information);
        this.ship
    };
    
    this.getSystem = function(){
        if(this.system){
            return this.system;
        }else{
            console.warn("Read before write in I class!");
            return this.system;
        }
    };
}