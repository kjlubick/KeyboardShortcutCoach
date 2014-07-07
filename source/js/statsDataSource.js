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
		"long_desc": "Compose an Email",
		"short_desc": "Compose",
	},
	"gotoStarred": {
		"long_desc": "Goto Starred Conversations",
		"short_desc": "Goto Starred"
	},
	"gotoSent": {
		"long_desc": "Goto Sent Conversation",
		"short_desc": "Goto Sent"
	},
	"gotoDrafts": {
		"long_desc": "Goto Drafts",
		"short_desc": "Goto Drafts"
	},
	"gotoContacts": {
		"long_desc": "View Contacts",
		"short_desc": "View Contacts"
	},
	"gotoTasks": {
		"long_desc": "View Tasks",
		"short_desc": "View Tasks"
	},
	"selectAllConvos": {
		"long_desc": "Select All Conversations",
		"short_desc": "Select All"
	},
	"deselectAllConvos": {
		"long_desc": "Deselect All Conversations",
		"short_desc": "Deselect All"
	},
	"selectReadConvos": {
		"long_desc": "Select Read Conversations",
		"short_desc": "Select Read"
	},
	"selectUnreadConvos": {
		"long_desc": "Select Unread Conversations",
		"short_desc": "Select Unread"
	},
	"selectStarred": {
		"long_desc": "Select Starred Conversations",
		"short_desc": "Select Starred"
	},
	"selectUnstarred": {
		"long_desc": "Select Unstarred Conversations",
		"short_desc": "Select Unstarred"
	},
	"returnToList": {
		"long_desc": "Return to Conversation List",
		"short_desc": "Return to List"
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