import React, { useEffect } from "react";
import styled from "styled-components";
import chart from "./chart";

const SankeySvg = styled.svg``;

export const Sankey = () => {
  useEffect(() => {
    chart();
  }, []);
  return <SankeySvg data-chart={"sankey"} />;
};
