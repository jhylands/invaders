

/* global __camera, __scene, THREE, I */

function conMap(){
    //inherits from page class
    this.__proto__ = new Page();
    
    //class information
	this.name = "Map";
	this.id = 1;
    
    //global THREE references
    /* I should be the only global now */	
	
	
    
    //class variables
    this.planetNames = new Array('sun.jpg','Mercury.jpg','venus_img.jpg','earth_img.jpg','mars_img.jpg','moon_img.jpg');
	this.planetPositions = {'x':new Array(-100,0,9000,21000,30000,25000),'z':new Array(0,0,0,0,0,20)};
	this.planetSizes = new Array(20,2440,6052,6371,3390,1);
    
    //this.projector = new THREE.Projector;
    this.eventHandlers =[];
    this.inAnimation = 1; //what does this mean, can we have a table explaining 
    
    this.ambient = new THREE.AmbientLight( 0xAAAAAA ); // soft white light
    
    //Finished loading variables
    this.ready = false;
    this.onready = onPageReady;
    this.onDocumentMouseDown;
    
    //page changing handshake
    this.change = false; //set to true if request page change.
    this.nextPage; //set to the id of the next page.
    //planet should adhear to JS-Planet standard

    this.threePlanets=[];
        
        
	//function to create page from nothing
	this.create = function(from){
        //from orbit
        //this.inAnimation=1;
        //add ambiant light to the scene as orbit will remove the sunlamp
        __scene.add(this.ambient);
        
        //add planets to the scene
        this.addPlanetsToScene();
            
        //create click eventhandler and keep a local reference
        var self=this;
        this.onDocumentMouseDown= makeClickHandler(self.travel);

        //Make an event listner for when the user click on the planet they want to travel to
        document.addEventListener( 'mousedown', this.onDocumentMouseDown, false );
        
        //inishiation of camera
        __camera.position.set( this.planetPositions.x[I.place.getID()],  0,I.place.Radius*3 );
        this.x = this.planetPositions.x[I.place.getID()];
        this.y = 0;
        this.z = I.place.getRadius()*3;
        //setup space station overlay
        //create user interface
        this.createUserInterface();
        __camera.lookAt(new THREE.Vector3(0,0,0));
        //Notify that this function is ready to be run
        this.ready = true;
        this.onready(this.id);
            
	};

    /*
    Void function to add all the celestial bodies to the scene*/
    this.addPlanetsToScene = function(){
        //create a curried function to add elements to the scene
        var curriedPlanetAdder = function(celestialThreeObject){
            return function(){__scene.add(celestialThreeObject);};
        };
        
        I.system.recurseThroughSystems(curriedPlanetAdder);
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
        //there is no animation to start with we are just
        //trying to get the initial setup working            
            
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

