<!DOCTYPE html>
<html>
<head>
    <title>Introduction to Computer Graphics</title>  
<include type="style" />
 <!-- include javascript libraries -->
<script src="js/three.js"></script>
<script src="js/THREEx.KeyboardState.js"></script>
<include skyBox />
<script>
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
	//setup keyboard event handler
	var keyboard = new THREEx.KeyboardState();
	//SKYBOX
	scene.add( makeSkyBox );
	//Load first page
	//var page = new orbit(renderer,scene,camera);

	function update() {
		//keybinding
		page.keypress(keyboard);
		page.update();
		if(page.change()){
			//invoke page changing protocol
		}
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
