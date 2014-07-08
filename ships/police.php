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
	function siran(){
		if(won){
			cube.material.color = new THREE.Color(0xFF0000);
			cube2.material.color = new THREE.Color(0x0000FF);
			won = false;
		}else{
			cube.material.color = new THREE.Color(0x0000FF);
			cube2.material.color = new THREE.Color(0xFF0000);
			won = true;
		}
	 	setTimeout("siran()",500);
	}
	window.onload = function() {
	//define the roation of the camera
	var Crotation = 0.35;//20* in rad
	var Crad = 50 //radius of the rotation of the camera
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
        light.position.set( 10, 10, 10 );
		scene.add(light);
		var light4 = new THREE.PointLight( lightcolor );
        light4.position.set( -10, -10,-10 );
		scene.add(light4);
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
	var policeData =[{x:0,y:0.6,z:1},{x:0,y:0.6,z:1},{x:0,y:0.6,z:1},{x:0,y:0.6,z:1},{x:0,y:0.6,z:1}];
	var cubeGeometry = new THREE.CubeGeometry(0.6,0.6,2);
	var cubeMaterial1 = new THREE.MeshPhongMaterial({color:0xFF0000,shininess:1});
	var cubeMaterial2 = new THREE.MeshPhongMaterial({color:0x0000FF});
	cube = new THREE.Mesh(cubeGeometry,cubeMaterial1);
	cube.position.y = 1.2;
	cube.position.z = 1;
	scene.add(cube);
	cube1 = new THREE.Mesh(cubeGeometry,cubeMaterial2);
	cube1.position.x = 1.2;
	cube1.position.z = 1;
	scene.add(cube1);
	cube2 = new THREE.Mesh(cubeGeometry,cubeMaterial2);
	cube2.position.x = -1.2;
	cube2.position.z = 1;
	scene.add(cube2);
	cube3 = new THREE.Mesh(cubeGeometry,cubeMaterial1);
	cube3.position.y = -1.2;
	cube3.position.z = 1;
	scene.add(cube3);
	var hubTexture = new THREE.ImageUtils.loadTexture('images/planet1.png');
	var hubMaterial = new THREE.MeshPhongMaterial({color:0xc0c0c0});
	var hub = new Array();
	for(i=0;i<3;i++){
		hub[i] = new THREE.Mesh(cubeGeometry,hubMaterial);
		hub[i].position.y = 0.6;
		hub[i].position.x = -0.6 + 0.6 * i;
		hub[i].position.z = 1;
		scene.add(hub[i]);
	}for(i=3;i<6;i++){
		hub[i] = new THREE.Mesh(cubeGeometry,hubMaterial);
		hub[i].position.y = -0.6;
		hub[i].position.x = -0.6 + 0.6 * (i-3);
		hub[i].position.z = 1;
		scene.add(hub[i]);
	}
	hub[7] = new THREE.Mesh(cubeGeometry,hubMaterial);
	hub[7].position.x = -0.6;
	hub[7].position.z = 1;
	scene.add(hub[7]);
	hub[8] = new THREE.Mesh(cubeGeometry,hubMaterial);
	hub[8].position.x = 0.6;
	hub[8].position.z = 1;
	scene.add(hub[8]);
	siran();
		//runLoader();
		function update() {
			//COUNT FPS
			frameCount++;
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
			}if(keyboard.pressed("q")){
				Crad -=0.1;
			}else if(keyboard.pressed("e")){
				Crad +=0.1;
			}
			camera.position.y=Crad* Math.sin(Crotation);
			camera.position.z=Crad* Math.cos(Crotation);
			//get the camera to look at the spaceship
			
			camera.lookAt(cube.position);
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
</body>
</html>
