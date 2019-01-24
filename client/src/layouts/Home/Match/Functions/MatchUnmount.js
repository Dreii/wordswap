import API from '../../../../functions/api'
import TimerFunctions from './TimerFunctions'
import {ClearShakePlayerInput} from './ShakePlayerInputError'

export default function MatchUnmount(){
  //setup convenience variables
  let props = {...this.props.pathProps, ...this.props.matchProps}
  // let socket = this.props.pathProps.socket,
  //     match = this.props.matchProps.match,
  //     userID = this.props.pathProps.user._id

  //if there is a match in the store, find the second player
  // let playerTwo = (match !== null) ? this.props.matchProps.match.playerTwo : undefined

  //if a second player was found, then we must leave the match, giving it to the other player. (other player gets ELO)
  if(props.match && props.match.playerTwo !== undefined){
    API.LeaveMatch(props.socket, props.user._id)
  //if there is no playerTwo we must simply cancel the match which just deletes it from the server
  }else{
    API.cancelMatch(props.socket, props.match._id)
  }

  //clear out the timer, and shaker from memory
  TimerFunctions.ClearTimer.call(this)
  ClearShakePlayerInput.call(this)

  //clear out the match store
  props.UpdateMatch(null)

  //remove all socket event listeners that were set up during use
  props.socket.off("MATCH_UPDATED")
  props.socket.off("MATCH_FOUND")
  props.socket.off("MATCH_FINISHED")

  //remove the key event listeners
  document.removeEventListener("keyup", this.SendTestWin)

  //clear extra variables
  this.SendTestWin = null
}
