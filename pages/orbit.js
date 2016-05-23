//orbit class file
 
{a = function (renderer,scene,camera){
	this.name = "Orbit";
	this.id = 0;
	this.renderer = renderer;
	this.scene = scene;
	this.camera = camera;

	this.orbitPos = 0;
	
	//get information from server about current planet, lightitng ect
  $.ajax({url:"pages/orbit.php",post:"data:shipInfo"}).done(function(data){
		var temp = eval(data);
		this.planet = temp.planet;
		create();
		});
	
	//function to create page from nothing
	this.create = function(){
		//add any planets
		this.threePlanet = makePlanet(this.planet);
		this.scene.add(this.threePlanet);
		//set up lighting
		bindLights(this.threePlanet,this.planet);
		//add spacestation
		//use an objectloader as this is a larger object
		//setup space station overlay
	}
	
	//function to handle keyboard events
	this.keyboard= function(keyState){
		//no keyboard events for orbit
	}
	
	//function to update scene each frame
	this.update = function(){
		this.orbitPos+=0.00001;
		this.camera.position = this.calculateOrbit();
		this.camera.lookAt(this.planet.position);
		this.planet.rotation.y += 0.0001;
	}

	this.calculateOrbit = function(){
		return new THREE.Vector3(
			2*this.planet['Radius']*Math.cos(this.orbitPos),
			0,
			2*this.planet['Radius']*Math.sin(this.orbitPos));
	}

	
};
}
