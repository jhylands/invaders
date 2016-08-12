/**
 * Class to handle the visualisation of the market
 */
function vwTrade(market){
    this.market = market;
    this.res1Selection = 0;
    this.makeTable = function(){
        return this.makeRes1Box()+this.makeRes2Box()+
                this.makeAmmount1Box()+this.makeAmmount2Box()+
                this.makeDoButton();
    };
    this.attatchListeners = function(controler){
        //attach onchange to resBox1
        document.getElementById('resBox1').addEventListener("change",controler.res1c);
        //attach onchange to resBox2
        document.getElementById('resBox2').addEventListener("change",controler.res2c);
        //attach onchange to ammountBox1
        document.getElementById('ammountBox1').addEventListener("change",controler.ammount1c);
        //attach onchange to ammountBox2
        document.getElementById('ammountBox2').addEventListener("change",controler.ammount2c);
        //attach onchange to doTradeButton
        document.getElementById('doTradeButton').addEventListener("click",controler.doClick);
    };
    
    this.makeRes1Box = function(){
        var options = this.market.resourceListToOption(this.market.getBuyOptions());
        return "<select id='resBox1'>" + options + "</select>";
    };
    this.makeRes2Box = function(){
        if(this.res1Selection){
            var options = this.market.resourceListToOption(this.market.getSellOptions(this.getBuyOption()));
            return "<select id='resBox2'>" + options + "</select><br />";
        }else{
            return "<select id='resBox2' enabled='false'><option>Resource</option></select><br />";
        }
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
    
}

