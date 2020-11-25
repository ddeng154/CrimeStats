import React from "react";
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import Table from "react-bootstrap/Table";
import { APIResponse } from "./common";
import Loading from "./Loading";
//code for the page for browsing crimes
//information for each crime
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
//possible values for the type of each crime, to filter by
const FilterVals = new Map([
  [
    "type",
    [
      "aggravated-assault",
      "arson",
      "burglary",
      "homicide",
      "larceny",
      "motor-vehicle-theft",
      "property-crime",
      "rape",
      "robbery",
      "violent-crime",
    ],
  ],
]);

const crimeFields = ['ORI', 'Type', 'No. White Offenders', 'No. Black Offenders', 'No. Pacific Offenders', 'No. Native Offenders', 'No. Asian Offenders',
'No. White Victims', 'No. Black Victims', 'No. Pacific Victims', 'No. Native Victims', 'No. Asian Victims']
function headerColsCrime() {
  return crimeFields.map(crimeField => (
  <th key={crimeField}>
    {crimeField}
  </th>
  ));
}
//class for the current state of the crimes pagination
class Crimes extends React.Component {
  state = {
    elements: new Array<CrimeData>(),
    page: 1,
    totalPages: 1,
    sort: "type",
    asc: "asc",
    filter: "",
    val: "",
    isLoading: true,
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
    const url = `/api/crimes?q=${q}&page=${this.state.page}`;
    // if data has been loaded, updates the state accordingly
    axios.get<APIResponse<CrimeData>>(url).then((response) => {
      this.setState({
        elements: response.data.objects,
        totalPages: response.data.total_pages,
        isLoading: false,
      });
    });
  };
  //the previous page from what's currently displayed
  previousPage = () => {
    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1 }, this.fetchElements);
    } else if (this.state.totalPages > 1) {
      this.setState({ page: this.state.totalPages }, this.fetchElements);
    }
  };
  //the next page from what's currently displayed
  nextPage = () => {
    if (this.state.page < this.state.totalPages) {
      this.setState({ page: this.state.page + 1 }, this.fetchElements);
    } else if (this.state.totalPages > 1) {
      this.setState({ page: 1 }, this.fetchElements);
    }
  };
  //changing the sort order
  changeSort = (sort: string) => {
    this.setState({ sort }, this.fetchElements);
  };
  //changing the association
  changeAsc = (asc: string) => {
    this.setState({ asc }, this.fetchElements);
  };
  //changing the filtering
  changeFilter = (filter: string) => {
    this.setState({ filter, val: "" }, this.fetchElements);
  };
  //changing the current value for filtering
  changeVal = (val: string) => {
    this.setState({ val }, this.fetchElements);
  };
  //element to display option to sort by
  SortingItem = (attributeName: string, displayName: string) => {
    return (
      <Dropdown.Item
        active={this.state.sort === attributeName}
        onClick={() => this.changeSort(attributeName)}
      >
        {displayName}
      </Dropdown.Item>
    );
  };
  //button to press to change sorting
  SortingButton = (asc: string, name: string) => {
    return (
      <Button
        variant={this.state.asc === asc ? "primary" : "secondary"}
        onClick={() => this.changeAsc(asc)}
      >
        {name}
      </Button>
    );
  };
  //options displayed to turn on filter
  FilterItem = (attributeName: string, displayName: string) => {
    return (
      <Dropdown.Item
        active={this.state.filter === attributeName}
        onClick={() => this.changeFilter(attributeName)}
      >
        {displayName}
      </Dropdown.Item>
    );
  };
  //options displayed to change filter by
  //in this case, the type of crime
  ValueItem = (name: string) => {
    return (
      <Dropdown.Item
        key={name}
        active={this.state.val === name}
        onClick={() => this.changeVal(name)}
      >
        {name}
      </Dropdown.Item>
    );
  };
  //provides the interface to go to previous/next pages
  Pagination = () => {
    return (
      <div>
        <Button onClick={this.previousPage}>Previous</Button>
        {` ${this.state.page} of ${this.state.totalPages} `}
        <Button onClick={this.nextPage}>Next</Button>
      </div>
    );
  };
  //element to display options to sort by
  Sorting = () => {
    return (
      <div>
        <Dropdown>
          <Dropdown.Toggle>Sort</Dropdown.Toggle>
          <Dropdown.Menu>
            {this.SortingItem("type", "Type")}
            {this.SortingItem("o_white", "White Offenders")}
            {this.SortingItem("o_black", "Black Offenders")}
            {this.SortingItem("o_pacific", "Pacific Offenders")}
            {this.SortingItem("o_native", "Native Offenders")}
            {this.SortingItem("o_asian", "Asian Offenders")}
          </Dropdown.Menu>
          {this.SortingButton("asc", "Ascending")}
          {this.SortingButton("desc", "Descending")}
        </Dropdown>
      </div>
    );
  };
  //element to display options to filter by
  Filters = () => {
    return (
      <div>
        <ButtonGroup>
          <Dropdown>
            <Dropdown.Toggle>Filter</Dropdown.Toggle>
            <Dropdown.Menu>
              {this.FilterItem("", "No Filter")}
              {this.FilterItem("type", "Type")}
            </Dropdown.Menu>
          </Dropdown>
          {this.Values()}
        </ButtonGroup>
      </div>
    );
  };
  //display values to filter by, in this case, the state
  Values = () => {
    const vals = FilterVals.get(this.state.filter);
    if (vals) {
      return (
        <Dropdown>
          <Dropdown.Toggle>Value</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              active={this.state.val === ""}
              onClick={() => this.changeVal("")}
            >
              All Values
            </Dropdown.Item>
            {vals.map(this.ValueItem)}
          </Dropdown.Menu>
        </Dropdown>
      );
    }
  };

  
  //show loading screen if loading
  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    //otherwise, we return the actual page
    return (
      // title, sort/filter options, and page changing
      <div className="text-center">
        <h1>Crimes</h1>
        <div>
          <Button href="/comparecrimes">Compare</Button>
        </div>
        <br />
        <this.Sorting />
        <br />
        <this.Filters />
        <br />
        <this.Pagination />
        <br />
        {/* display the table of the crimes for the current page */}
        <Table striped hover>
          <thead>
            <tr>
              {headerColsCrime()}
            </tr>
          </thead>
          <tbody>{this.state.elements.map(CrimeRow)}</tbody>
        </Table>
        <this.Pagination />
      </div>
    );
  }
}
//row of data about a given crime
function CrimeRow(c: CrimeData) {
  const crimeValFields = [c.o_white, c.o_black, c.o_pacific, c.o_native, 
    c.o_asian, c.v_white, c.v_black, c.v_pacific, c.v_native, c.v_asian]
  function rowsCrime() {
    let index = -1;
    return crimeValFields.map(crimeValField => {
      index += 1;
    return <td key={index}>
      {crimeValField}
    </td>
    });
}
  return (
    //police dept. involved, and link to detailed crime page
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
      {rowsCrime()}
    </tr>
  );
}

export default Crimes;
