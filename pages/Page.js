function Page(){
    //abstract functions for a page
    
    this.create = function(){console.log('Abstract function create not overwritten!');};
    this.keyboard = function(keystate){console.log('Abstract function keyboard not overwritten!');};
    this.update = function(){console.log('Abstract function update not overwritten!');};
    this.reload = function(){console.log('Abstract function reload not overwritten!');};
    this.onready = function(pageID){console.log('Abstract function onready not overwritten for page:' + pageID);};
    
    //Superclass functions
    
    //function to generate the Mesh for a planet from a JS-Planet object
    this.makePlanet = function(planet /*Should adhear to JS-Planet standard*/){
            //initiate the maps
            var img;
            var planetGeometry = new THREE.SphereGeometry(planet['Radius'],32,32);
            //chorten map references
            var Map = planet.Map;
            //not sure why this isn't binding ffs
            img = new THREE.TextureLoader().load('images/' + Map.IMG);
            if('SPEC' in Map){var spec = new THREE.TextureLoader().load(Map.SPEC);}else{spec=null;}
            if('BUMP' in Map){var bump = new THREE.TextureLoader().load(Map.BUMP);}else{bump=null;}
            if('EM' in Map){var em = new THREE.TextureLoader().load(Map.EM);}else{em=null;}

            var planetMaterial = new THREE.MeshPhongMaterial({
                    map:img,
                    emissiveMap:em,
                    bumpMap:bump,
                    specularMap:spec
                    });
            return new THREE.Mesh(planetGeometry,planetMaterial);
    }
    
    //function to add lighting to a Planet Mesh
    this.bindLights = function(threePlanet,planet){
            var planetLight = new THREE.PointLight(parseInt(planet.Reflection,16));
            var planetObject = new THREE.Group();
            planetObject.add(threePlanet);
            planetObject.add(planetLight);
            return planetObject;
    }
    //function to add the sun and its lights into the scene
    this.addSun = function(){
        var sun = new THREE.Group();
        var lightcolor =  0xFFFFFF
        var light = new THREE.PointLight( lightcolor );
        light.position.set( -100000, 10, -10 );
        sun.add(light);
	var sunGeometry = new THREE.SphereGeometry(69550,32,32);
	var sunTexture = new THREE.ImageUtils.loadTexture('images/sun.jpg');
	var sunMaterial = new THREE.MeshPhongMaterial({map:sunTexture});
	var sunMesh = new THREE.Mesh(sunGeometry,sunMaterial);
	sunMesh.position.x = -7000000;
	sun.add(sunMesh);
        return sun;
    }

}