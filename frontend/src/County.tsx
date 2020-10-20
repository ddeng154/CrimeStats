import React from 'react';
import axios from 'axios';
import { IDParams } from './common';
import { Redirect } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

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
  police_departments: { ori: string; name: string }[];
  crimes: { id: number; type: string; pd_name: string; }[];
};

type CountyState = {
  county?: CountyData;
  isLoading: boolean;
};

class County extends React.Component<IDParams> {
  state: CountyState = {
    isLoading: true
  };

  componentDidMount() {
    axios.get<CountyData>("/api/counties/" + this.props.id).then(response => {
      this.setState({ county: response.data });
    }).catch(_ => {}).finally(() => {
      this.setState({ isLoading: false });
    });
  }

  render() {
    if (this.state.isLoading) {
      return <h1>Loading...</h1>;
    } else if (this.state.county) {
      return (
        <div>
          <h1>{this.state.county.name}</h1>
          <h1>{this.state.county.state}</h1>
          <h1>{this.state.county.median_income}</h1>
          <h1>{this.state.county.total_pop}</h1>
          <h1>{this.state.county.black_pop}</h1>
          <h1>{this.state.county.pacific_pop}</h1>
          <h1>{this.state.county.native_pop}</h1>
          <h1>{this.state.county.asian_pop}</h1>
          <h1>{this.state.county.area}</h1>
          <h1>{this.state.county.longitude}</h1>
          <h1>{this.state.county.latitude}</h1>
          <iframe title="map" width="600" height="450" frameBorder="0" style={{border: 0}}
src={"https://www.google.com/maps/embed/v1/view?zoom=9&center=" + this.state.county.latitude + "," + this.state.county.longitude + "&key=AIzaSyC-QNudTN-ssaDXHh5h3_5dk19wxsatSRg"} allowFullScreen></iframe>
          <h4>Police Departments</h4>
          <ul>
            { this.state.county.police_departments.map(p => <Nav.Link key={p.ori} href={"/policedepartments/" + p.ori}>{p.name}</Nav.Link>) }
          </ul>
          <h4>Crimes</h4>
          <ul>
            { this.state.county.crimes.map(c => <Nav.Link key={c.id} href={"/crimes/" + c.id}>{c.pd_name} {c.type}</Nav.Link>) }
          </ul>
        </div>
      );
    } else {
      return <Redirect to="/404" />;
    }
  }
}

export default County;