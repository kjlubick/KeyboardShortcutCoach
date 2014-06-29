/*global chrome*/

var url = chrome.runtime.getURL("stats.html");
chrome.tabs.create({'url': url});