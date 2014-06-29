/*global chrome, log, logf*/

chrome.runtime.onMessage.addListener(
  function(request, sender,sendResponse) {
    log(sender.tab ?
    	"from a content script:" + sender.tab.url :
    	"from the extension");
    logf(request);
    if (request.getAll) {
    	chrome.storage.local.get(null, function(item){
    		sendResponse(item);
    	});
    	return true;
    } else {
    	log("Command not recognized");
    	sendResponse({"error":"Not recognized command"});
    }
});