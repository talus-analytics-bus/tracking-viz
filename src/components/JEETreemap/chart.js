// const d3 = require("d3");
// import d3 from "d3";
import dataTmp from "./jeespend.json";
import uid from "../../lib/dom/uid";
import { format } from "../../Utils";
const ces = [...new Set(dataTmp.map((d) => d.ce))];

const hideChildren = ["Unspecified", "General IHR"];

const SHOW_UNSPECIFIED = false;

const data = {
  name: "Disbursed funding (USD, nominal) by Joint External Evaluation (JEE) core capacity",
  children: ces
    .map((ce) => {
      // const special = ["Unspecified", "General IHR"].includes(ce);
      const node = {
        name: ce,
        children: dataTmp
          .filter((dd) => dd.ce === ce)
          .map((dd) => {
            return { name: dd.cc, value: dd.value };
          }),
      };
      // if (special) node.value = dataTmp.find((d) => d.ce === ce).value;
      return node;
    })
    .filter((d) => SHOW_UNSPECIFIED || d.name !== "Unspecified"),
};

console.log(data);

const width = 1000;
const height = 600;

const test = d3.color("#2263B5");
test.opacity = 0.5;

const jeeColors = {
  Main: "#ffffff",
  Prevent: ["#2263B5", "#cde6f6"],
  Detect: ["#41BBE3", "#dbf2fa"],
  Respond: ["#2A8F82", "#d8f4f0"],
  Other: ["#71AE2C", "#e4f4d2"],
  General: ["#2263B5", "#ffffff"],
  Unspecified: ["#AEAFB3", "#ffffff"],
  "General IHR": ["#b52263", "#f6cddf"],
};

const color = (d) => {
  if (d.depth === 0) return jeeColors.Main;
  if (d.depth === 1) return jeeColors[d.data.name][d.depth - 1];
  if (d.depth === 2 && d.parent)
    return jeeColors[d.parent.data.name][d.depth - 1];
};

const treemap = (data) =>
  d3
    .treemap()
    .size([width, height])
    .paddingOuter(3)
    .paddingTop(19)
    .paddingInner(1)
    .round(true)(
    d3
      .hierarchy(data)
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
    .attr("transform", (d) => `translate(${d.x0},${d.y0})`)
    .attr("opacity", (d) => {
      if (d.parent && hideChildren.includes(d.parent.data.name)) return 0;
      else return 1;
    });

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
    .attr("fill", (d) => {
      return color(d);
    })
    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", (d) => d.y1 - d.y0);

  node
    .append("clipPath")
    .attr("id", (d) => (d.clipUid = uid("clip")).id)
    .append("use")
    .attr("xlink:href", (d) => d.nodeUid.href);

  node
    .append("text")
    .attr("fill", (d) => (d.depth === 1 ? "white" : undefined))
    .style("font-weight", (d) => (d.depth === 1 ? "bold" : undefined))
    .style("font-size", (d) => (d.depth === 0 ? "1.5em" : undefined))
    .style("font-size", (d) => (d.depth === 1 ? "1.5em" : undefined))
    .attr("clip-path", (d) => d.clipUid)
    .selectAll("tspan")
    .data((d) => d.data.name.split(/(?=[A-Z][^A-Z])/g).concat(format(d.value)))
    .join("tspan")
    .attr("fill-opacity", (d, i, nodes) =>
      i === nodes.length - 1 ? 0.7 : null
    )
    .text((d) => d);

  const getDx = (_d, i) => {
    return i === 0 || _d.startsWith("$") ? 3 : null;
  };
  node
    .filter((d) => d.children)
    .selectAll("tspan")
    .attr("dx", getDx)
    .attr("y", 13);

  node
    .filter((d) => !d.children)
    .selectAll("tspan")
    .attr("x", 3)
    .attr(
      "y",
      (d, i, nodes) => `${(i === nodes.length - 1) * 0.3 + 1.1 + i * 0.9}em`
    );

  return svg.node();
};

export default chart;
