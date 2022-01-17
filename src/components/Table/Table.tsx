import React from "react";
import styled from "styled-components";
import { money } from "../../Utils";

const TableComponent = styled.table`
  font-family: "Open Sans", sans-serif;
  border-spacing: 0;
  padding: 40px;
`;
const Flag = styled.img`
  height: 30px;
  margin-right: 0.5em;
`;
const TableBody = styled.tbody``;
const Cell = styled.td<{ type?: string }>`
  text-align: ${(props: any) => (props.type === "num" ? "right" : "left")};
  padding: 5px 20px;
`;
const Centered = styled.div`
  display: flex;
  align-items: center;
`;
const Row = styled.tr`
  &:nth-child(2n + 2) {
    background-color: #f5f5f5;
  }
`;
const HeaderRow = styled.tr`
  font-weight: bold;
  color: white;
  background-color: #384434;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  > td {
    padding: 10px 20px;
  }
  > td:first-child {
    border-top-left-radius: 10px;
  }
  > td:last-child {
    border-top-right-radius: 10px;
  }
`;
// const HeaderCell = styled.th``;

//   "https://flags.talusanalytics.com/shiny_64px/us.png";

type TableData = {
  flag_url: string;
  label: string;
  d: number;
  c: number;
}[];

export const Table = ({
  data,
  limit = 10,
}: {
  data: TableData;
  limit?: number;
}) => {
  return (
    <TableComponent>
      <thead>
        <HeaderRow>
          <Cell>Funder</Cell>
          <Cell>Disbursed (USD, nominal)</Cell>
          <Cell>Committed (USD, nominal)</Cell>
        </HeaderRow>
      </thead>
      <TableBody>
        {data.slice(0, limit).map(({ flag_url, label, d, c }) => (
          <Row>
            <Cell>
              <Centered>
                <Flag src={flag_url} alt={`Icon for ${label}`} />
                {label}
              </Centered>
            </Cell>
            <Cell type="num">{money(d)}</Cell>
            <Cell type="num">{money(c)}</Cell>
          </Row>
        ))}
      </TableBody>
    </TableComponent>
  );
};

export default Table;
