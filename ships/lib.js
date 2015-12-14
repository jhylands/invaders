var loader = new THREE.ObjectLoader();
loader.load("ship1.js",function ( obj ) {
		var material = new THREE.MeshPhongMaterial( {
					color: 0xdddddd,
					specular: 0x222222,
					shininess: 35,
					map: THREE.ImageUtils.loadTexture( "shell.jpg" ),
					normalMap: THREE.ImageUtils.loadTexture( "shell.jpg" ),
					normalScale: new THREE.Vector2( 0.8, 0.8 ),
                                        side: THREE.DoubleSide
				} );
     obj.children[4].children[0].material = material;
     obj.children[4].children[1].material = material;
     obj.children[4].children[2].material = material;
     obj.children[0].material = material;
     obj.children[1].material = material;
     obj.children[2].material = material;
     obj.children[5].material = material;
     spaceShip.add(obj.children[4]);
     spaceShip.add(obj.children[0]);
     spaceShip.add(obj.children[1]);
     spaceShip.add(obj.children[2]);
     spaceShip.add(obj.children[5]);