var Pyk = {};

Pyk.Adjacency = function (options){
    /*** Properties ***/
    this.DOMele = options.selection;
    this.width = parseInt($(this.DOMele).css('width'));
    this.height = (typeof options.height === 'undefined' ? 720 : options.height);
    this.config = {};
    this.dataset = [];
    
    /*** Methods ***/
    that = this;
    this.visualize = function(){
        $(that.DOMele).html('<img src="img/spinner.gif" alt="" /> Loading...');
        d3.json('data/adj.json', function (dataset) {
            that.config = {
                chartMargin : 140,
                gridItemMargin : 2
            };
            that.config.gridItemWidth = (that.width - that.config.chartMargin) / dataset.categories.length - that.config.gridItemMargin;
            that.config.gridItemHeight = (that.height - that.config.chartMargin) / dataset.categories.length - that.config.gridItemMargin;
            that.config.startX = that.config.chartMargin;
            that.config.startY = that.config.chartMargin,
            that.config.stepX = that.config.gridItemWidth + that.config.gridItemMargin,
            that.config.stepY = that.config.gridItemHeight + that.config.gridItemMargin

            var calData = matrixData(dataset);
            $(that.DOMele).html("");
            var grid = d3.select(options.selection).append("svg")
                            .attr("width", that.width)
                            .attr("height", that.height)
                            .attr("class", "chart");

            var row = grid.selectAll(".row")
                            .data(calData)
                            .enter().append("svg:g")
                            .attr("class", "row");

            var col = row.selectAll(".cell")
                         .data(function (d) { return d; })
                        .enter().append("svg:rect")
                         .attr("class", "cell")
                         .attr("x", function (d, i, j) { return that.config.startX + that.config.stepX * i; })
                         .attr("y", function (d, i, j) { return that.config.startY + that.config.stepY * j; })
                         .attr("width", function(d) { return that.config.gridItemWidth; })
                         .attr("height", function(d) { return that.config.gridItemHeight; })
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
                .data(legendPosY(dataset.categories, that.width, that.height))
                .enter()
                .append('text')
                .attr('x', 135) //--------------->  chart margin
                .attr('y', function(d, i){
                    return d.y;
                })
                .text(function (d, i) {
                    return d.name;
                })
              .attr('text-anchor', 'end');

            d3.select('svg')
              .append('g')
              .attr('id', 'horizontal')
              .selectAll('text')
              .data(legendPosX(dataset.categories, that.width, that.height))
              .enter()
              .append('text')
              .attr('x', 135) //--------------->  chart margin
              .attr('y', function(d, i){
                return d.y;
              })
              .text(function (d, i) {
                return d.name;
              })
              .attr('text-anchor', 'start')
              .attr('transform', 'rotate(-90 135 135)');
            renderTooltip();
        });
    }
}

function legendPosY (categories, gridWidth, gridHeight) {
  var chartMargin = 140;
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
  var chartMargin = 140;
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
      y: chartMargin + stepX*(i+1) - stepY/2
    });
  }
  return data;
}

function matrixData(dataset)
{
    function Index(dataset){
        this.hash = new Array();
        for (var index = 0; index < dataset.categories.length; index++) {
            this.hash[dataset.categories[index]] = index;
        }
        this.lookUp = function(key) {
            return this.hash[key];
        }
    }

    var data = new Array();
    for (var i = 0; i < dataset.categories.length; i++) {
      data.push(new Array());
      for (var j = 0; j < dataset.categories.length; j++) {
        data[i][j] = { 
                messages: 0,
                color: 'rgba(0,0,0,0.2)',
                tooltip: ''
                        };
      }
    }

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

/*** jQuery code ***/
$(document).ready(function(){
     var chart = new Pyk.Adjacency({
        selection: '#viz-container'
     });
     chart.visualize();
});