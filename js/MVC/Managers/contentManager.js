/* 
 * Class to cache resources so that the are not constinalty reloaded.
 * Required so that the map doesn't need to reload planets texteures
 * could be used for LOD management 
 * should things be left in the scene to reduce latency caused by the graphics pipline?
 */


/* global THREE */

function ContentManager(){
    /**
     * Function to get access to a resource located at URL and then do callback with it.
     * @param {String} URL
     * @param {Function} callback
     * @returns {contentManager.content|contentManager@call;get}
     */
    this.getTexture = function(URL,callback){
        //check if resource already exists in cache
        if(this.content[URL]){
            return this.content[URL];
        }
        //if it doesn't load it into cache
        //create something to give back immidiatly to the program
        this.content[URL] = new THREE.Texture(); 
        var callback = this.textureCallbackGenerator(URL);
        var low = new THREE.ImageLoader().load('images/'+URL+'l'+'.jpg',callback);
        var high = new THREE.ImageLoader().load('images/'+URL+'h'+'.jpg',callback);
        return this.content[URL];
    };
    
    this.content = {};
    
    this.textureCallbackGenerator = function(URL){
        var self = this;
        return function(image){
            self.content[URL].image = image;
            self.content[URL].needsUpdate=true;
        };
    };
}