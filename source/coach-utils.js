/*global chrome, Mousetrap */
/*exported logf, setDebugLogger, createShortcut*/
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

var timeout = 3000; // default timeout for notifications
var debug = true; // is this a debug run?
var clickTargetProcessors = [];
var shortcuts = [];
var debugLogger;

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

function setDebugLogger(loggerFunction) {
    debugLogger = loggerFunction;
}

function closePopUp(p) {
    p.fadeOut('slow');
}

function clearOutLocalStorage() {
    log("Clearing out");
    chrome.storage.local.remove("currentNotification");
}

function notify(message, type, timeout) {
    //http://notify.dconnell.co.uk/
    // default values
    var markup, notification, notificationSpan, notificationClose, savedNotification;
    message = typeof message !== 'undefined' ? message : '[blank message]';
    type = typeof type !== 'undefined' ? type : 'ksc_success';
    timeout = typeof timeout !== 'undefined' ? timeout : 3000;


    savedNotification = {"message":message, "type":type, "timeout":timeout};

    chrome.storage.local.set({"currentNotification":savedNotification},
        function() {
            log("finished... error");
            log(chrome.runtime.lastError);
        });

    // append markup if it doesn't already exist
    if ($('#ksc_notification').length < 1) {
        markup = '<div id="ksc_notification" class="' + type + '"><div class="ksc_main"></div><div class="ksc_sidemenu"><a class="ksc_close" href="#"></a></div></div>';

        $('body').append(markup);
    }

    // elements
    notification = $('#ksc_notification');
    notificationSpan = notification.find('div.ksc_main');
    notificationClose = notification.find('a.ksc_close');

    // set the message
    notificationSpan.html(message);

    // setup click event
    notificationClose.click(function (e) {
        e.preventDefault();
        notification.stop();
        closePopUp(notification);
        clearOutLocalStorage();
    });

    // for ie6, scroll to the top first
    if ($.browser.msie && $.browser.version < 7) {
        $('html').scrollTop(0);
    }

    console.log(new Date() + " notification made");
    // hide old notification, then show the new notification
    notification.stop().removeClass().addClass(type).fadeIn('fast', function () {
        setTimeout(clearOutLocalStorage, timeout);
        notification.delay(timeout);
        closePopUp(notification);
        
    });
}

//check if we have a notification from the other page
chrome.storage.local.get("currentNotification", function(item){
    log("currentNotifications");
    item = item.currentNotification;
    logf(item);
    if (item !== undefined && item.message !== undefined) {
        log("Additional Notification");
        notify(item.message, item.type, item.timeout);
        clearOutLocalStorage();
    }
});

function createShortcut(gE, s, m) {
    var result = {};
    //instead of clicking this gui elements
    result.guiElements = gE;
    // press these shortcuts
    result.shortcuts = s; // for example ['g','i']

    Mousetrap.bind(s[0], function() {
        console.log("Detected press of " + m);
    });

    // to achieve this
    result.message = m;
    //log('Creating Shortcut');
    //log('Gui Elements:' + result.guiElements);
    //log('Shortcuts:' + result.shortcuts.join(' or '));
    //log('Message:' + result.message);
    shortcuts.push(result);
}

Mousetrap.reset();
Mousetrap.bind("g a", function() {
        console.log("Detected press of test");
    });


function notify_missed_shortcut(s) {
    var text, shortcutLabels, i, n;
    text = "Press ";
    shortcutLabels = s.shortcuts.slice(); //to make an independent copy
    if (shortcutLabels.length > 0) {
        n = shortcutLabels.length;
        for (i = 0; i < n; i++) {
            shortcutLabels[i] = '<span class="ksc_key">' + shortcutLabels[i].toUpperCase().replace(' ', '</span> then <span class="ksc_key">') + '</span>';
            if (i % 2 == 1) {
                shortcutLabels.splice(i, 0, ' or ');
            }
        }
    }
    text += shortcutLabels.join(' ');
    text += ' ' + s.message;
    notify(text, 'ksc_information', timeout);
}

function click(e) {
    var t = $(e.target);

    t.x = e.x;
    t.y = e.y;

    //before the target is passed on, it is pre procesed through
    //the array of functions in clickTargetProcessors
    //this creates t.processedAriaLabel and t.processedText
    $.each(clickTargetProcessors, function (i, preprocess) {
        preprocess(t);
    });

    if (debug && debugLogger) {
        debugLogger(t);
    }
    //iterate through all conditions
    $.each(shortcuts, function (i, s) {
        var result = eval(s.guiElements);
        //if condition was met notify and break
        //log(i + ' - Evaling: ' + s.guiElements + ' = ' + result);
        if (result) {
            notify_missed_shortcut(s);
            return false;
        }
    });
}

document.addEventListener('click', click, true);