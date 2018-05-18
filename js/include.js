exports.makeSkyBox=makeSkyBox;exports.conAchivement=conAchivement;exports.conCargo=conCargo;exports.conCombat=conCombat;exports.conConsole=conConsole;exports.conMap=conMap;exports.conOrbit=conOrbit;exports.Page=Page;exports.conShipYard=conShipYard;exports.conTrade=conTrade;exports.ContentManager=ContentManager;exports.RequestManager=RequestManager;exports.CargoHold=CargoHold;exports.Celestial=Celestial;exports.Channel=Channel;exports.Information=Information;exports.Market=Market;exports.LiberatorBasicShip=LiberatorBasicShip;exports.makeSpaceStation=makeSpaceStation;exports.MapAnimation=MapAnimation;exports.vw=vw;exports.vwCargo=vwCargo;exports.vwCombat=vwCombat;exports.vwOrbit=vwOrbit;//MVC//assistors.js
/* global THREE, __camera, __scene, I, ContentManager, contentManager */

function makeClickHandeler(callback){
    return function ( event ) {
        event.preventDefault();
        var vector = new THREE.Vector2( ( event.clientX / window.innerWidth ) * 2 - 1,
        - ( event.clientY / window.innerHeight ) * 2 + 1);

        var raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(vector,__camera);
        var intersects = raycaster.intersectObjects( __scene.children );
        if ( intersects.length > 0 ) {
            if(intersects[0].object.name!=="sun.jpg" && intersects[0].object.name !==""){
                    callback(intersects[0].object.name);
            }
        }
    };
}

calculateOrbit = function(radialOffset,longitude ,latitude){
            return new THREE.Vector3(
                3*(I.place.getRadius()-radialOffset)*Math.cos(longitude)*Math.cos(latitude),
                3*(I.place.getRadius()-radialOffset)*Math.sin(latitude),
                3*(I.place.getRadius()-radialOffset)*Math.sin(longitude)*Math.cos(latitude));
	};
        
//--------------------------------------------------------------------------------
//SKYBOX
function makeSkyBox(){
    /*
	//var imagePrefix = "images/nebula-";
        //var imagePrefix = "milkyway/GalaxyTex_";
        var imagePrefix = "images/GalaxyTex-";
        var directions  = ["yneg", "ypos", "xpos", "xneg", "zpos", "zneg"];
	//var directions  = ["PositiveX", "NegativeX", "PositiveY", "NegativeY", "PositiveZ", "NegativeZ"];
	var imageSuffix = ".png";
	var skyGeometry = new THREE.CubeGeometry( 5000000, 5000000, 5000000 );
	var imageURLs = [];
	for (var i = 0; i < 6; i++)
		imageURLs.push( imagePrefix + directions[i] + imageSuffix );
	var textureCube = THREE.ImageUtils.loadTextureCube( imageURLs );
	var shader = THREE.ShaderLib[ "cube" ];
	shader.uniforms[ "tCube" ].value = textureCube;
	var skyMaterial = new THREE.ShaderMaterial( {
		fragmentShader: shader.fragmentShader,
		vertexShader: shader.vertexShader,
		uniforms: shader.uniforms,
		depthWrite: false,
		side: THREE.BackSide
	} );
	return new THREE.Mesh( skyGeometry, skyMaterial );
        */
        //Credit to http://www.ianww.com/blog/2014/02/17/making-a-skydome-in-three-dot-js/
        var geometry = new THREE.SphereGeometry(5000000, 60, 40);  
        var uniforms = {  
          texture: { type: 't', value: contentManager.getTexture('eso') }
        };

        var material = new THREE.ShaderMaterial( {  
          uniforms:       uniforms,
          vertexShader:   document.getElementById('sky-vertex').textContent,
          fragmentShader: document.getElementById('sky-fragment').textContent
        });

        skyBox = new THREE.Mesh(geometry, material);  
        skyBox.scale.set(-1, 1, 1);  
        skyBox.rotation.set(0,Math.PI/2,0); //rotated to make poping of images less defined
        skyBox.eulerOrder = 'XZY';  
        skyBox.renderDepth = 1000.0;  
        return skyBox;
}
//MVC//controlers/Achivement.js
function conAchivement(){
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
        
}//MVC//controlers/cargo.js
//cargo class file
 
function conCargo(){
        //inherits from page class
        this.__proto__ = new Page();
        
        //class information
	this.name = "Cargo";
	this.id = 2;
        
        //global THREE references
	
	this.overlay = new vwCargo();
        this.hold = new CargoHold();
        
	
        
        //Finished loading variables
        this.ready = false;
        this.onready = onPageReady;
        
        //page changing handshake
        this.change = false; //set to true if request page change.
        this.nextPage; //set to the id of the next page.
        //planet should adhear to JS-Planet standard
        this.planet = {"ID":"2","Name":"Venus","OrbitalRadius":"108200","InOrbitOf":"0","Temperature":"462","SurfaceGravity":"8.87","Radius":6052,"Map":{"IMG":"venus_img.jpg"}};
    
        this.create = function(from){
            switch(from){
                case 0:
                    //from orbit
                    var self = this;
                    this.constructFromOrbit();
                    this.hold.update(function(){self.updateTable();});
                    this.findPlanet();
                    break;
            }
            this.ready = true;
            this.onready(this.id);
        };
        this.constructFromOrbit = function(){
            //create overlay
            this.makeSTDOverlay("<h1>Cargo</h1><input type='button' id='bk2o' value='Back to orbit' />");
            //add event listeners
            var func = this.makeChanger(this,0);
            document.getElementById('bk2o').addEventListener("click",func);
        };
        this.backToOrbit = function(){
            this.change = true;
            this.nextPage = 0;
        };
        this.updateTable = function(){
            this.makeSTDOverlay("<h1>Cargo</h1>" + this.hold + "<input type='button' id='bk2o' value='Back to orbit' />");
            //add event listeners
            var func = this.makeChanger(this,0);
            document.getElementById('bk2o').addEventListener("click",func);
        };
        
        this.keyboard = function(keyState){};
        this.update = function(){
            this.threePlanet.rotation.y += 0.0001;
        };
        
        
}//MVC//controlers/combat.js
/* global __renderer, __scene, THREE, __camera, I */

//battles class file
//__scene-centric coordinates
 
function conCombat(){
        //inherits from page class
        this.__proto__ = new Page();
        
        //class information
	this.name = "Combat";
	this.id = 5;
	
        this.view = new vwCombat();
        this.animation;

        this.eventHandlers =[];
        this.bullets = new BulletHandler(5000);//the 5000 doesn't get used
       
        this.dificulty = 0.01;
        this.Crotation = deg(-80);
        this.orbitPos = Math.PI/2;
        this.thi = 0;
        this.dead=false;
        
        
        //Finished loading variables
        this.ready = false;
        this.onready = onPageReady
        
        //page changing handshake
        this.change = false; //set to true if request page change.
        this.nextPage; //set to the id of the next page.

        
        
	//function to create page from nothing
	this.create = function(from){
            this.start = false;
            this.won = false;
            this.Crotation = deg(-80);
            this.dead=false;
            
            I.update();
                //switch based on where the page is coming from
                switch(from){
                    case 0:
                        //page has been loaded by orbit
                        this.constructFirst();
                        break;
                    case 7:
                        this.constructFirst();
                        break;
                        
                }
                //Notify that this function is ready to be run
                this.ready = true;
                this.onready(this.id);
	};
        this.destroy = function(to){
            this.destructor();
            //switch based on who the page is going to next
            switch(to){
            }
        };
        //function to construct the __scene if nothing has yet been constructed.
        this.constructFirst = function(){
                this.findPlanet();
                //create user interface
                this.view.createUserInterface(function(){self.backToOrbit();});
                this.won=false;
                //planet should already exist
		//lighting should already be set up
                //The sun should lready be there
                //temp set thi andorbitpos
                this.thi=deg(20);
                this.orbitPos=deg(180);
                //add spaceship
                if (!this.threeShip){
                    this.threeShip = new THREE.Mesh(new THREE.CubeGeometry(1,1),new THREE.MeshBasicMaterial());
                    this.loadLib();
                }else{
                    this.linkShip(this.ship);
                }
                
                var self = this;
                this.animation = new CombatAnimation(this.threeShip.position,this.threePlanet.position,function(){self.makeChanger(self,0)();});
                /*this.ship.setPosition(this.calculateOrbit(0));
                __scene.add(this.ship.getThree());*/
            
		//add aliens
                this.alienFleet = new AlienFleet(this.bullets);
                this.alienFleet.setPosition(this.calculateOrbit(0).add(new THREE.Vector3(20,0,0)));
                __scene.add(this.alienFleet.getThree());
                
        };
        //create a closure containing a reference to this class and the index of the page to be loaded in
        this.makeChanger = function(page,nextPageID){
            var locPage = page;
            var locNextPage = nextPageID;
            return function (){
                locPage.destroy(locNextPage);
                locPage.change=true;
                locPage.nextPage = locNextPage; 
            };
        };
        /*this.reload = function(){
            //GENERATE THE FUNCTION TO BE PASSED TO THE REQUEST
            //create planet closure for access in the anonomous function passed to the http request
            
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
        };*/

        //CREATORS
        this.loadLib = function(){
            //create closure for this class
            var self = this;
            //will this create a closure for ship for the ;inkShip function to use?
            var ship = new LiberatorShip(this.bullets);
            //curry ship and this into callback
            var callback = function(){self.linkShip(ship);};
            ship.create(callback);
            this.ship=ship;
        };
        
        //UPDATES (frame by frame)
        //function to update __scene each frame
	this.update = function(){
            if(!this.animation.update()){
                //this.cube.updateCubeMap(__renderer,__scene);
                //Rotate the ship
                this.bullets.update();
                
                this.ship.update();

                
                //Update an alien wing camera
                if(this.start){
                    this.alienFleet.canShoot();
                    this.alienFleet.update();
                }
                this.view.setHealth(this.ship.getHealth());
                //check the game has ended
                if(this.alienFleet.defeated() && !this.won){
                    this.won=true;
                    var _self=this;
                    $.ajax('i/do/won.php');
                    this.view.displayWinScreen(function(){_self.backToOrbit();}); 
                }
                if(this.ship.getHealth()<1 && ! this.dead){
                    this.dead=true;
                    var _self=this;
                    this.view.displayFailScreen(function(){_self.backToOrbit();});
                }
                //detect collisions
                //collision detection done by bullets now
            }
        };
        //function to handle keyboard events
	this.keyboard= function(keyState){
            //need to check is game is active first
            
            //CAMERA MOVEMENT
            if(keyState.pressed("up")){
                this.Crotation+=0.01;
            }else if(keyState.pressed("down")){
                this.Crotation-=0.01;
            }
            this.updateCameraPosition();
            //get the camera to look at the spaceship
            __camera.lookAt( this.threeShip.position);
            if(this.ship.getHealth()>1){
                //MOVEMENT CONTROLLS
                this.ship.keyboard(keyState);
                //SHOOTING
                if(keyState.pressed("space")){
                    if(!this.dead){
                        this.start=true;//allow the aliens to start shooting
                        document.getElementById('infoBoxParent').hidden = true;
                    }
                }
            }
	};

        
        
        
        
        //DESTRUCTORS
        this.destructor = function(){
            __scene.remove(this.threeShip);
            __scene.remove(this.alienFleet.getThree());
        };
        
        //CALCULATIONS
        
        this.calculateOrbit = function(radialOffset){
            return calculateOrbit(radialOffset,this.orbitPos,this.thi);
	};
        this.updateCameraPosition = function(){
            __camera.position.copy(this.calculateOrbit(0).add(new THREE.Vector3(50* Math.sin(this.Crotation),50* Math.cos(this.Crotation),this.threeShip.position.z)));
        };
        this.log = function(x){
            return Math.log(x*Math.pow(10,17))/40;
        };
        
        //CALLBACKS
        this.linkShip = function(ship){
            //ship variable curried from loadLib
            this.threeShip = ship.getThree();
            __scene.add(this.threeShip);
            ship.setPosition(this.calculateOrbit(0));
        };
        
    this.backToOrbit = function(){
        this.animation.setAnimation(2);
    };
}
//MVC//controlers/console.js
//console class file
 
