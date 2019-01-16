import React from 'react'
import styles from './Table.module.css'
import seedTable from './seedData/seedTable'

const Table = ({rank, username, points}) => (
  <div className={styles.Table}>
    <table>
      <tbody>
      { // leaders array must have user objects in the order of their rank in order for this to work
        seedTable.map( function(leader, i) {
          let {username, points} = leader;
          let rank = i+2;

          return (
            <tr>
              <td className={styles.rank}>{rank}</td>
              <td className={styles.username}>{username}</td>
              <td className={styles.points}>{points}</td>
            </tr>
          )
        })
      }
      </tbody>
    </table>
  </div>
)

export default Table
