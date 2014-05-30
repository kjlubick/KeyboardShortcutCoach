/*global log, logf, clickTargetProcessors, processAriaLabel, createShortcut, setDebugLogger*/
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
    createShortcut('t.attr("id") == "js-command-bar-field"', ['/', 's'], 'to search current repository or search all of GitHub, respectively');
    createShortcut('t.data("hotkey") == "g n" && t.x !=0', ['g n'], 'to view notifications');  // we check the x here because the actual shortcut clicks this link
    createShortcut('t.processedAriaLabel == "Code"', ['g c'], 'to visit the project screen, aka, the <u>c</u>ode screen');
    createShortcut('t.processedAriaLabel == "Issues" && t.x !=0 ', ['g i'], 'to visit the <u>i</u>ssue tracker');
    createShortcut('t.text() == "New Issue"', ['c'], 'to <u>c</u>reate an issue');
}


//Code that runs on start
log("Hello startup github");
clickTargetProcessors.push(processAriaLabel);
fillGitHubShortcuts();

setDebugLogger(function (clickTarget) {
    log('Click t (Target):');
    logf(clickTarget);
    log('t.text() `' + clickTarget.text() + '`');
    log('t.processedAriaLabel `' + clickTarget.processedAriaLabel + '`');
    log('t.attr("title") `' + clickTarget.attr('title') + '`');
    log('t.attr("id") `' + clickTarget.attr('id') + '`');
    log('t.attr("name") `' + clickTarget.attr('name') + '`');
    log('t.attr("hotkey") `' + clickTarget.data("hotkey") + '`');
});