function conConsole(){
    //inherits from page class
    this.__proto__ = new Page();

    //class information
    this.name = "Console";
    this.id = 7;

    //global THREE references
    
    ;
    

    //Finished loading variables
    this.ready = false;
    this.onready = onPageReady

    //page changing handshake
    this.change = false; //set to true if request page change
    this.nextPage; //set to the id of the next page.
    this.commands = ['help'];
    this.i=0;

    this.create = function(from){
        switch(from){
            case 0:
                //from orbit
                this.constructFromOrbit();
                break;
        }
        this.ready = true;
        this.onready(this.id);
    };
    this.keyboard = function(keyState){};
    
    //This fucntion doesn't work verry well, first up press doesn't line up
    this.run = function(e){
        this.change=false;
        if(e.keyCode==13){
                var command = document.getElementById('writer').value;
                if(command!=""){
                    this.commands.push(command);
                    switch(command){
                            case 'clear':
                                    document.getElementById('console').innerHTML = "";
                                    break;
                    }
                    self = this;
                    $.ajax({url:"console.php?command="+command}).done(function(){return function(resp){
                            //get function 
                            var reg = /<script>(.*)<\/script>/g;
                            var result = reg.exec(resp)
                            if(result){
                                var script = result[1]; //watch out for non-existant
                                self.consoleScript = Function(script);
                                self.consoleScript();
                            }
                            var console = document.getElementById("console");
                            //handle if respose comes back after the user has exited the console
                            if(console){
                                console.innerHTML = console.innerHTML.substr(0,console.innerHTML.length-6);
                                console.innerHTML += resp + '<br /><br />';
                                console.scrollTop = document.getElementById('console').scrollHeight;
                            }
                        };}());
                    document.getElementById('writer').value="";
            }
        }else if(e.keyCode==38){
                if (this.i<this.commands.length){
                    this.i++;
                    document.getElementById('writer').value=this.commands[this.commands.length-this.i];		   
                }
        }else if(e.keyCode==40){
            if(this.i<=1){
                document.getElementById('writer').value="";
                this.i==0;
            }else{
                this.i--;
                document.getElementById('writer').value=this.commands[this.commands.length-this.i];

            }
        }
          
    };
    this.update = function(){/*no time based events (earths rotation maybe?*/
        pages[0].update();
    };
    this.destroy = function(){/*All overlay information should be overwitten by next action*/};
    this.constructFromOrbit = function(){
        var console = '<p id= "console" style="height:80%;max-height:80%;overflow:hidden;color:#F0F0F0;font-family: `Lucida Console`;font-size:18px;">Welcome name, Last login nowish"; ?><br />      </p>';
        var writer = '<div style="position:relative;bottom:30px;left:0px;width:100%;"><input id="writer" value="" tabindex="0" type="text"  style="width:100%;color:#F0F0F0;background-color:black;border:0;font-size:18pt;" autofocus/></div>';
        //create overlay
        this.makeSTDOverlay(console+writer);
        
        var _self = this;
        $('#writer').keydown(function(event){_self.run(event);});
        //keep box in focus
        $('#writer').focus();
        $('#writer').focusout(function(){$('#writer').focus()});
    };

}//MVC//controlers/map.js


/* global __camera, __scene, THREE, I */

