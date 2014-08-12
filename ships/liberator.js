//SHIP---------------------------------------------------------------------------------------
//the geometory of the engin bay
var Geometry1 = new THREE.SphereGeometry(2,32,32);
//the blue color of the engin bay
var Material1 = new THREE.MeshPhongMaterial({color:0x0000FF,side:THREE.DoubleSide});
	//the component of the engine bay
	var comp1 = new THREE.Mesh(Geometry1,Material1);
		comp1.position.x=-1;
//The geometory of the cylinders
var Geometry2 = new THREE.CylinderGeometry(1,1,5,32);
//the gray metal that most of the ship is made of
var Material2 = new THREE.MeshPhongMaterial({color:0xc0c0c0,side:THREE.DoubleSide});
	//add the central column
	var comp2 = new THREE.Mesh(Geometry2,Material2);
		comp2.position.x=3;
		comp2.rotation.z = Math.PI/2;
//create the cone on the front of the central column
var Geometry3 = new THREE.CylinderGeometry(0,1,2,32);
	var comp3 = new THREE.Mesh(Geometry3,Material2);
		comp3.position.x=6;
		comp3.rotation.z=-Math.PI/2;
//create the plane that connects the outer columns
var Geometry4 = new THREE.PlaneGeometry(5,1);
	//plane
	var comp4 = new THREE.Mesh(Geometry4,Material2);
		comp4.rotation.z = Math.PI/4;
		comp4.position  = new THREE.Vector3(3,2,0);
	//cyliner
	var comp5 = new THREE.Mesh(Geometry2,Material2);
		comp5.position = new THREE.Vector3(3,4,0);
		comp5.rotation.z=-Math.PI/2;
	//cone
	var comp6 = new THREE.Mesh(Geometry3,Material2);
		comp6.position = new THREE.Vector3(6,4,0);
		comp6.rotation.z=-Math.PI/2;
var Geometry7 = new THREE.SphereGeometry(1,32,32);
	//sphere
	var comp7 = new THREE.Mesh(Geometry7,Material2);
		comp7.position = new THREE.Vector3(0.5,4,0);
	//plane
	var comp8 = new THREE.Mesh(Geometry4,Material2);
		comp8.rotation.z = -Math.PI/4;
		comp8.rotation.x = -Math.PI/4;
		comp8.position = new THREE.Vector3(3,-1.4,1.4);
	//plane
	var comp9 = new THREE.Mesh(Geometry4,Material2);
		comp9.rotation.z = -Math.PI/4;
		comp9.rotation.x = Math.PI/4;
		comp9.position = new THREE.Vector3(3,-1.4,-1.4);
	//sphere
	var comp10 = new THREE.Mesh(Geometry7,Material2);
		comp10.position = new THREE.Vector3(0.5,-2.8,2.8);
	//sphere
	var comp11 = new THREE.Mesh(Geometry7,Material2);
		comp11.position = new THREE.Vector3(0.5,-2.8,-2.8);
	//cone
	var comp12 = new THREE.Mesh(Geometry3,Material2);
		comp12.position = new THREE.Vector3(6,-2.8,-2.8);
		comp12.rotation.z=-Math.PI/2;
	//cone
	var comp13 = new THREE.Mesh(Geometry3,Material2);
		comp13.position = new THREE.Vector3(6,-2.8,2.8);
		comp13.rotation.z=-Math.PI/2;
	//cylinder
	var comp14 = new THREE.Mesh(Geometry2,Material2);
		comp14.position = new THREE.Vector3(3,-2.8,2.8);
		comp14.rotation.z=-Math.PI/2;
	//cyloinder
	var comp15 = new THREE.Mesh(Geometry2,Material2);
		comp15.position = new THREE.Vector3(3,-2.8,-2.8);
		comp15.rotation.z=-Math.PI/2;
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
//	spaceShip.rotation.y=Math.PI/2;
	spaceShip.rotation.x=Math.PI/6;
//	spaceShip.rotation.z=Math.PI/4;
