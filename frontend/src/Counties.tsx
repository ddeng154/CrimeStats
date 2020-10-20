import React from 'react';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { APIResponse } from './common';

type CountyData = {
  id: string;
  name: string;
  state: string;
  median_income: number;
  total_pop: number;
  black_pop: number;
  white_pop: number;
  pacific_pop: number;
  native_pop: number;
  asian_pop: number;
  area: number;
  longitude: number;
  latitude: number;
};

class Counties extends React.Component {
  state = {
    counties: new Array<CountyData>(),
    elements: new Array<CountyData>(),
    currentPage: 0,
    totalPages: 0,
    perPage: 10,
    isLoading: true
  };

  componentDidMount() {
    axios.get<APIResponse<CountyData>>("/api/counties").then(response => {
      this.setState({
        counties: response.data.objects,
        totalPages: Math.ceil(response.data.objects.length / this.state.perPage),
        isLoading: false
      }, () => { this.setElements(); });
    });
  }

  setElements() {
    const offset = this.state.currentPage * this.state.perPage;
    const elements = this.state.counties.slice(offset, offset + this.state.perPage);
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
        <h1>Counties</h1>
        { Pagination }
        { this.state.elements.map(CountyRow) }
        { Pagination }
      </div>
    );
  }
}

function CountyRow(c: CountyData) {
  return (
    <Nav.Link key={c.id} href={"/counties/" + c.id}>{c.id} {c.name}
      {c.state}
      {c.median_income}
      {c.total_pop}
      {c.black_pop}
      {c.white_pop}
      {c.pacific_pop}
      {c.native_pop}
      {c.asian_pop}
      {c.area}
      {c.longitude}
      {c.latitude}
    </Nav.Link>
  );
}

export default Counties;