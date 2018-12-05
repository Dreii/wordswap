let serv = require('http').createServer()
let io = require('socket.io')(serv)

//A class of socket helpers
class SocketController{
  constructor(){
    this.PORT = 3231
    this.connectedUsers = []

    this.connect = () => {
      io.on('connection', (socket)=>{

        socket.on('USER_CONNECTED', (user)=>{

          let index = this.connectedUsers.findIndex(obj =>{
            return obj.socket === socket.id
          })

          console.log(index);

          if(index <= 0){
            this.connectedUsers.push({
              user: user,
              socket: socket.id
            })
          }else{
            this.connectedUsers[index].socket = socket.id
          }

          console.log("connect", this.connectedUsers);
        })

        socket.on('disconnect', () => {
          //find the object by searching for socket
          let index = this.connectedUsers.findIndex(obj =>{
            return obj.socket === socket
          })

          this.connectedUsers.splice(index, 1)

          console.log("disconnect", this.connectedUsers);
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
