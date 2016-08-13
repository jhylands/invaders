function conTrade(){
        //inherits from page class
        this.__proto__ = new Page();
        
        //class information
	this.name = "Combat";
	this.id = 3;
        this.market = new Market();
        this.view = new vwTrade(this.market);
        
        //class variables
	this.orbitPos = Math.PI/2;
        this.eventHandlers =[];
        
        //Finished loading variables
        this.ready = false;
        this.onready = onPageReady
        
        //page changing handshake
        this.change = false; //set to true if request page change.
        this.nextPage; //set to the id of the next page.
        this.create = function(from){
            switch(from){
                case 0:
                    //from orbit
                    var self = this;
                    this.constructFromOrbit();
                    this.market.update(function(){self.updateTable();});
                    this.findPlanet();
                    break;
            }
            this.ready = true;
            this.onready(this.id);
        };
        this.constructFromOrbit = function(){
            //create overlay
            this.makeSTDOverlay("<h1>Trade floor</h1><input type='button' id='bk2o' value='Back to orbit' />");
            //add event listeners
            var func = this.makeChanger(this,0);
            document.getElementById('bk2o').addEventListener("click",func);
        };
        this.keyboard= function(keyState){};
        this.update = function(){
            this.threePlanet.rotation.y += 0.0001;
        };
        
        this.updateTable = function (){
            //create overlay
            this.makeSTDOverlay("<h1>Trade floor</h1>" + this.view.makeTable() +"<input type='button' id='bk2o' value='Back to orbit' />");
            //add event listeners
            var func = this.makeChanger(this,0);
            document.getElementById('bk2o').addEventListener("click",func);
            this.view.attatchListeners(this);
        };
        
        this.res1c = function (){
            //update the inner HTML of the other selection
            this.view.setRes1Selection();
            //how you going to update it without rewening the users selection?
            this.view.updateInner('resBox2',this.view.makeInnerRes2Box());
        };
        this.res2c = function (){
            this.view.seRes2Selection();
            //check ammount2 
        };
        this.ammount1c = function(){
            //change ammount 2
        };
        this.ammount2c = function(){
            //change ammount 1
        };
        this.doClick = function(){
            var self = this;
            //check if ammount 1 to 2 is correct
            var buyRe = this.view.getBuyResSelection();
            var sellRe = this.view.getSellResSelection();
            var ammount = this.view.getBuyAmmount();
            if(ammount/this.view.getSellAmmount() == this.market.getRate(buyRe,sellRe)){
                //do trade
                $.ajax({url:'i/do/trade.php?buyRe=' + buyRe + "&sellRe=" + sellRe + "&BuyAmmount=" + ammount}).done(self.tradeCallback);
            }else{
                alert('Ammount boxes don\'t match');
            }
        };
        
        this.tradeCallback = function(data){
            if(JSON.parse(data)){
                alert('Trade complete');
            }else{
                alert(data);
            }
        }
}