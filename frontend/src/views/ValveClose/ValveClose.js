import React, { Component } from 'react';

import Api from './../../components/Api/'

class ValveClose extends Component {

  render() {
    return (
      <div className="animated fadeIn">
        "Valve closed." <Api url="/valve/close"/>
      </div>
    )
  }
}

export default ValveClose;
