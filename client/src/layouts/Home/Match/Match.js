import React, { Component } from 'react'
import './Match.css'

import {Link} from 'react-router-dom'

class Match extends Component {

  render() {
    return (
      <div>
        <p>Match</p>
        <Link to="/">Back Home</Link>
      </div>
    )
  }

}

export default Match
