/* global tests, math */
/**
 * 
 * There should be something here describing what this test is tesing for seperate from the 
 * conTrade test?
 */






tests.vwTrade = function(){
    var testRes1Box = function(html){
        var elm = document.createElementFromString(html);
        var bit=true;
        var options = Array.from(elm.options).map((a)=>a.innerHTML);
        bit &=options.length===3;
        bit &=options.includes('Helium');
        bit &=options.includes('Metal');
        bit &=options.includes('Urainium');
        return bit;
    };
    var testRes2Box = function(html,res1='Helium'){
        var XOR = function(a,b){return (a||b) && !(a&&b);};
        var elm = document.createElementFromString(html);
        var bit=true;
        var options = Array.from(elm.options).map((a)=>a.innerHTML);
        bit &=options.length===2;
        bit &=XOR(options.includes('Helium'),res1==='Helium');
        bit &=XOR(options.includes('Metal'),res1==='Metal');
        bit &=XOR(options.includes('Urainium'),res1==='Urainium');
        return bit;
    };
    getFirstRes= function(resBox1){
        var elm = document.createElementFromString(resBox1);
        return elm.options[0].innerHTML;
    };
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
    test.box1 = testRes1Box(view.makeRes1Box());
    test.box2 = testRes2Box(view.makeRes2Box(),getFirstRes(view.makeRes1Box()));
    test.abox1 = view.makeAmmount1Box()===`<input type='number' id='ammountBox1' value='1' />`;
    test.abox2 = view.makeAmmount2Box()===`<input type='number' id='ammountBox2' value='1' /><br />`;
    test.dobut = view.makeDoButton()==="<input type='button' id='doTradeButton' value='do'/><br />";
    test.table=true;//can't think of an inteligent way to test the table function 
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
    
    test.buySel = (new Resource(3)).eq(view.getBuyResSelection());
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
    
    var testObject = {'a':[0,0,0,0,0]};
    var testFunctions = {};
    testFunctions.res1c = function(){return function(){testObject.a[0]=1;};}();
    testFunctions.res2c = function(){return function(){testObject.a[1]=1;};}();
    testFunctions.ammount1c = function(){return function(){testObject.a[2]=1;};}();
    testFunctions.ammount2c = function(){return function(){testObject.a[3]=1;};}();
    testFunctions.doClick = function(){return function(){testObject.a[4]=1;};}();
    //test event listeners 
    view.attatchListeners(testFunctions);
    $('#resBox1').value=2;
    $('#resBox1').change();
    
    $('#resBox2').value=3;
    $('#resBox2').change();
    
    $('#ammountBox1').change();
    //attach onchange to ammountBox2
    $('#ammountBox2').change();
    //attach onchange to doTradeButton
    $('#doTradeButton').click();
    
    if(math.sum(testObject.a)===5)
    {console.log('vwTrade event Listener test passed!');}
    else
    {console.error('vwTrade event Listener test failed!' + testObject.a);}
    p.makeSTDOverlay('');
    
};
