//orbit class file
 
function (renderer,scene,camera){
	this.name = "Orbit";
	this.id = 0;
	this.renderer = renderer;
	this.scene = scene;
	this.camera = camera;
	
	//get information from server about current planet, lightitng ect
	$.ajax(url:"get.php",post:"data:shipInfo;}.done(function(data){
		temp = eval(data);
		this.planet = temp.planet;
		});

	//function to create page from nothing
	function create(){
		//add any planets
		this.scene.add(makePlanet(this.planet));
		//getS('planet')
		//set up lighting
		//setLights(scene)
		//add spacestation
		//use an objectloader as this is a larger object
		//setup space station overlay
	}
	
	//function to handle keyboard events
	function keyboard(keyState){
		//no keyboard events for orbit
		if(keyState.pressed("up"){
			//code to be run when this happens
		}
	}
	
	//function to update scene each frame
	function update(){
		camera.position = //just off space station 
		camera.lookAt(earth);
		earth.spin();
	}
}

	
