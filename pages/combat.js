//battles class file
//scene-centric coordinates
 
{a = function (renderer,scene,camera,onready){
        //inherits from page class
        this.__proto__ = new Page();
        
        //class information
	this.name = "Combat";
	this.id = 5;
        
        //global THREE references
	this.renderer = renderer;
	this.scene = scene;
	this.camera = camera;
        
        //class variables
        //planet should adhear to JS-Planet standard
        this.planet = {"ID":"2","Name":"Venus","OrbitalRadius":"108200","InOrbitOf":"0","Temperature":"462","SurfaceGravity":"8.87","Radius":"6052","Map":{"IMG":"venus_img.jpg"}};
    
        this.eventHandlers =[];
        this.bullets = new BulletHandler(scene,5000);
        
        //Allegiances
        this.friendAllegiance = this.bullets.createAllegiance("Friend",0x0000FF,new THREE.Vector3(1,0,0),1000);
        this.foeAllegiance = this.bullets.createAllegiance("Foe",0xFF000,new THREE.Vector3(-1,0,0),0);
        
        this.dificulty = 0.001;
        this.Crotation = deg(-80);
        this.orbitPos = Math.PI/2;
        this.thi = 0;
        this.SPACING = 3;
        this.inAnimation=true;//false for testing only
        this.dead=false;
        this.moveToShip=0;
        
        
        //Finished loading variables
        this.ready = false;
        this.onready = onready;
        
        //page changing handshake
        this.change = false; //set to true if request page change.
        this.nextPage; //set to the id of the next page.

        
        
	//function to create page from nothing
	this.create = function(from){
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
        //function to construct the scene if nothing has yet been constructed.
        this.constructFirst = function(){
                //planet should already exist
		//lighting should already be set up
                //The sun should lready be there
                //temp set thi andorbitpos
                this.thi=deg(20);
                this.orbitPos=deg(180);
                //add spaceship
                this.ship = this.loadBasicLib();
                this.ship.position.copy(this.calculateOrbit(0));
                console.log(this.ship.position.y);
                this.scene.add(this.ship);
		//add aliens
                this.aliens = this.makeAlien();
                this.aliens.position.copy(this.calculateOrbit(0).add(new THREE.Vector3(20,0,0)));
                this.scene.add(this.aliens);
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
        this.makeAlien = function(){
            //group constants 
            var COLS=10;
            var ROWS=3 ;
            
            
            //Geometry of aliens
            var hullGeometry = new THREE.SphereGeometry(0.5,0);
            var wingGeometry = new THREE.CylinderGeometry(0.5,1,0.5,20);
            
            //materials of aliens
            //envirment map for reflections
            var mirrorWingCamera = new THREE.CubeCamera( 0.1, 10000000, 512 );
            var wingMaterial = new THREE.MeshPhongMaterial({specular:'#ffcc00', color: '#00FFFF', emissive: '#FF0000', shininess: 100 ,envMap: mirrorWingCamera.renderTarget,reflectivity:0.4});

            
            mirrorWingCamera.updateCubeMap(this.renderer,this.scene);
            var hullMaterial = new THREE.MeshPhongMaterial({specular:'#ffff00', color: '#FFFFFF', emissive: '#FFFFFF', shininess: 100, envMap: mirrorWingCamera.renderTarget,transparent:true,opacity:0.5,reflectivity:0.9})
            
            //make alian mesh's
            aBody = new THREE.Mesh(hullGeometry, hullMaterial);
            aWing = new THREE.Mesh(wingGeometry, wingMaterial);

            //create alien group (group of things that one alien is composed of)
            alienMesh = new THREE.Group();
            alienMesh.add(aBody);
            alienMesh.add(aWing);

            
            //create array of aliens
            var aliens = new THREE.Group();
            this.cube = mirrorWingCamera;
            for (x=0;x<COLS;x++){
                    //X loop
                    //aliens[x] = new Array()
                    for(z=0;z<ROWS;z++){
                            //Z loop
                            //create the user defined types
                            //aliens[x][z] = new Object();
                            //create the alian as a mesh object and set the apropreate properties
                            var alien = alienMesh.clone();
                            alien.position.set(this.SPACING*z,0,this.SPACING*x-10);
                            alien.velocity = new THREE.Vector3(0.01,0,0);
                            //add the alian to the scene
                            aliens.add(alien);
                    }
            }
            return aliens; 
        }
        this.loadBasicLib = function(){
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
        return spaceShip;
        }
        this.createUserInterface = function(){
            //health bar            
            htmlOverlay = '<div style="position:absolute; top:0px;right:0px;z-index:6;"><table id="health" style="background-color:green;height:30px;" width="250px"><tr><td id="healthTXT"></td></tr></table></div>';            
            //Info box telling the user to press space to start
            htmlOverlay += '<div id="infoBoxParent" style="position:absolute;top:250px;left:250px;z-index:5;width:300px;"><table style="background-color:black;color:white;"><tr><td id="infoBox"><h1>Press space to start</h1><a href="orbit.php"><input type="button" value="Back to orbit"  /></a></td></tr></table></div>';
            document.getElementById('overlay').innerHTML = htmlOverlay;
            document.getElementById('style').innerHTML = 'body{	background-color:black;	color:white;	font-size:80%;	}	.clickable:hover{	background-color:#0000A0;	color:#FFFFE0;	cursor:pointer; cursor:hand;	}';
            document.getElementById('infoBox').top = window.innerHeight/2-100;
            document.getElementById('infoBox').left = window.innerWidth/2-100;
            
            //add eventhandlers

        }
        
        //UPDATES (frame by frame)
        //function to update scene each frame
	this.update = function(){
            if(this.inAnimation){
                this.animationUpdate();
            }else{
                this.cube.updateCubeMap(this.renderer,scene);
                //Rotate the ship
                this.moveEntities();
                //GAME OVER!
                this.checkGameOver();
                //Update an alien wing camera
                this.alienAI();
                //this.updateCamera();
                //detect collisions
                //this.detectCollisions();
                this.bullets.checkCollision(this.aliens,1,1);
            }
        }
        //function to handle keyboard events
	this.keyboard= function(keyState){
            var offset = this.calculateOrbit(0);
            //need to check is game is active first
            //MOVEMENT CONTROLLS
            if(keyState.pressed("left")){
                //check the object is in range
                if(this.ship.position.z>-5*this.SPACING+offset.z){
                        this.ship.position.z-=0.1
                }
            }else if(keyState.pressed("right")){
                //check object is in range
                if(this.ship.position.z<5*this.SPACING+offset.z){
                        this.ship.position.z+=0.1
                }
            }
            //CAMERA MOVEMENT
            if(keyState.pressed("up")){
                this.Crotation+=0.01;
            }else if(keyState.pressed("down")){
                this.Crotation-=0.01;
            }
            this.updateCameraPosition();
            //get the camera to look at the spaceship
            this.camera.lookAt( this.ship.position);
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
                        mirrorWingCamera.updateCubeMap( renderer, scene );
                        for(x=0;x<alians.length;x++){
                            for(z=0;z<alians[x].length;z++){
                                alians[x][z].mesh.visible = true;
                            }
                        }
        }
        this.detectCollisions = function(){
            //check with spaceShip
            if(this.bullets.checkCollision(this.ship.position,3,this.friendAllegiance)){
                this.health--;
                //play sound
                
            }
            if(Collision(bullit[i].object.position,spaceShip.position,1) && health<5){
                document.getElementById('die').play()
                document.getElementById('infoBox').innerHTML = "<h1>You have lost too much shielding!</h1><p>Your commander has ordered you to retreat as you have lost too much sheilding. It is military policy that you cannot fight with your shielding bellow 5%</p><br /><a href='orbit.php'><input type='button' value='Back to orbit' /></a>";
                document.getElementById('infoBoxParent').hidden = false;
                start= false;
                dead=true;
            }
            if(Collision(bullit[i].object.position,spaceShip.position,1) && health!=0){
                health = health-5;
                document.getElementById('health').width=health*2.5 + "px";
                document.getElementById('healthTXT').innerHTML = health;
                //"GET","scripts/combat/hit.php"
                //check for collision with alien
                //loop through aliens 
                if(this.bullets.checkCollision(thisAlien,1,this.foeAllegiance)){
                    //explode alien
                    //play sound
                }
            }
        };
        this.checkGameOver = function(){
            if(this.score==300 && this.won==false){
                //won=true;
                document.getElementById('infoBox').innerHTML = "<h1>You have won!</h1><p>You have been rewareded 100 Helium for your efforts</p><br /><a href='combat.php?won=true'><input type='button' value='Back to orbit' /></a>";
                document.getElementById('infoBoxParent').hidden = false;
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
                if(Math.random()<difficulty){
                    //make new bullit
                    this.bullets.create(this.foeAllegiance,(new THREE.Vector3(0,0,0).add(this.aliens.children[x].position)).add(this.aliens.position));
                }
            }
        }
        this.moveAliens = function(){
            /*//variable if they all need to change direction
            var change=false;
            for(x=0;x<alian.length;x++){
                    for(z=0;z<alian[x].length;z++){
                            alian[x][z].mesh.position.add(alian[x][z].velocity);
                            //alian[x][z].camera.position = alian[x][z].mesh.position;
                    if(alian[x][z].mesh.position.z>7*spacing || alian[x][z].mesh.position.z<-7*spacing){
                    change= true;
                    }
                    }
            }
            //if they need to change direction change their direction
            if(change){
            for(x=0;x<alian.length;x++){
                    for(z=0;z<alian[x].length;z++){
                    alian[x][z].velocity.z = alian[x][z].velocity.z*-1;
                    }
            }
            }*/
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
                if(this.log(this.moveToShip)>1){
                    console.log('Movement Fin')
                    this.inAnimation = false;
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
            //update scene
            //this.threePlanet.position.copy( this.calculateOrbit(0).negate() );
            this.updateCameraPosition();
            this.camera.lookAt(lookat);
        }
        
        //CALCULATIONS
        //function to generate a reference to the planet in the scene so it can be moved
        this.findPlanet = function (){
            for(i=0;i<this.scene.children.length;i++){
                if(this.scene.children[i].name=="planet"){
                    this.threePlanet = this.scene.children[i];
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
            this.camera.position.copy(this.calculateOrbit(0).add(new THREE.Vector3(50* Math.sin(this.Crotation),50* Math.cos(this.Crotation),this.ship.position.z)));
        }
        this.log = function(x){
            return Math.log(x*Math.pow(10,17))/40;
        }
};
}