function conMap(){
        //inherits from page class
        this.__proto__ = new Page();
        
        //class information
	this.name = "Map";
	this.id = 1;
        
        //global THREE references
	
	;
	
        
        //class variables
        this.planetNames = new Array('sun.jpg','Mercury.jpg','venus_img.jpg','earth_img.jpg','mars_img.jpg','moon_img.jpg');
	this.planetPositions = {'x':new Array(-100,0,9000,21000,30000,25000),'z':new Array(0,0,0,0,0,20)};
	this.planetSizes = new Array(20,2440,6052,6371,3390,1);
        //this.projector = new THREE.Projector;
        this.eventHandlers =[];
        this.inAnimation = 1;
        this.ambient = new THREE.AmbientLight( 0xAAAAAA ); // soft white light
        //Finished loading variables
        this.ready = false;
        this.onready = onPageReady
        this.onDocumentMouseDown;
        
        //page changing handshake
        this.change = false; //set to true if request page change.
        this.nextPage; //set to the id of the next page.
        //planet should adhear to JS-Planet standard

        this.threePlanets=[];
        
        
	//function to create page from nothing
	this.create = function(from){
            //from orbit
            //this.inAnimation=1;
            //__scene.add(this.ambient);
            //var sun
            var planetAdder = function(celestial){
                __scene.add(celestial.getThree());
            };
            I.system.recurseThroughSystems(planetAdder);
                
            //function needs updating for the latest three.js
            //it also needs a closure
            var self=this;
            this.onDocumentMouseDown= makeClickHandler(self.travel);

            //Make an event listner for when the user click on the planet they want to travel to
            document.addEventListener( 'mousedown', this.onDocumentMouseDown, false );
            __camera.position.set( this.planetPositions.x[I.place.getID()],  0,place.Radius*3 );//inishiation of camera
            this.x = this.planetPositions.x[place['ID']];
            this.y = I.place.getRadius()*3;
            //setup space station overlay
            //create user interface
            this.createUserInterface();
            __camera.lookAt(new THREE.Vector3(0,0,0));
            //Notify that this function is ready to be run
            this.ready = true;
            this.onready(this.id);
                
	};
        this.destroy = function(page){
            //this is called twice just before the error occures
            
            console.log("going to " + page + " see yo soon");
            __scene.remove(this.ambient);
            for(var i=0;i<this.threePlanets.length;i++){
                __scene.remove(this.threePlanets[i]);
            }
            document.removeEventListener('mousedown',this.onDocumentMouseDown);
        };
        //function to make the overlay html what is needed for this page
        this.createUserInterface = function(){
            document.getElementById('overlay').innerHTML = "<p>Click on destination</p>";
        };
	this.keyboard= function(keyState){
		//no keyboard events for orbit
	};
	this.travel = function(location){
            var changingFunction = this.makeChanger(this,0);
            $.ajax('i/do/travel.php?to=' + location).done(function(){
                updatePlace(changingFunction);
            });
            
        };
	//function to update __scene each frame
	this.update = function(){
            if(this.inAnimation==1){
                if(this.z<place.Radius*3+6*60*100){
                    __camera.position.set(this.x,0,this.z);
                    this.z+=100;
                }else{
                    this.inAnimation=2;//0;
                }
            }else if(this.inAnimation==2){
                if(this.z>place.Radius*3){
                    __camera.position.set(this.x,0,this.z);
                    this.z=100;
                }else{
                    //back to orbit
                }
            }
                
            
	};

        this.reload = function(){
            //GENERATE THE FUNCTION TO BE PASSED TO THE REQUEST
            //create planet closure for access in the anonomous function passed to the http request
            var __planet = place;
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
	
}

//MVC//controlers/orbit.js
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
            //this.threePlanet.rotation.y += 0.001;
            
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
//MVC//controlers/Page.js
/* global __scene, THREE, contentManager, __sun */

function Page(){
    //abstract functions for a page
    
    this.create = function(from){console.log('Abstract function create not overwritten!');};
    this.destroy = function(to){console.log('Abstract function destroy not overwritten!');};
    this.keyboard = function(keystate){console.log('Abstract function keyboard not overwritten!');};
    this.update = function(){console.log('Abstract function update not overwritten!');};
    this.reload = function(){console.log('Abstract function reload not overwritten!');};
    this.onready = function(pageID){console.log('Abstract function onready not overwritten for page:' + pageID);};
    
    //Superclass functions
    
    //function to create page overlay
    this.makeSTDOverlay = function(innerHTML){
        var overlay = "<div id='content' style='background-color:rgba(0,0,0,0.7);border-radius:25px;margin-top:3%;margin-bottom:3%;margin-left:5%;margin-right:5%;'>";
        overlay +=innerHTML;
        overlay += "</div>";
        document.getElementById('overlay').innerHTML = overlay;
    }
    //create a closure containing a reference to this class and the index of the page to be loaded in
    this.makeChanger = function(page,nextPageID){
        var locPage = page;
        var locNextPage = nextPageID;
        return function (){
            locPage.destroy(locNextPage);
            locPage.change=true;
            locPage.nextPage = locNextPage; 
        };
    };


    
    //function to add lighting to a Planet Mesh
    
    
    //function to add the sun and its lights into the __scene
    //needs replacing with lense blur
    this.addSun = function(){
        var sun = new THREE.Group();
        var lightcolor =  0xFFFFFF;
        var light = new THREE.PointLight( lightcolor );
        light.position.set( -100000, 10, -10 );
        sun.add(light);
	var sunGeometry = new THREE.SphereGeometry(69550,32,32);
	var sunTexture = contentManager.getTexture('sun');
	var sunMaterial = new THREE.MeshPhongMaterial({map:sunTexture});
	var sunMesh = new THREE.Mesh(sunGeometry,sunMaterial);
	sunMesh.position.x = -7000000;
	sun.add(sunMesh);
        return sun;
    };
    /**
     * function to generate a reference to the planet in the __scene so it can be moved
     * @returns {unresolved}
     */
    this.findPlanet = function (){
        for(i=0;i<__scene.children.length;i++){
            if(__scene.children[i].name=="planet"){
                this.threePlanet = __scene.children[i];
                return null;
            }
        }
    };
    
    /**
     * This dosn't need to be a function any more because
     * the celestial class supercedes it
     * 
     * function to update the planet mesh witht the new plannet mesh
     * @returns {undefined}
     */
    this.updatePlanet = function(){
        var planet = __sun.findFromChildren(place['PlaceID']);
        __scene.remove(planet.getThree());
        this.threePlanet = this.makePlanet(place);
        //set up lighting
        this.threePlanetLights = this.bindLights(this.threePlanet,this.planet);
        this.threePlanetLights.name = "planet";
        __scene.add(this.threePlanetLights);
    };
}//MVC//controlers/ShipYard.js
function conShipYard(){
            //inherits from page class
        this.__proto__ = new Page();
        
        //class information
	this.name = "ShipYard";
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
        
}//MVC//controlers/Trade.js
function conTrade(){
        //inherits from page class
        this.__proto__ = new Page();
        
        //class information
	this.name = "Combat";
	this.id = 3;
        this.market = new Market();
        this.view = new vwTrade(this.market);
        
        //class variables
	this.orbitPos = Math.PI/2;
        this.eventHandlers =[];
        
        //Finished loading variables
        this.ready = false;
        this.onready = onPageReady
        
        //page changing handshake
        this.change = false; //set to true if request page change.
        this.nextPage; //set to the id of the next page.
        this.create = function(from){
            switch(from){
                case 0:
                    //from orbit
                    var self = this;
                    this.constructFromOrbit();
                    this.market.update(function(){self.updateTable();});
                    this.findPlanet();
                    break;
            }
            this.ready = true;
            this.onready(this.id);
        };
        this.constructFromOrbit = function(){
            //create overlay
            this.makeSTDOverlay("<h1>Trade floor</h1><input type='button' id='bk2o' value='Back to orbit' />");
            this.view.unSetRes1Selection();
            //add event listeners
            var func = this.makeChanger(this,0);
            document.getElementById('bk2o').addEventListener("click",func);
        };
        this.keyboard= function(keyState){};
        this.update = function(){};
        
        this.updateTable = function (){
            //create overlay
            this.makeSTDOverlay("<h1>Trade floor</h1>" + this.view.makeTable() +"<input type='button' id='bk2o' value='Back to orbit' />");
            //add event listeners
            var func = this.makeChanger(this,0);
            document.getElementById('bk2o').addEventListener("click",func);
            this.view.attatchListeners(this);
        };
        
        this.res1c = function (){
            var buyRe = this.view.getBuyResSelection();
            var sellRe = this.view.getSellResSelection();
            var ammount = this.view.getBuyAmmount();
            //update the inner HTML of the other selection
            this.view.setRes1Selection();
            //how you going to update it without rewening the users selection?
            this.view.updateInner('resBox2',this.view.makeInnerRes2Box());
            this.view.updateValue('ammountBox2',this.market.getRate(buyRe,sellRe)*ammount);
        };
        this.res2c = function (){
            this.view.setRes2Selection();
            //check ammount2 
            var buyRe = this.view.getBuyResSelection();
            var sellRe = this.view.getSellResSelection();
            var ammount = this.view.getBuyAmmount();
            this.view.updateValue('ammountBox2',this.market.getRate(buyRe,sellRe)*ammount);
        };
        this.ammount1c = function(){
            var buyRe = this.view.getBuyResSelection();
            var sellRe = this.view.getSellResSelection();
            var ammount = this.view.getBuyAmmount();
            this.view.updateValue('ammountBox2',this.market.getRate(buyRe,sellRe)*ammount);
        };
        this.ammount2c = function(){
            var buyRe = this.view.getBuyResSelection();
            var sellRe = this.view.getSellResSelection();
            var ammount = this.view.getSellAmmount();
            this.view.updateValue('ammountBox1',ammount/this.market.getRate(buyRe,sellRe));
        };
        this.doClick = function(){
            var self = this;
            //check if ammount 1 to 2 is correct
            var buyRe = this.view.getBuyResSelection();
            var sellRe = this.view.getSellResSelection();
            var ammount = this.view.getBuyAmmount();
            if(this.view.getSellAmmount()/ammount == this.market.getRate(buyRe,sellRe)){
                //do trade
                $.ajax({url:'i/do/trade.php?buyRe=' + buyRe.getID() + "&sellRe=" + sellRe.getID() + "&ammount=" + ammount}).done(self.tradeCallback);
            }else{
                alert('Ammount boxes don\'t match');
            }
        };
        
        this.tradeCallback = function(data){
            if(JSON.parse(data)){
                alert('Trade complete');
            }else{
                alert(data);
            }
        };
}//MVC//Managers/contentManager.js
/* 
 * Class to cache resources so that the are not constinalty reloaded.
 * Required so that the map doesn't need to reload planets texteures
 * could be used for LOD management 
 * should things be left in the scene to reduce latency caused by the graphics pipline?
 * 
 * Thanks to https://gist.github.com/knee-cola/37875bc4359609b96c9f329cd2a68fa1 for 
 * help in working out that the texture needed ".needsUpdate" set to true
 */


/* global THREE */

function ContentManager(){
    /**
     * Function to get access to a resource located at URL and then do callback with it.
     * @param {String} URL
     * @returns {contentManager.content|contentManager@call;get}
     */
    this.getTexture = function(URL,extention){
        var bit = extention?1:0;
        if(bit){
            extention = "." + extention;
        }else{
            var extention = '.jpg';
        
            
        }
        //check if resource already exists in cache
        if(this.content[URL]){
            return this.content[URL];
        }
        //if it doesn't load it into cache
        //create something to give back immidiatly to the program
        this.content[URL] = new THREE.Texture(); 
        var callback = this.textureCallbackGenerator(URL);
        //assumes the larger one will take a sizable amount of time longer
        var low = new THREE.ImageLoader().load('images/'+URL+'l'+extention,callback);
        var high = new THREE.ImageLoader().load('images/'+URL+'h'+extention,callback);
        return this.content[URL];
    };
    
    this.content = {};
    
    this.textureCallbackGenerator = function(URL){
        var self = this;
        return function(image){
            self.content[URL].image = image;
            self.content[URL].needsUpdate=true;
        };
    };
}//MVC//Managers/RequestManager.js
/**
 * Class to manage requests from the javascript to the server to help reduce the 
 * number of requests and speeding up request that don't need to go to th server.
 * It also manages requests that fail.
 */
function RequestManager(){
    
}


//MVC//models/bullet.js
/* global THREE */

function Bullet(allegience,position,timeOut){
    this.allegiance = allegience;
    
    //So one can't shoot themsleves 
    this.team = allegience.team;
    //The colour of the bullit
    this.colour = allegience.colour;
    //The speed and direcion
    this.velocity = allegience.velocity;
    //the object as is to be added into the scene
    this.Mesh;// = this.createMesh(position);
    //allow for the BulletHandler to garbadge collect
    this.dead = false;
    
    
    //add timout for the destruction of the object
    this.die = function(){
        var self=this;
        window.setTimeout(function(){self.dead=true;},timeOut);
    }
    
    this.createMesh = function(position){
        var Geometry = new THREE.CylinderGeometry(0.1,0.1,1);
        //might work better as a lambert with emmisive texture
        var Material = new THREE.MeshBasicMaterial( { color:this.colour,transparent:true,opacity:0.8  } );
	this.Mesh = new THREE.Mesh( Geometry,Material );
	this.Mesh.position.copy(position);
	this.Mesh.rotation.z=1.57079632679;
    };
    this.createMesh(position);
    this.die();
    
}

function BulletHandler(timeOut){
    //initiate bullet list
    this.bullets = [];
    this.firendlyFire = false;
    //set timeout for bullets but this doesn't change anything because the reloadTime is now set by team
    this.timeOut = timeOut;
    //set max fire rate
    this.canShoot = {'AmIHerer':function(){return 'yes';}};
    //canshoot timing need to be 
    //managed by the bullethandler but need to be seperate for each allegiance
    
    this.create = function(allegiance,position){
        //check if still reloading
        //might need to check if key in dictionary here
        if(this.canShoot[allegiance.team]){
            //if it takes time for this allegiance to reload set that timeout
            if(allegiance.reloadTime){
                this.canShoot[allegiance.team]=false;
                //this might need a closure
                var __canShootRef = this.canShoot;
                var __teamRef = allegiance.team;
                window.setTimeout(function(){__canShootRef[__teamRef]=true;},allegiance.reloadTime);
            }
            var bullet = new Bullet(allegiance,position,this.timeOut);
            this.bullets.push(bullet);
            __scene.add(bullet.Mesh);
        }
    };
    
    this.createAllegiance = function(team,colour,velocity,reloadTime){
        this.canShoot[team]=true;
        return {'team':team,'colour':colour,'velocity':velocity,'reloadTime':reloadTime};
    };
    
    this.update = function(){
        for(i=0;i<this.bullets.length;i++){
            //destroy if nessasery 
            if(this.bullets[i].dead){
                //if(this.bullets[i].team=="Friend"){alert('removed');}
                __scene.remove(this.bullets[i].Mesh);
                this.bullets.splice(i,1);
            }else{
                var aB = this.bullets[i];;//aB ... ullet
                //move forward
                aB.Mesh.position.add(aB.velocity);
            }
        }
    };
    
    this.checkCollision = function (aliens,Me){
        var hitLst ={'aliens':[],'friend':false};
        //loop through each active bullet
        for(var i = 0;i<this.bullets.length;i++){
            if(this.bullets[i].team=="Friend"){
                var originPoint = this.bullets[i].Mesh.position.clone();
                var vertexIndex = 0;
                var localVertex = this.bullets[i].Mesh.geometry.vertices[vertexIndex].clone();
                var globalVertex = localVertex.applyMatrix4( this.bullets[i].Mesh.matrix );
                var directionVector = globalVertex.sub( this.bullets[i].Mesh.position );

                var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
                var collisionResults = ray.intersectObjects([aliens] ,true);
                if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ){ 
                    //object to destroy is the collisionResukts[0].object
                    hitLst.aliens.push(collisionResults[0].object.name);
                    this.bullets[i].dead=true;
                }	
            }else if(this.bullets[i].team=="Foe"){
                var originPoint = this.bullets[i].Mesh.position.clone();
                var vertexIndex = 0;
                var localVertex = this.bullets[i].Mesh.geometry.vertices[vertexIndex].clone();
                var globalVertex = localVertex.applyMatrix4( this.bullets[i].Mesh.matrix );
                var directionVector = globalVertex.sub( this.bullets[i].Mesh.position );

                var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
                var collisionResults = ray.intersectObjects([Me] ,true);
                if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ){ 
                    //object to destroy is the collisionResukts[0].object
                    hitLst.friend=true;
                    this.bullets[i].dead=true;
                }	
            }
        }
        return hitLst;
    };
    
    this.hasHit = function(object,allegiance){
        for(var i = 0;i<this.bullets.length;i++){
            if(this.bullets[i].allegiance.team != allegiance.team){
                //console.log(this.bullets[i].allegiance.team +":" + allegiance.team);
                var originPoint = this.bullets[i].Mesh.position.clone();
                var vertexIndex = 0;
                var localVertex = this.bullets[i].Mesh.geometry.vertices[vertexIndex].clone();
                var globalVertex = localVertex.applyMatrix4( this.bullets[i].Mesh.matrix );
                var directionVector = globalVertex.sub( this.bullets[i].Mesh.position );

                var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
                var collisionResults = ray.intersectObjects([object] ,true);
                if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ){ 
                    //object to destroy is the collisionResukts[0].object
                    this.bullets[i].dead=true;
                    return true;
                }	
            }
        }
        return false;
    };
    
}//MVC//models/Cargo.js
function Cargo(resource,ammount){
    this.resource = resource;
    this.ammount = ammount;
    this.getResource = function(){return this.resource;};
    this.getAmmount = function(){return this.ammount;};
    this.getName = function(){return this.resource.getName();};
    this.getDrop = function(){
        return "<a href='i/do/drop.php?id=" + this.resource.getID() + "'>Drop</a>";
    };
    this.toString = function(){
        return this.resource + this.getDrop();
    }
}//MVC//models/CargoHold.js

