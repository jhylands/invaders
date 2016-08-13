/**
 * Class to handle the visualisation of the market
 */
function vwTrade(market){
    this.__proto__ = new vw();
    this.market = market;
    this.res1Selection = 0;
    this.setRes1Selection = function(){this.res1Selection=1;};
    this.makeTable = function(){
        return this.makeRes1Box()+this.makeRes2Box()+
                this.makeAmmount1Box()+this.makeAmmount2Box()+
                this.makeDoButton();
    };
    this.attatchListeners = function(controler){
        //attach onchange to resBox1
        this.elm('resBox1').addEventListener("change",function(){controler.res1c();});
        //attach onchange to resBox2
        this.elm('resBox2').addEventListener("change",function(){controler.res2c();});
        //attach onchange to ammountBox1
        this.elm('ammountBox1').addEventListener("change",function(){controler.ammount1c();});
        //attach onchange to ammountBox2
        this.elm('ammountBox2').addEventListener("change",function(){controler.ammount2c();});
        //attach onchange to doTradeButton
        this.elm('doTradeButton').addEventListener("click",function(){controler.doClick();});
    };
    
    this.makeRes1Box = function(){
        var options = this.makeInnerRes1Box();
        return "<select id='resBox1'>" + options + "</select>";
    };
    this.makeInnerRes1Box = function(){
        return this.market.resourceListToOption(this.market.getBuyOptions());
    };
    this.makeRes2Box = function(){
        var options;
        if(this.res1Selection){
            options = this.makeInnerRes2Box();
        }else{
            options = this.market.resourceListToOption(this.market.getSellOptions(this.market.getBuyOptions()[0]));
        }
        return "<select id='resBox2'>" + options + "</select><br />";
    };
    this.makeInnerRes2Box = function (){
        return this.market.resourceListToOption(this.market.getSellOptions(this.getBuyResSelection()));
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
    
    this.getBuyResSelection = function (){
        return new Resource(this.elm('resBox1').value);
    };
    this.getSellResSelection = function (){
        return new Resource(this.elm('resBox2').value);
    };
    
    
}

