import React, { Component } from 'react';

import Api from './../../components/Api/'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: ''
    };
  }

  render() {
    return (
      <div className="animated fadeIn">
        Hi. <Api url="/hello"/>
      </div>
    )
  }
}

export default Dashboard;
