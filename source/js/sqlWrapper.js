/*global chrome, logf, log*/
var db;


function setUpDB(){
	db = openDatabase('toolDB', '1.0', 'A Database of tool uses and times', 5 * 1024 * 1024);
	db.transaction(function (tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS tools (id INTEGER PRIMARY KEY ASC AUTOINCREMENT, application_name TEXT, tool_name TEXT,'+ 
			'invocation_method TEXT, timestamp INTEGER)');
	});
}

function executeQuery(query, params, onSuccess) {
	db.transaction(function (tx) {
		executeQueryInTransaction(tx, query, params, onSuccess);
	});
}

function executeQueryInTransaction(tx, query, params, onSuccess) {
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

		executeQueryInTransaction(tx, "INSERT INTO tools (application_name, tool_name, invocation_method , timestamp) VALUES (?,?,?,?)",
			[application,tool,invocation,new Date().getTime()]);

		// tx.executeSql('SELECT * FROM tools', [], function (tx, results) {
		// 	var len = results.rows.length, i;
		// 	log("Select all");
		// 	for (i = 0; i < len; i++) {
		// 		logf(results.rows.item(i));
		// 	}
		// });
	});
}

function extractSQLRows(sqlData) {
	var retVal = [];
	for(var i = 0;i< sqlData.rows.length; i++) {
		retVal.push(sqlData.rows.item(i));
	}
	return retVal;
}

chrome.runtime.onMessage.addListener(
	function(request, source, callback) {
		if (!db) {
			setUpDB();
		}
		if (request.sawTool) {
			
			var splits = request.sawTool.split(".");
			if (splits.length >= 3) {
				reportTool(splits[0],splits[1],splits[2]);
			}
		}
		else if (request.getLastWeek) {
			executeQuery("Select * from tools Where timestamp > ?",[new Date().getTime() - 7*24*60*60000], function(tx, data){
				logf(tx);
				log(data);		//JSON.wtringify() fails on data if nothing was inserted because insertID doesn't exist or something
				callback(extractSQLRows(data));
			});
			return true;		//delay the callback
		}
		else if (request.getAll) {
			executeQuery("Select * from tools",[], function(tx, data){
				callback(extractSQLRows(data));
			});
			return true;		//delay the callback
		}
		else {
			log("I don't know how to handle "+JSON.stringify(request));
		}
	}
);