import React from 'react';
import ReactDOM from 'react-dom';
import "react-bootstrap/dist/react-bootstrap.min.js";
import App from './App';

const title = 'My Minimal React Webpack Babel Setup';

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

module.hot.accept();
