import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login';
import './Auth.css'

import TextField from '../../components/TextField/TextField'

import API from '../../functions/api'

class Auth extends Component {

  state = {
    login: {
      username: "",
      password: ""
    },
    signup:{
      username: "",
      password: ""
    },
    error: ""
  }

  sendLogin = () => {
    API.login(this.state.login)
    .then((res)=>{
      console.log(res)
      this.props.completeAuth(res.token, res.data)
    })
    .catch(error => {
      this.setState({error})
    })
  }

  sendSignup = () => {
    API.signup(this.state.signup)
    .then((res)=>{
      this.props.completeAuth(res.token, res.data)
    })
    .catch(error => {
      this.setState({error})
    })
  }

  sendFBLogin = (data) => {
    API.fbLogin(data)
    .then((res) => {
      console.log(res)
      this.props.completeAuth(res.token, res.data)
    })
    .catch(error => {
      this.setState({error})
    })
  }

  render() {
    // let {authenticate} = this.props

    return (
      <div className="auth">
        <p>{this.state.error.message}</p>
        <h1>Login</h1>
        <TextField
          id="username-login"
          value={this.state.login.username}
          onChange={(e)=>this.setState({login: {...this.state.login, username: e.target.value}})}
        />
        <TextField
          id="password-login"
          value={this.state.login.password}
          onChange={(e)=>this.setState({login: {...this.state.login, password: e.target.value}})}
        />
        <br/>
        <button onClick={this.sendLogin}>Login</button>

        <h1>Signup</h1>
        <TextField
          id="username-signup"
          value={this.state.signup.username}
          onChange={(e)=>this.setState({signup: {...this.state.signup, username: e.target.value}})}
        />
        <TextField
          id="password-signup"
          value={this.state.signup.password}
          onChange={(e)=>this.setState({signup: {...this.state.signup, password: e.target.value}})}
        />
        <br/>
        <button onClick={this.sendSignup}>Signup</button>
        <br/>
        <br/>
        <FacebookLogin
          appId="1296779020457393"
          fields="name,email"
          callback={(data)=>this.sendFBLogin(data)}
        />
      </div>
    )
  }

}

export default Auth
