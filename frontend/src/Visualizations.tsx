import React, { Component } from "react";
import axios from "axios";
import { IDParams } from "./common";
import { PieChart } from "react-minimal-pie-chart";
import Loading from "./Loading";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

type CountyData = {
    name: string;
    median_income: number;
    total: number;
};

type PoliceData = {

};

type VisualizationState = {
    isLoading: boolean;
    counties?: CountyData[];
    police_departments?: PoliceData[];
};

export default class Visualizations extends React.Component<IDParams> {
  state: VisualizationState = {
    isLoading: true,
  };

  componentDidMount() {
    axios.get<CountyData[]>('api/test').then((response) => {
        this.setState({
          counties: response.data,
          isLoading: false,
        });
      });
  }

  render() {
    if (this.state.isLoading) {
        return <Loading />;
    }
    return (
        <div>
            <PieChart
                animate
                animationDuration={2000}
                center={[20, 20]}
                data={[
                {
                    color: "#E38627",
                    title: "White",
                    value: 382164,
                },
                {
                    color: "#C13C37",
                    title: "Black",
                    value: 358828,
                },
                {
                    color: "#6A2135",
                    title: "Native",
                    value: 9627,
                },
                {
                    color: "#E327B7",
                    title: "Asian",
                    value: 7326,
                },
                ]}
                radius={10}
            />
            <ScatterChart
                width={400}
                height={400}
                margin={{
                top: 20, right: 20, bottom: 20, left: 20,
                }}
            >
                <CartesianGrid />
                <XAxis type="number" dataKey="median_income" name="Median Income" unit="cm" />
                <YAxis type="number" dataKey="total" name="Total # of Crimes" unit="kg" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="A school" data={this.state.counties} fill="#8884d8" />
            </ScatterChart>
        </div>
    );
  }
}

