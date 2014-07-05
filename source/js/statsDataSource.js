/*global chrome*/

var descriptions = {"Gmail" : {
	"gotoInbox": { 
		"long_desc": "Some Long Description",
		"short_desc": "Some Short Desc",
	}
},
	"GitHub" : {

	}
};


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.getDescriptions)
      sendResponse(descriptions);
  });