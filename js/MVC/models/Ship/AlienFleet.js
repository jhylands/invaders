function AlienFleet(bulletHandler){
    //inherits from ship class
    this.__proto__ = new Ship();
    this.object;
    this.aliens = [];
    this.canShoot;
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
        
        for (x=0;x<COLS;x++){
                //X loop
                for(z=0;z<ROWS;z++){
                        //Z loop
                        //create the user defined types
                        //aliens[x][z] = new Object();
                        //create the alian as a mesh object and set the apropreate properties
                        var alien = new AlienShip(bulletHandler);
                        alien.makeAsFleet(alienMesh.clone());
                        //alien.children[1].name = aliens.children.length;

                        alien.setPosition(this.SPACING*z,0,this.SPACING*x-10);
                        alien.velocity = new THREE.Vector3(0.01,0,0);
                        //add the alian to the __scene
                        aliens.add(alien.getThree());
                        this.aliens.push(alien);
                }
        }
        this.object = aliens;
    };
    
    this.update = function(){
        for(i=0;i<this.aliens.length;i++){
            this.aliens[i].update();
        }
    };
            this.moveAliens = function(){
            this.aliens.position.setZ(this.aliens.position.z+0.01*this.alienParity);
            if(this.aliens.position.z>this.SPACING*7||this.aliens.position.z<this.SPACING*-7){
                this.alienParity *=-1;
            }
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
            this.canShoot=true;
        };
}


