import React, { Component } from 'react'
import './Match.css'
import API from '../../../functions/api'

import FirstRound from './Stages/FirstRound'
import InGame from './Stages/InGame'
import LookingForMatch from './Stages/LookingForMatch'
import MatchOver from './Stages/MatchOver'

import {Link} from 'react-router-dom'

class Match extends Component {

  state = {
    playerInput: "",
    error: ""
  }

  componentDidMount(){
    if(this.props.pathProps.socket){
      console.log("should be sending")
      if(!this.props.pathProps.match){
        API.LookForMatch(this.props.pathProps.socket, this.props.pathProps.user._id)
        .then((res)=>{
          if(res.error){
            this.setState({error: res.error})
          }else{
            this.props.matchProps.setMatch(res.match)
          }
        })
      }

      this.props.pathProps.socket.on("MATCH_UPDATED", match => {
        console.log("match was updated", match)
        this.props.matchProps.setMatch(match)
      })
    }
  }

  componentWillUnmount(){
    console.log("unmounting")
    if(this.props.pathProps.socket && this.props.pathProps.match){
      API.LeaveMatch(this.props.pathProps.socket)
    }
  }

  sendTurn(){
    console.log("sending turn")
  }

  render() {
    let {matchProps, pathProps} = this.props
    let match = matchProps.match ? matchProps.match : null

    let matchRender
    if(match && match.playerTwo){
      if(match.round === 0)
        matchRender = <FirstRound
                        match={match}
                        playerInput={this.state.playerInput}
                        setPlayerInput={(input)=>this.setState({playerInput: input})}
                      />
      else {
        //rounds that = less then 0 mean the game has been won by one of the players
        //-1 means player 1 won, -2 means player 2 won.
        if(match.round < 0)
          matchRender = <MatchOver match={match} />
        else matchRender = <InGame
                              match={match}
                              userID={pathProps.user._id}
                              playerInput={this.state.playerInput}
                              setPlayerInput={(input)=>this.setState({playerInput: input})}
                           />
      }
    }else matchRender = <LookingForMatch />

    return (
      <div>
        <p>Match</p>
        <Link to="/">Back Home</Link>

        {matchRender}
      </div>
    )
  }

}

export default Match
