/*global chrome, Highcharts*/

var sampleData = [['Downloads', 4064],['Website visits', 15654],['Requested price list', 1987],['Invoice sent', 976],['Finalized', 846]];
//var sampleData = [{"createIssue": 30}, {"goBackToIssue": 20}, {"issue": 15}, {"other": 12}];


//var usageData = {Application1 : {keyTools: [[tool1,uses],[tool2, uses]] guiTools: [[tool3,uses],[tool4,uses]]}}
var usageData = {};



function drawGraph(element, title, data) {
	element.highcharts({
			chart: {
				type: 'funnel',
				marginRight: 0
			},
			title: {
				text: title,
				align: "center"
			},
			exporting: {
				enabled: false
			},
			plotOptions: {
				series: {
					dataLabels: {
						enabled: false,
						format: '<b>{point.name}</b> ({point.y:,.0f})',
						color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
						softConnector: true
					}
				},
				funnel: {
					neckWidth: '80%',
               	 	neckHeight: '100%'
				}
				
			},
			legend: {
				enabled: false
			},
			tooltip: {
				formatter: function() {
					//console.log(this);
					return "You've invoked " + this.key +" "+ this.y+" times.";
				}
			},
			series: [{
				name: 'Unique users',
				'data': data
			}]
		});
}


function sortArrayDoubles(a,b) {
	return b[1] - a[1];
}

function parseStoredJSON(data) {
	console.log(data);

	for (var value in data) {
		var split = value.split(".");
		var application = split[0], type = split[1], tool = split[2];

		var applicationHash = usageData[application];
		if (applicationHash === undefined) {
			applicationHash = {key: [], menu: []};
		} 
		applicationHash[type].push([tool, data[value]]);
		usageData[application] = applicationHash;
	}

	for(value in usageData) {
		usageData[value].menu.sort(sortArrayDoubles);
		usageData[value].key.sort(sortArrayDoubles);
	}

	console.log(usageData);
}

function sumArrayDoubles(arr) {
	var sum = 0;
	for (var i = arr.length - 1; i >= 0; i--) {
		sum+= arr[i][1];
	}
	return sum;
}


function displayApplication(app) {
	var keyTotal = sumArrayDoubles(usageData[app].key), guiTotal = sumArrayDoubles(usageData[app].menu);
	console.log(keyTotal);
	console.log(guiTotal);

	if (keyTotal > guiTotal) {
		$('#key-graph').css("height",0.9*window.innerHeight);
		$('#gui-graph').css("height", Math.max(0.9*window.innerHeight * guiTotal / keyTotal, 0.9*window.innerHeight * 0.3) );
	} else {
		$('#gui-graph').css("height",0.9*window.innerHeight);
	}


	drawGraph($('#gui-graph'), guiTotal + " Tools invoked with Mouse", usageData[app].menu);
	drawGraph($('#key-graph'), keyTotal + " Tools invoked with Keyboard Shortcuts", usageData[app].key);

}


$(document).ready(function() {
	chrome.storage.local.get(null, function(data){
		parseStoredJSON(data);

		displayApplication("Gmail");
	});
});


