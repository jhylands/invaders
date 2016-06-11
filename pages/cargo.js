//cargo class file
 
{a = function (renderer,scene,camera,onready){
        //inherits from page class
        this.__proto__ = new Page();
        
        //class information
	this.name = "Cargo";
	this.id = 2;
        
        //global THREE references
	this.renderer = renderer;
	this.scene = scene;
	this.__camera = camera;
        
        //Finished loading variables
        this.ready = false;
        this.onready = onready;
        
        //page changing handshake
        this.change = false; //set to true if request page change.
        this.nextPage; //set to the id of the next page.
        //planet should adhear to JS-Planet standard
        this.planet = {"ID":"2","Name":"Venus","OrbitalRadius":"108200","InOrbitOf":"0","Temperature":"462","SurfaceGravity":"8.87","Radius":6052,"Map":{"IMG":"venus_img.jpg"}};
    
        this.create = function(from){
            switch(from){
                case 0:
                    //from orbit
                    this.constructFromOrbit();
                    break;
            }
            this.ready = true;
            this.onready(this.id);
        };
        this.constructFromOrbit = function(){
            //create overlay
            this.makeSTDOverlay("<h1>Cargo</h1><input type='button' id='bk2o' value='Back to orbit' />");
            //add event listeners
            var func = this.makeChanger(this,0);
            document.getElementById('bk2o').addEventListener("click",func);
        }
        this.backToOrbit = function(){
            this.change = true;
            this.nextPage = 0;
        };
        
        
};
}