import * as d3 from "d3/dist/d3.min";

export const format = (v, places = 2) => {
  return d3.format(`$,.${places}s`)(v).replace(/G/, "bn").replace(/M/, "m");
};
