import "./App.css";
import { JEETreemap } from "./components/JEETreemap/JEETreemap";
import { FundingSankey } from "./components/FundingSankey/FundingSankey";
import Table from "./components/Table/Table";
import tableData from "./components/Table/topfunders.json";
import ChoroplethMap from "./components/Map/ChoroplethMap/ChoroplethMap";
import ColorMap from "./components/Map/ColorMap/ColorMap";

// ["#4475b6", "#5c699e", "#755e86", "#8e536e", "#a74756", "#c03c3e", "#d93127"];
// data
import unmetneeds from "./components/Map/unmetneeds.json";
import spar_recent_avg_tertiles from "./components/Map/spar_recent_avg_tertiles.json";
import spar_recent_avg from "./components/Map/spar_recent_avg.json";
import spar_and_2018_disb_tertiles from "./components/Map/spar_and_2018_disb_tertiles.json";
import spar_and_2018_disb_tertiles_even from "./components/Map/spar_and_2018_disb_tertiles_even.json";

const valToColorBivar: Record<number, string> = {
  31: "#DE8DC5",
  32: "#AD8BC2",
  33: "#677A9E",
  21: "#E3B7D5",
  22: "#8DB8C8",
  23: "#6DBAA0",
  11: "#F0F0F0",
  12: "#B7EFC3",
  13: "#7BDD9F",
};
const valToColorSpar: Record<number, string> = {
  1: "#DE8DC5",
  2: "#E3B7D5",
  3: "#F0F0F0",
};

function App() {
  return (
    <div className="App">
      <ColorMap
        title={
          "2017 SPAR score averages and disbursed capacity funding post-2017 (USD, nominal)"
        }
        subtitle={
          "Capacity gap binned by tertiles, disbursed funds binned using equal-size breakpoints (one upper outlier removed)"
        }
        data={spar_and_2018_disb_tertiles_even}
        chartKey={"bivariate-even"}
        valToColor={valToColorBivar}
      />
      <ColorMap
        title={
          "2017 SPAR score averages and disbursed capacity funding post-2017 (USD, nominal)"
        }
        subtitle={"Capacity gap and disbursed funds binned by tertiles"}
        data={spar_and_2018_disb_tertiles}
        chartKey={"bivariate"}
        {...{ valToColor: valToColorBivar }}
      />
      <ColorMap
        data={spar_recent_avg_tertiles}
        chartKey={"spar"}
        valToColor={valToColorSpar}
      />
      {/* <Table data={tableData} /> */}
      {/* <FundingSankey /> */}
      {/* <JEETreemap /> */}
    </div>
  );
}

export default App;
