#
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
	var theta = 0;//20* in rad
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
            10000000          // Far plane
        );
        
		camera.position.set( 0, 0, -10 );//inishiation of camera
        camera.lookAt( scene.position );
		var keyboard = new THREEx.KeyboardState();
		renderer.setClearColorHex( 0x000000, 1 );
		
		//setup lighting conditions
		
		var light4 = new THREE.PointLight( 0xffffff );
        light4.position.set( 0, 10,0 );
		scene.add(light4);
//--------------------------------------------------------------------------------
//SKYBOX
	var imagePrefix = "images/nebula-";
	var directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
	var imageSuffix = ".png";
	var skyGeometry = new THREE.CubeGeometry( 5000000, 5000000, 5000000 );
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
//----------------------------------------------------------------------------------------

//SUN
	var lightcolor =  0xFFFFFF
		var light = new THREE.PointLight( lightcolor );
        light.position.set( -1000000, 10, -10 );
		scene.add(light);
	var sunGeometry = new THREE.SphereGeometry(69550,32,32);
	var sunTexture = new THREE.ImageUtils.loadTexture('images/sun.jpg');
	var sunMaterial = new THREE.MeshPhongMaterial({map:sunTexture});
	var sun = new THREE.Mesh(sunGeometry,sunMaterial);
	sun.position.x = -7000000;
	scene.add(sun);
//EARTH

	var earthGeometry = new THREE.SphereGeometry(63781,32,32);
	var earthTexture = new THREE.ImageUtils.loadTexture('images/earth.jpg');
	var earthMaterial = new THREE.MeshPhongMaterial({map:earthTexture});
	var earth = new THREE.Mesh(earthGeometry,earthMaterial);
	earth.position.x = 321640;
	scene.add(earth);
//------------------------------------------------------------------------------------------
//space station
	var spaceStation = new Object();
	spaceStation.cylinder = new Array();
	spaceStation.plane = new Array();
	spaceStation.position= new THREE.Vector3(0,0,0);
	spaceStation.Cposition = new THREE.Vector3(0,0,10);
	var planeTexture = new THREE.ImageUtils.loadTexture('images/panels.jpg');
	var planeMaterial = new THREE.MeshPhongMaterial({map:planeTexture});
	var planeGeometry = new THREE.PlaneGeometry(0.3,1);
	var nighty = Math.PI/2;
	var pannelData = [{x:-2.35,y:0,z:0.65,Rx:nighty,Ry:0,Rz:0},{x:-2.,y:0,z:0.65,Rx:nighty,Ry:0,Rz:0},{x:-1.65,y:0,z:0.65,Rx:nighty,Ry:0,Rz:0},{x:-1.3,y:0,z:0.65,Rx:nighty,Ry:0,Rz:0},{x:1.3,y:0,z:0.65,Rx:nighty,Ry:0,Rz:0},{x:1.65,y:0,z:0.65,Rx:nighty,Ry:0,Rz:0},{x:2,y:0,z:0.65,Rx:nighty,Ry:0,Rz:0},{x:2.35,y:0,z:0.65,Rx:nighty,Ry:0,Rz:0},{x:-2.35,y:0,z:-0.65,Rx:nighty,Ry:0,Rz:0},{x:-2.,y:0,z:-0.65,Rx:nighty,Ry:0,Rz:0},{x:-1.65,y:0,z:-0.65,Rx:nighty,Ry:0,Rz:0},{x:-1.3,y:0,z:-0.65,Rx:nighty,Ry:0,Rz:0},{x:1.3,y:0,z:-0.65,Rx:nighty,Ry:0,Rz:0},{x:1.65,y:0,z:-0.65,Rx:nighty,Ry:0,Rz:0},{x:2,y:0,z:-0.65,Rx:nighty,Ry:0,Rz:0},{x:2.35,y:0,z:-0.65,Rx:nighty,Ry:0,Rz:0},{x:0.65,y:0.5,z:0.85,Rx:nighty,Ry:0,Rz:nighty},{x:0.65,y:0.5,z:1.35,Rx:nighty,Ry:0,Rz:nighty},{x:-0.65,y:0.5,z:0.85,Rx:nighty,Ry:0,Rz:nighty},{x:-0.65,y:0.5,z:1.35,Rx:nighty,Ry:0,Rz:nighty}];
	for(i=0;i<pannelData.length;i++){
		spaceStation.plane[i] = new THREE.Mesh(planeGeometry,planeMaterial);
		spaceStation.plane[i].material.side = THREE.DoubleSide;
		spaceStation.plane[i].rotation.x = pannelData[i].Rx;
		spaceStation.plane[i].rotation.y = pannelData[i].Ry;
		spaceStation.plane[i].rotation.z = pannelData[i].Rz;
		spaceStation.plane[i].position.x = pannelData[i].x;// + spaceStation.x;
		spaceStation.plane[i].position.y = pannelData[i].y;// + spaceStation.y;
		spaceStation.plane[i].position.z = pannelData[i].z;// + spaceStation.z;
		scene.add(spaceStation.plane[i]);
	}
	var bodyData =[{x:-2,y:0,z:0,Rx:0,Ry:0,Rz:nighty},{x:-1,y:0,z:0,Rx:0,Ry:0,Rz:nighty},{x:0,y:0,z:0,Rx:0,Ry:0,Rz:nighty},{x:1,y:0,z:0,Rx:0,Ry:0,Rz:nighty},{x:2,y:0,z:0,Rx:0,Ry:0,Rz:nighty},{x:0,y:-0.5,z:0,Rx:0,Ry:0,Rz:0},{x:0,y:0,z:0,Rx:0,Ry:0,Rz:0},{x:0,y:0.5,z:0,Rx:0,Ry:0,Rz:0},{x:0,y:0.5,z:0,Rx:nighty,Ry:0,Rz:0},{x:0,y:0.5,z:1,Rx:nighty,Ry:0,Rz:0}];
	var cylinderTexture = new THREE.ImageUtils.loadTexture('images/shell.jpg');
	var cylinderMaterial = new THREE.MeshPhongMaterial({map:cylinderTexture,ambient:0xc0c0c0,specular:0xd0d0d0,shininess:1});
	var cylinderGeometry = new THREE.CylinderGeometry(0.15,0.15,1,32);
	for(i=0;i<bodyData.length;i++){
		spaceStation.cylinder[i] = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
		spaceStation.cylinder[i].rotation.x = bodyData[i].Rx;
		spaceStation.cylinder[i].rotation.y = bodyData[i].Ry;
		spaceStation.cylinder[i].rotation.z = bodyData[i].Rz;
		spaceStation.cylinder[i].position.x = bodyData[i].x;
		spaceStation.cylinder[i].position.y = bodyData[i].y;
		spaceStation.cylinder[i].position.z = bodyData[i].z;
		scene.add(spaceStation.cylinder[i]);
	}
