//the market should be just a collection of channels
//can we push the side effects, (update) to another location so the class becomes 'pure'
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
    
    /**
     * Function take a list of channels
     * 
     * Changes the state of the market to the set of those channels
     * @param {channel[]} channels
     * 
     */
    this.fromChannels = function(channels){
        for(i=0;i<channels.length;i++){
            var tmpChannel = new Channel();
            tmpChannel.setFromObject(channels[i]);
            this.channels.push(tmpChannel);
        }
    };
    
    //i think there is a better way of making ths
    this.toString = function(){
        return "<select id='buyResList'>" + this.resourceListToOptions(this.getBuyOptions()) + "</select>";
    };
    
    /**
     * Function to take make a list of the buying option at this location
     * @param {resource}
     * @returns {undefined}
     */
    this.getBuyOptions = function(sellResource){
        var options = [];
        //loop through all the channels and ask
        //can this resource be bought with the one being sold
        //has this resource already been included on this list 
        //this needs a better method
        for(var i=0;i<this.channels.length;i++){
            var resource = this.channels[i].getBuyResource();
            var canBuy = this.channels[i].getSellResource() === sellResource;
            if(!options.includes(resource) && canBuy){
                options.push(resource);
            }
        }
        return options;
    };
    this.getSellOptions = function(){
        var options = [];
        for(var i=0;i<this.channels.length;i++){
            var resource = this.channels[i].getSellResource();
            if(!options.includes(resource)){
                options.push(resource);
            }
        }
        return options;
    };
    this.resourceListToOptions = function(resources){
        var list = "";
        for(var i=0;i<resources.length;i++){
            list = list + "<option id='" + resources[i].getID() + "' value='" + resources[i].getID() + "'>" + resources[i].getName() + "</option>";
        }
        return list;
    };
    this.getRate = function(buy,sell){
        for(i=0;i<this.channels.length;i++){
            if(this.channels[i].getBuyResource().eq(buy) &&
                    this.channels[i].getSellResource().eq(sell)){
                return this.channels[i].getRate();
            }
        }
        console.log('Channel requested doesn\'t exist');
        return false;
    }
}
