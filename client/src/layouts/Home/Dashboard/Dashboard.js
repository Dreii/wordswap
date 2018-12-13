import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import styles from './Dashboard.module.css'

import Friend from './Friend'

class Dashboard extends Component {

  render() {
    return (
      <div className={styles.dashboard}>
        <div className={styles.nav}>
          <button><img src="" alt=" "></img></button>
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
          <div className={styles.friends}>
              <div className={styles.align}>
                <h2 className={styles.title}>Friends</h2>
                  <button className={styles['add-friend']}>+ Add Friend</button>
                <Friend name="Friends Name" points="7845" avatarUrl="/headshots/headshot-0.png" />
                {//<Friend name="Libby D" points="77" avatarUrl="/headshots/headshot-2.png" />
                //<Friend name="Sebatian P" points="999" avatarUrl="/headshots/headshot-3.png" />
                //<Friend name="Skye A" points="7514" avatarUrl="/headshots/headshot-4.png" />
                }
              </div>
          </div>

          <div className={styles.user}>
            <p>Bronze 34</p>
            <p>1074</p>
            <img src="bodyshots/bodyshot-1.png" alt="avatar"/>
            <Link to="/match">Start Match</Link>
          </div>

          <div className={styles.user}>
            <h2 className={styles.title}>Leaderboard</h2>
          </div>
        </div>
      </div>
    )
  }

}

export default Dashboard
