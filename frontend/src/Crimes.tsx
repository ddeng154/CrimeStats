import React from 'react';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Table from 'react-bootstrap/Table';
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

const FilterVals = new Map([
  ["type", [
    'aggravated-assault', 'arson', 'burglary', 'homicide', 'larceny', 'motor-vehicle-theft', 'property-crime', 'rape', 'robbery', 'violent-crime'
  ]]
]);

class Crimes extends React.Component {
  state = {
    elements: new Array<CrimeData>(),
    page: 1,
    totalPages: 1,
    sort: "type",
    asc: "asc",
    filter: "",
    val: "",
    isLoading: true
  };

  componentDidMount() {
    this.fetchElements();
  }

  fetchElements = () => {
    this.setState({ isLoading: true });
    const order_by = [{ field: this.state.sort, direction: this.state.asc }];
    const filters = [];
    if (this.state.filter && this.state.val) {
      filters.push({ name: this.state.filter, op: "eq", val: this.state.val });
    }
    const q = JSON.stringify({ order_by, filters });
    const url = `/api/crimes?q=${q}&page=${this.state.page}`;
    axios.get<APIResponse<CrimeData>>(url).then(response => {
      this.setState({
        elements: response.data.objects,
        totalPages: response.data.total_pages,
        isLoading: false
      });
    });
  }

  previousPage = () => {
    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1 }, this.fetchElements);
    } else if (this.state.totalPages > 1) {
      this.setState({ page: this.state.totalPages }, this.fetchElements);
    }
  }

  nextPage = () => {
    if (this.state.page < this.state.totalPages) {
      this.setState({ page: this.state.page + 1 }, this.fetchElements);
    } else if (this.state.totalPages > 1) {
      this.setState({ page: 1 }, this.fetchElements);
    }
  }

  changeSort = (sort: string) => {
    this.setState({ sort }, this.fetchElements);
  }

  changeAsc = (asc: string) => {
    this.setState({ asc }, this.fetchElements);
  }

  changeFilter = (filter: string) => {
    this.setState({ filter, val: "" }, this.fetchElements);
  }

  changeVal = (val: string) => {
    this.setState({ val }, this.fetchElements);
  }

  SortingItem = (attributeName: string, displayName: string) => {
    return (
      <Dropdown.Item active={ this.state.sort === attributeName }
          onClick={ () => this.changeSort(attributeName) }>
        {displayName}
      </Dropdown.Item>
    );
  }

  SortingButton = (asc: string, name: string) => {
    return (
      <Button variant={ this.state.asc === asc ? "primary" : "secondary" }
          onClick={ () => this.changeAsc(asc) }>
        {name}
      </Button>
    );
  }

  FilterItem = (attributeName: string, displayName: string) => {
    return (
      <Dropdown.Item active={ this.state.filter === attributeName }
          onClick={ () => this.changeFilter(attributeName) }>
        {displayName}
      </Dropdown.Item>
    );
  }

  ValueItem = (name: string) => {
    return (
      <Dropdown.Item key={name} active={ this.state.val === name }
          onClick={ () => this.changeVal(name) }>
        {name}
      </Dropdown.Item>
    );
  }

  Pagination = () => {
    return (
      <div>
        <Button onClick={this.previousPage}>Previous</Button>
        { ` ${this.state.page} of ${this.state.totalPages} ` }
        <Button onClick={this.nextPage}>Next</Button>
      </div>
    );
  }

  Sorting = () => {
    return (
      <div>
        <Dropdown>
          <Dropdown.Toggle>Sort</Dropdown.Toggle>
          <Dropdown.Menu>
            { this.SortingItem("type", "Type") }
            { this.SortingItem("o_white", "White Offenders") }
            { this.SortingItem("o_black", "Black Offenders") }
            { this.SortingItem("o_pacific", "Pacific Offenders") }
            { this.SortingItem("o_native", "Native Offenders") }
            { this.SortingItem("o_asian", "Asian Offenders") }
          </Dropdown.Menu>
          { this.SortingButton("asc", "Ascending") }
          { this.SortingButton("desc", "Descending") }
        </Dropdown>
      </div>
    );
  }

  Filters = () => {
    return (
      <div>
        <ButtonGroup>
          <Dropdown>
            <Dropdown.Toggle>Filter</Dropdown.Toggle>
            <Dropdown.Menu>
              { this.FilterItem("", "No Filter") }
              { this.FilterItem("type", "Type") }
            </Dropdown.Menu>
          </Dropdown>
          { this.Values() }
        </ButtonGroup>
      </div>
    );
  }

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

  render() {
    if (this.state.isLoading) {
      return <h1>Loading...</h1>;
    }

    return (
      <div className="text-center">
        <h1>Crimes</h1>
        <this.Sorting />
        <br />
        <this.Filters />
        <br />
        <this.Pagination />
        <br />
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
        <this.Pagination />
      </div>
    );
  }
}

function CrimeRow(c: CrimeData) {
  return (
    <tr key={c.id}>
      <td>
        <Nav.Link key={c.type} href={"/policedepartments/" + c.ori}>
          {c.ori}
        </Nav.Link>
      </td>
      <td>
        <Nav.Link key={c.type} href={"/crimes/" + c.id}>
          {c.type}
        </Nav.Link>
      </td>      
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