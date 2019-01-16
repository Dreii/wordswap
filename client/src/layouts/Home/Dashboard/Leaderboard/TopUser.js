import React from 'react'
import styles from './TopUser.module.css'
import seedTopUser from './seedData/seedTopUser';
let { avatarUrl, coinUrl, coinAlt, username, level} = seedTopUser;

const TopUser = () => (
  <div className={styles.topUser}>
    <img className={styles.avatar} src={avatarUrl} alt="top user's avatar"/>
    <img className={styles.coin} src={coinUrl} alt={coinAlt}/>
    <span className={styles.text}>
      <p className={styles.userName}>{username}</p>
      <p className={styles.level}>{level}</p>
    </span>
  </div>
)

export default TopUser
