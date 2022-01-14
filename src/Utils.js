import * as d3 from "d3/dist/d3.min";

export const format = (v) => {
  return d3.format("$,.2s")(v).replace(/G/, "bn").replace(/M/, "m");
};
