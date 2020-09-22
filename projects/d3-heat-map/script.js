///declare size
let w = 1600,
h = 550,
pad = 90;
d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json").
then(data => {
  //vars
  let baseT = data.baseTemperature;
  let months = ["January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"];
  const colors = [
  "#313695",
  "#4575b4",
  "#74add1",
  "#abd9e9",
  "#e0f3f8",
  "#ffffbf",
  "#fee090",
  "#fdae61",
  "#f46d43",
  "#d73027",
  "#a50026"];

  let temps = [2.8, 3.9, 5.0, 6.1, 7.2, 8.3, 9.5, 10.6, 11.7, 12.8];

  ///svg
  let svgs = d3.select("#container").
  append("svg").
  attr("width", w).
  attr("height", h);
  ///X-Axis
  let xScale = d3.scaleLinear().
  domain([1753, 2015]).
  range([pad, w - pad]);
  let xAxis = d3.axisBottom().
  scale(xScale).
  tickFormat(d3.format("d"));
  let xAxisGroup = svgs.append("g").
  attr("transform", "translate(0," + (h - pad) + ")").
  attr("id", "x-axis").
  call(xAxis);
  ///Y-Axis
  let yScale = d3.scaleBand().
  domain(months).
  range([h - pad, pad]);
  let yAxis = d3.axisLeft().
  scale(yScale);
  let yAxisGroup = svgs.append("g").
  attr("transform", "translate(" + pad + ",0)").
  attr("id", "y-axis").
  call(yAxis);


  ///tooltip div
  let tooltip = d3.
  select("body").
  append("div").
  attr("id", "tooltip").
  style("opacity", 0);
  ///rect
  let cells = svgs.selectAll("rect").
  data(data.monthlyVariance).
  enter().
  append("rect").
  attr("x", d => xScale(d.year)).
  attr("y", d => yScale(months[d.month - 1])).
  attr("width", 5.5).
  attr("height", 34.5).
  attr("class", "cell").
  attr("data-year", d => d.year).
  attr("data-month", d => d.month - 1).
  attr("data-temp", d => baseT + d.variance).
  style("fill", (d, i) => {
    let x = baseT + d.variance;
    if (x > 12) return "rgb(165, 0, 38)";else
    if (x > 10) return "rgb(244, 109, 67)";else
    if (x > 8) return "rgb(254, 224, 144)";else
    if (x > 6) return "rgb(255, 255, 191)";else
    if (x > 5) return "rgb(224, 243, 248)";else
    return "rgb(69, 117, 180)";
  }).
  on("mouseover", (d, i) => {
    let x = baseT + d.variance;
    let y = parseFloat(x.toFixed(2));
    tooltip.transition().duration(200).style("opacity", 0.9);
    tooltip.html(d.year + "-" + months[d.month - 1] + "<br>" + y + "°C" + "<br>" + d.variance + "°C").
    style("left", d3.event.pageX + 20 + "px").
    style("top", d3.event.pageY + "px").
    attr("data-year", d.year);
  }).
  on("mouseout", d => {
    tooltip.transition().duration(200).style("opacity", 0);
  });
  ///Legend
  const fills = d3.
  scaleThreshold().
  domain(temps).
  range(colors);
  const legend = svgs.
  append("g").
  attr("id", "legend").
  attr("transform", "translate(60, 500)");

  const legendGroups = legend.
  selectAll("g").
  data(temps).
  enter().
  append("g").
  attr("transform", (d, i) => 'translate(' + i * 35 + ', 0)');

  legendGroups.
  append("rect").
  attr("width", 38).
  attr("height", 35).
  style("fill", d => fills(d)).
  style("stroke", "black").
  style("stroke-width", "1px");

  legendGroups.
  append("text").
  attr("x", (d, i) => i).
  attr("y", 50).
  attr("dx", 15).
  style("fill","white").
  text(d => {
    if (d.toString().length < 2) return d.toString() + ".0";else
    return d.toString();
  });


});