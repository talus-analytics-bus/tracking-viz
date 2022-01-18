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

interface MapProps {
  data: any[];
  id: (d: any) => any;
  value: (d: any) => any;
  domain?: any[];
  range?: any[];
}

export const Map: FC<MapProps> = ({ data, id, value, domain, range }) => {
  useEffect(() => {
    chart(data, id, value, domain, range);
  }, [data, domain, id, range, value]);
  return <MapSvg data-chart="map"></MapSvg>;
};

export default Map;
