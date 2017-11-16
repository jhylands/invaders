function Resource(id){
    if(typeof(id)!=typeof(1)){
        console.error('Resource production from invalid ID!' + id);
    }
    this.getName = function(){return this.name;};
    this.getID = function(){return this.id;};
    this.names = ['','','Helium','Metal','Urainium']
    this.id=id;
    this.name = this.names[this.id];
    //this.code = this.codes[this.id];
    /**
     * 
     * @returns {String} 
     */
    this.toString = function(){return this.name + ": " + this.code;};
    this.eq = function(resource){
        return resource.getID()===this.getID();
    };
    
}


