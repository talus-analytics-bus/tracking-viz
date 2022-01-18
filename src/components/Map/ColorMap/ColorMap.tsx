import Map from "../Map";

export const ColorMap = ({ data }: { data: any[] }) => {
  const colors: string[] = [
    ...new Set(data.map((d: any) => d.Color as string)),
  ];
  return (
    <Map
      id={(d: any) => d["Stakeholder ISO3"]}
      value={(d: any) => d.Color}
      domain={colors}
      range={colors}
      {...{ data }}
    ></Map>
  );
};

export default ColorMap;
