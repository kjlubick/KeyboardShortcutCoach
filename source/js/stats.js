/*global chrome, Highcharts*/

var sampleData = [['Downloads', 4064],['Website visits', 15654],['Requested price list', 1987],['Invoice sent', 976],['Finalized', 846]];
//var sampleData = [{"createIssue": 30}, {"goBackToIssue": 20}, {"issue": 15}, {"other": 12}];

function drawGraph(element, title, data) {
	element.highcharts({
			chart: {
				type: 'funnel',
				marginRight: 100
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
					console.log(this);
					return "You've invoked " + this.key +" "+ this.y+" times.";
				}
			},
			series: [{
				name: 'Unique users',
				'data': data
			}]
		});
}

$(document).ready(function() {
	chrome.storage.local.get(null, function(item){
		//$("#out").text(JSON.stringify(item));
		console.log(item);

		var keyData = [];

		for (var value in item) {
			console.log(value +" : "+ item[value]);
		}

		drawGraph($('#gui-graph'), "Tools invoked with Mouse", sampleData);
		drawGraph($('#key-graph'), "Tools invoked with Keyboard Shortcuts", sampleData);

	});
});


