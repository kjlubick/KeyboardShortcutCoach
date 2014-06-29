/*global chrome*/

$(document).ready(function() {
	chrome.storage.local.get(null, function(item){
		$("#out").text(JSON.stringify(item));
    		console.logf(item);
    });
});


