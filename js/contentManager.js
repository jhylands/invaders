/* 
 * Class to cache resources so that the are not constinalty reloaded.
 * Required so that the map doesn't need to reload planets texteures
 * could be used for LOD management 
 */


function contentManager(){
    this.get = function(URL){
        //check if resource already exists in cache
        if(this.content[URL]){
            return this.content[URL];
        }
        //if it doesn't load it into cache
        this.content[URL] = new THREE.TextureLoader().load(URL);
        return this.get(URL);
    };
    
    this.content = {};
}