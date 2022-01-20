import React, { useEffect } from "react";
import styled from "styled-components";
import { format } from "../../Utils";
import chart from "./chart";
// const data = require("./all_indivs_to_country_indivs_tracking_sankey_01172022.json");
// const data = require("./all_cat_indiv_to_who_region_tracking_sankey_01172022.json");
// const data = require("./all_country_individuals_to_countries_tracking_sankey_01182022.json");
// const data = require("./all_indivs_to_int_indivs_tracking_sankey_01172022.json");
const data = require("./all_phil_individuals_to_countries_01182022.json");

const reducer = (previousValue: number, currentValue: number) =>
  previousValue + currentValue;

const SankeySvg = styled.svg`
  text {
    font-family: "Open Sans", sans-serif;
    font-size: 1.25em;
  }
`;

const Table = styled.table`
  text-align: left;
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

const formatPrecise = (v: number) => format(v, 3);

export const FundingSankey = () => {
  useEffect(() => {
    chart(data, COLORS);
  }, []);
  return (
    <>
      <SankeySvg data-chart={"sankey"} />
      <Legend>
        {Object.entries(COLORS).map(([label, color]) => {
          if (getCategorySum(label) === 0) return null;
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
        </div>
      </Legend>
      <Table>
        <th>
          <td>Category</td>
          <td>Total disbursed value (nominal USD) for capacity</td>
        </th>
        {Object.entries(COLORS).map(([label, _color]) => {
          return (
            <tr>
              <td>{LABELS[label] || label}</td>
              <td>{formatPrecise(getCategorySum(label))}</td>
            </tr>
          );
        })}
        <tr>
          <td>Total</td>
          <td>
            {formatPrecise(data.map((d: any) => d.value).reduce(reducer))}
          </td>
        </tr>
      </Table>
    </>
  );
};
function getCategorySum(label: string): number {
  const catVals = data.filter((d: any) => d.source_cat === label);
  console.log(catVals);

  return catVals.length > 0
    ? catVals.map((d: any) => d.value).reduce(reducer)
    : 0;
}
