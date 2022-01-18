import "./App.css";
import { JEETreemap } from "./components/JEETreemap/JEETreemap";
import { FundingSankey } from "./components/FundingSankey/FundingSankey";
import Table from "./components/Table/Table";
import tableData from "./components/Table/topfunders.json";
import ColorMap from "./components/Map/ColorMap/ColorMap";

// data
import unmetneeds from "./components/Map/unmetneeds.json";

function App() {
  return (
    <div className="App">
      <ColorMap data={unmetneeds} />
      {/* <Table data={tableData} /> */}
      {/* <FundingSankey /> */}
      {/* <JEETreemap /> */}
    </div>
  );
}

export default App;
