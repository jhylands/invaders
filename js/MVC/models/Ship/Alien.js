function AlienShip(bulletHandler){
    //inherits from ship class
    this.__proto__ = new Ship();
    this.bulletHandler = bulletHandler;
    this.getThree = function(){return object;};
    this.make = function(){
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
        this.object = alienMesh;
    };
    //allow for the mesh to be passed as reference to one in a fleet so to reduce memory
    this.makeAsFleet = function(group){this.object = group;};
    this.setPosition = function(vector3){this.object.position.set(vector3);};
    this.getPosition = function(){return this.object.position;};
    this.setVelocity = function(vector3){this.velocity = vector3;};
    this.getVelocity = function(){return this.velocity;};
    this.update = function (){
        //To include some reference to local ships
        this.object.position.add(this.velocity);
    };
    this.alienAI = function(){
            difficulty = 0.001;
            //alians shoot back
            for(var x=0;x<this.aliens.children.length;x++){
                moveSeed = Math.random();
                if(moveSeed<0.1){
                    this.aliens.children[x].velocity.y +=0.0001;
                }else if (moveSeed<0.2){
                    this.aliens.children[x].velocity.y -=0.0001;
                }
                this.aliens.children[x].velocity.y += (-this.aliens.children[x].position.y) / 1000;
                this.aliens.children[x].position.setY(this.aliens.children[x].position.y+this.aliens.children[x].velocity.y);
                if(Math.random()<difficulty){
                    //make new bullit
                    this.bullets.create(this.foeAllegiance,(new THREE.Vector3(0,0,0).add(this.aliens.children[x].position)).add(this.aliens.position));
                }
            }
    };
}

