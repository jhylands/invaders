<!DOCTYPE html>
<html>
<head>
    <title>Introduction to Computer Graphics</title>  
 <!-- include javascript libraries -->
    <script src="js/three.js"></script>
	<script src="js/THREEx.KeyboardState.js"></script>	
	
    <script>
	var production=0;
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
	function timeCalculations(){
		frameRate = frameCount;
		frameCount = 0;
		document.getElementById('frame').innerHTML = "Frame Rate:" + frameRate + "fps";
	 	setTimeout("timeCalculations()",1000);
	}

	window.onload = function() {
	//define the roation of the camera
	var Crotation = 0.35;//20* in rad
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
		var light4 = new THREE.PointLight( lightcolor );
        light4.position.set( 0, 0,-10 );
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
		//ADD PLANET
  var planetGeometry = new THREE.SphereGeometry(4,20,20); 
  
  //Load the planet textures
//  var texture = THREE.ImageUtils.loadTexture("https://s3-us-west-2.amazonaws.com/s.cdpn.io/96252/planet-512.jpg");
  var texture = THREE.ImageUtils.loadTexture("images/planet1.png");
  var normalmap = THREE.ImageUtils.loadTexture("images/planet1.png");
  var specmap = THREE.ImageUtils.loadTexture("images/planet1.png");
//  var normalmap = THREE.ImageUtils.loadTexture("https://s3-us-west-2.amazonaws.com/s.cdpn.io/96252/normal-map-512.jpg");
  //var specmap = THREE.ImageUtils.loadTexture("https://s3-us-west-2.amazonaws.com/s.cdpn.io/96252/water-map-512.jpg");

  var planetMaterial = new THREE.MeshPhongMaterial(); 
  planetMaterial.map = texture;
  
 // planetMaterial.specularMap = specmap;
  //planetMaterial.specular = new THREE.Color( 0xff0000 );
  planetMaterial.shininess = 1;
  
  //planetMaterial.normalMap = normalmap;
  //planetMaterial.normalScale.set(-0.3,-0.3);

  var planet = new THREE.Mesh(planetGeometry, planetMaterial); 
/*
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
*/
  planet.position.x = 0; 
  planet.position.y = -10; 
  planet.position.z = -40; 
 
  scene.add(planet); 
		production=1;
		var myVar=setInterval(function(){updateIntroTimer();},10000);
		function updateIntroTimer(){
		production++;
		if(production==2){
		camera.position.set( 50, 20, 0 );
		}else if(production==3){
		camera.position.set( 0, -10, -50 );
		}else if(production==5){
		camera.position.set( 0, -50, -10 );
		}
		}
		//runLoader();
		function update() {
			frameCount++;
			//MOVEMENT CONTROLLS
			//rotate the pannet
			planet.rotation.y +=0.001;
			//CAMERA MOVEMENT
			if(keyboard.pressed("up")){
				Crotation+=0.01;
			}else if(keyboard.pressed("down")){
				Crotation-=0.01;
			}
			if(keyboard.pressed("left")){
				camera.position.x -=1;
			}else if(keyboard.pressed("right")){
				camera.position.x +=1;
			}
			camera.position.y=50* Math.sin(Crotation);
			camera.position.z=50* Math.cos(Crotation);
			//get the camera to look at the spaceship
			camera.lookAt( planet.position);
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
<input type="button" value="Music" id="button1" onclick="document.getElementById('pendulum').play()" />
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
