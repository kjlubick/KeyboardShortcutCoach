/*global chrome, Highcharts*/

var sampleData = [['Website visits', 15654],['Downloads', 4064],['Requested price list', 1987],['Invoice sent', 976],['Finalized', 846]];

function drawGraph(element, title, data) {
	element.highcharts({
			chart: {
				type: 'pyramid',
				marginRight: 100
			},
			title: {
				text: title,
				x: -50
			},
			plotOptions: {
				series: {
					dataLabels: {
						enabled: false,
						format: '<b>{point.name}</b> ({point.y:,.0f})',
						color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
						softConnector: true
					}
				}
			},
			legend: {
				enabled: false
			},
			tooltip: {
				formatter: function() {
					return "You've invoked " + this.name +" "+ this.y+" times.";
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

		drawGraph($('#gui-graph'), "Tools invoked with Mouse", sampleData);
		drawGraph($('#key-graph'), "Tools invoked with Keyboard Shortcuts", sampleData);

	});
});


