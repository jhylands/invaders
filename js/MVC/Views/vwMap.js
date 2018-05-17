function vwMap(){
    this.__proto__ = new vw();
    this.ambient = new THREE.AmbientLight( 0xAAAAAA ); // soft white light
    
    this.create = function(){
        //fucntion to handle the visual creation aspects from the conMap class
        //add ambiant light to the scene as orbit will remove the sunlamp
        __scene.add(this.ambient);
        //add planets to the scene
        this.addPlanetsToScene();
        this.createUserInterface();
        //inishiation of camera
        __camera.position.set( I.place.OrbitalRadius,  0,I.place.radius*3 );
        this.x = 0;
        this.y = 0;
        this.z = I.place.getRadius()*3;
        //setup space station overlay
        //create user interface
        this.createUserInterface();
        __camera.lookAt(new THREE.Vector3(0,0,0));
    };
    this.update = function(){};

    /*
    Void function to add all the celestial bodies to the scene*/
    this.addPlanetsToScene = function(){
        //create a curried function to add elements to the scene
        var curriedPlanetAdder = function(celestialThreeObject){
            return function(){
                __scene.add(celestialThreeObject);
            };
        };
        
        I.system.recurseThroughSystems(curriedPlanetAdder);
    };

    //function to make the overlay html what is needed for this page
    this.createUserInterface = function(){
        document.getElementById('overlay').innerHTML = "<p>Click on destination</p>";
    };
}
