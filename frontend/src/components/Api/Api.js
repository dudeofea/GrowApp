import React, { Component } from 'react';

import env from './../../../../env_config.json';

class Api extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: props.url,
      response: ''
    };
  };

  render() {
    return (
        {this.state.response}
    )
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res }))
      .catch(err => console.log(err));
  };

  async callApi() {
    const response = await fetch(env.backendHostname + '/api' + this.state.url);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
    };
}
export default Api;
