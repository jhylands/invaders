/* global tests */

tests.conTrade = function(){
    onPageReady = 0;
    //construct the handler
    var trader = new conTrade();
    //get it to create page 
    trader.constructFromOrbit();
    //check what it has created 
    var test ={};
    //test that it initiallycraetes the document correctly 
    test.inDoc = document.getElementById('content').innerHTML===`<h1>Trade floor</h1><p>Loading market information</p><input type="button" id="bk2o" value="Back to orbit">`;
    //test that the event listener has been attached
    test.evnt = typeof(document.getElementById('bk2o').click) === typeof(function(){return 1;});
    
    if(test.inDoc)
    {console.log('conTrade creation test passed!');}
    else
    {console.error("conTrade creation test failed!" + JSON.stringify(test));}
    
    //create market manually not from update
    var paris = new Market();
    paris.fromChannels(makeChannels());
    trader.market = paris;
    //manually attach the fake market to the view
    trader.view.market = paris;
    
    //test table update
    trader.updateTable();
    //trader.view.attatchListeners()
    test = {};
    //test the update when the selection change happens
    //select a differnt buy resource
    var buye = $('#resBox1')[0];
    buye.value="3";
    buye.change();
    
    test.bCon = document.getElementById('content').innerHTML;
    
    console.log(trader.view.makeRes2Box());
    
    if(test.iniCon)
    {console.log('conTrade functionality test complete!');}
    else
    {console.error('conTrade functionality test Failed!' + JSON.stringify(test));}
    
};
