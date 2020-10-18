import React from 'react';
import { BrowserRouter, Redirect, Route, Switch, useParams } from 'react-router-dom';
import { IDParams } from './common';
import Footer from './Footer';
import Header from './Header';
import Splash from './Splash';
import County from './County';
import PoliceDepartment from './PoliceDepartment';
import Crime from './Crime';
import Counties from './Counties';
import PoliceDepartments from './PoliceDepartments';
import Crimes from './Crimes';
import About from './About';
import NotFound from './NotFound';
import './App.css';

function App() {
  return (
    <div className = "page-container">
      <div className = "content-wrap">
      <BrowserRouter>
        <Header />
        <Switch>
            <Route path="/counties/:id">
              <ModelPage component={County}></ModelPage>
            </Route>
            <Route path="/policedepartments/:id">
              <ModelPage component={PoliceDepartment}></ModelPage>
            </Route>
            <Route path="/crimes/:id">
              <ModelPage component={Crime}></ModelPage>
            </Route>
            <Route path="/counties" exact component = {Counties} />
            <Route path="/policedepartments" exact component = {PoliceDepartments} />
            <Route path="/crimes" exact component = {Crimes} />
            <Route path="/about" exact component = {About} />
            <Route path="/" exact component = {Splash} />
            <Route path="/404" exact component={NotFound} />
            <Route path="*"><Redirect to="/404"/></Route>
        </Switch>
        <Footer />
      </BrowserRouter>
      </div>
    </div>
  );
}

function ModelPage(props: { component: React.ComponentType<IDParams> }) {
  const { id } = useParams<IDParams>();
  const Component = props.component;
  return (
    <Component id={id} />
  );
}

export default App;
