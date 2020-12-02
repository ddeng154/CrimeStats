import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import SearchBar from "./SearchBar";

//Component for the header element of the website
class Header extends React.Component {
  state = {
    query: "",
    screen: "home",
  };
  //when the value in the search bar changes (or when
  // the submit button is pressed), update the query value
  onChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ query: event.currentTarget.value });
    console.log(this.state.query);
  };

  render() {
    return (
      <div>
        <Navbar bg="light" expand="sm">
          <Navbar.Brand href="/">Crime Stats</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/counties">Counties</Nav.Link>
            <Nav.Link href="/policedepartments">Police Departments</Nav.Link>
            <Nav.Link href="/crimes">Crimes</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/visualizations">Visualizations</Nav.Link>
            <Nav.Link href="/providervisualizations">
              Job Stop Visualizations
            </Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <SearchBar query={this.state.query} onChange={this.onChange} />
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default Header;
