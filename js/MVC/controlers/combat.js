/* global __renderer, __scene */

//battles class file
//__scene-centric coordinates
 
function conCombat(){
        //inherits from page class
        this.__proto__ = new Page();
        
        //class information
	this.name = "Combat";
	this.id = 5;
	
        this.overlayHandle = new vwCombat();
        this.animationHandle = new CombatAnimation();

        this.eventHandlers =[];
        this.bullets = new BulletHandler(__scene,5000);
       
        this.dificulty = 0.001;
        this.Crotation = deg(-80);
        this.orbitPos = Math.PI/2;
        this.thi = 0;
        this.dead=false;
        this.moveToShip=0;
        
        
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
            this.orbitPos = Math.PI/2;
            this.thi = 0;
            this.SPACING = 3;
            this.inAnimation=1;//0:not in animation,1:to fight,2:from fight
            this.dead=false;
            this.moveToShip=0;
                //switch based on where the page is coming from
                switch(from){
                    case 0:
                        //page has been loaded by orbit
                        this.constructFirst();
                        break;
                        
                }
                //Notify that this function is ready to be run
                this.ready = true;
                this.onready(this.id);
	}
        this.destroy = function(to){
            //switch based on who the page is going to next
            switch(to){
            }
        }
        //function to construct the __scene if nothing has yet been constructed.
        this.constructFirst = function(){
                this.inAnimation = 1;
                //planet should already exist
		//lighting should already be set up
                //The sun should lready be there
                //temp set thi andorbitpos
                this.thi=deg(20);
                this.orbitPos=deg(180);
                //add spaceship
                this.ship = this.loadLib();
                this.ship.setPosition(this.calculateOrbit(0));
                __scene.add(this.ship.getThree());
		//add aliens
                this.aliens = new AlienFleet();
                this.aliens.setPosition(this.calculateOrbit(0).add(new THREE.Vector3(20,0,0)));
                __scene.add(this.aliens.getThree());
                //reset thi and orbitpos
                this.thi=0;
                this.orbitPos = Math.PI/2;
                this.findPlanet();
                //create user interface
                this.createUserInterface();
        };
        //create a closure containing a reference to this class and the index of the page to be loaded in
        this.makeChanger = function(page,nextPageID){
            var locPage = page;
            var locNextPage = nextPageID;
            return function (){
                locPage.destroy(locNextPage);
                locPage.change=true;
                locPage.nextPage = locNextPage; 
            }
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

        //CREATORS
        this.loadLib = function(){
            var ship = new LiberatorShip();
            ship.create();
            return ship.getThree();
        }
        
        //UPDATES (frame by frame)
        //function to update __scene each frame
	this.update = function(){
            if(this.animation.is()){
                this.animation.do();
            }else{
                this.cube.updateCubeMap(__renderer,__scene);
                //Rotate the ship
                this.bullets.update();
                this.alienFleet.update();
                this.ship.update();
                //GAME OVER!
                this.checkGameOver();
                //Update an alien wing camera
                if(this.start){
                    this.alienFleet.canShoot();
                }
                //detect collisions
                this.detectCollisions();
            }
        }
        //function to handle keyboard events
	this.keyboard= function(keyState){
            var offset = this.calculateOrbit(0);
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
            __camera.lookAt( this.ship.position);
            //SHOOTING
            if(keyState.pressed("space")){
                if(!this.dead){
                    this.start=true;//allow the aliens to start shooting
                    document.getElementById('infoBoxParent').hidden = true;
                }
            }
	};

        
        this.checkGameOver = function(){
            if(this.score==300 && this.won==false){
                this.overlayHandle.displayWinScreen();            
            }
        };
        
        
        //DESTRUCTORS
        this.destructor = function(){
            __scene.remove(this.ship);
            __scene.remove(this.aliens);
        }
        
        //CALCULATIONS
        //function to generate a reference to the planet in the __scene so it can be moved
        this.findPlanet = function (){
            for(i=0;i<__scene.children.length;i++){
                if(__scene.children[i].name=="planet"){
                    this.threePlanet = __scene.children[i];
                    return null;
                }
            }
        }
        this.calculateOrbit = function(radialOffset){
            return new THREE.Vector3(
                3*(this.planet['Radius']-radialOffset)*Math.cos(this.orbitPos)*Math.cos(this.thi),
                3*(this.planet['Radius']-radialOffset)*Math.sin(this.thi),
                3*(this.planet['Radius']-radialOffset)*Math.sin(this.orbitPos)*Math.cos(this.thi));
	}
        this.updateCameraPosition = function(){
            __camera.position.copy(this.calculateOrbit(0).add(new THREE.Vector3(50* Math.sin(this.Crotation),50* Math.cos(this.Crotation),this.ship.position.z)));
        }
        this.log = function(x){
            return Math.log(x*Math.pow(10,17))/40;
        }
}
