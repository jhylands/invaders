//top level class for ships
function Ship(){
    /**
     * Function returns the three object of the ship
     */
    this.getThree = function(){console.log('Abstract function getThree not overwritten!');};
    //this.getThree = function(){return this.object;};
    /**
     * Function to handle any updates to the ship that should occurer every update
     * @returns void
     */
    this.update = function(){console.log('Abstract function update not overwritten!');};
    /**
     * Function to handle updates from keystate
     * @returns void
     */
    this.keyboard = function(keystate){console.log('Abstract function keyboard not overwritten!');};
    
    
}