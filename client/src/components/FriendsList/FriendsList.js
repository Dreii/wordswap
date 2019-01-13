import React, { Component } from 'react'
import './FriendsList.css'

import TextField from '../TextField/TextField'


class FriendsList extends Component {

  state = {
    addingFriend: false,
  }

  render() {
    let {
       list,
       SendChallenge,
       AddFriend,
       FriendSearch,
       friendSearchQuery,
       loading,
       searchResults
    } = this.props

    return (
      <div>
        <h2>Friends List</h2>
        {this.state.addingFriend ? (
          <div>
            <button onClick={()=>this.setState({addingFriend: false})}>Cancel</button>
            <TextField src={friendSearchQuery} onChange={(e)=>FriendSearch((e.target.value))} />
            {loading ? (
              <p>Loading...</p>
            ):(
              searchResults.length > 0 ? (
                searchResults.map((user, i) => (
                  <div key={i} className="add-friend-search-listing">
                    <span>{user.name || user.username}</span> <button onClick={()=>AddFriend(user._id)}>Add Friend</button>
                  </div>
                ))
              ):(
                <p>Nothing to see here.</p>
              )
            )}
          </div>
        ):(
          <div>
            <button onClick={()=>{
              this.setState({addingFriend: true})
              FriendSearch('')
            }}>
              Add Friend
            </button>

            {list.map((friend, i) => (
              <div key={i} className="friend-listing">
                <b>{friend.name || friend.username}</b> <button onClick={()=>SendChallenge(friend._id)}>Challenge</button>
              </div>
            ))}
          </div>
        )}

      </div>
    )
  }

}

export default FriendsList
