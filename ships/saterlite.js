//space station
	var spaceStation = new Object();
	spaceStation.cylinder = new Array();
	spaceStation.plane = new Array();
	spaceStation.position= new THREE.Vector3(0,0,0);
	var saterlite = new THREE.Object3D();
	spaceStation.Cposition = new THREE.Vector3(0,0,10);
	var planeTexture = new THREE.ImageUtils.loadTexture('images/panels.jpg');
	var planeMaterial = new THREE.MeshPhongMaterial({map:planeTexture});
	var planeGeometry = new THREE.PlaneGeometry(0.3,1);
	var nighty = Math.PI/2;
	var pannelData = [{position: new THREE.Vector3(-2.35,0,0.65), rotation : new THREE.Vector3(nighty,0,0)},
{position: new THREE.Vector3(-2.,0,0.65), rotation : new THREE.Vector3(nighty,0,0)},
{position: new THREE.Vector3(-1.65,0,0.65), rotation : new THREE.Vector3(nighty,0,0)},
{position: new THREE.Vector3(-1.3,0,0.65), rotation : new THREE.Vector3(nighty,0,0)},
{position: new THREE.Vector3(1.3,0,0.65), rotation : new THREE.Vector3(nighty,0,0)},
{position: new THREE.Vector3(1.65,0,0.65), rotation : new THREE.Vector3(nighty,0,0)},
{position: new THREE.Vector3(2,0,0.65), rotation : new THREE.Vector3(nighty,0,0)},
{position: new THREE.Vector3(2.35,0,0.65), rotation : new THREE.Vector3(nighty,0,0)},
{position: new THREE.Vector3(-2.35,0,-0.65), rotation : new THREE.Vector3(nighty,0,0)},
{position: new THREE.Vector3(-2.,0,-0.65), rotation : new THREE.Vector3(nighty,0,0)},
{position: new THREE.Vector3(-1.65,0,-0.65), rotation : new THREE.Vector3(nighty,0,0)},
{position: new THREE.Vector3(-1.3,0,-0.65), rotation : new THREE.Vector3(nighty,0,0)},
{position: new THREE.Vector3(1.3,0,-0.65), rotation : new THREE.Vector3(nighty,0,0)},
{position: new THREE.Vector3(1.65,0,-0.65), rotation : new THREE.Vector3(nighty,0,0)},
{position: new THREE.Vector3(2,0,-0.65), rotation : new THREE.Vector3(nighty,0,0)},
{position: new THREE.Vector3(2.35,0,-0.65), rotation : new THREE.Vector3(nighty,0,0)},
{position: new THREE.Vector3(0.65,0.5,0.85), rotation : new THREE.Vector3(nighty,0,nighty)},
{position: new THREE.Vector3(0.65,0.5,1.35), rotation : new THREE.Vector3(nighty,0,nighty)},
{position: new THREE.Vector3(-0.65,0.5,0.85), rotation : new THREE.Vector3(nighty,0,nighty)},
{position: new THREE.Vector3(-0.65,0.5,1.35), rotation : new THREE.Vector3(nighty,0,nighty)}];
	for(i=0;i<pannelData.length;i++){
		spaceStation.plane[i] = new THREE.Mesh(planeGeometry,planeMaterial);
		spaceStation.plane[i].material.side = THREE.DoubleSide;
		spaceStation.plane[i].rotation = pannelData[i].rotation;
		spaceStation.plane[i].position = pannelData[i].position;// + spaceStation.x;
		saterlite.add(spaceStation.plane[i]);
	}
	var bodyData =[{position: new THREE.Vector3(-2,0,0), rotation : new THREE.Vector3(0,0,nighty)},
{position: new THREE.Vector3(-1,0,0), rotation : new THREE.Vector3(0,0,nighty)},
{position: new THREE.Vector3(0,0,0), rotation : new THREE.Vector3(0,0,nighty)},
{position: new THREE.Vector3(1,0,0), rotation : new THREE.Vector3(0,0,nighty)},
{position: new THREE.Vector3(2,0,0), rotation : new THREE.Vector3(0,0,nighty)},
{position: new THREE.Vector3(0,-0.5,0), rotation : new THREE.Vector3(0,0,0)},
{position: new THREE.Vector3(0,0,0), rotation : new THREE.Vector3(0,0,0)},
{position: new THREE.Vector3(0,0.5,0), rotation : new THREE.Vector3(0,0,0)},
{position: new THREE.Vector3(0,0.5,0), rotation : new THREE.Vector3(nighty,0,0)},
{position: new THREE.Vector3(0,0.5,1), rotation : new THREE.Vector3(nighty,0,0)}];
	var cylinderTexture = new THREE.ImageUtils.loadTexture('images/shell.jpg');
	var cylinderMaterial = new THREE.MeshPhongMaterial({map:cylinderTexture,specular:0xd0d0d0,shininess:1});
	var cylinderGeometry = new THREE.CylinderGeometry(0.15,0.15,1,32);
	for(i=0;i<bodyData.length;i++){
		spaceStation.cylinder[i] = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
		spaceStation.cylinder[i].rotation = bodyData[i].rotation;
		spaceStation.cylinder[i].position = bodyData[i].position;
		saterlite.add(spaceStation.cylinder[i]);
	}
        saterlite.rotation.y=0.6;
	saterlite.rotation.z=0.6;

