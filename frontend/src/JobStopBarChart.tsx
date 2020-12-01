import React from "react";
import dataSouce from './HousingVisualizationData.json'
import Chart, {
    ArgumentAxis,
    Legend,
    Series,
    ValueAxis,
    Label,
    Export,
    Tick
  } from 'devextreme-react/chart';


function JobStopBarChart() {
    return (
        <Chart
            margin={{top: 20, right: 10, left: 10, bottom: 20}}
            title="Percentage of Depreciating Houses by City (Top 10)"
            dataSource={dataSouce}
            rotated={true}
            id="chart"
        >

            <ArgumentAxis>
            </ArgumentAxis>

            <ValueAxis>
            <Tick visible={false} />
            <Label visible={false} />
            </ValueAxis>

            <Series
            valueField="percentage"
            argumentField="name"
            type="bar"
            color="#79cac4"
            >
            <Label visible={true} backgroundColor="#c18e92" />
            </Series>

            <Legend visible={false} />

            <Export enabled={true} />

        </Chart>
    )
}

export default JobStopBarChart;