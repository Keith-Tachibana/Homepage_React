import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './navbar';
import Home from './home';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact render={props =>
            <React.Fragment>
              <Navbar />
              <Home />
            </React.Fragment>
          } />
        </Switch>
      </Router>
    );
  }
}

export default App;
