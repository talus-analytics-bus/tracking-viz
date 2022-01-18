import React, { FC, useEffect } from "react";
import styled from "styled-components";
import chart from "./chart";
import data from "./unmetneeds.json";

const MapSvg = styled.svg`
  margin: 1em;
  > path:first-child {
    display: none;
  }
`;

const Header = styled.div`
  text-align: left;
  display: flex;
  flex-flow: column;
  align-self: start !important;
  margin-right: auto;
  width: 100%;
`;

const MapWrapper = styled.div`
  margin: 2em;
  font-family: "Open Sans", sans-serif;
  position: relative;
`;

interface MapProps {
  data: any[];
  id: (d: any) => any;
  value: (d: any) => any;
  chartKey: string;
  domain?: any[];
  range?: any[];
  title?: string;
  subtitle?: string;
  children?: any;
}

export const Map: FC<MapProps> = ({
  data,
  id,
  value,
  chartKey,
  domain,
  range,
  title = "",
  subtitle = "",
  children = null,
}) => {
  useEffect(() => {
    chart(chartKey, data, id, value, domain, range);
  }, [data, domain, id, chartKey, range, value]);
  return (
    <MapWrapper>
      <Header>
        {title && <h1>{title}</h1>}
        {subtitle && <span>{subtitle}</span>}
      </Header>
      <MapSvg data-chart={chartKey}></MapSvg>
      {children}
    </MapWrapper>
  );
};

export default Map;
