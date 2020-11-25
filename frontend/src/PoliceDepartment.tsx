import React from "react";
import axios from "axios";
import { IDParams } from "./common";
import { Redirect } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { PieChart } from "react-minimal-pie-chart";
import "./Piechart.css";
import Loading from "./Loading";
import { BarChart, CartesianGrid, Bar, YAxis, XAxis, Tooltip } from "recharts";
import { Col, Container } from "react-bootstrap";

//Component for each police dept model page
type PoliceDepartmentData = {
  ori: string;
  name: string;
  pop: number;
  num_male_officers: number;
  num_female_officers: number;
  num_civilians: number;
  dept_type: string;
  div_name: string;
  reg_name: string;
  density_per_1000: number;
  counties: { id: string; name: string }[];
  crimes: { id: string; type: string; total: number }[];
};

type PoliceDepartmentState = {
  policeDepartment?: PoliceDepartmentData;
  isLoading: boolean;
};

class PoliceDepartment extends React.Component<IDParams> {
  state: PoliceDepartmentState = {
    isLoading: true,
  };

  //checks if this PD has male officers
  hasMales() {
    return this.state.policeDepartment?.num_male_officers !== 0;
  }

  //checks if this PD has female officers
  hasFemales() {
    return this.state.policeDepartment?.num_female_officers !== 0;
  }

  //checks if this PD has civilians
  hasCivilians() {
    return this.state.policeDepartment?.num_civilians !== 0;
  }
  //checks if this PD has associated counties
  hasCounties() {
    return this.state.policeDepartment?.counties.length !== 0;
  }

  //checks if this PD has associated crimes
  hasCrimes() {
    return this.state.policeDepartment?.crimes.length !== 0;
  }

  //returns the total number of PD employees
  getPoliceSize() {
    if (this.state.policeDepartment) {
      return (
        this.state.policeDepartment.num_male_officers +
        this.state.policeDepartment.num_female_officers +
        this.state.policeDepartment.num_civilians
      );
    } else {
      return 0;
    }
  }

  //generates a list of objects to be used as data in the bar graph
  getCrimes() {
    var ans: { name: string; value: number }[] = [];

    if (this.state.policeDepartment) {
      this.state.policeDepartment.crimes.forEach((c) => {
        if (c.total > 0) ans.push({ name: c.type, value: c.total });
      });
    }

    return ans;
  }

  componentDidMount() {
    axios
      .get<PoliceDepartmentData>("/api/police_departments/" + this.props.id)
      .then((response) => {
        this.setState({ policeDepartment: response.data });
      })
      .catch((_) => {})
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    if (this.state.isLoading) {
      return <Loading />;
    } else if (this.state.policeDepartment) {
      return (
        <div>
          <h1>{this.state.policeDepartment.name}</h1>
          {/* table with basic model data */}
          <table className="table">
            <tbody>
              <tr>
                <th scope="row">Population</th>
                <td> {this.state.policeDepartment.pop} </td>
              </tr>
              <tr>
                <th scope="row">Male officers</th>
                <td> {this.state.policeDepartment.num_male_officers} </td>
              </tr>
              <tr>
                <th scope="row">Female officers</th>
                <td> {this.state.policeDepartment.num_female_officers} </td>
              </tr>
              <tr>
                <th scope="row">Civilians</th>
                <td> {this.state.policeDepartment.num_civilians} </td>
              </tr>
              <tr>
                <th scope="row">Dept. type</th>
                <td> {this.state.policeDepartment.dept_type} </td>
              </tr>
              <tr>
                <th scope="row">Division name</th>
                <td> {this.state.policeDepartment.div_name} </td>
              </tr>
              <tr>
                <th scope="row">Region name</th>
                <td> {this.state.policeDepartment.reg_name} </td>
              </tr>
              <tr>
                <th scope="row">Density (per 1000)</th>
                <td> {this.state.policeDepartment.density_per_1000} </td>
              </tr>
              {
                // only show associated counties if they exist
                this.hasCounties() && (
                  <tr>
                    <th scope="row">Counties</th>
                    <td>
                      <ul>
                        {this.state.policeDepartment.counties.map((c) => (
                          <Nav.Link key={c.id} href={"/counties/" + c.id}>
                            {c.name}
                          </Nav.Link>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )
              }
              {
                // only show associated crimes if they exist
                this.hasCrimes() && (
                  <tr>
                    <th scope="row">Crimes</th>
                    <td>
                      <ul>
                        {this.state.policeDepartment.crimes.map((c) => (
                          <Nav.Link key={c.id} href={"/crimes/" + c.id}>
                            {c.type}
                          </Nav.Link>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>

          {/* graphics for breakdown of PD as well as associated crimes */}
          <Container fluid>
            <div className="d-flex justify-content-between">
              <Col>
                <h4>Breakdown of Police Force:</h4>
                {this.hasMales() && (
                  <label style={{ color: "#E38627", fontSize: "28px" }}>
                    Male Officers:
                    {(
                      (this.state.policeDepartment.num_male_officers /
                        this.getPoliceSize()) *
                      100
                    ).toFixed(2)}
                    %
                  </label>
                )}
                <br />
                {this.hasFemales() && (
                  <label style={{ color: "#C13C37", fontSize: "28px" }}>
                    Female Officers:
                    {(
                      (this.state.policeDepartment.num_female_officers /
                        this.getPoliceSize()) *
                      100
                    ).toFixed(2)}
                    %
                  </label>
                )}
                <br />
                {this.hasCivilians() && (
                  <label style={{ color: "#6A2135", fontSize: "28px" }}>
                    Civilians:
                    {(
                      (this.state.policeDepartment.num_civilians /
                        this.getPoliceSize()) *
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
                      title: "White",
                      value: this.state.policeDepartment.num_male_officers,
                    },
                    {
                      color: "#C13C37",
                      title: "White Pop.",
                      value: this.state.policeDepartment.num_female_officers,
                    },
                    {
                      color: "#6A2135",
                      title: "Pacific Pop.",
                      value: this.state.policeDepartment.num_civilians,
                    },
                  ]}
                />
              </Col>
              {this.hasCrimes() && (
                <Col>
                  <h4>Breakdown of Associated Crimes:</h4>
                  <BarChart
                    height={300}
                    width={800}
                    margin={{ top: 100, right: 5, bottom: 5, left: 5 }}
                    data={this.getCrimes()}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </Col>
              )}
            </div>
          </Container>
        </div>
      );
    } else {
      return <Redirect to="/404" />;
    }
  }
}

export default PoliceDepartment;