function CargoHold(){
    this.update = function(callback){
        this.callback = callback;
        var self=this;
        //var updateData = this.updateData;
        $.ajax({url:"i/get/cargo.php",async:false}).done(
                function(data){
                    self.results=data;
                    self.updateData(self.results);
                }
                );
    };
    this.resources=[];
    this.updateData = function(data){
        this.data = JSON.parse(data);
        var res = this.data.resources;
        this.resources = this.convertToResource(res);
        this.callback();
    };
    this.convertToResource = function(res){
        var resources = [];
        for(id in res){
            resources.push(new Cargo(new Resource(id),res[id]));
        }
        return resources;
    };
    this.toString = function(){
        var table = "<table id='cargo'><tr><th>Name</th><th>Ammount</th><th>Drop</th></tr>";
        for(var i=0;i<this.resources.length;i++){
            table = table + "<tr><td>" + this.resources[i].getName() + "</td><td>" + this.resources[i].getAmmount() + "</td><td>" + this.resources[i].getDrop() + "</td></tr>";
        }
        table = table+"</table>";
        return table;
    }

}

//MVC//models/Celestial.js
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
        //console.log(maxLoop);
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
    }
}//MVC//models/Channel.js
function Channel(){
    this.buy;
    this.sell;
    this.rate;
    
    this.setFromObject = function(object){
        this.buy = new Resource(object.buy);
        
        this.sellRe = new Resource(object.sell);
        this.rate = object.rate;
    };
    
    this.getSellResource = function(){return this.sell;};
    this.getBuyResource = function(){return this.buy;};
    this.getRate = function(){return this.rate;};
    
}//MVC//models/Explosion.js
/* global SPE, THREE, contentManager */

function Explosion(size){
        this.group = new SPE.Group( {
                texture: {
                        value: contentManager.getTexture( 'sprite-explosion2','png' ),
                        frames: new THREE.Vector2( 5, 5 ),
                        loop: 1
                },
                depthTest: true,
                depthWrite: false,
                blending: THREE.AdditiveBlending,
                scale: 100,
                maxParticleCount:10000
        } );
        this.shockwaveGroup = new SPE.Group( {
                texture: {
                        value: contentManager.getTexture( 'smokeparticle','png' ),
                },
                depthTest: false,
                depthWrite: true,
                blending: THREE.NormalBlending,
                scale:50,
                maxParticleCount:10000
        } ),
        this.shockwave = new SPE.Emitter( {
                particleCount: 200,
                type: SPE.distributions.DISC,
                position: {
                        radius: 5,
                        spread: new THREE.Vector3( 5 )
                },
                maxAge: {
                        value: 2,
                        spread: 0
                },
                // duration: 1,
                activeMultiplier: 2000,

                velocity: {
                        value: new THREE.Vector3( 40 )
                },
                rotation: {
                        axis: new THREE.Vector3( 1, 0, 0 ),
                        angle: Math.PI * 0.5,
                        static: true
                },
                size: { value: 2*size },
                color: {
                        value: [
                                new THREE.Color( 0.4, 0.2, 0.1 ),
                                new THREE.Color( 0.2, 0.2, 0.2 )
                        ]
                },
                opacity: { value: [0.5, 0.2, 0] }
        }),
        this.debris = new SPE.Emitter( {
                particleCount: 1,//00*Math.round(Math.sqrt(size)),
                type: SPE.distributions.SPHERE,
                position: {
                        radius: 0.1,
                },
                maxAge: {
                        value: 2*size
                },
                // duration: 2,
                activeMultiplier: 40,

                velocity: {
                        value: new THREE.Vector3( 100 )
                },
                acceleration: {
                        value: new THREE.Vector3( 0, -20, 0 ),
                        distribution: SPE.distributions.BOX
                },
                size: { value: 2 },
                drag: {
                        value: 1/size
                },
                color: {
                        value: [
                                new THREE.Color( 1, 1, 1 ),
                                new THREE.Color( 1, 1, 0 ),
                                new THREE.Color( 1, 0, 0 ),
                                new THREE.Color( 0.4, 0.2, 0.1 )
                        ]
                },
                opacity: { value: [0.4, 0] }
        }),
        this.fireball = new SPE.Emitter( {
                particleCount: 20,//increasing things make it last longer to take into accoun the extra particals
                type: SPE.distributions.SPHERE,
                position: {
                        radius: 1,
                        spread:1
                },
                maxAge: { value: 2 },
                // duration: 1,
                activeMultiplier: 20,
                velocity: {
                        value: new THREE.Vector3( 0,0,0),
                        spread: new THREE.Vector3(5,5,5)
                        
                },
                size: { value: [20*size, 100*size] },
                color: {
                        value: [
                                new THREE.Color( 0.5, 0.1, 0.05 ),
                                new THREE.Color( 0.2, 0.2, 0.2 )
                        ]
                },
                opacity: { value: [0.5, 0.35, 0.1, 0] }
        }),
        this.mist = new SPE.Emitter( {
                particleCount: 50,
                position: {
                        spread: new THREE.Vector3( 10, 10, 10 ),
                        distribution: SPE.distributions.SPHERE
                },
                maxAge: { value: 2 },
                // duration: 1,
                activeMultiplier: 2000,
                velocity: {
                        value: new THREE.Vector3( 8, 3, 10 ),
                        distribution: SPE.distributions.SPHERE
                },
                size: { value: 40 },
                color: {
                        value: new THREE.Color( 0.2, 0.2, 0.2 )
                },
                opacity: { value: [0, 0, 0.2, 0] }
        }),
        this.flash = new SPE.Emitter( {
                particleCount: 50,
                position: { spread: new THREE.Vector3( 5, 5, 5 ) },
                velocity: {
                        spread: new THREE.Vector3( 30 ),
                        distribution: SPE.distributions.SPHERE
                },
                size: { value: [2, 20, 20, 20] },
                maxAge: { value: 2 },
                activeMultiplier: 2000,
                opacity: { value: [0.5, 0.25, 0, 0] }
        } );
    this.group.addEmitter( this.fireball ).addEmitter( this.flash );
    this.shockwaveGroup.addEmitter( this.debris ).addEmitter( this.mist );
    this.light = new THREE.PointLight(0xffaa33,.1,30);
    /*this.light.castShadow=true;
    this.light.shadow.camera.near = 1;
    this.light.shadow.camera.far = 30;
    // pointLight.shadowCameraVisible = true;
    //this.light.shadow.bias = 0.01;*/
    this.meshGroup = new THREE.Group();
    this.meshGroup.add(this.group.mesh);
    this.meshGroup.add(this.shockwaveGroup.mesh);
    //this.meshGroup.add(this.light);
    this.meshGroup.scale.x=0.1;
    this.meshGroup.scale.y=0.1;
    this.meshGroup.scale.z=0.1;
    this.lightX=2;
    
    this.reSet = function(){this.lightX=0.01;};
    this.getObject = function(){return this.meshGroup;};
    this.update = function(){
        this.group.tick();
        this.shockwaveGroup.tick();
        this.lightX+=0.01;
        this.light.intensity =1/this.lightX;
        
    };
}
//MVC//models/Information.js
/**
 * Class to manage global information about the game.
 * @returns {I}
 */
