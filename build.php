<!DOCTYPE html>
<html>
<head>
    <title>Introduction to Computer Graphics</title>  
 <!-- include javascript libraries -->
    <script src="js/three.js"></script>
	<script src="js/THREEx.KeyboardState.js"></script>	
<script src="js/jscolor.js"></script>
    <script>
	var objects;
	var scene;
	window.onload = function() {
	//define the roation of the camera
	var Crad =0;
	var Crotation = 0;
		//define world
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth-5,  window.innerHeight*0.6);
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

		//runLoader();
		function update() {
			
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
			var a = new THREE.Vector3(0,0,0);
			camera.lookAt(a);
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
function geometryChange(){
	var geo = document.getElementById('geometry').value;
	var optionBlx = document.getElementById('geometryOptions');
	switch(geo){
	case 'sphere':
		optionBlx.innerHTML = "Radius: <input id='radius' type='number' />";
		break;
	case 'cylinder':
		optionBlx.innerHTML = "Top radius:<input id='topRadius' type='number'/><br />Bottom radius: <input id='bottomRadius' type='number' /><br />Height: <input id='height' type='number' />";
		break;
	case 'cube':
		optionBlx.innerHTML = "Width:<input id='width' type='number' /><br />Height:<input type='number' id='height' /><br />Depth:<input id='depth' type='number' />";
		break;
	case 'plane':
		optionBlx.innerHTML = "Width:<input id='width' type='number' /><br />Height:<input id='height' type='number' />";
		break;
	}
}
function addObject(){
	//get object geometry
	switch(document.getElementById('geometry')){
	case 'sphere':
		var Geometry = new THREE.SphereGeometry(document.getElementById('radius').value);
		break;
	case 'cylinder':
		var Geometry = new THREE.CylinderGeometry(document.getElementById('topRadius').value,document.getElementById('bottomRadius').value,document.getElementById('height').value);
		break;
	case 'cube':
		var Geometry = new THREE.CubeGeometry(document.getElementById('width').value,document.getElementById('height').value,document.getElementById('depth').value);
		break;
	case 'plane':
		var Geometry = new THREE.PlaneGeometry(document.getElementById('width').value,document.getElementById('height').value);
		break;
	}
	if(document.getElementById('imageURL').value!=""){
		var Texture = new THREE.ImageUtils.loadTexture(document.getElementById('imageURL').value);
		var Material = new THREE.MeshPhongMaterial({map:Texture});
	}else{
		var Material = new THREE.MeshPhongMaterial({color:document.getElementById('color').value});
	}
	objects = new THREE.Mesh(Geometry,Material);
	scene.add(objects);
}
    </script>
</head>
<body>
<div style="position:absolute;top:0px;left:0px;z-index:3;">

</div>
<div style="position:absolute;top:60%;left:0px;z-index:4;">
<table><tr><td><form name="object">
<p>Geomtry:
<select id="geometry" onchange="geometryChange()">
	<option value="sphere">Sphere</option>
	<option value="cylinder">Cylinder</option>
	<option value="cube">Cube</option>
	<option value="plane">Plane</option>
</select>
</p><p id="geometryOptions"><input id="rad" type="number" length="70px" /></p>
<p>Image:<input id="imageURL" type="text" /> Color: <input id="color" class='color' value="#000000" /></p>
<p>Position: <input id="PX" type="number" /><input id="PY" type="number" /><input id="PZ" type="number" /></p><p>
 Rotation:<input id="RX" type="number" /><input id="RY" type="number" /><input id="RZ" type="number" /></p>
<input type="button" value="Add" onclick="addObject()" /></td>
<td><select id="elements" style="width:500px;"  multiple="multiple"></select><br />
<input type="button" value="Remove element" />
</td>
</tr>
</table>
</form>
</div>
</body>
</html>
