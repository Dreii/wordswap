import React, { Component } from 'react'
import './App.css'

import Auth from '../Auth/Auth'
import Home from '../Home/Home'

class App extends Component {
  state={
    auth: true
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
