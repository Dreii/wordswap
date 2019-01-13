let RemoveFriendRequest = require('./remove-friend-request')
let GetSocketFromUserID = require('../get-socket-from-user-id')

/**
 * [Update users after a friend request is accepted]
 * @param  {[SocketController]} self        [Socket Controller calling function]
 * @param  {[SocketObject]} socket      [Socket that sent the request]
 * @param  {[String]} accepterID  [ID of user accepting the request]
 * @param  {[String]} requesterID [ID of the person who sent the request]
 */

module.exports = async function(self, socket, accepterID, requesterID){
  let accepter = await self.db.schemas.User.findOne({_id: accepterID}).select('name username')
  let requester = await self.db.schemas.User.findOne({_id: requesterID}).select('name username')

  let accepterUpdate = await self.db.schemas.User.findOneAndUpdate(
    {
      _id: accepterID
    }, {
      $addToSet: {friends: requester},
      $pull: {friendRequests: requester}
    }
  )

  let requesterUpdate = await self.db.schemas.User.findOneAndUpdate(
    {
      _id: requesterID
    }, {
      $addToSet: {friends: accepter}
    }
  )

  RemoveFriendRequest(self, socket, accepterID, requesterID)

  console.log("accepting friend request", accepterUpdate, requesterUpdate)

  let requesterSocket = GetSocketFromUserID(requesterID, self)

  console.log(requesterSocket.id)
  socket.emit("FRIEND_REQUEST_ACCEPTED", requester)
  requesterSocket.emit("FRIEND_REQUEST_ACCEPTED", accepter)
}
