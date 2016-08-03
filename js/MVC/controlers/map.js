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
	this.camera = camera;
        
        //class variables
        this.planetNames = new Array('sun.jpg','mercury_img.jpg','venus_img.jpg','earth_img.jpg','mars_img.jpg','moon_img.jpg');
	this.planetPositions = {'x':new Array(-100,0,9000,21000,30000,25000),'z':new Array(0,0,0,0,0,20)};
	this.planetSizes = new Array(20,2440,6052,6371,3390,1);
        //this.projector = new THREE.Projector;
        this.eventHandlers =[];
        this.inAnimation = 1;
        
        //Finished loading variables
        this.ready = false;
        this.onready = onready;
        
        //page changing handshake
        this.change = false; //set to true if request page change.
        this.nextPage; //set to the id of the next page.
        //planet should adhear to JS-Planet standard
        this.planet = {"ID":"2","Name":"Venus","OrbitalRadius":"108200","InOrbitOf":"0","Temperature":"462","SurfaceGravity":"8.87","Radius":6052,"Map":{"IMG":"venus_img.jpg"}};
        this.threePlanets=[];
        
        
	//function to create page from nothing
	this.create = function(from){
            //from orbit
            this.ambient = new THREE.AmbientLight( 0xAAAAAA ); // soft white light
            this.scene.add(this.ambient);
                for(i=1;i<=this.planetNames.length;i++){
                        this.threePlanets[i] = this.makePlanet({'Map':{'IMG':this.planetNames[i]},'Radius':this.planetSizes[i]});
                        this.threePlanets[i].position.set(this.planetPositions.x[i],0,this.planetPositions.z[i]);
                        this.threePlanets[i].name = i;
                        this.scene.add(this.threePlanets[i]);
                }
                
                //function needs updating for the lates three.js
                //it also needs a closure
                var self=this;
                var onDocumentMouseDown= function( event ) {
                    event.preventDefault();
                    var vector = new THREE.Vector2( ( event.clientX / window.innerWidth ) * 2 - 1,
                    - ( event.clientY / window.innerHeight ) * 2 + 1);
                    
                    var raycaster = new THREE.Raycaster();
                    raycaster.setFromCamera(vector,camera)
                    var intersects = raycaster.intersectObjects( scene.children );
                    if ( intersects.length > 0 ) {
                        if(intersects[0].object.name!="sun.jpg" && intersects[0].object.name !=""){
                                self.travel(intersects[0].object.name);
                        }
                    }
                }
                
		//Make an event listner for when the user click on the planet they want to travel to
                document.addEventListener( 'mousedown', onDocumentMouseDown, false );
                this.camera.position.set( this.planetPositions.x[2],  0,this.planet.Radius*3 );//inishiation of camera
                this.x = this.planetPositions.x[2];
                this.z = this.planet.Radius*3;
		//setup space station overlay
                //create user interface
                this.createUserInterface();
                this.camera.lookAt(new THREE.Vector3(this.planetPositions.x[2],0,0));
                //Notify that this function is ready to be run
                this.ready = true;
                this.onready(this.id);
                
	}
        this.destroy = function(){
            this.scene.remove(this.ambient);
            for(var i=0;i<this.threePlanets.length;i++){
                this.scene.remove(this.threePlanets[i]);
            }
        }
        //function to make the overlay html what is needed for this page
        this.createUserInterface = function(){
            document.getElementById('overlay').innerHTML = "<p>Click on destination</p>";
        }
	this.keyboard= function(keyState){
		//no keyboard events for orbit
	}
	this.travel = function(location){
            //idk
            //need to go back to orbit at some point
            this.makeChanger(this,0)();
        }
	//function to update scene each frame
	this.update = function(){
            if(this.inAnimation==1){
                if(this.z<this.planet.Radius*3+6*60*100){
                    this.camera.position.set(this.x,0,this.z);
                    this.z+=100;
                }else{
                    this.inAnimation=2;//0;
                }
            }else if(this.inAnimation==2){
                if(this.z>this.planet.Radius*3){
                    this.camera.position.set(this.x,0,this.z);
                    this.z=100;
                }else{
                    //back to orbit
                }
            }
                
            
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

