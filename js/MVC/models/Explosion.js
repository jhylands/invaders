/* global SPE, THREE */

function Explosion(size){
    this.group = new SPE.Group( {
					texture: {
						value: THREE.ImageUtils.loadTexture( './img/sprite-explosion2.png' ),
						frames: new THREE.Vector2( 5, 5 ),
						loop: 1
					},
					depthTest: true,
					depthWrite: false,
					blending: THREE.AdditiveBlending,
					scale: 300
				} );
    this.shockwaveGroup = new SPE.Group( {
					texture: {
						value: THREE.ImageUtils.loadTexture( './img/smokeparticle.png' ),
					},
					depthTest: false,
					depthWrite: true,
					blending: THREE.NormalBlending,
				} );
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
					size: { value: 2 },
					color: {
						value: [
							new THREE.Color( 0.4, 0.2, 0.1 ),
							new THREE.Color( 0.2, 0.2, 0.2 )
						]
					},
					opacity: { value: [0.5, 0.2, 0] }
				});
    this.debris = new SPE.Emitter( {
            particleCount: 100,
            type: SPE.distributions.SPHERE,
            position: {
                    radius: 0.1,
            },
            maxAge: {
                    value: 2
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
            size: { value: size },
            drag: {
                    value: 1
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
    });
    this.fireball = new SPE.Emitter( {
            particleCount: 20,
            type: SPE.distributions.SPHERE,
            position: {
                    radius: 1
            },
            maxAge: { value: 2 },
            // duration: 1,
            activeMultiplier: 20,
            velocity: {
                    value: new THREE.Vector3( 10 )
            },
            size: { value: [10*size, 50*size] },
            color: {
                    value: [
                            new THREE.Color( 0.5, 0.1, 0.05 ),
                            new THREE.Color( 0.2, 0.2, 0.2 )
                    ]
            },
            opacity: { value: [0.5, 0.35, 0.1, 0] }
    });
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
            size: { value: 20*size },
            color: {
                    value: new THREE.Color( 0.2, 0.2, 0.2 )
            },
            opacity: { value: [0, 0, 0.2, 0] }
    });
    this.flash = new SPE.Emitter( {
            particleCount: 50,
            position: { spread: new THREE.Vector3( 5, 5, 5 ) },
            velocity: {
                    spread: new THREE.Vector3( 30 ),
                    distribution: SPE.distributions.SPHERE
            },
            size: { value: [1*size, 10*size, 10*size, 10*size] },
            maxAge: { value: 2 },
            activeMultiplier: 2000,
            opacity: { value: [0.5, 0.25, 0, 0] }
    } );
    this.group.addEmitter( this.fireball ).addEmitter( this.flash );
    this.shockwaveGroup.addEmitter( this.debris ).addEmitter( this.mist );
    this.meshGroup = new THREE.Group();
    this.meshGroup.add(this.group.mesh);
    this.meshGroup.add(this.shockwaveGroup.mesh);
    
    
    
    this.getObject = function(){return this.meshGroup;};
    this.update = function(){
        this.group.tick();
        this.shockwaveGroup.tick();
    };
}
