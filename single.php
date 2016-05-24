<html>
<head>
    <title>Introduction to Computer Graphics</title>
 <!-- include javascript libraries -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
<script src="js/three.js"></script>
<script src="js/THREEx.KeyboardState.js"></script>
<script src="js/planetMaker.js"></script>
<script src="js/skyBox.js"></script>
<script>
//inishiate page globals
var render;
//create page file
var pages = [];

function loadPage(pageName,pageID,renderer,scene,camera){
  if(pages[pageID]==null){
    //page fault  
  	$.ajax({url:"pages/" + pageName, success: function (data){ 
  		//evaluate the class object to create the class from the text
  		temp=eval(data);
  		//create an instance of the class
  		pages[pageID]= new temp(renderer,scene,camera);
  		//there needs to be an onclass ready here
  		page = pages[pageID];
  		if(pageID==0){
  			//first page loaded start rendering
  			requestAnimationFrame(render);
  		}
  		}});
  }else{
    //reconstruct page
    
    //load page in
    page = pages[pageID];
  }
  
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
	//setup keyboard event handler
	var keyboard = new THREEx.KeyboardState();
	//SKYBOX
	scene.add( makeSkyBox() );
  //define the update function 
	function update() {
		//keybinding
		page.keyboard(keyboard);
		page.update();
		if(page.change()){
			//invoke page changing protocol
		}
	}

	//define the Render Loop
	render = function() {
		//Call the update function
	 	update();
		//Re-draw the scene
		renderer.render(scene, camera);
		//Re-call the render function when the next frame is ready to be drawn
		requestAnimationFrame(render);
	}
	
	//import the page
	loadPage("orbit.js",0,renderer,scene,camera);
};
</script>
</head>
<body>
<div style="position:absolute;top:0px;left:0px;z-index:3;width:100%;height:100%;">

</div>
<div id="overlay" style="position:absolute;top:80%;width:100%;left:0px;z-index:5;">
</div>

</body>
</html>
