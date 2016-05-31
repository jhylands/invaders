/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

{b= function(renderer,scene,camera,onready){
        //inherits from page class
        this.__proto__ = new Page();
        
        //class information
	this.name = "Map";
	this.id = 1;
        
        //global THREE references
	this.renderer = renderer;
	this.scene = scene;
	this.__camera = camera;
        
        //class variables
        this.planetNames = new Array('sun.jpg','planet1.png','venus.jpg','earth.jpg','mars.jpg','moon.jpg');
	this.planetPositions = {'x':new Array(-100,10,30,60,80,65),'z':new Array(0,0,0,0,0,20)};
	this.planetSizes = new Array(20,3,4,5,3,1);

        this.eventHandlers =[];
        
        //Finished loading variables
        this.ready = false;
        this.onready = onready;
        
        //page changing handshake
        this.change = false; //set to true if request page change.
        this.nextPage; //set to the id of the next page.
        //planet should adhear to JS-Planet standard
        this.planet = {"ID":"2","Name":"Venus","OrbitalRadius":"108200","InOrbitOf":"0","Temperature":"462","SurfaceGravity":"8.87","Radius":6052,"Map":{"IMG":"venus_img.jpg"}};
    
        
        
	//function to create page from nothing
	this.create = function(){
            	var planet = new Array();
                for(i=0;i<planetNames.length;i++){
                        planetGeometry = new THREE.SphereGeometry(this.planetSizes[i],32,32);
                        var planetTexture = new THREE.ImageUtils.loadTexture('images/' + this.planetNames[i]);
                        var planetMaterial = new THREE.MeshPhongMaterial({map:planetTexture});
                        planet[i] = new THREE.Mesh(planetGeometry,planetMaterial);
                        planetMaterial.map.WrapS = THREE.RepeatWrapping;
                        planetMaterial.map.WrapT = THREE.RepeatWrapping;
                        planet[i].position.set(this.planetPositions.x[i],0,this.planetPositions.z[i]);
                        planet[i].name = i;
                        this.scene.add(planet[i]);
                }
                
                var onDocumentMouseDown= function( event ) {
                    event.preventDefault();
                    var vector = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
                    projector.unprojectVector( vector, camera );
                    var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
                    var intersects = raycaster.intersectObjects( scene.children );
                    if ( intersects.length > 0 ) {
                        if(intersects[0].object.name!="sun.jpg" && intersects[0].object.name !=""){
                                window.location.replace('travel.php?PlaceID=' + intersects[0].object.name);
                        }
                    }
                }
                
		//Make an event listner for when the user click on the planet they want to travel to
                document.addEventListener( 'mousedown', onDocumentMouseDown, false );
                this.camera.position.set( 160, -20, 0 );//inishiation of camera
        
		//setup space station overlay
                //create user interface
                this.createUserInterface();
                //Notify that this function is ready to be run
                this.ready = true;
                this.onready(this.id);
                
	}
        
        //function to make the overlay html what is needed for this page
        this.createUserInterface = function(){
            document.getElementById('overlay').innerHTML = "";
        }

	
	//function to handle keyboard events
	this.keyboard= function(keyState){
		//no keyboard events for orbit
	}
	
	//function to update scene each frame
	this.update = function(){

	}

        this.reload = function(){
            //GENERATE THE FUNCTION TO BE PASSED TO THE REQUEST
            //create planet closure for access in the anonomous function passed to the http request
            var __planet = this.planet;
            //create id closure
            var __id = this.id;
            var funcDone = function(data){
                //This might be a souce of error if __planet just changes pointer
                __planet = JSON.parse(data);
                //need to use global reference as I don't as of yet understand javascript callback scoping
                __planet.create();
                onready(__id);
            };
            
            //CARRY OUT THE REQUEST
            //this.onready needs to be passed to the server function
            var onready = this.onready;
            //get information from server about current planet, lightitng ect
            $.ajax({url:"pages/orbit.php",post:"data:shipInfo"}).done(funcDone);
        }
	
};
}

