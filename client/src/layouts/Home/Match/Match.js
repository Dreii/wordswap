import React, { Component } from 'react'
import './Match.css'
import API from '../../../functions/api'

import FirstRound from './Stages/FirstRound'
import InGame from './Stages/InGame'
import LookingForMatch from './Stages/LookingForMatch'
import MatchOver from './Stages/MatchOver'

let maxTime = 10

class Match extends Component {

  state = {
    playerInput: "",
    error: "",
    playerInputError: "",
    showLeaveConfirmWindow: false,
    waitingForOpponent: false,
    playerInputErrorShake: false,
    time: maxTime,
    initialTime: new Date()
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
            console.log("INITIAL UPDATE", res.match)
            this.props.matchProps.updateMatch(res.match)
          }
        })
      }

      this.props.pathProps.socket.on("MATCH_UPDATED", match => {
        console.log("match was updated", match)
        if(match.playerOneHist.length === match.playerTwoHist.length)
          this.setState({waitingForOpponent: false})

        this.props.matchProps.updateMatch(match)
        if(match.round > 0) this.SetTimer()
      })
    }
  }

  componentWillUnmount(){
    console.log("unmounting")
    let socket = this.props.pathProps.socket,
        match = this.props.matchProps.match,
        userID = this.props.pathProps.user._id

    let playerTwo = (match !== null) ? this.props.matchProps.match.playerTwo : null

    console.log(socket, match, playerTwo, userID)

    if(socket && match && playerTwo !== null){
      API.LeaveMatch(socket, userID)
    }else if(socket && match && playerTwo === null){
      API.cancelMatch(socket, match._id)
    }

    // this.props.matchProps.updateMatch(null)
  }

  SendTurn(){
    console.log("sending turn")
    this.StopTimer()
    SendTurn(this);
  }

  ShakePlayerInputError(){
    this.setState({playerInputErrorShake: true})
    console.log("shaking")
    window.setTimeout(()=>this.setState({playerInputErrorShake: false}), 100)
  }

  SetTimer(){
    if(this.props.matchProps.match.round > 0){
      this.setState({time: maxTime})
      this.setState({initialTime: new Date()})
      this.timer = setInterval(()=> {
        let now = new Date()
        let time = maxTime - Math.floor((now.getTime() - this.state.initialTime.getTime())/1000)
        // console.log(maxTime, now.getTime(), this.state.initialTime.getTime(), time)
        this.setState({time})
        if(time <= 0) this.OnTimerEnd()
      }, 1000)
    }
  }

  StopTimer(){
    clearTimeout(this.timer)
    this.timer = null
  }

  ClearTimer(){
    this.setState({time: maxTime})
    clearTimeout(this.timer)
    this.timer = null
  }

  OnTimerEnd(){
    console.log("times up baby")
    this.StopTimer()
    let userID = this.props.pathProps.user._id,
        socket = this.props.pathProps.socket,
        playerInput = this.state.playerInput,
        match = this.props.matchProps.match

    CheckWordOnline(socket, playerInput, GetRequiredLetter(match, userID), this)
    .then(word => {
      let data = {
        matchID: this.props.matchProps.match._id,
        player: this.props.matchProps.match.playerOne._id === this.props.pathProps.user._id ? 1 : 2,
        word
      }
      data = JSON.stringify(data)
      API.SendTurn(this.props.pathProps.socket, data)
      this.setState({playerInput: ''})
    })
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
                        setPlayerInput={(input)=>this.setState({playerInput: CheckWordOffline(input, GetRequiredLetter(this.props.matchProps.match, this.props.pathProps.user._id), this)})}
                        leaveConfirmWindow={this.state.leaveConfirmWindow}
                        setLeaveConfirmWindow={(value)=>this.setState({leaveConfirmWindow: value})}
                        sendTurn={()=>this.SendTurn()}
                        waitingForOpponent={this.state.waitingForOpponent}
                        playerInputError={this.state.playerInputError}
                        playerInputErrorShake={this.state.playerInputErrorShake}
                      />
      else {
        //rounds that = less then 0 mean the game has been won by one of the players
        //-1 means player 1 won, -2 means player 2 won.
        if(match.round < 0)
          matchRender = <MatchOver match={match} userID={pathProps.user._id}/>
        else matchRender = <InGame
                              match={match}
                              userID={pathProps.user._id}
                              playerInput={this.state.playerInput}
                              setPlayerInput={(input)=>this.setState({playerInput: CheckWordOffline(input, GetRequiredLetter(this.props.matchProps.match, this.props.pathProps.user._id), this)})}
                              leaveConfirmWindow={this.state.leaveConfirmWindow}
                              setLeaveConfirmWindow={(value)=>this.setState({leaveConfirmWindow: value})}
                              sendTurn={()=>this.SendTurn()}
                              waitingForOpponent={this.state.waitingForOpponent}
                              requiredLetter={GetRequiredLetter(this.props.matchProps.match, this.props.pathProps.user._id)}
                              playerInputError={this.state.playerInputError}
                              playerInputErrorShake={this.state.playerInputErrorShake}
                              time={this.state.time}
                           />
      }
    }else matchRender = <LookingForMatch
                          leaveConfirmWindow={this.state.leaveConfirmWindow}
                          setLeaveConfirmWindow={(value)=>this.setState({leaveConfirmWindow: value})}
                        />

    return (
      <div>
        <p>Match</p>
        <p>{this.state.error}</p>

        {matchRender}
      </div>
    )
  }

}

