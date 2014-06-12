/*global log*/

/*exported registerDoubleKey, customKeyBinder, registerKeybindingCallback, registerSingleKey*/


var keyCodeMap = {};
var detectedKeyboardCommand;

function registerKeybindingCallback(func) {
    detectedKeyboardCommand = func;
}

function standardShortcutToCustom(standard) {



}

function registerSingleKey(key, toolName) {
    keyCodeMap[standardShortcutToCustom(key)] = toolName;
}

//turns a key event into a text representation
function parseKey(evt) {
    var retVal = "";

    //This is added to signal that an event happened in an editable box, if that's what things are looking for
    if (evt.target.isContentEditable || "text" == evt.target.type || 0 === evt.target.outerHTML.indexOf("<textarea")) {
        retVal = "[EDIT]";
    }

    if (evt.altKey) {
        retVal = retVal + "A";
    }
    if (evt.ctrlKey) {
        retVal = retVal + "C";
    }
    if (evt.shiftKey) {
        retVal = retVal + "S";
    }

    retVal = retVal + evt.keyCode;

    return retVal;
}

var firstKeyFlags = {};

function checkDoubleKeyCombos(parsedKey)
{
    for (var key in firstKeyFlags) {
        if (firstKeyFlags.hasOwnProperty(key)) {
            if (firstKeyFlags[key]) {
                firstKeyFlags[key] = false;
                return ""+key+"+"+parsedKey;
            }

            if (parsedKey == key.charCodeAt(0)) {
                firstKeyFlags[key] = true;
                setTimeout(function() {
                    firstKeyFlags[key] = false;
                }, 1200);       //1.2 second time out on pressing second key
                return "";      //sqelch the key
            }
        } 
    }
   
    return parsedKey;
}

function customKeyBinder(evt){
    var keypress = parseKey(evt);

    keypress = checkDoubleKeyCombos(keypress);
    
    if (keyCodeMap[keypress] !== undefined) {
        log("Detected " + keyCodeMap[keypress]);
        if(detectedKeyboardCommand) {
            detectedKeyboardCommand(keyCodeMap[keypress]);  
        }
        
    }
}

function registerDoubleKey(firstKey) {
    firstKeyFlags[firstKey] = false;
}