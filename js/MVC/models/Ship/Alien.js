/* global THREE */

function AlienShip(bulletHandler){
    //inherits from ship class
    this.__proto__ = new Ship(bulletHandler);
    this.velocity = new THREE.Vector3(0,0,0);
    this.parPos = new THREE.Vector3(0,0,0);
    this.destroy = 0;
    this.explosion = new Explosion(1);
    this.getThree = function(){return this.object;};
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
        //this.parPos = new THREE.Vector3(0,0,0);
        //console.log(this.object.position.x);
    };
    //allow for the mesh to be passed as reference to one in a fleet so to reduce memory
    this.makeAsFleet = function(group,add,remove){
        //set this mesh as a clone of the others to save memory
        this.object = group;
        //redefine remove and add as to the parent object rather than __scene
        this.remove=remove;
        this.add = add;
    };
    this.remove = function(ship){__scene.remove(ship);};
    this.add = function(ship){__scene.add(ship);};
    this.setPosition = function(vector3){this.object.position.copy(vector3);};
    this.getPosition = function(){return this.object.position;};
    this.setParentPosition = function(position){this.parPos = position;};
    this.setVelocity = function(vector3){this.velocity = vector3;};
    this.getVelocity = function(){return this.velocity;};
    this.update = function (){
        switch(this.destroy){
            case 1:
                this.destructAnimation();
                break;
            case 0:
                //To include some reference to local ships
                this.alienAI();
                if(this.bullets.hasHit(this.object,this.FOE)){
                    this.destroy = 1;
                    console.log('alien down');
                    var location = this.object.position;
                    this.remove(this.object);
                    this.object = this.explosion.getObject();
                    this.object.position.copy(location);
                    this.add(this.object);
                    var self=this;
                    setTimeout(function(){self.endAnimation();},2000);

                }
                this.object.position.add(this.velocity);
                break;
        }
    };
    this.alienAI = function(){
            difficulty = 0.001;
            //alians shoot back
            moveSeed = Math.random();
            if(moveSeed<0.1){
                this.velocity.y +=0.0001;
            }else if (moveSeed<0.2){
                this.velocity.y -=0.0001;
            }
            this.velocity.y += (-this.object.position.y) / 1000;
            this.object.position.setY(this.object.position.y+this.velocity.y);
            if(Math.random()<difficulty){
                //make new bullit
                this.bullets.create(this.FOE,(new THREE.Vector3(0,0,0).add(this.object.position)).add(this.parPos));
            }
           
    };
    this.destructAnimation = function(){
        this.explosion.update();
    };
    this.endAnimation = function(){
        this.remove(this.object);
        this.destroy=2;
    };
}

