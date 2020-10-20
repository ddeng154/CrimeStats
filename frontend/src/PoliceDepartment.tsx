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
          <h1>{this.state.policeDepartment.pop}</h1>
          <h1>{this.state.policeDepartment.num_male_officers}</h1>
          <h1>{this.state.policeDepartment.num_female_officers}</h1>
          <h1>{this.state.policeDepartment.num_civilians}</h1>
          <h1>{this.state.policeDepartment.dept_type}</h1>
          <h1>{this.state.policeDepartment.div_name}</h1>
          <h1>{this.state.policeDepartment.reg_name}</h1>
          <h1>{this.state.policeDepartment.density_per_1000}</h1>
          <h4>Counties</h4>
          <ul>
            { this.state.policeDepartment.counties.map(c => <Nav.Link key={c.id} href={"/counties/" + c.id}>{c.name}</Nav.Link>) }
          </ul>
          <h4>Crimes</h4>
          <ul>
            { this.state.policeDepartment.crimes.map(c => <Nav.Link key={c.id} href={"/crimes/" + c.id}>{c.type}</Nav.Link>) }
          </ul>
        </div>
      );
    } else {
      return <Redirect to="/404" />;
    }
  }
}

export default PoliceDepartment;