import React from "react";
import axios, { AxiosResponse } from "axios";
import { Button } from "react-bootstrap";

type CountyData = {
  id: string;
  name: string;
  state: string;
  median_income: number;
  total_pop: number;
  black_pop: number;
  white_pop: number;
  pacific_pop: number;
  native_pop: number;
  asian_pop: number;
  area: number;
  longitude: number;
  latitude: number;
  police_departments: { ori: string; name: string }[];
  crimes: { id: number; type: string; pd_name: string }[];
};

type CompareState = {
  id1: string;
  id2: string;
  element1?: CountyData;
  element2?: CountyData;
  isLoading: boolean;
};

class CompareCounties extends React.Component {
  state: CompareState = {
    id1: "",
    id2: "",
    element1: undefined,
    element2: undefined,
    isLoading: true,
  };

  constructor(props: {}) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleID1Change = this.handleID1Change.bind(this);
    this.handleID2Change = this.handleID2Change.bind(this);
  }

  handleSubmit() {
    this.setState({ isLoading: true });
    if (this.state.id1 && this.state.id2) {
      const request1 = axios.get<CountyData>("/api/counties/" + this.state.id1);
      const request2 = axios.get<CountyData>("/api/counties/" + this.state.id2);
      axios
        .all<AxiosResponse<CountyData>>([request1, request2])
        .then(
          axios.spread((response1, response2) => {
            this.setState({
              element1: response1.data,
              element2: response2.data,
              isLoading: false,
            });
          })
        )
        .catch((_) => {});
    }
  }

  handleID1Change(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ id1: event.target.value });
  }

  handleID2Change(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ id2: event.target.value });
  }

  render() {
    const Form = (
      <div>
        <h1>Comparing Counties</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            ID 1:
            <input type="text" onChange={this.handleID1Change} />
            <br />
            ID 2:
            <input type="text" onChange={this.handleID2Change} />
          </label>
        </form>

        <Button onClick={this.handleSubmit}>Compare</Button>
      </div>
    );
    if (this.state.isLoading) {
      return (
        <div className="text-center">
          {Form}
          Please enter 2 valid IDs (look in the URLs of instance pages for IDs)
        </div>
      );
    } else {
      return (
        <div className="text-center">
          {Form}
          <table className="table">
            <thead>
              <tr>
                <th>Data</th>
                <th>
                  <a href={"/counties/" + this.state.element1!.id}>
                    {this.state.element1!.name}
                  </a>
                </th>
                <th>
                  <a href={"/counties/" + this.state.element2!.id}>
                    {this.state.element2!.name}
                  </a>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>State</td>
                <td>{this.state.element1!.state}</td>
                <td>{this.state.element2!.state}</td>
              </tr>
              <tr>
                <td>Median Income</td>
                <td>{this.state.element1!.median_income}</td>
                <td>{this.state.element2!.median_income}</td>
              </tr>
              <tr>
                <td>Total Population</td>
                <td>{this.state.element1!.total_pop}</td>
                <td>{this.state.element2!.total_pop}</td>
              </tr>
              <tr>
                <td>Black Population</td>
                <td>{this.state.element1!.black_pop}</td>
                <td>{this.state.element2!.black_pop}</td>
              </tr>
              <tr>
                <td>White Population</td>
                <td>{this.state.element1!.white_pop}</td>
                <td>{this.state.element2!.white_pop}</td>
              </tr>
              <tr>
                <td>Pacific Population</td>
                <td>{this.state.element1!.pacific_pop}</td>
                <td>{this.state.element2!.pacific_pop}</td>
              </tr>
              <tr>
                <td>Native Population</td>
                <td>{this.state.element1!.native_pop}</td>
                <td>{this.state.element2!.native_pop}</td>
              </tr>
              <tr>
                <td>Asian Population</td>
                <td>{this.state.element1!.asian_pop}</td>
                <td>{this.state.element2!.asian_pop}</td>
              </tr>
              <tr>
                <td>Area</td>
                <td>{this.state.element1!.area}</td>
                <td>{this.state.element2!.area}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default CompareCounties;
