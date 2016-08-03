function conShipYard(){
            //inherits from page class
        this.__proto__ = new Page();
        
        //class information
	this.name = "ShipYard";
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
        
}