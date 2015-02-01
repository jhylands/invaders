scale=0.5
//SHIP---------------------------------------------------------------------------------------
//the Geometry of the engin bay
var LiberatorGeometry1 = new THREE.SphereGeometry(2*scale,32,32);
//the blue color of the engin bay
var LiberatorMaterial1 = new THREE.MeshPhongMaterial({color:0x0000FF,side:THREE.DoubleSide});
	//the component of the engine bay
	var comp1 = new THREE.Mesh(LiberatorGeometry1,LiberatorMaterial1);
		comp1.position.x=-1*scale;
//The Geometry of the cylinders
var LiberatorGeometry2 = new THREE.CylinderGeometry(1*scale,1*scale,5*scale,32);
//the gray metal that most of the ship is made of
var LiberatorMaterial2 = new THREE.MeshPhongMaterial({color:0xc0c0c0,side:THREE.DoubleSide});
	//add the central column
	var comp2 = new THREE.Mesh(LiberatorGeometry2,LiberatorMaterial2);
		comp2.position.x=3*scale;
		comp2.rotation.z = Math.PI/2;
//create the cone on the front of the central column
var LiberatorGeometry3 = new THREE.CylinderGeometry(0,1*scale,2*scale,32);
	var comp3 = new THREE.Mesh(LiberatorGeometry3,LiberatorMaterial2);
		comp3.position.x=6*scale;
		comp3.rotation.z=-Math.PI/2;
//create the plane that connects the outer columns
var LiberatorGeometry4 = new THREE.PlaneGeometry(5*scale,1);
	//plane
	var comp4 = new THREE.Mesh(LiberatorGeometry4,LiberatorMaterial2);
		comp4.rotation.z = Math.PI/4;
		comp4.position  = new THREE.Vector3(3,2,0).multiplyScalar(scale);
	//cyliner
	var comp5 = new THREE.Mesh(LiberatorGeometry2,LiberatorMaterial2);
		comp5.position = new THREE.Vector3(3,4,0).multiplyScalar(scale);
		comp5.rotation.z=-Math.PI/2;
	//cone
	var comp6 = new THREE.Mesh(LiberatorGeometry3,LiberatorMaterial2);
		comp6.position = new THREE.Vector3(6,4,0).multiplyScalar(scale);
		comp6.rotation.z=-Math.PI/2;
var LiberatorGeometry7 = new THREE.SphereGeometry(1*scale,32,32);
	//sphere
	var comp7 = new THREE.Mesh(LiberatorGeometry7,LiberatorMaterial2);
		comp7.position = new THREE.Vector3(0.5,4,0).multiplyScalar(scale);
	//plane
	var comp8 = new THREE.Mesh(LiberatorGeometry4,LiberatorMaterial2);
		comp8.rotation.z = -Math.PI/4;
		comp8.rotation.x = -Math.PI/4;
		comp8.position = new THREE.Vector3(3,-1.4,1.4).multiplyScalar(scale);
	//plane
	var comp9 = new THREE.Mesh(LiberatorGeometry4,LiberatorMaterial2);
		comp9.rotation.z = -Math.PI/4;
		comp9.rotation.x = Math.PI/4;
		comp9.position = new THREE.Vector3(3,-1.4,-1.4).multiplyScalar(scale);
	//sphere
	var comp10 = new THREE.Mesh(LiberatorGeometry7,LiberatorMaterial2);
		comp10.position = new THREE.Vector3(0.5,-2.8,2.8).multiplyScalar(scale);
	//sphere
	var comp11 = new THREE.Mesh(LiberatorGeometry7,LiberatorMaterial2);
		comp11.position = new THREE.Vector3(0.5,-2.8,-2.8).multiplyScalar(scale);
	//cone
	var comp12 = new THREE.Mesh(LiberatorGeometry3,LiberatorMaterial2);
		comp12.position = new THREE.Vector3(6,-2.8,-2.8).multiplyScalar(scale);
		comp12.rotation.z=-Math.PI/2;
	//cone
	var comp13 = new THREE.Mesh(LiberatorGeometry3,LiberatorMaterial2);
		comp13.position = new THREE.Vector3(6,-2.8,2.8).multiplyScalar(scale);
		comp13.rotation.z=-Math.PI/2;
	//cylinder
	var comp14 = new THREE.Mesh(LiberatorGeometry2,LiberatorMaterial2);
		comp14.position = new THREE.Vector3(3,-2.8,2.8).multiplyScalar(scale);
		comp14.rotation.z=-Math.PI/2;
	//cyloinder
	var comp15 = new THREE.Mesh(LiberatorGeometry2,LiberatorMaterial2);
		comp15.position = new THREE.Vector3(3,-2.8,-2.8).multiplyScalar(scale);
		comp15.rotation.z=-Math.PI/2;
	spaceShip = new THREE.Object3D()
	spaceShip.add(comp1);
	spaceShip.add(comp2);
	spaceShip.add(comp3);
	spaceShip.add(comp4);
	spaceShip.add(comp5);
	spaceShip.add(comp6);
	spaceShip.add(comp7);
	spaceShip.add(comp8);
	spaceShip.add(comp9);
	spaceShip.add(comp10);
	spaceShip.add(comp11);
	spaceShip.add(comp12);
	spaceShip.add(comp13);
	spaceShip.add(comp14);
	spaceShip.add(comp15);
	spaceShip.rotation.x=-Math.PI/2;
	spaceShip.rotation.z=Math.PI/2;
