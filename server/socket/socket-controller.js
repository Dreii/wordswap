let serv = require('http').createServer()
let io = require('socket.io')(serv)
let identifyUserFromSocket = require('./functions/identifyUserFromSocket')
let ConnectUser = require('./functions/ConnectUser')
let LookForMatch = require('./functions/LookForMatch')
let UserDisconnected = require('./functions/UserDisconnected')
let KickUserFromMatch = require('./functions/KickUserFromMatch')
let CancelMatch = require('./functions/CancelMatch')
let AddToUpdateQueue = require('./functions/AddToUpdateQueue')
let CheckWordIsValid = require('./functions/CheckWordIsValid')
let DisplayConnectedUsers = require('../functions/DisplayConnectedUsers')



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

        socket.on('USER_CONNECTED',          (user) => {
                                               ConnectUser(this, socket, user)
                                               DisplayConnectedUsers(this.connectedUsers, `NEW USER: ${user}`)
                                             })

        // socket.on('RESOLVING_MISMATCH',      (user) => {
        //                                        ConnectUser(this, socket, user)
        //                                        DisplayConnectedUsers(this.connectedUsers, `RESOLVING MISMATCH: ${user}`)
        //                                      })

        socket.on('USER_LOOKING_FOR_MATCH',  (user) => LookForMatch(this, socket, user))

        socket.on('USER_LEAVING_MATCH',      (user) => KickUserFromMatch(this, user))

        socket.on('USER_CANCELLING_MATCH',   (matchID) => CancelMatch(this, socket, matchID))

        socket.on('USER_SENDING_TURN',       (data) => AddToUpdateQueue(this, data, socket))

        socket.on('USER_CHECKING_WORD',      (word) => CheckWordIsValid(this, socket, word, wordlist))

        socket.on('disconnect',              () => {
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
