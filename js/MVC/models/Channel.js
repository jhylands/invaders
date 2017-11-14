function Channel(){
    this.buy;
    this.sell;
    this.rate;
    
    this.setFromObject = function(object){
        this.buy = new Resource(object.buy);
        
        this.sellRe = new Resource(object.sell);
        this.rate = object.rate;
    };
    
    this.getSellResource = function(){return this.sell;};
    this.getBuyResource = function(){return this.buy;};
    this.getRate = function(){return this.rate;};
    
}