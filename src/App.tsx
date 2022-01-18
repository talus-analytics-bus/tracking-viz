import "./App.css";
import { JEETreemap } from "./components/JEETreemap/JEETreemap";
import { FundingSankey } from "./components/FundingSankey/FundingSankey";
import Table from "./components/Table/Table";
import tableData from "./components/Table/topfunders.json";
import Map from "./components/Map/Map";

const FLAG_BASE_URL: string = "https://flags.talusanalytics.com/shiny_64px/";

const getFlagUrl = (cat: string, iso2: string) => {
  if (cat === "Country") return `${FLAG_BASE_URL}${iso2.toLowerCase()}.png`;
  else return `${FLAG_BASE_URL}org.png`;
};

function App() {
  return (
    <div className="App">
      <Map />
      {/* <Table data={tableData} /> */}
      {/* <FundingSankey /> */}
      {/* <JEETreemap /> */}
    </div>
  );
}

export default App;
