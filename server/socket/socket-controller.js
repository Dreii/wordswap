let serv = require('http').createServer()
let io = require('socket.io')(serv)
let identifyUserFromSocket = require('./functions/identifyUserFromSocket')
let ConnectUser = require('./functions/ConnectUser')
let LookForMatch = require('./functions/LookForMatch')
let UserDisconnected = require('./functions/UserDisconnected')


//A class of socket helpers
class SocketController{
  constructor(){
    this.PORT = 3231
    this.connectedUsers = []
    this.io = io

    this.connect = (db) => {
      this.db = db

      this.io.on('connection', (socket)=>{

        socket.on('USER_CONNECTED',          (user) => ConnectUser(this, socket, user))

        socket.on('RESOLVING_MISMATCH',      (user) => ConnectUser(this, socket, user))

        socket.on('USER_LOOKING_FOR_MATCH',  (user) => LookForMatch(this, socket, user))

        socket.on('USER_LEAVING_MATCH',      ()=> KickUserFromMatch(this, socket))

        socket.on('disconnect',              () => UserDisconnected(this, socket))
      })

      serv.listen(this.PORT, ()=>{
        console.log("CONNECTED to port: "+this.PORT);
      })
    }
  }
}

SocketController.io = io

module.exports = new SocketController();
