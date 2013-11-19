/**
* Code to pare the d attribute form the SVG map of Karnataka
*/


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

var node = xmlDoc.getElementById('ka');
console.log(node);

for(var i = 0; i < node.getElementsByTagName('path').length; ++i) {
    var Path = node.getElementsByTagName('path')[i].getAttribute('d');
    var ny = group.append('path')
    .attr('d', Path)
    .attr('id', i)
    .style('fill', 'grey')
    .style('stroke', 'black')
    .style('stroke-width', 1)
    .attr('transform', 'scale(0.2)');
}