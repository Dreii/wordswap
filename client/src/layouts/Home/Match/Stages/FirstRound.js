import React from 'react'
import TextField from '../../../../components/TextField/TextField'
import {Link} from 'react-router-dom'

const FirstRound = ({
  match,
  playerInput,
  setPlayerInput,
  setLeaveConfirmWindow,
  leaveConfirmWindow,
  sendTurn,
  waitingForOpponent,
  playerInputError,
  playerInputErrorShake
}) => (
  <div>
    <button onClick={()=>setLeaveConfirmWindow(true)}>Back Home</button>
    {leaveConfirmWindow ? (
      <div>
        <button onClick={()=>setLeaveConfirmWindow(false)}>X</button>
        Are you sure you want to forfiet this match?
        <Link to="/">YES</Link>
        <button onClick={()=>setLeaveConfirmWindow(false)}>Cancel</button>
      </div>
    ): null}

    <p>
      Your scoring letters are
      {match.letterScores.map((letterScore, i) => (
        <span key={i}> {letterScore.letter}:{letterScore.score} </span>
      ))}
    </p>

    {waitingForOpponent ? (
      <p>Waiting for other player...</p>
    ):(
      <div>
        <p className={playerInputErrorShake ? "shake" : ""}>{playerInputError}</p>
        <p>Please make you're first word:</p>
        <TextField label="Player input" value={playerInput} onChange={(e)=>setPlayerInput(e.target.value)}/>
        <button onClick={()=>sendTurn()}>
          Send Word
        </button>
      </div>
    )}
  </div>
)

export default FirstRound
