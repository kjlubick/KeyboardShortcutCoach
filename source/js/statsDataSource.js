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
		"long_desc": "Go to Newer Conversation",
		"short_desc": "Newer Conversation"
	},
	'olderConvo': {
		"long_desc": "Go to Older Conversation",
		"short_desc": "Older Conversation"
	},
	"search": {
		"long_desc": "Search Messages",
		"short_desc": "Search"
	},
	"searchContacts": {
		"long_desc": "Search Contacts",
		"short_desc": "Search Contacts"
	},
	"selectSingleConvo": {
		"long_desc": "Select\\Unselect This Conversation",
		"short_desc": "Select Convo"
	},
	"starConvo": {
		"long_desc": "Star\\Unstar This Conversation",
		"short_desc": "Star Convo"
	},
	"muteConvo": {
		"long_desc": "Mute Conversation and Ignore Replies",
		"short_desc": "Mute Convo"
	},
	"reportSpam": {
		"long_desc": "Report This Message as Spam",
		"short_desc": "Report Spam"
	},
	"delete": {
		"long_desc": "Delete Message",
		"short_desc": "Delete"
	},
	"reply": {
		"long_desc": "Reply to this Message",
		"short_desc": "Reply"
	},
	"replyAll": {
		"long_desc": "Reply to All Recipients",
		"short_desc": "Reply All"
	},
	"forward": {
		"long_desc": "Forward Message",
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