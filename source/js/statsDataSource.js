/*global chrome*/

var descriptions = {"Gmail" : {
	"gotoInbox": { 
		"long_desc": "Go to Inbox",
		"short_desc": "Go to Inbox",
	},
	"archive": {
		"long_desc": "Archive an Email",
		"short_desc": "Archive",
	}

// 	"composeMessage"
// "gotoStarred"
// "gotoSent"
// "gotoDrafts"
// "gotoContacts"
// "gotoTasks"
// "selectAllConvos"
// "deselectAllConvos"
// "selectReadConvos"
// "selectUnreadConvos"
// "selectStarred"
// "selectUnstarred"
// "returnToList"
// "newerConvo"
// "search"
// "searchContacts"
// "selectSingleConvo"
// "starConvo"
// "archive"
// "muteConvo"
// "reportSpam"
// "delete"
// "reply"
// "replyAll"
// "forward"
// "updateConvo"
// "send"
// "undo"
// "markAsRead"
// "markAsUnread"
// "markCurrentAsUnread"
// "markImportant"
// "markUnimportant"
// "makePhoneCall"
// "searchLabel"
},
	"GitHub" : {

	}
};


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.getDescriptions)
      sendResponse(descriptions);
  });