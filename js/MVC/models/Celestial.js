/* global THREE, contentManager */

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
        this.id = information['ID'];
        this.name = information['Name'];
        this.OrbitalRadius = information['OrbitalRadius'];
        this.hostID = information['InOrbitOf'];
        this.Temperature = information['Temperature'];
        this.gravity = information['SurfaceGravity'];
        this.radius = information['Radius'];
        this.Reflection = information['Reflection'];
        this.map = information['Map'];
        var maxLoop = information['children'].length;
        console.log(maxLoop);
        for(var i=0;i<maxLoop;i++){
            var ChildsInformation = information['children'][i];
            this.children[i] = this.makeCelestial(ChildsInformation);
        }
        return this;
    };
    this.getRadius = function(){return this.radius;};
    /*
     * Include a reference to this celestials mesh so it only has to be added once
     */
    this.object;
    this.getThree = function (){if(this.litObject){return this.litObject;}else{return this.bindLights();};};
    //function to bind lights to the celestial to simulate reflection from another light
    this.bindLights = function(){
        if(!this.object){this.create();}
        var planetLight = new THREE.PointLight(parseInt(this.Reflection,16));
        var planetObject = new THREE.Group();
        planetObject.add(this.object);
        planetObject.add(planetLight);
        this.litObject= planetObject;
        this.litObject.name = 'planet';
        return this.litObject;
    };
    this.create = function(){
        //initiate the maps
            var img;
            var planetGeometry = new THREE.SphereGeometry(this.radius,32,32);
            //chorten map references
            var Map = this.map;
            //not sure why this isn't binding ffs
            img = contentManager.getTexture(Map.IMG);
            if('SPEC' in Map){var spec = new THREE.TextureLoader().load('images/' +Map.SPEC);}else{spec=null;}
            if('BUMP' in Map){var bump = new THREE.TextureLoader().load('images/' +Map.BUMP);}else{bump=null;}
            if('EM' in Map){var em = new THREE.TextureLoader().load('images/' +Map.EM);}else{em=null;}

            var planetMaterial = new THREE.MeshPhongMaterial({
                    map:img,
                    emissiveMap:em,
                    bumpMap:bump,
                    specularMap:spec
                    });
            this.object= new THREE.Mesh(planetGeometry,planetMaterial);
            
            return this.object;
    };
    this.children = new Array();
    /**
     * 
     * @param {function} caller
     * @returns {void}
     */
    this.recurseThroughSystems = function( caller ){
        this.children.map(function(a){a.recurseThroughSystems(caller);});
        this.children.mapcaller(this.getThree());
    };
    this.addChildrenToScene = function(){
        
    }
    /**
     * Function to generate a celestial object from information array (I know thats vauge but its getting to the end of the day)
     * 
     * 
     * @param {type} information
     * @returns {void}
     */
    this.makeCelestial= function(information){
        var celestial=new Celestial();
        return celestial.fromPackage(information);
    };
    
    this.findFromChildren = function(ID){
        if(this.getID()===ID){
            return this;
        }
        //should be using reduce here
        //return this.children.reduce(function(acc,val,ind,arr){return )
        for(var i =0;i<this.children.length;i++){
            var child = this.children[i].findFromChildren(ID);
            if(child!==-1){
                return child;
            }
        }
        return -1;
        
    };
}