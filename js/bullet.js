function Bullet(allegience,position,timeOut){
    this.allegiance = function(team,colour,velocity){
        //define an allegiance type
        this.team = team;
        this.colour = colour;
        this.velocity = velocity;
    }
    
    //So one can't shoot themsleves 
    this.team = allegience.team;
    //The colour of the bullit
    this.colour = allegience.colour;
    //The speed and direcion
    this.velocity = allegience.velocity;
    //the object as is to be added into the scene
    this.Mesh = this.createMesh(position);
    //allow for the BulletHandler to garbadge collect
    this.dead = false;
    
    
    //add timout for the destruction of the object
    window.setTimeOut(timeOut,function(){this.dead=true;});
    
    this.createMesh = function(position){
        var Geometry = new THREE.CylinderGeometry(0.1,0.1,1);
        //might work better as a lambert with emmisive texture
        var Material = new THREE.MeshBasicMaterial( { color:this.colour,transparent:true,opacity:0.8  } );
	this.Mesh = new THREE.Mesh( Geometry,Material );
	this.Mesh.position.copy(position);
	this.Mesh.rotation.x=1.57079632679;
    }
    
}

function BulletHandler(canShootTime,timeOut){
    //initiate bullet list
    this.bullets = [];
    
    //set timeout for bullets
    this.timeOut = timeOut;
    //set max fire rate
    this.canShootTime = canShootTime;
    this.canShoot;
    //canshoot timing need to be 
    //managed by the bullethandler but need to be seperate for each allegiance
    
    this.create = function(allegiance){
      
        this.bullets.push(new Bullet(allegiance,position,this.timeOut));
    };
    
    this.createAllegiance = function(team,colour,velocity){
        return {'team':team,'colour':colour,'velocity':velocity};
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