/**
 * [Connect a user to the socket controller]
 * @param  {[SocketController]} self   [Socket Controller handling the request]
 * @param  {[SocketObject]} socket [Incomming Socket]
 * @param  {[String]} userID   [User ID of the user connecting]
 */

module.exports = (self, socket, user) => {
  //check if the user is already in the list of connected users
  let index = self.connectedUsers.findIndex(obj => obj.user.toString() === user.toString())

  //if the user cannot be found, create a new entry in the list of connected users with
  //the user ID and Socket ID paired
  if(index < 0){
    self.connectedUsers.push({
      user: user,
      socket: socket.id
    })
  }else{
    //if you are able to find the user ID then re-assign its socket to this new socket as the user
    //has reconnected.
    self.connectedUsers[index].socket = socket.id
  }
}
