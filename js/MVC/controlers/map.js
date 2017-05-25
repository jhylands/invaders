

/* global __camera, __scene, THREE, place */

function conMap(){
        //inherits from page class
        this.__proto__ = new Page();
        
        //class information
	this.name = "Map";
	this.id = 1;
        
        //global THREE references
	
	;
	
        
        //class variables
        this.planetNames = new Array('sun.jpg','Mercury.jpg','venus_img.jpg','earth_img.jpg','mars_img.jpg','moon_img.jpg');
	this.planetPositions = {'x':new Array(-100,0,9000,21000,30000,25000),'z':new Array(0,0,0,0,0,20)};
	this.planetSizes = new Array(20,2440,6052,6371,3390,1);
        //this.projector = new THREE.Projector;
        this.eventHandlers =[];
        this.inAnimation = 1;
        this.ambient = new THREE.AmbientLight( 0xAAAAAA ); // soft white light
        //Finished loading variables
        this.ready = false;
        this.onready = onPageReady
        this.onDocumentMouseDown;
        
        //page changing handshake
        this.change = false; //set to true if request page change.
        this.nextPage; //set to the id of the next page.
        //planet should adhear to JS-Planet standard

        this.threePlanets=[];
        
        
	//function to create page from nothing
	this.create = function(from){
            //from orbit
            this.inAnimation=1;
            __scene.add(this.ambient);
            for(i=1;i<=this.planetNames.length;i++){
                    this.threePlanets[i] = this.makePlanet({'Map':{'IMG':this.planetNames[i]},'Radius':this.planetSizes[i]});
                    this.threePlanets[i].position.set(this.planetPositions.x[i],0,this.planetPositions.z[i]);
                    this.threePlanets[i].name = i;
                    __scene.add(this.threePlanets[i]);
            }
                
                //function needs updating for the lates three.js
                //it also needs a closure
                var self=this;
                this.onDocumentMouseDown= function( event ) {
                    event.preventDefault();
                    var vector = new THREE.Vector2( ( event.clientX / window.innerWidth ) * 2 - 1,
                    - ( event.clientY / window.innerHeight ) * 2 + 1);
                    
                    var raycaster = new THREE.Raycaster();
                    raycaster.setFromCamera(vector,__camera)
                    var intersects = raycaster.intersectObjects( __scene.children );
                    if ( intersects.length > 0 ) {
                        if(intersects[0].object.name!="sun.jpg" && intersects[0].object.name !=""){
                                self.travel(intersects[0].object.name);
                        }
                    }
                };
                
		//Make an event listner for when the user click on the planet they want to travel to
                document.addEventListener( 'mousedown', this.onDocumentMouseDown, false );
                __camera.position.set( this.planetPositions.x[place['ID']],  0,place.Radius*3 );//inishiation of camera
                this.x = this.planetPositions.x[place['ID']];
                this.z = place.Radius*3;
		//setup space station overlay
                //create user interface
                this.createUserInterface();
                __camera.lookAt(new THREE.Vector3(this.planetPositions.x[place['ID']],0,0));
                //Notify that this function is ready to be run
                this.ready = true;
                this.onready(this.id);
                
	};
        this.destroy = function(page){
            //this is called twice just before the error occures
            
            console.log("going to " + page + " see yo soon");
            __scene.remove(this.ambient);
            for(var i=0;i<this.threePlanets.length;i++){
                __scene.remove(this.threePlanets[i]);
            }
            document.removeEventListener('mousedown',this.onDocumentMouseDown);
        };
        //function to make the overlay html what is needed for this page
        this.createUserInterface = function(){
            document.getElementById('overlay').innerHTML = "<p>Click on destination</p>";
        };
	this.keyboard= function(keyState){
		//no keyboard events for orbit
	};
	this.travel = function(location){
            var changingFunction = this.makeChanger(this,0);
            $.ajax('i/do/travel.php?to=' + location).done(function(){
                updatePlace(changingFunction);
            });
            
        };
	//function to update __scene each frame
	this.update = function(){
            if(this.inAnimation==1){
                if(this.z<place.Radius*3+6*60*100){
                    __camera.position.set(this.x,0,this.z);
                    this.z+=100;
                }else{
                    this.inAnimation=2;//0;
                }
            }else if(this.inAnimation==2){
                if(this.z>place.Radius*3){
                    __camera.position.set(this.x,0,this.z);
                    this.z=100;
                }else{
                    //back to orbit
                }
            }
                
            
	};

        this.reload = function(){
            //GENERATE THE FUNCTION TO BE PASSED TO THE REQUEST
            //create planet closure for access in the anonomous function passed to the http request
            var __planet = place;
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
        };
	
}

