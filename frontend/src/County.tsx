import React from 'react';
import axios from 'axios';
import { IDParams } from './common';
import { Redirect } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

type CountyData = {
  id: string;
  name: string;
  police_departments: { id: number; name: string }[];
};

type CountyState = {
  county?: CountyData;
  isLoading: boolean;
};

class County extends React.Component<IDParams> {
  state: CountyState = {
    isLoading: true
  };

  componentDidMount() {
    axios.get<CountyData>("/api/counties/" + this.props.id).then(response => {
      this.setState({ county: response.data });
    }).catch(_ => {}).finally(() => {
      this.setState({ isLoading: false });
    });
  }

  render() {
    if (this.state.isLoading) {
      return <h1>Loading...</h1>;
    } else if (this.state.county) {
      return (
        <div>
          <h1>{this.state.county.name}</h1>
          <h4>Police Departments</h4>
          <ul>
            { this.state.county.police_departments.map(p => <Nav.Link key={p.id} href={"/policedepartments/" + p.id}>{p.name}</Nav.Link>) }
          </ul>
        </div>
      );
    } else {
      return <Redirect to="/404" />;
    }
  }
}

export default County;