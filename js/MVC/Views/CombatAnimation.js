/* global THREE, __scene, __camera */

function CombatAnimation(shipPos,planetPos,changePage){
    //animation variables
    this.animation = 1;
    this.orbitPos = Math.PI/2;
    this.thi = 0;
    this.shipPos = shipPos;
    this.planetPos = planetPos;
    this.Crotation = deg(-80);
    this.changePage = changePage;
    this.moveToShip=0;
    
    this.setAnimation = function(animation){this.animation=animation;};
    this.getAnimation=function(){return this.animation;};
    //ANIMATIONS
    this.update = function(){
        switch(this.animation){
            case 1:
                this.animationUpdate();
                return true;
                break;
            case 2:
                this.animationUpdateB();
                return true;
                break;
            //case 0 no animation: do nothing
        }
        return false;
    };
    
    this.animationUpdate = function (){
        //target (0,20)
        //increase latitude
        if(this.thi<deg(20)){
            this.thi+=deg(20)/120;
        }
        //decrease longditude
        if(this.orbitPos<deg(180)){
            this.orbitPos+=deg(180)/240;
        }
        //check to end animation 
        if(this.orbitPos>deg(180) && this.thi>deg(20)){
            if(this.log(this.moveToShip)>=1){
                console.log('Movement Fin');
                this.animation = 0;
                this.thi=deg(20);
                this.orbitPos=deg(180);
            }else{
                this.moveToShip+=0.1;
                var planetpos = new THREE.Vector3(0,0,0).multiplyScalar(1-this.log(this.moveToShip));
                var shipPos = new THREE.Vector3(0,0,0).copy(this.shipPos).multiplyScalar(this.log(this.moveToShip));

                lookat = planetpos.add(shipPos);
            }
        }else{
            lookat = this.planetPos;
        }
        //update __scene
        //this.planetPos.copy( this.calculateOrbit(0).negate() );
        this.updateCameraPosition();
        __camera.lookAt(lookat);
    };
    this.animationUpdateB = function(){
        //start by moving focus
        if(this.log(this.moveToShip)>=1){
            this.moveToShip-=0.1;
            var planetpos = new THREE.Vector3(0,0,0).multiplyScalar(1-this.log(this.moveToShip));
            var shipPos = new THREE.Vector3(0,0,0).copy(this.shipPos).multiplyScalar(this.log(this.moveToShip));

            lookat = planetpos.add(shipPos);
        }else{
            //then move camera
            //decrease latitude
            if(this.thi>0){
                this.thi-=deg(20)/120;
            }
            //decrease longditude
            if(this.orbitPos>deg(90)){
                this.orbitPos-=deg(180)/240;
            }
            //check to end animation 
            if(this.orbitPos<=deg(90) && this.thi<=0){
                    console.log('Movement Fin');
                    this.thi=0;
                    this.orbitPos=deg(90);
                    __scene.remove(this.ship);
                    __scene.remove(this.aliens);
                    this.changePage();
            }
            lookat = this.planetPos;
        }
        this.updateCameraPosition();
        __camera.lookAt(lookat);
    };
    
    this.calculateOrbit = function(radialOffset){
        return calculateOrbit(radialOffset,this.orbitPos,this.thi);
    };
    this.updateCameraPosition = function(){
        __camera.position.copy(this.calculateOrbit(0).add(new THREE.Vector3(50* Math.sin(this.Crotation),50* Math.cos(this.Crotation),this.shipPos.z)));
    };
    this.log = function(x){
        return Math.log(x*Math.pow(10,17))/40;
    };
}