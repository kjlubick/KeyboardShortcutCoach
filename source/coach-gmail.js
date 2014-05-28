/*global log, logf, createShortcut, clickTargetProcessors, processAriaLabel, processClasses, setDebugLogger*/
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

function processTextRemovingWhitespaceAndInboxyStuff(t) {
    // remove E-Mail Count strips _(4) from 'Inbox (4)' and (45)_ from '(45) Inbox' in right-to-left languages
    // zero or 1 whitespace, any digits in brackets and zero or one whitespace
    var text = t.text().replace(/\W?\([\d]*\)\W?/g, "");
    t.processedText = text;
}

function fillGMailShortcuts() {
    createShortcut('t.processedText == "COMPOSE"', ['c'], 'to <u>C</u>ompose a message.');
    createShortcut('t.processedText == "Inbox"', ['g i'], 'to <u>G</u>o to <u>I</u>nbox.');
    createShortcut('t.processedText == "Starred" && (t.is("a") || t.find("a").length > 0)', ['g s'], 'to Go to Starred conversations');
    createShortcut('t.processedText == "Sent Mail"', ['g t'], 'to Go to Sen<u>t</u> messages');
    createShortcut('t.processedText == "Drafts"', ['g d'], 'to Go to Drafts');
    createShortcut('t.processedText == "Contacts"', ['g c'], 'to Go to Contacts');
    createShortcut('t.processedText == "Tasks"', ['g k'], 'to Go to Tasks');
    createShortcut('t.processedText == "All"', ['* a'], 'to Select all conversations');
    createShortcut('t.processedText == "None"', ['* n'], 'to Deselect all conversations');
    createShortcut('t.processedText == "Read"', ['* r'], 'to Select read conversations');
    createShortcut('t.processedText == "Unread"', ['* u'], 'to Select unread conversations');
    createShortcut('t.processedText == "Starred" && (!t.is("a") && !t.find("a").length)', ['* s'], 'to Select starred conversations');
    createShortcut('t.processedText == "Unstarred"', ['* t'], 'to Select unstarred conversations');
    createShortcut('t.processedText == "" && -1 !=t.processedAriaLabel.indexOf("Back to ")', ['u'], 'to return to conversation list');
    createShortcut('t.processedText == "" && -1 !=t.processedAriaLabel.indexOf("Newer") && -1 == t.classes.indexOf("amI")', ['k'], 'for "Newer conversation"'); //as of 5/25/14, the left arrow for inbox page navigation has the class amI
    createShortcut('t.processedText == "" && -1 !=t.processedAriaLabel.indexOf("Older") && -1 == t.classes.indexOf("amJ")', ['j'], 'for "Older conversation"');  //as of 5/25/14, the left arrow for inbox page navigation has the class amJ
    createShortcut('t.processedText == "" && t.attr("name") == "q"', ['/'], 'to Search email');
    createShortcut('t.processedText == "" && t.attr("label") == "Search people..."', ['q'], 'to search chat contacts.');
    createShortcut('t.processedText == "" && t.parent().attr("role")=="checkbox" && -1==t.processedAriaLabel.indexOf("tar")', ['x'], 'to (un)select conversation');
    createShortcut('t.processedAriaLabel == "Archive"', ['e'], 'to Archive');
    createShortcut('t.processedText == "Mute" || t.processedText == "Unmute"', ['m'], 'to Mute/Ignore conversation');
    createShortcut('t.processedAriaLabel == "Report spam" || t.processedText == "Report spam"', ['!'], 'to Report as spam');
    createShortcut('t.processedAriaLabel == "Delete"', ['#'], 'to move conversation to trash');
    createShortcut('t.processedAriaLabel == "Reply" || t.processedText == "Reply"', ['r'], 'to Reply');
    createShortcut('t.processedAriaLabel == "Reply to all" || t.processedText == "Reply to all"', ['a'], 'to Reply all');
    createShortcut('t.processedText == "Forward"', ['f'], 'to Forward the email');
    createShortcut('t.processedText == "Update conversation"', ['<Shift>+n'], 'to Update conversation');
    createShortcut('t.processedText == "Send"', ['(Tab) Enter'], 'to Send mail');
    createShortcut('t.processedText == "Undo"', ['z'], 'to Undo last action');
    createShortcut('t.processedText == "Mark as read"', ['(Shift)+i'], 'to Mark as read');
    createShortcut('t.processedText == "Mark as unread"', ['(Shift)+u'], 'to Mark as unread');
    createShortcut('t.processedText == "Mark unread from here"', ['_'], 'to Mark unread from the selected message');
    createShortcut('t.processedAriaLabel == "Not important"', ['+', '='], 'to Mark as important');
    createShortcut('-1 != t.processedAriaLabel.indexOf("Important mainly because")', ['-'], 'to Mark as not important');
    createShortcut('t.processedText == "Call phone"', ['g p'], 'to Make a phone call');
    createShortcut('t.classes.indexOf("J-Ke") != -1 && t.attr("href") && t.attr("href").indexOf("#label") != -1', ['g l'], 'to start searching by <u>L</u>abel');
}


//Code that runs on start
log("Hello startup gmail");
clickTargetProcessors.push(processTextRemovingWhitespaceAndInboxyStuff);
clickTargetProcessors.push(processAriaLabel);
clickTargetProcessors.push(processClasses);
fillGMailShortcuts();

setDebugLogger(function (clickTarget) {
    log('Click t (Target):');
    logf(clickTarget);
    log('t.processedText `' + clickTarget.processedText + '`');
    log('t.text `' + clickTarget.text() + '`');
    log('t.processedAriaLabel `' + clickTarget.processedAriaLabel + '`');
    log('t.attr("title") `' + clickTarget.attr('title') + '`');
    log('t.attr("href") `' +  clickTarget.attr("href") +"`");
    log('t.classes `' +clickTarget.classes+'`');
});
