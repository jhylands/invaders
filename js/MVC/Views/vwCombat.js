function vwCombat(){
    this.__proto__ = new vw();
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
        this.elm('overlay').innerHTML = htmlOverlay;
        this.elm('style').innerHTML = 'body{	background-color:black;	color:white;	font-size:80%;	}	.clickable:hover{	background-color:#0000A0;	color:#FFFFE0;	cursor:pointer; cursor:hand;	}';
        this.elm('infoBox').top = window.innerHeight/2-100;
        this.elm('infoBox').left = window.innerWidth/2-100;

        //add eventhandlers
        this.elm('bk2o').addEventListener("click",bk2oFunction);
    };
    
    this.displayWinScreen = function(){
        //won=true;
        this.elm('infoBox').innerHTML = "<h1>You have won!</h1><p>You have been rewareded 100 Helium for your efforts</p><br /><input id='bk2o' type='button' value='Back to orbit' />";
        this.elm('infoBoxParent').hidden = false;
        var _self = this;
        this.elm('bk2o').addEventListener("click",function(){_self.backToOrbit();});

        $.ajax({url:"scripts/combat/won.php",post:"data:shipInfo"}).done(function(resp){
            //take the responce and put it in the class box
            this.elm("console").innerHTML = this.elm("console").innerHTML + '<br />' +  resp;});
    };
    this.setHealth = function (health){
        this.elm('health').style.width = (250*health/100) + "px";
    };
}
