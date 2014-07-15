/*global chrome, Highcharts, logf*/

//var usageData = {Application1 : {keyTools: [{name:tool1,y:uses},{name:tool2,y:uses}],
//guiTools: [{name:tool3,y:uses},{name:tool4,y:uses}]}}
var usageData = {};

//var descriptions = {Application1: {toolid: {long_desc: "MER MER MER", short_desc: "Max Length N chars"}}}
var descriptions = {};

var currentApplication = "Gmail";

var activeCharts = [];

function setUpForDrillDown(data) {
	//logf(data);

	return [data,{}];
}

function drawGraph(element, title, data) {

	var drillDownArr = setUpForDrillDown(data);
	var firstData = drillDownArr[0];
	var drillDownData = drillDownArr[1];

	element.highcharts({
		chart: {
			type: 'funnel',
			marginRight: '120'
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
					enabled: true,
						//format: '<b>{point.name}</b> ({point.y:,.0f})',
						formatter: function() {
							var toolDesc = descriptions[currentApplication][this.key] ? descriptions[currentApplication][this.key].short_desc : this.key;
							//console.log(toolDesc);
							return '<b>' + toolDesc + ':</b> '+this.y+" use" + (this.y > 1 ? "s":"");
						},
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
					var toolDesc = descriptions[currentApplication][this.key] ? descriptions[currentApplication][this.key].long_desc : this.key;
					//console.log(toolDesc);
					return "You've invoked \"" + toolDesc +"\" "+ this.y+" time" + (this.y > 1 ? "s.":".");
				}
			},
			series: [{
				name: 'Unique users',
				'data': firstData
			}],
			drilldown: {
				//If I want to do multiple drilldown
				//http://stackoverflow.com/questions/23153403/drilldown-multiple-levels-highchart
				series : drillDownData
			}
		});
		activeCharts.push(element.highcharts());
}

function sortArrayDoubles(a,b) {
	return b.y - a.y;
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
		applicationHash[type].push({name: tool, y: data[value]});
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
		sum += arr[i].y;
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

	logf(activeCharts);

	$("#expandLeft").on('click', function() {
		activeCharts[0].setSize(activeCharts[0].chartWidth,0.9*window.innerHeight);
		$(this).parent().children("div").first().animate({height:0.9*window.innerHeight},300);
	});

}

$(document).ready(function() {

	chrome.runtime.sendMessage({"getDescriptions":true}, function(response){
		descriptions = response;
		console.log(descriptions);
		chrome.storage.local.get(null, function(data){
			parseStoredJSON(data);

			displayApplication(currentApplication);
		});
	});	
});