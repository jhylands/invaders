function conTrade(){
        //inherits from page class
        this.__proto__ = new Page();
        
        //class information
	this.name = "Orbit";
	this.id = 0;
        
        
        //class variables
	this.orbitPos = Math.PI/2;
        this.eventHandlers =[];
        
        //Finished loading variables
        this.ready = false;
        this.onready = onPageReady
        
        //page changing handshake
        this.change = false; //set to true if request page change.
        this.nextPage; //set to the id of the next page.
        this.create = function(from){
            switch(from){
                case 0:
                    //from orbit
                    var self = this;
                    this.constructFromOrbit();
                    this.hold.update(function(){self.updateTable();});
                    this.findPlanet();
                    break;
            }
            this.ready = true;
            this.onready(this.id);
        };
        this.constructFromOrbit = function(){
            //create overlay
            this.makeSTDOverlay("<h1>Trade floor</h1><input type='button' id='bk2o' value='Back to orbit' />");
            //add event listeners
            var func = this.makeChanger(this,0);
            document.getElementById('bk2o').addEventListener("click",func);
        };
        this.keyboard= function(keyState){};
        this.update = function(){
            this.threePlanet.rotation.y += 0.0001;
        };
}