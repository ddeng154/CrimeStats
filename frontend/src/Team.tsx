import React from 'react';
import axios from 'axios';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';

class Team extends React.Component {
  static names = ["daniel", "aly", "ishan", "safin", "shreyas", "anish"];

  static bios: any = {
    daniel: "I am a junior interested in front end development with some internship experience in backend development.",
    aly: "I am a junior with internship and project experience in web and mobile app development. I am most interested in full stack development.",
    ishan: "I'm a junior interested in full stack development. I have experience with web development, database design, and RESTful APIs.",
    safin: "I’m a third year CS major and an aspiring software engineer, with interests in web design and data science.",
    shreyas: "I am junior interested in back-end software development, with experience in Data Engineering and ML.",
    anish: "I am a junior with internship experience in data science and machine learning, and personal experience with web design."
  };

  static roles: any = {
    daniel: "Front End Developer and Data Gathering",
    aly: "Front End Developer and AWS",
    ishan: "API Design and Data Gathering",
    safin: "Front End Developer and API Design",
    shreyas: "API Design and Data Gathering",
    anish: "Technical Report and Data Gathering"
  };

  state = {
    info: new Map<string, Info>(),
    isLoading: true
  };

  componentDidMount() {
    type PersonStats = { name: string, commits: number, issues: number, tests: number };
    axios.get<PersonStats[]>("/api/gitlabstats").then(response => {
      const info = new Map<string, Info>();
      Team.names.forEach(n => {
        const stats = response.data.find(s => s.name === n);
        const b: string = Team.bios[n];
        const r: string = Team.roles[n];
        const c = stats ? stats.commits : 0;
        const i = stats ? stats.issues : 0;
        const t = stats ? stats.tests : 0;
        info.set(n, new Info(n, b, r, c, i, t));
      });
      this.setState({ info, isLoading: false });
    });
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <CardDeck>
          <Person fullName="Daniel Deng" info={this.state.info.get("daniel")!} />
          <Person fullName="Aly Hirani" info={this.state.info.get("aly")!} />
          <Person fullName="Ishan Phadke" info={this.state.info.get("ishan")!} />
        </CardDeck>
        <CardDeck>
          <Person fullName="Safin Kasturi" info={this.state.info.get("safin")!} />
          <Person fullName="Shreyas Konana" info={this.state.info.get("shreyas")!} />
          <Person fullName="Anish Yellaturu" info={this.state.info.get("anish")!} />
        </CardDeck>
      </div>
    );
  }
}

class Info {
  name: string
  bio: string;
  role: string;
  commits: number;
  issues: number;
  tests: number;

  constructor(n: string, b: string, r: string, c: number, i: number, t: number) {
    this.name = n
    this.bio = b;
    this.role = r;
    this.commits = c;
    this.issues = i;
    this.tests = t;
  }
}

type PersonProps = {
  fullName: string,
  info: Info
}

function Person({ fullName, info }: PersonProps) {
  const image = require('./images/' + info.name + '.jpg');
  return (
    <Card>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{fullName}</Card.Title>
        <Card.Text>
          {info.bio}
          <br />
          <br />
          {info.role}
          <br />
          <br />
          Commits: {info.commits}
          <br />
          <br />
          Issues: {info.issues}
          <br />
          <br />
          Unit Tests: {info.tests}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Team;