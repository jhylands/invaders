<!DOCTYPE html>
<html>
<head>
    <title>Introduction to Computer Graphics</title>  
 <!-- include javascript libraries -->
    <script src="js/three.js"></script>
	<script src="js/THREEx.KeyboardState.js"></script>	
<script src="js/stats.js"> </script>
	
    <script>




	//variable to hold the stage of the intro video the program is in
	var production=0;
	//variable to hold the scene which is to be drawn
	var scene;
	 //declare a truly global variable to hold weather the user has just shot
	 var justshot=false;
	 //declare the score
	 var score=0;
	 //has the user won?
	 var won = false;
	//function to update the position of objects based on their velocity and position
	function UpdatePosition(asteroid){
	asteroid.object.position.x+=asteroid.velocity.x;
	asteroid.object.position.y+=asteroid.velocity.y;
	asteroid.object.position.z+=asteroid.velocity.z;
	}
	//Function to reverce the velocity if cirtai bounds are hit
	function BounceBox(asteroid){
	if(asteroid.object.position.x>6 || asteroid.position.x<-2){
			asteroid.velocity.x=asteroid.velocity.x*-1;
			}
			if(asteroid.object.position.y>4 || asteroid.object.position.y<-4){
			asteroid.velocity.y=asteroid.velocity.y*-1;
			}
			if(asteroid.object.position.z>-16 || asteroid.object.position.z<-40){
			asteroid.velocity.z=asteroid.velocity.z*-1;
			}
	}
	/*Collition detection function
	The method is to calculate the scalor distance between the objects. If this is less then needed for the objects to be considered colidend then the function returns true*/
	function Collision(position1,position2,r){
	//calculate the distancew the objects are appart and compare it to the distance their surfaces would be appart if they were only just touching
	//find differnces in position vector
	var dx=position1.x-position2.x;
	var dy=position1.y-position2.y;
	var dz=position1.z-position2.z;
	//sum of the squares
	var Exyz = Math.pow(dx,2) + Math.pow(dy,2) + Math.pow(dz,2);
	if(Math.sqrt(Exyz) < r){
	return true;
	}else{
	return false;
	}
	}
	/*Function to create the bullits for the game
	The main array of bulits hold all the bulits but each element its type and contnse is defined in this function.
	The bullits are given a color and velocity dependedent on their side (alian/human)*/
	function createBullit(position,GBD){
	//GBD is a bool true is the user false is alian
	//define the bullit variable
	var bullits = new Object();
	bullits.velocity = new Object();
	bullits.velocity.x=0;
	bullits.velocity.y=0;
	//get weather the bullit should be shown
	bullits.shown = true;
	//the z componet is defines after the if GBD
	var Geometry = new THREE.CylinderGeometry(0.1,0.1,1);
	if(!GBD){
	//set the bullits coming towards you
	bullits.velocity.z=1;
	//set the color
	var Material = new THREE.MeshLambertMaterial( { color:0xFF0000 } );
	//set them as alian
	bullits.own = false;
	}else{
	//set the bullits going away from you
	bullits.velocity.z=-1;
	//set the color
	var Material = new THREE.MeshLambertMaterial( { color:0x00FFFF } );
	bullits.own = true;
	}
	bullits.object = new THREE.Mesh( Geometry,Material );
	bullits.object.position.set(position.x,position.y,position.z+1);
	bullits.object.rotation.x=1.57079632679;
	//the object is not yet added
	return bullits;
	}
	//function to send each bullit from the array bullits to the UpdatePosition function to update their position
	function Movebullits(bullits){
	for(i=0;i<bullits.length;i++){
		UpdatePosition(bullits[i]);
	}
	}
	/*Function to move the alins and their compnent parts
	As a result of the alians being made of 2 parts their position is updated in a seperate function
	*/
	function MoveAlians(alian){
		//variable if they all need to change direction set false now to then be changed if needed
		var change=false;
		//using the array length allows for differet numbers of alians to be used
		for(x=0;x<alian.length;x++){
			for(z=0;z<alian[x].length;z++){
				//move the vector components of the body
				alian[x][z].aBody.position.x+=alian[x][z].velocity.x;
				alian[x][z].aBody.position.y+=alian[x][z].velocity.y;
				alian[x][z].aBody.position.z+=alian[x][z].velocity.z;
				//move the vector components of the wing
				alian[x][z].aWing.position.x+=alian[x][z].velocity.x;
				alian[x][z].aWing.position.y+=alian[x][z].velocity.y;
				alian[x][z].aWing.position.z+=alian[x][z].velocity.z;
				//Decide if the alians need to change directions
				if(alian[x][z].aBody.position.x>15 || alian[x][z].aBody.position.x<-15){
					change= true;//by default change=false;
				}//end if a change in direction is needed
			}//end for z
		}//end for x
		//if they need to change direction change their direction
		if(change){
			for(x=0;x<alian.length;x++){
				for(z=0;z<alian[x].length;z++){
				alian[x][z].velocity.x = alian[x][z].velocity.x*-1;
				}
			}
		}
	}//end of move alian function
	//function to toggle the justshot
	function Canshoot(){justshot=false;}
	//function called when the webpage is loaded
	window.onload = function() {
	//define the roation of the camera
	var Crotation = 0.35;//20* in rad
	//define PI for later use in converting degrees to radians
	var pi = 3.1415926;
	//define all bullits
	var bullit = new Array();
	//set difficulty
	var difficulty =0.001;
	//import the keyboard class so that key presses can be detected
	var keyboard = new THREEx.KeyboardState();
	//set starting music
	document.getElementById('pendulum').play()
	//DEFINE WORLD
	//import the three renderer class
	var renderer = new THREE.WebGLRenderer();
	//set the size of the game window to just less then the size of the browser window so it is as bif as posible without creating a scroll bar.
	renderer.setSize( window.innerWidth-5,  window.innerHeight-5);
	/*put the game window in the first div object of the body of the webpage
	This is done so that the score board and other overlayed information can be put ontop of the game window rather than above it*/
	document.getElementsByTagName('div')[0].appendChild( renderer.domElement );
	//import the scene class and inishiate the global variable scene
	scene = new THREE.Scene();
	/*setup camera
	angle wide 35, aspect ratio a normal sceen
	near plane (how close before its not dispayed 0.1 units)
	far plane (how far away before its not displayed 200 units)*/
	var camera = new THREE.PerspectiveCamera(
		35,             // Field of view
		800 / 600,      // Aspect ratio
		0.1,            // Near plane
		200           // Far plane
	);
	//inishiation of camera
	camera.position.set( -50, -20, 0 );
	//set the camera looking at the midle of the scene
	camera.lookAt( scene.position );
	//set the default background color of the scene (what color is displayed if there is nothing else there)
	renderer.setClearColorHex( 0x000000, 1 );
	//SET UP LIGHTING CONDITIONS
	//set the color for all the lights
	var lightcolor =  0xFFFFFF
	//Create light object
	var light = new THREE.PointLight( lightcolor );
	//set the position of the light in the scene
	light.position.set( 0, 0, 0 );
	//add the light to the scene so it has an effect next time the scene is drawn
	scene.add(light);
	var light1 = new THREE.PointLight( lightcolor );
	light1.position.set( 0, 0, -49 );
	scene.add(light1);
	var light2 = new THREE.PointLight( lightcolor );
	light2.position.set( 0, 0, 49 );
	scene.add(light2);
	var light3 = new THREE.PointLight( lightcolor );
	light3.position.set( 0, 49,0 );
	scene.add(light3);
	var light4 = new THREE.PointLight( lightcolor );
	light4.position.set( 0, 0,-10 );
        //ADD PLANET
  var planetGeometry = new THREE.SphereGeometry(4,20,20); 
  
  //Load the planet textures
  var texture = THREE.ImageUtils.loadTexture("https://s3-us-west-2.amazonaws.com/s.cdpn.io/96252/planet-512.jpg");
  var normalmap = THREE.ImageUtils.loadTexture("https://s3-us-west-2.amazonaws.com/s.cdpn.io/96252/normal-map-512.jpg");
  var specmap = THREE.ImageUtils.loadTexture("https://s3-us-west-2.amazonaws.com/s.cdpn.io/96252/water-map-512.jpg");

  var planetMaterial = new THREE.MeshPhongMaterial(); 
  planetMaterial.map = texture;
  
  planetMaterial.specularMap = specmap;
  planetMaterial.specular = new THREE.Color( 0xff0000 );
  planetMaterial.shininess = 1;
  
  planetMaterial.normalMap = normalmap;
  planetMaterial.normalScale.set(-0.3,-0.3);

  var planet = new THREE.Mesh(planetGeometry, planetMaterial); 

  //here we allow the texture/normal/specular maps to wrap
  planet.material.map.wrapS = THREE.RepeatWrapping; 
  planet.material.map.wrapT = THREE.RepeatWrapping;
  planet.material.normalMap.wrapS = THREE.RepeatWrapping; 
  planet.material.normalMap.wrapT = THREE.RepeatWrapping;
  planet.material.specularMap.wrapS = THREE.RepeatWrapping; 
  planet.material.specularMap.wrapT = THREE.RepeatWrapping;
 
  //here we repeat the texture/normal/specular maps twice along X
  planet.material.map.repeat.set( 2, 1);
  planet.material.normalMap.repeat.set( 2, 1);
  planet.material.specularMap.repeat.set( 2, 1);

  planet.position.x = 0; 
  planet.position.y = -10; 
  planet.position.z = -40; 
 
  scene.add(planet); 
	//GENERATE STAR BACKGROUND
// create the particle variables
var particleCount = 1800,
    particles = new THREE.Geometry(),
    pMaterial = new THREE.ParticleBasicMaterial({
      color: 0xFFFFFF,
      size: 20
    });

// now create the individual particles
for (var p = 0; p < particleCount; p++) {

  // create a particle with random
  // position values, -250 -> 250
  var pX = Math.random() * 500 - 250,
      pY = Math.random() * 500 - 250,
      pZ = Math.random() * 500 - 250,
      particle = new THREE.Vertex(
        new THREE.Vector3(pX, pY, pZ)
      );

  // add it to the geometry
  particles.vertices.push(particle);
}

// create the particle system
var particleSystem = new THREE.ParticleSystem(
    particles,
    pMaterial);

// add it to the scene
scene.addChild(particleSystem);
	//create a set of genertic shape geometorys and textures to create the other objects in the scene
	//Geometry of shapes-------------------------------------------------------------------------------------
	var IcosahedronGeometry = new THREE.TorusGeometry(2.5,0.1);
	var sphereGeometry2 = new THREE.IcosahedronGeometry(0.5,2);
	var cubeGeometry = new THREE.CubeGeometry(1,1,1)
	var aGeometry = new THREE.SphereGeometry(0.5,0);
	var aWingGeometry = new THREE.CylinderGeometry(0.5,1,0.5)
	var icosaMaterial = new THREE.MeshLambertMaterial('images/cockpit.gif' );
	var sphereMaterial2 = new THREE.MeshLambertMaterial({ color: 0x00FFFF });
	var crateTexture = new THREE.ImageUtils.loadTexture( 'cockpit.gif' );
	var sphereTexture = new THREE.MeshLambertMaterial( { color: 0xFF00FF });
	var cubeMaterial = new THREE.MeshLambertMaterial( { map:crateTexture } );
	var aMaterial = new THREE.MeshLambertMaterial('images/alien_body.gif');
	var aWingMaterial = new THREE.MeshPhongMaterial({color: 0xFF0000, shininess: 90, })
	//End of geometory of shapes----------------------------------------------------------------------------
	
	//MAKEING SPACECRAFT
	//spacephip components
	/*The spaceships main name is "body" "body" is an object that contains all the other aspects of the spaceship
	body.object is the cokpit of the spaceship (The central core) body.asteroid is the silver mesh that seems to hold the blue spheres in place. body.power is an array containing the blue balls. Each of the body. objects are meshes except power which is an array of meshes. */
	var body = new Object();
	//create cockpit
	body.Object =  new THREE.Mesh( cubeGeometry,cubeMaterial );
	body.Object.position.set(0,0,-5);
	scene.add(body.Object);
	//create metal structure
	body.asteroid = new Object();
	body.asteroid = new THREE.Mesh(IcosahedronGeometry,icosaMaterial );
	body.asteroid.position.set(0,0,-5);
	scene.add(body.asteroid);
	/*create blue balls 
	the position of the blue balls follow a similar algorithm to the planes in the background as in their position is defines by an angle about the horazontal where the change in X is Cos(theta) and the chnge in Y is Sin(theta) */
	//inishiate the angle of rotation for the blue balls (This is used to animate them later on)
	var angOfRot = 0;
	//create the array of balls
	body.power= new Array();
	//set the radius of the circle upon which the balls lie
	var ship_radius = 2.2;
	//inishiate the angle variable to create the blue balls
	var angle = 0;
	//loop throught the creation of each of the balls
	for (i=0;i<6;i++){
			//increase the angle by 30* each tern
			angle = i*pi/3;
			//inishiate the element of the array
			body.power[i]=new Object();
			//assign the balls mesh
			body.power[i] = new THREE.Mesh(sphereGeometry2, sphereMaterial2);
			//position the ball around the core of the spacecraft
			body.power[i].position.set(-0.1+ship_radius*Math.cos(angle),0.1+ship_radius*Math.sin(angle),-5);
			//add the ball to the scene
			scene.add(body.power[i]);           
	}//end the creation of the balls
	//end of creating the spaceship
	//make alians-----------------------------------------------------------------------------------
	//define the array of alians
	var alians = new Array();
	//loop through the creation of the alians row by row colomn by colomn
	for (x=0;x<10;x++){
		//X loop
		alians[x] = new Array()
		for(z=0;z<3;z++){
			//Z loop
			//create the user defined types
			alians[x][z] = new Object();
			//create the alian as a mesh object and set the apropreate properties
			alians[x][z].aBody = new THREE.Mesh(aGeometry, aMaterial);
			alians[x][z].aBody.position.set(2*x-10,0,2*z-30);
			alians[x][z].aWing = new THREE.Mesh(aWingGeometry, aWingMaterial);
			alians[x][z].aWing.position.set(2*x-10,0,2*z-30);
			//add the alian to the scene
			scene.add(alians[x][z].aBody);
			scene.add(alians[x][z].aWing);
			//give the alian some velocity or at least inishiate the variables
			alians[x][z].velocity = new Object()
			alians[x][z].velocity.x=0.01;
			alians[x][z].velocity.y=0;
			alians[x][z].velocity.z=0;
			//add a bool showing weather the object should be treated as being there or not
			alians[x][z].shown = true;
		}
	}
	//finished creating alians
	//start the cinimatic indroduction scene by setting the production variable to 1
	production=1;
	//set the timmer to time the cinimatic production
	var myVar=setInterval(function(){updateIntroTimer();},10000);
	//Timmer to run movement at a constant speed regardless of the speed of the computer
	var setspeed=setInterval(function(){ifInGameUpdate();},200);
	//function to be run when the timmer ticks
	function updateIntroTimer(){
	//Increse the production variable to get aq new view of the action
	production++;
	//Update the position of the camera bassed on the production state
	//this should use a case statement but I have no internet currently!!!!!!!!!
	if(production==2){
	camera.position.set( 50, 20, 0 );
	}else if(production==3){
	camera.position.set( 0, -10, -50 );
	}else if(production==5){
	camera.position.set( 0, -50, -10 );
	}
	}
	//run the code that needs to be run just before the visual effects are updated
	function update() {
		//allow the user to skip the introduction
		if(keyboard.pressed("space")){
		production=6;
		}
		//run the scene as apropreate to the state of production
		if(production==1){
			camera.position.x+=0.1;
			camera.lookAt( light4.position );
		}else if(production==2){
			camera.position.x-=0.1;
			camera.lookAt( light4.position );
		}else if(production<5){
			camera.position.y+=0.1;
			camera.lookAt( light4.position );
		}else if(production==5){
			camera.position.y+=0.1;
			camera.lookAt( light4.position );
		}else{
			//run the code that needs to be run  before the game (taken out so game speed is normalised across prossesor speeds)
			//ingameUpdate();
		}
	}//end Update
	//function to stop the update running before the movie effects have finished
	function ifInGameUpdate(){
		if(production>5){
			ingameUpdate();
		}
	}
	//function for the in game mechanics
	function ingameUpdate(){
                //planet.rotate.x += 0.02;
		//MOVEMENT CONTROLLS
		if(keyboard.pressed("left")){
		//check the object is in range
		if(body.Object.position.x>-10){
		body.Object.position.x-=0.1;
		body.asteroid.position.x-=0.1;
		for(i=0;i<6;i++){
		body.power[i].position.x-=0.1
		}
		camera.position.x=body.Object.position.x
		}
		}else if(keyboard.pressed("right")){
		//check object is in range
		if(body.Object.position.x<10){
		body.Object.position.x+=0.1;
		body.asteroid.position.x+=0.1;
		for(i=0;i<6;i++){
		body.power[i].position.x+=0.1
		}
		camera.position.x+=0.1;
		}
		}
		//ANIMATE THE SHIP
		angOfRot+=0.01;
		for (i=0;i<6;i++){
			angle = i*pi/3;
			body.power[i].position.set(body.Object.position.x-0.1+ship_radius*Math.cos(angle+angOfRot),body.Object.position.y+0.1+ship_radius*Math.sin(angle+angOfRot),-5);  
		}
		body.asteroid.rotation.z = angOfRot;
		body.Object.rotation.x+=0.01;
		body.Object.rotation.y+=0.01;
		body.Object.rotation.z+=0.01;
		//CAMERA MOVEMENT
		if(keyboard.pressed("up")){
		Crotation+=0.01;
		}else if(keyboard.pressed("down")){
		Crotation-=0.01;
		}
		camera.position.y=50* Math.sin(Crotation);
		camera.position.z=50* Math.cos(Crotation);
		//get the camera to look at the spaceship
		camera.lookAt( body.Object.position);
		//BULLITS
		//add a bullit when the user presses space
		//define bulit length outsideof if pressed space so alians can shoot
		var blength=bullit.length;
		if(keyboard.pressed("space")){
		if(justshot==false){
		//make new bullit
		bullit[blength] = createBullit(body.Object.position,true);
		scene.add(bullit[blength].object);
		//stop bullits being produced too quickly
		justshot=true;
		document.getElementById('laser').play()
		setTimeout("Canshoot()",1000);
		}
		}
		//move the bullits falward
		Movebullits(bullit);
		//ALIANS
		MoveAlians(alians);
		//alians shoot back
		for(x=0;x<alians.length;x++){
		for(z=0;z<alians[x].length;z++){
		if(alians[x][z].shown == true){
		if(Math.random()<difficulty){
		//make new bullit
		blength=bullit.length;
		bullit[blength] = createBullit(alians[x][z].aBody.position,false);
		scene.add(bullit[blength].object);
		}
		}
		}
		}
		
		
		//COLLITIONS
		for(i=0;i<bullit.length;i++){
			//loop the bullits
			if(bullit[i].own){
			//bullit alian collitions
			for(x=0;x<alians.length;x++){
				//X loop alians
				for(z=0;z<alians[x].length;z++){
				//Y loop alians
				//if both objects are actually there
				if(bullit[i].shown && alians[x][z].shown){
				//I'm guessing the sum of the radi is about 2
				if(Collision(bullit[i].object.position,alians[x][z].aBody.position,1)){
				//the objects have collided
				scene.remove(bullit[i].object);
				bullit[i].shown = false;
				scene.remove(alians[x][z].aBody);
				scene.remove(alians[x][z].aWing);
				alians[x][z].shown = false;
				score+=10;
				document.getElementById('hit').play()
				document.getElementById("scorecard").innerHTML = "Score: " + score;
				won=false;
				}//End of if collided
				}//end of if there
				}//end of Z loop
			}//end of X loop
			}else{
			//bullit human collisions
			if(Collision(bullit[i].object.position,body.Object.position,1)){
			document.getElementById('die').play()
			alert("You have died, it was a bold effort. Score: " + score);
			window.location.replace("index.html");
			}
			}
		}//end of I loop
		//GAME OVER!
		if(score%300==0 && won == false && score!=0){
		alert("winRa is you!");
		for (x=0;x<10;x++){
		//X loop
		for(z=0;z<3;z++){
		alians[x][z].aBody.position.set(2*x-10,0,2*z-30);
		alians[x][z].aWing.position.set(2*x-10,0,2*z-30);
		scene.add(alians[x][z].aBody);
		scene.add(alians[x][z].aWing);
		alians[x][z].shown = true;
		}}
		//increase difficulty
		difficulty= difficulty*2;
		won=true;
		}
}

	//Render Loop
	function render() {

		//Call the update function
		update();
		//Re-draw the scene
		renderer.render(scene, camera);
		//Re-call the render function when the next frame is ready to be drawn
		requestAnimationFrame(render);
    
	}
	requestAnimationFrame(render);

};
    </script>
</head>
</head>
<body>
<div style="position:absolute;top:0px;left:0px;z-index:3;">
</div>
<div style="position:absolute;top:0px;left:0px;z-index:4;">
<h1 id="scorecard" style="color:white;">Score:0</h1>
<input type="button" value="Music" id="button1" onclick="document.getElementById('pendulum').play()" />
</div>
<audio id=laser>
    <source src="http://headstart.cs.aston.ac.uk/projects/2013_July/team5/sound/laserSHORT.wav">
</audio>
<audio id=hit>
    <source src="http://headstart.cs.aston.ac.uk/projects/2013_July/team5/sound/hit.wav">
</audio>
<audio id=die>
    <source src="http://headstart.cs.aston.ac.uk/projects/2013_July/team5/sound/dying.wav">
</audio>
<audio id=pendulum>
    <source src="http://headstart.cs.aston.ac.uk/projects/2013_July/team5/sound/slam.mp3">
</audio>
</body>
</html>
		
