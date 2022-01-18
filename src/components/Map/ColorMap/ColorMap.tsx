import Map from "../Map";

import { getUniqueArrayEls } from "../../../Utils";
import { BivariateLegend } from "./BivariateLegend";
import styled from "styled-components";

const MapWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
`;

export const ColorMap = ({
  data,
  chartKey,
  valToColor,
}: {
  data: any[];
  chartKey: string;
  valToColor?: Record<number, string>;
}) => {
  const colors: string[] =
    valToColor !== undefined
      ? Object.values(valToColor)
      : getUniqueArrayEls(data.map((d: any) => d.Color));

  if (colors.length === 0 && valToColor === undefined)
    throw new Error("Must define Color field in data or a valToColor map");
  return (
    <MapWrapper>
      <Map
        id={(d: any) => d["Stakeholder ISO3"]}
        value={
          valToColor === undefined
            ? (d: any) => d.Color
            : (d: any) => valToColor[d.Value]
        }
        domain={colors}
        range={colors}
        {...{ data, chartKey }}
      ></Map>
      <BivariateLegend {...{ valToColor }} />
    </MapWrapper>
  );
};

export default ColorMap;
