/**
 * Class representing the abstraction of a celectial object, planet, moon sun
 */
function Celestial(id){
    this.id = id;
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
    }
}