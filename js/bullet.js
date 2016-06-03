function Bullet(friendly,colour, velocity,timeOut){
    //So one can't shoot themsleves 
    this.freindly = friendly;
    //The colour of the bullit
    this.colour = colour;
    //The speed and direcion
    this.velocity = velocity;
    //the object as is to be added into the scene
    this.Mesh = this.createMesh();
    //allow for the BulletHandler to garbadge collect
    this.dead = false;
    
    
    //add timout for the destruction of the object
    window.setTimeOut(timeOut,function(){this.dead=true;});
    
    this.createMesh = function(){
        var Geometry = new THREE.CylinderGeometry(0.1,0.1,1);
        //might work better as a lambert with emmisive texture
        var Material = new THREE.MeshBasicMaterial( { color:this.colour,transparent:true,opacity:0.8  } );
	this.Mesh = new THREE.Mesh( Geometry,Material );
	this.Mesh.position.set(position.x,position.y,position.z+1);
	this.Mesh.rotation.x=1.57079632679;
    }
    
}

function BulletHandler(){
    //initiate bullet list
    this.bullets = [];
    
    this.create = function(){
        this.bullets.push(new Bullet());
    };
    
    this.update = function(){
        for(i=0;i<bullets.length;i++){
            //destroy if nessasery 
            if(this.bullets[i].dead){this.bullets.splice(i,1);}
            else{
                var aB = this.bullets[i];;//aB ... ullet
                //move forward
                aB.Mesh.position.add(aB.velocity);
            }
        }
    }
    
}