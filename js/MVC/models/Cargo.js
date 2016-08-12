function Cargo(id,amount){
    this.getName = function(){return this.name;};
    this.getAmmount = function(){return this.amount;};
    this.getID = function(){return this.id;};
    this.names = ['','','Helium','Metal','Urainium']
    this.amount = amount;
    this.id=id;
    this.name = this.names[this.id];
    /**
     * 
     * @returns {String} 
     */
    this.toString = function(){return this.name + ": " + this.amount + this.getDrop();};
    
    this.getDrop = function(){
        return "<a href='i/do/drop.php?id=" + this.id + "'>Drop</a>";
    };
}


