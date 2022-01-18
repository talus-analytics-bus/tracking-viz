import Map from "../Map";

export const ChoroplethMap = ({
  data,
  chartKey,
}: {
  data: any[];
  chartKey: string;
}) => {
  return (
    <>
      <Map
        id={(d: any) => d["Stakeholder ISO3"]}
        value={(d: any) => d.Value}
        {...{ data, chartKey }}
      ></Map>
    </>
  );
};

export default ChoroplethMap;
