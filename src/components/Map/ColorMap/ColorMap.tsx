import Map from "../Map";
import data from "../unmetneeds.json";

const colors: string[] = [...new Set(data.map((d: any) => d.Color as string))];
export const ColorMap = () => {
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
