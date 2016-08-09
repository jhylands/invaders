
function CargoHold(){
    this.update = function(){
        var __self = this;
        $.ajax("get/cargo.php",function(data){__self.updateData(data);});
    };
    this.updateData = function(data){
        this.data = JSON.parse(data);
        var res = this.data.resources;
        this.resources = this.convertToResource(res);
        
    };
    this.convertToResource = function(res){
        var resources = [];
        for(id in res){
            resources.push(new Cargo(id,res[id]));
        }
        return resources;
    };
    this.makePage = function(){
        var table = "<table id='cargo'>"
        for(var i=0;i<this.resources.length;i++){
            var table = table + "<tr><td>" + this.reources[i].getName() + "</td<td>" + this.resources.getAmount() + "</td></tr>";
        }
        table = table+"</table>"
    }
}

