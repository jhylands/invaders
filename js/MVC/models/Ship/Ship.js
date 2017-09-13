/* global THREE */

//top level class for ships
function Ship(bulletHandler){
    
    this.bullets = bulletHandler;
    this.health;
    
    this.getHealth= function(){return this.health;};
    this.setHealth=function(health){this.health= health;};
    /**
     * Function returns the three object of the ship
     */
    this.getThree = function(){console.warn('Abstract function getThree not overwritten!');};
    //this.getThree = function(){return this.object;};
    /**
     * Function to handle any updates to the ship that should occurer every update
     * @returns void
     */
    this.update = function(){console.warn('Abstract function update not overwritten!');};
    /**
     * Function to handle updates from keystate
     * @returns void
     */
    this.keyboard = function(keystate){console.warn('Abstract function keyboard not overwritten!');};
    /**
     * Function to allow the ship to be scaled either to a 
     * relative size of the the objects around it or 
     * to fit a particular box.
     * @returns {THREE.Vector3}
     */
    this.scale = function(){
        return THREE.Vector3(1,1,1);
    };
    /**
     * Abstract function for scaling ship to fit inside a box of particular size
     * @param {THREE.Vector3} Box
     * @returns {void}
     */
    this.setScale = function(Box){
        console.warn('Abstract function setScale not overwritten!');
    };
    this.detectCollisions = function(){
            var hit = this.bullets.checkCollision(this.aliens,this.ship);
            for(n=0;n<this.aliens.children.length;n++){
                for(i=0;i<hit.aliens.length;i++){
                    if(this.aliens.children[n].children[1].name==hit.aliens[i]){
                        this.aliens.remove(this.aliens.children[n]);
                    }
                }
            }
            if(hit.friend){
                this.health-=5;
                document.getElementById('health').width=health*2.5 + "px";
                document.getElementById('healthTXT').innerHTML = this.health;
            }
            if(this.health<5 && !this.dead){
                //document.getElementById('die').play()
                document.getElementById('infoBox').innerHTML = "<h1>You have lost too much shielding!</h1><p>Your commander has ordered you to retreat as you have lost too much Shielding. It is military policy that you cannot fight with your shielding bellow 5%</p><br /><input type='button' id='bk2od' value='Back to orbit' />";
                document.getElementById('infoBoxParent').hidden = false;
                var _self = this;
                document.getElementById('bk2od').addEventListener("click",function(){_self.backToOrbit();});
        
                this.start= false;
                this.dead=true;
                //add eventhandlers
            }
        };
        this.FRIEND = this.bullets.createAllegiance("Friend",0x0000FF,new THREE.Vector3(1,0,0),1000);
        this.FOE = this.bullets.createAllegiance("Foe",0xFF000,new THREE.Vector3(-1,0,0),0);
        
}