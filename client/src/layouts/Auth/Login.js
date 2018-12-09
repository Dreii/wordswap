import React from 'react';

import styles from './Auth.module.css';
import TextField from '../../components/TextField/TextField';

const Login = ({authenticate}) => (
  <div className={styles.formContainer}>
    <img className={styles.logo} src="wordswap-logo.png" alt="wordswap logo" />
    <h2 className={styles.title}>
    <span className={styles.red}>Word</span><span className={styles.blue}>Swap</span>
    </h2>
    <form method="POST">
      <TextField id="email" label="Email" />
      <TextField id="password" type="password" label="Password" />
    </form>
    <button className={styles.submit} onClick={authenticate}>Log In</button>
  </div>
);

export default Login;