function Information(){
    this.system = new Celestial();
    this.place;//reference to the current position of the users current ship in the celctial tree
    this.ship;//the current ship
    this.ship;
    
    this.setup = function(){
        var self=this;
        $.ajax('i/get/startingPack.php').done(function(){return function(result){
            var parsing = JSON.parse(result);
            var __sun=parsing[0];
            var __ship=parsing[1];
            var __place=parsing[2];
            self.system.fromPackage(__sun);
            self.shipInfo = __ship;
            self.place = self.system.findFromChildren(__place);
            start();
        };}());
        //this.system.fromPackage(__sun);
        //__sun = null;
    };
    this.update = function(){
        var self=this;
        $.ajax('i/get/startingPack.php').done(function(){return function(result){
            var parsing = JSON.parse(result);
            var __sun=parsing[0];
            var __ship=parsing[1];
            var __place=parsing[2];
            self.system.fromPackage(__sun);
            self.shipInfo = __ship;
            self.place = self.system.findFromChildren(__place);
        };}());
    };
    this.shipSetup = function(){
        //$.ajax('i/get/ship.php',function(result){system = eval(result);});
        this.shipInfo = __ship;
        __ship=null;
    };
    this.placeSetup = function(){
        this.place = this.system.findFromChildren(__place);
        __place =null;
    };
    //setup should come from a global variable loaded in by single.js
    //this.setup = function(){this.systemSetup();this.shipSetup();this.placeSetup();};
    this.getSystem = function(){
        if(this.system){
            return this.system;
        }else{
            console.warn("Read before write in I class!");
            return this.system;
        }
    };
    
}//MVC//models/Market.js
//the market should be just a collection of channels
//can we push the side effects, (update) to another location so the class becomes 'pure'
function Market(){
    // TradeChannel()
    this.channels = [];
    
    this.update = function(callback){
        this.callback = callback;
        var self = this;
        $.ajax({url:'i/get/market.php',async:false}).done(
                function(data){
                    self.results=data;
                    self.updateData(self.results);
                });
    };
    this.updateData = function(data){
        this.data = JSON.parse(data);
        var channels = this.data.channels;
        for(i=0;i<channels.length;i++){
            var tmpChannel = new Channel();
            tmpChannel.setFromObject(channels[i]);
            this.channels.push(tmpChannel);
        }
        this.callback();
    };
    
    /**
     * Function take a list of channels
     * 
     * Changes the state of the market to the set of those channels
     * @param {channel[]} channels
     * 
     */
    this.fromChannels = function(channels){
        for(i=0;i<channels.length;i++){
            var tmpChannel = new Channel();
            tmpChannel.setFromObject(channels[i]);
            this.channels.push(tmpChannel);
        }
    }
    
    //i think there is a better way of making ths
    this.toString = function(){
        return "<select id='buyResList'>" + this.resourceListToOptions(this.getBuyOptions()) + "</select>";
    };
    
    /**
     * Function to take make a list of the buying option at this location
     * @param {resource}
     * @returns {undefined}
     */
    this.getBuyOptions = function(sellResource){
        var options = [];
        //loop through all the channels and ask
        //can this resource be bought with the one being sold
        //has this resource already been included on this list 
        //this needs a better method
        for(var i=0;i<this.channels.length;i++){
            var resource = this.channels[i].getBuyResource();
            var canBuy = this.channels[i].getSellResource() === sellResource;
            if(!options.includes(resource) && canBuy){
                options.push(resource);
            }
        }
        return options;
    };
    this.getSellOptions = function(){
        var options = [];
        for(var i=0;i<this.channels.length;i++){
            var resource = this.channels[i].getSellResource();
            if(!options.includes(resource)){
                options.push(resource);
            }
        }
        return options;
    };
    this.resourceListToOption = function(resources){
        var list = "";
        for(var i=0;i<resources.length;i++){
            list = list + "<option id='" + resources[i].getID() + "' value='" + resources[i].getID() + "'>" + resources[i].getName() + "</option>";
        }
        return list;
    };
    this.getRate = function(buy,sell){
        for(i=0;i<this.channels.length;i++){
            if(this.channels[i].getBuyResource().eq(buy) &&
                    this.channels[i].getSellResource().eq(sell)){
                return this.channels[i].getRate();
            }
        }
        console.log('Channel requested doesn\'t exist');
        return false;
    }
}
//MVC//models/MonoPropellent.js
/* global THREE, SPE */

function MonoPropellant(velocity){
    this.group = new SPE.Group( {
            texture: {
                    value:  new THREE.ImageLoader().load( 'images/smokeparticle.png' ),
            },
            depthTest: true,
            depthWrite: true,
            blending: THREE.AdditiveBlending,
            scale:10
    } );
    
    this.emitter = new SPE.Emitter({
        maxAge: {
            value: 0.5
        },
                position: {
            value: new THREE.Vector3(0, 0, 0),
            spread: new THREE.Vector3( 0, 0, 0 )
        },

                acceleration: {
            value: new THREE.Vector3(0, 0, 0),
            spread: new THREE.Vector3( 0, 0, 0 )
        },

                velocity: {
            value: velocity,
            spread: new THREE.Vector3(5, 10, 5)
        },

        color: {
            value: [ new THREE.Color(200,200,200) ]
        },

        size: {
            value: [20, 100]
        },
        opacity: { value: [0.5, 0.25, 0, 0] },

                particleCount: 2000
    });
    this.group.addEmitter(this.emitter);
    this.group.enabled = false;
    
    this.getThree = function(){return this.group.mesh;};
    
    this.update = function(){
        this.group.tick();
    };
    
    this.setEnabled = function(enabled){this.emitter.alive = enabled;};
    this.fireLeft = function (){this.group.mesh.rotation.setFromVector3(new THREE.Vector3(-Math.PI/2,0,0));};
    this.fireRight = function (){this.group.mesh.rotation.setFromVector3(new THREE.Vector3(Math.PI/2,0,0));};
    /**
     * 
     * @param {THREE.Vector3} direction
     * @returns {void}
     */
    this.setDirection = function(direction){
        this.group.mesh.rotation.setFromVector3(direction.multiplyScalar(Math.PI/2));
    };
    /**
     * Function 
     * @param {THREE.Vector3} position
     * @returns {void}
     */
    this.setPosition = function(position){
        this.group.mesh.position.set(position);
    };
}//MVC//models/Resource.js
function Resource(id){
    this.getName = function(){return this.name;};
    this.getID = function(){return this.id;};
    this.names = ['','','Helium','Metal','Urainium']
    this.id=id;
    this.name = this.names[this.id];
    //this.code = this.codes[this.id];
    /**
     * 
     * @returns {String} 
     */
    this.toString = function(){return this.name + ": " + this.code;};
    this.eq = function(resource){
        return resource.getID()===this.getID();
    };
    
}


//MVC//models/Ship/Alien.js
/* global THREE, __scene */

function AlienShip(bulletHandler){
    //inherits from ship class
    this.__proto__ = new Ship(bulletHandler);
    this.velocity = new THREE.Vector3(0,0,0);
    this.parPos = new THREE.Vector3(0,0,0);
    this.destroy = 0;
    this.explosion = new Explosion(1);
    this.getThree = function(){return this.object;};
    this.make = function(){
        //Geometry of aliens
        var hullGeometry = new THREE.SphereGeometry(0.5,32);
        var wingGeometry = new THREE.CylinderGeometry(0.5,1,0.5,20);

        //materials of aliens
        var spec = new THREE.TextureLoader().load('images/shell.jpg');
        //envirment map for reflections
        var mirrorWingCamera = new THREE.CubeCamera( 0.1, 10000000, 512 );
        var wingMaterial = new THREE.MeshPhongMaterial({specular:'#ffcc00', color: '#E00000', emissive: '#300000',emissiveIntensity:0.,specularMap:spec, shininess: 100 ,envMap: mirrorWingCamera.renderTarget,reflectivity:0.4});


        mirrorWingCamera.updateCubeMap(__renderer,__scene);
        var hullMaterial = new THREE.MeshPhongMaterial({specular:'#ffffff', color: '#FFFFFF', shininess: 100, envMap: mirrorWingCamera.renderTarget,transparent:true,opacity:0.7,reflectivity:0.9})

        //make alian mesh's
        aBody = new THREE.Mesh(hullGeometry, hullMaterial);
        /*aBody.castShadow = true;
        aBody.receiveShadow = true;*/
        aWing = new THREE.Mesh(wingGeometry, wingMaterial);

        //create alien group (group of things that one alien is composed of)
        alienMesh = new THREE.Group();
        alienMesh.add(aBody);
        alienMesh.add(aWing);
        var explosionMesh = this.explosion.getObject();
        explosionMesh.traverseVisible(function(mesh){if(mesh.type!='Group'){mesh.visible=false;}});
        
        var groupMesh = new THREE.Group();
        groupMesh.add(alienMesh);
        groupMesh.add(explosionMesh);
        this.object = groupMesh;
        //this.parPos = new THREE.Vector3(0,0,0);
        //console.log(this.object.position.x);
    };
    //allow for the mesh to be passed as reference to one in a fleet so to reduce memory
    this.makeAsFleet = function(group,add,remove){
        //set this mesh as a clone of the others to save memory
        this.object = group;
        //redefine remove and add as to the parent object rather than __scene
        this.remove=remove;
        this.add = add;
    };
    
    this.setPosition = function(vector3){this.object.position.copy(vector3);};
    this.getPosition = function(){return this.object.position;};
    this.setParentPosition = function(position){this.parPos = position;};
    this.setVelocity = function(vector3){this.velocity = vector3;};
    this.getVelocity = function(){return this.velocity;};
    this.update = function (){
        switch(this.destroy){
            case 1:
                this.destructAnimation();
                break;
            case 0:
                //To include some reference to local ships
                this.alienAI();
                if(this.bullets.hasHit(this.object,this.FOE)){
                    this.destroy = 1;
                    this.explosion.reSet();
                    //console.log('alien down');
                    var location = this.object.position;
                    this.remove(this.object);
                    this.object = this.explosion.getObject();
                    this.object.position.copy(location);
                    this.add(this.object);
                    var self=this;
                    var self=this;
                    setTimeout(function(){self.endAnimation();},2000);

                }
                this.object.position.add(this.velocity);
                break;
        }
    };
    this.alienAI = function(){
            difficulty = 0.001;
            //alians shoot back
            moveSeed = Math.random();
            if(moveSeed<0.1){
                this.velocity.y +=0.0001;
            }else if (moveSeed<0.2){
                this.velocity.y -=0.0001;
            }
            this.velocity.y += (-this.object.position.y) / 1000;
            this.object.position.setY(this.object.position.y+this.velocity.y);
            if(Math.random()<difficulty){
                //make new bullit
                this.bullets.create(this.FOE,(new THREE.Vector3(0,0,0).add(this.object.position)).add(this.parPos));
            }
           
    };
    this.destructAnimation = function(){
        this.explosion.update();
    };
    this.endAnimation = function(){
        this.remove(this.object);
        this.destroy=2;
    };
}

//MVC//models/Ship/AlienFleet.js
/* global THREE */

