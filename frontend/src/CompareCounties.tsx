import React from "react";
import axios, { AxiosResponse } from "axios";
import { Button } from "react-bootstrap";
import Loading from "./Loading";

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
    isLoading: false,
  };

  constructor(props: {}) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleID1Change = this.handleID1Change.bind(this);
    this.handleID2Change = this.handleID2Change.bind(this);
  }

  //get table data
  CountyRow(c1: CountyData, c2: CountyData) {
    const countyFields = [
      ["State", c1.state, c2.state],
      ["Median Income", c1.median_income, c2.median_income],
      ["Total Population", c1.total_pop, c2.total_pop],
      ["Black Population", c1.black_pop, c2.black_pop],
      ["White Population", c1.white_pop, c2.white_pop],
      ["Pacific Population", c1.pacific_pop, c2.pacific_pop],
      ["Native Population", c1.native_pop, c2.native_pop],
      ["Asian Population", c1.asian_pop, c2.asian_pop],
      ["Area", c1.area, c2.area],
    ];
    let index = -1;
    return countyFields.map((c) => {
      index += 1;
      return (
        <tr key={index}>
          <th scope="row">{c[0]}</th>
          <td> {c[1]} </td>
          <td> {c[2]} </td>
        </tr>
      );
    });
  }

  handleSubmit() {
    this.setState({
      isLoading: true,
      element1: undefined,
      element2: undefined,
    });
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
        .catch((_) => {
          this.setState({ isLoading: false });
        });
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
          <Loading />
        </div>
      );
    } else if (!this.state.element1 || !this.state.element2) {
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
              {this.CountyRow(this.state.element1, this.state.element2)}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default CompareCounties;
