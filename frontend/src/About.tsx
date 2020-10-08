import React from 'react';
import axios from 'axios';

function About() {
    return (
      <div>
        <h1>About</h1>
        <StatsList />
      </div>
    );
}

class StatsList extends React.Component {
  state = {
    stats: []
  };

  componentDidMount() {
    axios.get('/api/gitlabstats')
      .then(response => {
        const stats = response.data;
        this.setState({ stats });
      });
  }

  render() {
    return (
      this.state.stats.map(s => <div key={s["name"]}>
        <h6>{s["name"]}</h6>
        <p>commits: {s["commits"]}</p>
        <p>issues: {s["issues"]}</p>
      </div>)
    );
  }
}

export default About;