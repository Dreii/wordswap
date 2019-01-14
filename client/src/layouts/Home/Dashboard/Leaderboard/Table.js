import React from 'react'
import styles from './Table.module.css'

const Table = ({rank, username, points}) => (
  <div className={styles.Table}>
    <table>
      <tbody>
        <tr>
          <td className={styles.rank}>1</td>
          <td className={styles.username}>Username</td>
          <td className={styles.points}>7563</td>
        </tr>
        <tr>
          <td className={styles.rank}>2</td>
          <td className={styles.username}>Username</td>
          <td className={styles.points}>4242</td>
        </tr>
        <tr>
          <td className={styles.rank}>3</td>
          <td className={styles.username}>Username</td>
          <td className={styles.points}>2354</td>
        </tr>
        <tr>
          <td className={styles.rank}>4</td>
          <td className={styles.username}>Username</td>
          <td className={styles.points}>4362</td>
        </tr>
        <tr>
          <td className={styles.rank}>5</td>
          <td className={styles.username}>Username</td>
          <td className={styles.points}>4362</td>
        </tr>
      </tbody>
    </table>
  </div>
)

export default Table
