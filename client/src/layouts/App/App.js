import dotenv from 'dotenv'

import React, { Component } from 'react'
import './App.css'

import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'


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
      <Router>
        <div className="app">
          <Switch>
            <Route
              exact
              path="/login"
              render={()=>(
                <Auth
                  redirect={()=> this.state.user ? <Redirect to="/" /> : null}
                  completeAuth={(token, user)=>{
                    this.setState({token, user})
                    API.ConnectSocket(user._id)
                    .then((socket)=>{
                      this.setState({socket})

                      socket.on('err', (err)=>{
                        console.log(err)
                      })
                    })
                  }}
                />
              )}
            />

            <Route
              path="/"
              render={()=>(
                <Home
                  redirect={()=> this.state.user ? null : <Redirect to="/login" />}
                  token={this.state.token}
                  user={this.state.user}
                  socket={this.state.socket}
                  setUserGlobalState={(newUser)=>{
                    this.setState({user: newUser})
                  }}
                  deauthenticate={()=>this.setState({auth: false})}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
