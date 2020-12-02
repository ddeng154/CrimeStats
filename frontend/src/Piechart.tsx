import React from "react";
import PieChart, {
  Series,
  Label,
  Connector,
  Size,
  Export,
} from "devextreme-react/pie-chart";

import data from "./CrimeVisualizationData.json";

function PiechartVisualization() {
  return (
    <PieChart
      id="pie"
      dataSource={data}
      palette="Bright"
      title="Racial Breakdown of Violent Crime Offenders"
    >
      <Series argumentField="race" valueField="number">
        <Label visible={true}>
          <Connector visible={true} width={1} />
        </Label>
      </Series>

      <Size width={500} />
      <Export enabled={true} />
    </PieChart>
  );
}

export default PiechartVisualization;
