import React from 'react'
import styles from './Column.module.css'
import Friend from './Friend'

const Column = () => (
  <div className={styles.column}>
    <h2 className={styles.title}>Friends</h2>
    <button className={styles.addFriend}>+ Add Friend</button>
    <div className={styles.icons}>
      <Friend name="Sean V" points="7845" avatarUrl="/headshots/headshot-0.png" />
      <Friend name="Libbylikekitties" points="77" avatarUrl="/headshots/headshot-2.png" />
      <Friend name="DuncanPumkin89" points="999" avatarUrl="/headshots/headshot-3.png" />
      <Friend name="Skye A" points="7514" avatarUrl="/headshots/headshot-4.png" />
      <Friend name="Skye A" points="7514" avatarUrl="/headshots/headshot-4.png" />
    </div>
  </div>
)

export default Column
