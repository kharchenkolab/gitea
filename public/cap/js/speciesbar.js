// a d3.js script to draw a cell fraction bar for the repo summary

// Define the div for the tooltip
var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

var data = fullInfo.Species

var svg = d3.select("#cellbar"),
    svgSize=svg.node().getBoundingClientRect(),
    margin = {top: 10, right: 1, bottom: 1, left: 1},
    width = +svgSize.width - margin.left - margin.right,
    height = +svgSize.height - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var y = d3.scaleBand()	
    .rangeRound([0, height])	
    .paddingInner(0.05)
    .align(0.1);

var x = d3.scaleLinear()	
    .rangeRound([0, width]);	

var keys = Object.keys(data) // species
var z = d3.scaleOrdinal().domain(keys).range(d3.schemeSet3)

for (i = 0, t = 0; i < keys.length; i++) {
    let v=data[keys[i]];
    data[keys[i]]=[t,t+v,keys[i]];
    t+=v;
};
data=Object.values(data) // transform object into an array

x.domain([0,t])

// draw the rects
g.append("g")
    .selectAll("rect")
    .data(data)
    .enter().append("rect")
    .attr("x",function(d) { return x(d[0]) })
    .attr("y",y(0))
    .attr("fill",function(d) {  return z(d[2]) })
    .attr("width",function(d) { return x(d[1])-x(d[0]) })
    .attr("height",y.bandwidth(0))
    .on("mouseover", function(d) {
	div.transition()		
            .duration(200)		
            .style("opacity", .9);		
        div.html(d[2])
            .style("left", (d3.event.pageX ) + "px")		
            .style("top", (d3.event.pageY -30) + "px");
        d3.select(this).style("fill", function() {
            return d3.rgb(d3.select(this).style("fill")).darker(0.5);
        });
    })
    .on("mouseout", function(d) {
	d3.select(this).style("fill", function() {
            return d3.rgb(d3.select(this).style("fill")).brighter(0.5);
        })
        div.transition()		
            .duration(500)		
            .style("opacity", 0);	
    })


// bounding box
g.append("g").append("rect").attr("x",x(0)).attr("stroke","black").attr("stroke-width",0.8).attr("width",x(data[data.length-1][1])).attr("height",y.bandwidth()).attr("fill","none")
