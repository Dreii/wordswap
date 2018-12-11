import dotenv from 'dotenv'

import React, { Component } from 'react'
import './App.css'

import Auth from '../Auth/Auth'
import Home from '../Home/Home'

import API from '../../functions/api'

dotenv.config()

class App extends Component {
  state={
    auth: false,
    token: "",
    user: null,
    socket: null,
  }

  render() {
    return (
      <div className="app">
        {this.state.user === null ? (
          <Auth
            completeAuth={(token, user)=>{
              this.setState({token, user})
              API.connectSocket(user._id)
              .then((socket)=>{
                this.setState({socket})
              })
            }}
          />
        ):(
          <Home
            token={this.state.token}
            user={this.state.user}
            socket={this.state.socket}
            setUserGlobalState={(newUser)=>{
              this.setState({user: newUser})
            }}
            deauthenticate={()=>this.setState({auth: false})}
          />
        )}
      </div>
    );
  }
}

export default App;
