import React from "react";
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useParams,
} from "react-router-dom";
import { IDParams } from "./common";
import Footer from "./Footer";
import Header from "./Header";
import Splash from "./Splash";
import County from "./County";
import PoliceDepartment from "./PoliceDepartment";
import Crime from "./Crime";
import Counties from "./Counties";
import PoliceDepartments from "./PoliceDepartments";
import Crimes from "./Crimes";
import About from "./About";
import NotFound from "./NotFound";
import Search from "./Search";
import "./App.css";
import CompareCrimes from "./CompareCrimes";
import ComparePoliceDepartments from "./ComparePoliceDepartments";
import CompareCounties from "./CompareCounties";
import Visualizations from "./Visualizations";
import JobStopVisualizations from "./JobStopVisualizations";

//overall container for the webpage
function App() {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <BrowserRouter>
          <Header />
          {/* loads page based on the current path */}
          <Switch>
            {/* loads page for a specific county,
             police department, crime, or search entry */}
            <Route path="/counties/:id">
              <ModelPage component={County}></ModelPage>
            </Route>
            <Route path="/policedepartments/:id">
              <ModelPage component={PoliceDepartment}></ModelPage>
            </Route>
            <Route path="/crimes/:id">
              <ModelPage component={Crime}></ModelPage>
            </Route>
            <Route path="/search/:id">
              <ModelPage component={Search}></ModelPage>
            </Route>
            {/* loads the overall/static pages for 
            the county/department/crime models */}
            <Route path="/counties" exact component={Counties} />
            <Route
              path="/policedepartments"
              exact
              component={PoliceDepartments}
            />
            <Route path="/crimes" exact component={Crimes} />
            <Route path="/comparecrimes" exact component={CompareCrimes} />
            <Route
              path="/comparepolicedepartments"
              exact
              component={ComparePoliceDepartments}
            />
            <Route path="/comparecounties" exact component={CompareCounties} />
            <Route path="/about" exact component={About} />
            <Route path="/" exact component={Splash} />
            <Route path="/404" exact component={NotFound} />
            <Route path="/search" exact component={Search} />
            <Route path="/visualizations" exact component={Visualizations} />
            <Route
              path="/providervisualizations"
              exact
              component={JobStopVisualizations}
            />
            {/* if url does not exist, reroute to 404 */}
            <Route path="*">
              <Redirect to="/404" />
            </Route>
          </Switch>
          <Footer />
        </BrowserRouter>
      </div>
    </div>
  );
}
// function to return a specific model page, based on the provided id
function ModelPage(props: { component: React.ComponentType<IDParams> }) {
  const { id } = useParams<IDParams>();
  const Component = props.component;
  return <Component id={id} />;
}

export default App;
