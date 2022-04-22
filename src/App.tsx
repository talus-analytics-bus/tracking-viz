import './App.css'
import { JEETreemap } from './components/JEETreemap/JEETreemap'
import { FundingSankey } from './components/FundingSankey/FundingSankey'
import Table from './components/Table/Table'
import topFunders from './components/Table/topfunders.json'
import topRecipients from './components/Table/toprecipients.json'
import ChoroplethMap from './components/Map/ChoroplethMap/ChoroplethMap'
import ColorMap from './components/Map/ColorMap/ColorMap'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// data
import spar_recent_avg_tertiles from './components/Map/spar_recent_avg_tertiles.json'
// import spar_recent_avg from "./components/Map/spar_recent_avg.json";
import A_spar_even_and_2018_disb_even from './components/Map/A_spar_even_and_2018_disb_even.json'
import B_spar_tertile_and_2018_disb_even from './components/Map/B_spar_tertile_and_2018_disb_even.json'
import C_spar_even_and_2018_disb_tertile from './components/Map/C_spar_even_and_2018_disb_tertile.json'
import D_spar_and_2018_disb_tertile from './components/Map/D_spar_and_2018_disb_tertile.json'
import { Nav } from './layout/Nav'

const valToColorBivarSimple: Record<number, string> = {
    31: '#DE8DC5',
    32: '#677A9E', //
    33: '#677A9E', //
    21: '#E3B7D5',
    22: '#677A9E', //
    23: '#677A9E', //
    11: '#F0F0F0',
    12: '#B7EFC3',
    13: '#7BDD9F',
}
const valToColorBivarFull: Record<number, string> = {
    31: '#DE8DC5',
    32: '#AD8BC2',
    33: '#677A9E',
    21: '#E3B7D5',
    22: '#8DB8C8',
    23: '#6DBAA0',
    11: '#F0F0F0',
    12: '#B7EFC3',
    13: '#7BDD9F',
}
const valToColorSpar: Record<number, string> = {
    1: '#DE8DC5',
    2: '#E3B7D5',
    3: '#F0F0F0',
}

function App() {
    return (
        <div className="App">
            <Router>
                <Nav />
                <Routes>
                    <Route path={'/'} element={null} />
                    {/* Treemap */}
                    <Route path={'jeeTreemap'} element={<JEETreemap />} />
                    {/* Maps */}
                    <Route
                        path={'maps'}
                        element={
                            <>
                                <ColorMap
                                    title={
                                        'A: 2017 SPAR score averages and disbursed capacity funding post-2017 (USD, nominal)'
                                    }
                                    subtitle={
                                        'SPAR score averages and disbursed funds binned using equal-size breakpoints (one upper outlier removed from funding)'
                                    }
                                    data={A_spar_even_and_2018_disb_even}
                                    chartKey={'bivariate-both-even'}
                                    valToColor={valToColorBivarFull}
                                />
                                <ColorMap
                                    title={
                                        'B: 2017 SPAR score averages and disbursed capacity funding post-2017 (USD, nominal)'
                                    }
                                    subtitle={
                                        'Capacity gap binned by tertiles, disbursed funds binned using equal-size breakpoints (one upper outlier removed)'
                                    }
                                    data={B_spar_tertile_and_2018_disb_even}
                                    chartKey={'bivariate-even'}
                                    valToColor={valToColorBivarFull}
                                />
                                <ColorMap
                                    title={
                                        'B2: 2017 SPAR score averages and disbursed capacity funding post-2017 (USD, nominal)'
                                    }
                                    subtitle={
                                        'Capacity gap binned by tertiles, disbursed funds binned using equal-size breakpoints (one upper outlier removed)'
                                    }
                                    data={B_spar_tertile_and_2018_disb_even}
                                    chartKey={'bivariate-simple-colors'}
                                    {...{ valToColor: valToColorBivarSimple }}
                                />
                                <ColorMap
                                    title={
                                        'C: 2017 SPAR score averages and disbursed capacity funding post-2017 (USD, nominal)'
                                    }
                                    subtitle={
                                        'Capacity gap binned by even-sized breakpoints and disbursed funds binned by tertiles'
                                    }
                                    data={C_spar_even_and_2018_disb_tertile}
                                    chartKey={
                                        'bivariate-spar-even-disb-tertiles'
                                    }
                                    {...{ valToColor: valToColorBivarFull }}
                                />
                                <ColorMap
                                    title={
                                        'D: 2017 SPAR score averages and disbursed capacity funding post-2017 (USD, nominal)'
                                    }
                                    subtitle={
                                        'Capacity gap and disbursed funds binned by tertiles'
                                    }
                                    data={D_spar_and_2018_disb_tertile}
                                    chartKey={'bivariate'}
                                    {...{ valToColor: valToColorBivarFull }}
                                />
                                <ColorMap
                                    data={spar_recent_avg_tertiles}
                                    chartKey={'spar'}
                                    valToColor={valToColorSpar}
                                />
                            </>
                        }
                    />

                    {/* Table */}
                    <Route
                        path={'tables'}
                        element={
                            <>
                                <Table data={topFunders} role={'funder'} />
                                <Table
                                    data={topRecipients}
                                    role={'recipient'}
                                />
                            </>
                        }
                    />

                    {/* Sankey */}
                    <Route path={'sankey'} element={<FundingSankey />} />
                    <Route path={'*'} element={<h1>404: Not found</h1>} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
