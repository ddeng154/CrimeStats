import React from "react";
import climate_data from './ClimateVisualization.json';
import cities from './ClimateVisualization2.json';
import {
  Chart,
  Series,
  ArgumentAxis,
  CommonSeriesSettings,
  Export,
  Legend,
  Margin,
  Title,
  Tooltip,
  Grid
} from 'devextreme-react/chart';

function JobStopLineChart() {
    return (
        <React.Fragment>
            <Chart
            margin={{top: 20, right: 10, left: 10, bottom: 20}}
            palette="Violet"
            dataSource={climate_data}
            >
            <CommonSeriesSettings
                argumentField="name"
                type='line'
            />
            {
                cities.map((city) => {
                    return (
                        <Series key={city.name} valueField={city.name} name={city.name} />
                    )
                })
            }
            <Margin bottom={20} />
            <ArgumentAxis
                valueMarginsEnabled={false}
                discreteAxisDivisionMode="crossLabels"
            >
                <Grid visible={true} />
            </ArgumentAxis>
            <Legend
                verticalAlignment="bottom"
                horizontalAlignment="center"
                itemTextPosition="bottom"
            />
            <Export enabled={true} />
            <Title text="Average Precipitation by City over a year"></Title>
            <Tooltip enabled={true} />
            </Chart>
        </React.Fragment>
    )
}

export default JobStopLineChart;