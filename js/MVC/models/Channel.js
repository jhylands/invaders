function Channel(){
    this.buyRe;
    this.buyRa;
    this.sellRa;
    this.sellRe;
    
    this.setFromObject = function(object){
        this.buyRe = new Resource(object.buy[0]);
        this.buyRa = object.buy[1];
        
        this.sellRe = new Resource(object.sell[0]);
        this.sellRa = object.sell[1];
    }
    
    this.getSellResource = function(){return this.sellRe;};
    this.getBuyResource = function(){return this.buyRe;};
    this.getRate = function(){return this.sellRa;};
    
}