//-------------------------------------------------------------------------------

		//runLoader();
		function update() {
			//COUNT FPS
			frameCount++;
			//PLANET ROTATION
			earth.rotation.y +=0.0001;
			//ORBIT
			spaceStation.position.x = 321640 - 321640* Math.cos(theta);
			spaceStation.position.z = 321640* Math.sin(theta);
			for(i=0;i<spaceStation.plane.length;i++){ 
				spaceStation.plane[i].position.x = pannelData[i].x + spaceStation.position.x;
				spaceStation.plane[i].position.y = pannelData[i].y + spaceStation.position.y;
				spaceStation.plane[i].position.z = pannelData[i].z + spaceStation.position.z;
			}
			for(i=0;i<spaceStation.cylinder.length;i++){
				spaceStation.cylinder[i].position.x = bodyData[i].x + spaceStation.position.x;
				spaceStation.cylinder[i].position.y = bodyData[i].y + spaceStation.position.y;
				spaceStation.cylinder[i].position.z = bodyData[i].z + spaceStation.position.z;
			}
			theta += 0.00001;
			//CAMERA MOVEMENT
			if(keyboard.pressed("up")){
				spaceStation.Cposition.y +=1;
			}else if(keyboard.pressed("down")){
				spaceStation.Cposition.y -=1;
			}
			if(keyboard.pressed("left")){
				spaceStation.Cposition.x -=1;
			}else if(keyboard.pressed("right")){
				spaceStation.Cposition.x +=1;
			}if(keyboard.pressed("q")){
				spaceStation.Cposition.z -=1;
			}else if(keyboard.pressed("e")){
				spaceStation.Cposition.z +=1;
			}
			var A = new THREE.Vector3(0,0,0);
			A.x=spaceStation.position.x + spaceStation.Cposition.x;
			A.y=spaceStation.position.y + spaceStation.Cposition.y;
			A.z=spaceStation.position.z + spaceStation.Cposition.z;
			//A.add(spaceStation.Cposition);
			light4.position = A;
			camera.position = A;
			document.getElementById('frame').innerHTML = "Camera(" + camera.position.x + "," + camera.position.y + "," + camera.position.z +")<br />SpaceStation:(" + spaceStation.position.x + "," + spaceStation.position.y + "," + spaceStation.position.z + ")";
			camera.lookAt(spaceStation.position);

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

//Shorter math functions
function s(x){ return Math.sin(x);}
function c(x){ return Math.cos(x);}
function addVectors(A,B){
	var responce = new THREE.Vector3(0,0,0);
	responce.x = A.x + b.x;
	responce.y = A.y + b.y;
	responce.z = A.z + b.z;
	return response;
}
function translate(Vector,x,y,z){
	//Vector are the coordinates to translate
	//x,y,z are the respective rotations
	p = Vector.x;
	q = Vector.y;
	r = Vector.z;
	var responce = new THREE.Vector3(0,0,0);
	responce.x = p*c(b)*c(c)+r*s(y)+q*c(y)*s(z);
	responce.y = r*c(y)*s(x)+p*(c(z)*s(x)*s(y)+c(x)*s(z))+q(c(x)*c(z)+s(x)*s(y)*s(z));
	responce.z = r*c(x)*c(y)+p*(c(x)*c(z)*s(y)+s(x)*s(z))+q(c(z)*s(x)+c(c)*s(y)*s(z));
	return response;
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
