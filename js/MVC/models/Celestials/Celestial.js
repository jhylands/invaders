/**
 * Class representing the abstraction of a celectial object, planet, moon sun
 */
function Celestial(){
    this.id;
    /**
     * Function to get the object, around which, this is orbiting
     * @returns {Celectial}
     */
    this.inOrbitOf = function (){console.warn('Abstract function inOrbitOf not overwritten!');};
    this.getID = function(){ return this.id;};
    this.fromPackage = function(information){
        this.id = information['PlaceID'];
        this.name = information['PlaceName'];
        this.OrbitalRadius = information['OrbitalRadius'];
        this.hostID = information['InOrbitOf'];
        this.Temperature = information['Temperature'];
        this.gravity = information['SurfaceGravity'];
        this.radius = information['Radius'];
        for(i=0;i<information['children'].length;i++){
            var ChildsInformation = information['children'][i];
            this.children[i] = this.makeCelestial(ChildsInformation);
        }
    };
    this.children = new array();
    /**
     * 
     * @param {function} caller
     * @returns {void}
     */
    this.recurseThroughSystems = function( caller ){
        this.children.map(function(a){a.recurseThroughSystems(caller);});
        caller(this);
    };
    /**
     * Function to generate a celestial object from information array (I know thats vauge but its getting to the end of the day)
     * 
     * 
     * @param {type} information
     * @returns {void}
     */
    this.makeCelestial= function(information){
        var celestial;
        switch(information['type']){
            case 'star':
                celestial = new Star();
                break;
            case 'planet':
                celestial = new Planet();
                break;
            case 'moon':
                celestial = new Moon();
                break;
            default:
                console.warn('Problem with makeCelestial() type invalid');
        }
        return celestial.fromPackage(information);
    };
}