import React from 'react'
import TextField from '../../../../components/TextField/TextField'

const FirstRound = ({match, playerInput, setPlayerInput}) => (
  <div>
    <p>
      Your scoring letters are 
      {match.letterScores.map((letterScore, i) => (
        <span key={i}>{letterScore.letter}:{letterScore.score}</span>
      ))}
    </p>

    <p>Please make you're first word:</p>
    <TextField label="Player input" src={playerInput} onChange={(e)=>setPlayerInput(e.target.value)}/>
  </div>
)

export default FirstRound
