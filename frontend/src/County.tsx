import React from 'react';
import axios from 'axios';
import { IDParams } from './common';
import { Redirect } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { PieChart } from 'react-minimal-pie-chart';
import './Piechart.css';

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
          <h4>{this.state.county.name}</h4>
          <table className = "table">
            <tbody>
              <tr>
                <th scope = "row">State</th>
                <td> {this.state.county.state} </td>
              </tr>
              <tr>
                <th scope = "row">Median Income (USD)</th>
                <td> {this.state.county.median_income} </td>
              </tr>
              <tr>
                <th scope = "row">Total Population</th>
                <td> {this.state.county.total_pop} </td>
              </tr>
              <tr>
                <th scope = "row">Black Population</th>
                <td> {this.state.county.black_pop} </td>
              </tr>
              <tr>
                <th scope = "row">White Population</th>
                <td> {this.state.county.white_pop} </td>
              </tr>
              <tr>
                <th scope = "row">Pacific Population</th>
                <td> {this.state.county.pacific_pop} </td>
              </tr>
              <tr>
                <th scope = "row">Native Population</th>
                <td> {this.state.county.native_pop} </td>
              </tr>
              <tr>
                <th scope = "row">Asian Population</th>
                <td> {this.state.county.asian_pop} </td>
              </tr>
              <tr>
                <th scope = "row">Area (sq. miles)</th>
                <td> {this.state.county.area} </td>
              </tr>
              <tr>
                <th scope = "row">Police Departments</th>
                <td> 
                  <ul>{ this.state.county.police_departments.map(pd => <Nav.Link key={pd.ori} href={"/policedepartments/" + pd.ori}>{pd.name}</Nav.Link>) }</ul> 
                </td>
              </tr>
              <tr>
                <th scope = "row">Crimes</th>
                <td> 
                  <ul>{ this.state.county.crimes.map(c => <Nav.Link key={c.id} href={"/crimes/" + c.id}>{c.type} in {c.pd_name}</Nav.Link>) }</ul> 
                </td>
              </tr>
            </tbody>
          </table>
          <iframe title="map" width="600" height="450" frameBorder="0" style={{border: 0}}
src={"https://www.google.com/maps/embed/v1/view?zoom=9&center=" + this.state.county.latitude + "," + this.state.county.longitude + "&key=AIzaSyC-QNudTN-ssaDXHh5h3_5dk19wxsatSRg"} allowFullScreen></iframe>
          <h4>Racial Breakdown of County Population:</h4>
          <label style={{color:"#E38627", fontSize:"35px"}}>Black Population: {(this.state.county.black_pop / this.state.county.total_pop * 100).toFixed(2)}%</label>
          <br />
          <label style={{color:"#C13C37", fontSize:"35px"}}>White Population: {(this.state.county.white_pop / this.state.county.total_pop * 100).toFixed(2)}%</label>
          <br />
          <label style={{color:"#6A2135", fontSize:"35px"}}>Pacific Population: {(this.state.county.pacific_pop / this.state.county.total_pop * 100).toFixed(2)}%</label>
          <br />
          <label style={{color:"#2757E3", fontSize:"35px"}}>Native Population: {(this.state.county.native_pop / this.state.county.total_pop * 100).toFixed(2)}%</label>
          <br />
          <label style={{color:"#E327B7", fontSize:"35px"}}>Asian Population: {(this.state.county.asian_pop / this.state.county.total_pop * 100).toFixed(2)}%</label>
          
          <div className="chart-container">
        
              <PieChart
                  animate
                  animationDuration={2000}
                  center={[50, 50]}
                  data={[
                      {
                      color: "#E38627",
                      title: "Black Pop.",
                      value: this.state.county.black_pop,
                      },
                      {
                      color: "#C13C37",
                      title: "White Pop.",
                      value: this.state.county.white_pop,
                      },
                      {
                      color: "#6A2135",
                      title: "Pacific Pop.",
                      value: this.state.county.pacific_pop,
                      },
                      {
                        color: "#2757E3",
                        title: "Native Pop.",
                        value: this.state.county.native_pop,
                      },
                      {
                        color: "#E327B7",
                        title: "Asian Pop.",
                        value: this.state.county.asian_pop,
                      },
                  ]}
              />
          </div>
        </div>
        
      );
    } else {
      return <Redirect to="/404" />;
    }
  }
}

export default County;