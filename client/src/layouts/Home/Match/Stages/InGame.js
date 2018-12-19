import React from 'react'
import TextField from '../../../../components/TextField/TextField'

const InGame = ({match, userID, playerInput, setPlayerInput}) => (
  <div>
    <div style={{display: "flex"}}>
      <div style={{width: "50%", textAlign:"center"}}>
        <p>Player one history</p>
        <ul>
          {
            determineHistory(match, userID, true)
            .map(entry => <li>entry</li>)
          }
        </ul>
      </div>
      <div style={{width: "50%", textAlign:"center"}}>
        <p>Player two history</p>
        <ul>
          {
            determineHistory(match, userID, false)
            .map(entry => <li>entry</li>)
          }
        </ul>
      </div>
    </div>

    <TextField label="Player input" src={playerInput} onChange={(e)=>setPlayerInput(e.target.value)}/>
  </div>
)

export default InGame



function determineHistory(match, userID, getPlayer){
  if(match.playerOne === userID && getPlayer) return match.playerOneHist
  else return match.playerTwoHist
}
