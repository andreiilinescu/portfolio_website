function vh(v) {
  var h = Math.min(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
  return (v * h) / 100;
}

function vw(v) {
  var w = Math.min(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  return (v * w) / 100;
}
var w = vw(50),
h = vw(40),
pad = 50;
var svgs = d3.
select("#container").
append("svg").
attr("width", w).
attr("height", h);

d3.json(
"https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json").
then(data => {
  let Times = data.map(d => d.Time);
  data.forEach(function (d) {
    var parsedTime = d.Time.split(":");
    d.Time = new Date(1970, 0, 1, 0, parsedTime[0], parsedTime[1]);
  });
  let minYear = d3.min(data, d => d.Year - 1);
  let maxYear = d3.max(data, d => d.Year + 1);
  let time = data.map(d => d.Time);
  let yMin = new Date(d3.min(time));
  let yMax = new Date(d3.max(time));
  ///x-axis
  let xScale = d3.
  scaleLinear().
  domain([minYear, maxYear]).
  range([pad, w - pad]);
  let xAxis = d3.axisBottom().scale(xScale).tickFormat(d3.format("d"));
  let xAxisGroup = svgs.
  append("g").
  attr("transform", "translate(0," + (h - pad) + ")").
  attr("id", "x-axis").
  call(xAxis);
  ///y-axis
  let yScale = d3.
  scaleLinear().
  domain([yMin, yMax]).
  range([h - pad, pad]);
  let yAxis = d3.axisLeft().scale(yScale).tickFormat(d3.timeFormat("%M:%S"));
  let yAxisGroup = svgs.
  append("g").
  attr("transform", "translate(" + pad + ",0)").
  attr("id", "y-axis").
  call(yAxis);
  ///tooltip
  const tooltip = d3.
  select("body").
  append("div").
  attr("id", "tooltip").
  style("opacity", 0);
  ///circles
  let circles = svgs.
  selectAll("circle").
  data(data).
  enter().
  append("circle").
  attr("class", "dot").
  attr("r", 8).
  attr("cx", d => xScale(d.Year)).
  attr("data-xvalue", d => d.Year).
  attr("cy", d => yScale(d.Time)).
  attr("data-yvalue", d => d.Time).
  style("fill", d => {
    if (d.Doping == "") return "rgba(255,255,255,0.5)";else
    return "rgba(150,150,255,0.8)";
  }).
  on("mouseover", (d, i) => {
    tooltip.transition().duration(200).style("opacity", 0.9);
    tooltip.
    html(
    d.Name +
    "     " +
    '<span style="color:rgba(250,128,114,0.9)">' +
    d.Nationality +
    "</span><br />" +
    d.Doping +
    "<br />" +
    "Year:" +
    d.Year +
    ",Time:" +
    Times[i]).

    attr("data-year", d.Year).
    style("left", d3.event.pageX + 20 + "px").
    style("top", d3.event.pageY + "px");
  }).
  on("mouseout", d => {
    tooltip.transition().duration(200).style("opacity", 0);
  });

  ///title
  svgs.
  append("text").
  attr("id", "title").
  attr("x", w / 2).
  attr("y", 25).
  text("Doping in Professional Bicycle Racing").
  attr("font-size", "20px");
  ///legends

  let Legendc = svgs.append("g").attr("id", "legend");
  Legendc.append("rect").
  attr("height", 12).
  attr("width", 12).
  style("fill", "rgba(255,255,255,0.8)").
  attr("x", w-100).
  attr("y", h-250);
  Legendc.append("rect").
  attr("height", 12).
  attr("width", 12).
  style("fill", "rgba(150,150,255,1)").
  attr("x", w-100).
  attr("y", h-225);
  Legendc.append("text").
  text("No Doping Allegations").
  attr("x", w-220).
  attr("y", h-241).
  attr("font-size", 12);
  Legendc.append("text").
  text("Riders with doping allegations").
  attr("x", w-260).
  attr("y", h-217).
  attr("font-size", 12);
});