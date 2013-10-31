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
    d3.json('data/adj.json', renderChart);  
});

function renderChart(dataset){
    coOccurence(dataset, '#viz-container', parseInt($('#viz-container').css('width')), 720, true);
  renderTooltip();
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
                 .style("stroke", '#555')
                 .on("mouseover", function(d, i){
                    d3.select("#adj-tooltip").html(d.tooltip);
                    d3.select("#adj-tooltip").style("visibility", "visible");
                  })
                  .on("mousemove", function(){
                      var yReduce = parseInt(d3.select("#adj-tooltip").style("height")) + 40;
                      var xReduce = parseInt(d3.select("#adj-tooltip").style("width")) / 2;
                      d3.select("#adj-tooltip").style("top", (d3.event.pageY- yReduce)+"px").style("left",(d3.event.pageX-xReduce)+"px");
                  })
                  .on("mouseout", function(){
                    d3.select("#adj-tooltip").style("visibility", "hidden");
                  });



    d3.select('svg')
        .append('g')
        .selectAll('text')
        .data(legendPosY(dataset.categories, width, height))
        .enter()
        .append('text')
        .attr('x', 50) //--------------->  chart margin
        .attr('y', function(d, i){
            return d.y;
        })
        .text(function (d, i) {
            return d.name;
        })
      .style('text-align', 'right');


  d3.select('svg')
      .append('g')
      .selectAll('text')
      .data(legendPosX(dataset.categories, width, height))
      .enter()
      .append('text')
      .attr('y', 50) //--------------->  chart margin
      .attr('x', function(d, i){
        return d.x;
      })
      .text(function (d, i) {
        return d.name;
      })
      .style('text-align', 'left');
}

function legendPosY (categories, gridWidth, gridHeight) {
  var chartMargin = 100;
  var gridItemMargin = 10;
  var data = new Array();
  var gridItemWidth = (gridWidth - chartMargin) / categories.length - gridItemMargin;
  var gridItemHeight = (gridHeight - chartMargin) / categories.length - gridItemMargin;
  var startX = chartMargin;
  var startY = chartMargin;
  var stepX = gridItemWidth + gridItemMargin;
  var stepY = gridItemHeight + gridItemMargin;

    for (var i = 0; i < categories.length; i++) {
    data.push({
      name: categories[i],
      y: chartMargin + stepY*(i+1) - stepY/2
    });
  }
  return data;
}

function legendPosX (categories, gridWidth, gridHeight) {
  var chartMargin = 100;
  var gridItemMargin = 10;
  var data = new Array();
  var gridItemWidth = (gridWidth - chartMargin) / categories.length - gridItemMargin;
  var gridItemHeight = (gridHeight - chartMargin) / categories.length - gridItemMargin;
  var startX = chartMargin;
  var startY = chartMargin;
  var stepX = gridItemWidth + gridItemMargin;
  var stepY = gridItemHeight + gridItemMargin;

    for (var i = 0; i < categories.length; i++) {
    data.push({
      name: categories[i],
      x: chartMargin + stepX*(i+1) - stepX/2
    });
  }
  return data;
}

function matrixData(dataset, gridWidth, gridHeight)
{
      var chartMargin = 100;
      var gridItemMargin = 10;
    var data = new Array();
    var gridItemWidth = (gridWidth - chartMargin) / dataset.categories.length - gridItemMargin;
    var gridItemHeight = (gridHeight - chartMargin) / dataset.categories.length - gridItemMargin;
    var startX = chartMargin;
    var startY = chartMargin;
    var stepX = gridItemWidth + gridItemMargin;
    var stepY = gridItemHeight + gridItemMargin;
    var xpos = startX;
    var ypos = startY;
    var newValue = 0;

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

function renderTooltip() {
  $("#adj-tooltip").remove();
  this.tooltip = d3.select("body")
      .append("div").attr("id","adj-tooltip")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("background", "#fff")
      .style("padding", "10px 20px")
      .style("box-shadow", "0 0 10px #000")
      .style("border-radius", "5px")
      .text("a simple tooltip");
}