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
				x: -50
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
				neckWidth: '30%',
                neckHeight: '25%'
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


function displayApplication(app) {
	drawGraph($('#gui-graph'), "Tools invoked with Mouse", usageData[app].menu);
	drawGraph($('#key-graph'), "Tools invoked with Keyboard Shortcuts", usageData[app].key);

}


$(document).ready(function() {
	chrome.storage.local.get(null, function(data){
		parseStoredJSON(data);

		
	});
});


