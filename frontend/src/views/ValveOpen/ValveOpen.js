import React, { Component } from 'react';

import Api from './../../components/Api/'

class ValveOpen extends Component {

  render() {
    return (
      <div className="animated fadeIn">
        "Valve opened." <Api url="/valve/open"/>
      </div>
    )
  }
}

export default ValveOpen;
