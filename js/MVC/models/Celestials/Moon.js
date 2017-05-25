function Moon(id){
    this.__proto__ = new Celestial(id);
    
    this.getFromServer = function(){
        $.ajax('i/get/place.php?id=' + this.getID());
    };
    
    /**
     * function to generate a planet from a query
     * @param {JQUERY} information
     * @returns {void}
     */
    this.fromPackage = function(information){
        this.__proto__.fromPackage(information);
        this.map = information.map;
    };
    
}
