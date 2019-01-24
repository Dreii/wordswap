import React, { Component } from 'react'
import './Match.css'
import API from '../../../functions/api'

import MatchMount from './Functions/MatchMount'
import MatchUnmount from './Functions/MatchUnmount'
import ChooseStage from './Functions/ChooseStage'

let maxTime = 30

class Match extends Component {

  state = {
    playerInput: "",
    playerInputError: "",
    showLeaveConfirmWindow: false,
    waitingForOpponent: false,
    playerInputErrorShake: false,
    time: maxTime,
    initialTime: new Date()
  }

  componentDidMount(){
    MatchMount.call(this)
  }

  componentWillUnmount(){
    MatchUnmount.call(this)
  }

  render() {
    return (
      <div>
        <p>Match</p>
        <p>{this.props.pathProps.error}</p>

        {ChooseStage.call(this)}
      </div>
    )
  }

}

export default Match
