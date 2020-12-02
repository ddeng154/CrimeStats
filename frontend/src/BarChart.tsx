import React from "react";
import Chart, {
  ArgumentAxis,
  Legend,
  Series,
  ValueAxis,
  Label,
  Export,
  Tick,
} from "devextreme-react/chart";

import dataSource from "./PDVisualizationData.json";

function Barchart() {
  return (
    <Chart
      margin={{ top: 20, right: 10, left: 10, bottom: 20 }}
      title="Police Departments with Highest Density per 1000 (Top 10)"
      dataSource={dataSource}
      rotated={true}
      id="chart"
    >
      <ArgumentAxis></ArgumentAxis>

      <ValueAxis>
        <Tick visible={false} />
        <Label visible={false} />
      </ValueAxis>

      <Series
        valueField="density_per_1000"
        argumentField="name"
        type="bar"
        color="#6efacc"
      >
        <Label visible={true} backgroundColor="#c18e92" />
      </Series>

      <Legend visible={false} />

      <Export enabled={true} />
    </Chart>
  );
}

export default Barchart;
