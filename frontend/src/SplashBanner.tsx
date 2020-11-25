import React from "react";
import "./SplashBanner.css";
import img from "./images/scrolldown.png";

//Content on the main view port of the splash page
function SplashBanner() {
  return (
    <div className="banner-container">
      <h1>Crime Stats</h1>
      <p>See how police presence relates to crime</p>
      <img src={img} alt="Error" width={44} height={44}></img>
    </div>
  );
}

export default SplashBanner;
