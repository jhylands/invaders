function vwCombat(){
    /**
     * Function to create technical overlay at the beginning of the combat scene
     * @param function bk2oFunction Function to be called to go back to orbit
     * @returns {undefined}
     */
    this.createUserInterface = function(bk2oFunction){
        //health bar            
        htmlOverlay = '<div style="position:absolute; top:0px;right:0px;z-index:6;"><table id="health" style="background-color:green;height:30px;" width="250px"><tr><td id="healthTXT"></td></tr></table></div>';            
        //Info box telling the user to press space to start
        htmlOverlay += '<div id="infoBoxParent" style="position:absolute;top:250px;left:250px;z-index:5;width:300px;"><table style="background-color:black;color:white;"><tr><td id="infoBox"><h1>Press space to start</h1><input id="bk2o" type="button" value="Back to orbit"  /></td></tr></table></div>';
        document.getElementById('overlay').innerHTML = htmlOverlay;
        document.getElementById('style').innerHTML = 'body{	background-color:black;	color:white;	font-size:80%;	}	.clickable:hover{	background-color:#0000A0;	color:#FFFFE0;	cursor:pointer; cursor:hand;	}';
        document.getElementById('infoBox').top = window.innerHeight/2-100;
        document.getElementById('infoBox').left = window.innerWidth/2-100;

        //add eventhandlers
        document.getElementById('bk2o').addEventListener("click",bk2oFunction);
    };
    
    this.displayWinScreen = function(){
        //won=true;
        document.getElementById('infoBox').innerHTML = "<h1>You have won!</h1><p>You have been rewareded 100 Helium for your efforts</p><br /><input id='bk2o' type='button' value='Back to orbit' />";
        document.getElementById('infoBoxParent').hidden = false;
        var _self = this;
        document.getElementById('bk2o').addEventListener("click",function(){_self.backToOrbit();});

        $.ajax({url:"scripts/combat/won.php",post:"data:shipInfo"}).done(function(resp){
            //take the responce and put it in the class box
            document.getElementById("console").innerHTML = document.getElementById("console").innerHTML + '<br />' +  resp;});
    };
}
