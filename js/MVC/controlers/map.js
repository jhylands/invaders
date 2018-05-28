

/* global __camera, __scene, THREE, I,onPageReadt,$,makeClickHandler */

function conMap(){
    //inherits from page class
    this.__proto__ = new Page();
    this.view = new vwMap();
    this.animation = new MapAnimation();
    //class information
	this.name = "Map";
	this.id = 1;
    
    //this.projector = new THREE.Projector;
    this.eventHandlers =[];
    
    //Finished loading variables
    this.ready = false;
    this.onready = onPageReady;
    this.onDocumentMouseDown;
    
    //page changing handshake
    this.change = false; //set to true if request page change.
    this.nextPage; //set to the id of the next page.
    //planet should adhear to JS-Planet standard

        
        
	//function to create page from nothing
	this.create = function(from){
        //from orbit
        //create the visual aspects
        this.view.create();
        
        //create the animation aspects
        this.animation.create(); 
            
        //create click eventhandler and keep a local reference
        var self=this;
        this.onDocumentMouseDown= makeClickHandler(self.travelMaker());

        //Make an event listner for when the user click on the planet they want to travel to
        document.addEventListener( 'mousedown', this.onDocumentMouseDown, false );
        
        //Notify that this function is ready to be run
        this.ready = true;
        this.onready(this.id);
	};

    this.destroy = function(page){
        //this is called twice just before the error occures
        
        console.log("going to " + page + " see yo soon");
        this.view.destroy(page);
        document.removeEventListener('mousedown',this.onDocumentMouseDown);
    };
	this.keyboard= function(keyState){
		//no keyboard events for orbit
	};
    this.travelMaker = function(){
        var self = this;
        var travel = function(location){
            var changingFunction = self.makeChanger(self,0);
            $.ajax('i/do/travel.php?to=' + location).done(function(){
                updatePlace(changingFunction);
            });
        };
        return travel;
    };
	//function to update __scene each frame
	this.update = function(){
        //there is no animation to start with we are just
        //trying to get the initial setup working            
        this.view.update();
        this.animation.update();
            
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

