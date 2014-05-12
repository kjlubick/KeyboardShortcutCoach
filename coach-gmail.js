/*global */
/*
The MIT License (MIT)

Copyright (c) 2014 Kevin Lubick

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

function processAriaLabel(t) {
    //returns own, or parent's or grand-parent's or empty aria-label  
    al = t.attr('aria-label');
    if (typeof al === "undefined") {
        al = t.parent().attr('aria-label');
        if (typeof al === "undefined") {
            al = t.parent().parent().attr('aria-label');
            if (typeof al === "undefined") { al = ''; }
        }
    }
    t.processedAriaLabel = al;
    cw(al);
}
function processText(t) {
    // remove E-Mail Count strips _(4) from 'Inbox (4)' and (45)_ from '(45) Inbox' in right-to-left languages
    // zero or 1 whitespace, any digits in brackets and zero or one whitespace
    text = t.text().replace(/\W?\([\d]*\)\W?/g, "");
    t.processedText = text;
}


function fillGMailShortcuts() {
	shortcuts.push(createShortcut('t.processedText == "COMPOSE"', ['c'], 'to <u>C</u>ompose a message.'));
	shortcuts.push(createShortcut('t.processedText == "Inbox"', ['g i'], 'to <u>G</u>o to <u>I</u>nbox.'));
	shortcuts.push(createShortcut('t.processedText == "Starred" && (t.is("a") || t.find("a").length > 0)', ['g s'], 'to Go to Starred conversations'));
	shortcuts.push(createShortcut('t.processedText == "Sent Mail"', ['g t'], 'to Go to Sen<u>t</u> messages'));
	shortcuts.push(createShortcut('t.processedText == "Drafts"', ['g d'], 'to Go to Drafts'));
	shortcuts.push(createShortcut('t.processedText == "Contacts"', ['g c'], 'to Go to Contacts'));
	shortcuts.push(createShortcut('t.processedText == "Tasks"', ['g k'], 'to Go to Tasks'));
	shortcuts.push(createShortcut('t.processedText == "All"', ['* a'], 'to Select all conversations'));
	shortcuts.push(createShortcut('t.processedText == "None"', ['* n'], 'to Deselect all conversations'));
	shortcuts.push(createShortcut('t.processedText == "Read"', ['* r'], 'to Select read conversations'));
	shortcuts.push(createShortcut('t.processedText == "Unread"', ['* u'], 'to Select unread conversations'));
	shortcuts.push(createShortcut('t.processedText == "Starred" && (!t.is("a") && !t.find("a").length)', ['* s'], 'to Select starred conversations'));
	shortcuts.push(createShortcut('t.processedText == "Unstarred"', ['* t'], 'to Select unstarred conversations'));
	shortcuts.push(createShortcut('t.processedText == "" && -1 !=t.processedAriaLabel.indexOf("Back to ")', ['u'], 'to return to conversation list'));
	shortcuts.push(createShortcut('t.processedText == "" && -1 !=t.processedAriaLabel.indexOf("Newer")', ['k'], 'for "Newer conversation"'));
	shortcuts.push(createShortcut('t.processedText == "" && -1 !=t.processedAriaLabel.indexOf("Older")', ['j'], 'for "Older conversation"'));
	shortcuts.push(createShortcut('t.processedText == "" && t.attr("name") == "q"', ['/'], 'to Search email'));
	shortcuts.push(createShortcut('t.processedText == "" && t.attr("label") == "Search people..."', ['q'], 'to search chat contacts.'));
	shortcuts.push(createShortcut('t.processedText == "" && t.parent().attr("role")=="checkbox" && -1==t.processedAriaLabel.indexOf("tar")', ['x'], 'to (un)select conversation'));
	shortcuts.push(createShortcut('t.processedAriaLabel == "Archive"', ['e'], 'to Archive'));
	shortcuts.push(createShortcut('t.processedText == "Mute" || t.processedText == "Unmute"', ['m'], 'to Mute/Ignore conversation'));
	shortcuts.push(createShortcut('t.processedAriaLabel == "Report spam" || t.processedText == "Report spam"', ['!'], 'to Report as spam'));
	shortcuts.push(createShortcut('t.processedAriaLabel == "Delete"', ['#'], 'to move conversation to trash'));
	shortcuts.push(createShortcut('t.processedAriaLabel == "Reply" || t.processedText == "Reply"', ['r'], 'to Reply'));
	shortcuts.push(createShortcut('t.processedAriaLabel == "Reply to all" || t.processedText == "Reply to all"', ['a'], 'to Reply all'));
	shortcuts.push(createShortcut('t.processedText == "Forward"', ['f'], 'to Forward the email'));
	shortcuts.push(createShortcut('t.processedText == "Update conversation"', ['<Shift> + n'], 'to Update conversation'));
	shortcuts.push(createShortcut('t.processedText == "Send"', ['(Tab) Enter'], 'to Send mail'));
	shortcuts.push(createShortcut('t.processedText == "Undo"', ['z'], 'to Undo last action'));
	shortcuts.push(createShortcut('t.processedText == "Mark as read"', ['(Shift) + i'], 'to Mark as read'));
	shortcuts.push(createShortcut('t.processedText == "Mark as unread"', ['(Shift) + u'], 'to Mark as unread'));
	shortcuts.push(createShortcut('t.processedText == "Mark unread from here"', ['_'], 'to Mark unread from the selected message'));
	shortcuts.push(createShortcut('t.processedAriaLabel == "Not important"', ['+', '='], 'to Mark as important'));
	shortcuts.push(createShortcut('-1 != t.processedAriaLabel.indexOf("Important mainly because")', ['-'], 'to Mark as not important'));
	shortcuts.push(createShortcut('t.processedText == "Call phone"', ['g p'], 'to Make a phone call'));
}


//Code that runs on start
cw("Hello startup");
clickTargetProcessors.push(processText);
clickTargetProcessors.push(processAriaLabel);
fillGMailShortcuts();
