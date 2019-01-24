import io from 'socket.io-client'
const socketUrl = `http://${window.location.hostname}:3231`
let baseUrl = ''

class API{
  static Login(body){
    let payload = {...this.postData, body: JSON.stringify(body)}

    return this.handleResponse(fetch(baseUrl+'/login', payload))
  }

  static Signup(body){
    let payload = {...this.postData, body: JSON.stringify(body)}

    return this.handleResponse(fetch(baseUrl+'/signup', payload))
  }

  static FBLogin(body){
    let payload = {...this.postData, body: JSON.stringify(body)}

    return this.handleResponse(fetch(baseUrl+'/fb-login', payload))
  }

  static SubmitUsername(body){
    let payload = {...this.postData, body: JSON.stringify(body)}

    return this.handleResponse(fetch(baseUrl+'/submit-username', payload))
  }

  static ConnectSocket = (userID) => {
    return new Promise((resolve, reject)=>{
      console.log("attempting connection")
      const socket = io(socketUrl)
      socket.on('connect', ()=>{
        socket.emit('USER_CONNECTED', userID)
        let now = new Date()
        console.log("Connected with userID", userID, now.toLocaleDateString('en-US', {hour: 'numeric', minute: 'numeric', second: 'numeric'}))
        resolve(socket)
      })

      socket.on('error', (err)=>{
        reject(err)
      })
    })
  }

  static RequestLeaderboard = (socket, requesterID) =>{
    return new Promise((resolve, reject) => {
      socket.emit('USER_REQUESTING_LEADERBOARD', requesterID)
      socket.on('LEADERBOARD_DATA_RETURNED', (data) => {
        resolve(data)
      })

      socket.on('error', (err)=>{
        reject(err)
      })
    })
  }

  static LookForMatch = (socket, userID) => {
    return new Promise((resolve, reject) => {
      socket.emit('USER_LOOKING_FOR_MATCH', userID)
      socket.on('MATCH_FOUND', (match)=>{
        resolve(match)
      })

      window.setTimeout(()=>{
        reject({error: "The server is not responding."})
      }, 10*1000)
    })
  }

  static SendTurn = (socket, data) => {
    console.log("Sending turn with this data", data)
    socket.emit('USER_SENDING_TURN', data)
  }

  static LeaveMatch = (socket, userID) => {
    console.log("leaving match")
    socket.emit('USER_LEAVING_MATCH', userID)
  }

  static cancelMatch = (socket, matchID) => {
    console.log("canceling match")
    socket.emit('USER_CANCELLING_MATCH', matchID)
  }

  static LookForFriends = (socket, userID, query, recentOpponents) => {
    return new Promise((resolve, reject)=>{
      if(query.length > 0) {
        console.log("looking for friend")
        socket.emit('USER_LOOKING_FOR_FRIEND', userID, query)
        socket.on('FRIEND_SEARCH_RESPONSE', (list)=>resolve(list))
      }else{
        resolve(recentOpponents)
      }
    })
  }

  static SendChallenge = (socket, challengeRecieverID) => {
    return new Promise((resolve, reject)=>{
      console.log("sending challenge")
      socket.emit("USER_SENDING_CHALLENGE", challengeRecieverID)

      socket.on('CHALLENGE_ACCEPTED', match => {
        console.log("SEND API Received CA")
        resolve({accepted: true, match, reason: ""})
      })

      socket.on('CHALLENGE_REJECTED', reason => {
        console.log("challenge rejected", reason)
        resolve({accepted: false, match: null, reason})
      })

      window.setTimeout(()=>{
        resolve({accepted: false, match: null, reason: "timeout"})
      }, 70*1000)
    })
  }

  static AcceptChallenge = (socket, challengeSenderID, myID) => {
    return new Promise((resolve, reject) => {
      console.log("accepting challenge")
      socket.emit("USER_ACCEPTING_CHALLENGE", challengeSenderID, myID)
      socket.on('CHALLENGE_ACCEPTED', match => {
        console.log("RECEIVE API Received CA")
        resolve({accepted: true, match, reason: ""})
      })
    })
  }

  static CancelChallenge = (socket, challengeReceiverID) => {
    console.log("declining challenge")
    socket.emit("USER_CANCELLING_CHALLENGE", challengeReceiverID)
  }

  static DeclineChallenge = (socket, challengeSenderID) => {
    console.log("declining challenge")
    socket.emit("USER_DECLINING_CHALLENGE", challengeSenderID)
  }

  static SendFriendRequest = (socket, requesterID, requesteeID) => {
    return new Promise((resolve, reject)=>{
      console.log("sending friend request")
      socket.emit("USER_SENDING_FRIEND_REQUEST", requesterID, requesteeID)
    })
  }

  static AcceptFriendRequest = (socket, myID, acceptedID) => {
    return new Promise((resolve, reject)=>{
      console.log("accepting friend request")
      socket.emit("USER_ACCEPTING_FRIEND_REQUEST", myID, acceptedID)
    })
  }

  static DeclineFriendRequest = (socket, myID, declinedID) => {
    return new Promise((resolve, reject)=>{
      console.log("declining friend request")
      socket.emit("USER_DECLINING_FRIEND_REQUEST", myID, declinedID)
    })
  }

  static SetupRequestReceivers = (self, socket) => {
    console.log("setting up recievers")
    socket.on("CHALLENGE_RECEIVED", challenge => {
      console.log("challenge received")
      let user = self.state.user
      if(user) user.challenge = challenge
      self.setState({
        user
      })

      setTimeout(()=>{
        let user = self.state.user
        if(user.challenge) delete user.challenge
        self.setState({
          user
        })
      }, 60*1000)
    })

    socket.on("FRIEND_REQUEST_RECEIVED", requester => {
      let user = self.state.user
      if(user) {
        if(user.friendRequests.findIndex(request => requester._id === request._id) < 0)
          user.friendRequests.push(requester)
      }
      self.setState({
        user
      })
    })

    socket.on("FRIEND_REQUEST_ACCEPTED", newFriend => {
      console.log("friend request accepted")
      let user = self.state.user
      if(user){
        user.friends.push(newFriend)
        let friendIndex = user.friendRequests.findIndex((friendRequest)=>friendRequest._id === newFriend._id)
        user.friendRequests.splice(friendIndex, 1)
      }
      self.setState({
        user
      })
    })
  }

  static handleResponse(promise){
    // let token
    return promise
      .then(response => {
        // token = response.headers.get('x-access-token')
        // console.log(response)
        return response.json()
      })
      .then((body) => {
        // console.log(body);
        if(body.error) throw Error(body.error)

        return {token:body.token, data: body.data};
      })
  }
}

API.postData = {
   method: "POST",
   headers:{
     accept: "application/json",
     "Content-type": "application/json",
   }
}

API.subscriptions = [];

export default API;
