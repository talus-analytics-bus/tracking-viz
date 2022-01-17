import React from "react";
import styled from "styled-components";

const TableComponent = styled.table`
  font-family: "Open Sans", sans-serif;
`;
const TableBody = styled.tbody``;
const Cell = styled.td``;
const Row = styled.tr``;
const HeaderRow = styled.th``;
const HeaderCell = styled(Cell)``;

//   "https://flags.talusanalytics.com/shiny_64px/us.png";

type TableData = {
  iconUrl: string;
  label: string;
  d: number;
  c: number;
}[];

export const Table = ({ data }: { data: TableData }) => {
  return (
    <TableComponent>
      <HeaderRow>
        <HeaderCell>Funder</HeaderCell>
        <HeaderCell>Disbursed</HeaderCell>
        <HeaderCell>Committed</HeaderCell>
      </HeaderRow>
      <TableBody>
        {data.map(({ iconUrl, label, d, c }) => (
          <Row>
            <Cell>
              <img src={iconUrl} alt={`Icon for ${label}`} />
              {label}
            </Cell>
            <Cell>{d}</Cell>
            <Cell>{c}</Cell>
          </Row>
        ))}
      </TableBody>
    </TableComponent>
  );
};

export default Table;
