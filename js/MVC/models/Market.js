/* global math */

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
        if(typeof(channels)!=typeof([])){console.error('channel type incorrect');}
        this.channels = channels;
        return this;
    }
    /**
     * Function takes a list of obj representing channels
     * @param {obj} channels
     * @returns {undefined}
     */
    this.fromChannelsObj = function(channels){
        for(i=0;i<channels.length;i++){
            var tmpChannel = new Channel();
            tmpChannel.setFromObject(channels[i]);
            this.channels.push(tmpChannel);
        }
        return this;
    };
    
    //i think there is a better way of making ths
    this.toString = function(){
        return "<select id='buyResList'>" + this.resourceListToOptions(this.getBuyOptions()) + "</select>" + 
                "<select id='sellResList'>" +  this.resourceListToOptions(this.getSellOptions())+"</select>";
    };
    
    /**
     * Function to take make a list of the buying option at this location
     * @param {resource}
     * @returns {undefined}
     */
    this.getBuyOptions = function(sellResource){
        if(typeof(sellResource)!==typeof(new Resource(0))){
            var ids = new Set(this.channels.map((a)=>a.getSellResource().getID()));
            return Array.from(ids).map((a)=>new Resource(a));
            console.error('sellResource not Resource. It must be in getBuyOptions');
        }
        //the bitstring of if the channel sells the resource
        var bits = this.channels.map((a)=>{return a.getSellResource().eq(sellResource);});
        //the list of buy resources from the channels
        var resources = this.channels.map((a)=>{return a.getBuyResource().getID();});
        //set of ids from the matrix dot of the resouces and the bits. Difference the zero
        var options = new Set(math.dotMultiply(bits,resources).filter((a)=>a!==0));
        //Array of resources from that set of ids
        return Array.from(options).map((a)=>{return (new Resource(a));});
    };
    this.getSellOptions = function(buyResource){
        if(typeof(buyResource)!==typeof(new Resource(0))){
           var ids = new Set(this.channels.map((a)=>a.getSellResource().getID()));
           return Array.from(ids).map((a)=>new Resource(a));
        }
        //the bitstring of if the channel sells the resource
        var bits = this.channels.map((a)=>{return a.getBuyResource().eq(buyResource);});
        //the list of buy resources from the channels
        var resources = this.channels.map((a)=>{return a.getSellResource().getID();});
        //set of ids from the matrix dot of the resouces and the bits. Difference the zero
        var options = new Set(math.dotMultiply(bits,resources).filter((a)=>a!==0));
        //Array of resources from that set of ids
        return Array.from(options).map((a)=>{return (new Resource(a));});
    };
    this.resourceListToOptions = function(resources){
        resourceToOption = function (resource){
            return "<option id='" + resource.getID() + "' value='" + resource.getID() + "'>" + resource.getName() + "</option>";
        };
        return resources.map(resourceToOption).reduce((a,b)=>a+b);
    };
    this.getRate = function(buy,sell){
        /**
         var c = this.channels;
        //buy resouce bt string
        var b= c.map((a)=>a.getBuyResource().eq(buy));
        //sell resoucrce bit string
        var s= c.map((a)=>a.getSellResource().eq(sell));
        //rates
        var r= c.map((a)=>a.getRate());
        // c.b.s
        var rate = math.sum(math.dotMultiply(math.dotMultiply(b,s),r));
        
        if(rate!==0){
            return rate;
        }*/
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
