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
        <p>Soil moisture:&nbsp; <Api url="/sensor/soil_moisture"/>&nbsp; &#37;</p>
        <p>Air humidity:&nbsp; <Api url="/sensor/air_humidity"/>&nbsp; &#37;</p>
        <p>Ambient temperature:&nbsp; <Api url="/sensor/temperature"/>&nbsp; &deg;C</p>
      </div>
    )
  }
}

export default Dashboard;
