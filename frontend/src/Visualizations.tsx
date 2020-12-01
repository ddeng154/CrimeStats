import React from "react";
import { IDParams } from "./common";
import county_data from './CountyVisualizationData.json';
import PiechartVisualization from './Piechart'
import Barchart from './BarChart';

import {
    Chart,
    Series,
    CommonSeriesSettings,
    Point,
    Legend,
    ValueAxis,
    ArgumentAxis,
    Grid,
    MinorGrid,
    CommonPaneSettings,
    Border, Title
  } from 'devextreme-react/chart';


export default class Visualizations extends React.Component<IDParams> {
  state: any = {
  };

  render() {
    return (
        <div>
            {PiechartVisualization}

            {Barchart()}

            <Chart 
                margin={{top: 20, right: 10, left: 10, bottom: 20}}
                id="chart" dataSource={county_data} 
                title="Total Number of Crimes vs Median Income per County">
                <CommonSeriesSettings type="scatter" />
                <Series
                    valueField="total"
                    argumentField="median_income"
                >
                    <Point symbol="triangleDown" />
                </Series>
                <ArgumentAxis>
                     <Title text="Median Income (USD)" />
                    <Grid visible={true} />
                    <MinorGrid visible={true} />
                </ArgumentAxis>
                <ValueAxis/>
                <Legend visible={false} />
                <CommonPaneSettings>
                    <Border visible={true} />
                </CommonPaneSettings>
            </Chart>
        </div>
    );
  }
}

