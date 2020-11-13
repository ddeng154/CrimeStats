import React from 'react';
import Team from './Team'
//About page
function About() {
    return (
      <div className="text-center">
        <h1>About</h1>
        {/* explanation of the purpose of the site */}
        <div>
          <h2>General Information</h2>
          <p>This site is an educational tool to inform people about the facts 
            of the relationship between 
            police presence and crime.</p>
          <p>Too often in the media do we see incendiary information 
            from both sides of the political spectrum.</p>
          <p>This leads to a further division of our society, 
            which our site hopes to change.</p>
        </div>
    {/* calls the element to display the information about the developers */}
        <div>
          <h2>Meet Our Team</h2>
          <Team />
        </div>
    {/* links to the databases and data sources the site uses and displays */}
        <div>
          <h2>Data Sources</h2>
          <h6><a href="https://crime-data-explorer.fr.cloud.gov/api">
            FBI Crime Data</a></h6>
          <h6><a href="https://www.census.gov/data/developers
          /data-sets/acs-1year.html">United States Census Data</a></h6>
          <h6><a href="https://developers.google.com/maps/
          premium/previous-licenses/image">Google Maps API</a></h6>
        </div>
        {/* explanation of the tools we used to create the site */}
        <div>
          <h2>Tools</h2>
          <h5>Flask</h5>
          <p>We used Flask as well as several extensions 
            for it to build our backend.</p>
          <h5>Axios</h5>
          <p>We used axios to make HTTP requests from our
             frontend to our backend.</p>
          <h5>Postman</h5>
          <p>We used Postman to design our RESTful API.</p>
          <p>It ensured our schema had no errors and generated
             documentation for us.</p>
          <h5>React-Favicon</h5>
          <p>We used this too to add a favicon for our website.</p>
          <h5>React-Bootstrap</h5>
          <p>Bootstrap was used to make a starting template 
            for our pages.</p>
          <p>Eventually, as we add more functionality and features, 
          we will expand on Bootstrap's usage in designing our front end.</p>
          <h5>React-Router</h5>
          <p>We used this tool in order to add new pages 
            and links between each page.</p>
        </div>
        {/* links to the source code of the website and the API. */}
        <div>
          <h2>Links</h2>
          <h6><a href="https://gitlab.com/alyhirani/crimestats">
            GitLab Repo</a></h6>
          <h6><a href="https://documenter.getpostman.com/
          view/12923323/TVYJ4vyk">Postman API Documentation</a></h6>
        </div>
      </div>
    );
}

export default About;