<?php

/* 
 * File to include all the repettive three.js declarations to simplify the reading of files
 */
class threeRenderer {
    
    function createScene($lights=true){
        $camera = $this->makeCamera();
        $scene = <<<code
	//define world
	//projector = new THREE.Projector();
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth-5,  window.innerHeight-5);
        document.getElementsByTagName('div')[0].appendChild( renderer.domElement );
        scene = new THREE.Scene();
        $camera
        camera.position.set(160,-20,0);
        camera.lookAt( scene.position );
        var keyboard = new THREEx.KeyboardState();
code;
        if($lights){
            $scene .= <<<code
        //setup lighting conditions
		var lightcolor =  0xFFFFFF
		var light = new THREE.PointLight( lightcolor );
        light.position.set( 0, 10, 0 );
		scene.add(light);
		var light4 = new THREE.PointLight( lightcolor );
        light4.position.set( 0, 0,-10 );
		scene.add(light);
code;
        }
        return $scene;
    }
    function makeCamera($FOV=35,$ratio=1.3,$near=0.1,$far=10000000){
        return <<<code
        //setup camera
        camera = new THREE.PerspectiveCamera(
            $FOV,             // Field of view
            $ratio,      // Aspect ratio
            $near,            // Near plane
            $far           // Far plane
        );
        
code;
    }

    private function loadTexture($texName,$URL){
        return  "var $texName = new THREE.ImageUtils.loadTexture('images/$URL');";
    }
    function makeSun(){
        return <<<code
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
code;
    }
    function makeSkyBox($radius=5000000){
        return <<<code
    var imagePrefix = "images/nebula-";
            var directions  = ["xpos", "xneg", "ypos", "yneg", "zpos", "zneg"];
            var imageSuffix = ".png";
            var skyGeometry = new THREE.CubeGeometry( $radius, $radius, $radius );
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
code;
    }
    function makePlanet($URL,$radius=63781,$x=321640,$y=0,$z=0){
        $tex = $this->loadTexture("earthTexture", $URL);
        return <<<code
    //EARTH
            $tex
            var earthGeometry = new THREE.SphereGeometry($radius,32,32);
            var earthMaterial = new THREE.MeshPhongMaterial({map:earthTexture});
            var earth = new THREE.Mesh(earthGeometry,earthMaterial);
            earth.position.x = $x;
            //earth.position.y = $y;
            //earth.position.z = $z;
            scene.add(earth);
code;
    }
}
?>

