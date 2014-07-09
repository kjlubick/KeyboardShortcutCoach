/*global chrome, logf,log*/
var db;


function setUpDB(){
	db = openDatabase('toolDB', '1.0', 'A Database of tool uses and times', 5 * 1024 * 1024);
	db.transaction(function (tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS tools (id INTEGER PRIMARY KEY ASC AUTOINCREMENT, application_name TEXT, tool_name TEXT,'+ 
			'invocation_method TEXT, timestamp INTEGER)');
	});
}

function executeQuery(tx, query, params, onSuccess) {
	onSuccess = (onSuccess ? onSuccess : function(){});	//default to empty function for success
	tx.executeSql(query, params,onSuccess, function(t, error) {
		log("Error : "+ error.message + " in " + query + " using params:");
		logf(params);
		logf(t);
	});
}

function reportTool(application, tool, invocation){
	db.transaction(function (tx) {
		log("storing "+application+" "+tool+" "+invocation);

		executeQuery(tx, "INSERT INTO tools (application_name, tool_name, invocation_method , timestamp) VALUES (?,?,?,?)",
			[application,tool,invocation,new Date().getTime()]);

		//tx.executeSql("INSERT INTO tools (application_name, tool_name, invocation_method , timestamp) VALUES (?,?,?,?)",
		//	[application,tool,invocation,new Date().getTime()]);

		// tx.executeSql('SELECT * FROM tools', [], function (tx, results) {
		// 	var len = results.rows.length, i;
		// 	log("Select all");
		// 	for (i = 0; i < len; i++) {
		// 		logf(results.rows.item(i));
		// 	}
		// });
	});
}

chrome.runtime.onMessage.addListener(
	function(request) {
		if (request.sawTool) {
			if (!db) {
				setUpDB();
			}
			var splits = request.sawTool.split(".");
			if (splits.length >= 3) {
				reportTool(splits[0],splits[1],splits[2]);
			}
		}
	}
);