function AlienFleet(bulletHandler){
    //inherits from ship class
    this.__proto__ = new Ship(bulletHandler);
    this.SPACING=3;
    this.object;
    this.aliens = [];
    this.boolCanShoot;
    this.create=function(){
        var template = new AlienShip(bulletHandler);
        template.make();
        var alienMesh = template.getThree().clone();
        template = null;
        
        //group constants 
        var COLS=10;
        var ROWS=3 ;
        //create array of aliens
        var aliens = new THREE.Group();
        aliens.name="all";
        //this.cube = mirrorWingCamera;
        //create closure for passing new add and remove functions
        var self = this;
        for (x=0;x<COLS;x++){
                //X loop
                for(z=0;z<ROWS;z++){
                        //Z loop
                        //create the user defined types
                        //aliens[x][z] = new Object();
                        //create the alian as a mesh object and set the apropreate properties
                        var alien = new AlienShip(bulletHandler);
                        //alien.makeAsFleet(alienMesh.clone());
                        //alien.children[1].name = aliens.children.length;
                        alien.makeAsFleet(alienMesh.clone(),function(ship){self.addShip(ship);},function(ship){self.removeShip(ship);});
                        alien.setPosition(new THREE.Vector3(this.SPACING*z,0,this.SPACING*x-10));
                        //set the size of the explosion to be mostly small with a small chance of being big
                        alien.explosion = new Explosion(this.getExplosionSize());
                        //alien.velocity = new THREE.Vector3(0,0,0);
                        //add the alian to the __scene
                        aliens.add(alien.getThree());
                        this.aliens.push(alien);
                }
        }
        this.object = aliens;
    };
    this.setPosition = function (position){
        this.object.position.copy(position);
    };
    this.update = function(){
        for(i=0;i<this.aliens.length;i++){
            this.aliens[i].setParentPosition(this.object.position);
            this.aliens[i].update();
        }
    };
    this.moveAliens = function(){
            this.aliens.position.setZ(this.aliens.position.z+0.01*this.alienParity);
            if(this.aliens.position.z>this.SPACING*7||this.aliens.position.z<this.SPACING*-7){
                this.alienParity *=-1;
            }
        };
    /**
     * Function to scale the size of the explosion based on a random number from 0 to 1
     * If rnd is between 0 and .9 it is scalled such that 0 yeilds a 1 and .9 yeilds a 2
     * otherwise rnd is scalled so a .9 yeilds a 2 and a .99 yeilds 10
     * @returns {Number}

     */     
    this.getExplosionSize = function(){
        var rnd = Math.random();
        return rnd<=.9?1+rnd/.9:10/.99*rnd+2-9/.99;  
    };
    this.updateCamera = function (){
            //update a single camera from the aliens 
                                    for(x=0;x<alians.length;x++){
                            for(z=0;z<alians[x].length;z++){
                                alians[x][z].mesh.visible = false;
                            }
                        }
                        mirrorWingCamera.position = alians[5][1].mesh.position;
                        mirrorWingCamera.updateCubeMap( renderer, __scene );
                        for(x=0;x<alians.length;x++){
                            for(z=0;z<alians[x].length;z++){
                                alians[x][z].mesh.visible = true;
                            }
                        }
        };
    this.canShoot= function(){
            this.boolCanShoot=true;
    };
    this.getThree= function(){return this.object;};
    this.addShip = function(ship){
        this.object.add(ship);
    };
    this.removeShip = function(ship){
        this.object.remove(ship);
    };
    this.defeated = function(){return this.object.children.length===0;};
    this.create();
}


//MVC//models/Ship/Fleet.js
/**
 * 
 * Class representing a fleet of ships
 */
function Fleet(bulletHandler){
    //inherits from ship class because the fleet can be treadted as a single ship entity
    this.__proto__ = new Ship(bulletHandler);
}
//MVC//models/Ship/Liberator.js
/* global THREE,I */

function LiberatorShip(bulletHandler){
    //inherits from ship class
    this.__proto__ = new Ship(bulletHandler);
    this.__loader = new THREE.ColladaLoader();
    this.monoPropellant = new MonoPropellant(new THREE.Vector3(0,20,0));
    this.explosion = new Explosion(20);
    this.destroy =0;
    this.health=3;
    /**
     * Function to store the collada object
     * @returns {Function}
     */
    this.makePinaCollada = function(){
        //attach the closure
        var __self = this;
        return function ( collada ) { 
            __self.object = collada.scene;
            //this isn't actually called
            __self.createParticles();
        };
        
    };
    
    this.storeCollada = function(loadedCollada){
        this.object = loadedCollada.scene;
        this.object.rotation.z = deg(180);
        this.createParticles();
    };
    
    this.getThree = function (){return this.object;};
    this.keyboard = function(keyState){
        this.monoPropellant.setEnabled(false);
        //var offset = this.calculateOrbit(0);
        var SPACING = 3;
        if(keyState.pressed("left")){
            //check the object is in range
            if(this.object.position.z>-8*SPACING+this.offset.z){
                    this.object.position.z-=0.1;
                    this.monoMove(new THREE.Vector3(1,0,0));
            }
        }else if(keyState.pressed("right")){
            //check object is in range
            if(this.object.position.z<8*SPACING+this.offset.z){
                    this.object.position.z+=0.1;
                    this.monoMove(new THREE.Vector3(-1,0,0));
            }
        }else if(keyState.pressed("space")){
            this.bullets.create(this.FRIEND,this.object.position);
        }
    };
    this.update = function (){
        this.getHealth()
        switch(this.destroy){
            case 1:
            this.destructAnimation();
            break;
        case 0:
            if(this.bullets.hasHit(this.object,this.FRIEND)){
                //update health locally 
                this.health-=5;
                //update database health
                $.ajax('i/do/TakeHit.php');
                //update global state syncronisation
                I.update();
                //check if health is now bellow zero!
                if(this.health<=0){
                    this.blowUp();
                }
            }
            break;
        }
        //assumed to be run before keyboard update
        
        this.monoPropellant.update();
    };
    this.getHealth = function (){this.health=I.shipInfo._ship.Shielding;return this.health;};
    this.create = function (callback){
        var self = this;
        var onLoad = function(collada){self.storeCollada(collada);callback();};
        this.__loader.load(
            // resource URL
            'ships/ship1.dae',
            // Function when resource is loaded
            onLoad,
            // Function called when download progresses
            function ( xhr ) {
                    console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
            }
        );
    };

    this.setPosition = function (position){
        this.object.position.copy(position);
        this.offset = position;
    };
    this.createParticles = function(){
        this.object.add(this.monoPropellant.getThree());
        this.monoPropellant.setEnabled(false);
    };
    
    /*this.remove = function(){
        return this.health<=0;
    };*/
    /**
     * 
     * @param {THREE.Vector3} direction
     * @returns {void}
     */
    this.monoMove = function(direction){
        this.monoPropellant.setDirection(direction);
        this.monoPropellant.setEnabled(true);
    };
    /**
     * Function to animate ship when under burn power as opposed to monpropellent
     * @param {type} direction
     * @param {type} power
     * @returns {undefined}
     */
    this.powerMove = function(direction,power){
        console.warn('LiberatorShip.powerMove() Remains unimplemented');
    };
    
    this.blowUp = function(){
        this.destroy = 1;
        this.explosion.reSet();
        //console.log('alien down');
        var location = this.object.position;
        this.remove(this.object);
        this.explosionO = this.explosion.getObject();
        this.explosionO.position.copy(location);
        this.add(this.explosionO);
        //var self=this;
        var self=this;
        setTimeout(function(){self.endAnimation();},2000);
    }
    this.destructAnimation = function(){
        this.explosion.update();
    };
    this.endAnimation = function(){
        this.remove(this.explosionO);
        this.destroy=2;
    };
}

//MVC//models/Ship/LiberatorBasic.js
function LiberatorBasicShip(){
    //inherits from ship class
    this.__proto__ = new Ship();
    this.getThree = function(){
        return this.object;
    };
    this.keyboard = function(keyState){
        if(keyState.pressed("left")){
                //check the object is in range
                if(this.object.position.z>-8*this.SPACING+offset.z){
                        this.object.position.z-=0.1
                }
            }else if(keyState.pressed("right")){
                //check object is in range
                if(this.object.position.z<8*this.SPACING+offset.z){
                        this.object.position.z+=0.1
                }
            }
    };
    this.create=function(){
        scale=0.5
    //SHIP---------------------------------------------------------------------------------------
    //the Geometry of the engin bay
    var LiberatorGeometry1 = new THREE.SphereGeometry(2*scale,32,32);
    //the blue color of the engin bay
    var LiberatorMaterial1 = new THREE.MeshPhongMaterial({color:0x0000FF,side:THREE.DoubleSide});
            //the component of the engine bay
            var comp1 = new THREE.Mesh(LiberatorGeometry1,LiberatorMaterial1);
                    comp1.position.x=-1*scale;
    //The Geometry of the cylinders
    var LiberatorGeometry2 = new THREE.CylinderGeometry(1*scale,1*scale,5*scale,32);
    //the gray metal that most of the ship is made of
    var LiberatorMaterial2 = new THREE.MeshPhongMaterial({color:0xc0c0c0,side:THREE.DoubleSide});
            //add the central column
            var comp2 = new THREE.Mesh(LiberatorGeometry2,LiberatorMaterial2);
                    comp2.position.x=3*scale;
                    comp2.rotation.z = Math.PI/2;
    //create the cone on the front of the central column
    var LiberatorGeometry3 = new THREE.CylinderGeometry(0,1*scale,2*scale,32);
            var comp3 = new THREE.Mesh(LiberatorGeometry3,LiberatorMaterial2);
                    comp3.position.x=6*scale;
                    comp3.rotation.z=-Math.PI/2;
    //create the plane that connects the outer columns
    var LiberatorGeometry4 = new THREE.PlaneGeometry(5*scale,1);
            //plane
            var comp4 = new THREE.Mesh(LiberatorGeometry4,LiberatorMaterial2);
                    comp4.rotation.z = Math.PI/4;
                    comp4.position  = new THREE.Vector3(3,2,0).multiplyScalar(scale);
            //cyliner
            var comp5 = new THREE.Mesh(LiberatorGeometry2,LiberatorMaterial2);
                    comp5.position = new THREE.Vector3(3,4,0).multiplyScalar(scale);
                    comp5.rotation.z=-Math.PI/2;
            //cone
            var comp6 = new THREE.Mesh(LiberatorGeometry3,LiberatorMaterial2);
                    comp6.position = new THREE.Vector3(6,4,0).multiplyScalar(scale);
                    comp6.rotation.z=-Math.PI/2;
    var LiberatorGeometry7 = new THREE.SphereGeometry(1*scale,32,32);
            //sphere
            var comp7 = new THREE.Mesh(LiberatorGeometry7,LiberatorMaterial2);
                    comp7.position = new THREE.Vector3(0.5,4,0).multiplyScalar(scale);
            //plane
            var comp8 = new THREE.Mesh(LiberatorGeometry4,LiberatorMaterial2);
                    comp8.rotation.z = -Math.PI/4;
                    comp8.rotation.x = -Math.PI/4;
                    comp8.position = new THREE.Vector3(3,-1.4,1.4).multiplyScalar(scale);
            //plane
            var comp9 = new THREE.Mesh(LiberatorGeometry4,LiberatorMaterial2);
                    comp9.rotation.z = -Math.PI/4;
                    comp9.rotation.x = Math.PI/4;
                    comp9.position = new THREE.Vector3(3,-1.4,-1.4).multiplyScalar(scale);
            //sphere
            var comp10 = new THREE.Mesh(LiberatorGeometry7,LiberatorMaterial2);
                    comp10.position = new THREE.Vector3(0.5,-2.8,2.8).multiplyScalar(scale);
            //sphere
            var comp11 = new THREE.Mesh(LiberatorGeometry7,LiberatorMaterial2);
                    comp11.position = new THREE.Vector3(0.5,-2.8,-2.8).multiplyScalar(scale);
            //cone
            var comp12 = new THREE.Mesh(LiberatorGeometry3,LiberatorMaterial2);
                    comp12.position = new THREE.Vector3(6,-2.8,-2.8).multiplyScalar(scale);
                    comp12.rotation.z=-Math.PI/2;
            //cone
            var comp13 = new THREE.Mesh(LiberatorGeometry3,LiberatorMaterial2);
                    comp13.position = new THREE.Vector3(6,-2.8,2.8).multiplyScalar(scale);
                    comp13.rotation.z=-Math.PI/2;
            //cylinder
            var comp14 = new THREE.Mesh(LiberatorGeometry2,LiberatorMaterial2);
                    comp14.position = new THREE.Vector3(3,-2.8,2.8).multiplyScalar(scale);
                    comp14.rotation.z=-Math.PI/2;
            //cyloinder
            var comp15 = new THREE.Mesh(LiberatorGeometry2,LiberatorMaterial2);
                    comp15.position = new THREE.Vector3(3,-2.8,-2.8).multiplyScalar(scale);
                    comp15.rotation.z=-Math.PI/2;
            spaceShip = new THREE.Group()
            spaceShip.add(comp1);
            spaceShip.add(comp2);
            spaceShip.add(comp3);
            spaceShip.add(comp4);
            spaceShip.add(comp5);
            spaceShip.add(comp6);
            spaceShip.add(comp7);
            spaceShip.add(comp8);
            spaceShip.add(comp9);
            spaceShip.add(comp10);
            spaceShip.add(comp11);
            spaceShip.add(comp12);
            spaceShip.add(comp13);
            spaceShip.add(comp14);
            spaceShip.add(comp15);
            spaceShip.position.set(0,0,10);
            this.object = spaceShip;
        };
}
//MVC//models/Ship/Ship.js
/* global THREE */

