/**
 * [Convert a userID string to a socket object]
 * @param  {[String]} userID           [A Mongo UserID String]
 * @param  {[SocketController]} socketController [Socket Controller handling the request]
 * @return {[SocketObject]}                  [A Socket Object]
 */

module.exports = (userID, socketController) => {
  let receiver = socketController.connectedUsers.find(obj => obj.user === userID.toString())
  if(receiver !== undefined){
    receiver = receiver.socket
    return socketController.io.sockets.connected[receiver]
  }
  return null
}
