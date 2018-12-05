import React, { Component } from 'react'
import './Match.css'
import TextField from '../../../components/TextField/TextField'

import {Link} from 'react-router-dom'

class Match extends Component {

  state = {
    playerInput: ""
  }

  render() {
    console.log(this.props.pathProps)
    return (
      <div>
        <p>Match</p>
        <Link to="/">Back Home</Link>

        <div style={{display: "flex"}}>
          <div style={{width: "50%", textAlign:"center"}}>
            <p>Player one history</p>
            <ul>
              {this.props.pathProps.playerHistory.map(entry => <li>entry</li>)}
            </ul>
          </div>
          <div style={{width: "50%", textAlign:"center"}}>
            <p>Player two history</p>
            <ul>
              {this.props.pathProps.opponentHistory.map(entry => <li>entry</li>)}
            </ul>
          </div>
        </div>

        <TextField label="Player input" src={this.state.playerInput} onChange={(e)=>this.setState({playerInput: e.target.value})}/>
      </div>
    )
  }

}

export default Match
