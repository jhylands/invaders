/* global tests */

//A block to test the channel class

//A channel is a 3 tuple of a buy resource, sell resource
//and a rate at which the buy resource can be purchased given the sell resource

//function to make the channels
var makeChannels = function(){
    var pairs = [ [ 0, 0 ],
  [ 0, 1 ],
  [ 0, 2 ],
  [ 1, 0 ],
  [ 1, 1 ],
  [ 1, 2 ],
  [ 2, 0 ],
  [ 2, 1 ],
  [ 2, 2 ] ];
  var channels =[];
  for(var i=0;i<pairs.length;i++){
      //add offset becue the ids in the database start at 2
      channels.push((new Channel()).setFromIDs(pairs[i][0]+2,pairs[i][1]+2,Math.random()));
  }
  return channels;
};

//channels should be so simple they don't need testing 
//the test is the same complexity as the program istelf if not more complicated


tests.channels = function(){
    var channels = makeChannels();
    for(var i=0;i<channels.length;i++){
        var channel = channels[i];
        var test ={};
        
        test.sellre = channel.getSellResource()==channel
    }
        
    
    
    
}