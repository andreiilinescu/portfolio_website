///head
d3.select("#head").
append("h1").
text("United States Educational Attainment").
style("color","white").
attr("id", "title");
d3.select("#head").
append("h3").
text(
"Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)").
style("color","white").
attr("id", "description");
///vars
let w = 1000,
h = 600,
pad = 50,
educationData =
"https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json",
usaCountyData =
"https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";
const padding = 80;
///svg
let svgs = d3.
select("#container").
append("svg").
attr("width", w).
attr("height", h).
style("margin", "0 auto").
style("display", "block");
///path
const path = d3.geoPath();

///tooltip
let tooltip = d3.select("body").append("div").attr("id", "tooltip");
///data
d3.json(usaCountyData).then(countyData => {
  d3.json(educationData).then(educationData => {
    ///data
    const data = d3.extent(educationData, i => i.bachelorsOrHigher);
    ///colors
    const colors = d3.
    scaleThreshold().
    domain([2, 11, 20, 29, 38, 47, 56, 65]).
    range(d3.schemeReds[9]);

    svgs.
    append("g").
    selectAll("path").
    data(topojson.feature(countyData, countyData.objects.counties).features).
    join("path").
    attr("d", path).
    attr("class", "county").
    attr("data-fips", d => d.id).
    attr(
    "data-education",
    d => educationData.find(i => i.fips === d.id).bachelorsOrHigher).

    attr("fill", (d) =>
    colors(educationData.find(i => i.fips === d.id).bachelorsOrHigher)).

    on("mouseover", d => {
      ///tooltip
      let event = d3.select(d3.event.target);
      let it = educationData.find(i => i.fips === d.id);
      event.attr("stroke", "black");
      tooltip.
      style("opacity", 0.9).
      html(
      it.area_name + ",  " + it.state + ":" + it.bachelorsOrHigher + "%").

      style("left", d3.event.pageX + 50 + "px").
      style("top", d3.event.pageY + "px").
      attr("data-education", it.bachelorsOrHigher);
    }).
    on("mouseout", d => {
      ///tooltip
      const event = d3.select(d3.event.target);
      event.attr("stroke", "");
      tooltip.style("opacity", 0);
    });
    ///white betwenen states
    svgs.
    append("path").
    datum(
    topojson.mesh(countyData, countyData.objects.states, (x, y) => x !== y)).

    attr("fill", "none").
    attr("stroke", "white").
    attr("d", path);
    ///black around country
    svgs.
    append("path").
    datum(topojson.mesh(countyData, countyData.objects.nation)).
    attr("fill", "none").
    attr("stroke", "black").
    attr("d", path);
    ///legend
    let legend = svgs.
    append("g").
    attr("id", "legend").
    attr("transform", "translate(" + w / 2 + ", 22)");
    let bottomScale = d3.scaleLinear().domain(data).rangeRound([0, 300]);
    let bottomAxis = d3.
    axisBottom(bottomScale).
    tickFormat(i => Math.floor(i) + "%").
    tickValues(colors.domain()).
    tickSize(10);
    console.log(colors.range());
    legend.
    selectAll(".legend-item").
    style("fill","white").
    data(
    colors.range().map(i => {
      i = colors.invertExtent(i);
      if (!i[0]) i[0] = bottomScale.domain()[0];
      if (!i[1]) i[1] = bottomScale.domain()[1];
      return i;
    })).

    enter().
    append("rect").
    attr("width", d => bottomScale(d[1]) - bottomScale(d[0])).
    attr("height", 8).
    attr("x", (d, i) => bottomScale(d[0])).
    attr("fill", i => colors(i[0])).
    attr("stroke", "black").
    attr("class", "legend-item");
    legend.
    append("g").
    attr("id", "color-axis").
    call(bottomAxis);
  });
});