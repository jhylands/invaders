/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function makeSpaceStation(){
    //space station
	var spaceStation = new Object();
	spaceStation.cylinder = new Array();
	spaceStation.plane = new Array();
	spaceStation.position= new THREE.Vector3(0,0,0);
	var group = new THREE.Group();
	spaceStation.Cposition = new THREE.Vector3(0,0,10);
	var planeTexture = new THREE.TextureLoader.load('images/panels.jpg');
	var planeMaterial = new THREE.MeshPhongMaterial({map:planeTexture});
	var planeGeometry = new THREE.PlaneGeometry(0.3,1);
	var nighty = Math.PI/2;
	var pannelData = [{position: new THREE.Vector3(-2.35,0,0.65), rotation : new THREE.Euler(nighty,0,0)},
{position: new THREE.Vector3(-2.,0,0.65), rotation : new THREE.Euler(nighty,0,0)},
{position: new THREE.Vector3(-1.65,0,0.65), rotation : new THREE.Euler(nighty,0,0)},
{position: new THREE.Vector3(-1.3,0,0.65), rotation : new THREE.Euler(nighty,0,0)},
{position: new THREE.Vector3(1.3,0,0.65), rotation : new THREE.Euler(nighty,0,0)},
{position: new THREE.Vector3(1.65,0,0.65), rotation : new THREE.Euler(nighty,0,0)},
{position: new THREE.Vector3(2,0,0.65), rotation : new THREE.Euler(nighty,0,0)},
{position: new THREE.Vector3(2.35,0,0.65), rotation : new THREE.Euler(nighty,0,0)},
{position: new THREE.Vector3(-2.35,0,-0.65), rotation : new THREE.Euler(nighty,0,0)},
{position: new THREE.Vector3(-2.,0,-0.65), rotation : new THREE.Euler(nighty,0,0)},
{position: new THREE.Vector3(-1.65,0,-0.65), rotation : new THREE.Euler(nighty,0,0)},
{position: new THREE.Vector3(-1.3,0,-0.65), rotation : new THREE.Euler(nighty,0,0)},
{position: new THREE.Vector3(1.3,0,-0.65), rotation : new THREE.Euler(nighty,0,0)},
{position: new THREE.Vector3(1.65,0,-0.65), rotation : new THREE.Euler(nighty,0,0)},
{position: new THREE.Vector3(2,0,-0.65), rotation : new THREE.Euler(nighty,0,0)},
{position: new THREE.Vector3(2.35,0,-0.65), rotation : new THREE.Euler(nighty,0,0)},
{position: new THREE.Vector3(0.65,0.5,0.85), rotation : new THREE.Euler(nighty,0,nighty)},
{position: new THREE.Vector3(0.65,0.5,1.35), rotation : new THREE.Euler(nighty,0,nighty)},
{position: new THREE.Vector3(-0.65,0.5,0.85), rotation : new THREE.Euler(nighty,0,nighty)},
{position: new THREE.Vector3(-0.65,0.5,1.35), rotation : new THREE.Euler(nighty,0,nighty)}];
	for(i=0;i<pannelData.length;i++){
		spaceStation.plane[i] = new THREE.Mesh(planeGeometry,planeMaterial);
		spaceStation.plane[i].material.side = THREE.DoubleSide;
		spaceStation.plane[i].rotation.copy( pannelData[i].rotation);
		spaceStation.plane[i].position.copy(pannelData[i].position);// + spaceStation.x;
		group.add(spaceStation.plane[i]);
	}
	var bodyData =[{position: new THREE.Vector3(-2,0,0), rotation : new THREE.Euler(0,0,nighty)},
{position: new THREE.Vector3(-1,0,0), rotation : new THREE.Euler(0,0,nighty)},
{position: new THREE.Vector3(0,0,0), rotation : new THREE.Euler(0,0,nighty)},
{position: new THREE.Vector3(1,0,0), rotation : new THREE.Euler(0,0,nighty)},
{position: new THREE.Vector3(2,0,0), rotation : new THREE.Euler(0,0,nighty)},
{position: new THREE.Vector3(0,-0.5,0), rotation : new THREE.Euler(0,0,0)},
{position: new THREE.Vector3(0,0,0), rotation : new THREE.Euler(0,0,0)},
{position: new THREE.Vector3(0,0.5,0), rotation : new THREE.Euler(0,0,0)},
{position: new THREE.Vector3(0,0.5,0), rotation : new THREE.Euler(nighty,0,0)},
{position: new THREE.Vector3(0,0.5,1), rotation : new THREE.Euler(nighty,0,0)}];
	var cylinderTexture = new THREE.ImageUtils.loadTexture('images/shell.jpg');
	var cylinderMaterial = new THREE.MeshPhongMaterial({map:cylinderTexture,ambient:0xc0c0c0,specular:0xd0d0d0,shininess:1});
	var cylinderGeometry = new THREE.CylinderGeometry(0.15,0.15,1,32);
	for(i=0;i<bodyData.length;i++){
		spaceStation.cylinder[i] = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
		spaceStation.cylinder[i].rotation.copy(bodyData[i].rotation);
		spaceStation.cylinder[i].position.copy(bodyData[i].position);
		group.add(spaceStation.cylinder[i]);
            }
	group.rotation.y=0.6;
	group.rotation.z=0.6;
        return group;
}
