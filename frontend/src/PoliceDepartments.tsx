import React from 'react';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import { APIResponse } from './common';

type PoliceDepartmentData = {
    id: string;
    name: string;
};

class PoliceDepartments extends React.Component {
  state = {
    policeDepartments: new Array<PoliceDepartmentData>(),
    isLoading: true
  };

  componentDidMount() {
    axios.get<APIResponse<PoliceDepartmentData>>("/api/police_departments").then(response => {
      this.setState({ policeDepartments: response.data.objects, isLoading: false });
    });
  }

  render() {
    if (this.state.isLoading) {
      return <h1>Loading...</h1>;
    }

    return (
      <div>
        <h1>Police Departments</h1>
        <ul>
          { this.state.policeDepartments.map(PoliceDepartmentRow) }
        </ul>
      </div>
    );
  }
}

function PoliceDepartmentRow(pd: PoliceDepartmentData) {
  return (
    <li key={pd.id}>
      <Nav.Link href={"/policedepartments/" + pd.id}>{pd.name}</Nav.Link>
    </li>
  );
}

export default PoliceDepartments;