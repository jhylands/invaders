function LiberatorShip(){
    //inherits from ship class
    this.__proto__ = new Ship();
    this.__loader = new THREE.ColladaLoader();
    this.__loader.load(
	// resource URL
	'ships/ship1.dae',
	// Function when resource is loaded
	this.makePinaCollada(),
	// Function called when download progresses
	function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	}
    );
    this.makePinaCollada = function(){
        //attach the closure
        var __self = this;
        return function ( collada ) { __self.object = collada.scene;};
    };
    
    this.getThree = function (){return this.object;};
    this.keyboard = function(keyState){
        if(keyState.pressed("left")){
                //check the object is in range
                if(this.object.position.z>-8*this.SPACING+offset.z){
                        this.object.position.z-=0.1
                }
            }else if(keyState.pressed("right")){
                //check object is in range
                if(this.object.position.z<8*this.SPACING+offset.z){
                        this.object.position.z+=0.1
                }
            }
    };
    this.update = function (){};
}

