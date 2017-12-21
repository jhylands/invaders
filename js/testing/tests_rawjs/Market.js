/* global tests */

//block to test the market class

//a market should be created from a set of channels
//and the function that can be used on those channels 

tests.MarketTest= function(){
//channel generator 
//take from channel function tester

paris = new Market();
paris.fromChannels(makeChannels());

/*
 * getBuyOptions
 * 
 * given a resource to sell it should display all of the resources that can be bought
 * using that resource.
 * 
 * This function is dependent of the state of the channel array
 */
var buys = paris.getBuyOptions();
var buytest={};
buytest.objects = buys.map((a)=>typeof(a)===typeof(new Resource(0))).reduce((a,b)=>a&&b);
buytest.len = buys.length===3;
buytest.ids = buys.map((a)=>a.getID()>=2&&a.getID()<=4).reduce((a,b)=>a&&b);
if(buytest.objects&&
    buytest.len&&
    buytest.ids)
{console.log('getBuyOptions passed');}
else
{console.warn('getBuyOptions Failed' + JSON.strigify(buytest));}

/*
 * getSellOptions
 * 
 * Simply returns an array of the sell resources that are available through
 * the channel
 * 
 *  This function is dependednt of the state of the channel array 
 * 
 */
var sells = paris.getBuyOptions();
var selltest={};
selltest.objects = sells.map((a)=>typeof(a)===typeof(new Resource(0))).reduce((a,b)=>a&&b);
selltest.len = sells.length===3;
selltest.ids = sells.map((a)=>a.getID()>=2&&a.getID()<=4).reduce((a,b)=>a&&b);
if(selltest.objects&&
    selltest.len&&
    selltest.ids)
{console.log('getBuyOptions passed');}
else
{console.warn('getBuyOptions Failed' + JSON.strigify(selltest));}

/*
 * resourceListToOption
 * 
 * This function takes a list of type resource and returns 
 * a string which is html for the option box to be used on the page
 * 
 */


/*
 * getRate
 * 
 * This is a function which given two resources either:
 * returns the rate between the two resources
 * or
 * false if there is no channel trading in that direction between the two
 * resources
 */

};