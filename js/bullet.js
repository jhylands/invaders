function Bullet(allegience,position,timeOut){
    this.allegiance = function(team,reloadTime,colour,velocity){
        //define an allegiance type
        this.team = team;
        this.reloadTime = reloadTime;
        this.colour = colour;
        this.velocity = velocity;
    };
    
    //So one can't shoot themsleves 
    this.team = allegience.team;
    //The colour of the bullit
    this.colour = allegience.colour;
    //The speed and direcion
    this.velocity = allegience.velocity;
    //the object as is to be added into the scene
    this.Mesh;// = this.createMesh(position);
    //allow for the BulletHandler to garbadge collect
    this.dead = false;
    
    
    //add timout for the destruction of the object
    this.die = function(){
        var self=this;
        window.setTimeout(function(){self.dead=true;},timeOut);
    }
    
    this.createMesh = function(position){
        var Geometry = new THREE.CylinderGeometry(0.1,0.1,1);
        //might work better as a lambert with emmisive texture
        var Material = new THREE.MeshBasicMaterial( { color:this.colour,transparent:true,opacity:0.8  } );
	this.Mesh = new THREE.Mesh( Geometry,Material );
	this.Mesh.position.copy(position);
	this.Mesh.rotation.z=1.57079632679;
    };
    this.createMesh(position);
    this.die();
    
}

function BulletHandler(scene,timeOut){
    //initiate bullet list
    this.bullets = [];
    this.firendlyFire = false;
    //set timeout for bullets
    this.timeOut = timeOut;
    this.scene = scene;
    //set max fire rate
    this.canShoot = {'AmIHerer':function(){return 'yes';}};
    //canshoot timing need to be 
    //managed by the bullethandler but need to be seperate for each allegiance
    
    this.create = function(allegiance,position){
        //check if still reloading
        //might need to check if key in dictionary here
        if(this.canShoot[allegiance.team]){
            //if it takes time for this allegiance to reload set that timeout
            if(allegiance.reloadTime){
                this.canShoot[allegiance.team]=false;
                //this might need a closure
                var __canShootRef = this.canShoot;
                var __teamRef = allegiance.team;
                window.setTimeout(function(){__canShootRef[__teamRef]=true;},allegiance.reloadTime);
            }
            var bullet = new Bullet(allegiance,position,this.timeOut);
            this.bullets.push(bullet);
            this.scene.add(bullet.Mesh);
        }
    };
    
    this.createAllegiance = function(team,colour,velocity,reloadTime){
        this.canShoot[team]=true;
        return {'team':team,'colour':colour,'velocity':velocity,'reloadTime':reloadTime};
    };
    
    this.update = function(){
        for(i=0;i<this.bullets.length;i++){
            //destroy if nessasery 
            if(this.bullets[i].dead){
                //if(this.bullets[i].team=="Friend"){alert('removed');}
                this.scene.remove(this.bullets[i].Mesh);
                this.bullets.splice(i,1);
            }else{
                var aB = this.bullets[i];;//aB ... ullet
                //move forward
                aB.Mesh.position.add(aB.velocity);
            }
        }
    };
    
    this.checkCollision = function (aliens,Me){
        var hitLst ={'aliens':[],'friend':false};
        //loop through each active bullet
        for(var i = 0;i<this.bullets.length;i++){
            if(this.bullets[i].team=="Friend"){
                var originPoint = this.bullets[i].Mesh.position.clone();
                var vertexIndex = 0;
                var localVertex = this.bullets[i].Mesh.geometry.vertices[vertexIndex].clone();
                var globalVertex = localVertex.applyMatrix4( this.bullets[i].Mesh.matrix );
                var directionVector = globalVertex.sub( this.bullets[i].Mesh.position );

                var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
                var collisionResults = ray.intersectObjects([aliens] ,true);
                if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ){ 
                    //object to destroy is the collisionResukts[0].object
                    hitLst.aliens.push(collisionResults[0].object.name);
                    this.bullets[i].dead=true;
                }	
            }else if(this.bullets[i].team=="Foe"){
                var originPoint = this.bullets[i].Mesh.position.clone();
                var vertexIndex = 0;
                var localVertex = this.bullets[i].Mesh.geometry.vertices[vertexIndex].clone();
                var globalVertex = localVertex.applyMatrix4( this.bullets[i].Mesh.matrix );
                var directionVector = globalVertex.sub( this.bullets[i].Mesh.position );

                var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
                var collisionResults = ray.intersectObjects([Me] ,true);
                if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ){ 
                    //object to destroy is the collisionResukts[0].object
                    hitLst.friend=true;
                    this.bullets[i].dead=true;
                }	
            }
        }
        return hitLst;
    };
    
}