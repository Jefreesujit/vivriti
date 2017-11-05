/*global document*/
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Component from '../src';
import Assignment1 from '../src/assignment1';
import Assignment2 from '../src/assignment2';

class App extends React.Component {
  render () {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Component} />
          <Route path="/index1" component={Assignment1} />
          <Route path="/index2" component={Assignment2} />
        </div>
      </Router>
    );
  }
}

(() => {
  ReactDOM.render(React.createElement(App), document.getElementById('container'));
})();
