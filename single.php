<!DOCTYPE html>
<html>
<head>
    <title>Introduction to Computer Graphics</title>  
	<style>
	body{
	background-color:black;
	color:white;
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
function makeSkyBox(){
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
	return skyBox;
}
	window.onload = function() {
	//define world
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth,window.innerHeight);
        document.getElementsByTagName('div')[0].appendChild( renderer.domElement );
        scene = new THREE.Scene();
	//setup camera
        var camera = new THREE.PerspectiveCamera(
            35,             // Field of view
            (window.innerWidth)/(window.innerHeight),      // Aspect ratio
            0.1,            // Near plane
            10000000          // Far plane
        );
        
	camera.position.set( 0, 0, -10 );//inishiation of camera
        camera.lookAt( scene.position );
	//setup keyboard event handler
	var keyboard = new THREEx.KeyboardState();
	//add lighting
	//SKYBOX
	scene.add( makeSkyBox );
	function update() {
		//keybinding
		
		var A = new THREE.Vector3(0,0,0);
		A= addVectors(group.position,spaceStation.Cposition);
		camera.position = A;
		camera.lookAt(group.position);
	}

	//Render Loop
	function render() {
		//Call the update function
		update();
		//update cubecams
		//Re-draw the scene
		renderer.render(scene, camera);
		//Re-call the render function when the next frame is ready to be drawn
		requestAnimationFrame(render);
	}
	requestAnimationFrame(render);
    };
}
</script>
</head>
<body>
<div style="position:absolute;top:0px;left:0px;z-index:3;width:100%;height:100%;">

</div>
<div id="overlay" style="position:absolute;top:80%;width:100%;left:0px;z-index:5;">
</div>

</body>
</html>
