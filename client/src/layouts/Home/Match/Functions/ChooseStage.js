import React from 'react'

import {SendTurn, CheckWordOffline, GetRequiredLetter} from './SendTurn'

import FirstRound from '../Stages/FirstRound'
import InGame from '../Stages/InGame'
import LookingForMatch from '../Stages/LookingForMatch'
import MatchOver from '../Stages/MatchOver'


export default function ChooseStage(){
  let props = {...this.props.pathProps, ...this.props.matchProps}

  //if a match exists and there is another player in the match,
  //then we need to determine which stage we are on via the round.
  if(props.match && props.match.playerTwo){

    //if the round is 0 that means we are in the setup phase, where there are no timers.
    if(props.match.round === 0) return FirstRoundConstructor.call(this, props)

    //if the round is greater than 0 then we are in the middle of the game,
    //timers are on and users have to start words with specific letters.
    if(props.match.round > 0)   return InGameConstructor.call(this, props)

    //rounds that = less then 0 mean the game has been won by one of the players
    //-1 means player 1 won, -2 means player 2 won, -3 means there was a tie.
    if(props.match.round < 0)   return MatchOverConstructor.call(this, props)
  }

  //if a match does not exist or there is not a player two,
  //we are still looking for a match.
  return LookingForMatchConstructor.call(this)
}






function FirstRoundConstructor(props){
  return <FirstRound
            match={props.match}
            playerInput={this.state.playerInput}
            setPlayerInput={(input)=>this.setState({playerInput: CheckWordOffline.call(this, input, GetRequiredLetter(props.match, props.user._id))})}
            leaveConfirmWindow={this.state.leaveConfirmWindow}
            setLeaveConfirmWindow={(value)=>this.setState({leaveConfirmWindow: value})}
            sendTurn={SendTurn.bind(this)}
            waitingForOpponent={this.state.waitingForOpponent}
            playerInputError={this.state.playerInputError}
            playerInputErrorShake={this.state.playerInputErrorShake}
          />
}

function InGameConstructor(props){
  return <InGame
            match={props.match}
            userID={props.user._id}
            playerInput={this.state.playerInput}
            setPlayerInput={(input)=>this.setState({playerInput: CheckWordOffline.call(this, input, GetRequiredLetter(props.match, props.user._id))})}
            leaveConfirmWindow={this.state.leaveConfirmWindow}
            setLeaveConfirmWindow={(value)=>this.setState({leaveConfirmWindow: value})}
            sendTurn={SendTurn.bind(this)}
            requiredLetter={GetRequiredLetter(props.match, props.user._id)}
            waitingForOpponent={this.state.waitingForOpponent}
            playerInputError={this.state.playerInputError}
            playerInputErrorShake={this.state.playerInputErrorShake}
            time={this.state.time}
         />
}

function MatchOverConstructor(props){
  return <MatchOver match={props.match} userID={props.user._id} leaderboard={props.leaderboard}/>
}

function LookingForMatchConstructor(){
  return <LookingForMatch
            leaveConfirmWindow={this.state.leaveConfirmWindow}
            setLeaveConfirmWindow={(value)=>this.setState({leaveConfirmWindow: value})}
         />
}
