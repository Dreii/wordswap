import React from 'react'
import styles from './Column.module.css'
import Friend from './Friend'
import seedFriends from './seedData/seedFriends';

const Column = () => (
  <div className={styles.column}>
    <h2 className={styles.title}>Friends</h2>
    <button className={styles.addFriend}>+ Add Friend</button>
    <div className={styles.icons}>
      { // Display friends
        seedFriends.map( function(friend, i) {
          let {name, points, avatarUrl} = friend;
          return <Friend name={name} points={points} avatarUrl={avatarUrl} />
        })
      }
    </div>
  </div>
)

export default Column
