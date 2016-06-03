//orbit class file
 
{a = function (renderer,scene,camera,onready){
        //inherits from page class
        this.__proto__ = new Page();
        
        //class information
	this.name = "Combat";
	this.id = 5;
        
        //global THREE references
	this.renderer = renderer;
	this.scene = scene;
	this.__camera = camera;
        
        //class variables
        this.eventHandlers =[];
        this.bullets = new BulletHandler(1000,5000);
        this.friendAllegiance = this.bullets.createAllegiance("Friend",0x0000FF,new THREE.Vector3(0,0,1));
        this.foeAllegiance = this.bullets.createAllegiance("Foe",0xFF000,new THREE.Vector3(0,0,-1));
        
        //Finished loading variables
        this.ready = false;
        this.onready = onready;
        
        //page changing handshake
        this.change = false; //set to true if request page change.
        this.nextPage; //set to the id of the next page.
        //planet should adhear to JS-Planet standard
        this.planet = {"ID":"2","Name":"Venus","OrbitalRadius":"108200","InOrbitOf":"0","Temperature":"462","SurfaceGravity":"8.87","Radius":6052,"Map":{"IMG":"venus_img.jpg"}};
    
        
        
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
                //add spaceship
                ship = this.loadBasicLib();
		//add aliens
                
                //create user interface
                this.createUserInterface();
        }
        
        this.createUserInterface = function(){
            //health bar            
            htmlOverlay = '<div style="position:absolute; top:0px;right:0px;z-index:6;"><table id="health" style="background-color:green;height:30px;" width="250px"><tr><td id="healthTXT"></td></tr></table></div>';            
            //Info box telling the user to press space to start
            htmlOverlay += '<div id="infoBoxParent" style="position:absolute;top:250px;left:250px;z-index:5;width:300px;"><table style="background-color:black;color:white;"><tr><td id="infoBox"><h1>Press space to start</h1><a href="orbit.php"><input type="button" value="Back to orbit"  /></a></td></tr></table></div>';
            document.getElementById('overlay').innerHTML = htmlOverlay;
            document.getElementById('style').innerHTML = 'body{	background-color:black;	color:white;	font-size:80%;	}	.clickable:hover{	background-color:#0000A0;	color:#FFFFE0;	cursor:pointer; cursor:hand;	}';
            
            //add eventhandlers

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

	
	//function to handle keyboard events
	this.keyboard= function(keyState){
            //need to check is game is active first
            //MOVEMENT CONTROLLS
            if(keyState.pressed("left")){
                //check the object is in range
                if(spaceShip.position.x>-5*spacing){
                        spaceShip.position.x-=0.1
                }
            }else if(keyState.pressed("right")){
                //check object is in range
                if(spaceShip.position.x<5*spacing){
                        spaceShip.position.x+=0.1
                }
            }
            camera.position.x=spaceShip.position.x;
            liberator.position = spaceShip.position;
            //CAMERA MOVEMENT
            if(keyState.pressed("up")){
            Crotation+=0.01;
            }else if(keyState.pressed("down")){
            Crotation-=0.01;
            }
            camera.position.y=50* Math.sin(Crotation);
            camera.position.z=50* Math.cos(Crotation);
            //get the camera to look at the spaceship
            camera.lookAt( spaceShip.position);
            //SHOOTING
            if(keyState.pressed("space")){
                this.bullets.create(this.friendAllegiance,spaceShip.position);
            }
	}
	
	//function to update scene each frame
	this.update = function(){
                //Rotate the ship
                this.moveEntities();
	}
        
        this.moveEntities = function(){
            this.moveBulits();
            this.moveAliens();
        }
        this.alienAI = function(){
            //alians shoot back
            for(x=0;x<alians.length;x++){
                for(z=0;z<alians[x].length;z++){
                    if(alians[x][z].shown == true){
                            moveSeed = Math.random();
                            if(moveSeed<0.1){
                                alians[x][z].velocity.y +=0.0001;
                            }else if (moveSeed<0.2){
                                alians[x][z].velocity.y -=0.0001;
                            }
                            alians[x][z].velocity.y += (-alians[x][z].mesh.position.y) / 1000;
                            if(Math.random()<difficulty){
                                //make new bullit
                                blength=bullit.length;
                                bullit[blength] = createBullit(alians[x][z].mesh.position,false);
                                scene.add(bullit[blength].object);
                        
                    }
                }
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
        this.makeAlien = function(){
            //group constants 
            var COLS=10;
            var ROWS=3 ;
            
            //Geometry of aliens
            var hullGeometry = new THREE.SphereGeometry(0.5,0);
            var wingGeometry = new THREE.CylinderGeometry(0.5,1,0.5,20);
            
            //materials of aliens
            var wingMaterial = new THREE.MeshPhongMaterial({specular:'#ffcc00', color: '#00FFFF', emissive: '#550000', shininess: 100 ,transparent:true,opacity:0.9});
            //envirment map for reflections
            mirrorWingCamera = new THREE.CubeCamera( 0.1, 10000000, 512 );
            var aWingMaterial = new THREE.MeshPhongMaterial({specular:'#ffff00', color: '#FFFFFF', emissive: '#FFFFFF', shininess: 100, envMap: mirrorWingCamera.renderTarget, transparent:true,opacity:0.6 })
            
            //make alian mesh's
            aBody = new THREE.Mesh(aGeometry, aMaterial);
            aWing = new THREE.Mesh(aWingGeometry, aWingMaterial);

            //create alien group (group of things that one alien is composed of)
            alienMesh = new THREE.Group();
            alienMesh.add(aBody);
            alienMesh.add(aWing);
            alienMesh.add(mirrorWingCamera);
            
            //create array of aliens
            var aliens = new Array();
            for (x=0;x<COLS;x++){
                    //X loop
                    aliens[x] = new Array()
                    for(z=0;z<ROWS;z++){
                            //Z loop
                            //create the user defined types
                            aliens[x][z] = new Object();
                            //create the alian as a mesh object and set the apropreate properties
                            aliens[x][z].mesh = alianMesh.clone();
                            aliens[x][z].mesh.position.set(spacing*x-10,0,spacing*z-30);
                            //add the alian to the scene
                            scene.add(aliens[x][z].mesh);
                            //give the alian some velocity or at least inishiate the variables
                            aliens[x][z].velocity = new THREE.Vector3(0.01,0,0);
                            //add a bool showing weather the object should be treated as being there or not
                            aliens[x][z].shown = true;
                    }
            }
            return aliens; //should aliens be a THREE.Group ?
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
	spaceShip = new THREE.Object3D()
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
	spaceShip.rotation.x=-Math.PI/2;
	spaceShip.rotation.z=Math.PI/2;
        return spaceShip;
        }
};
};
}
