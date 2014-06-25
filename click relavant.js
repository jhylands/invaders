
<!DOCTYPE html>
<html lang="en">

	<body>

		<script src="http://threejs.org/build/three.min.js"></script>


		<script>

			var container, stats;
			var camera, scene, projector, renderer;

			init();
			animate();

			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				var info = document.createElement( 'div' );
				info.style.position = 'absolute';
				info.style.top = '10px';
				info.style.width = '100%';
				info.style.textAlign = 'center';
				info.innerHTML = '';
				container.appendChild( info );

				camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.y = 300;
				camera.position.z = 500;

				scene = new THREE.Scene();

				var geometry = new THREE.CubeGeometry( 100, 100, 100 );

				for ( var i = 0; i < 20; i ++ ) {

					var object = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff } ) );
					object.position.x = Math.random() * 800 - 400;
					object.position.y = Math.random() * 800 - 400;
					object.position.z = Math.random() * 800 - 400;
					object.rotation.x = Math.random() * 2 * Math.PI;
					object.rotation.y = Math.random() * 2 * Math.PI;
					object.rotation.z = Math.random() * 2 * Math.PI;
					scene.add( object );

				}

				projector = new THREE.Projector();

				renderer = new THREE.CanvasRenderer();
				renderer.setClearColor( 0xf0f0f0 );
				renderer.setSize( window.innerWidth, window.innerHeight );

				container.appendChild(renderer.domElement);

				document.addEventListener( 'mousedown', onDocumentMouseDown, false );


			}

			function onDocumentMouseDown( event ) {

				event.preventDefault();

				var vector = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
				projector.unprojectVector( vector, camera );

				var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

				var intersects = raycaster.intersectObjects( scene.children );

				if ( intersects.length > 0 ) {

					alert(intersects[ 0 ].object.position.x );

				}

			
			}

			//

			function animate() {

				requestAnimationFrame( animate );

				render();


			}

			var radius = 600;
			var theta = 0;

			function render() {
				camera.lookAt( scene.position );
				renderer.render( scene, camera );

			}

		</script>

	</body>
</html>
