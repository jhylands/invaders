
function CargoHold(){
    this.update = function(callback){
        this.callback = callback;
        var self=this;
        //var updateData = this.updateData;
        $.ajax({url:"i/get/cargo.php",async:false}).done(
                function(data){
                    self.results=data;
                    self.updateData(self.results);
                }
                );
    };
    this.resources=[];
    this.updateData = function(data){
        this.data = JSON.parse(data);
        var res = this.data.resources;
        this.resources = this.convertToResource(res);
        this.callback();
    };
    this.convertToResource = function(res){
        var resources = [];
        for(id in res){
            resources.push(new Cargo(id,res[id]));
        }
        return resources;
    };
    this.toString = function(){
        var table = "<table id='cargo'><tr><th>Name</th><th>Ammount</th><th>Drop</th></tr>";
        for(var i=0;i<this.resources.length;i++){
            table = table + "<tr><td>" + this.resources[i].getName() + "</td><td>" + this.resources[i].getAmmount() + "</td><td>" + this.resources[i].getDrop() + "</td></tr>";
        }
        table = table+"</table>";
        return table;
    }

}

