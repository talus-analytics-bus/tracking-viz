import React, { useEffect } from "react";
import styled from "styled-components";
import { format } from "../../Utils";
import chart from "./chart";
const data = require("./tracking_sankey_01142022.json");

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const reducer = (previousValue: number, currentValue: number) =>
  previousValue + currentValue;

const SankeySvg = styled.svg`
  text {
    font-family: "Open Sans", sans-serif;
    font-size: 1.25em;
  }
`;

const Legend = styled.div`
  width: 200px;
  font-family: "Open Sans", sans-serif;
  padding: 1em;
  font-size: 0.8em;
  position: absolute;
  top: 0;
  text-align: left;
`;

const Square = styled.div`
  background-color: ${(props) => props.color};
  width: 20px;
  height: 20px;
  margin-right: 0.5em;
`;

const Entry = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  margin: 0.25em 0;
`;

const Label = styled.div`
  text-align: left;
`;

const COLORS = {
  Country: "#66c2a5",
  International: "#8da0cb",
  Philanthropy: "#fc8d62",
};

const LABELS: Record<string, string> = {
  Country: "Government",
  International: "International org.",
};

export const FundingSankey = () => {
  useEffect(() => {
    chart(COLORS);
  }, []);
  return (
    <>
      <SankeySvg data-chart={"sankey"} />
      <Legend>
        {Object.entries(COLORS).map(([label, color]) => {
          return (
            <Entry>
              <Square color={color} />
              <Label>{LABELS[label] || label}</Label>
            </Entry>
          );
        })}
        <div>
          Total disbursed value <br />
          (nominal USD) for capacity:
          <br />
          {format(data.map((d: any) => d.value).reduce(reducer))}
          {/* {formatter.format(data.map((d: any) => d.value).reduce(reducer))} */}
        </div>
      </Legend>
    </>
  );
};
