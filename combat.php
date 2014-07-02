<!DOCTYPE html>
<html>
<head>
<?php
include 'scripts/security.php';
include 'scripts/sql.php';
if(isset($_GET['win'])){
	if($_GET['win']=="true"){
		$result = mysqli_query($con,"SELECT * FROM ships,users WHERE users.FID=" . $_COOKIE['User'] . " AND users.CurrentShip=ships.ShipCode");
		while($row=mysqli_fetch_array($result)){
			$ship=$row;
		}
		mysqli_query($con,"UPDATE ships SET Helium = " . ($ship['Helium']+100) . " WHERE ShipCode = " . $ship['ShipCode']);
	}
}
?>
    <title>Introduction to Computer Graphics</title>  
 <!-- include javascript libraries -->
    <script src="js/three.js"></script>
	<script src="js/THREEx.KeyboardState.js"></script>	
	
    <script>
	var scene;
	 //declare a truly global variable to hold weather the user has just shot
	 var justshot=false;
	 //declare the score
	 var score=0;
	 //has the user won?
	 var won = false;
	 var frameRate = 1;
	 var frameCount = 0;
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
	function Movebullits(bullits){
	for(i=0;i<bullits.length;i++){
		UpdatePosition(bullits[i]);
	}
	}
	function timeCalculations(){
		frameRate = frameCount;
		frameCount = 0;
		document.getElementById('frame').innerHTML = "Frame Rate:" + frameRate + "fps";
	 	setTimeout("timeCalculations()",1000);
	}
	function MoveAlians(alian){
	//variable if they all need to change direction
	var change=false;
	for(x=0;x<alian.length;x++){
		for(z=0;z<alian[x].length;z++){
			alian[x][z].aBody.position.x+=alian[x][z].velocity.x;
			alian[x][z].aBody.position.y+=alian[x][z].velocity.y;
			alian[x][z].aBody.position.z+=alian[x][z].velocity.z;
			alian[x][z].aWing.position.x+=alian[x][z].velocity.x;
			alian[x][z].aWing.position.y+=alian[x][z].velocity.y;
			alian[x][z].aWing.position.z+=alian[x][z].velocity.z;
		if(alian[x][z].aBody.position.x>15 || alian[x][z].aBody.position.x<-15){
		change= true;
		}
		}
	}
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
	window.onload = function() {
	//define the roation of the camera
	var Crotation = 0.35;//20* in rad
	var pi = 3.1415926;
	var Arotation = pi/2;
	//define all bullits
	var bullit = new Array();
	//set difficulty
	var difficulty =0.001;
	//won?
	
	//set starting music
	//document.getElementById('pendulum').play()
		//define world
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth-5,  window.innerHeight-5);
        document.getElementsByTagName('div')[0].appendChild( renderer.domElement );
        scene = new THREE.Scene();
		//setup camera
        var camera = new THREE.PerspectiveCamera(
            35,             // Field of view
            800 / 600,      // Aspect ratio
            0.1,            // Near plane
            10000           // Far plane
        );
        
		camera.position.set( -50, -20, 0 );//inishiation of camera
        camera.lookAt( scene.position );
		var keyboard = new THREEx.KeyboardState();
		renderer.setClearColorHex( 0x000000, 1 );
		
		//setup lighting conditions
		var lightcolor =  0xFFFFFF
		var light = new THREE.PointLight( lightcolor );
        light.position.set( 0, 10, 0 );
		scene.add(light);
		/*var light1 = new THREE.PointLight( lightcolor );
        light1.position.set( 0, 0, -49 );
		scene.add(light1);
		var light2 = new THREE.PointLight( lightcolor );
        light2.position.set( 0, 0, 49 );
		scene.add(light2);
		var light3 = new THREE.PointLight( lightcolor );
        light3.position.set( 0, 49,0 );
		scene.add(light3);*/
		var light4 = new THREE.PointLight( lightcolor );
        light4.position.set( 0, 0,-10 );
		//Geometry of shapes-------------------------------------------------------------------------------------
		var IcosahedronGeometry = new THREE.TorusGeometry(2.5,0.1);
		var sphereGeometry2 = new THREE.IcosahedronGeometry(0.5,2);
        var cubeGeometry = new THREE.CubeGeometry(1,1,1)
        var aGeometry = new THREE.SphereGeometry(0.5,0);
        var aWingGeometry = new THREE.CylinderGeometry(0.5,1,0.5,20)
		var icosaMaterial = new THREE.MeshLambertMaterial('images/cockpit.gif' );
		var sphereMaterial2 = new THREE.MeshLambertMaterial({ color: 0x00FFFF });
		var crateTexture = new THREE.ImageUtils.loadTexture( 'images/cockpit.gif' );
		var sphereTexture = new THREE.MeshLambertMaterial( { color: 0xFF00FF });
		var cubeMaterial = new THREE.MeshLambertMaterial( { map:crateTexture } );
        var aMaterial = new THREE.MeshPhongMaterial({specular:'#ffcc00', color: '#FFFFFF', emissive: '#550000', shininess: 100});
        var aWingMaterial = new THREE.MeshPhongMaterial({specular:'#ffff00', color: '#FF0000', emissive: '#000000', shininess: 100})
		//End of geometory of shapes----------------------------------------------------------------------------

		var imagePrefix = "images/nebula-";
	var directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
	var imageSuffix = ".png";
	var skyGeometry = new THREE.CubeGeometry( 500, 500, 500 );	
	
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
	var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
	scene.add( skyBox );
		//MAKEING SPACECRAFT
		//spacephip components
		var body = new Object();
		body.Object =  new THREE.Mesh( cubeGeometry,cubeMaterial );
		body.Object.position.set(0,0,-5);
		scene.add(body.Object);
		body.asteroid = new Object();
		body.asteroid = new THREE.Mesh(IcosahedronGeometry,icosaMaterial );
		body.asteroid.position.set(0,0,-5);
		scene.add(body.asteroid);
		//create blue balls
		var angOfRot = 0;
        body.power= new Array();
        var ship_radius = 2.2;
        var angle = 0;
        
        for (i=0;i<6;i++){
                angle = i*pi/3;
                body.power[i]=new Object();
                body.power[i] = new THREE.Mesh(sphereGeometry2, sphereMaterial2);
                body.power[i].position.set(-0.1+ship_radius*Math.cos(angle),0.1+ship_radius*Math.sin(angle),-5);
                scene.add(body.power[i]);           
        }
		//make alians
		var alianTexture = new THREE.ImageUtils.loadTexture( 'images/crate.gif' );
		var alianMaterial = new THREE.MeshLambertMaterial( { map:alianTexture } );
		var alianGeometry = new THREE.SphereGeometry(1,1,1);
		var alians = new Array();
		for (x=0;x<10;x++){
			//X loop
			alians[x] = new Array()
			for(z=0;z<3;z++){
				//Z loop
//create the user defined types
				alians[x][z] = new Object();
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
  timeCalculations();
//runLoader();
function update() {
frameCount++;
ingameUpdate();
}//end function
//function to pan the camera for the first 5 seconds
function firstfive(){
camera.position.x+=0.1;
camera.lookAt( light4.position );
}
		//function for the in game mechanics
		function ingameUpdate(){
	//MOVEMENT CONTROLLS
			if(keyboard.pressed("left")){
			//check the object is in range
			if(body.Object.position.x>-10){
			body.Object.position.x-=0.1;
			body.asteroid.position.x-=0.1;
			for(i=0;i<6;i++){
			body.power[i].position.x-=0.1
			}
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
			camera.position.x=body.Object.position.x

			//rotate the pannet
			planet.rotation.y +=0.001;
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
				alert("You have died.");
				window.location.replace("orbit.php");
				}
				}
			}//end of I loop
			//GAME OVER!
			if(score==300){
			alert("winRa is you!");
			window.location.replace("combat.php?won=true");
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
<body>
<div style="position:absolute;top:0px;left:0px;z-index:3;">

</div>
<div style="position:absolute;top:0px;left:0px;z-index:4;">
<h1 id="scorecard" style="color:white;">Score:0</h1>
<input type="button" value="Music" id="button1" onclick="document.getElementById('pendulum').stop()" />
<a style="color:white;" id="frame">Frame Rate:60fps</a>
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
