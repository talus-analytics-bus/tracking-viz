import React, { useEffect } from "react";
import styled from "styled-components";
import chart from "./chart";

const SankeySvg = styled.svg``;

export const FundingSankey = () => {
  useEffect(() => {
    chart();
  }, []);
  return <SankeySvg data-chart={"sankey"} />;
};
