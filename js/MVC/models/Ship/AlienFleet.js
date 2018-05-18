/* global THREE */

function AlienFleet(bulletHandler){
    //inherits from ship class
    this.__proto__ = new Ship(bulletHandler);
    this.SPACING=3;
    this.object;
    this.aliens = [];
    this.boolCanShoot;
    this.create=function(){
        var template = new AlienShip(bulletHandler);
        template.make();
        var alienMesh = template.getThree().clone();
        template = null;
        
        //group constants 
        var COLS=10;
        var ROWS=3 ;
        //create array of aliens
        var aliens = new THREE.Group();
        aliens.name="all";
        //this.cube = mirrorWingCamera;
        //create closure for passing new add and remove functions
        var self = this;
        for (x=0;x<COLS;x++){
                //X loop
                for(z=0;z<ROWS;z++){
                        //Z loop
                        //create the user defined types
                        //aliens[x][z] = new Object();
                        //create the alian as a mesh object and set the apropreate properties
                        var alien = new AlienShip(bulletHandler);
                        //alien.makeAsFleet(alienMesh.clone());
                        //alien.children[1].name = aliens.children.length;
                        alien.makeAsFleet(alienMesh.clone(),function(ship){self.addShip(ship);},function(ship){self.removeShip(ship);});
                        alien.setPosition(new THREE.Vector3(this.SPACING*z,0,this.SPACING*x-10));
                        //set the size of the explosion to be mostly small with a small chance of being big
                        alien.explosion = new Explosion(this.getExplosionSize());
                        //alien.velocity = new THREE.Vector3(0,0,0);
                        //add the alian to the __scene
                        aliens.add(alien.getThree());
                        this.aliens.push(alien);
                }
        }
        this.object = aliens;
    };
    this.setPosition = function (position){
        this.object.position.copy(position);
    };
    this.update = function(){
        for(i=0;i<this.aliens.length;i++){
            this.aliens[i].setParentPosition(this.object.position);
            this.aliens[i].update();
        }
    };
    this.moveAliens = function(){
            this.aliens.position.setZ(this.aliens.position.z+0.01*this.alienParity);
            if(this.aliens.position.z>this.SPACING*7||this.aliens.position.z<this.SPACING*-7){
                this.alienParity *=-1;
            }
        };
    /**
     * Function to scale the size of the explosion based on a random number from 0 to 1
     * If rnd is between 0 and .9 it is scalled such that 0 yeilds a 1 and .9 yeilds a 2
     * otherwise rnd is scalled so a .9 yeilds a 2 and a .99 yeilds 10
     * @returns {Number}

     */     
    this.getExplosionSize = function(){
        var rnd = Math.random();
        return rnd<=.9?1+rnd/.9:10/.99*rnd+2-9/.99;  
    };
    this.updateCamera = function (){
            //update a single camera from the aliens 
                                    for(x=0;x<alians.length;x++){
                            for(z=0;z<alians[x].length;z++){
                                alians[x][z].mesh.visible = false;
                            }
                        }
                        mirrorWingCamera.position = alians[5][1].mesh.position;
                        mirrorWingCamera.updateCubeMap( renderer, __scene );
                        for(x=0;x<alians.length;x++){
                            for(z=0;z<alians[x].length;z++){
                                alians[x][z].mesh.visible = true;
                            }
                        }
        };
    this.canShoot= function(){
            this.boolCanShoot=true;
    };
    this.getThree= function(){return this.object;};
    this.addShip = function(ship){
        this.object.add(ship);
    };
    this.removeShip = function(ship){
        this.object.remove(ship);
    };
    this.defeated = function(){return this.object.children.length===0;};
    this.create();
}


