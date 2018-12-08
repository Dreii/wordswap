import React from 'react';

import styles from './Auth.module.css';

const SignUp = ({authenticate}) => (
  <div className={styles.formContainer}>
    <img className={styles.logo} src="wordswap-logo.png" alt="wordswap logo" />
    <h2 className={styles.title}>
      <span className={styles.red}>Word</span><span className={styles.blue}>Swap</span>
    </h2>
    <form method="POST">
      <label htmlFor="email">Email</label>
      <input type="text" name="email"/>
      <label htmlFor="password">Password</label>
      <input type="text" name="password"/>
      <label htmlFor="confirm-password">Confirm Password</label>
      <input type="text" name="confirm-password"/>
    </form>
    <button className={styles.submit} onClick={authenticate}>Sign Up</button>
  </div>
);

export default SignUp;