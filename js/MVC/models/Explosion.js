/* global SPE, THREE, contentManager */

function Explosion(size){
        this.group = new SPE.Group( {
                texture: {
                        value: contentManager.getTexture( 'sprite-explosion2','png' ),
                        frames: new THREE.Vector2( 5, 5 ),
                        loop: 1
                },
                depthTest: true,
                depthWrite: false,
                blending: THREE.AdditiveBlending,
                scale: 100,
                maxParticleCount:10000
        } );
        this.shockwaveGroup = new SPE.Group( {
                texture: {
                        value: contentManager.getTexture( 'smokeparticle','png' ),
                },
                depthTest: false,
                depthWrite: true,
                blending: THREE.NormalBlending,
                scale:50,
                maxParticleCount:10000
        } ),
        this.shockwave = new SPE.Emitter( {
                particleCount: 200,
                type: SPE.distributions.DISC,
                position: {
                        radius: 5,
                        spread: new THREE.Vector3( 5 )
                },
                maxAge: {
                        value: 2,
                        spread: 0
                },
                // duration: 1,
                activeMultiplier: 2000,

                velocity: {
                        value: new THREE.Vector3( 40 )
                },
                rotation: {
                        axis: new THREE.Vector3( 1, 0, 0 ),
                        angle: Math.PI * 0.5,
                        static: true
                },
                size: { value: 2*size },
                color: {
                        value: [
                                new THREE.Color( 0.4, 0.2, 0.1 ),
                                new THREE.Color( 0.2, 0.2, 0.2 )
                        ]
                },
                opacity: { value: [0.5, 0.2, 0] }
        }),
        this.debris = new SPE.Emitter( {
                particleCount: 1,//00*Math.round(Math.sqrt(size)),
                type: SPE.distributions.SPHERE,
                position: {
                        radius: 0.1,
                },
                maxAge: {
                        value: 2*size
                },
                // duration: 2,
                activeMultiplier: 40,

                velocity: {
                        value: new THREE.Vector3( 100 )
                },
                acceleration: {
                        value: new THREE.Vector3( 0, -20, 0 ),
                        distribution: SPE.distributions.BOX
                },
                size: { value: 2 },
                drag: {
                        value: 1/size
                },
                color: {
                        value: [
                                new THREE.Color( 1, 1, 1 ),
                                new THREE.Color( 1, 1, 0 ),
                                new THREE.Color( 1, 0, 0 ),
                                new THREE.Color( 0.4, 0.2, 0.1 )
                        ]
                },
                opacity: { value: [0.4, 0] }
        }),
        this.fireball = new SPE.Emitter( {
                particleCount: 20,//increasing things make it last longer to take into accoun the extra particals
                type: SPE.distributions.SPHERE,
                position: {
                        radius: 1,
                        spread:1
                },
                maxAge: { value: 2 },
                // duration: 1,
                activeMultiplier: 20,
                velocity: {
                        value: new THREE.Vector3( 0,0,0),
                        spread: new THREE.Vector3(5,5,5)
                        
                },
                size: { value: [20*size, 100*size] },
                color: {
                        value: [
                                new THREE.Color( 0.5, 0.1, 0.05 ),
                                new THREE.Color( 0.2, 0.2, 0.2 )
                        ]
                },
                opacity: { value: [0.5, 0.35, 0.1, 0] }
        }),
        this.mist = new SPE.Emitter( {
                particleCount: 50,
                position: {
                        spread: new THREE.Vector3( 10, 10, 10 ),
                        distribution: SPE.distributions.SPHERE
                },
                maxAge: { value: 2 },
                // duration: 1,
                activeMultiplier: 2000,
                velocity: {
                        value: new THREE.Vector3( 8, 3, 10 ),
                        distribution: SPE.distributions.SPHERE
                },
                size: { value: 40 },
                color: {
                        value: new THREE.Color( 0.2, 0.2, 0.2 )
                },
                opacity: { value: [0, 0, 0.2, 0] }
        }),
        this.flash = new SPE.Emitter( {
                particleCount: 50,
                position: { spread: new THREE.Vector3( 5, 5, 5 ) },
                velocity: {
                        spread: new THREE.Vector3( 30 ),
                        distribution: SPE.distributions.SPHERE
                },
                size: { value: [2, 20, 20, 20] },
                maxAge: { value: 2 },
                activeMultiplier: 2000,
                opacity: { value: [0.5, 0.25, 0, 0] }
        } );
    this.group.addEmitter( this.fireball ).addEmitter( this.flash );
    this.shockwaveGroup.addEmitter( this.debris ).addEmitter( this.mist );
    this.light = new THREE.PointLight(0xffaa33,.1,30);
    /*this.light.castShadow=true;
    this.light.shadow.camera.near = 1;
    this.light.shadow.camera.far = 30;
    // pointLight.shadowCameraVisible = true;
    //this.light.shadow.bias = 0.01;*/
    this.meshGroup = new THREE.Group();
    this.meshGroup.add(this.group.mesh);
    this.meshGroup.add(this.shockwaveGroup.mesh);
    //this.meshGroup.add(this.light);
    this.meshGroup.scale.x=0.1;
    this.meshGroup.scale.y=0.1;
    this.meshGroup.scale.z=0.1;
    this.lightX=2;
    
    this.reSet = function(){this.lightX=0.01;};
    this.getObject = function(){return this.meshGroup;};
    this.update = function(){
        this.group.tick();
        this.shockwaveGroup.tick();
        this.lightX+=0.01;
        this.light.intensity =1/this.lightX;
        
    };
}
