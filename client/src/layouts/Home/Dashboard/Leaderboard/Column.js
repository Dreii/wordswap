import React from 'react'
import styles from './Column.module.css'
import TopUser from './TopUser'
import Table from './Table'

const Column = () => (
  <div className={styles.column}>
    <h2 className={styles.title}>Leaderboard</h2>
    <TopUser />
    <Table />
  </div>
)

export default Column
