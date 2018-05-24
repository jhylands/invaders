function Channel(){
    this.buy;
    this.sell;
    this.rate;
    
    this.setFromObject = function(object){
        this.buy = new Resource(parseInt(object.buy));
        
        this.sell = new Resource(parseInt(object.sell));
        this.rate = parseFloat(object.rate);
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