export default Match

async function CheckWordOnline(socket, word, requiredLetter, self){
  word = CheckWordOffline(word, requiredLetter, self)
  if(word.length > 0){
    socket.emit("USER_CHECKING_WORD", word)
    return await new Promise((resolve, reject) => {
      socket.on("WORD_VALIDATION_RESPONSE", (res, err) => {
        console.log("Got response", res)
        if(err) reject(err)
        if(res === '') {
          self.ShakePlayerInputError()
          self.setState({playerInputError: word+" is not in the dictionary"})
        }
        resolve(res)
      })
    })
  }
  return ''
}

function CheckWordOffline(word, requiredLetter, self){
  if(/^[a-z]+$/i.test(word) || word === '') {
    if(requiredLetter === '' || word === '' || word.charAt(0).toLowerCase() === requiredLetter.toLowerCase()){
      console.log(self.state.playerInputError)
      if(self.state.playerInputError !== '') {
        console.log("should clear")
        self.setState({playerInputError: ''})
      }
      return word
    }else{
      self.ShakePlayerInputError()
      self.setState({playerInputError: "You must start your word with "+requiredLetter})
      return ''
    }
  }else{
    self.ShakePlayerInputError()
    self.setState({playerInputError: "No Special Characters!"})
    return word.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>0-9 {}[]\\\/]/gi, '', 'QQQQ')
  }
}

async function SendTurn(self){
  let requiredLetter = GetRequiredLetter(self.props.matchProps.match, self.props.pathProps.user._id)
  let word = await CheckWordOnline(self.props.pathProps.socket, self.state.playerInput, requiredLetter, self)
  console.log("post check", word)
  if(word.length > 0){
    self.setState({playerInput: '', playerInputError: ""})

    if(self.props.matchProps.match.playerOneHist.length === self.props.matchProps.match.playerTwoHist.length) {
      self.setState({waitingForOpponent: true})
    }

    let data = {
      matchID: self.props.matchProps.match._id,
      player: self.props.matchProps.match.playerOne._id === self.props.pathProps.user._id ? 1 : 2,
      word
    }
    data = JSON.stringify(data)
    API.SendTurn(self.props.pathProps.socket, data)
  }
}

function GetRequiredLetter(match, userID){
  let inGame = match.round > 0,
      requiredLetter = ''

  if(inGame){
    let playerOne = match.playerOne._id,
    enemyHist = playerOne === userID ? match.playerTwoHist : match.playerOneHist,
    lastWord = enemyHist[enemyHist.length-1]

    requiredLetter = lastWord.charAt(lastWord.length-1)
  }

  return requiredLetter
}
