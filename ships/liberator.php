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
//SHIP---------------------------------------------------------------------------------------
	var Geometry1 = new THREE.SphereGeometry(2,32,32);
	var Material1 = new THREE.MeshPhongMaterial({color:0x0000FF});
	var comp1 = new THREE.Mesh(Geometry1,Material1);
	comp1.position.x=-1;
	var Geometry2 = new THREE.CylinderGeometry(1,1,5,32);
	var Material2 = new THREE.MeshPhongMaterial({color:0xc0c0c0});
	var comp2 = new THREE.Mesh(Geometry2,Material2);
	comp2.position.x=3;
	comp2.rotation.z = Math.PI/2;
	var Geometry3 = new THREE.CylinderGeometry(0,1,2,32);
	var Material3 = new THREE.MeshPhongMaterial({color:0xc0c0c0});
	var comp3 = new THREE.Mesh(Geometry3,Material3);
	comp3.position.x=6;
	comp3.rotation.z=-Math.PI/2;
	var Geometry4 = new THREE.PlaneGeometry(5,1);
	var Material4 = new THREE.MeshPhongMaterial({color:0xc0c0c0,side:THREE.DoubleSide});
	var comp4 = new THREE.Mesh(Geometry4,Material4);
	comp4.rotation.z = Math.PI/4;
	comp4.position  = new THREE.Vector3(3,2,0);
	var Geometry5 = new THREE.CylinderGeometry(1,1,5,32);
	var Material5 = new THREE.MeshPhongMaterial({color:0xc0c0c0});
	var comp5 = new THREE.Mesh(Geometry5,Material5);
	comp5.position = new THREE.Vector3(3,4,0);
	comp5.rotation.z=-Math.PI/2;
	var Geometry6 = new THREE.CylinderGeometry(1,0,2,32);
	var Material6 = new THREE.MeshPhongMaterial({color:0xc0c0c0});
	var comp6 = new THREE.Mesh(Geometry6,Material6);
	comp6.position = new THREE.Vector3(6,4,0);
	comp6.rotation.z=Math.PI/2;
	var Geometry7 = new THREE.SphereGeometry(1,32,32);
	var Material7 = new THREE.MeshPhongMaterial({color:0xc0c0c0});
	var comp7 = new THREE.Mesh(Geometry7,Material7);
	comp7.position = new THREE.Vector3(0.5,4,0);
	var Geometry8 = new THREE.PlaneGeometry(5,1);
	var Material8 = new THREE.MeshPhongMaterial({color:0xc0c0c0,side:THREE.DoubleSide});
	var comp8 = new THREE.Mesh(Geometry8,Material8);
	comp8.rotation.z = -Math.PI/4;
	comp8.rotation.x = -Math.PI/4;
	comp8.position = new THREE.Vector3(3,-1.4,1.4);
	var Geometry9 = new THREE.PlaneGeometry(5,1,32,32);
	var Material9 = new THREE.MeshPhongMaterial({color:0xc0c0c0,side:THREE.DoubleSide});
	var comp9 = new THREE.Mesh(Geometry9,Material9);
	comp9.rotation.z = -Math.PI/4;
	comp9.rotation.x = Math.PI/4;
	comp9.position = new THREE.Vector3(3,-1.4,-1.4);
	var Geometry10 = new THREE.SphereGeometry(1,32,32);
	var Material10 = new THREE.MeshPhongMaterial({color:0xc0c0c0});
	var comp10 = new THREE.Mesh(Geometry10,Material10);
	comp10.position = new THREE.Vector3(0.5,-2.8,2.8);
	var Geometry11 = new THREE.SphereGeometry(1,32,32);
	var Material11 = new THREE.MeshPhongMaterial({color:0xc0c0c0});
	var comp11 = new THREE.Mesh(Geometry11,Material11);
	comp11.position = new THREE.Vector3(0.5,-2.8,-2.8);
	var Geometry12 = new THREE.CylinderGeometry(1,0,2,32);
	var Material12 = new THREE.MeshPhongMaterial({color:0xc0c0c0});
	var comp12 = new THREE.Mesh(Geometry12,Material12);
	comp12.position = new THREE.Vector3(6,-2.8,-2.8);
	comp12.rotation.z=Math.PI/2;
	var Geometry13 = new THREE.CylinderGeometry(1,0,2,32);
	var Material13 = new THREE.MeshPhongMaterial({color:0xc0c0c0});
	var comp13 = new THREE.Mesh(Geometry13,Material13);
	comp13.position = new THREE.Vector3(6,-2.8,2.8);
	comp13.rotation.z=Math.PI/2;

	var Geometry14 = new THREE.CylinderGeometry(1,1,5,32);
	var Material14 = new THREE.MeshPhongMaterial({color:0xc0c0c0});
	var comp14 = new THREE.Mesh(Geometry14,Material14);
	comp14.position = new THREE.Vector3(3,-2.8,2.8);
	comp14.rotation.z=-Math.PI/2;

	var Geometry15 = new THREE.CylinderGeometry(1,1,5,32);
	var Material15 = new THREE.MeshPhongMaterial({color:0xc0c0c0});
	var comp15 = new THREE.Mesh(Geometry15,Material15);
	comp15.position = new THREE.Vector3(3,-2.8,-2.8);
	comp15.rotation.z=-Math.PI/2;
	var spaceShip = new THREE.Object3D();
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
	spaceShip.rotation.y=Math.PI/2;
	scene.add(spaceShip);

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
			
			camera.lookAt(comp1.position);
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
