import * as d3 from "d3/dist/d3.min";

export const format = (v, places = 2) => {
  return d3.format(`$,.${places}s`)(v).replace(/G/, "bn").replace(/M/, "m");
};

export const money = (val, units = true, round = false) => {
  if (val === "unknown") return "Specific amount not reported";
  else if (val === 0) return "0" + (units ? " USD" : "");
  else if (round) {
    return `${formatSIInteger(val)}${units ? " USD" : ""}`;
  } else return `${formatSI(val)}${units ? " USD" : ""}`;
};

const formatSIInteger = (val) => {
  if (val === 0) return "0";
  else if (val <= 999) return comma(val);
  else return d3.format(".2s")(val).replace(/G/, "B");
};

const comma = function (num) {
  const resultTmp = d3.format(",.0f")(num);
  return resultTmp;
};
const formatSI = (val) => {
  // If zero, just return zero
  if (val === 0) return "0";
  // If 1 or less, return the value with three significant digits. (?)
  else if (val < 1) return d3.format(".3f")(val);
  // If between 1 - 1000, return value with two significant digits.
  else if (val >= 1 && val < 1000) return d3.formatPrefix(".2f", 1)(val);
  // k
  // If 1k or above, return SI value with two significant digits
  else if (val >= 1000 && val < 1000000)
    return d3.formatPrefix(".2f", 1000)(val);
  // k
  // If 1k or above, return SI value with two significant digits
  else if (val >= 1000000 && val < 1000000000)
    return d3.formatPrefix(".2f", 1000000)(val);
  // M
  else return d3.formatPrefix(",.2s", 1000000000)(val).replace(/G/, "B"); // B
};

export const getUniqueArrayEls = (input) => {
  const output = [];
  let prev = "__init__";
  input.sort().forEach((v) => {
    if (prev === "__init__" || prev === v) {
      prev = v;
      return;
    } else {
      prev = v;
      output.push(v);
    }
  });
  return output;
};
