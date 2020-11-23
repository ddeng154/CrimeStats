import React from "react";
import Loader from "react-loader-spinner";
import "./Loading.css";

//Component for what we want the website to show while things are loading
function Loading() {
  return (
    <div className="loading">
      <Loader
         type="TailSpin"
         color="#00BFFF"
         height={100}
         width={100}
         timeout={5000} //5 secs
      />
    </div>
  );
}

export default Loading;
