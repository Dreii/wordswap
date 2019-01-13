let GetSocketFromUserID = require('../get-socket-from-user-id')

/**
 * [Setup Friend Request between two users]
 * @param  {[SocketController]} self        [Socket Controller handling request]
 * @param  {[SocketObject]} socket      [Socket making the request]
 * @param  {[String]} requesterID [UserID of the user sending the friend request]
 * @param  {[String]} requesteeID [UserID of the user receiving the friend request]
 * @return {[type]}             [description]
 */

module.exports = async function(self, socket, requesterID, requesteeID){
  let requester = await self.db.schemas.User.findOne({_id: requesterID}).select('username name')
  let update = await self.db.schemas.User.findOneAndUpdate({_id: requesteeID}, {$addToSet: {friendRequests: requester}}, {new: true})
  let requesteeSocket = GetSocketFromUserID(requesteeID, self)
  requesteeSocket.emit("FRIEND_REQUEST_RECEIVED", requester)
}
