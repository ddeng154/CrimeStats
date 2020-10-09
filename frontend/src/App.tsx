import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Counties from './Counties';
import PoliceDepartments from './PoliceDepartments';
import Crimes from './Crimes';
import About from './About';
import Splash from './Splash';
import Footer from './Footer';

function App() {
  return (
    <BrowserRouter>
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

        <Switch>
          <Route path="/counties">
            <Counties />
          </Route>
          <Route path="/policedepartments">
            <PoliceDepartments />
          </Route>
          <Route path="/crimes">
            <Crimes />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Splash />
          </Route>
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
