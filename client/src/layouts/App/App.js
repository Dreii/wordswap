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
    leaderboard: [],
    leaderboardFetching: false
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

                      socket.on('err', (err) => console.log(err))

                      this.setState({leaderboardFetching: true})

                      API.RequestLeaderboard(socket, user._id)
                      .then((leaderboard) => {
                        console.log("leaderboard data came in", leaderboard)
                        this.setState({leaderboard, leaderboardFetching: false})

                        socket.on('err', (err)=> console.log(err))
                      })

                      API.SetupRequestReceivers(this, socket)
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
                  leaderboard={this.state.leaderboard}
                  leaderboardFetching={this.state.leaderboardFetching}
                  socket={this.state.socket}
                  SetUserGlobalState={(newUser) => this.setState({user: newUser})}
                  SetLeaderboardGlobalState={(newLeaderboard) => this.setState({leaderboard: newLeaderboard})}
                  SetLeaderboardFetchingState={(newFetchState) => this.setState({leaderboardFetching: newFetchState})}
                  deauthenticate={() => this.setState({auth: false})}
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
