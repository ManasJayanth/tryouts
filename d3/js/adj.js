function Index(dataset){
	this.hash = new Array();
	for (var index = 0; index < dataset.categories.length; index++) {
		this.hash[dataset.categories[index]] = index;
	}
	this.lookUp = function(key) {
		return this.hash[key];
	}
}

$(document).ready(function(){
	d3.json('data/adj.json', renderChart)
	
});

function renderChart(dataset){
	coOccurence(dataset, '#viz-container', parseInt($('#viz-container').css('width')), 720, true);
}
function coOccurence(dataset, id, width, height, square)
{
	var calData = matrixData(dataset, width, height, square);
    console.log(calData);
    var grid = d3.select(id).append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .attr("class", "chart");

    var row = grid.selectAll(".row")
                  .data(calData)
                .enter().append("svg:g")
                  .attr("class", "row");

    var col = row.selectAll(".cell")
                 .data(function (d) { return d; })
                .enter().append("svg:rect")
                 .attr("class", "cell")
                 .attr("x", function(d) { return d.x; })
                 .attr("y", function(d) { return d.y; })
                 .attr("width", function(d) { return d.width; })
                 .attr("height", function(d) { return d.height; })
                 .on('mouseover', function() {
                    // d3.select(this)
                    //     .style('fill', '#0F0');
                 })
                 .on('mouseout', function() {
                    // d3.select(this)
                    //     .style('fill', '#FFF');
                 })
                 .on('click', function() {
                    // console.log(d3.select(this));
                 })
                 .style("fill", function(d, i){
                 	return d.color;
                 })
                 .style("stroke", '#555');

    d3.select('svg')
    	.selectAll('text')
    	.
}

function matrixData(dataset, gridWidth, gridHeight, square)
{
	var margin = 100;
    var data = new Array();
    var gridItemWidth = (gridWidth - margin) / dataset.categories.length - 10;
    var gridItemHeight = (gridHeight - margin) / dataset.categories.length - 10;//(square) ? gridItemWidth : gridHeight / 7;
    var startX = margin;//gridItemWidth / 2;
    var startY = margin;//gridItemHeight / 2;
    var stepX = gridItemWidth + 10;
    var stepY = gridItemHeight + 10;
    var xpos = startX;
    var ypos = startY;
    var newValue = 0;
    var count = 0;

    // var communication = dataset.values;
    for (var i = 0; i < dataset.categories.length; i++) {
    	data.push(new Array());
    	for (var j = 0; j < dataset.categories.length; j++) {
    		data[i][j] = { 
    						messages: 0,
    						color: 'rgba(0,0,0,0.2)',
    						tooltip: '',
                            x: xpos,
                            y: ypos,    
                            height: gridItemHeight,
                            width: gridItemWidth                            
                        };
    		xpos += stepX;
    	}
    	xpos = startX;
        ypos += stepY;
    };

    var getIndex = new Index(dataset);
    for (var index = 0; index < dataset.values.length; index++) {
    	var i = getIndex.lookUp(dataset.values[index].from);
    	var j = getIndex.lookUp(dataset.values[index].to);
    	data[i][j].messages = dataset.values[index].messages;
    	data[i][j].color = dataset.values[index].color;
    	data[i][j].tooltip = dataset.values[index].tooltip;
    }
    return data;
}
