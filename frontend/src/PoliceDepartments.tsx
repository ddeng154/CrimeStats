import React from 'react';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { APIResponse } from './common';

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
    <Nav.Link key={pd.ori} href={"/policedepartments/" + pd.ori}>{pd.ori} {pd.name}
      {pd.ori}
      {pd.name}
      {pd.pop}
      {pd.num_male_officers}
      {pd.num_female_officers}
      {pd.dept_type}
      {pd.div_name}
      {pd.reg_name}
      {pd.density_per_1000}
    </Nav.Link>
  );
}

export default PoliceDepartments;