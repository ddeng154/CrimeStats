import React from "react";
import axios, { AxiosResponse } from "axios";
import { Button } from "react-bootstrap";
import Loading from "./Loading";

type CrimeData = {
  id: number;
  ori: string;
  type: string;
  o_white: number;
  o_black: number;
  o_pacific: number;
  o_native: number;
  o_asian: number;
  v_white: number;
  v_black: number;
  v_pacific: number;
  v_native: number;
  v_asian: number;
  pd_name: string;
  counties: { id: string; name: string }[];
};

type CompareState = {
  id1: string;
  id2: string;
  element1?: CrimeData;
  element2?: CrimeData;
  isLoading: boolean;
};

class CompareCrimes extends React.Component {
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
      const request1 = axios.get<CrimeData>("/api/crimes/" + this.state.id1);
      const request2 = axios.get<CrimeData>("/api/crimes/" + this.state.id2);
      axios
        .all<AxiosResponse<CrimeData>>([request1, request2])
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
        <h1>Comparing Crimes</h1>
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
                  <a href={"/crimes/" + this.state.element1!.id}>
                    {this.state.element1!.type} in{" "}
                    {this.state.element1!.pd_name}
                  </a>
                </th>
                <th>
                  <a href={"/crimes/" + this.state.element2!.id}>
                    {this.state.element2!.type} in{" "}
                    {this.state.element2!.pd_name}
                  </a>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>No. of White Offenders</td>
                <td>{this.state.element1!.o_white}</td>
                <td>{this.state.element2!.o_white}</td>
              </tr>
              <tr>
                <td>No. of Black Offenders</td>
                <td>{this.state.element1!.o_black}</td>
                <td>{this.state.element2!.o_black}</td>
              </tr>
              <tr>
                <td>No. of Pacific Offenders</td>
                <td>{this.state.element1!.o_pacific}</td>
                <td>{this.state.element2!.o_pacific}</td>
              </tr>
              <tr>
                <td>No. of Native Offenders</td>
                <td>{this.state.element1!.o_native}</td>
                <td>{this.state.element2!.o_native}</td>
              </tr>
              <tr>
                <td>No. of Asian Offenders</td>
                <td>{this.state.element1!.o_asian}</td>
                <td>{this.state.element2!.o_asian}</td>
              </tr>
              <tr>
                <td>No. of White Victims</td>
                <td>{this.state.element1!.v_white}</td>
                <td>{this.state.element2!.v_white}</td>
              </tr>
              <tr>
                <td>No. of Black Victims</td>
                <td>{this.state.element1!.v_black}</td>
                <td>{this.state.element2!.v_black}</td>
              </tr>
              <tr>
                <td>No. of Pacific Victims</td>
                <td>{this.state.element1!.v_pacific}</td>
                <td>{this.state.element2!.v_pacific}</td>
              </tr>
              <tr>
                <td>No. of Native Victims</td>
                <td>{this.state.element1!.v_native}</td>
                <td>{this.state.element2!.v_native}</td>
              </tr>
              <tr>
                <td>No. of Asian Victims</td>
                <td>{this.state.element1!.v_asian}</td>
                <td>{this.state.element2!.v_asian}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default CompareCrimes;
