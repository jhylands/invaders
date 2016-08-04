function AlienShip(){
    //inherits from ship class
    this.__proto__ = new Ship();
    this.make = function(){
        //group constants 
        var COLS=10;
        var ROWS=3 ;


        //Geometry of aliens
        var hullGeometry = new THREE.SphereGeometry(0.5,32);
        var wingGeometry = new THREE.CylinderGeometry(0.5,1,0.5,20);

        //materials of aliens
        var spec = new THREE.TextureLoader().load('images/shell.jpg');
        //envirment map for reflections
        var mirrorWingCamera = new THREE.CubeCamera( 0.1, 10000000, 512 );
        var wingMaterial = new THREE.MeshPhongMaterial({specular:'#ffcc00', color: '#E00000', emissive: '#300000',emissiveIntensity:0.,specularMap:spec, shininess: 100 ,envMap: mirrorWingCamera.renderTarget,reflectivity:0.4});


        mirrorWingCamera.updateCubeMap(__renderer,__scene);
        var hullMaterial = new THREE.MeshPhongMaterial({specular:'#ffffff', color: '#FFFFFF', shininess: 100, envMap: mirrorWingCamera.renderTarget,transparent:true,opacity:0.7,reflectivity:0.9})

        //make alian mesh's
        aBody = new THREE.Mesh(hullGeometry, hullMaterial);
        aWing = new THREE.Mesh(wingGeometry, wingMaterial);

        //create alien group (group of things that one alien is composed of)
        alienMesh = new THREE.Group();
        alienMesh.add(aBody);
        alienMesh.add(aWing);
    };
}

