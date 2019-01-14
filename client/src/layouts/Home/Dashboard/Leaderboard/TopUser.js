import React from 'react'
import styles from './TopUser.module.css'

const TopUser = ({rank, username, points}) => (
  <div className={styles.topUser}>
    <img className={styles.avatar} src="headshots/headshot-8.png" alt="top user's avatar"/>
    <img className={styles.coin} src="misc/coin-bronze.png" alt="bronze coin"/>
    <span className={styles.text}>
      <p className={styles.userName}>WWWWWWWWWWWWWWW</p>
      <p className={styles.level}>Bronze 1</p>
    </span>
  </div>
)

export default TopUser
