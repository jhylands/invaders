function Market(){
    // TradeChannel()
    this.channels = [];
    
    this.update = function(callback){
        this.callback = callback;
        var self = this;
        $.ajax({url:'i/get/market.php',async:false}).done(
                function(data){
                    self.results=data;
                    self.updateData(self.results);
                });
    };
    this.updateData = function(data){
        this.data = JSON.parse(data);
        var channels = this.data.channels;
        for(i=0;i<channels.length;i++){
            var tmpChannel = new Channel();
            tmpChannel.setFromObject(channels[i]);
            this.channels.push(tmpChannel);
        }
        this.callback();
    };
    
    //i think there is a better way of making ths
    this.toString = function(){
        return "<select id='buyResList'>" + this.resourceListToOptions(this.getBuyOptions()) + "</select>";
    };
    
    /**
     * Function to take make a list of the buying option at this location
     * @returns {undefined}
     */
    this.getBuyOptions = function(){
        var options = [];
        for(var i=0;i<this.channels.length;i++){
            options.push(this.channels[i].getBuyResource());
        }
        return options;
    };
    this.getSellOptions = function(buyOption){
        var options = [];
        for(var i=0;i<this.channels.length;i++){
            if(this.channels[i].getBuyResource().eq(buyOption)){
                options.push(this.channels[i].getSellResource());
            }
        }
    };
    this.resourceListToOption = function(resources){
        var list = "";
        for(var i=0;i<resources.length;i++){
            list = list + "<option id='" + resources[i].getID() + "'>" + resources[i].getName() + "</option>";
        }
        return list;
    };
}
