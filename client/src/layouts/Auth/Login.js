import React from 'react';

import './Auth.css';
import TextField from '../../components/TextField/TextField';

const Login = ({authenticate}) => (
  <div className="authForm">
    <img className="logo" src="wordswap-logo.png" alt="wordswap logo" />
    <h2 className="title">
    <span className="red">Word</span><span className="blue">Swap</span>
    </h2>
    <form method="POST">
      <TextField id="email" label="Email"/>
      <TextField id="password" type="password" label="Password" />
    </form>
    <button className="submit" onClick={authenticate}>Log In</button>
  </div>
);

export default Login;
