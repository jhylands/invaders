function Cargo(resource,ammount){
    this.resource = resource;
    this.ammount = ammount;
    this.getResource = function(){return this.resource;};
    this.getAmmount = function(){return this.ammount;};
    this.getName = function(){return this.resource.getName();};
    this.getDrop = function(){
        return "<a href='i/do/drop.php?id=" + this.resource.getID() + "'>Drop</a>";
    };
    this.toString = function(){
        return this.resource + this.getDrop();
    }
}