//top level class for ships
function Ship(bulletHandler){
    
    this.bullets = bulletHandler;
    this.health;
    
    this.getHealth= function(){return this.health;};
    this.setHealth=function(health){this.health= health;};
    /**
     * Function returns the three object of the ship
     */
    this.getThree = function(){console.warn('Abstract function getThree not overwritten!');};
    //this.getThree = function(){return this.object;};
    /**
     * Function to handle any updates to the ship that should occurer every update
     * @returns void
     */
    this.update = function(){console.warn('Abstract function update not overwritten!');};
    /**
     * Function to handle updates from keystate
     * @returns void
     */
    this.keyboard = function(keystate){console.warn('Abstract function keyboard not overwritten!');};
    /**
     * Function to allow the ship to be scaled either to a 
     * relative size of the the objects around it or 
     * to fit a particular box.
     * @returns {THREE.Vector3}
     */
    this.scale = function(){
        return THREE.Vector3(1,1,1);
    };
    this.remove = function(ship){__scene.remove(ship);};
    this.add = function(ship){__scene.add(ship);};
    /**
     * Abstract function for scaling ship to fit inside a box of particular size
     * @param {THREE.Vector3} Box
     * @returns {void}
     */
    this.setScale = function(Box){
        console.warn('Abstract function setScale not overwritten!');
    };
    this.detectCollisions = function(){
            var hit = this.bullets.checkCollision(this.aliens,this.ship);
            for(n=0;n<this.aliens.children.length;n++){
                for(i=0;i<hit.aliens.length;i++){
                    if(this.aliens.children[n].children[1].name==hit.aliens[i]){
                        this.aliens.remove(this.aliens.children[n]);
                    }
                }
            }
            if(hit.friend){
                this.health-=5;
                document.getElementById('health').width=health*2.5 + "px";
                document.getElementById('healthTXT').innerHTML = this.health;
            }
            if(this.health<5 && !this.dead){
                //document.getElementById('die').play()
                document.getElementById('infoBox').innerHTML = "<h1>You have lost too much shielding!</h1><p>Your commander has ordered you to retreat as you have lost too much Shielding. It is military policy that you cannot fight with your shielding bellow 5%</p><br /><input type='button' id='bk2od' value='Back to orbit' />";
                document.getElementById('infoBoxParent').hidden = false;
                var _self = this;
                document.getElementById('bk2od').addEventListener("click",function(){_self.backToOrbit();});
        
                this.start= false;
                this.dead=true;
                //add eventhandlers
            }
        };
        this.FRIEND = this.bullets.createAllegiance("Friend",0x0000FF,new THREE.Vector3(1,0,0),500);
        this.FOE = this.bullets.createAllegiance("Foe",0xFF000,new THREE.Vector3(-1,0,0),0);
        
}//MVC//models/spaceStation.js
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function makeSpaceStation(){
    //space station
	var spaceStation = new Object();
	spaceStation.cylinder = new Array();
	spaceStation.plane = new Array();
	spaceStation.position= new THREE.Vector3(0,0,0);
	var group = new THREE.Group();
	spaceStation.Cposition = new THREE.Vector3(0,0,10);
	var planeTexture = new THREE.TextureLoader().load('images/panels.jpg');
	var planeMaterial = new THREE.MeshPhongMaterial({map:planeTexture});
	var planeGeometry = new THREE.PlaneGeometry(0.3,1);
	var nighty = Math.PI/2;
	var pannelData = [{position: new THREE.Vector3(-2.35,0,0.65), rotation : new THREE.Euler(nighty,0,0)},
{position: new THREE.Vector3(-2.,0,0.65), rotation : new THREE.Euler(nighty,0,0)},
{position: new THREE.Vector3(-1.65,0,0.65), rotation : new THREE.Euler(nighty,0,0)},
{position: new THREE.Vector3(-1.3,0,0.65), rotation : new THREE.Euler(nighty,0,0)},
{position: new THREE.Vector3(1.3,0,0.65), rotation : new THREE.Euler(nighty,0,0)},
{position: new THREE.Vector3(1.65,0,0.65), rotation : new THREE.Euler(nighty,0,0)},
{position: new THREE.Vector3(2,0,0.65), rotation : new THREE.Euler(nighty,0,0)},
{position: new THREE.Vector3(2.35,0,0.65), rotation : new THREE.Euler(nighty,0,0)},
{position: new THREE.Vector3(-2.35,0,-0.65), rotation : new THREE.Euler(nighty,0,0)},
{position: new THREE.Vector3(-2.,0,-0.65), rotation : new THREE.Euler(nighty,0,0)},
{position: new THREE.Vector3(-1.65,0,-0.65), rotation : new THREE.Euler(nighty,0,0)},
{position: new THREE.Vector3(-1.3,0,-0.65), rotation : new THREE.Euler(nighty,0,0)},
{position: new THREE.Vector3(1.3,0,-0.65), rotation : new THREE.Euler(nighty,0,0)},
{position: new THREE.Vector3(1.65,0,-0.65), rotation : new THREE.Euler(nighty,0,0)},
{position: new THREE.Vector3(2,0,-0.65), rotation : new THREE.Euler(nighty,0,0)},
{position: new THREE.Vector3(2.35,0,-0.65), rotation : new THREE.Euler(nighty,0,0)},
{position: new THREE.Vector3(0.65,0.5,0.85), rotation : new THREE.Euler(nighty,0,nighty)},
{position: new THREE.Vector3(0.65,0.5,1.35), rotation : new THREE.Euler(nighty,0,nighty)},
{position: new THREE.Vector3(-0.65,0.5,0.85), rotation : new THREE.Euler(nighty,0,nighty)},
{position: new THREE.Vector3(-0.65,0.5,1.35), rotation : new THREE.Euler(nighty,0,nighty)}];
	for(i=0;i<pannelData.length;i++){
		spaceStation.plane[i] = new THREE.Mesh(planeGeometry,planeMaterial);
		spaceStation.plane[i].material.side = THREE.DoubleSide;
		spaceStation.plane[i].rotation.copy( pannelData[i].rotation);
		spaceStation.plane[i].position.copy(pannelData[i].position);// + spaceStation.x;
		group.add(spaceStation.plane[i]);
	}
	var bodyData =[{position: new THREE.Vector3(-2,0,0), rotation : new THREE.Euler(0,0,nighty)},
{position: new THREE.Vector3(-1,0,0), rotation : new THREE.Euler(0,0,nighty)},
{position: new THREE.Vector3(0,0,0), rotation : new THREE.Euler(0,0,nighty)},
{position: new THREE.Vector3(1,0,0), rotation : new THREE.Euler(0,0,nighty)},
{position: new THREE.Vector3(2,0,0), rotation : new THREE.Euler(0,0,nighty)},
{position: new THREE.Vector3(0,-0.5,0), rotation : new THREE.Euler(0,0,0)},
{position: new THREE.Vector3(0,0,0), rotation : new THREE.Euler(0,0,0)},
{position: new THREE.Vector3(0,0.5,0), rotation : new THREE.Euler(0,0,0)},
{position: new THREE.Vector3(0,0.5,0), rotation : new THREE.Euler(nighty,0,0)},
{position: new THREE.Vector3(0,0.5,1), rotation : new THREE.Euler(nighty,0,0)}];
	var cylinderTexture = new THREE.TextureLoader().load('images/shell.jpg');
	var cylinderMaterial = new THREE.MeshPhongMaterial({map:cylinderTexture,ambient:0xc0c0c0,specular:0xd0d0d0,shininess:1});
	var cylinderGeometry = new THREE.CylinderGeometry(0.15,0.15,1,32);
	for(i=0;i<bodyData.length;i++){
		spaceStation.cylinder[i] = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
		spaceStation.cylinder[i].rotation.copy(bodyData[i].rotation);
		spaceStation.cylinder[i].position.copy(bodyData[i].position);
		group.add(spaceStation.cylinder[i]);
            }
	group.rotation.y=0.6;
	group.rotation.z=0.6;
        return group;
}
//MVC//tests/channel.js
//A block to test the channel class

//A channel is a 3 tuple of a buy resource, sell resource
//and a rate at which the buy resource can be purchased given the sell resource


//MVC//tests/Market.js
//block to test the market class

//a market should be created from a set of channels
//and the function that can be used on those channels 


//channel generator 
//take from channel function tester



/*
 * getBuyOptions
 * 
 * given a resource to sell it should display all of the resources that can be bought
 * using that resource.
 * 
 * This function is dependent of the state of the channel array
 */


/*
 * getSellOptions
 * 
 * Simply returns an array of the sell resources that are available through
 * the channel
 * 
 *  This function is dependednt of the state of the channel array 
 * 
 */

/*
 * resourceListToOption
 * 
 * This function takes a list of type resource and returns 
 * a string which is html for the option box to be used on the page
 * 
 */

