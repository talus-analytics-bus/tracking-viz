import React from "react";
import styled from "styled-components";

const StyledBivariateLegend = styled.div`
  /* margin: 0 auto; */
  display: flex;
  margin-top: -70px; // TODO elegantly
  margin-bottom: 40px;
  font-family: "Open Sans", sans-serif;
`;
const BivariateEntries = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto auto auto;
`;
const BivariateEntriesAndXLabel = styled.div`
  position: relative;
`;
const LegendSquare = styled.div<{ color: string }>`
  background-color: ${(props: any) => props.color || "lightgray"};
  width: 50px;
  height: 50px;
`;

const SideLabel = styled.div<{ axis: string }>`
  white-space: nowrap;
`;

const SideLabelX = styled(SideLabel)`
  position: absolute;
  bottom: -1.5em;
  left: 0;
`;
const SideLabelY = styled(SideLabel)`
  position: absolute;
  transform: rotate(-90deg);
  transform-origin: left;
  left: -1em;
  bottom: -0.5em;
  text-align: left;
`;

export const BivariateLegend = ({
  valToColor = {},
}: {
  valToColor?: Record<number, string>;
}) => {
  const keys = Object.keys(valToColor);
  const sequence = [3, 2, 1];
  const bivariate = keys.length > 3;
  const sequence2 = bivariate ? [1, 2, 3] : [1];
  return (
    <StyledBivariateLegend>
      <BivariateEntriesAndXLabel>
        {bivariate && <SideLabelY axis={"y"}>Capacity gap →</SideLabelY>}
        <BivariateEntries>
          {sequence.map((i) => {
            return sequence2.map((j) => {
              if (bivariate)
                return (
                  <LegendSquare color={valToColor[parseInt(`${i}${j}`)]} />
                );
              else return <LegendSquare color={valToColor[i]} />;
            });
          })}
        </BivariateEntries>
        {bivariate && <SideLabelX axis={"y"}>Disbursed funds →</SideLabelX>}
        {!bivariate && <SideLabelX axis={"x"}>Capacity gap →</SideLabelX>}
      </BivariateEntriesAndXLabel>
    </StyledBivariateLegend>
  );
};
