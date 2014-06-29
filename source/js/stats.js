/*global chrome*/

$(document).ready(function() {
	chrome.runtime.sendMessage({getAll: "true"}, function(response) {

		$("#out").text(JSON.stringify(response));
  		console.log(response);
		});
	console.log("loaded");
});


