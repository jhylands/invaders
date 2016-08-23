//console class file
 
function conConsole(){
    //inherits from page class
    this.__proto__ = new Page();

    //class information
    this.name = "Console";
    this.id = 7;

    //global THREE references
    
    ;
    

    //Finished loading variables
    this.ready = false;
    this.onready = onPageReady

    //page changing handshake
    this.change = false; //set to true if request page change
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
    this.keyboard = function(keyState){};
    
    //This fucntion doesn't work verry well, first up press doesn't line up
    this.run = function(e){
        this.change=false;
        if(e.keyCode==13){
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
                            if(resp.indexOf("PLCEUP")+1){
                                updatePlace();
                            }
                            //document.getElementById("console").innerHTML = document.getElementById("console").innerHTML.substr(0,document.getElementById("console").innerHTML.length-6);
                            document.getElementById("console").innerHTML += resp + '<br /><br />';
                            document.getElementById('console').scrollTop = document.getElementById('console').scrollHeight;
                        });
                    document.getElementById('writer').value="";
            }
        }else if(e.keyCode==38){
                if (this.i<this.commands.length){
                    this.i++;
                    document.getElementById('writer').value=this.commands[this.commands.length-this.i];		   
                }
        }else if(e.keyCode==40){
            if(this.i<=1){
                document.getElementById('writer').value="";
                this.i==0;
            }else{
                this.i--;
                document.getElementById('writer').value=this.commands[this.commands.length-this.i];

            }
        }
          
    };
    this.update = function(){/*no time based events (earths rotation maybe?*/
        pages[0].update();
    };
    this.destroy = function(){/*All overlay information should be overwitten by next action*/};
    this.constructFromOrbit = function(){
        var console = '<p id= "console" style="height:80%;max-height:80%;overflow:hidden;color:#F0F0F0;font-family: `Lucida Console`;font-size:18px;">Welcome name, Last login nowish"; ?><br /></p>';
        var writer = '<div style="position:relative;bottom:30px;left:0px;width:100%;"><input id="writer" value="" tabindex="0" type="text"  style="width:100%;color:#F0F0F0;background-color:black;border:0;font-size:18pt;" autofocus/></div>';
        //create overlay
        this.makeSTDOverlay(console+writer);
        
        var _self = this;
        $('#writer').keydown(function(event){_self.run(event);});
        //keep box in focus
        $('#writer').focus();
        $('#writer').focusout(function(){$('#writer').focus()});
    };

}