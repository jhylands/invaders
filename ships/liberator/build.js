
var liberator = new THREE.Object3D();
var lambda;
var loader = new Object();

//$.ajax("");

function loadGeometry(objectName) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
       loader[objectName] = JSON.parse(xhttp.responseText);
       checkLoaded();
    }
  };
  xhttp.open("GET","ships/liberator/" + objectName + ".js", true);
  xhttp.send();
}
function checkLoaded(){
    ship = new THREE.Geometry();
    for(i=0;i<loader['ship'].vertices.length;i++){
        ship.vertices.push(new THREE.Vector3(loader['ship'].vertices[i].x,loader['ship'].vertices[i].y,loader['ship'].vertices[i].z));
    }
    for(i=0;i<loader['ship'].faces.length;i++){
        ship.faces.push(new THREE.Face3(loader['ship'].faces[i].a,loader['ship'].faces[i].b,loader['ship'].faces[i].c));
    }
     for(i=0;i<loader['ship'].faceVertexUvs.length;i++){
             ship.faceVertexUvs[0].push([
                 new THREE.Vector2(
                         loader['ship'].faceVertexUvs[i][0].x,loader['ship'].faceVertexUvs[i][0].y),
                 new THREE.Vector2(
                         loader['ship'].faceVertexUvs[i][1].x,loader['ship'].faceVertexUvs[i][1].y),
                 new THREE.Vector2(
                         loader['ship'].faceVertexUvs[i][2].x,loader['ship'].faceVertexUvs[i][2].y)]);
     }
    ship.computeFaceNormals();
    texture = new THREE.ImageUtils.loadTexture( "ships/shell.jpg" );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.x=2;
    texture.repeat.y=2;
    material = new THREE.MeshPhongMaterial( {
                                    color: 0xdddddd,
                                    specular: 0x222222,
                                    shininess: 35,
                                    map: texture,
                                    normalMap: THREE.ImageUtils.loadTexture( "ships/shell.jpg" ),
                                    normalScale: new THREE.Vector2( 0.8, 0.8 ),
                                    side: THREE.DoubleSide} );
    shipMesh = new THREE.Mesh(ship,material);
    shipMesh.rotation.y=-Math.PI/2;
    liberator.add(shipMesh);
    scene.add(liberator);
}