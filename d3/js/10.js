$(document).ready(function(){
	d3.json('data/test.json', visualize);
});



function visualize (dataset) {
	var containerLength = $('#viz-container').css('max-width');
	containerLength = containerLength.substr(0, containerLength.length-2);
	var margin = 25,
		screenHeight = screen.availHeight,
		centerScreen = [containerLength/2, screenHeight/2],
		L = containerLength/4,
		Ang = (2 * Math.PI) / dataset.length,
		x2 = [],//centerScreen[0] + Math.cos(Ang) * L
		y2 = [];//centerScreen[1] + Math.sin(Ang) * L

	for (var i = 0; i < dataset.length; i++) {
		x2 = x2.concat([centerScreen[0] + Math.cos(Ang * (i+1)) * L]);
		y2 = y2.concat([centerScreen[1] + Math.sin(Ang * (i+1)) * L]);
		console.log([x2[i],y2[i]] + 'for angle: ' + Ang * (i+1));
	};

	var vizContainer = d3.select('#viz-container')
		.append('svg')
		.attr('height', screenHeight)
		.attr('width', containerLength);
		
	vizContainer.selectAll('circle')
		.data(dataset)
		.enter()
		.append('circle')
		.attr('cx', centerScreen[0])
		.attr('cy', centerScreen[1])
		.attr('r', 5)
		.attr('fill','red')
		.attr('stroke-width', 2)
		.transition()
		.ease('back')
		.duration(1500)
		.attr('cx', function  (d, i) {
			return x2[i];
		})
		.attr('cy', function(d, i){
			return y2[i];
		});

		setTimeout(function(){
			vizContainer.selectAll('g')
			.data(dataset)
			.enter()
			.append('g')
			.selectAll('line')
			.data(function (d, i) {
				return d.values;
			})
			.enter()
			.append('line')
			.style('stroke', function(d){
				return 'rgb(255,' + parseInt(255*d) + ',255)';
			})
			.style('stroke-width', 2)
			.attr('x1', function(d, i, j){
				return x2[j];
			})
			.attr('y1', function(d, i, j){
				return y2[j];
			})
			.attr('x2', function(d, i, j){
				return x2[j];
			})
			.attr('y2', function(d, i, j){
				return y2[j];
			})
			.transition()
			.ease('linear')
			.duration(2000)
			.attr('x2', function(d, i){
				return x2[i];
			})
			.attr('y2', function(d, i){
				return y2[i];
			});
		}, 1500);
}
