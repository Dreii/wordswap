import React, { Component } from 'react'
import styles from './Dashboard.module.css'
import Friends from './Friends/Column'
import User from './User/Column'
import Leaderboard from './Leaderboard/Column'

class Dashboard extends Component {

  render() {
    return (
      <div className={styles.dashboard}>
        <div className={styles.nav}>
          <button><img src="/headshots/headshot-1.png" alt=" "></img></button>
          <br/>
        </div>
        { /***
        <nav>
          <Link to="/account">Account</Link>
          <Link to="/settings">Settings</Link>
          <Link to="/logout">Log Out</Link>
        </nav> ***/
        }
        <div className={styles.main}>
          <Friends classname={styles.friends}/>
          <User classname={styles.user}/>
          <Leaderboard classname={styles.leaderboard}/>
        </div>
      </div>
    )
  }
}

export default Dashboard
