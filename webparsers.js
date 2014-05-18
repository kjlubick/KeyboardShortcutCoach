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

function processAriaLabel(t) {
    //returns own, or parent's or grand-parent's or empty aria-label  
    var al = t.attr('aria-label');
    if (typeof al === "undefined") {
        al = t.parent().attr('aria-label');
        if (typeof al === "undefined") {
            al = t.parent().parent().attr('aria-label');
            if (typeof al === "undefined") { al = ''; }
        }
    }
    t.processedAriaLabel = al;
}
function processText(t) {
    // remove E-Mail Count strips _(4) from 'Inbox (4)' and (45)_ from '(45) Inbox' in right-to-left languages
    // zero or 1 whitespace, any digits in brackets and zero or one whitespace
    var text = t.text().replace(/\W?\([\d]*\)\W?/g, "");
    t.processedText = text;
}