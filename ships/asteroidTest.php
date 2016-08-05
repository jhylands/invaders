<!DOCTYPE html>
<html>
<head>
    <title>Introduction to Computer Graphics</title>  
 <!-- include javascript libraries -->
    <script src="../js/three(78).js"></script>
    <script src="../js/ColladaLoader.js"></script>
	<script src="../js/THREEx.KeyboardState.js"></script>	
	
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
         var obj;
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
		//renderer.setColorHex( 0x000000, 1 );
		
		//setup lighting conditions
		var lightcolor =  0xFFFFFF
		var light = new THREE.PointLight( lightcolor );
        light.position.set( 10, 10, 10 );
		scene.add(light);
		var light4 = new THREE.PointLight( lightcolor );
        light4.position.set( -10, -5,-10 );
		scene.add(light4);
	var imagePrefix = "../images/nebula-";
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
	scale=0.5
//SHIP---------------------------------------------------------------------------------------
	mirrorCubeCamera = new THREE.CubeCamera( 0.1, 321640, 512 );
        	scene.add( mirrorCubeCamera );
                	mirrorCubeCamera.position = new THREE.Vector3(0,0,0);
                        
                        // instantiate a loader
var loader = new THREE.ColladaLoader();

loader.load(
	// resource URL
	'asteroid2.dae',
	// Function when resource is loaded
	function ( collada ) {
            texture = new THREE.ImageUtils.loadTexture( "../images/asteroid.jpg" );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.x=2;
    texture.repeat.y=2;
    material = new THREE.MeshPhongMaterial( {
                                    color: 0xdddddd,
                                    specular: 0x222222,
                                    shininess: 0,
                                    map: texture,
                                    /*shading:THREE.FlatShading,*/
                                    bumpMap:texture,
                                    bumbScale:0.2});
            collada.scene.children[2].children[0].material = material;
		scene.add( collada.scene.children[2].children[0] );
	},
	// Function called when download progresses
	function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	}
);
/*var loader = new THREE.ObjectLoader();
loader.load("ship1.js",function ( geometry,materials ) {
    var obj = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ) );
	/*	var material = new THREE.MeshPhongMaterial( {
					color: 0xdddddd,
					specular: 0x222222,
					shininess: 35,
                                        envMap: mirrorCubeCamera.renderTarget,
					map: THREE.ImageUtils.loadTexture( "shell.jpg" ),
					normalMap: THREE.ImageUtils.loadTexture( "shell.jpg" ),
					normalScale: new THREE.Vector2( 0.8, 0.8 ),
                                        side: THREE.DoubleSide
				} );
     obj1.children[4].children[0].material = material;
     obj1.children[4].children[1].material = material;
     obj1.children[4].children[2].material = material;
     obj1.children[0].material = material;
     obj1.children[1].material = material;
     obj1.children[2].material = material;
     obj1.children[5].material = material;
     obj=obj1;
    /* spaceShip.add(obj.children[4]);
     spaceShip.add(obj.children[0]);
     spaceShip.add(obj.children[1]);
     spaceShip.add(obj.children[2]);
     spaceShip.add(obj.children[5]);
     scene.add( obj );
});*/
	//siran();
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
			
			camera.lookAt(new THREE.Vector3(0,0,0));
		}
	
		//Render Loop
		function render() {
			//Call the update function
			update();
                        /*obj.visible = false;
	mirrorCubeCamera.updateCubeMap( renderer, scene );
	obj.visible = true;*/
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
