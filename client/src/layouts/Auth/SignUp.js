import React from 'react';

import './Auth.css';
import TextField from '../../components/TextField/TextField';

const SignUp = ({authenticate}) => (
  <div className="authForm">
    <img className="logo" src="wordswap-logo.png" alt="wordswap logo" />
    <h2 className="title">
      <span className="red">Word</span><span className="blue">Swap</span>
    </h2>
    <form method="POST">
      <TextField id="email" label="Email" />
      <TextField id="password" type="password" label="Password" />
      <TextField id="confirm-password" type="password" label="Confirm Password"/>
    </form>
    <button className="submit" onClick={authenticate}>Sign Up</button>
  </div>
);

export default SignUp;
