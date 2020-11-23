import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Nav from 'react-bootstrap/Nav';
import Loading from './Loading'
import { APIResponse } from './common';
//code for the page for browsing counties
//information for each county
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
//possible values for the state of each county, to filter by
const FilterVals = new Map([
  ["state", [
    ' Alabama', ' Alaska', ' Arizona', ' Arkansas', ' California', ' Colorado',
    ' Connecticut', ' Delaware', ' Florida', ' Georgia', ' Hawaii', ' Idaho',
    ' Illinois', ' Indiana', ' Iowa', ' Kansas', ' Kentucky', ' Maine',
    ' Maryland', ' Massachusetts', ' Michigan', ' Minnesota', ' Mississippi',
    ' Missouri', ' Montana', ' Nebraska', ' Nevada', ' New Hampshire',
    ' New Jersey', ' New Mexico', ' New York', ' North Carolina',
    ' North Dakota', ' Ohio', ' Oklahoma', ' Oregon', ' Pennsylvania',
    ' Rhode Island', ' South Carolina', ' South Dakota', ' Tennessee',
    ' Texas', ' Utah', ' Vermont', ' Virginia', ' Washington',
    ' West Virginia', ' Wisconsin', ' Wyoming'
  ]]
]);
//class for the current state of the counties pagination
class Counties extends React.Component {
  state = {
    elements: new Array<CountyData>(),
    page: 1,
    totalPages: 1,
    sort: "name",
    asc: "asc",
    filter: "",
    val: "",
    isLoading: true
  };
//mounts the component and tries to load the data
  componentDidMount() {
    this.fetchElements();
  }
//fetches the requested data for this page
  fetchElements = () => {
    this.setState({ isLoading: true });
    const order_by = [{ field: this.state.sort, direction: this.state.asc }];
    const filters = [];
    if (this.state.filter && this.state.val) {
      filters.push({ name: this.state.filter, op: "eq", val: this.state.val });
    }
    const q = JSON.stringify({ order_by, filters });
    const url = `/api/counties?q=${q}&page=${this.state.page}`;
    // if data has been loaded, updates the state accordingly
    axios.get<APIResponse<CountyData>>(url).then(response => {
      this.setState({
        elements: response.data.objects,
        totalPages: response.data.total_pages,
        isLoading: false
      });
    });
  }
  //the previous page from what's currently displayed
  previousPage = () => {
    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1 }, this.fetchElements);
    } else if (this.state.totalPages > 1) {
      this.setState({ page: this.state.totalPages }, this.fetchElements);
    }
  }
  //the next page from what's currently displayed
  nextPage = () => {
    if (this.state.page < this.state.totalPages) {
      this.setState({ page: this.state.page + 1 }, this.fetchElements);
    } else if (this.state.totalPages > 1) {
      this.setState({ page: 1 }, this.fetchElements);
    }
  }
  //changing the sort order
  changeSort = (sort: string) => {
    this.setState({ sort }, this.fetchElements);
  }
  //changing the association
  changeAsc = (asc: string) => {
    this.setState({ asc }, this.fetchElements);
  }
  //changing the filtering
  changeFilter = (filter: string) => {
    this.setState({ filter, val: "" }, this.fetchElements);
  }
  //changing the current value for filtering
  changeVal = (val: string) => {
    this.setState({ val }, this.fetchElements);
  }
  //element to display option to sort by
  SortingItem = (attributeName: string, displayName: string) => {
    return (
      <Dropdown.Item active={ this.state.sort === attributeName }
          onClick={ () => this.changeSort(attributeName) }>
        {displayName}
      </Dropdown.Item>
    );
  }
  //button to press to change sorting
  SortingButton = (asc: string, name: string) => {
    return (
      <Button variant={ this.state.asc === asc ? "primary" : "secondary" }
          onClick={ () => this.changeAsc(asc) }>
        {name}
      </Button>
    );
  }
  //options displayed to turn on filter
  FilterItem = (attributeName: string, displayName: string) => {
    return (
      <Dropdown.Item active={ this.state.filter === attributeName }
          onClick={ () => this.changeFilter(attributeName) }>
        {displayName}
      </Dropdown.Item>
    );
  }
  //options displayed to change filter by
  //in this case, the state
  ValueItem = (name: string) => {
    return (
      <Dropdown.Item key={name} active={ this.state.val === name }
          onClick={ () => this.changeVal(name) }>
        {name}
      </Dropdown.Item>
    );
  }
  //provides the interface to go to previous/next pages
  Pagination = () => {
    return (
      <div>
        <Button onClick={this.previousPage}>Previous</Button>
        { ` ${this.state.page} of ${this.state.totalPages} ` }
        <Button onClick={this.nextPage}>Next</Button>
      </div>
    );
  }
  //element to display options to sort by
  Sorting = () => {
    return (
      <div>
        <Dropdown>
          <Dropdown.Toggle>Sort</Dropdown.Toggle>
          <Dropdown.Menu>
            { this.SortingItem("name", "Name") }
            { this.SortingItem("median_income", "Median Income") }
            { this.SortingItem("total_pop", "Total Population") }
            { this.SortingItem("area", "Area") }
            { this.SortingItem("state", "State") }
          </Dropdown.Menu>
          { this.SortingButton("asc", "Ascending") }
          { this.SortingButton("desc", "Descending") }
        </Dropdown>
      </div>
    );
  }
