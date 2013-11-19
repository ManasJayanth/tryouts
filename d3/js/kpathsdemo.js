/**
* Code to pare the d attribute form the SVG map of Karnataka
*/


$('#viz-container').html('<button type="button" id="next">Next</button>');
var tooltip = d3.select("body")
    .append("div").attr("id", "pyk-bubble-tooltip")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("background", "#fff")
    .style("padding", "10px 20px")
    .style("box-shadow", "0 0 10px #000")
    .style("border-radius", "5px")
    .text("a simple tooltip");

var svg = d3.select('body').append('svg')
var group = svg.append('g');


if (window.XMLHttpRequest){
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
}
else {
    // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}
xmlhttp.open("GET","maps/kmap.svg",false);
xmlhttp.send();
xmlDoc=xmlhttp.responseXML;

var h = xmlDoc.getElementsByTagName('svg')[0].getAttribute('height');
var w = xmlDoc.getElementsByTagName('svg')[0].getAttribute('width');
svg.attr('width', w)
    .attr('height', h);


function mover() {
    return tooltip.html('').style("visibility", "visible");
}
var node = xmlDoc.getElementById('ka');
console.log(node);

var i = 0;
$('#next').on('click', function(){
    var Path = node.getElementsByTagName('path')[i++].getAttribute('d');
        var ny = group.append('path')
        .attr('d', Path)
        .attr('id', i)
        .style('fill', 'grey')
        .style('stroke', 'black')
        .style('stroke-width', 1)
        .attr('transform', 'scale(0.2)')
        .on("mouseover", mover)
        
        .on("mousemove", function () {
            return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
        })

        .on("mouseout", function () {
            return tooltip.style("visibility", "hidden");
        })
})
/*
for(var i = 0; i < node.getElementsByTagName('path').length; ++i) {
    var Path = node.getElementsByTagName('path')[i].getAttribute('d');
    ny[i] = group.append('path')
    .attr('d', Path)
    .attr('id', i)
    .style('fill', 'grey')
    .style('stroke', 'black')
    .style('stroke-width', 1)
    .attr('transform', 'scale(0.2)')
    .on("mouseover", mover)
    
    .on("mousemove", function () {
        return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
    })

    .on("mouseout", function () {
        return tooltip.style("visibility", "hidden");
    })
}*/