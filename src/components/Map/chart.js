import * as d3 from "d3/dist/d3.min";
import { geoNaturalEarth2 } from "d3-geo-projection";
import * as topojson from "topojson-client";

import world from "./world_only_simple.json";
const test = world;
const countries = topojson.feature(world, world.objects.country);
const countrymesh = topojson.mesh(
  world,
  world.objects.country,
  (a, b) => a !== b
);

function Choropleth(
  data,
  {
    id = (d) => d.id, // given d in data, returns the feature id
    value = () => undefined, // given d in data, returns the quantitative value
    title, // given a feature f and possibly a datum d, returns the hover text
    format, // optional format specifier for the title
    scale = d3.scaleSequential, // type of color scale
    domain, // [min, max] values; input of color scale
    range = d3.interpolateBlues, // output of color scale
    width = 640, // outer width, in pixels
    height, // outer height, in pixels
    projection, // a D3 projection; null for pre-projected geometry
    features, // a GeoJSON feature collection
    featureId = (d) => d.id, // given a feature, returns its id
    borders, // a GeoJSON object for stroking borders
    outline = projection && projection.rotate ? { type: "Sphere" } : null, // a GeoJSON object for the background
    unknown = "#ccc", // fill color for missing data
    fill = "white", // fill color for outline
    stroke = "white", // stroke color for borders
    strokeLinecap = "round", // stroke line cap for borders
    strokeLinejoin = "round", // stroke line join for borders
    strokeWidth, // stroke width for borders
    strokeOpacity, // stroke opacity for borders
  } = {}
) {
  // Compute values.
  const N = d3.map(data, id);
  const V = d3.map(data, value).map((d) => (d == null ? NaN : d));
  const Im = new d3.InternMap(N.map((id, i) => [id, i]));
  const If = d3.map(features.features, featureId);

  // Compute default domains.
  if (domain === undefined) domain = d3.extent(V);

  // Construct scales.
  const color = scale(domain, range);
  if (unknown !== undefined) color.unknown(unknown);

  // Compute titles.
  if (title === undefined) {
    format = color.tickFormat(100, format);
    title = (f, i) => `${f.properties.name}\n${format(V[i])}`;
  } else if (title !== null) {
    const T = title;
    const O = d3.map(data, (d) => d);
    title = (f, i) => T(f, O[i]);
  }

  // Compute the default height. If an outline object is specified, scale the projection to fit
  // the width, and then compute the corresponding height.
  if (height === undefined) {
    if (outline === undefined) {
      height = 400;
    } else {
      const [[x0, y0], [x1, y1]] = d3
        .geoPath(projection.fitWidth(width, outline))
        .bounds(outline);
      const dy = Math.ceil(y1 - y0),
        l = Math.min(Math.ceil(x1 - x0), dy);
      projection.scale((projection.scale() * (l - 1)) / l).precision(0.2);
      height = dy;
    }
  }

  // Construct a path generator.
  const path = d3.geoPath(projection);

  const svg = d3
    .select("svg[data-chart=map]")
    .html("")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  if (outline != null)
    svg
      .append("path")
      .attr("fill", fill)
      .attr("stroke", "currentColor")
      .attr("d", path(outline));

  svg
    .append("g")
    .selectAll("path")
    .data(features.features)
    .join("path")
    .attr("fill", (d, i) => {
      //   console.log(d);
      return V[Im.get(If[i])] || unknown;
      //   return color(V[Im.get(If[i])]);
      //   return "red";
    })
    // .attr("fill", (d, i) => color(V[Im.get(If[i])]))
    .attr("d", path)
    .append("title")
    .text((d, i) => title(d, Im.get(If[i])));

  if (borders != null)
    svg
      .append("path")
      .attr("pointer-events", "none")
      .attr("fill", "none")
      .attr("stroke", stroke)
      .attr("stroke-linecap", strokeLinecap)
      .attr("stroke-linejoin", strokeLinejoin)
      .attr("stroke-width", strokeWidth)
      .attr("stroke-opacity", strokeOpacity)
      .attr("d", path(borders));

  return Object.assign(svg.node(), { scales: { color } });
}

const chart = (data) => {
  const colors = [...new Set(data.map((d) => d.Color))];

  return Choropleth(data, {
    id: (d) => d["Stakeholder ISO3"], // country name, e.g. Zimbabwe
    value: (d) => d.Color, // TEMP
    range: colors,
    // range: (d) => d,
    domain: colors,
    // range: d3.interpolateYlGnBu,
    features: countries,
    featureId: (d) => d.properties.iso3, // i.e., not ISO 3166-1 numeric
    borders: countrymesh,
    // projection: d3.geoNaturalEarth,
    projection: geoNaturalEarth2(),
    // projection: d3.geoEqualEarth(),
    width: 1000,
    // outline: null,
    unknown: "#C3C3C4",
  });
};

export default chart;
