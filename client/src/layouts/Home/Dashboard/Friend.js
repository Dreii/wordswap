import React from 'react'
import styles from './Dashboard.module.css'

const Friend = ({name, points, avatarUrl}) => (
  <div className={styles.friend}>
    <span className={styles.left}>
      <img src={avatarUrl} alt="avatar"/>
    </span>
    <span className={styles.middle}>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.points}>{points}</p>
    </span>
    <span className={styles.right}>
      <button>Challenge</button>
    </span>
  </div>
)

export default Friend
