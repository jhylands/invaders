//orbit class file
 
{a = function (renderer,scene,camera,onready){
        //inherits from page class
        this.__proto__ = new Page();
        
        //class information
	this.name = "Orbit";
	this.id = 0;
        
        //global THREE references
	this.renderer = renderer;
	this.scene = scene;
	this.__camera = camera;
        
        //class variables
	this.orbitPos = Math.PI/2;
        
        //Finished loading variables
        this.ready = false;
        this.onready = onready;
        
        //page changing handshake
        this.change = false; //set to true if request page change.
        this.nextPage; //set to the id of the next page.
        //planet should adhear to JS-Planet standard
        this.planet = {"ID":"2","Name":"Venus","OrbitalRadius":"108200","InOrbitOf":"0","Temperature":"462","SurfaceGravity":"8.87","Radius":6052,"Map":{"IMG":"venus_img.jpg"}};
    
        
        
	//function to create page from nothing
	this.create = function(){
		//add any planets
		this.threePlanet = this.makePlanet(this.planet);
		
		//set up lighting
		
                this.scene.add(this.bindLights(this.threePlanet,this.planet));
                
                //add the sun
                this.scene.add(this.addSun());
		//add spacestation
		//use an objectloader as this is a larger object
		//setup space station overlay
                //Notify that this function is ready to be run
                this.ready = true;
                this.onready(this.id);
                
	}
	
	//function to handle keyboard events
	this.keyboard= function(keyState){
		//no keyboard events for orbit
	}
	
	//function to update scene each frame
	this.update = function(){
            this.orbitPos+=0.00001;
            this.__camera.position.copy(this.calculateOrbit());
            this.__camera.lookAt(this.threePlanet.position);
            this.threePlanet.rotation.y += 0.0001;
	}

	this.calculateOrbit = function(){
            return new THREE.Vector3(
                3*this.planet['Radius']*Math.cos(this.orbitPos),
                0,
                3*this.planet['Radius']*Math.sin(this.orbitPos));
	}
        
        this.reload = function(){
            //GENERATE THE FUNCTION TO BE PASSED TO THE REQUEST
            //create planet closure for access in the anonomous function passed to the http request
            var __planet = this.planet;
            //create id closure
            var __id = this.id;
            var funcDone = function(data){
                //This might be a souce of error if __planet just changes pointer
                __planet = JSON.parse(data);
                //need to use global reference as I don't as of yet understand javascript callback scoping
                __planet.create();
                onready(__id);
            };
            
            //CARRY OUT THE REQUEST
            //this.onready needs to be passed to the server function
            var onready = this.onready;
            //get information from server about current planet, lightitng ect
            $.ajax({url:"pages/orbit.php",post:"data:shipInfo"}).done(funcDone);
        }
	
};
}
