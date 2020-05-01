import React, { Component } from 'react';

import Headlines from './headlines';
import Sports from './sports';

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <main className="container-fluid">
          <div className="grid-container">
            <Headlines />
            <Sports />            
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default Home;
