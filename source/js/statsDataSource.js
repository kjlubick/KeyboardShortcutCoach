/*global chrome*/

var descriptions = {"Gmail" : {
	"gotoInbox": { 
		"long_desc": "Go to Inbox",
		"short_desc": "Go to Inbox",
	},
	"archive": {
		"long_desc": "Archive an Email",
		"short_desc": "Archive",
	},
	"composeMessage": {
		"long_desc": "Archive an Email",
		"short_desc": "Archive",
	},


	"gotoStarred": {
		"long_desc": "Long",
		"short_desc": "Short"
	},
	"gotoSent": {
		"long_desc": "Long",
		"short_desc": "Short"
	},
	"gotoDrafts": {
		"long_desc": "Long",
		"short_desc": "Short"
	},
	"gotoContacts": {
		"long_desc": "Long",
		"short_desc": "Short"
	},
	"gotoTasks": {
		"long_desc": "Long",
		"short_desc": "Short"
	},
	"selectAllConvos": {
		"long_desc": "Long",
		"short_desc": "Short"
	},
	"deselectAllConvos": {
		"long_desc": "Long",
		"short_desc": "Short"
	},
	"selectReadConvos": {
		"long_desc": "Long",
		"short_desc": "Short"
	},
	"selectUnreadConvos": {
		"long_desc": "Long",
		"short_desc": "Short"
	},
	"selectStarred": {
		"long_desc": "Long",
		"short_desc": "Short"
	},
	"selectUnstarred": {
		"long_desc": "Long",
		"short_desc": "Short"
	},
	"returnToList": {
		"long_desc": "Long",
		"short_desc": "Short"
	},
	"newerConvo": {
		"long_desc": "Long",
		"short_desc": "Short"
	},
	'olderConvo': {
		"long_desc": "Long",
		"short_desc": "Short"
	},
	"search": {
		"long_desc": "Long",
		"short_desc": "Short"
	},
	"searchContacts": {
		"long_desc": "Long",
		"short_desc": "Short"
	},
	"selectSingleConvo": {
		"long_desc": "Long",
		"short_desc": "Short"
	},
	"starConvo": {
		"long_desc": "Long",
		"short_desc": "Short"
	},
	"muteConvo": {
		"long_desc": "Long",
		"short_desc": "Short"
	},
	"reportSpam": {
		"long_desc": "Long",
		"short_desc": "Short"
	},
	"delete": {
		"long_desc": "Long",
		"short_desc": "Short"
	},
	"reply": {
		"long_desc": "Long",
		"short_desc": "Short"
	},
	"replyAll": {
		"long_desc": "Long",
		"short_desc": "Short"
	},
	"forward": {
		"long_desc": "Long",
		"short_desc": "Short"
	},
	"updateConvo": {
		"long_desc": "Long",
		"short_desc": "Short"
	},
	"send": {
		"long_desc": "Long",
		"short_desc": "Short"
	},
	"undo": {
		"long_desc": "Long",
		"short_desc": "Short"
	},
	"markAsRead": {
		"long_desc": "Long",
		"short_desc": "Short"
	},
	"markAsUnread": {
		"long_desc": "Long",
		"short_desc": "Short"
	},
	"markCurrentAsUnread": {
		"long_desc": "Long",
		"short_desc": "Short"
	},
	"markImportant": {
		"long_desc": "Long",
		"short_desc": "Short"
	},
	"markUnimportant": {
		"long_desc": "Long",
		"short_desc": "Short"
	},
	"makePhoneCall": {
		"long_desc": "Long",
		"short_desc": "Short"
	},
	"searchLabel": {
		"long_desc": "Long",
		"short_desc": "Short"
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