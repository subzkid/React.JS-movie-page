import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; //import our component

//can load other CSS files (e.g,. Bootstrap) here

//load our CSS file
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

//render the Application view
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
