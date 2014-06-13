/*global log*/

/*exported registerDoubleKey, registerKeybindingCallback, registerSingleKey*/
/*
The MIT License (MIT)

Copyright (c) 2014 Kevin Lubick

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal 
in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
IN THE SOFTWARE.
*/

var keyCodeMap = {};
var detectedKeyboardCommand;

function registerKeybindingCallback(func) {
    detectedKeyboardCommand = func;
    $(document).on('keydown', customKeyBinder);
}

function standardShortcutToCustom(standard) {
    var upper;
    //single letter commands
    if (standard.length == 1) {
        if (standard == "/") {
            return 191;
        }
        return standard.toUpperCase().charCodeAt(0);
    }
    //two letter commands
    if (standard.length == 3) {
        upper = standard.toUpperCase();
        return upper.charCodeAt(0) + "+" + upper.charCodeAt(2);
    }
    
}

function registerSingleKey(key, toolName) {
    var converted = standardShortcutToCustom(key);
    log(key + "->" + converted);
    keyCodeMap[converted] = toolName;
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

            if (parsedKey == key) {
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
    log(keypress);

    keypress = checkDoubleKeyCombos(keypress);
    
    if (keyCodeMap[keypress] !== undefined) {
        log("Detected " + keyCodeMap[keypress]);
        if(detectedKeyboardCommand) {
            detectedKeyboardCommand(keyCodeMap[keypress]);  
        }
        
    }
}

function registerDoubleKey(firstKey) {
    firstKeyFlags[firstKey.toUpperCase().charCodeAt(0)] = false;
}