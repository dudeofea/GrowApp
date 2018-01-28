import React, { Component } from 'react';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: ''
    };
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/hello')
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
