// const d3 = require("d3");
// import d3 from "d3";
import * as d3 from "d3/dist/d3.min";
import data from "./jeespend.json";
import uid from "../../lib/dom/uid";

const width = 600;
const height = 600;
const format = (v) => {
  return d3.format("$,.2s")(v).replace(/G/, "bn").replace(/M/, "m");
};
const color = d3.scaleSequential([8, 0], d3.interpolateMagma);

const ces = [...new Set(data.map((d) => d.ce))];

const treemap = (data) =>
  d3
    .treemap()
    .size([width, height])
    .paddingOuter(3)
    .paddingTop(19)
    .paddingInner(1)
    .round(true)(
    d3
      .hierarchy({
        name: "Disbursed funding (USD, nominal) by Joint External Evaluation (JEE) core capacity",
        children: ces.map((ce) => {
          return {
            name: ce,
            children: data
              .filter((dd) => dd.ce === ce)
              .map((dd) => {
                return { name: dd.cc, value: dd.value };
              }),
          };
        }),
      })
      .sum((d) => d.value)
      .sort((a, b) => b.value - a.value)
  );

const chart = () => {
  const root = treemap(data);
  const svg = d3
    .select("svg")
    .attr("viewBox", [0, 0, width, height])
    .attr("width", width)
    .attr("height", height)
    .style("font", "10px sans-serif");

  // const shadow = uid("shadow");

  // svg
  //   .append("filter")
  //   .attr("id", shadow.id)
  //   .append("feDropShadow")
  //   .attr("flood-opacity", 0.3)
  //   .attr("dx", 0)
  //   .attr("stdDeviation", 3);

  const node = svg
    .selectAll("g")
    .data(d3.group(root, (d) => d.height))
    .join("g")
    // .attr("filter", shadow)
    .selectAll("g")
    .data((d) => d[1])
    .join("g")
    .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

  node.append("title").text(
    (d) =>
      `${d
        .ancestors()
        .reverse()
        .map((d) => d.data.name)
        .join("/")}\n${format(d.value)}`
  );

  node
    .append("rect")
    .attr("id", (d) => (d.nodeUid = uid("node")).id)
    .attr("fill", (d) => color(d.height))
    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", (d) => d.y1 - d.y0);

  node
    .append("clipPath")
    .attr("id", (d) => (d.clipUid = uid("clip")).id)
    .append("use")
    .attr("xlink:href", (d) => d.nodeUid.href);

  node
    .append("text")
    .attr("clip-path", (d) => d.clipUid)
    .selectAll("tspan")
    .data((d) => d.data.name.split(/(?=[A-Z][^A-Z])/g).concat(format(d.value)))
    .join("tspan")
    .attr("fill-opacity", (d, i, nodes) =>
      i === nodes.length - 1 ? 0.7 : null
    )
    .text((d) => d);

  node
    .filter((d) => d.children)
    .selectAll("tspan")
    .attr("dx", (_d, i) => (i === 0 ? 3 : null))
    .attr("y", 13);

  node
    .filter((d) => !d.children)
    .selectAll("tspan")
    .attr("x", 3)
    .attr(
      "y",
      (d, i, nodes) => `${(i === nodes.length - 1) * 0.3 + 1.1 + i * 0.9}em`
    );

  console.log(svg);
  console.log(svg.node());
  return svg.node();
};

export default chart;
