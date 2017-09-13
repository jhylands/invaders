/* global __renderer, __scene, THREE, __camera */

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
        this.bullets = new BulletHandler(5000);
       
        this.dificulty = 0.001;
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
            __scene.remove(this.threeShip);
            //switch based on who the page is going to next
            switch(to){
            }
        };
        //function to construct the __scene if nothing has yet been constructed.
        this.constructFirst = function(){
                this.findPlanet();
                this.won=false;
                //planet should already exist
		//lighting should already be set up
                //The sun should lready be there
                //temp set thi andorbitpos
                this.thi=deg(20);
                this.orbitPos=deg(180);
                //add spaceship
                this.threeShip = new THREE.Mesh(new THREE.CubeGeometry(1,1),new THREE.MeshBasicMaterial());
                this.loadLib();
                
                var self = this;
                this.animation = new CombatAnimation(this.threeShip.position,this.threePlanet.position,function(){self.makeChanger(self,0)();});
                /*this.ship.setPosition(this.calculateOrbit(0));
                __scene.add(this.ship.getThree());*/
            
		//add aliens
                this.alienFleet = new AlienFleet(this.bullets);
                this.alienFleet.setPosition(this.calculateOrbit(0).add(new THREE.Vector3(20,0,0)));
                __scene.add(this.alienFleet.getThree());
                //create user interface
                this.view.createUserInterface(function(){self.backToOrbit();});
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
                //detect collisions
                //this.detectCollisions();
            }
        };
        //function to handle keyboard events
	this.keyboard= function(keyState){
            //need to check is game is active first
            //MOVEMENT CONTROLLS
            this.ship.keyboard(keyState);
            //CAMERA MOVEMENT
            if(keyState.pressed("up")){
                this.Crotation+=0.01;
            }else if(keyState.pressed("down")){
                this.Crotation-=0.01;
            }
            this.updateCameraPosition();
            //get the camera to look at the spaceship
            __camera.lookAt( this.threeShip.position);
            //SHOOTING
            if(keyState.pressed("space")){
                if(!this.dead){
                    this.start=true;//allow the aliens to start shooting
                    document.getElementById('infoBoxParent').hidden = true;
                }
            }
	};

        
        
        
        
        //DESTRUCTORS
        this.destructor = function(){
            __scene.remove(this.threeShip);
            __scene.remove(this.aliens);
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
