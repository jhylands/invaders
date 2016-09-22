/* global THREE, SPE */

function MonoPropellant(velocity){
    this.group = new SPE.Group( {
            texture: {
                    value: THREE.ImageUtils.loadTexture( 'images/smokeparticle.png' ),
            },
            depthTest: true,
            depthWrite: true,
            blending: THREE.AdditiveBlending,
            scale:10
    } );
    
    this.emitter = new SPE.Emitter({
        maxAge: {
            value: 0.5
        },
                position: {
            value: new THREE.Vector3(0, 0, 0),
            spread: new THREE.Vector3( 0, 0, 0 )
        },

                acceleration: {
            value: new THREE.Vector3(0, 0, 0),
            spread: new THREE.Vector3( 0, 0, 0 )
        },

                velocity: {
            value: velocity,
            spread: new THREE.Vector3(5, 10, 5)
        },

        color: {
            value: [ new THREE.Color(200,200,200) ]
        },

        size: {
            value: [20, 100]
        },
        opacity: { value: [0.5, 0.25, 0, 0] },

                particleCount: 2000
    });
    this.group.addEmitter(this.emitter);
    this.group.enabled = false;
    
    this.getThree = function(){return this.group.mesh;};
    
    this.update = function(){
        this.group.tick();
    };
    
    this.setEnabled = function(enabled){this.emitter.alive = enabled;};
    this.fireLeft = function (){this.group.mesh.rotation.setFromVector3(new THREE.Vector3(-Math.PI/2,0,0));};
    this.fireRight = function (){this.group.mesh.rotation.setFromVector3(new THREE.Vector3(Math.PI/2,0,0));};
}