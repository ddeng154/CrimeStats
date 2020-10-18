import React from 'react';
import axios from 'axios';
import { IDParams } from './common';
import { Redirect } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

type PoliceDepartmentData = {
  id: string;
  name: string;
  counties: { id: number; name: string }[];
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
          <h4>Counties</h4>
          <ul>
            { this.state.policeDepartment.counties.map(c => <Nav.Link key={c.id} href={"/counties/" + c.id}>{c.name}</Nav.Link>) }
          </ul>
        </div>
      );
    } else {
      return <Redirect to="/404" />;
    }
  }
}

export default PoliceDepartment;