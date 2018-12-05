import React, { Component } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'

import Dashboard from './Dashboard/Dashboard'
import Match from './Match/Match'
import Settings from './Settings/Settings'

import API from '../../functions/api'

import './Home.css'

class Home extends Component {
  state = {
    data: "test",
    playerHistory: [],
    opponentHistory: [],
    socket: null,
    error: ""
  }

  componentDidUpdate() {
    console.log("componentDidRecieveProps")
    if(this.props.pathProps && this.props.pathProps.user && this.props.pathProps.user._id){
      let socket = API.connectSocket(this.props.pathProps.user._id)
      this.setState({socket: socket})
    }else{
      this.setState({error: "User not found"})
    }
  }

  render() {
    let pathProps = {...this.props, ...this.state}

    return (
      <div>
        <Router>
          <div className="container">
            <p>{this.state.error}</p>
            <div className="content">
              <Route path="/" exact   render={(props)=><Dashboard {...props} pathProps={pathProps} />} />
              <Route path="/match"    render={(props)=><Match     {...props} pathProps={pathProps} />} />
              <Route path="/settings" render={(props)=><Settings  {...props} pathProps={pathProps} />} />
            </div>
          </div>
        </Router>
      </div>
    )
  }

}

export default Home
