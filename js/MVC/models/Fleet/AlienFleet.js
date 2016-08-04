function AlienFleet(){
    //inherits from ship class
    this.__proto__ = new Ship();
    
    thus.create=function(){
        //create array of aliens
        var aliens = new THREE.Group();
        aliens.name="all";
        this.cube = mirrorWingCamera;
        for (x=0;x<COLS;x++){
                //X loop
                //aliens[x] = new Array()
                for(z=0;z<ROWS;z++){
                        //Z loop
                        //create the user defined types
                        //aliens[x][z] = new Object();
                        //create the alian as a mesh object and set the apropreate properties
                        var alien = alienMesh.clone();
                        alien.children[1].name = aliens.children.length;

                        alien.position.set(this.SPACING*z,0,this.SPACING*x-10);
                        alien.velocity = new THREE.Vector3(0.01,0,0);
                        //add the alian to the __scene
                        aliens.add(alien);
                }
        }
        return aliens;
    };
}