//element to display options to filter by
  Filters = () => {
    return (
      <div>
        <ButtonGroup>
          <Dropdown>
            <Dropdown.Toggle>Filter</Dropdown.Toggle>
            <Dropdown.Menu>
              { this.FilterItem("", "No Filter") }
              { this.FilterItem("state", "State") }
            </Dropdown.Menu>
          </Dropdown>
          { this.Values() }
        </ButtonGroup>
      </div>
    );
  }
//display values to filter by, in this case, the state
  Values = () => {
    const vals = FilterVals.get(this.state.filter);
    if (vals) {
      return (
        <Dropdown>
          <Dropdown.Toggle>Value</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item active={this.state.val === ""}
                onClick={ () => this.changeVal("") }>
              All Values
            </Dropdown.Item>
            { vals.map(this.ValueItem) }
          </Dropdown.Menu>
        </Dropdown>
      );
    }
  }
  //show loading screen if loading
  render() {
    if (this.state.isLoading) {
      return <Loading/>;
    }
    //otherwise, we return the actual page
    return (
      // title, sort/filter options, and page changing
      <div className="text-center">
        <h1>Counties</h1>
        <div>
          <Button href="/comparecounties">Compare</Button>
        </div>
        <br />
        <this.Sorting />
        <br />
        <this.Filters />
        <br />
        <this.Pagination />
        <br />
      {/* display the 9 counties for the current page */}
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
        <this.Pagination />
      </div>
    );
  }
//card to display information about a county on search page
  countyCard(index: number) {
    if (index < this.state.elements.length) {
      const c = this.state.elements[index];
      return (
        <Card>
          <Card.Body>
            {/* display the google maps location of the county */}
            <iframe title="map" width="300" height="150" frameBorder="0"
                style={{border: 0}} 
                src={"https://www.google.com/maps/embed/v1/view?zoom=9&center="
                + c.latitude + "," + c.longitude +
                "&key=AIzaSyC-QNudTN-ssaDXHh5h3_5dk19wxsatSRg"}
                allowFullScreen></iframe>
            {/* display the name and information of county, as well as link */}
            <Card.Title>
              <Nav.Link href={"/counties/" + c.id}>{c.name}</Nav.Link>
            </Card.Title>
            <Card.Text>
              State: {c.state}
              <br />
              Median Income (USD): {c.median_income}
              <br />
              Total Population: {c.total_pop}
              <br />
              Area: {c.area}
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