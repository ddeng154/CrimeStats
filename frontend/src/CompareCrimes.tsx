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

  CrimeRow(c1: CrimeData, c2: CrimeData) {
    const crimeFields = [
      ["No. of White Offenders", c1.o_white, c2.o_white],
      ["No. of Black Offenders", c1.o_black, c2.o_black],
      ["No. of Pacific Offenders", c1.o_pacific, c2.o_pacific],
      ["No. of Native Offenders", c1.o_native, c2.o_native],
      ["No. of Asian Offenders", c1.o_asian, c2.o_asian],
      ["No. of White Victims", c1.v_white, c2.v_white],
      ["No. of Black Victims", c1.v_black, c2.v_black],
      ["No. of Pacific Victims", c1.v_pacific, c2.v_pacific],
      ["No. of Native Victims", c1.v_native, c2.v_native],
      ["No. of Asian Victims", c1.v_asian, c2.v_asian],
    ];
    let index = -1;
    return crimeFields.map((c) => {
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
              {this.CrimeRow(this.state.element1, this.state.element2)}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default CompareCrimes;