/*
 * getRate
 * 
 * This is a function which given two resources either:
 * returns the rate between the two resources
 * or
 * false if there is no channel trading in that direction between the two
 * resources
 *///MVC//Views/CombatAnimation.js
/* global THREE, __scene, __camera */

function CombatAnimation(shipPos,planetPos,changePage){
    //animation variables
    this.animation = 1;
    this.orbitPos = Math.PI/2;
    this.thi = 0;
    this.shipPos = shipPos;
    this.planetPos = planetPos;
    this.Crotation = deg(-80);
    this.changePage = changePage;
    this.moveToShip=0;
    
    this.setAnimation = function(animation){this.animation=animation;};
    this.getAnimation=function(){return this.animation;};
    //ANIMATIONS
    this.update = function(){
        switch(this.animation){
            case 1:
                this.animationUpdate();
                return true;
                break;
            case 2:
                this.animationUpdateB();
                return true;
                break;
            //case 0 no animation: do nothing
        }
        return false;
    };
    
    this.animationUpdate = function (){
        //target (0,20)
        //increase latitude
        if(this.thi<deg(20)){
            this.thi+=deg(20)/120;
        }
        //decrease longditude
        if(this.orbitPos<deg(180)){
            this.orbitPos+=deg(180)/240;
        }
        //check to end animation 
        if(this.orbitPos>deg(180) && this.thi>deg(20)){
            if(this.log(this.moveToShip)>=1){
                console.log('Movement Fin');
                this.animation = 0;
                this.thi=deg(20);
                this.orbitPos=deg(180);
            }else{
                this.moveToShip+=0.1;
                var planetpos = new THREE.Vector3(0,0,0).multiplyScalar(1-this.log(this.moveToShip));
                var shipPos = new THREE.Vector3(0,0,0).copy(this.shipPos).multiplyScalar(this.log(this.moveToShip));

                lookat = planetpos.add(shipPos);
            }
        }else{
            lookat = this.planetPos;
        }
        //update __scene
        //this.planetPos.copy( this.calculateOrbit(0).negate() );
        this.updateCameraPosition();
        __camera.lookAt(lookat);
    };
    this.animationUpdateB = function(){
        //start by moving focus
        if(this.log(this.moveToShip)>=1){
            this.moveToShip-=0.1;
            var planetpos = new THREE.Vector3(0,0,0).multiplyScalar(1-this.log(this.moveToShip));
            var shipPos = new THREE.Vector3(0,0,0).copy(this.shipPos).multiplyScalar(this.log(this.moveToShip));

            lookat = planetpos.add(shipPos);
        }else{
            //then move camera
            //decrease latitude
            if(this.thi>0){
                this.thi-=deg(20)/120;
            }
            //decrease longditude
            if(this.orbitPos>deg(90)){
                this.orbitPos-=deg(180)/240;
            }
            //check to end animation 
            if(this.orbitPos<=deg(90) && this.thi<=0){
                    console.log('Movement Fin');
                    this.thi=0;
                    this.orbitPos=deg(90);
                    __scene.remove(this.ship);
                    __scene.remove(this.aliens);
                    this.changePage();
            }
            lookat = this.planetPos;
        }
        this.updateCameraPosition();
        __camera.lookAt(lookat);
    };
    
    this.calculateOrbit = function(radialOffset){
        return calculateOrbit(radialOffset,this.orbitPos,this.thi);
    };
    this.updateCameraPosition = function(){
        __camera.position.copy(this.calculateOrbit(0).add(new THREE.Vector3(50* Math.sin(this.Crotation),50* Math.cos(this.Crotation),this.shipPos.z)));
    };
    this.log = function(x){
        return Math.log(x*Math.pow(10,17))/40;
    };
}//MVC//Views/MapAnimation.js
/* global __camera */

function MapAnimation(){
    //object at centre of scene
    this.core;
    //object at edge of scene
    this.outa;
    //field of view of camera
    this.FOV = __camera.fov;
    
    //vector 90deg to the the line core,outer and at 40deg to the plane x,z
    this.planeVector;
    
    this.cameraLookAt = this.outa.add(this.core.position,this.F.multiplyScalar(0.5));
    this.cameraPosition = this.core.add(this.F)
                                    .add(this.F.normalise().multiplyScalar(this.outa.radius))
                                    .add(this.F.appleMatrix(this.R).multiplyScalar(1/(2*Math.Cos(this.a))))
                                    .add(this.F.normalise().multiplyScalar(this.outa.radius/(Math.Sin(a)*Math.Cos(a))));
    /*s = this.core.position;
    F=this.outa.minus(this.core);
    r = this.outa.radius;
    R = rotation about 
    S+F+rF^+RF/2cosa+rF^/sinacosa;*/
    
    //vector from the center object to the outa object
    this.F=this.outa.minus(this.core);
    
    
}//MVC//Views/vw.js
function vw(){
    this.elm = function(id){
        return document.getElementById(id);
    }
}

//MVC//Views/vwCargo.js
function vwCargo(){
    this.makeOverlay = function(hold){
        var htmlOverlay = '<h1>Cargo</h1>';
        htmlOverlay = htmlOverlay + hold.toString();
    };
}//MVC//Views/vwCombat.js
function vwCombat(){
    this.__proto__ = new vw();
    /**
     * Function to create technical overlay at the beginning of the combat scene
     * @param function bk2oFunction Function to be called to go back to orbit
     * @returns {undefined}
     */
    this.createUserInterface = function(bk2oFunction){
        //health bar            
        htmlOverlay = '<div style="position:absolute; top:0px;right:0px;z-index:6;"><table id="health" style="background-color:green;height:30px;" width="250px"><tr><td id="healthTXT"></td></tr></table></div>';            
        //Info box telling the user to press space to start
        htmlOverlay += '<div id="infoBoxParent" style="position:absolute;top:250px;left:250px;z-index:5;width:300px;"><table style="background-color:black;color:white;"><tr><td id="infoBox"><h1>Press space to start</h1><input id="bk2o" type="button" value="Back to orbit"  /></td></tr></table></div>';
        this.elm('overlay').innerHTML = htmlOverlay;
        this.elm('style').innerHTML = 'body{	background-color:black;	color:white;	font-size:80%;	}	.clickable:hover{	background-color:#0000A0;	color:#FFFFE0;	cursor:pointer; cursor:hand;	}';
        this.elm('infoBox').top = window.innerHeight/2-100;
        this.elm('infoBox').left = window.innerWidth/2-100;

        //add eventhandlers
        this.elm('bk2o').addEventListener("click",bk2oFunction);
    };
    
    this.displayWinScreen = function(bk2oFunction){
        //won=true;
        this.elm('infoBox').innerHTML = "<h1>You have won!</h1><p>You have been rewarded 100 Helium for your efforts</p><br /><input id='bk2o' type='button' value='Back to orbit' />";
        this.elm('infoBoxParent').hidden = false;
        //add eventhandlers
        this.elm('bk2o').addEventListener("click",bk2oFunction);

        /*$.ajax({url:"scripts/combat/won.php",post:"data:shipInfo"}).done(function(resp){
            //take the responce and put it in the class box
            this.elm("console").innerHTML = this.elm("console").innerHTML + '<br />' +  resp;});*/
    };
    this.displayFailScreen = function(bk2oFunction){
        this.elm('infoBox').innerHTML = "<h1>You have lost!</h1><p>You have been destroyed</p><br /><input id='bk2o' type='button' value='Back to orbit' />";
        this.elm('infoBoxParent').hidden = false;
        //add eventhandlers
        this.elm('bk2o').addEventListener("click",bk2oFunction);
    };
    this.setHealth = function (health){
        this.elm('health').style.width = (250*health/100) + "px";
        this.elm('healthTXT').innerHTML = health + "%";
    };
}
//MVC//Views/vwOrbit.js
/**
 * Class to represent the visual aspects of the orbit page
 */
function vwOrbit(){
    
}

//MVC//Views/vwTrade.js
/**
 * Class to handle the visualisation of the market
 */
function vwTrade(market){
    this.__proto__ = new vw();
    this.market = market;
    this.res1Selection = 0;
    this.setRes1Selection = function(){this.res1Selection=1;};
    this.unSetRes1Selection = function(){this.res1Selection=0;};
    this.makeTable = function(){
        return this.makeRes1Box()+this.makeRes2Box()+
                this.makeAmmount1Box()+this.makeAmmount2Box()+
                this.makeDoButton();
    };
    this.attatchListeners = function(controler){
        //attach onchange to resBox1
        this.elm('resBox1').addEventListener("change",function(){controler.res1c();});
        //attach onchange to resBox2
        this.elm('resBox2').addEventListener("change",function(){controler.res2c();});
        //attach onchange to ammountBox1
        this.elm('ammountBox1').addEventListener("change",function(){controler.ammount1c();});
        //attach onchange to ammountBox2
        this.elm('ammountBox2').addEventListener("change",function(){controler.ammount2c();});
        //attach onchange to doTradeButton
        this.elm('doTradeButton').addEventListener("click",function(){controler.doClick();});
    };
    
    this.makeRes1Box = function(){
        var options = this.makeInnerRes1Box();
        return "<select id='resBox1'>" + options + "</select>";
    };
    this.makeInnerRes1Box = function(){
        return this.market.resourceListToOption(this.market.getBuyOptions());
    };
    this.makeRes2Box = function(){
        var options;
        if(this.res1Selection){
            options = this.makeInnerRes2Box();
        }else{
            options = this.market.resourceListToOption(this.market.getSellOptions(this.market.getBuyOptions()[0]));
        }
        return "<select id='resBox2'>" + options + "</select><br />";
    };
    this.makeInnerRes2Box = function (){
        return this.market.resourceListToOption(this.market.getSellOptions(this.getBuyResSelection()));
    };
    this.makeAmmount1Box = function(){
        return "<input type='number' id='ammountBox1' value='1' />";
    };
    this.makeAmmount2Box = function(){
        return "<input type='number' id='ammountBox2' value='1' /><br />";
    };
    this.makeDoButton = function(){
        return "<input type='button' id='doTradeButton' value='do'/><br />";
    };
    
    this.updateInner = function(id,html){
        this.elm(id).innerHTML=html;
    };
    this.updateValue = function(id,value){
        this.elm(id).value = value;
    };
    
    this.getBuyResSelection = function (){
        return new Resource(this.elm('resBox1').value);
    };
    this.getSellResSelection = function (){
        return new Resource(this.elm('resBox2').value);
    };
    this.getBuyAmmount = function(){return this.elm('ammountBox1').value;};
    this.getSellAmmount = function(){return this.elm('ammountBox2').value;};
    
    
}

