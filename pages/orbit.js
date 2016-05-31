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
        this.eventHandlers =[];
        
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
                this.threeSpaceStation = makeSpaceStation();
                this.scene.add(this.threeSpaceStation);
		//use an objectloader as this is a larger object
		//setup space station overlay
                //create user interface
                this.createUserInterface();
                //Notify that this function is ready to be run
                this.ready = true;
                this.onready(this.id);
                
	}
        
        this.createUserInterface = function(){
            var options = ['mapLink','cargoLink','tradeLink','shipYardLink','fightLink','achivementsLink'];
            var shipName = "Need to dynamically get ship name";
            htmlOverlay = '<div style="position:absolute;top:80%;width:100%;left:0px;z-index:5;"><table style="width:100%;background-color:black;"><tr>    <td width="30%"><h2>Current ship: ';
            htmlOverlay += shipName;
            htmlOverlay += '</h2></td>	<td rowspan="2" width="20%">	<table style="width:100%;height:100%;">	<tr>		<td id="mapLink" class="clickable" >Map</td>		<td id="cargoLink" class="clickable">Cargo Bay</td>	</tr>	<tr>		<td id="tradeLink" class="clickable">Trade</td>		<td id="shipYardLink" class="clickable">Ship yard</td>	</tr>	<tr>		<td id="fightLink" class="clickable">Fight for ';
            htmlOverlay += this.planet.Name;
            htmlOverlay += '</td>		<td id="achivementsLink" class="clickable">Achievements</td>	</tr>	</table>	</td>	<td rowspan="2" ><h2>Current temperature on ';
            htmlOverlay += this.planet.Name;
            htmlOverlay += ' is ' + this.planet.Temperature;
            htmlOverlay += '&#8451</h2></td></tr><tr>	<td class="clickable" ><h2>Goto Console</h2></td></tr></table></div>';
            document.getElementById('overlay').innerHTML = htmlOverlay;
            document.getElementById('style').innerHTML = 'body{	background-color:black;	color:white;	font-size:80%;	}	.clickable:hover{	background-color:#0000A0;	color:#FFFFE0;	cursor:pointer; cursor:hand;	}';
            
            //add eventhandlers
            for(i=0;i<4/*options.length*/;i++){
                var func = this.makeChanger(this,i+1);
                console.log(func);
                document.getElementById(options[i]).addEventListener("click", func);
            }
        }
        
        //create a closure containing a reference to this class and the index of the page to be loaded in
        this.makeChanger = function(page,nextPageID){
            var locPage = page;
            var locNextPage = nextPageID;
            return function (){
                locPage.change=true;
                locPage.nextPage = locNextPage; 
            }
        }

	
	//function to handle keyboard events
	this.keyboard= function(keyState){
		//no keyboard events for orbit
	}
	
	//function to update scene each frame
	this.update = function(){
            this.orbitPos+=0.00001;
            this.__camera.position.copy(this.calculateOrbit(0).add(new THREE.Vector3(0,0,10)));
            this.threeSpaceStation.position.copy(this.calculateOrbit(3))
            this.__camera.lookAt(this.threePlanet.position);
            this.threePlanet.rotation.y += 0.0001;
	}

	this.calculateOrbit = function(radialOffset){
            return new THREE.Vector3(
                3*(this.planet['Radius']-radialOffset)*Math.cos(this.orbitPos),
                0,
                3*(this.planet['Radius']-radialOffset)*Math.sin(this.orbitPos));
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
