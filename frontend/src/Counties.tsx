import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Nav from 'react-bootstrap/Nav';
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
    elements: new Array<CountyData>(),
    currentPage: 1,
    totalPages: -1,
    isLoading: true
  };

  componentDidMount() {
    this.fetchElements();
  }

  fetchElements = () => {
    this.setState({ isLoading: true });
    axios.get<APIResponse<CountyData>>("/api/counties?results_per_page=9&page=" + this.state.currentPage).then(response => {
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
        <h1>Counties</h1>
        { Pagination }
        <CardDeck>
          { this.countyCard(0) }
          { this.countyCard(1) }
          { this.countyCard(2) }
        </CardDeck>
        <CardDeck>
          { this.countyCard(3) }
          { this.countyCard(4) }
          { this.countyCard(5) }
        </CardDeck>
        <CardDeck>
          { this.countyCard(6) }
          { this.countyCard(7) }
          { this.countyCard(8) }
        </CardDeck>
        { Pagination }
      </div>
    );
  }

  countyCard(index: number) {
    if (index < this.state.elements.length) {
      const c = this.state.elements[index];
      return (
        <Card>
          <Card.Body>
            <iframe title="map" width="300" height="150" frameBorder="0" style={{border: 0}} src={"https://www.google.com/maps/embed/v1/view?zoom=9&center=" + c.latitude + "," + c.longitude + "&key=AIzaSyC-QNudTN-ssaDXHh5h3_5dk19wxsatSRg"} allowFullScreen></iframe>
            <Card.Title><Nav.Link href={"/counties/" + c.id}>{c.name}</Nav.Link></Card.Title>
            <Card.Text>
              State: {c.state}
              <br />
              Median Income (USD): {c.median_income}
              <br />
              Total Population: {c.total_pop}
            </Card.Text>
          </Card.Body>
        </Card>
      );
    } else {
      return <div></div>;
    }
  }
}

export default Counties;