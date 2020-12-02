import React from "react";
import { IDParams } from "./common";
import housing_data from "./HousingVisualizationData.json";
import job_data from "./JobVisualization.json";
import Funnel, {
  Title,
  Margin,
  Tooltip,
  Export,
  Item,
  Border,
  Label,
} from "devextreme-react/funnel";

import JobStopBarChart from "./JobStopBarChart";
import JobStopLineChart from "./JobStopLineChart";

type HousingData = {
  name: string;
  percentage: number;
};

type JobState = {
  houses: HousingData[];
};

export default class JobStopVisualizations extends React.Component<IDParams> {
  state: JobState = {
    houses: housing_data,
  };

  render() {
    return (
      <div>
        {JobStopBarChart()}

        {JobStopLineChart()}

        <Funnel
          id="funnel"
          dataSource={job_data}
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          palette="Soft Pastel"
          argumentField="name"
          valueField="number"
        >
          <Title text="Companies with Most Jobs (Top 10)">
            <Margin bottom={20} />
          </Title>
          <Export enabled={true} />
          <Tooltip />
          <Item>
            <Border visible={true} />
          </Item>
          <Label visible={true} backgroundColor="none" />
        </Funnel>
      </div>
    );
  }
}
