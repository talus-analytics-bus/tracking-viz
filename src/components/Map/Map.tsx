import React, { useEffect } from "react";
import styled from "styled-components";
import chart from "./chart";
import data from "./unmetneeds.json";

const MapSvg = styled.svg`
  margin: 1em;
  > path:first-child {
    display: none;
  }
`;

export const Map = () => {
  useEffect(() => {
    chart(data);
  }, []);
  return <MapSvg data-chart="map"></MapSvg>;
};

export default Map;
