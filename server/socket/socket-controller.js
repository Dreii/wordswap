let serv = require('http').createServer()
let io = require('socket.io')(serv)
let GetUserFromSocketID = require('./functions/get-user-id-from-socket-id')

let ConnectUser = require('./functions/connect-user')
let UserDisconnected = require('./functions/user-disconnected')
let DisplayConnectedUsers = require('./functions/display-connected-users')

let LookForMatch = require('./functions/Matches/look-for-match')
let KickUserFromMatch = require('./functions/Matches/kick-user-from-match')
let CancelMatch = require('./functions/Matches/cancel-match')
let AddToUpdateQueue = require('./functions/Matches/add-to-update-queue')
let CheckWordIsValid = require('./functions/Matches/check-word-is-valid')

let LookForFriends = require('./functions/Friends/look-for-friends')
let SendFriendRequest = require('./functions/Friends/send-friend-request')
let AcceptFriendRequest = require('./functions/Friends/accept-friend-request')
let RemoveFriendRequest = require('./functions/Friends/remove-friend-request')

let SendChallenge = require('./functions/Challenges/send-challenge')
let AcceptChallenge = require('./functions/Challenges/accept-challenge')
let DeclineChallenge = require('./functions/Challenges/decline-challenge')
let CancelChallenge = require('./functions/Challenges/cancel-challenge')

/**
 * [SocketController A controller for handling all of the incoming and outgoing requests for logged in users using wordswap]
 */

//A class of socket helpers
class SocketController{
  constructor(){
    this.PORT = 3231
    this.connectedUsers = []
    this.matchUpdateRequests = []
    this.io = io

    this.connect = (db, wordlist) => {
      this.db = db

      this.io.on('connection', (socket)=>{

        socket.on('USER_CONNECTED',                (user) => {
                                                     ConnectUser(this, socket, user)
                                                     DisplayConnectedUsers(this.connectedUsers, `NEW USER: ${user}`)
                                                   })


        socket.on('USER_LOOKING_FOR_MATCH',        (userID) => LookForMatch(this, socket, userID))

        socket.on('USER_LEAVING_MATCH',            (user) => KickUserFromMatch(this, user))

        socket.on('USER_CANCELLING_MATCH',         (matchID) => CancelMatch(this, socket, matchID))

        socket.on('USER_SENDING_TURN',             (data) => AddToUpdateQueue(this, data, socket))

        socket.on('USER_CHECKING_WORD',            (word) => CheckWordIsValid(this, socket, word, wordlist))


        socket.on("USER_LOOKING_FOR_FRIEND",       (userID, query) => LookForFriends(this, socket, userID, query))

        socket.on('USER_SENDING_FRIEND_REQUEST',   (requesterID, requesteeID) => SendFriendRequest(this, socket, requesterID, requesteeID))

        socket.on('USER_ACCEPTING_FRIEND_REQUEST', (acceptorID, requesterID) => AcceptFriendRequest(this, socket, acceptorID, requesterID))

        socket.on('USER_DECLINING_FRIEND_REQUEST', (decliner, requesterID) => RemoveFriendRequest(this, socket, decliner, requesterID))


        socket.on('USER_SENDING_CHALLENGE',        (challengeReceiverID) => SendChallenge(this, socket, challengeReceiverID))

        socket.on('USER_ACCEPTING_CHALLENGE',      (challengeSenderID, challengeReceiverID) => AcceptChallenge(this, socket, challengeSenderID, challengeReceiverID))

        socket.on('USER_DECLINING_CHALLENGE',      (challengeSenderID) => DeclineChallenge(this, socket, challengeSenderID))

        socket.on('USER_CANCELLING_CHALLENGE',     (challengeReceiverID) => CancelChallenge(this, socket, challengeReceiverID))

        socket.on('disconnect',                    () => {
                                                     UserDisconnected(this, socket)
                                                     DisplayConnectedUsers(this.connectedUsers, `USER DISCONNECTED`)
                                                   })
      })

      serv.listen(this.PORT, ()=>{
        console.log("CONNECTED to port: "+this.PORT);
      })
    }
  }
}

SocketController.io = io

module.exports = new SocketController();
