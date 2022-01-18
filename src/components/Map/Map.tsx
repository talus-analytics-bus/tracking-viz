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
const colors: string[] = [...new Set(data.map((d: any) => d.Color as string))];

interface MapProps {
  data: any[];
  id: (d: any) => any;
  value: (d: any) => any;
  domain: any[];
  range: any[];
}

export const Map: FC<MapProps> = ({ data, id, value, domain, range }) => {
  useEffect(() => {
    chart(
      data,
      (d: any) => d["Stakeholder ISO3"],
      (d: any) => d.Color,
      colors,
      colors
    );
  }, []);
  return <MapSvg data-chart="map"></MapSvg>;
};

export default Map;
