#
<!DOCTYPE html>
<html>
<head>
    <title>Introduction to Computer Graphics</title>  
 <!-- include javascript libraries -->
    <script src="js/three.js"></script>
	<script src="js/THREEx.KeyboardState.js"></script>	
	
    <script>
	var scene1;
	window.onload = function() {
	//define the roation of the camera
		//define world
        var renderer1 = new THREE.WebGLRenderer();
        var renderer2 = new THREE.WebGLRenderer();
        renderer1.setSize( window.innerWidth-5,  window.innerHeight-5);
        renderer2.setSize( window.innerWidth-5,  window.innerHeight-5);
        document.getElementsByTagName('div')[0].appendChild( renderer1.domElement );
        document.getElementsByTagName('div')[1].appendChild( renderer2.domElement );
        scene1 = new THREE.Scene();
        scene2 = new THREE.Scene();
		//setup camera
        var camera1 = new THREE.PerspectiveCamera(
            35,             // Field of view
            800 / 600,      // Aspect ratio
            0.1,            // Near plane
            10000000          // Far plane
        );var camera2 = new THREE.PerspectiveCamera(
            35,             // Field of view
            800 / 600,      // Aspect ratio
            0.1,            // Near plane
            10000000          // Far plane
        );
        
		camera1.position.set( 0, 0, -10 );//inishiation of camera
		camera2.position.set( 0, 0, -10 );//inishiation of camera
        camera1.lookAt( scene1.position );
        camera2.lookAt( scene2.position );
		renderer1.setClearColorHex( 0x000000, 1 );
		renderer2.setClearColorHex( 0x000000, 1 );
		
		//setup lighting conditions
		
		var light4 = new THREE.PointLight( 0xffffff );
        light4.position.set( 0, 10,0 );
		scene1.add(light4);
		scene2.add(light4);
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
	scene1.add( skyBox );
	scene2.add( skyBox );
//----------------------------------------------------------------------------------------
//EARTH

	var earthGeometry = new THREE.SphereGeometry(4,32,32);
	var earthTexture = new THREE.ImageUtils.loadTexture('images/earth.jpg');
	var earthMaterial = new THREE.MeshPhongMaterial({map:earthTexture});
	var earth = new THREE.Mesh(earthGeometry,earthMaterial);
	scene1.add(earth);
	var earth2Geometry = new THREE.SphereGeometry(4,32,32);
	var earth2Texture = new THREE.ImageUtils.loadTexture('images/mars.jpg');
	var earth2Material = new THREE.MeshPhongMaterial({map:earthTexture});
	var earth2 = new THREE.Mesh(earthGeometry,earthMaterial);
	scene2.add(earth2);
//------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------

		//runLoader();
		function update() {
			//PLANET ROTATION
			earth.rotation.y +=0.0001;
			//ORBIT
			camera.lookAt(group.position);

		}
	
		//Render Loop
		function render() {
			//Call the update function
			update();
			//Re-draw the scene
			renderer.render(scene1, camera1);
			renderer.render(scene2, camera2);
			//Re-call the render function when the next frame is ready to be drawn
			requestAnimationFrame(render1);
			requestAnimationFrame(render2);
		}
		requestAnimationFrame(render1);
		requestAnimationFrame(render2);

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
<div style="position:absolute;top:0px;left:0px;z-index:3;">

</div>
<div style="position:absolute;top:0px;left:0px;z-index:4;">
<h1 id="scorecard" style="color:white;">Score:0</h1>
<input type="button" value="Music" id="button1" onclick="document.getElementById('pendulum').play()" />
<a style="color:white;" id="frame">Frame Rate:60fps</a>
</div>
</body>
</html>
