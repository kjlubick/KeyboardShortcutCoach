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
		"short_desc": "Newer Convo"
	},
	'olderConvo': {
		"long_desc": "Go to Older Conversation",
		"short_desc": "Older Convo"
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
		"long_desc": "Update Conversation with Recently Received Messages",
		"short_desc": "Update Convo"
	},
	"send": {
		"long_desc": "Send Message",
		"short_desc": "Send"
	},
	"undo": {
		"long_desc": "Undo Last Action",
		"short_desc": "Undo"
	},
	"markAsRead": {
		"long_desc": "Mark Message(s) as Read",
		"short_desc": "Mark Read"
	},
	"markAsUnread": {
		"long_desc": "Mark Message(s) as Unread",
		"short_desc": "Mark Unread"
	},
	"markCurrentAsUnread": {
		"long_desc": "Mark Current Message as Unread and Go to Inbox",
		"short_desc": "Mark Current..."
	},
	"markImportant": {
		"long_desc": "Mark Message(s) as Important",
		"short_desc": "Mark Important"
	},
	"markUnimportant": {
		"long_desc": "Mark Message(s) as Unimportant",
		"short_desc": "Mark Unimportant"
	},
	"makePhoneCall": {
		"long_desc": "Make Phone Call",
		"short_desc": "Phone Call"
	},
	"searchLabel": {
		"long_desc": "Search Messages by Label",
		"short_desc": "Label Search"
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