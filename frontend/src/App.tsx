import React from 'react';
import Footer from './Footer';
import Header from './Header';
import './App.css';
import Splash from './Splash';
import Switch from 'react-bootstrap/esm/Switch';
import { BrowserRouter, Route } from 'react-router-dom';
import Counties from './Counties';
import PoliceDepartments from './PoliceDepartments';
import Crimes from './Crimes';
import About from './About';

function App() {
  return (
    <div className = "page-container">
      <div className = "content-wrap">
      <BrowserRouter>
        <Header />
        <Switch>
            <Route path="/counties" component = {Counties} />
            <Route path="/policedepartments"component = {PoliceDepartments} />
            <Route path="/crimes" component = {Crimes} />
            <Route path="/about"component = {About} />
            <Route path="/" exact component = {Splash} />
        </Switch>
        <Footer />
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
