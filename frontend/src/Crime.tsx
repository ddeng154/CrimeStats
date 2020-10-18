import React from 'react';
import axios from 'axios';
import { IDParams } from './common';
import { Redirect } from 'react-router-dom';

type CrimeData = {
  id: string;
  name: string;
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
          <h1>{this.state.crime.name}</h1>
        </div>
      );
    } else {
      return <Redirect to="/404" />;
    }
  }
}

export default Crime;