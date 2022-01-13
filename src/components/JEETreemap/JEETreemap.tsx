import React, { useEffect } from "react";
import styled from "styled-components";
import chart from "./chart";

const TreemapSVG = styled.svg``;

export const JEETreemap = () => {
  useEffect(() => {
    chart();
  }, []);
  return <TreemapSVG></TreemapSVG>;
};
