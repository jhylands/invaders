//battles class file
//__scene-centric coordinates
 
function conCombat(){
        //inherits from page class
        this.__proto__ = new Page();
        
        //class information
	this.name = "Combat";
	this.id = 5;
	
        

        this.eventHandlers =[];
        this.bullets = new BulletHandler(__scene,5000);
        
        //Allegiances
        this.friendAllegiance = this.bullets.createAllegiance("Friend",0x0000FF,new THREE.Vector3(1,0,0),1000);
        this.foeAllegiance = this.bullets.createAllegiance("Foe",0xFF000,new THREE.Vector3(-1,0,0),0);
        
        this.dificulty = 0.001;
        this.Crotation = deg(-80);
        this.orbitPos = Math.PI/2;
        this.thi = 0;
        this.SPACING = 3;
        this.inAnimation=1;//0:not in animation,1:to fight,2:from fight
        this.dead=false;
        this.health = 10;
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
            this.health = 10;
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
                this.ship = this.loadBasicLib();
                this.ship.position.copy(this.calculateOrbit(0));
                __scene.add(this.ship);
		//add aliens
                this.aliens = this.makeAlien();
                this.aliens.position.copy(this.calculateOrbit(0).add(new THREE.Vector3(20,0,0)));
                __scene.add(this.aliens);
                //reset thi and orbitpos
                this.thi=0;
                this.orbitPos = Math.PI/2;
                this.findPlanet();
                //create user interface
                this.createUserInterface();
        }
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

        this.loadBasicLib = function(){
            var ship = new LiberatorBasicShip();
            ship.create();
            return ship.getThree();
        }
        this.loadLib = function(){
            loadGeometry('ship');
        }
        this.createUserInterface = function(){
            //health bar            
            htmlOverlay = '<div style="position:absolute; top:0px;right:0px;z-index:6;"><table id="health" style="background-color:green;height:30px;" width="250px"><tr><td id="healthTXT"></td></tr></table></div>';            
            //Info box telling the user to press space to start
            htmlOverlay += '<div id="infoBoxParent" style="position:absolute;top:250px;left:250px;z-index:5;width:300px;"><table style="background-color:black;color:white;"><tr><td id="infoBox"><h1>Press space to start</h1><input id="bk2o" type="button" value="Back to orbit"  /></td></tr></table></div>';
            document.getElementById('overlay').innerHTML = htmlOverlay;
            document.getElementById('style').innerHTML = 'body{	background-color:black;	color:white;	font-size:80%;	}	.clickable:hover{	background-color:#0000A0;	color:#FFFFE0;	cursor:pointer; cursor:hand;	}';
            document.getElementById('infoBox').top = window.innerHeight/2-100;
            document.getElementById('infoBox').left = window.innerWidth/2-100;
            
            //add eventhandlers
            //closure needed 
            var _self = this;
            document.getElementById('bk2o').addEventListener("click",function(){_self.backToOrbit();});
        }
        
        //UPDATES (frame by frame)
        //function to update __scene each frame
	this.update = function(){
            switch(this.inAnimation){
                case 0:
                    this.cube.updateCubeMap(__renderer,__scene);
                    //Rotate the ship
                    this.moveEntities();
                    //GAME OVER!
                    this.checkGameOver();
                    //Update an alien wing camera
                    if(this.start){
                        this.alienAI();
                    }
                    //detect collisions
                    this.detectCollisions();
                    break;
                case 1:
                    this.animationUpdate();
                    break;
                case 2:
                    this.animationUpdateB();
                    break;
            }
        }
        //function to handle keyboard events
	this.keyboard= function(keyState){
            var offset = this.calculateOrbit(0);
            //need to check is game is active first
            //MOVEMENT CONTROLLS
            loopThroughObjects();
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
                //might need to ad sound
                this.bullets.create(this.friendAllegiance,this.ship.position);
                if(!this.dead){
                    this.start=true;//allow the aliens to start shooting
                    document.getElementById('infoBoxParent').hidden = true;
                }
            }
	}
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
        }
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
                document.getElementById('infoBox').innerHTML = "<h1>You have lost too much shielding!</h1><p>Your commander has ordered you to retreat as you have lost too much sheilding. It is military policy that you cannot fight with your shielding bellow 5%</p><br /><input type='button' id='bk2od' value='Back to orbit' />";
                document.getElementById('infoBoxParent').hidden = false;
                var _self = this;
                document.getElementById('bk2od').addEventListener("click",function(){_self.backToOrbit();});
        
                this.start= false;
                this.dead=true;
                //add eventhandlers
            }
        };
        this.checkGameOver = function(){
            if(this.score==300 && this.won==false){
                //won=true;
                document.getElementById('infoBox').innerHTML = "<h1>You have won!</h1><p>You have been rewareded 100 Helium for your efforts</p><br /><input id='bk2o' type='button' value='Back to orbit' />";
                document.getElementById('infoBoxParent').hidden = false;
                var _self = this;
                document.getElementById('bk2o').addEventListener("click",function(){_self.backToOrbit();});
        
                $.ajax({url:"scripts/combat/won.php",post:"data:shipInfo"}).done(function(resp){
                    //take the responce and put it in the class box
                    document.getElementById("console").innerHTML = document.getElementById("console").innerHTML + '<br />' +  resp;});            
            }
        }
        this.alienAI = function(){
            difficulty = 0.001;
            //alians shoot back
            for(var x=0;x<this.aliens.children.length;x++){
                moveSeed = Math.random();
                if(moveSeed<0.1){
                    this.aliens.children[x].velocity.y +=0.0001;
                }else if (moveSeed<0.2){
                    this.aliens.children[x].velocity.y -=0.0001;
                }
                this.aliens.children[x].velocity.y += (-this.aliens.children[x].position.y) / 1000;
                this.aliens.children[x].position.setY(this.aliens.children[x].position.y+this.aliens.children[x].velocity.y);
                if(Math.random()<difficulty){
                    //make new bullit
                    this.bullets.create(this.foeAllegiance,(new THREE.Vector3(0,0,0).add(this.aliens.children[x].position)).add(this.aliens.position));
                }
            }
        }
        this.alienParity = 1;
        this.moveAliens = function(){
            this.aliens.position.setZ(this.aliens.position.z+0.01*this.alienParity);
            if(this.aliens.position.z>this.SPACING*7||this.aliens.position.z<this.SPACING*-7){
                this.alienParity *=-1;
            }
        }
        this.moveEntities = function(){
            this.bullets.update();
            this.moveAliens();
        }
        
        //ANIMATIONS
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
                    console.log('Movement Fin')
                    this.inAnimation = 0;
                    this.thi=deg(20);
                    this.orbitPos=deg(180);
                }else{
                    this.moveToShip+=0.1;
                    var planetpos = new THREE.Vector3(0,0,0).multiplyScalar(1-this.log(this.moveToShip));
                    var shipPos = new THREE.Vector3(0,0,0).copy(this.ship.position).multiplyScalar(this.log(this.moveToShip));
                    
                    lookat = planetpos.add(shipPos);
                }
            }else{
                lookat = this.threePlanet.position;
            }
            //update __scene
            //this.threePlanet.position.copy( this.calculateOrbit(0).negate() );
            this.updateCameraPosition();
            __camera.lookAt(lookat);
        }
        this.backToOrbit = function(){
            this.inAnimation = 2;
        }
        this.animationUpdateB = function(){
            //start by moving focus
            if(this.log(this.moveToShip)>=1){
                this.moveToShip-=0.1;
                var planetpos = new THREE.Vector3(0,0,0).multiplyScalar(1-this.log(this.moveToShip));
                var shipPos = new THREE.Vector3(0,0,0).copy(this.ship.position).multiplyScalar(this.log(this.moveToShip));

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
                        console.log('Movement Fin')
                        this.thi=0;
                        this.orbitPos=deg(90);
                        __scene.remove(this.ship);
                        __scene.remove(this.aliens);
                        this.change = true;
                        this.nextPage = 0;
                }
                lookat = this.threePlanet.position;
            }
            this.updateCameraPosition();
            __camera.lookAt(lookat);
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
