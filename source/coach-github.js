/*global log, logf, clickTargetProcessors,  createShortcut, setDebugLogger,
trimText, processAriaLabel, processTitle, registerDoubleKey, customKeyBinder, registerSingleKey,
registerKeybindingCallback*/

/*exported bindShortcutKeyPresses */
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
function fillGitHubShortcuts() {
    createShortcut('t.attr("id") == "js-command-bar-field"', ['/', 's'], 'to search current repository or search all of GitHub, respectively', 'search');
    createShortcut('t.data("hotkey") == "g n" && t.x !=0', ['g n'], 'to view notifications', 'viewNotifications');  // we check the x here because the actual shortcut clicks this link
    createShortcut('t.processedAriaLabel == "Code" && t.x !=0', ['g c'], 'to <u>g</u>o to the project screen, aka, the <u>c</u>ode screen', 'gotoCodeScreen');
    createShortcut('t.processedAriaLabel == "Issues" && t.x !=0 ', ['g i'], 'to <u>g</u>o to the <u>i</u>ssue tracker', 'gotoIssues');
    createShortcut('t.processedAriaLabel == "Wiki" && t.x !=0 ', ['g w'], 'to <u>g</u>o to the <u>W</u>iki', 'gotoWiki');
    createShortcut('t.processedAriaLabel == "Pull Requests" && t.x !=0 ', ['g p'], 'to <u>g</u>o to the <u>P</u>ull Requests', 'gotoPullRequests');
    createShortcut('(t.trimmedText == "New issue" || t.trimmedText == "New Issue") && t.x !=0', ['c'], 'to <u>c</u>reate an issue', 'createIssue');
    createShortcut('t.processedAriaLabel == "Switch branches or tags"', ['w'], 'to switch brances or tags', 'switchBranch');
    createShortcut('t.processedTitle == "Back to Issue list" && t.x !=0 ', ['u'], 'to go back to issue list', 'goBackToIssue');
    createShortcut('t.processedAriaLabel == "Manage labels"', ['l'], 'to add or remove labels', 'manageLabels');
}


function bindingCallBack(toolName) {
    log(toolName + " detected!");
}




function bindShortcutKeyPresses(shortcutArray, toolName) {
    console.log(shortcutArray +" "+ toolName);
    
    var i = 0;
    for(;i<shortcutArray.length;i++) {
        registerSingleKey(shortcutArray[i], toolName);
    }
}



registerDoubleKey("g");

registerKeybindingCallback(bindingCallBack);
$(document).on('keydown', customKeyBinder);


//Code that runs on start
log("Hello startup github");
clickTargetProcessors.push(processAriaLabel);
clickTargetProcessors.push(trimText);
clickTargetProcessors.push(processTitle);
fillGitHubShortcuts();

setDebugLogger(function (clickTarget) {
    log('Click t (Target):');
    logf(clickTarget);
    log('t.trimmedText `' + clickTarget.trimmedText + '`');
    log('t.processedTitle `' + clickTarget.processedTitle + '`');
    log('t.processedAriaLabel `' + clickTarget.processedAriaLabel + '`');
    log('t.attr("title") `' + clickTarget.attr('title') + '`');
    log('t.attr("id") `' + clickTarget.attr('id') + '`');
    log('t.attr("name") `' + clickTarget.attr('name') + '`');
    log('t.attr("hotkey") `' + clickTarget.data("hotkey") + '`');
});
