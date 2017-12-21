/**
 * Class to handle the visualisation of the market
 */
function vwTrade(market){
    this.__proto__ = new vw();
    this.market = market;
    this.res1Selection = 0;
    this.setRes1Selection = function(){this.res1Selection=1;};
    this.unSetRes1Selection = function(){this.res1Selection=0;};
    this.makeTable = function(){
        return this.makeRes1Box()+ '<br />'+this.makeRes2Box()+ "<br />"+
                this.makeAmmount1Box()+this.makeAmmount2Box()+
                this.makeDoButton();
    };
    this.attatchListeners = function(controler){
        if(controler==""){console.warn("Controler not defined error in vwTrade.js");}
        var f = function(c){
            if(typeof(c)==="undefined"){console.error("its not working");}
            return function(){c.res1c();};
        }(controler);
        //attach onchange to resBox1
        $('#resBox1').on('change',f);
        //attach onchange to resBox2
        var f1 = function(c){
            if(typeof(c)==="undefined"){console.error("its not working");}
            return function(){c.res2c();};
        }(controler);
        $('#resBox2').on('change',f1);
        //attach onchange to ammountBox1
        var f2 = function(c){
            if(typeof(c)==="undefined"){console.error("its not working");}
            return function(){c.ammount1c();};
        }(controler);
        $('#ammountBox1').on('change',f2)
        //attach onchange to ammountBox2
        $('#ammountBox2')[0].change =function(){controler.ammount2c();};
        //attach onchange to doTradeButton
        $('#doTradeButton')[0].click(function(){controler.doClick();});
    };
    
    this.makeRes1Box = function(){
        var buyOptions = this.market.getBuyOptions();
        var options = buyOptions.map((a)=>{return {'id':'b'+a.getID(),
                'value':a.getID(),
                'string':a.getName()};});
        return this.makeSelect('resBox1',options);
    };
    this.updateRes1Box = function(){
        this.updateOuter('resBox1',this.makeRes1Box());
    };
   
    this.makeRes2Box = function(){
        var options;
        if(this.res1Selection){
            options = this.market.getSellOptions(this.getBuyResSelection());
        }else{
            options = this.market.getSellOptions(this.market.getBuyOptions()[0]);
        }
        options = options.map((a)=>{return {'id':'s' +a.getID(),
                'value':a.getID(),
                'string':a.getName()};});
        return this.makeSelect('resBox2',options) ;
    };
    this.updateRes2Box= function(){
        this.updateOuter('resBox2',this.makeRes2Box());
    };
    this.makeAmmount1Box = function(){
        return "<input type='number' id='ammountBox1' value='1' />";
    };
    this.makeAmmount2Box = function(){
        return "<input type='number' id='ammountBox2' value='1' /><br />";
    };
    this.makeDoButton = function(){
        return "<input type='button' id='doTradeButton' value='do'/><br />";
    };
    
    this.updateInner = function(id,html){
        this.elm(id).innerHTML=html;
    };
    this.updateOuter = function(id,html){
        this.elm(id).outerHTML=html;
    };
    this.updateValue = function(id,value){
        this.elm(id).value = value;
    };
    
    this.getBuyResSelection = function (){
        return new Resource(parseInt(this.elm('resBox1').value));
    };
    this.getSellResSelection = function (){
        return new Resource(parseInt(this.elm('resBox2').value));
    };
    this.getBuyAmmount = function(){return parseFloat(this.elm('ammountBox1').value);};
    this.getSellAmmount = function(){return parseFloat(this.elm('ammountBox2').value);};
    
    
}

