/* global __camera */

function MapAnimation(){
    //object at centre of scene
    this.core;
    //object at edge of scene
    this.outa;
    //field of view of camera
    this.FOV = __camera.fov;
    
    //vector 90deg to the the line core,outer and at 40deg to the plane x,z
    this.planeVector;
    
    this.cameraLookAt = this.outa.add(this.core.position,this.F.multiplyScalar(0.5));
    this.cameraPosition = this.core.add(this.F)
                                    .add(this.F.normalise().multiplyScalar(this.outa.radius))
                                    .add(this.F.appleMatrix(this.R).multiplyScalar(1/(2*Math.Cos(this.a))))
                                    .add(this.F.normalise().multiplyScalar(this.outa.radius/(Math.Sin(a)*Math.Cos(a))));
    /*s = this.core.position;
    F=this.outa.minus(this.core);
    r = this.outa.radius;
    R = rotation about 
    S+F+rF^+RF/2cosa+rF^/sinacosa;*/
    
    //vector from the center object to the outa object
    this.F=this.outa.minus(this.core);
    
    
}