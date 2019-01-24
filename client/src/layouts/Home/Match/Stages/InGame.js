import React from 'react'
import TextField from '../../../../components/TextField/TextField'
import {Link} from 'react-router-dom'

const InGame = ({
  match,
  userID,
  playerInput,
  setPlayerInput,
  setLeaveConfirmWindow,
  leaveConfirmWindow,
  sendTurn,
  requiredLetter,
  waitingForOpponent,
  playerInputError,
  playerInputErrorShake,
  time
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

    <div style={{display: "flex"}}>
      <div style={{width: "50%", textAlign:"center"}}>
        <p>Player one history</p>
        <ul>
          {
            determineHistory(match, userID, true)
            .map((entry, i) => <li key={i}>{entry || <p>SKIPPED!</p>}</li>)
          }
        </ul>
      </div>
      <div style={{width: "50%", textAlign:"center"}}>
        <p>Player two history</p>
        <ul>
          {
            determineHistory(match, userID, false)
            .map((entry, i) => <li key={i}>{entry || <p>SKIPPED!</p>}</li>)
          }
        </ul>
      </div>
    </div>

    <div><p>Timer:</p><b>{time}</b></div>

    <div className="score-bar-container">
      <div className="player-score-bar" style={{width: TranslateScoreToWidth(true, match, userID)+"%"}}></div>
      <div className="enemy-score-bar" style={{width: TranslateScoreToWidth(false, match, userID)+"%"}}></div>
      <div className="left-crunch" style={{width: TranslateRoundToWidth(match)+"%"}}></div>
      <div className="right-crunch" style={{width: TranslateRoundToWidth(match)+"%"}}></div>
    </div>

    {waitingForOpponent ? (
      <p>Waiting for other player...</p>
    ):(
      <div>
        <p className={playerInputErrorShake ? "shake" : ""}>{playerInputError}</p>
        <b>{requiredLetter ? (
          `You must start your word with the letter ${requiredLetter}`
        ):(
          `Your opponent missed a turn, you can start your word with any letter!`
        )}</b>
        <TextField label="Player input" value={playerInput} onChange={(e)=>setPlayerInput(e.target.value)}/>
        <button onClick={()=>sendTurn()}>Send Word</button>
      </div>
    )}
  </div>
)

export default InGame



function determineHistory(match, userID, thisPlayer){
  if(thisPlayer){
    if(match.playerOne._id === userID) return match.playerOneHist
    else return match.playerTwoHist
  }else{
    if(match.playerOne._id === userID) return match.playerTwoHist
    else return match.playerOneHist
  }
}

function TranslateScoreToWidth(showingPlayerScore, match, userID){
  if(showingPlayerScore){
    if(match.playerOne._id === userID) return 100 - match.score/2000 * 100
    if(match.playerTwo._id === userID) return match.score/2000 * 100
  }else{
    if(match.playerOne._id === userID) return match.score/2000 * 100
    if(match.playerTwo._id === userID) return 100 - match.score/2000 * 100
  }
}

function TranslateRoundToWidth(match){
  let crunch = ((match.round*100)/2000)*100
  return crunch
}
