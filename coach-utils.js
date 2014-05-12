/*The MIT License (MIT)

Copyright (c) 2014 Kevin Lubick

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.*/

var timeout = 3000; // default timeout for notifications
var debug = true; // is this a debug run?
var supportedLanguages = ['en-GB', 'en-US', 'iw'];
var clickTargetProcessors = new Array();
var shortcuts = [];
var currentNotifications = [];

function cw(s) { //write to console if in debug
    if (debug) {
        console.log("[KR]" + s);
    }
    return true;
}
function e(s) {     //a simple function to return an empty string if object is undefined or not a string
    if (typeof s != "string") {
        s = '';
    }
    return s;
}
function closePopUp(p) {
    p.fadeOut('slow');
}
function notify(message, type, timeout) {
    //http://notify.dconnell.co.uk/
    // default values
    var markup;
    message = typeof message !== 'undefined' ? message : 'Hello!';
    type = typeof type !== 'undefined' ? type : 'success';
    timeout = typeof timeout !== 'undefined' ? timeout : 3000;

    // append markup if it doesn't already exist
    if ($('#notification').length < 1) {
        markup = '<div id="notification" class="' + type + '"><div class="kr_main">Hello!</div><div class="kr_sidemenu"><a class="close" href="#"></a></div></div>';

        $('body').append(markup);
    }

    // elements
    $notification = $('#notification');
    $notificationSpan = $('#notification div.kr_main');
    $notificationClose = $('#notification a.close');

    // set the message
    $notificationSpan.html(message);

    // setup click event
    $notificationClose.click(function (e) {
        e.preventDefault();
        $notification.stop();
        closePopUp($notification);
    });

    // for ie6, scroll to the top first
    if ($.browser.msie && $.browser.version < 7) {
        $('html').scrollTop(0);
    }

    // hide old notification, then show the new notification
    $notification.stop().removeClass().addClass(type).fadeIn('fast', function () {
        $notification.delay(timeout);
        closePopUp($notification);
    });
}

function createShortcut(gE, s, m) {
    var result = {};
    //instead of clicking this gui elements
    result.guiElements = gE;
    // press these shortcuts
    result.shortcuts = s; // for example ['g','i']
    // to achieve this
    result.message = m; // 
    cw('Creating Shortcut');
    cw('Gui Elements:' + result.guiElements);
    cw('Shortcuts:' + result.shortcuts.join(' then '));
    cw('Message:' + result.message);
    return result;
}

function notify_missed_shortcut(s) {
    var text, shortcutLabels, i, n;
    text = "Press ";
    shortcutLabels = s.shortcuts.slice(); //to make an independent copy
    if (shortcutLabels.length > 0) {
        n = shortcutLabels.length;
        for (i = 0; i < n; i++) {
            shortcutLabels[i] = '<span class="key">' + shortcutLabels[i].toUpperCase().replace(' ', '</span> then <span class="key">') + '</span>';
            if (i % 2 == 1) {
                shortcutLabels.splice(i, 0, ' or ');
            }
        }
    }
    text += shortcutLabels.join(' ');
    text += ' ' + s.message;
    notify(text, 'information', timeout);
}

function click(e) {
    // http://stackoverflow.com/questions/9424550/how-can-i-detect-keyboard-events-in-gmail

    var t = $(e.target);

    //before the target is passed on, it is pre procesed through
    //the array of functions in clickTargetProcessors
    //this creates t.processedAriaLabel and t.processedText
    $.each(clickTargetProcessors, function (i, f) { f(t); });

    cw('Click t (Target):');
    cw(t);
    cw('t.processedText `' + t.processedText + '`');
    cw('t.text `' + t.text() + '`');
    cw('t.processedAriaLabel `' + t.processedAriaLabel + '`');
    cw('t.attr("title") `' + t.attr('title') + '`');
    //iterate through all conditions
    $.each(shortcuts, function (i, s) {
        var result = eval(s.guiElements);
        //if condition was met notify and break
        //cw(i + ' - Evaling: ' + s.guiElements + ' = ' + result);
        if (result) {

            notify_missed_shortcut(s);
            return false;
        }
    });
}

(function checkForNewIframe(doc, uniq) {
    var iframes, i, contentDocument;
    cw("Checking for new IFrame (" + doc + "," + uniq + ")");
    try {
        if (!doc) {
            return; // document does not exist. 
        }

        // Unique variable to make sure that we're not binding multiple times
        if (!doc.rwEventsAdded73212312) {
            //doc.addEventListener('keydown', keyDown, true);
            //doc.addEventListener('keydown', keyUp, true);
            doc.addEventListener('click', click, true);
            //Mousetrap.bindEventsTo(doc);
            doc.rwEventsAdded73212312 = uniq;
        } else if (doc.rwEventsAdded73212312 !== uniq) {
            // Conflict: Another script of the same type is running
            // Do not make further calls.
            return;
        }

        iframes = doc.getElementsByTagName('iframe');
        for (i = 0; i < iframes.length; i++) {
            //prevent 'Unsafe Javascript cross domain' warning http://stackoverflow.com/questions/11569723/chrome-extension-unsafe-javascript-attempt-to-access-frame-with-url-domains-pr/11570012#11570012
            if (iframes[i].src.indexOf(location.protocol + '//' + location.host) === 0 ||
                iframes[i].src.indexOf('about:blank') === 0 || iframes[i].src === '') {

                contentDocument = iframes[i].contentDocument;
                if (iframes[i].id == 'canvas_frame' && contentDocument && !contentDocument.rwEventsAdded73212312) {
                    // add poller to the new iframe
                    checkForNewIframe(iframes[i].contentDocument);
                }
            }
        }
    } catch (e) {
        //Error: Possibly a frame from another domain?
        cw('[ERROR] checkForNewIframe: ' + e);
    }
    checkForNewIframe();
})(document, 1 + Math.random()); // Initiate recursive function for the document.