function Planet(id){
    this.__proto__ = new Celestial(id);
    
    this.getFromServer = function(){
        $.ajax('i/get/place.php?id=' + this.getID());
    };
    
}


