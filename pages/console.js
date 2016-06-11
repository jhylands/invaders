//console class file
 
{a = function (renderer,scene,camera,onready){
    //inherits from page class
    this.__proto__ = new Page();

    //class information
    this.name = "Console";
    this.id = 7;

    //global THREE references
    this.renderer = renderer;
    this.scene = scene;
    this.__camera = camera;

    //Finished loading variables
    this.ready = false;
    this.onready = onready;

    //page changing handshake
    this.change = false; //set to true if request page change.
    this.nextPage; //set to the id of the next page.
    this.commands = ['help'];
    this.i=0;

    this.create = function(from){
        switch(from){
            case 0:
                //from orbit
                this.constructFromOrbit();
                break;
        }
        this.ready = true;
        this.onready(this.id);
    };
    this.keyboard = function(keyState){
        if(keyState.pressed('enter')){
                var command = document.getElementById('writer').value;
                if(command!=""){
                    this.commands.push(command);
                    switch(command){
                            case 'clear':
                                    document.getElementById('console').innerHTML = "";
                                    break;
                            case 'fight':
                                    this.makeChanger(this,5)();
                                    break;
                            case 'exit':
                                    this.makeChanger(this,0)();
                                    break;
                    }
                    $.ajax({url:"console.php?command="+command}).done(function(resp){
                            document.getElementById("console").innerHTML += '<br />' +  resp;
                            document.getElementById('console').scrollTop = document.getElementById('console').scrollHeight;
                        });
                    document.getElementById('writer').value="";
            }
        }else if(keyState.pressed('up')){
                if (i<this.commands.length-1){
                        i++;
                        document.getElementById('writer').value=this.commands[this.commands.length-i];		
                }
        }else if(keyState.pressed('down')){
            if(i<=1){
                    document.getElementById('writer').value="";
                    i==0;
            }else{
                    i--;
                    document.getElementById('writer').value=this.commands[this.commands.length-i];
            }
        }
    };
    this.update = function(){/*no time based events (earths rotation maybe?*/};
    this.destroy = function(){/*All overlay information should be overwitten by next action*/};
    this.constructFromOrbit = function(){
        var console = '<p id= "console" style="height:80%;max-height:80%;overflow:hidden;">Welcome <?php //echo $userName; ?>, Last login <?php echo "20/11/10"; ?><br /></p>';
        var writer = '<div style="position:relative;bottom:30px;left:0px;width:100%;"><input id="writer" value="" tabindex="0" type="text"  style="width:100%;color:#F0F0F0;background-color:black;border:0;font-size:18pt;" autofocus/></div>';
        //create overlay
        this.makeSTDOverlay(console+writer);
        
        //keep box in focus
        $('#writer').focus();
        $('#writer').focusout(function(){$('#writer').focus()});
    };

};
}