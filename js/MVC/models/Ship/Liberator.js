/* global THREE */

function LiberatorShip(bulletHandler){
    //inherits from ship class
    this.__proto__ = new Ship(bulletHandler);
    this.__loader = new THREE.ColladaLoader();
    this.monoPropellant = new MonoPropellant(new THREE.Vector3(0,20,0));
    /**
     * Function to store the collada object
     * @returns {Function}
     */
    this.makePinaCollada = function(){
        //attach the closure
        var __self = this;
        return function ( collada ) { 
            __self.object = collada.scene;
            //this isn't actually called
            __self.createParticles();
        };
        
    };
    
    this.storeCollada = function(loadedCollada){
        this.object = loadedCollada.scene;
        this.object.rotation.z = deg(180);
        this.createParticles();
    };
    
    this.getThree = function (){return this.object;};
    this.keyboard = function(keyState){
        this.monoPropellant.setEnabled(false);
        //var offset = this.calculateOrbit(0);
        var SPACING = 3;
        if(keyState.pressed("left")){
            //check the object is in range
            if(this.object.position.z>-8*SPACING+this.offset.z){
                    this.object.position.z-=0.1;
                    this.monoPropellant.fireRight();
                    this.monoPropellant.setEnabled(true);
            }
        }else if(keyState.pressed("right")){
            //check object is in range
            if(this.object.position.z<8*SPACING+this.offset.z){
                    this.object.position.z+=0.1;
                    this.monoPropellant.fireLeft();
                    this.monoPropellant.setEnabled(true);
            }
        }else if(keyState.pressed("space")){
            this.bullets.create(this.FRIEND,this.object.position);
        }
    };
    this.update = function (){
        if(this.bullets.hasHit(this.object,this.FRIEND)){
            this.health--;
        }
        //assumed to be run before keyboard update
        
        this.monoPropellant.update();
    };
    this.getHealth = function (){return this.health;};
    this.create = function (callback){
        var self = this;
        var onLoad = function(collada){self.storeCollada(collada);callback();};
        this.__loader.load(
            // resource URL
            'ships/ship1.dae',
            // Function when resource is loaded
            onLoad,
            // Function called when download progresses
            function ( xhr ) {
                    console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
            }
        );
    };
    this.setPosition = function (position){
        this.object.position.copy(position);
        this.offset = position;
    };
    this.createParticles = function(){
        this.object.add(this.monoPropellant.getThree());
        this.monoPropellant.setEnabled(false);
    };
    
    this.remove = function(){
        return this.health<=0;
    };
}

