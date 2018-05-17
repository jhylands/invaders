/* global THREE, contentManager,console */

/**
 * Class representing the abstraction of a celectial object, planet, moon sun
 */
function Celestial(){
    this.id;
    this.children = [];
    /*
     * Include a reference to this celestials mesh so it only has to be added once
     */
    this.object;
    /**
     * Function to get the object, around which, this is orbiting
     * @returns {Celectial}
     */
    this.inOrbitOf = function (){console.warn('Abstract function inOrbitOf not overwritten!');};
    this.getID = function(){ return parseInt(this.id);};
    this.getOrbitalRadius = function(){return parseInt(this.OrbitalRadius);};
    this.fromPackage = function(information){
        /*jshint sub:true*/
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
        //console.log(maxLoop);
        for(var i=0;i<maxLoop;i++){
            var ChildsInformation = information['children'][i];
            this.children[i] = this.makeCelestial(ChildsInformation);
        }
        /*
        var self = this;
        this.children = information.children.map(self.makeCelestial);
        return this;
        */
    };
    
    this.getRadius = function(){return this.radius;};
    this.getThree = function (){if(this.litObject){return this.litObject;}else{return this.bindLights();}};
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
            var spec=null;
            var bump=null;
            var em=null;
            
            var planetGeometry = new THREE.SphereGeometry(this.radius,32,32);
            
            //chorten map references
            var Map = this.map;
            //not sure why this isn't binding ffs
            img = contentManager.getTexture(Map.IMG);
            if('SPEC' in Map){spec = new THREE.TextureLoader().load('images/' +Map.SPEC);}
            if('BUMP' in Map){bump = new THREE.TextureLoader().load('images/' +Map.BUMP);}
            if('EM' in Map){em = new THREE.TextureLoader().load('images/' +Map.EM);}            
            var planetMaterial = new THREE.MeshPhongMaterial({
                    map:img,
                    emissiveMap:em,
                    bumpMap:bump,
                    bumpScale:2,
                    specularMap:spec
                    });
            var object = new THREE.Mesh(planetGeometry,planetMaterial);
            this.object = object;
            if('CLD' in Map){
                /*var cloudGeometry = new THREE.SphereGeometry(this.radius*1.001,32,32);
                var cld = new THREE.TextureLoader().load('images/' + Map.CLD);
                var cloudMaterial = new THREE.MeshPhongMaterial({
                    map:cld,
                    opacity:0.8,
                    transparent:true,
                    depthWrite:false
                });
                var clouds = new THREE.Mesh(cloudGeometry,cloudMaterial);*/
                this.object.add(this.createEarthCloud());
            }
            window.setInterval(function(){return function(){object.rotation.y+=0.0001;};}(),50);
            return this.object;
    };
    /**
     * 
     * @param {function} caller
     * @returns {void}
     */
    this.recurseThroughSystems = function( caller ){
        //added debugging
        console.log(this.map);
        this.children.map(function(a){a.recurseThroughSystems(caller);});
        caller(this);
        this.children.map(caller);
    };
    this.addChildrenToScene = function(){
        
    };
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
    this.createEarthCloud	= function(){
            // create destination canvas
            var canvasResult	= document.createElement('canvas');
            canvasResult.width	= 2048;
            canvasResult.height	= 1024;
            var contextResult	= canvasResult.getContext('2d')	;	

            // load earthcloudmap
            var imageMap	= new Image();
            imageMap.addEventListener("load", function() {

                    // create dataMap ImageData for earthcloudmap
                    var canvasMap	= document.createElement('canvas');
                    canvasMap.width	= imageMap.width;
                    canvasMap.height= imageMap.height;
                    var contextMap	= canvasMap.getContext('2d');
                    contextMap.drawImage(imageMap, 0, 0);
                    var dataMap	= contextMap.getImageData(0, 0, canvasMap.width, canvasMap.height);

                    // load earthcloudmaptrans
                    var imageTrans	= new Image();
                    imageTrans.addEventListener("load", function(){
                            // create dataTrans ImageData for earthcloudmaptrans
                            var canvasTrans		= document.createElement('canvas');
                            canvasTrans.width	= imageTrans.width;
                            canvasTrans.height	= imageTrans.height;
                            var contextTrans	= canvasTrans.getContext('2d');
                            contextTrans.drawImage(imageTrans, 0, 0);
                            var dataTrans		= contextTrans.getImageData(0, 0, canvasTrans.width, canvasTrans.height);
                            // merge dataMap + dataTrans into dataResult
                            var dataResult		= contextMap.createImageData(canvasMap.width, canvasMap.height);
                            for(var y = 0, offset = 0; y < imageMap.height; y++){
                                    for(var x = 0; x < imageMap.width; x++, offset += 4){
                                            dataResult.data[offset+0]	= dataMap.data[offset+0];
                                            dataResult.data[offset+1]	= dataMap.data[offset+1];
                                            dataResult.data[offset+2]	= dataMap.data[offset+2];
                                            dataResult.data[offset+3]	= dataTrans.data[offset+0];
                                    }
                            }
                            // update texture with result
                            contextResult.putImageData(dataResult,0,0)	;
                            material.map.needsUpdate = true;
                    });
                    imageTrans.src	= 'images/earthcloudmap.jpg';
            }, false);
            imageMap.src	= 'images/earthcloudmap.jpg';
            
            var geometry	= new THREE.SphereGeometry(parseInt(this.radius) + 20, 32, 32);
            var material	= new THREE.MeshPhongMaterial({
                    map		: new THREE.Texture(canvasResult),
                    
                    transparent	: true,
                    opacity		: 0.9
            });
            var mesh	= new THREE.Mesh(geometry, material);
            return mesh	;
    };
}
