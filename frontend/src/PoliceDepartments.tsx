import React from 'react';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { APIResponse } from './common';

type PoliceDepartmentData = {
    id: string;
    name: string;
};

class PoliceDepartments extends React.Component {
  state = {
    policeDepartments: new Array<PoliceDepartmentData>(),
    elements: new Array<PoliceDepartmentData>(),
    currentPage: 0,
    totalPages: 0,
    perPage: 10,
    isLoading: true
  };

  componentDidMount() {
    axios.get<APIResponse<PoliceDepartmentData>>("/api/police_departments").then(response => {
      this.setState({
        policeDepartments: response.data.objects,
        totalPages: Math.ceil(response.data.objects.length / this.state.perPage),
        isLoading: false
      }, () => { this.setElements(); });
    });
  }

  setElements() {
    const offset = this.state.currentPage * this.state.perPage;
    const elements = this.state.policeDepartments.slice(offset, offset + this.state.perPage);
    this.setState({ elements });
  }

  previousPage = () => {
    if (this.state.currentPage >= 1) {
      this.setState({ currentPage: this.state.currentPage - 1 }, () => { this.setElements(); });
    }
  }

  nextPage = () => {
    if (this.state.currentPage < this.state.totalPages - 1) {
      this.setState({ currentPage: this.state.currentPage + 1 }, () => { this.setElements(); });
    }
  }

  render() {
    if (this.state.isLoading) {
      return <h1>Loading...</h1>;
    }

    const Pagination = (
      <div>
        <Button onClick={this.previousPage}>Previous</Button>
        {" " + (this.state.currentPage + 1) + " "}
        <Button onClick={this.nextPage}>Next</Button>
      </div>
    );

    return (
      <div className="text-center">
        <h1>Police Departments</h1>
        { Pagination }
        { this.state.elements.map(PoliceDepartmentRow) }
        { Pagination }
      </div>
    );
  }
}

function PoliceDepartmentRow(pd: PoliceDepartmentData) {
  return (
    <Nav.Link href={"/policedepartments/" + pd.id}>{pd.id} {pd.name}</Nav.Link>
  );
}

export default PoliceDepartments;