import React, { Component } from 'react'
import './Dashboard.css'

import FriendsList from '../../../components/FriendsList/FriendsList'
import Leaderboard from '../../../components/Leaderboard/Leaderboard'
import TextField from '../../../components/TextField/TextField'

import API from '../../../functions/api'

import {Link, Redirect} from 'react-router-dom'

class Dashboard extends Component {

  state = {
    newUsername:"",
    error: "",
    friendSearchQuery: "",
    friendSearchQueryTimer: null,
    friendSearchResults: [],
    awaitingChallengeResponse: false,
    challengeReceiverID: null,
    startMatch: false
  }

  submitUsername = () => {
    API.SubmitUsername({username: this.state.newUsername, token: this.props.pathProps.token})
    .then((res)=>{
      this.props.pathProps.setUserGlobalState({...this.props.pathProps.user, username: this.state.newUsername})
    })
    .catch(error => {
      this.setState({error})
    })
  }

  render() {
    let user = this.props.pathProps.user,
        socket = this.props.pathProps.socket,
        matchProps = this.props.matchProps

    return (
      <div>
        <p>{this.state.error.message || this.state.error}</p>
        {user.username ? null:(
          <div>
            <p>Please set a username</p>
            <TextField src={this.state.newUsername} onChange={(e)=>this.setState({newUsername: e.target.value})} />
            <button onClick={()=>this.submitUsername()}>Submit</button>
          </div>
        )}

        <p>Dashboard</p>
        <p>User: {user.username}</p>
        <p>name: {user.name}</p>
        <p>email: {user.email}</p>
        <p>rank: {user.rank}</p>

        <Link to="/match">Play</Link>
        <br/>
        <Link to="/settings">Settings</Link>

        {user.friendRequests.length > 0 ? (
          user.friendRequests.map((request, i)=>(
            <p key={i}>
              <b>New Friend Request from:{request.name || request.username}!</b>
              <span><button onClick={()=>API.AcceptFriendRequest(socket, user._id, request._id)}>Accept</button></span>
              <span><button onClick={()=>API.DeclineFriendRequest(socket, user._id, request._id)}>Decline</button></span>
            </p>
          ))
        ):null}

        {user.challenge ? (
          <h1>
            NEW CHALLENGE FROM: {user.challenge.name || user.challenge.username}
            <span><button onClick={()=>{
              API.AcceptChallenge(socket, user.challenge._id, user._id)
              .then((challengeResults)=>{
                if(challengeResults.accepted){
                  matchProps.updateMatch(challengeResults.match)
                  this.setState({startMatch:true})
                }
              })
              delete user.challenge
              this.props.pathProps.setUserGlobalState({...user})
            }}>Accept</button></span>
            <span><button onClick={()=>{
              API.DeclineChallenge(socket, user.challenge._id)
              delete user.challenge
              this.props.pathProps.setUserGlobalState({...user})
            }}>Decline</button></span>
          </h1>
        ): null}

        <FriendsList
          list={user.friends}
          loading={this.state.loadingFriendSeach}
          SendChallenge={(challengeReceiverID) => {
            this.setState({awaitingChallengeResponse: true, challengeReceiverID})
            API.SendChallenge(socket, challengeReceiverID)
            .then(challengeResults => {
              if(challengeResults.accepted){
                matchProps.updateMatch(challengeResults.match)
                this.setState({awaitingChallengeResponse: false, challengeReceiverID: null, startMatch: true})
              }else{
                console.log("should be cancelling")
                if(challengeResults.reason === "timeout") this.setState({error: "Challenge timed out", awaitingChallengeResponse: false})
                if(challengeResults.reason === "busy") this.setState({error: "User is busy or offline", awaitingChallengeResponse: false})
                if(challengeResults.reason === "declined") this.setState({error: "Challenge Declined", awaitingChallengeResponse: false})
              }
            })
          }}
          AddFriend={(requesteeID)=>API.SendFriendRequest(socket, user._id, requesteeID)}
          friendSearchQuery = {this.state.friendSearchQuery}
          FriendSearch = {(value)=>{
            if(this.state.friendSearchResults && this.state.friendSearchQuery)
            if(this.state.friendSearchQueryTimer) clearTimeout(this.state.friendSearchQueryTimer)

            let friendSearchQueryTimer = setTimeout(()=>{
              API.LookForFriends(socket, user._id, value, user.recentOpponents)
              .then(friendSearchResults => {
                friendSearchResults = friendSearchResults.filter(result => user.friends.findIndex(friend => friend._id === result._id) < 0)
                this.setState({friendSearchResults, loadingFriendSeach: false})
              })
            }, 1000)

            this.setState({friendSearchQuery: value, friendSearchQueryTimer, loadingFriendSeach: true})
          }}
          searchResults={this.state.friendSearchResults}
        />

        {this.state.awaitingChallengeResponse ? (
          <div className="waitingForOpponent">
            Waiting for opponent...

            <button onClick={()=>{
              this.setState({awaitingChallengeResponse: false, challengeReceiverID: null})
              API.CancelChallenge(socket, this.state.challengeReceiverID)
            }}>Cancel</button>
          </div>
        ): null}


        <Leaderboard
          userID={user._id}
          data={this.props.pathProps.leaderboard}
          fetching={this.props.pathProps.leaderboardFetching}
        />

        {this.state.startMatch ? (
          <Redirect to='/match'/>
        ):null}
      </div>
    )
  }

}

export default Dashboard
