import React, { useEffect } from "react";
import styled from "styled-components";
import chart from "./chart";

const TreemapSVG = styled.svg`
  margin: 1em;
  text,
  tspan {
    font-family: "Open Sans", sans-serif;
  }
  [data-type="title"] {
    font-size: 1.5em;
    fill: white;
    tspan:last-child {
      display: none;
    }
  }
  [data-type="ce"] {
    font-size: 1.3em;
    font-weight: bold;
  }
  [data-type="cc"] {
    font-size: 1.25em;
  }
  [data-type="cc"],
  [data-type="ce"] {
    tspan:last-child {
      opacity: 70%;
    }
  }
`;

export const JEETreemap = () => {
  useEffect(() => {
    chart();
  }, []);
  return <TreemapSVG></TreemapSVG>;
};
