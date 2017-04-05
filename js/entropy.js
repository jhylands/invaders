function sampleSpace(){
    //list of elements
    this.objects = [];
    function getEntropy(){
        return sum(this.objects.getAjustedEntropy());
    }
    function getJointEntropy(withEntity){
        
    }
    function getConditionalEntropy(givenEntity,value){
        
    }
    
}

function event(probability,identifier){
    this.probability = probability;
    this.identifier = identifier;
    this.conditional = {};
    this.getEntropy = function(){
        return -Math.log(this.probability);
    };
    this.getProbability = function(){
        return this.probability;
    };
    this.getAjustedEntropy = function(){
        return this.getEntropy()*this.probability;
    };
    this.getConditionalProbability = function(withEvent){
        if(withEvent.eq(this)){
            return 1;
        }else{
            return this.conditional[withEvent.getKey()];
        }
    };
    this.setConditionalProbability = function(value,withEvent){
        this.conditional[withEvent.getKey()] = value;
    };
    
}


function H(sampleSpace){
    return sum(sampleSpace.getAjustedEntropy())
}


function opporation(){
    this.type= 'opporation';
}
function sum(){
    this.__proto__ = new opporation();
    this.total=0;
    this.apply = function(value){
        this.total+=value;
    };
    this.result = function(){
        return this.total;
    };
}
function apply(opp,inArray){
    var arr = inArray;
    for(var i=0;i<arr.length;i++){
        arr[i] = opp(arr[i]);
    }
    return arr;
}
function applySum(opp,arr){
    var accumulator;
    for(var i=0;i<arr.length;i++){
        accumulator = opp(arr[i],accumulator);
    }
    return accumulator;
}