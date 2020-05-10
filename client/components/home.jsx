import React, { Component } from 'react';

import Headlines from './headlines';
import Sports from './sports';

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <main className="container-fluid">
          <div className="row">
            <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <Headlines />
            </div>
            <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <Sports />
            </div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default Home;
