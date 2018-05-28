/* global THREE, __camera, __scene, I, ContentManager, contentManager , DOMParser*/
document.__proto__.createElementFromString = function (str) {
    const element = new DOMParser().parseFromString(str, 'text/html');
    const child = element.documentElement.querySelector('body').firstChild;
    return child;
};

function makeClickHandler(callback){
    return function ( event ) {
        event.preventDefault();
        var vector = new THREE.Vector2( ( event.clientX / window.innerWidth ) * 2 - 1,
        - ( event.clientY / window.innerHeight ) * 2 + 1);

        var raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(vector,__camera);
        var intersects = raycaster.intersectObjects( __scene.children );
        if ( intersects.length > 0 ) {
            if(intersects[0].object.name!=0 && intersects[0].object.name !==""){
                    callback(intersects[0].object.name);
            }
        }
    };
}

var calculateOrbit = function(radialOffset,longitude ,latitude){
            return new THREE.Vector3(
                3*(I.place.getRadius()-radialOffset)*Math.cos(longitude)*Math.cos(latitude),
                3*(I.place.getRadius()-radialOffset)*Math.sin(latitude),
                3*(I.place.getRadius()-radialOffset)*Math.sin(longitude)*Math.cos(latitude));
	};
        
//--------------------------------------------------------------------------------
//SKYBOX
function makeSkyBox(){
        //Credit to http://www.ianww.com/blog/2014/02/17/making-a-skydome-in-three-dot-js/
        var geometry = new THREE.SphereGeometry(5000000, 60, 40);  
        var uniforms = {  
          texture: { type: 't', value: contentManager.getTexture('eso') }
        };

        var material = new THREE.ShaderMaterial( {  
          uniforms:       uniforms,
          vertexShader:   document.getElementById('sky-vertex').textContent,
          fragmentShader: document.getElementById('sky-fragment').textContent
        });

        var skyBox = new THREE.Mesh(geometry, material);  
        skyBox.scale.set(-1, 1, 1);  
        skyBox.rotation.set(0,Math.PI/2,0); //rotated to make poping of images less defined
        skyBox.eulerOrder = 'XZY';  
        skyBox.renderDepth = 1000.0;  
        return skyBox;
}
