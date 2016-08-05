<html>
<head>
<?php
    //check that the user has logged in
    if(!isset($_COOKIE['User'])){
        echo "<script>window.location.replace('login.php');</script>";
    }
    include 'scripts/sql.php';
    include 'scripts/shipInfo.php';

    $ship = new Ship($con,$ShipCode);
?>
    <title>Introduction to Computer Graphics</title>
    <style id="style"></style>
 <!-- include javascript libraries -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
<script src="js/three(73).js"></script>
<script src="js/THREEx.KeyboardState.js"></script>
<script src="js/jsInclude.php"></script>
<script src="js/ColladaLoader.js"></script>
<script>
    //DATA definitions
    //list of page urls, indexed by id
    var onPageReady = function(pageID){
                    page = pages[pageID];
                    if(pageID==0){
                            //first page loaded start rendering
                            requestAnimationFrame(render);
                    }
                }; 
    //need an asset manager
    //need a method for updating information about where the user is
    var place = <?php echo $ship->place->__toString(); ?>;
</script>
<script>
//inishiate page globals
var render;
var __renderer;
var __scene;
var __camera;

//create page file
var pages = [];
var timerSet=false;

function deg(angle){ return angle*2*Math.PI/360;}

function loadPage(toPageID,fromPageID){
    pages[toPageID].create(fromPageID);
}


window.onload = function() {
        pages = [new conOrbit(),new conMap,new conCargo(),new conTrade(),new conShipYard(), new conCombat(),new conAchivement(),new conConsole()];
	//define world
        __renderer = new THREE.WebGLRenderer();
        __renderer.setSize( window.innerWidth,window.innerHeight);
        document.getElementsByTagName('div')[0].appendChild( __renderer.domElement );
        __scene = new THREE.Scene();
	//setup __camera
        __camera = new THREE.PerspectiveCamera(
            35,             // Field of view
            (window.innerWidth)/(window.innerHeight),      // Aspect ratio
            0.1,            // Near plane
            10000000          // Far plane
        );
        __scene.add(__camera);
	//setup keyboard event handler
	var keyboard = new THREEx.KeyboardState();
	//SKYBOX
	__scene.add( makeSkyBox() );
  //define the update function 
	function update() {
		//keybinding
		page.keyboard(keyboard);
		page.update();
		if(page.change){
                        //flip the change bit to indicate we are handeling it
                        page.change = false;
			//invoke page changing protocol
                        loadPage(page.nextPage,page.id);
		}
	}

	//define the Render Loop
	render = function() {
		//Call the update function
                if(!timerSet){
                    timerSet = true;
                    window.setInterval( function() {update();}, 1000 / 60 );
                }
		//Re-draw the __scene
		__renderer.render(__scene, __camera);
		//Re-call the render function when the next frame is ready to be drawn
		requestAnimationFrame(render);
	}
	
	//import the page
	loadPage(0,0);
};
</script>
</head>
<body>
<div style="position:absolute;top:0px;left:0px;z-index:3;width:100%;height:100%;">

</div>
<div id="overlay" style="position:absolute;top:0px;width:100%;left:0px;height:100%;z-index:5;">
</div>

</body>
</html>
