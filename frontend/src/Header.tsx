import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function Header() {
    return (
        <div>
        <Navbar bg="light" expand="sm">
          <Navbar.Brand href="/">Crime Stats</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/counties">Counties</Nav.Link>
            <Nav.Link href="/policedepartments">Police Departments</Nav.Link>
            <Nav.Link href="/crimes">Crimes</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
        </Navbar>
      </div>
   
    )
}

export default Header;