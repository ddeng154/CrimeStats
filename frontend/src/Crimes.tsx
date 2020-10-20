import React from 'react';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { APIResponse } from './common';
import Table from 'react-bootstrap/Table';

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
};

class Crimes extends React.Component {
  state = {
    elements: new Array<CrimeData>(),
    currentPage: 1,
    totalPages: -1,
    isLoading: true
  };

  componentDidMount() {
    this.fetchElements();
  }

  fetchElements = () => {
    this.setState({ isLoading: true });
    axios.get<APIResponse<CrimeData>>("/api/crimes?page=" + this.state.currentPage).then(response => {
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
        <h1>Crimes</h1>
        { Pagination }
        <Table striped hover>
          <thead>
            <tr>
              <th>ORI</th>
              <th>Type</th>
              <th>No. White Offenders</th>
              <th>No. Black Offenders</th>
              <th>No. Pacific Offenders</th>
              <th>No. Native Offenders</th>
              <th>No. Asian Offenders</th>
              <th>No. White Victims</th>
              <th>No. Black Victims</th>
              <th>No. Pacific Victims</th>
              <th>No. Native Victims</th>
              <th>No. Asian Victims</th>
            </tr>
          </thead>
          <tbody>
            { this.state.elements.map(CrimeRow) }
          </tbody>
        </Table>
        { Pagination }
      </div>
    );
  }
}

function CrimeRow(c: CrimeData) {
  return (
    <tr key={c.id}>
      <td>{c.ori}</td>
      <td><Nav.Link key={c.type} href={"/crimes/" + c.id}>{c.type}</Nav.Link></td>      
      <td>{c.o_white}</td>
      <td>{c.o_black}</td>
      <td>{c.o_pacific}</td>
      <td>{c.o_native}</td>
      <td>{c.o_asian}</td>
      <td>{c.v_white}</td>
      <td>{c.v_black}</td>
      <td>{c.v_pacific}</td>
      <td>{c.v_native}</td>
      <td>{c.v_asian}</td>
    </tr>
  );
}

export default Crimes;