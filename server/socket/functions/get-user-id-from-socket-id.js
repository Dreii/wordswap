/**
 * [Convert a SocketID to a userID using the socket controller list]
 * @param  {[String]} socketID       [ID of a socket in the list]
 * @param  {[Array]} connectedUsers [List of connected users]
 * @return {[String]}                [The userID associated with the socket supplied or null if none found ]
 */

module.exports = (socketID, connectedUsers) => {
  let socketUser = connectedUsers.find(obj => obj.socket === socketID)
  if(socketUser) return socketUser.user
  else return null
}
