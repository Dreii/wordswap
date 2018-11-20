import React, { Component } from 'react'
import './Dashboard.css'

import {Link} from 'react-router-dom'

class Dashboard extends Component {

  render() {
    return (
      <div>
        <p>Dashboard</p>
        <Link to="/match">Play</Link>
        <br/>
        <Link to="/settings">Settings</Link>
      </div>
    )
  }

}

export default Dashboard
