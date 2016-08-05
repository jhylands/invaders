function CombatAnimation(){
    this.animation = 1;
    this.setAnimation = function(animation){this.animation=animation;};
    this.getAnimation=function(){return this.animation;};
    //ANIMATIONS
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
                console.log('Movement Fin')
                this.inAnimation = 0;
                this.thi=deg(20);
                this.orbitPos=deg(180);
            }else{
                this.moveToShip+=0.1;
                var planetpos = new THREE.Vector3(0,0,0).multiplyScalar(1-this.log(this.moveToShip));
                var shipPos = new THREE.Vector3(0,0,0).copy(this.ship.position).multiplyScalar(this.log(this.moveToShip));

                lookat = planetpos.add(shipPos);
            }
        }else{
            lookat = this.threePlanet.position;
        }
        //update __scene
        //this.threePlanet.position.copy( this.calculateOrbit(0).negate() );
        this.updateCameraPosition();
        __camera.lookAt(lookat);
    }
    this.backToOrbit = function(){
        this.inAnimation = 2;
    }
    this.animationUpdateB = function(){
        //start by moving focus
        if(this.log(this.moveToShip)>=1){
            this.moveToShip-=0.1;
            var planetpos = new THREE.Vector3(0,0,0).multiplyScalar(1-this.log(this.moveToShip));
            var shipPos = new THREE.Vector3(0,0,0).copy(this.ship.position).multiplyScalar(this.log(this.moveToShip));

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
                    console.log('Movement Fin')
                    this.thi=0;
                    this.orbitPos=deg(90);
                    __scene.remove(this.ship);
                    __scene.remove(this.aliens);
                    this.change = true;
                    this.nextPage = 0;
            }
            lookat = this.threePlanet.position;
        }
        this.updateCameraPosition();
        __camera.lookAt(lookat);
    };

}