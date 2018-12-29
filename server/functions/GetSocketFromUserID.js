module.exports = (userID, socketController) => {
  let receiver = socketController.connectedUsers.find(obj => obj.user === userID.toString())
  if(receiver !== undefined){
    receiver = receiver.socket
    return socketController.io.sockets.connected[receiver]
  }
  return null
}
