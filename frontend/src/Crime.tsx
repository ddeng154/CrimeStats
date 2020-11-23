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
//crime in particular
//associated information for each crime
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
  counties: { id: string; name: string }[];
};
//state of whether the page has loaded, and the information about the crime
type CrimeState = {
  crime?: CrimeData;
  isLoading: boolean;
};
//class for the crime page and what to display
class Crime extends React.Component<IDParams> {
  state: CrimeState = {
    isLoading: true,
  };
  //does it have counties associated?
  hasCounties() {
    return this.state.crime?.counties.length !== 0;
  }
  //what were the total number of offenders involved?
  getTotalOffenders() {
    if (this.state.crime) {
      return (
        this.state.crime?.o_asian +
        this.state.crime?.o_black +
        this.state.crime?.o_white +
        this.state.crime?.o_native +
        this.state.crime?.o_pacific
      );
    } else {
      return 0;
    }
  }
  //what were the total number of victims involved?
  getTotalVictims() {
    if (this.state.crime) {
      return (
        this.state.crime?.v_asian +
        this.state.crime?.v_black +
        this.state.crime?.v_white +
        this.state.crime?.v_native +
        this.state.crime?.v_pacific
      );
    } else {
      return 0;
    }
  }
  //try to check if page has loaded or not
  componentDidMount() {
    axios
      .get<CrimeData>("/api/crimes/" + this.props.id)
      .then((response) => {
        this.setState({ crime: response.data });
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
    //about crime, such as police department involved
    else if (this.state.crime) {
      return (
        <div>
          <h4> {this.state.crime.type} </h4>
          <table className="table">
            <tbody>
              <tr>
                <th scope="row">Police Dept.</th>
                <td>
                  {" "}
                  <a href={"/policedepartments/" + this.state.crime.ori}>
                    {this.state.crime.pd_name}
                  </a>{" "}
                </td>
              </tr>
              <tr>
                <th scope="row">No. of White Offenders</th>
                <td> {this.state.crime.o_white} </td>
              </tr>
              <tr>
                <th scope="row">No. of Black Offenders</th>
                <td> {this.state.crime.o_black} </td>
              </tr>
              <tr>
                <th scope="row">No. of Pacific Offenders</th>
                <td> {this.state.crime.o_pacific} </td>
              </tr>
              <tr>
                <th scope="row">No. of Native Offenders</th>
                <td> {this.state.crime.o_native} </td>
              </tr>
              <tr>
                <th scope="row">No. of Asian Offenders</th>
                <td> {this.state.crime.o_asian} </td>
              </tr>
              <tr>
                <th scope="row">No. of White Victims</th>
                <td> {this.state.crime.v_white} </td>
              </tr>
              <tr>
                <th scope="row">No. of Black Victims</th>
                <td> {this.state.crime.v_black} </td>
              </tr>
              <tr>
                <th scope="row">No. of Pacific Victims</th>
                <td> {this.state.crime.v_pacific} </td>
              </tr>
              <tr>
                <th scope="row">No. of Native Victims</th>
                <td> {this.state.crime.v_native} </td>
              </tr>
              <tr>
                <th scope="row">No. of Asian Victims</th>
                <td> {this.state.crime.v_asian} </td>
              </tr>
              {/* if crime has counties involved, show them */}
              {this.hasCounties() && (
                <tr>
                  <th scope="row">Counties</th>
                  <td>
                    {" "}
                    {this.state.crime.counties.map((c) => (
                      <Nav.Link key={c.id} href={"/counties/" + c.id}>
                        {c.name}
                      </Nav.Link>
                    ))}{" "}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {/* container to show graphics */}
          <Container fluid>
            <div className="d-flex justify-content-between">
              <Col>
                {/* display pie chart of demographics of offenders */}
                <h4>Racial Breakdown of Offenders:</h4>
                <label style={{ color: "#E38627", fontSize: "28px" }}>
                  Black:
                  {(
                    (this.state.crime.o_black / this.getTotalOffenders()) *
                    100
                  ).toFixed(2)}
                  %
                </label>
                <br />
                <label style={{ color: "#C13C37", fontSize: "28px" }}>
                  White:
                  {(
                    (this.state.crime.o_white / this.getTotalOffenders()) *
                    100
                  ).toFixed(2)}
                  %
                </label>
                <br />
                <label style={{ color: "#6A2135", fontSize: "28px" }}>
                  Pacific:
                  {(
                    (this.state.crime.o_pacific / this.getTotalOffenders()) *
                    100
                  ).toFixed(2)}
                  %
                </label>
                <br />
                <label style={{ color: "#2757E3", fontSize: "28px" }}>
                  Native:
                  {(
                    (this.state.crime.o_native / this.getTotalOffenders()) *
                    100
                  ).toFixed(2)}
                  %
                </label>
                <br />
                <label style={{ color: "#E327B7", fontSize: "28px" }}>
                  Asian:
                  {(
                    (this.state.crime.o_asian / this.getTotalOffenders()) *
                    100
                  ).toFixed(2)}
                  %
                </label>
              </Col>
              <Col>
                <PieChart
                  animate
                  animationDuration={2000}
                  center={[50, 50]}
                  data={[
                    {
                      color: "#E38627",
                      title: "White",
                      value: this.state.crime.o_black,
                    },
                    {
                      color: "#C13C37",
                      title: "White Pop.",
                      value: this.state.crime.o_white,
                    },
                    {
                      color: "#6A2135",
                      title: "Pacific Pop.",
                      value: this.state.crime.o_pacific,
                    },
                    {
                      color: "#2757E3",
                      title: "Native Pop.",
                      value: this.state.crime.o_native,
                    },
                    {
                      color: "#E327B7",
                      title: "Asian Pop.",
                      value: this.state.crime.o_asian,
                    },
                  ]}
                />
              </Col>
              <Col>
                {/* display pie chart of demographics of victims */}
                <h4>Racial Breakdown of Victims:</h4>
                <label style={{ color: "#E38627", fontSize: "28px" }}>
                  Black:
                  {(
                    (this.state.crime.v_black / this.getTotalVictims()) *
                    100
                  ).toFixed(2)}
                  %
                </label>
                <br />
                <label style={{ color: "#C13C37", fontSize: "28px" }}>
                  White:
                  {(
                    (this.state.crime.v_white / this.getTotalVictims()) *
                    100
                  ).toFixed(2)}
                  %
                </label>
                <br />
                <label style={{ color: "#6A2135", fontSize: "28px" }}>
                  Pacific:
                  {(
                    (this.state.crime.v_pacific / this.getTotalVictims()) *
                    100
                  ).toFixed(2)}
                  %
                </label>
                <br />
                <label style={{ color: "#2757E3", fontSize: "28px" }}>
                  Native:
                  {(
                    (this.state.crime.v_native / this.getTotalVictims()) *
                    100
                  ).toFixed(2)}
                  %
                </label>
                <br />
                <label style={{ color: "#E327B7", fontSize: "28px" }}>
                  Asian:
                  {(
                    (this.state.crime.v_asian / this.getTotalVictims()) *
                    100
                  ).toFixed(2)}
                  %
                </label>
              </Col>
            </div>
          </Container>

          <div className="chart-container">
            <PieChart
              animate
              animationDuration={2000}
              center={[50, 50]}
              data={[
                {
                  color: "#E38627",
                  title: "Black Pop.",
                  value: this.state.crime.v_black,
                },
                {
                  color: "#C13C37",
                  title: "White Pop.",
                  value: this.state.crime.v_white,
                },
                {
                  color: "#6A2135",
                  title: "Pacific Pop.",
                  value: this.state.crime.v_pacific,
                },
                {
                  color: "#2757E3",
                  title: "Native Pop.",
                  value: this.state.crime.v_native,
                },
                {
                  color: "#E327B7",
                  title: "Asian Pop.",
                  value: this.state.crime.v_asian,
                },
              ]}
            />
          </div>
        </div>
      );
    }
    //if crime does not exist, redirect to 404
    else {
      return <Redirect to="/404" />;
    }
  }
}

export default Crime;
