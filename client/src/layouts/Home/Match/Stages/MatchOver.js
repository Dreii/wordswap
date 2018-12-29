import React from 'react'
import {Link} from 'react-router-dom'

const MatchOver = ({match, userID}) => (
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
  </div>
)

export default MatchOver
