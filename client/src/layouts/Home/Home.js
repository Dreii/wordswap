import React, { Component } from 'react'
import {Route} from 'react-router-dom'

import Dashboard from './Dashboard/Dashboard'
import Match from './Match/Match'
import Settings from './Settings/Settings'

import './Home.css'

class Home extends Component {
  state = {
    match: null,
    matchDisplay: null,
    error: ""
  }

  componentDidMount(){
    window.addEventListener('unhandledrejection', (event)=>{
      console.log(event.reason, event.promise) // [object Promise] - the promise that generated the error
      this.setState(event.reason) // Error: Whoops! - the unhandled error object
    })
  }

  render() {
    let pathProps = {...this.props}
    let matchProps = {
      match: this.state.match,
      UpdateMatch: (match)=>{
        // console.log("updating match", match)
        this.setState({match})
      },
    }

    return (
      <div>
        {this.props.redirect()}
        <div className="container">
          <p>{this.state.error}</p>
          {this.props.user ? (
            <div className="content">
                <Route path="/" exact   render={(props)=><Dashboard {...props} matchProps={matchProps} pathProps={pathProps} />} />
                <Route path="/match"    render={(props)=><Match     {...props} matchProps={matchProps} pathProps={pathProps} />} />
                <Route path="/settings" render={(props)=><Settings  {...props} pathProps={pathProps} />} />
            </div>
          ): null}
        </div>
      </div>
    )
  }

}

export default Home
