import React from 'react';
import axios from 'axios';
import { IDParams } from './common';
import { Redirect } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

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
  crimes: { id: string; type: string }[];
};

type PoliceDepartmentState = {
  policeDepartment?: PoliceDepartmentData;
  isLoading: boolean;
};

class PoliceDepartment extends React.Component<IDParams> {
  state: PoliceDepartmentState = {
    isLoading: true
  };

  componentDidMount() {
    axios.get<PoliceDepartmentData>("/api/police_departments/" + this.props.id).then(response => {
      this.setState({ policeDepartment: response.data });
    }).catch(_ => {}).finally(() => {
      this.setState({ isLoading: false });
    });
  }

  render() {
    if (this.state.isLoading) {
      return <h1>Loading...</h1>;
    } else if (this.state.policeDepartment) {
      return (
        <div>
          <h1>{this.state.policeDepartment.name}</h1>
          <table className = "table">
            <tbody>
              <tr>
                <th scope = "row">Population</th>
                <td> {this.state.policeDepartment.pop} </td>
              </tr>
              <tr>
                <th scope = "row">Male officers</th>
                <td> {this.state.policeDepartment.num_male_officers} </td>
              </tr>
              <tr>
                <th scope = "row">Female officers</th>
                <td> {this.state.policeDepartment.num_female_officers} </td>
              </tr>
              <tr>
                <th scope = "row">Civilians</th>
                <td> {this.state.policeDepartment.num_civilians} </td>
              </tr>
              <tr>
                <th scope = "row">Dept. type</th>
                <td> {this.state.policeDepartment.dept_type} </td>
              </tr>
              <tr>
                <th scope = "row">Division name</th>
                <td> {this.state.policeDepartment.div_name} </td>
              </tr>
              <tr>
                <th scope = "row">Region name</th>
                <td> {this.state.policeDepartment.reg_name} </td>
              </tr>
              <tr>
                <th scope = "row">Density (per 1000)</th>
                <td> {this.state.policeDepartment.density_per_1000} </td>
              </tr>
              <tr>
                <th scope = "row">Counties</th>
                <td> 
                  <ul>{ this.state.policeDepartment.counties.map(c => <Nav.Link key={c.id} href={"/counties/" + c.id}>{c.name}</Nav.Link>) }</ul> 
                </td>
              </tr>
              <tr>
                <th scope = "row">Crimes</th>
                <td> 
                  <ul>{ this.state.policeDepartment.crimes.map(c => <Nav.Link key={c.id} href={"/crimes/" + c.id}>{c.type}</Nav.Link>) }</ul> 
                </td>
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

export default PoliceDepartment;