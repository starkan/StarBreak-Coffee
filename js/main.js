/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/

var margin = { left:100, right:10, top:10, bottom:100 };

var width = 600 - margin.left - margin.right,
		height = 400 - margin.top - margin.bottom;

var g = d3.select("#chart-area")
		.append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
		.append("g")
				.attr("transform", "translate(" + margin.left
						+ ", " + margin.top + ")");

// X Label
g.append("text")
		.attr("class", "x-axis-label")
		.attr("x", width / 2)
		.attr("y", height + margin.bottom / 2)
		.attr("font-size", "20px")
		.attr("text-anchor", "middle")
		.text("Month");

// Y Label
g.append("text")
		.attr("class", "y-axis-label")
		.attr("x", - (height / 2))
		.attr("y", - (margin.left / 2 + margin.right))
		.attr("font-size", "20px")
		.attr("text-anchor", "middle")
		.attr("transform", "rotate(-90)")
		.text("Revenue");

d3.json("data/revenues.json").then(function(data){
		//console.log(data);

		data.forEach(function(d){
				d.revenue = +d.revenue;
		});

		var x_scale = d3.scaleBand()
				.domain(data.map(function(d){ return d.month; }))
				.range([0, width])
				.paddingInner(0.2)
				.paddingOuter(0.1);

		var y_scale = d3.scaleLinear()
				.domain([0, d3.max(data, function(d){
						return d.revenue;
				})])
				.range([height, 0]);

		// X-Axis
		var xAxisCall = d3.axisBottom(x_scale);
    g.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0, " + height + ")")
        .call(xAxisCall);

		// Y-Axis
    var yAxisCall = d3.axisLeft(y_scale)
        .ticks(10)
        .tickFormat(function(d){
            return "$" + d;
        });
    g.append("g")
        .attr("class", "y-axis")
        .call(yAxisCall);

		var rects = g.selectAll("rect")
				.data(data);
		rects.enter()
        .append("rect")
            .attr("x", function(d){ return x_scale(d.month); })
		        .attr("y", function(d){ return y_scale(d.revenue); })
            .attr("width", x_scale.bandwidth)
            .attr("height", function(d){ return height - y_scale(d.revenue); })
            .attr("fill", "grey");

}).catch(function(error){
		console.log(error);
})
