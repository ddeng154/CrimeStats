import React from "react";
import axios from "axios";
import { IDParams } from "./common";
import { Redirect } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { PieChart } from "react-minimal-pie-chart";
import { Col, Container } from "react-bootstrap";
import "./Piechart.css";
import Loading from "./Loading";
//code for the page for showing detailed information about one
//county in particular
//information for each county
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
  crimes: { id: number; type: string; pd_name: string }[];
};
//state of whether the page has loaded, and the information about the county
type CountyState = {
  county?: CountyData;
  isLoading: boolean;
};
//class for the county page and what to display

class County extends React.Component<IDParams> {
  state: CountyState = {
    isLoading: true,
  };

  //methods to check if this county has a non-zero population of a specific
  //demographic group
  hasBlacks() {
    if (this.state.county) return this.state.county?.black_pop > 0;
    return false;
  }

  hasWhites() {
    if (this.state.county) return this.state.county?.white_pop > 0;
    return false;
  }

  hasPacifics() {
    if (this.state.county) return this.state.county?.pacific_pop > 0;
    return false;
  }

  hasNatives() {
    if (this.state.county) return this.state.county?.native_pop > 0;
    return false;
  }

  hasAsians() {
    if (this.state.county) return this.state.county?.asian_pop > 0;
    return false;
  }
  //does it have crimes/PDs associated?
  hasCrimes() {
    return this.state.county?.crimes.length !== 0;
  }

  hasPDs() {
    return this.state.county?.police_departments.length !== 0;
  }
  //try to check if page has loaded or not
  componentDidMount() {
    axios
      .get<CountyData>("/api/counties/" + this.props.id)
      .then((response) => {
        this.setState({ county: response.data });
      })
      .catch((_) => {})
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }
  //display page
  render() {
    if (this.state.isLoading) {
      return <Loading />;
    }
    //if page has loaded, display table of info
    //about county, such as demographics
    else if (this.state.county) {
      return (
        <div>
          <h4>{this.state.county.name}</h4>
          <table className="table">
            <tbody>
              <tr>
                <th scope="row">State</th>
                <td> {this.state.county.state} </td>
              </tr>
              <tr>
                <th scope="row">Median Income (USD)</th>
                <td> {this.state.county.median_income} </td>
              </tr>
              <tr>
                <th scope="row">Total Population</th>
                <td> {this.state.county.total_pop} </td>
              </tr>
              {this.hasBlacks() && (
                <tr>
                  <th scope="row">Black Population</th>
                  <td> {this.state.county.black_pop} </td>
                </tr>
              )}
              {this.hasWhites() && (
                <tr>
                  <th scope="row">White Population</th>
                  <td> {this.state.county.white_pop} </td>
                </tr>
              )}
              {this.hasPacifics() && (
                <tr>
                  <th scope="row">Pacific Population</th>
                  <td> {this.state.county.pacific_pop} </td>
                </tr>
              )}
              {this.hasNatives() && (
                <tr>
                  <th scope="row">Native Population</th>
                  <td> {this.state.county.native_pop} </td>
                </tr>
              )}
              {this.hasAsians() && (
                <tr>
                  <th scope="row">Asian Population</th>
                  <td> {this.state.county.asian_pop} </td>
                </tr>
              )}
              <tr>
                <th scope="row">Area (sq. miles)</th>
                <td> {this.state.county.area} </td>
              </tr>
              {/* if county has PDs, show them */}
              {this.hasPDs() && (
                <tr>
                  <th scope="row">Police Departments</th>
                  <td>
                    <ul>
                      {this.state.county.police_departments.map((pd) => (
                        <Nav.Link
                          key={pd.ori}
                          href={"/policedepartments/" + pd.ori}
                        >
                          {pd.name}
                        </Nav.Link>
                      ))}
                    </ul>
                  </td>
                </tr>
              )}
              {/* if county has crimes, show them */}
              {this.hasCrimes() && (
                <tr>
                  <th scope="row">Associated Crimes</th>
                  <td>
                    <ul>
                      {this.state.county.crimes.map((c) => (
                        <Nav.Link key={c.id} href={"/crimes/" + c.id}>
                          {c.type} in {c.pd_name}
                        </Nav.Link>
                      ))}
                    </ul>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {/* container to show graphics */}
          <Container fluid>
            <div className="d-flex justify-content-between">
              <Col>
                {/* display the google maps location of the county */}
                <iframe
                  title="map"
                  width="600"
                  height="450"
                  frameBorder="0"
                  style={{ border: 0 }}
                  src={
                    "https://www.google.com/maps/embed/v1/view?zoom=9&center=" +
                    this.state.county.latitude +
                    "," +
                    this.state.county.longitude +
                    "&key=AIzaSyC-QNudTN-ssaDXHh5h3_5dk19wxsatSRg"
                  }
                  allowFullScreen
                ></iframe>
              </Col>
              <Col>
                {/* display pie chart of demographics of county pop. */}
                <h4>Racial Breakdown of County Population:</h4>
                {this.hasBlacks() && (
                  <label style={{ color: "#E38627", fontSize: "28px" }}>
                    Black Population:
                    {(
                      (this.state.county.black_pop /
                        this.state.county.total_pop) *
                      100
                    ).toFixed(2)}
                    %
                  </label>
                )}
                <br />
                {this.hasWhites() && (
                  <label style={{ color: "#C13C37", fontSize: "28px" }}>
                    White Population:
                    {(
                      (this.state.county.white_pop /
                        this.state.county.total_pop) *
                      100
                    ).toFixed(2)}
                    %
                  </label>
                )}
                <br />
                {this.hasPacifics() && (
                  <label style={{ color: "#6A2135", fontSize: "28px" }}>
                    Pacific Population:
                    {(
                      (this.state.county.pacific_pop /
                        this.state.county.total_pop) *
                      100
                    ).toFixed(2)}
                    %
                  </label>
                )}
                <br />
                {this.hasNatives() && (
                  <label style={{ color: "#2757E3", fontSize: "28px" }}>
                    Native Population:
                    {(
                      (this.state.county.native_pop /
                        this.state.county.total_pop) *
                      100
                    ).toFixed(2)}
                    %
                  </label>
                )}
                <br />
                {this.hasAsians() && (
                  <label style={{ color: "#E327B7", fontSize: "28px" }}>
                    Asian Population:
                    {(
                      (this.state.county.asian_pop /
                        this.state.county.total_pop) *
                      100
                    ).toFixed(2)}
                    %
                  </label>
                )}
              </Col>
              <Col>
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
              </Col>
            </div>
          </Container>
        </div>
      );
      //if county does not exist, redirect to 404
    } else {
      return <Redirect to="/404" />;
    }
  }
}

export default County;
