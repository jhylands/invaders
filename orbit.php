<!DOCTYPE html>
<html>
<head>
    <title>Introduction to Computer Graphics</title>  
	<style id="style">
	body{
	background-color:black;
	color:white;
	font-size:80%;
	}
	.clickable:hover{
	background-color:#0000A0;
	color:#FFFFE0;
	cursor:pointer; cursor:hand;
	}
	</style>
 <!-- include javascript libraries -->
    <script src="js/three.js"></script>
	<script src="js/THREEx.KeyboardState.js"></script>	
<?php
include 'scripts/security.php';
include 'scripts/sql.php';
include 'scripts/shipInfo.php';
$ship = new ship($con,$ShipCode);
//echo $ship;
?>
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
        renderer.setSize( window.innerWidth,window.innerHeight);//4320,  window.innerHeight/window.innerWidth*4320);
        document.getElementsByTagName('div')[0].appendChild( renderer.domElement );
        scene = new THREE.Scene();
		//setup camera
        var camera = new THREE.PerspectiveCamera(
            35,             // Field of view
            (window.innerWidth-5)/(window.innerHeight-5),      // Aspect ratio
            0.1,            // Near plane
            10000000          // Far plane
        );
        
		camera.position.set( 0, 0, -10 );//inishiation of camera
        camera.lookAt( scene.position );
		var keyboard = new THREEx.KeyboardState();
		//renderer.setClearColorHex( 0x000000, 1 );
		
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
        light.position.set( -100000, 10, -10 );
		scene.add(light);
	var sunGeometry = new THREE.SphereGeometry(69550,32,32);
	var sunTexture = new THREE.ImageUtils.loadTexture('images/sun.jpg');
	var sunMaterial = new THREE.MeshPhongMaterial({map:sunTexture});
	var sun = new THREE.Mesh(sunGeometry,sunMaterial);
	sun.position.x = -7000000;
	scene.add(sun);
//EARTH

	var earthGeometry = new THREE.SphereGeometry(63781,32,32);
	var earthTexture = new THREE.ImageUtils.loadTexture('images/<?php echo $ship->place->URL; ?>');
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
	var group = new THREE.Object3D();
	spaceStation.Cposition = new THREE.Vector3(0,0,10);
	var planeTexture = new THREE.ImageUtils.loadTexture('images/panels.jpg');
	var planeMaterial = new THREE.MeshPhongMaterial({map:planeTexture});
	var planeGeometry = new THREE.PlaneGeometry(0.3,1);
	var nighty = Math.PI/2;
	var pannelData = [{position: new THREE.Vector3(-2.35,0,0.65), rotation : new THREE.Vector3(nighty,0,0)},
{position: new THREE.Vector3(-2.,0,0.65), rotation : new THREE.Vector3(nighty,0,0)},
{position: new THREE.Vector3(-1.65,0,0.65), rotation : new THREE.Vector3(nighty,0,0)},
{position: new THREE.Vector3(-1.3,0,0.65), rotation : new THREE.Vector3(nighty,0,0)},
{position: new THREE.Vector3(1.3,0,0.65), rotation : new THREE.Vector3(nighty,0,0)},
{position: new THREE.Vector3(1.65,0,0.65), rotation : new THREE.Vector3(nighty,0,0)},
{position: new THREE.Vector3(2,0,0.65), rotation : new THREE.Vector3(nighty,0,0)},
{position: new THREE.Vector3(2.35,0,0.65), rotation : new THREE.Vector3(nighty,0,0)},
{position: new THREE.Vector3(-2.35,0,-0.65), rotation : new THREE.Vector3(nighty,0,0)},
{position: new THREE.Vector3(-2.,0,-0.65), rotation : new THREE.Vector3(nighty,0,0)},
{position: new THREE.Vector3(-1.65,0,-0.65), rotation : new THREE.Vector3(nighty,0,0)},
{position: new THREE.Vector3(-1.3,0,-0.65), rotation : new THREE.Vector3(nighty,0,0)},
{position: new THREE.Vector3(1.3,0,-0.65), rotation : new THREE.Vector3(nighty,0,0)},
{position: new THREE.Vector3(1.65,0,-0.65), rotation : new THREE.Vector3(nighty,0,0)},
{position: new THREE.Vector3(2,0,-0.65), rotation : new THREE.Vector3(nighty,0,0)},
{position: new THREE.Vector3(2.35,0,-0.65), rotation : new THREE.Vector3(nighty,0,0)},
{position: new THREE.Vector3(0.65,0.5,0.85), rotation : new THREE.Vector3(nighty,0,nighty)},
{position: new THREE.Vector3(0.65,0.5,1.35), rotation : new THREE.Vector3(nighty,0,nighty)},
{position: new THREE.Vector3(-0.65,0.5,0.85), rotation : new THREE.Vector3(nighty,0,nighty)},
{position: new THREE.Vector3(-0.65,0.5,1.35), rotation : new THREE.Vector3(nighty,0,nighty)}];
	for(i=0;i<pannelData.length;i++){
		spaceStation.plane[i] = new THREE.Mesh(planeGeometry,planeMaterial);
		spaceStation.plane[i].material.side = THREE.DoubleSide;
		spaceStation.plane[i].rotation = pannelData[i].rotation;
		spaceStation.plane[i].position = pannelData[i].position;// + spaceStation.x;
		group.add(spaceStation.plane[i]);
	}
	var bodyData =[{position: new THREE.Vector3(-2,0,0), rotation: new THREE.Vector3(0,0,nighty)},
{position: new THREE.Vector3(-1,0,0), rotation: new THREE.Vector3(0,0,nighty)},
{position: new THREE.Vector3(0,0,0), rotation: new THREE.Vector3(0,0,nighty)},
{position: new THREE.Vector3(1,0,0), rotation: new THREE.Vector3(0,0,nighty)},
{position: new THREE.Vector3(2,0,0), rotation: new THREE.Vector3(0,0,nighty)},
{position: new THREE.Vector3(0,-0.5,0), rotation: new THREE.Vector3(0,0,0)},
{position: new THREE.Vector3(0,0,0), rotation: new THREE.Vector3(0,0,0)},
{position: new THREE.Vector3(0,0.5,0), rotation: new THREE.Vector3(0,0,0)},
{position: new THREE.Vector3(0,0.5,0), rotation: new THREE.Vector3(nighty,0,0)},
{position: new THREE.Vector3(0,0.5,1), rotation: new THREE.Vector3(nighty,0,0)}];
	var cylinderTexture = new THREE.ImageUtils.loadTexture('images/shell.jpg');
	var cylinderMaterial = new THREE.MeshPhongMaterial({map:cylinderTexture,ambient:0xc0c0c0,specular:0xd0d0d0,shininess:1});
	var cylinderGeometry = new THREE.CylinderGeometry(0.15,0.15,1,32);
	for(i=0;i<bodyData.length;i++){
		spaceStation.cylinder[i] = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
		spaceStation.cylinder[i].rotation = bodyData[i].rotation;
		spaceStation.cylinder[i].position = bodyData[i].position;
		group.add(spaceStation.cylinder[i]);
	}
	scene.add(group);
	group.rotation.y=0.6;
	group.rotation.z=0.6;
