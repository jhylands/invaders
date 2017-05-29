/* global __scene, place, THREE, contentManager, __sun */

function Page(){
    //abstract functions for a page
    
    this.create = function(from){console.log('Abstract function create not overwritten!');};
    this.destroy = function(to){console.log('Abstract function destroy not overwritten!');};
    this.keyboard = function(keystate){console.log('Abstract function keyboard not overwritten!');};
    this.update = function(){console.log('Abstract function update not overwritten!');};
    this.reload = function(){console.log('Abstract function reload not overwritten!');};
    this.onready = function(pageID){console.log('Abstract function onready not overwritten for page:' + pageID);};
    
    //Superclass functions
    
    //function to create page overlay
    this.makeSTDOverlay = function(innerHTML){
        var overlay = "<div id='content' style='background-color:rgba(0,0,0,0.7);border-radius:25px;margin-top:3%;margin-bottom:3%;margin-left:5%;margin-right:5%;'>";
        overlay +=innerHTML;
        overlay += "</div>";
        document.getElementById('overlay').innerHTML = overlay;
    }
    //create a closure containing a reference to this class and the index of the page to be loaded in
    this.makeChanger = function(page,nextPageID){
        var locPage = page;
        var locNextPage = nextPageID;
        return function (){
            locPage.destroy(locNextPage);
            locPage.change=true;
            locPage.nextPage = locNextPage; 
        };
    };


    
    //function to add lighting to a Planet Mesh
    
    
    //function to add the sun and its lights into the __scene
    //needs replacing with lense blur
    this.addSun = function(){
        var sun = new THREE.Group();
        var lightcolor =  0xFFFFFF;
        var light = new THREE.PointLight( lightcolor );
        light.position.set( -100000, 10, -10 );
        sun.add(light);
	var sunGeometry = new THREE.SphereGeometry(69550,32,32);
	var sunTexture = contentManager.getTexture('sun');
	var sunMaterial = new THREE.MeshPhongMaterial({map:sunTexture});
	var sunMesh = new THREE.Mesh(sunGeometry,sunMaterial);
	sunMesh.position.x = -7000000;
	sun.add(sunMesh);
        return sun;
    };
    /**
     * function to generate a reference to the planet in the __scene so it can be moved
     * @returns {unresolved}
     */
    this.findPlanet = function (){
        for(i=0;i<__scene.children.length;i++){
            if(__scene.children[i].name=="planet"){
                this.threePlanet = __scene.children[i];
                return null;
            }
        }
    };
    
    /**
     * This dosn't need to be a function any more because
     * the celestial class supercedes it
     * 
     * function to update the planet mesh witht the new plannet mesh
     * @returns {undefined}
     */
    this.updatePlanet = function(){
        var planet = __sun.findFromChildren(place['PlaceID']);
        __scene.remove(planet.getThree());
        this.threePlanet = this.makePlanet(place);
        //set up lighting
        this.threePlanetLights = this.bindLights(this.threePlanet,this.planet);
        this.threePlanetLights.name = "planet";
        __scene.add(this.threePlanetLights);
    };
}