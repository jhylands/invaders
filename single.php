<html>
<head>
<?php
    //layzy class loader
    spl_autoload_register(function ($class) {
        include '/home/timepcou/public_html/PHPClass/' . $class . '.php';
    });
    include 'scripts/sql.php';
    include 'scripts/shipInfo.php';
    //check that the user has logged in
    if(!isset($_SESSION['User'])){
        echo "<script>window.location.replace('login.php');</script>";
    }
    $ship = new Ship($con,$ShipCode);
?>
    <title>Avinders</title>
    <style id="style">
    </style>
    <style>body{
            background-color: black;
        }
        #loading{
                position: absolute;
    top: calc(50% - 200px);
    left: calc(50% - 350px);
    font-size: 200px;
    color: white;
        }</style>
 <!-- include javascript libraries -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
<script src="js/three/80.min.js"></script>
<script src="js/THREEx.KeyboardState.min.js"></script>
<script src="js/jsInclude.php"></script>
<script src="i/get/startingPack.php"></script>
<script src="js/ColladaLoader.js"></script>
<script src='js/SPE.min.js'></script>
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
 
    var contentManager = new ContentManager();
    var updatePlace = function(callback){
        $.ajax({url:'i/get/place.php'}).done(function(data){
            place = JSON.parse(data);
            if(callback){
                callback();
            }
        });
    };
   
</script>
<script type="application/x-glsl" id="sky-vertex">  
varying vec2 vUV;

void main() {  
  vUV = uv;
  vec4 pos = vec4(position, 1.0);
  gl_Position = projectionMatrix * modelViewMatrix * pos;
}
</script>
<script type="application/x-glsl" id="sky-fragment">  
uniform sampler2D texture;  
varying vec2 vUV;

void main() {  
  vec4 sample = texture2D(texture, vUV);
  gl_FragColor = vec4(sample.xyz, sample.w);
}
</script> 
<script>
//inishiate page globals
var render;
var __renderer;
var __scene;
var __camera;
var I;
//create page file
var pages = [];
var timerSet=false;

function deg(angle){ return angle*2*Math.PI/360;}

function loadPage(toPageID,fromPageID){
    pages[toPageID].create(fromPageID);
}

//clarification of when window.onload fires
//as opposed to document.onload which can fire before images, scripts ect window.onload only files once the required dependencies css ect have been loaded
window.onload = function() {
        I = new Information();
        I.setup();
    };
function start(){
        pages = [new conOrbit(),new conMap(),new conCargo(),new conTrade(),new conShipYard(), new conCombat(),new conAchivement(),new conConsole()];
	//define world
        __renderer = new THREE.WebGLRenderer();
        __renderer.shadowMap.enabled = true;
        __renderer.shadowMap.type = THREE.BasicShadowMap;
        //__renderer = new THREE.CanvasRenderer();
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
	};
	
	//import the page
	loadPage(0,0);
}
</script>
</head>
<body>
<div style="position:absolute;top:0px;left:0px;z-index:3;width:100%;height:100%;">

</div>
<div id="overlay" style="position:absolute;top:0px;width:100%;left:0px;height:100%;z-index:5;">
</div>
    <div id="loading">Loading ...</div>
</body>
</html>
