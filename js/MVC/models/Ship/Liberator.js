/* global THREE,I */

function LiberatorShip(bulletHandler){
    //inherits from ship class
    this.__proto__ = new Ship(bulletHandler);
    this.__loader = new THREE.ColladaLoader();
    this.monoPropellant = new MonoPropellant(new THREE.Vector3(0,20,0));
    this.health=I.shipInfo._ship.Shielding;
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
                    this.monoMove(new THREE.Vector3(1,0,0));
            }
        }else if(keyState.pressed("right")){
            //check object is in range
            if(this.object.position.z<8*SPACING+this.offset.z){
                    this.object.position.z+=0.1;
                    this.monoMove(new THREE.Vector3(-1,0,0));
            }
        }else if(keyState.pressed("space")){
            this.bullets.create(this.FRIEND,this.object.position);
        }
    };
    this.update = function (){
        if(this.bullets.hasHit(this.object,this.FRIEND)){
            //update health locally 
            this.health-=5;
            //update database health
            $.ajax('i/do/TakeHit.php');
            //update global state syncronisation
            I.update();
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
    /**
     * 
     * @param {THREE.Vector3} direction
     * @returns {void}
     */
    this.monoMove = function(direction){
        this.monoPropellant.setDirection(direction);
        this.monoPropellant.setEnabled(true);
    };
    /**
     * Function to animate ship when under burn power as opposed to monpropellent
     * @param {type} direction
     * @param {type} power
     * @returns {undefined}
     */
    this.powerMove = function(direction,power){
        console.warn('LiberatorShip.powerMove() Remains unimplemented');
    };
}

