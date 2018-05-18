function vw(){
    this.elm = function(id){
        return document.getElementById(id);
    };
    
    //function to create a select box
    this.makeSelect = function(id,options){
        return '<select id="' + id + '">' + options.map((a)=>
        "<option id='" +
                a.id +
                "' value='" + 
                a.value + "'>"+
                a.string + 
                "</option>"
                ).reduce((a,b)=>a+b,'')
        + "</select>";
    };
}

