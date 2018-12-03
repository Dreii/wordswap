import dotenv from 'dotenv'

import React, { Component } from 'react'
import './App.css'

import Auth from '../Auth/Auth'
import Home from '../Home/Home'

dotenv.config()

class App extends Component {
  state={
    auth: false,
    token: "",
    user: null 
  }

  render() {
    return (
      <div className="app">
        {this.state.user === null ? (
          <Auth
            completeAuth={(token, user)=>{
              console.log(token, user)
              this.setState({token, user})
            }}
          />
        ):(
          <Home
            token={this.state.token}
            user={this.state.user}
            setUserGlobalState={(newUser)=>{
              console.log(newUser)
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
