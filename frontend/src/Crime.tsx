import React from 'react';
import axios from 'axios';
import { IDParams } from './common';
import { Redirect } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

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
  pd_name: string;
  counties: { id: string; name: string; }[];
};

type CrimeState = {
  crime?: CrimeData;
  isLoading: boolean;
};

class Crime extends React.Component<IDParams> {
  state: CrimeState = {
    isLoading: true
  };

  componentDidMount() {
    axios.get<CrimeData>("/api/crimes/" + this.props.id).then(response => {
      this.setState({ crime: response.data });
    }).catch(_ => {}).finally(() => {
      this.setState({ isLoading: false });
    });
  }

  render() {
    if (this.state.isLoading) {
      return <h1>Loading...</h1>;
    } else if (this.state.crime) {
      return (
        <div>
          <h1>{this.state.crime.type}</h1>
          <h1><a href={"/policedepartments/" + this.state.crime.ori}>{this.state.crime.pd_name}</a></h1>
          <h1>{this.state.crime.o_white}</h1>
          <h1>{this.state.crime.o_black}</h1>
          <h1>{this.state.crime.o_pacific}</h1>
          <h1>{this.state.crime.o_native}</h1>
          <h1>{this.state.crime.o_asian}</h1>
          <h1>{this.state.crime.v_white}</h1>
          <h1>{this.state.crime.v_black}</h1>
          <h1>{this.state.crime.v_pacific}</h1>
          <h1>{this.state.crime.v_native}</h1>
          <h1>{this.state.crime.v_asian}</h1>
          <h1>Counties</h1>
          { this.state.crime.counties.map(c => <Nav.Link key={c.id} href={"/counties/" + c.id}>{c.name}</Nav.Link>) }
        </div>
      );
    } else {
      return <Redirect to="/404" />;
    }
  }
}

export default Crime;