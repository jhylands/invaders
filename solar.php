<!DOCTYPE html>
<html>
<head>
    <title>Introduction to Computer Graphics</title>  
 <!-- include javascript libraries -->
    <script src="js/three.js"></script>
	<script src="js/THREEx.KeyboardState.js"></script>	
	
    <script>
	var camera;
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
	var Crad = 50 //radius of the rotation of the camera
		//define world
	projector = new THREE.Projector();
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth-5,  window.innerHeight-5);
        document.getElementsByTagName('div')[0].appendChild( renderer.domElement );
        scene = new THREE.Scene();
	document.addEventListener( 'mousedown', onDocumentMouseDown, false );

		//setup camera
        camera = new THREE.PerspectiveCamera(
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
		var light = new THREE.AmbientLight( lightcolor );
        light.position.set( 0, 10, 0 );
		scene.add(light);
		var light4 = new THREE.PointLight( lightcolor );
        light4.position.set( 0, 0,-10 );
		scene.add(light);
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
	var planetNames = new Array('sun.jpg','planet1.png','venus.jpg','earth.jpg','mars.jpg','moon.jpg');
	var planetPositions = new Object();
	planetPositions.x = new Array(-100,10,30,60,80,65);
	planetPositions.z = new Array(0,0,0,0,0,20);
	var planetSizes = new Array(20,3,4,5,3,1);
	var planet = new Array();
	for(i=0;i<planetNames.length;i++){
		planetGeometry = new THREE.SphereGeometry(planetSizes[i],32,32);
	        var planetTexture = new THREE.ImageUtils.loadTexture('images/' + planetNames[i]);
		var planetMaterial = new THREE.MeshPhongMaterial({map:planetTexture});
		planet[i] = new THREE.Mesh(planetGeometry,planetMaterial);
		planetMaterial.map.WrapS = THREE.RepeatWrapping;
		planetMaterial.map.WrapT = THREE.RepeatWrapping;
		planet[i].position.x = planetPositions.x[i];
		planet[i].position.z = planetPositions.z[i];
		planet[i].position.y=0;
		planet[i].name = planetNames[i];
		scene.add(planet[i]);
	}
	/*
	var planetTexture2 = new THREE.ImageUtils.loadTexture('images/venus.jpg');
	var planetGeometry2 = new THREE.SphereGeometry(4,32,32);
	var planetMaterial2 = new THREE.MeshPhongMaterial({map:planetTexture2});
	var planet2 = new THREE.Mesh(planetGeometry2,planetMaterial2);
	planetMaterial2.map.WrapS = THREE.RepeatWrapping;
	planetMaterial2.map.WrapT = THREE.RepeatWrapping;
	planet2.position.x=0;
	planet2.position.y=0;
	planet2.position.z=0;
	scene.add(planet2);
	var planetTexture3 = new THREE.ImageUtils.loadTexture('images/earth.jpg');
	var planetGeometry3 = new THREE.SphereGeometry(4,32,32);
	var planetMaterial3 = new THREE.MeshPhongMaterial({map:planetTexture3});
	var planet3 = new THREE.Mesh(planetGeometry3,planetMaterial3);
	planetMaterial3.map.WrapS = THREE.RepeatWrapping;
	planetMaterial3.map.WrapT = THREE.RepeatWrapping;
	planet3.position.x=10;
	planet3.position.y=0;
	planet3.position.z=0;
	scene.add(planet3);
	var planetTexture4 = new THREE.ImageUtils.loadTexture('images/planet1.png');
	var planetGeometry4 = new THREE.SphereGeometry(4,32,32);
	var planetMaterial4 = new THREE.MeshPhongMaterial({map:planetTexture4});
	var planet4 = new THREE.Mesh(planetGeometry4,planetMaterial4);
	planetMaterial4.map.WrapS = THREE.RepeatWrapping;
	planetMaterial4.map.WrapT = THREE.RepeatWrapping;
	planet4.position.x = 20;
	planet4.position.y=0;
	planet4.position.z=0;
	scene.add(planet4);
	var planetTexture5 = new THREE.ImageUtils.loadTexture('images/sun.jpg');
	var planetGeometry5 = new THREE.SphereGeometry(4,32,32);
	var planetMaterial5 = new THREE.MeshPhongMaterial({map:planetTexture5});
	var planet5 = new THREE.Mesh(planetGeometry5,planetMaterial5);
	planetMaterial5.map.WrapS = THREE.RepeatWrapping;
	planetMaterial5.map.WrapT = THREE.RepeatWrapping;
	planet5.position.x = -10;
	planet5.position.y=0;
	planet5.position.z=0;
	scene.add(planet5);*/
		//runLoader();
		function update() {
			//COUNT FPS
			frameCount++;
			//ROTATE PLANETS
			for(i=0;i<planetNames.length;i++){
				planet[i].rotation.y +=0.01/planetSizes[i];
			}
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
			camera.lookAt( planet[0].position);
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

			function onDocumentMouseDown( event ) {

				event.preventDefault();

				var vector = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
				projector.unprojectVector( vector, camera );

				var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

				var intersects = raycaster.intersectObjects( scene.children );

				if ( intersects.length > 0 ) {

					alert(intersects[ 0 ].object.name );

				}

			
			}
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
