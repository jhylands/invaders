function Cargo(id,amount){
    this.names = ['','','Helium','Metal','Urainium']
    this.amount = amount;
    this.id=id;
    this.name = this.names[this.id];
    /**
     * 
     * @returns {String} 
     */
    this.toString = function(){return this.name + ": " + this.amount;};
}


