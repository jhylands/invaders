document.getElementById('laser').play();

var sounds = {
   32 : 'laser' // key 'space'
};
document.onkeydown = function(e) {
    var soundId = sounds[e.laser];
    if (soundId) document.getElementById(soundId).play();
    else console.log("key not mapped : code is", e.laser);
} 