//-------------------------------------------------------------------------------

		//runLoader();
		function update() {
			//COUNT FPS
			frameCount++;
			//PLANET ROTATION
			earth.rotation.y +=0.0001;
			//ORBIT
			group.position.x = 321640 - 321640* Math.cos(theta);
			group.position.z = 321640* Math.sin(theta);
			/*for(i=0;i<spaceStation.plane.length;i++){ 
				spaceStation.plane[i].position =addVectors( pannelData[i].position, spaceStation.position);
			}
			for(i=0;i<spaceStation.cylinder.length;i++){
				spaceStation.cylinder[i].position = addVectors( bodyData[i].position, spaceStation.position);
			}*/
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
			A= addVectors(group.position,spaceStation.Cposition);
			//A.add(spaceStation.Cposition);
			camera.position = A;
			camera.lookAt(group.position);

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
   function addVectors(A,B){
	var response = new THREE.Vector3(0,0,0);
	response.x = A.x + B.x;
	response.y = A.y + B.y;
	response.z = A.z + B.z;
	return response;
}
    </script>
</head>
<body>
<div style="position:absolute;top:0px;left:0px;z-index:3;width:100%;height:100%;">

</div>
<div style="position:absolute;top:80%;width:100%;left:0px;z-index:5;">
<table style="width:100%;background-color:black;">
<tr>
    <td width="30%"><h2>Current ship: <?php echo $ship->getName();?></h2></td>
	<td rowspan='2' width="20%">
	<table style="width:100%;height:100%;">
	<tr>
		<td class="clickable" onclick="window.location.replace('solar.php');">Map</td>
		<td class="clickable" onclick="window.loaction.replace('cargo.php');">Cargo Bay</td>
	</tr>
	<tr>
		<td class="clickable" onclick="window.location.replace('trade.php');">Trade</td>
		<td class="clickable" onclick="window.location.replace('changeship.php');">Ship yard</td>
	</tr>
	<tr>
		<td class="clickable" onclick="window.location.replace('combat.php');">Fight for <?php echo $ship->place->Name; ?></td>
		<td class="clickable">Achievements</td>
	</tr>
	</table>
	</td>
	<td rowspan='2' ><h2>Current temperature on <?php echo $ship->place->Name;?> is <?php echo $ship->place->Temperature;?>&#8451</h2></td>
</tr>
<tr>
	<td class="clickable" onclick="window.location.replace('console.php');"><h2>Goto Console</h2></td>
</tr>
</table>
</div>

</body>
</html>
