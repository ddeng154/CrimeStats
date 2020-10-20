import React from 'react';
import axios from 'axios';
import { IDParams } from './common';
import { Redirect } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

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
  counties: { id: string; name: string; }[];
};

type CrimeState = {
  crime?: CrimeData;
  isLoading: boolean;
};

class Crime extends React.Component<IDParams> {
  state: CrimeState = {
    isLoading: true
  };

  componentDidMount() {
    axios.get<CrimeData>("/api/crimes/" + this.props.id).then(response => {
      this.setState({ crime: response.data });
    }).catch(_ => {}).finally(() => {
      this.setState({ isLoading: false });
    });
  }

  render() {
    if (this.state.isLoading) {
      return <h1>Loading...</h1>;
    } else if (this.state.crime) {
      return (
        <div>
          <h4> {this.state.crime.type} </h4>
          <table className = "table">
            <tbody>
              <tr>
                <th scope = "row">Police Dept.</th>
                <td> <a href={"/policedepartments/" + this.state.crime.ori}>{this.state.crime.pd_name}</a> </td>
              </tr>
              <tr>
                <th scope = "row">No. of White Offenders</th>
                <td> {this.state.crime.o_white} </td>
              </tr>
              <tr>
                <th scope = "row">No. of Black Offenders</th>
                <td> {this.state.crime.o_black} </td>
              </tr>
              <tr>
                <th scope = "row">No. of Pacific Offenders</th>
                <td> {this.state.crime.o_pacific} </td>
              </tr>
              <tr>
                <th scope = "row">No. of Native Offenders</th>
                <td> {this.state.crime.o_native} </td>
              </tr>
              <tr>
                <th scope = "row">No. of Asian Offenders</th>
                <td> {this.state.crime.o_asian} </td>
              </tr>
              <tr>
                <th scope = "row">No. of White Victims</th>
                <td> {this.state.crime.v_white} </td>
              </tr>
              <tr>
                <th scope = "row">No. of Black Victims</th>
                <td> {this.state.crime.v_black} </td>
              </tr>
              <tr>
                <th scope = "row">No. of Pacific Victims</th>
                <td> {this.state.crime.v_pacific} </td>
              </tr>
              <tr>
                <th scope = "row">No. of Native Victims</th>
                <td> {this.state.crime.v_native} </td>
              </tr>
              <tr>
                <th scope = "row">No. of Asian Victims</th>
                <td> {this.state.crime.v_asian} </td>
              </tr>
              <tr>
                <th scope = "row">Counties</th>
                <td> { this.state.crime.counties.map(c => <Nav.Link key={c.id} href={"/counties/" + c.id}>{c.name}</Nav.Link>)} </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    } else {
      return <Redirect to="/404" />;
    }
  }
}

export default Crime;