import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Favicon from 'react-favicon';
import './Footer.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <div>
      <Favicon url="https://previews.123rf.com/images/juliarstudio/
      juliarstudio1809/juliarstudio180903178/107437642-human-
      hands-holding-prison-bars-black-icon-simple-black-symbol-on-a-white-background.jpg" />
      <App/>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
