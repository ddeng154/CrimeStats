import React from 'react';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { APIResponse } from './common';

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
    crimes: new Array<CrimeData>(),
    elements: new Array<CrimeData>(),
    currentPage: 0,
    totalPages: 0,
    perPage: 10,
    isLoading: true
  };

  componentDidMount() {
    axios.get<APIResponse<CrimeData>>("/api/crimes").then(response => {
      this.setState({
        crimes: response.data.objects,
        totalPages: Math.ceil(response.data.objects.length / this.state.perPage),
        isLoading: false
      }, () => { this.setElements(); });
    });
  }

  setElements() {
    const offset = this.state.currentPage * this.state.perPage;
    const elements = this.state.crimes.slice(offset, offset + this.state.perPage);
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
        <h1>Crimes</h1>
        { Pagination }
        { this.state.elements.map(CrimeRow) }
        { Pagination }
      </div>
    );
  }
}

function CrimeRow(c: CrimeData) {
  return (
    <Nav.Link key={c.id} href={"/crimes/" + c.id}>{c.id}
    {c.ori}
    {c.type}
    {c.o_white}
    {c.o_black}
    {c.o_pacific}
    {c.o_native}
    {c.o_asian}
    {c.v_white}
    {c.v_black}
    {c.v_pacific}
    {c.v_native}
    {c.v_asian}
    </Nav.Link>
  );
}

export default Crimes;