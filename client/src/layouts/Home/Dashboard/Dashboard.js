import React, { Component } from 'react'
import './Dashboard.css'

import TextField from '../../../components/TextField/TextField'

import API from '../../../functions/api'

import {Link} from 'react-router-dom'

class Dashboard extends Component {

  state = {
    newUsername:"",
    error: ""
  }

  submitUsername = () => {
    API.submitUsername({username: this.state.newUsername, token: this.props.pathProps.token})
    .then((res)=>{
      this.props.pathProps.setUserGlobalState({...this.props.pathProps.user, username: this.state.newUsername})
    })
    .catch(error => {
      this.setState({error})
    })
  }

  render() {
    return (
      <div>
        <p>{this.state.error.message}</p>
        {this.props.pathProps.user.username ? null:(
          <div>
            <p>Please set a username</p>
            <TextField src={this.state.newUsername} onChange={(e)=>this.setState({newUsername: e.target.value})} />
            <button onClick={()=>this.submitUsername()}>Submit</button>
          </div>
        )}

        <p>Dashboard</p>
        <p>User: {this.props.pathProps.user.username}</p>
        <p>name: {this.props.pathProps.user.name}</p>
        <p>email: {this.props.pathProps.user.email}</p>
        <p>rank: {this.props.pathProps.user.rank}</p>

        <Link to="/match">Play</Link>
        <br/>
        <Link to="/settings">Settings</Link>
      </div>
    )
  }

}

export default Dashboard
