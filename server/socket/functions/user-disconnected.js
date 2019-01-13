/**
 * [Function to handle removing a socket/user from the socket controller list]
 * @param  {SocketController} self   [Socket Controller handling the request]
 * @param  {Socket} socket [Socket that is disconnecting]
 */

module.exports = (self, socket) => {
  //find the index of the user socket object which
  //coresponds to the socket that disconnected
  let index = self.connectedUsers.findIndex(obj =>{
    return obj.socket === socket
  })

  //splice out the user socket object at that findIndex
  //from the list of connected users
  self.connectedUsers.splice(index, 1)
}
