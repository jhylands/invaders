/* global tests */

describe("conTrade test",function(){
    var body = document.getElementsByTagName("body")[0];
    window.onPageReady=0;
    var trader = new conTrade();
    trader.constructFromOrbit();
    it("creates the document correctly",function(){
        expect(document.getElementById('content').innerHTML).toEqual(`<h1>Trade floor</h1><p>Loading market information</p><input type="button" id="bk2o" value="Back to orbit">`);
    });
    it("Attaches the event listener",function(){
        expect(typeof document.getElementById('bk2o').click).toBe("function");
    });
    
})

