function vh(v) {
  var h = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
  return (v * h) / 100;
}

function vw(v) {
  var w = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  return (v * w) / 100;
}
var w = vw(50),
  h = vh(50),
  padding = 100,
  bars = w / 275;

var svgs = d3
  .select(".container")
  .append("svg")
  .attr("width", w + 200)
  .attr("height", h + 100);

d3.json(
  "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json"
).then((data) => {
  svgs
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -200)
    .attr("y", 80)
    .text("Gross Domestic Product");

  var tooltip = d3
    .select(".container")
    .append("div")
    .attr("id", "tooltip")
    .style("opacity", 0);
  var maxYear=data.data[data.data.length-1][0];
  console.log(maxYear);
  var years = data.data.map((d) => new Date(d[0]));
  var money = data.data.map((d) => d[1]);

  var xMax = new Date(maxYear);
  xMax.setFullYear(xMax.getFullYear()+1);
  console.log(xMax);
  var xScale = d3
    .scaleTime()
    .domain([d3.min(years), xMax])
    .range([0, w]);

  var xAxis = d3.axisBottom().scale(xScale);

  var xAxisRender = svgs
    .append("g")
    .attr("id", "x-axis")
    .attr("transform", "translate(60," + (h + 10) + ")")
    .call(xAxis);
  var yMin = d3.min(money);
  var yMax = d3.max(money);
  var yScale = d3.scaleLinear().domain([0, yMax]).range([h, 0]);
  var yAxis = d3.axisLeft(yScale);
  var yAxisGroup = svgs
    .append("g")
    .attr("id", "y-axis")
    .attr("transform", "translate(60,10)")
    .call(yAxis);

  var Scale = d3.scaleLinear().domain([0, yMax]).range([0, h]);

  scaledMoney = money.map((d) => Scale(d));
  console.log(years);
  d3.select("svg")
    .selectAll("rect")
    .data(scaledMoney)
    .enter()
    .append("rect")
    .attr("data-date", (d, i) => data.data[i][0])
    .attr("data-gdp", (d, i) => data.data[i][1])
    .attr("class", "bar")
    .attr("x", (d, i) => xScale(years[i]))
    .attr("y", (d, i) => h - d)
    .attr("width", bars)
    .attr("height", (d) => d)
    .style("fill", "white")
    .attr("transform", "translate(61, 10)")
    .on("mouseover", (d, i) => {
      tooltip.transition().duration(100).style("opacity", 1);
      tooltip
        .html(data.data[i][0] + "<br>" + money[i].toFixed(1) + " Billion")
        .attr("data-date", data.data[i][0])
        .style("transform", "translate(100px,-250px)")
        .style("font-size", "1.5vw");
    })
    .on("mouseout", (d) => {
      tooltip.transition().duration(100).style("opacity", 0);
    });
});
