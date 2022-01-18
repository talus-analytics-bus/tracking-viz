import "./App.css";
import { JEETreemap } from "./components/JEETreemap/JEETreemap";
import { FundingSankey } from "./components/FundingSankey/FundingSankey";
import Table from "./components/Table/Table";
import tableData from "./components/Table/topfunders.json";
import ChoroplethMap from "./components/Map/ChoroplethMap/ChoroplethMap";
import ColorMap from "./components/Map/ColorMap/ColorMap";

// data
import unmetneeds from "./components/Map/unmetneeds.json";
import spar_recent_avg from "./components/Map/spar_recent_avg.json";

function App() {
  return (
    <div className="App">
      {/* <ChoroplethMap data={spar_recent_avg} /> */}
      <ColorMap data={unmetneeds} />
      {/* <Table data={tableData} /> */}
      {/* <FundingSankey /> */}
      {/* <JEETreemap /> */}
    </div>
  );
}

export default App;
