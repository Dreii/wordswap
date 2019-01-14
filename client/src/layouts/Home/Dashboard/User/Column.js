import React from 'react'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBill, faGem} from '@fortawesome/free-solid-svg-icons'
import styles from './Column.module.css'

const Column = () => (
  <div className={styles.column}>
    <div className={styles.rank}>
      <img className={styles.coin} src="misc/coin-bronze.png" alt="coin"/>
      <p className={styles.level}>Bronze 34</p>
    </div>
    <p className={styles.points}>1074</p>
    <img className={styles.avatar} src="bodyshots/bodyshot-1.png" alt="avatar"/>
    <Link className={styles.startMatch} to="/match">Start Match</Link>
    <Link className={styles.shopButton} to="/shop">
      <img src="/misc/hangar-graphic.png" alt="hangar icon"/>
    </Link>
    <div className={styles.moneyIcon}>
      <FontAwesomeIcon icon={faMoneyBill} size="lg" />
      <span>120</span>
    </div>
    <div className={styles.gemIcon}>
      <FontAwesomeIcon icon={faGem} size="lg" />
      <span>120</span>
    </div>
  </div>
)

export default Column
