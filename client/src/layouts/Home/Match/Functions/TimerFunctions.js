import API from '../../../../functions/api'
import {CheckWordOnline, GetRequiredLetter} from './SendTurn'

const TimerFunctions = {
  SetTimer,
  StopTimer,
  ClearTimer,
  OnTimerEnd
}

export default TimerFunctions


let maxTime = 30


function SetTimer(){
  let round = this.props.matchProps.match.round
  if(round > 0){
    this.setState({time: maxTime})
    this.setState({initialTime: new Date()})
    this.timer = setInterval(() => {
      let now = new Date()
      let time = maxTime - Math.floor((now.getTime() - this.state.initialTime.getTime())/1000)
      // console.log(maxTime, now.getTime(), this.state.initialTime.getTime(), time)
      this.setState({time})
      if(time <= 0) OnTimerEnd.call(this)
    }, 1000)
  }
}

function StopTimer(){
  clearTimeout(this.timer)
  this.timer = null
}

function ClearTimer(){
  this.setState({time: maxTime})
  clearTimeout(this.timer)
  this.timer = null
}

function OnTimerEnd(){
  StopTimer.call(this)
  let userID = this.props.pathProps.user._id,
      socket = this.props.pathProps.socket,
      playerInput = this.state.playerInput,
      match = this.props.matchProps.match

  CheckWordOnline.call(this, socket, playerInput, GetRequiredLetter(match, userID))
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
