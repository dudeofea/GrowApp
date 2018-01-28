import React, { Component } from 'react';
import env from '../../../../env_config.json';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: ''
    };
  }

  componentDidMount() {
    fetch(env.backendHostname + '/api/hello')
      .then(res => this.state.response = res.json().express)
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="animated fadeIn">
        {this.state.response}
      </div>
    )
  }
}

export default Dashboard;
