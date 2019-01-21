import React from 'react'
import {Link} from 'react-router-dom'
import Leaderboard from '../../../../components/Leaderboard/Leaderboard'

const MatchOver = ({match, userID, leaderboard}) => (
  <div>
    <Link to="/">Back Home</Link>
    {match.round === -3 ?(
      "It's a Tie!"
    ):(
      match.playerOne._id === userID ? (
        match.round === -1 ? "You Win!" : "You Lose..."
      ):(
        match.round === -2 ? "You Win" : "You Lose..."
      )
    )}

    <Leaderboard
      userID={userID}
      data={leaderboard}
    />
  </div>
)

export default MatchOver
