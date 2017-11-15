function Channel(){
    this.buy;
    this.sell;
    this.rate;
    
    this.setFromObject = function(object){
        this.buy = new Resource(object.buy);
        
        this.sellRe = new Resource(object.sell);
        this.rate = object.rate;
        return this;
    };
    
    this.setFromIDs = function(buy,sell,rate){
        this.buy = new Resource(buy);
        this.sell = new Resource(sell);
        this.rate = rate;
        return this;
    };
    
    this.getSellResource = function(){return this.sell;};
    this.getBuyResource = function(){return this.buy;};
    this.getRate = function(){return this.rate;};
    
}

