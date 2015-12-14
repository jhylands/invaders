<!DOCTYPE html>
<?php
include 'scripts/sql.php';
include 'scripts/security.php';
include 'scripts/shipInfo.php';
?>
<html>
<head>
    <title>Introduction to Computer Graphics</title>  
 <!-- include javascript libraries -->
    <script src="js/three.js"></script>
	<script src="js/THREEx.KeyboardState.js"></script>	
	
    <script>
	var camera;
	var scene;
	window.onload = function() {
	//define the roation of the camera
		//define world
	projector = new THREE.Projector();
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth-5,  window.innerHeight-5);
        document.getElementsByTagName('div')[0].appendChild( renderer.domElement );
        scene = new THREE.Scene();
		//setup camera
        camera = new THREE.PerspectiveCamera(
            35,             // Field of view
            800 / 600,      // Aspect ratio
            0.1,            // Near plane
            10000000           // Far plane
        );
        
		camera.position.set( -100, 20, 0 );//inishiation of camera
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
		scene.add(light);
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
	//ADDPLANET
	var planetGeometry = new THREE.SphereGeometry(60000,32,32);
        var planetTexture = new THREE.ImageUtils.loadTexture('images/earth.jpg');
	var planetMaterial = new THREE.MeshPhongMaterial({map:planetTexture});
	planet = new THREE.Mesh(planetGeometry,planetMaterial);
	planet.position.x =300000;
	planetMaterial.map.WrapS = THREE.RepeatWrapping;
	planetMaterial.map.WrapT = THREE.RepeatWrapping;
	scene.add(planet);
	//ADD spaceship
	var spaceShip = new THREE.Object3D();
	<?php echo $ship['BuildCode']; ?>
	spaceShip.position.x=10;
	spaceShip.rotation.z = Math.PI/2;
	scene.add(spaceShip);
		//runLoader();
		function update() {
			planet.rotation.y += 0.01;
			//get the camera to look at the spaceship
			var a = new THREE.Vector3(0,0,0);
			camera.lookAt(spaceShip.position);
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
<a style="color:white;" id="frame"></a>
</div>
</body>
</html>
