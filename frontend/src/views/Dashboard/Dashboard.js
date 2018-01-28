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
        <p>Soil moisture:&nbsp; <Api url="/sensor/soil_moisture"/></p>
        <p>Air humidity:&nbsp; <Api url="/sensor/air_humidity"/></p>
        <p>Ambient temperature:&nbsp; <Api url="/sensor/temperature"/></p>
      </div>
    )
  }
}

export default Dashboard;
