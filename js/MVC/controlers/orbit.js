/* global __scene, __camera, THREE, I */

//orbit class file
//planet-centric coordinates
 
function conOrbit(){
        //inherits from page class
        this.__proto__ = new Page();
        
        //class information
	this.name = "Orbit";
	this.id = 0;
        
        
        //class variables
	this.orbitPos = Math.PI/2;
        this.eventHandlers =[];
        
        //Finished loading variables
        this.ready = false;
        this.onready = onPageReady
        
        //page changing handshake
        this.change = false; //set to true if request page change.
        this.nextPage; //set to the id of the next page.
        
        
	//function to create page from nothing
	this.create = function(from){
                //update planet 
                this.planet = I.place;
                this.threePlanet = I.place.getThree();
                //switch based on where the page is coming from
                switch(from){
                    case 0:
                        //constructor (this is the first time the 'single' page
                        //has been loaded
                        this.constructFirst();
                        break;
                    case 1:
                        //has been loaded from map
                        this.reConstruct();
                        break;
                    case 2:
                        //from cargo
                    case 3:
                        //from trade
                        this.createUserInterface();
                        break;
                    case 5:
                        //from combat.php
                        this.constructFromCombat();
                        break;
                    case 7:
                        //from console
                        this.createUserInterface();
                        break;
                }
		
                //Notify that this function is ready to be run
                this.ready = true;
                this.onready(this.id);
	}
        this.destroy = function(to){
            //switch based on who the page is going to next
            switch(to){
                case 1:
                    //Go to the map
                    console.log("going to map");
                    __scene.remove(I.place.getThree());
                    __scene.remove(this.threeSpaceStation);
                    //temperarely
                    __scene.remove(this.threePlanetLights);
                    __scene.remove(this.sun);
                    break;
                case 5:
                    //go to combat
                    //remove the saterlite from the __scene
                    __scene.remove(this.threeSpaceStation);
                    //remove the overlay
                    document.getElementById('overlay').innerHTML = "";
                    break;
            }
        }
        //function to construct the __scene if nothing has yet been constructed.
        this.constructFirst = function(){
                //add any planets
		__scene.add(this.threePlanet);
                
                //add the sun
                this.sun = this.addSun();
                __scene.add(this.sun);
		//add spacestation
                this.threeSpaceStation = makeSpaceStation();
                __scene.add(this.threeSpaceStation);
		//use an objectloader as this is a larger object
		//setup space station overlay
                //create user interface
                this.createUserInterface();
        };
        this.reConstruct = function(){
            __scene.add(this.threePlanet);
            __scene.add(this.threeSpaceStation);
            __scene.add(this.sun);
            this.createUserInterface();
        };
        this.constructFromCombat = function(){
            this.orbitPos=Math.PI/2;
            //add spacestation to __scene
            __scene.add(this.threeSpaceStation);
            //create UI
            this.createUserInterface();
        }
        this.createUserInterface = function(){
            var options = ['mapLink','cargoLink','tradeLink','shipYardLink','fightLink','achivementsLink','consoleLink'];
            var shipName = I.shipInfo._ship.ShipName;
            htmlOverlay = '<div style="position:absolute;top:80%;width:100%;left:0px;z-index:5;"><table style="width:100%;background-color:black;"><tr>    <td width="30%"><h2>Current ship: ';
            htmlOverlay += shipName;
            htmlOverlay += '</h2></td>	<td rowspan="2" width="20%">	<table style="width:100%;height:100%;">	<tr>		<td id="mapLink" class="clickable" >Map</td>		<td id="cargoLink" class="clickable">Cargo Bay</td>	</tr>	<tr>		<td id="tradeLink" class="clickable">Trade</td>		<td id="shipYardLink" class="clickable">Ship yard</td>	</tr>	<tr>		<td id="fightLink" class="clickable">Fight for ';
            htmlOverlay += this.planet.name;
            htmlOverlay += '</td>		<td id="achivementsLink" class="clickable">Achievements</td>	</tr>	</table>	</td>	<td rowspan="2" ><h2>Current temperature on ';
            htmlOverlay += this.planet.name;
            htmlOverlay += ' is ' + this.planet.Temperature;
            htmlOverlay += '&#8451</h2></td></tr><tr>	<td class="clickable" id="consoleLink"><h2>Goto Console</h2></td></tr></table></div>';
            document.getElementById('overlay').innerHTML = htmlOverlay;
            document.getElementById('style').innerHTML = 'body{	background-color:black;	color:white;	font-size:80%;	}	.clickable:hover{	background-color:#0000A0;	color:#FFFFE0;	cursor:pointer; cursor:hand;	}';
            
            //add eventhandlers
            for(i=0;i<options.length;i++){
                var func = this.makeChanger(this,i+1);
                //console.log(func);
                document.getElementById(options[i]).addEventListener("click", func);
            }
        }
	//function to handle keyboard events
	this.keyboard= function(keyState){
		//no keyboard events for orbit
	}
	//function to update __scene each frame
	this.update = function(){
            //this.orbitPos+=0.00001;
            __camera.position.copy(this.calculateOrbit(0).add(new THREE.Vector3(0,0,parseFloat(this.planet.radius))));
            this.threeSpaceStation.position.copy(this.calculateOrbit(3));
            __camera.lookAt(this.threePlanet.position);
            this.threePlanet.rotation.y += 0.001;
            
	};

	this.calculateOrbit = function(radialOffset){
            return new THREE.Vector3(
                3*(this.planet.radius-radialOffset)*Math.cos(this.orbitPos),
                0,
                3*(this.planet.radius-radialOffset)*Math.sin(this.orbitPos));
	};
        
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
        };
	//this.create();
}
