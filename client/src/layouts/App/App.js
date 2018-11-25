import dotenv from 'dotenv'

import React, { Component } from 'react'
import './App.css'

import Auth from '../Auth/Auth'
import Home from '../Home/Home'

dotenv.config()

class App extends Component {
  state={
    auth: false
  }

  render() {
    return (
      <div className="app">
        {!this.state.auth ? (
          <Auth
            authenticate={()=>this.setState({auth: true})}
            signup={()=>this.setState({auth: true})}
          />
        ):(
          <Home
            deauthenticate={()=>this.setState({auth: false})}
          />
        )}
      </div>
    );
  }
}

export default App;
