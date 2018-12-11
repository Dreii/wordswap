import React, { Component } from 'react'
import './Match.css'
import TextField from '../../../components/TextField/TextField'
import API from '../../../functions/api'

import {Link} from 'react-router-dom'

class Match extends Component {

  state = {
    playerInput: ""
  }

  componentDidMount(){
    if(this.props.pathProps.socket){
      console.log("should be sending")
      if(!this.props.pathProps.match){
        API.lookForMatch(this.props.pathProps.socket)
        .then((match)=>this.props.matchProps.setMatch(match))
      }
    }
  }

  determineHistory(match, userID, getPlayer){
    if(match.playerOne === userID && getPlayer) return match.playerOneHist
    else return match.playerTwoHist
  }

  sendTurn(){
    console.log("sending turn")
  }

  render() {
    let {matchProps, pathProps} = this.props
    return (
      <div>
        <p>Match</p>
        <Link to="/">Back Home</Link>

        {this.props.matchProps.match ? (
          <div>
            <div style={{display: "flex"}}>
              <div style={{width: "50%", textAlign:"center"}}>
                <p>Player one history</p>
                <ul>
                  {
                    this.determineHistory(matchProps.match, pathProps.user._id, true)
                    .map(entry => <li>entry</li>)
                  }
                </ul>
              </div>
              <div style={{width: "50%", textAlign:"center"}}>
                <p>Player two history</p>
                <ul>
                  {
                    this.determineHistory(matchProps.match, pathProps.user._id, false)
                    .map(entry => <li>entry</li>)
                  }
                </ul>
              </div>
            </div>

          <TextField label="Player input" src={this.state.playerInput} onChange={(e)=>this.setState({playerInput: e.target.value})}/>
        </div>
        ):(
          <p>Looking for match</p>
        )}
      </div>
    )
  }

}

export default Match
