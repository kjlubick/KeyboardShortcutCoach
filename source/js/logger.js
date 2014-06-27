/*exported log, logf*/

var debug = true; 

function log(s) { //write to console if in debug
    if (debug) {
        console.log("[KSC]" + s);
    }
    return true;
}
function logf(s) { //write exactly to the console if in debug (useful for objects)
    if (debug) {
        console.log(s);
    }
    return true;
}