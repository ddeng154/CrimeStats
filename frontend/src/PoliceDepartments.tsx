import React from 'react';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { APIResponse } from './common';
import Table from 'react-bootstrap/Table';

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
    elements: new Array<PoliceDepartmentData>(),
    currentPage: 1,
    totalPages: -1,
    isLoading: true
  };

  componentDidMount() {
    this.fetchElements();
  }

  fetchElements = () => {
    this.setState({ isLoading: true });
    axios.get<APIResponse<PoliceDepartmentData>>("/api/police_departments?page=" + this.state.currentPage).then(response => {
      this.setState({
        elements: response.data.objects,
        totalPages: response.data.total_pages,
        isLoading: false
      });
    });
  }

  previousPage = () => {
    if (this.state.currentPage > 1) {
      this.setState({ currentPage: this.state.currentPage - 1 }, this.fetchElements);
    } else if (this.state.totalPages > 1) {
      this.setState({ currentPage: this.state.totalPages }, this.fetchElements);
    }
  }

  nextPage = () => {
    if (this.state.currentPage < this.state.totalPages) {
      this.setState({ currentPage: this.state.currentPage + 1 }, this.fetchElements);
    } else if (this.state.totalPages > 1) {
      this.setState({ currentPage: 1 }, this.fetchElements);
    }
  }

  render() {
    if (this.state.isLoading) {
      return <h1>Loading...</h1>;
    }

    const Pagination = (
      <div>
        <Button onClick={this.previousPage}>Previous</Button>
        {" " + this.state.currentPage + " "}
        <Button onClick={this.nextPage}>Next</Button>
      </div>
    );

    return (
      <div className="text-center">
        <h1>Police Departments</h1>
        { Pagination }
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ORI</th>
              <th>Name</th>
              <th>Population</th>
              <th>No. Male Officers</th>
              <th>No. Female Officers</th>
              <th>No. Civilians</th>
              <th>Department Type</th>
              <th>Division Name</th>
              <th>Region Name</th>
              <th>Density per 1000</th>
            </tr>
          </thead>
          <tbody>
            { this.state.elements.map(PoliceDepartmentRow) }
          </tbody>
        </Table>
        { Pagination }
      </div>
    );
  }
}

function PoliceDepartmentRow(pd: PoliceDepartmentData) {
  return (
    <tr key={pd.ori}>
      <td>{pd.ori}</td>
      <td><Nav.Link key={pd.name} href={"/policedepartments/" + pd.ori}>{pd.name}</Nav.Link></td>
      <td>{pd.pop}</td>
      <td>{pd.num_male_officers}</td>
      <td>{pd.num_female_officers}</td>
      <td>{pd.num_civilians}</td>
      <td>{pd.dept_type}</td>
      <td>{pd.div_name}</td>
      <td>{pd.reg_name}</td>
      <td>{pd.density_per_1000}</td>
    </tr>
  );
}

export default PoliceDepartments;