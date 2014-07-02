/*global chrome, Highcharts*/

$(document).ready(function() {
	chrome.storage.local.get(null, function(item){
		//$("#out").text(JSON.stringify(item));
		console.log(item);


		$('#gui-graph').highcharts({
			chart: {
				type: 'pyramid',
				marginRight: 100
			},
			title: {
				text: 'Sales pyramid',
				x: -50
			},
			plotOptions: {
				series: {
					dataLabels: {
						enabled: true,
						format: '<b>{point.name}</b> ({point.y:,.0f})',
						color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
						softConnector: true
					}
				}
			},
			legend: {
				enabled: false
			},
			series: [{
				name: 'Unique users',
				data: [
				['Website visits', 15654],
				['Downloads', 4064],
				['Requested price list', 1987],
				['Invoice sent', 976],
				['Finalized', 846]
				]
			}]
		});

		$('#key-graph').highcharts({
			chart: {
				type: 'pyramid',
				marginRight: 100
			},
			title: {
				text: 'Sales pyramid',
				x: -50
			},
			plotOptions: {
				series: {
					dataLabels: {
						enabled: true,
						format: '<b>{point.name}</b> ({point.y:,.0f})',
						color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
						softConnector: true
					}
				}
			},
			legend: {
				enabled: false
			},
			series: [{
				name: 'Unique users',
				data: [
				['Website visits', 15654],
				['Downloads', 4064],
				['Requested price list', 1987],
				['Invoice sent', 976],
				['Finalized', 846]
				]
			}]
		});
	});
});


