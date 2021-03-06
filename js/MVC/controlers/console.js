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
                    }
                    self = this;
                    $.ajax({url:"console.php?command="+command}).done(function(){return function(resp){
                            //get function 
                            var reg = /<script>(.*)<\/script>/g;
                            var result = reg.exec(resp)
                            if(result){
                                var script = result[1]; //watch out for non-existant
                                self.consoleScript = Function(script);
                                self.consoleScript();
                            }
                            var console = document.getElementById("console");
                            //handle if respose comes back after the user has exited the console
                            if(console){
                                console.innerHTML = console.innerHTML.substr(0,console.innerHTML.length-6);
                                console.innerHTML += resp + '<br /><br />';
                                console.scrollTop = document.getElementById('console').scrollHeight;
                            }
                        };}());
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
        var console = '<p id= "console" style="height:80%;max-height:80%;overflow:hidden;color:#F0F0F0;font-family: `Lucida Console`;font-size:18px;">Welcome name, Last login nowish"; ?><br />      </p>';
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