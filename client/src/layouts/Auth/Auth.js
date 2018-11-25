import React from 'react'
import './Auth.css'
import API from '../../functions/api'

const sendLogin = () => {
  API.auth({hey:"world"})
  .then((res)=>console.log(res))
}

const Auth = ({authenticate}) => (
  <div className="auth">
    <button onClick={sendLogin}>Login</button>
  </div>
)

export default Auth
