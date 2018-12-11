import React, { Component } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'

import Dashboard from './Dashboard/Dashboard'
import Match from './Match/Match'
import Settings from './Settings/Settings'

import './Home.css'

class Home extends Component {
  state = {
    match: null,
    error: ""
  }

  render() {
    let pathProps = {...this.props}
    let matchProps = {
      match: this.state.match,
      setMatch: (match)=>this.setState({match}),
      updateMatch: (match)=>this.setState({match})
    }

    return (
      <div>
        <Router>
          <div className="container">
            <p>{this.state.error}</p>
            <div className="content">
              <Route path="/" exact   render={(props)=><Dashboard {...props} pathProps={pathProps} />} />
              <Route path="/match"    render={(props)=><Match     {...props} matchProps={matchProps} pathProps={pathProps} />} />
              <Route path="/settings" render={(props)=><Settings  {...props} pathProps={pathProps} />} />
            </div>
          </div>
        </Router>
      </div>
    )
  }

}

export default Home
