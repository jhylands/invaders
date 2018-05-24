/* global tests */
//try do it with jasmine 
//beforeEach()=>{
//    Describes('vwTrade',()=>{
//        it('')
//    })
//}







tests.vwTrade = function(){
    /**
     * Function to test vwTrade class
     */
    //if(!this.MarketTest()){console.warn('Market test failed, vwTest has no meaning!');}
    
    //create a market 
    var market = new Market();
    market.fromChannels(makeChannels());
    var view = new vwTrade(market);
    var test={};
    //test the creation of the the boxes
    test.box1 = view.makeRes1Box()===`<select id="resBox1"><option id='2' value='2'>Helium</option><option id='3' value='3'>Metal</option><option id='4' value='4'>Urainium</option></select><br />`;
    test.box2 = view.makeRes2Box()===`<select id="resBox2"><option id='2' value='2'>Helium</option><option id='3' value='3'>Metal</option><option id='4' value='4'>Urainium</option></select><br />`;
    test.abox1 = view.makeAmmount1Box()===`<input type='number' id='ammountBox1' value='1' />`;
    test.abox2 = view.makeAmmount2Box()===`<input type='number' id='ammountBox2' value='1' /><br />`;
    test.dobut = view.makeDoButton()==="<input type='button' id='doTradeButton' value='do'/><br />";
    test.table = view.makeTable()===`<select id="resBox1"><option id='2' value='2'>Helium</option><option id='3' value='3'>Metal</option><option id='4' value='4'>Urainium</option></select><br /><select id="resBox2"><option id='2' value='2'>Helium</option><option id='3' value='3'>Metal</option><option id='4' value='4'>Urainium</option></select><br /><input type='number' id='ammountBox1' value='1' /><input type='number' id='ammountBox2' value='1' /><br /><input type='button' id='doTradeButton' value='do'/><br />`;
    if(test.box1&&
            test.box2&&
            test.abox1&&
            test.abox2&&
            test.dobut&&
            test.table)
    {console.log('vwTrade element generation passed');}
    else
    {console.error('vwTrade element generation error!' + JSON.stringify(test));}
    
    //draw on page for next few tests
    var p = new Page();
    p.makeSTDOverlay(view.makeTable());
    
    //test the ability to recall from the boxes
    //clear test
    test = {};
    
    test.buySel = (new Resource(2)).eq(view.getBuyResSelection());
    test.buya = view.getBuyAmmount()===1;
    test.sella = view.getSellAmmount()===1;
    test.sellSel = (new Resource(2)).eq(view.getSellResSelection());
    
    if(test.buySel&&
            test.buya&&
            test.sella&&
            test.sellSel)
    {console.log('vwTrade data from form test passed!');}
    else
    {console.error('vwTrade data from form test Failed!' + JSON.stringify(test));   }
    p.makeSTDOverlay('');
    
};
