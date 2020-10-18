import React from 'react';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import { APIResponse } from './common';

type CrimeData = {
  id: string;
  name: string;
};

class Crimes extends React.Component {
  state = {
    crimes: new Array<CrimeData>(),
    isLoading: true
  };

  componentDidMount() {
    axios.get<APIResponse<CrimeData>>("/api/crimes").then(response => {
      this.setState({ crimes: response.data.objects, isLoading: false });
    });
  }

  render() {
    if (this.state.isLoading) {
      return <h1>Loading...</h1>;
    }

    return (
      <div>
        <h1>Crimes</h1>
        <ul>
          { this.state.crimes.map(CrimeRow) }
        </ul>
      </div>
    );
  }
}

function CrimeRow(c: CrimeData) {
  return (
    <li key={c.id}>
      <Nav.Link href={"/crimes/" + c.id}>{c.name}</Nav.Link>
    </li>
  );
}

export default Crimes;