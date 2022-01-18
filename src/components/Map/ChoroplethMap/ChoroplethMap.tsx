import Map from "../Map";

export const ChoroplethMap = ({ data }: { data: any[] }) => {
  return (
    <>
      <Map
        id={(d: any) => d["Stakeholder ISO3"]}
        value={(d: any) => d.Value}
        {...{ data }}
      ></Map>
    </>
  );
};

export default ChoroplethMap;
