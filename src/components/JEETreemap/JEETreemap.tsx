import React, { useEffect } from "react";
import styled from "styled-components";
import chart from "./chart";

const TreemapSVG = styled.svg`
  text,
  tspan {
    font-family: "Open Sans", sans-serif;
  }
`;

export const JEETreemap = () => {
  useEffect(() => {
    chart();
  }, []);
  return <TreemapSVG></TreemapSVG>;
};
