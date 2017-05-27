/* global THREE, __camera, __scene */

function makeClickHandeler(callback){
    return function ( event ) {
        event.preventDefault();
        var vector = new THREE.Vector2( ( event.clientX / window.innerWidth ) * 2 - 1,
        - ( event.clientY / window.innerHeight ) * 2 + 1);

        var raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(vector,__camera);
        var intersects = raycaster.intersectObjects( __scene.children );
        if ( intersects.length > 0 ) {
            if(intersects[0].object.name!=="sun.jpg" && intersects[0].object.name !==""){
                    callback(intersects[0].object.name);
            }
        }
    };
}