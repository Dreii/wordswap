import React, { Component } from 'react'
import './Leaderboard.css'
import Scroll from 'react-scroll'
let Element = Scroll.Element
let Events = Scroll.Events
let scroll = Scroll.animateScroll
let scroller = Scroll.scroller
let Link = Scroll.Link

class Leaderboard extends Component {

  state={
    first: null
  }

  ConvertBotEntry(entry, i){
    return `[${i+1}][bot]`
  }

  ProcessEntryData(entry, i){
    let user = entry.user
    if(entry.og === true){
      if(i === 0) return `[${i+1}][${user.username}][${user.hat} ${user.shirt} ${user.body} ${user.hair} ${user.pants}]`
      else        return `[${i+1}][${user.username}]`
    }
    else return this.ConvertBotEntry(entry, i)
  }

  componentDidMount(){
    if(this.props.data !== []){
      scroller.scrollTo('currentPlayer', {
        smooth: false,
        containerId: 'leaderboardContainer',
        offset: -90,
      })
    }
  }

  componentDidUpdate(prevProps){
    console.log(this.props.data)
    if(this.props.data !== null && this.props.data.length > 0 && this.state.first === null){
      console.log("should pop")
      let first = this.props.data.shift()
      console.log(first, this.props.data)
      this.setState({first})
      scroller.scrollTo('currentPlayer', {
        duration: 1500,
        delay: 100,
        smooth: true,
        containerId: 'leaderboardContainer',
        offset: -90,
      })
    }
  }

  render() {
    return (
      <div>
        <h3>Leaderboard</h3>
        <div>
            {this.state.first !== null ? (<p>First Player: {this.ProcessEntryData(this.state.first, 0)}</p>):null}
        </div>
        <Element
          name="leaderboardContainer"
          className="element"
          id="leaderboardContainer"
          style={{
            position: 'relative',
            height: '200px',
            overflow: 'scroll',
            marginBottom: '100px'
          }}
        >
          <ul>
            {this.props.data.constructor === Array ? (this.props.data.map((entry, i) => (
              <li key={i}>
                {entry.og === true && entry.user._id === this.props.userID ? (
                  <Element name="currentPlayer">
                    <p className="currentPlayer">
                      {this.ProcessEntryData(entry, i+1)}
                    </p>
                  </Element>
                ):(
                  <p>
                    {this.ProcessEntryData(entry, i+1)}
                  </p>
                )}
              </li>
            ))):(
              this.props.data === null ? <p>Start playing matches to be placed on the leaderboard!</p> : <p>{10 - this.props.data.matchesPlayed} placement matches left!</p>
            )}
          </ul>
        </Element>
      </div>
    )
  }

}

export default Leaderboard
