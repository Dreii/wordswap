import React from 'react'
import {Link} from 'react-router-dom'

const LookingForMatch = ({setLeaveConfirmWindow, leaveConfirmWindow}) => (
  <div>
    <button onClick={()=>setLeaveConfirmWindow(true)}>Back Home</button>
    {leaveConfirmWindow ? (
      <div>
        <button onClick={()=>setLeaveConfirmWindow(false)}>X</button>
        Are you sure you want to cancel looking for match?
        <Link to="/">YES</Link>
        <button onClick={()=>setLeaveConfirmWindow(false)}>Cancel</button>
      </div>
    ): null}

    <p>Looking For Match...</p>
  </div>
)

export default LookingForMatch
