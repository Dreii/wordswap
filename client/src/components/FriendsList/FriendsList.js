import React, { Component } from 'react'
import './FriendsList.css'

class FriendsList extends Component {

  render() {
    let {list, SendChallenge} = this.props
    return (
      <div>
        <h2>Friends List</h2>
        {list.map(friend => (
          <div className="friend-listing">
            <b>{friend.name}</b> <button onClick={()=>SendChallenge()}>Challenge</button>
          </div>
        ))}
      </div>
    )
  }

}

export default FriendsList
