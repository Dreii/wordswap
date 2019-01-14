import React from 'react'
import styles from './Friend.module.css'

const Friend = ({name, points, avatarUrl}) => (
  <div className={styles.friend}>
    <div className={styles.left}>
      <img className={styles.avatar} src={avatarUrl} alt="avatar"/>
    </div>
    <div className={styles.middle}>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.points}>{points}</p>
    </div>
    <div className={styles.right}>
      <button className={styles.challenge}>Play</button>
    </div>
  </div>
)

export default Friend
