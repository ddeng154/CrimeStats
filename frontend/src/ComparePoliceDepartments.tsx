import React from "react";
import axios, { AxiosResponse } from "axios";
import { Button } from "react-bootstrap";
import Loading from "./Loading";

type PoliceDepartmentData = {
  ori: string;
  name: string;
  pop: number;
  num_male_officers: number;
  num_female_officers: number;
  num_civilians: number;
  dept_type: string;
  div_name: string;
  reg_name: string;
  density_per_1000: number;
  counties: { id: string; name: string }[];
  crimes: { id: string; type: string; total: number }[];
};

type CompareState = {
  id1: string;
  id2: string;
  element1?: PoliceDepartmentData;
  element2?: PoliceDepartmentData;
  isLoading: boolean;
};

class ComparePoliceDepartments extends React.Component {
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

  handleSubmit() {
    this.setState({
      isLoading: true,
      element1: undefined,
      element2: undefined,
    });
    if (this.state.id1 && this.state.id2) {
      const request1 = axios.get<PoliceDepartmentData>(
        "/api/police_departments/" + this.state.id1
      );
      const request2 = axios.get<PoliceDepartmentData>(
        "/api/police_departments/" + this.state.id2
      );
      axios
        .all<AxiosResponse<PoliceDepartmentData>>([request1, request2])
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
        <h1>Comparing Police Departments</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            ORI 1:
            <input type="text" onChange={this.handleID1Change} />
            <br />
            ORI 2:
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
          Please enter 2 valid ORIs (look in the URLs of instance pages for
          ORIs)
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
                  <a href={"/policedepartments/" + this.state.element1!.ori}>
                    {this.state.element1!.name}
                  </a>
                </th>
                <th>
                  <a href={"/policedepartments/" + this.state.element2!.ori}>
                    {this.state.element2!.name}
                  </a>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Population</td>
                <td>{this.state.element1!.pop}</td>
                <td>{this.state.element2!.pop}</td>
              </tr>
              <tr>
                <td>Male officers</td>
                <td>{this.state.element1!.num_male_officers}</td>
                <td>{this.state.element2!.num_male_officers}</td>
              </tr>
              <tr>
                <td>Female officers</td>
                <td>{this.state.element1!.num_female_officers}</td>
                <td>{this.state.element2!.num_female_officers}</td>
              </tr>
              <tr>
                <td>Civilians</td>
                <td>{this.state.element1!.num_civilians}</td>
                <td>{this.state.element2!.num_civilians}</td>
              </tr>
              <tr>
                <td>Dept. type</td>
                <td>{this.state.element1!.dept_type}</td>
                <td>{this.state.element2!.dept_type}</td>
              </tr>
              <tr>
                <td>Division name</td>
                <td>{this.state.element1!.div_name}</td>
                <td>{this.state.element2!.div_name}</td>
              </tr>
              <tr>
                <td>Region name</td>
                <td>{this.state.element1!.reg_name}</td>
                <td>{this.state.element2!.reg_name}</td>
              </tr>
              <tr>
                <td>Density (per 1000)</td>
                <td>{this.state.element1!.density_per_1000}</td>
                <td>{this.state.element2!.density_per_1000}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default ComparePoliceDepartments;
