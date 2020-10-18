import React from 'react';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import { APIResponse } from './common';

type CountyData = {
  id: string;
  name: string;
};

class Counties extends React.Component {
  state = {
    counties: new Array<CountyData>(),
    isLoading: true
  };

  componentDidMount() {
    axios.get<APIResponse<CountyData>>("/api/counties").then(response => {
      this.setState({ counties: response.data.objects, isLoading: false });
    });
  }

  render() {
    if (this.state.isLoading) {
      return <h1>Loading...</h1>;
    }

    return (
      <div>
        <h1>Counties</h1>
        <ul>
          { this.state.counties.map(CountyRow) }
        </ul>
      </div>
    );
  }
}

function CountyRow(c: CountyData) {
  return (
    <li key={c.id}>
      <Nav.Link href={"/counties/" + c.id}>{c.name}</Nav.Link>
    </li>
  );
}

export default Counties;