import React, { Component } from 'react'
import './Settings.css'

import {Link} from 'react-router-dom'

class Settings extends Component {

  render() {
    return (
      <div>
        <p>Settings</p>
        <Link to="/">Back Home</Link>
      </div>
    )
  }

}

export default Settings
