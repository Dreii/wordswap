import React, { Component } from 'react'
import styles from './Dashboard.module.css'
import Nav from './Nav/Nav'
import Friends from './Friends/Column'
import User from './User/Column'
import Leaderboard from './Leaderboard/Column'

class Dashboard extends Component {

  render() {
    return (
      <div className={styles.dashboard}>
        <Nav />
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
