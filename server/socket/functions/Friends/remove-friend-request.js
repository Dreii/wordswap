/**
 * [Remove a friend request entry from a users object]
 * @param  {[SocketController]} self        [Socket Controller handling request]
 * @param  {[SocketObject]} socket      [Socket making request]
 * @param  {[String]} declinerID  [User ID of the person declining the friend request]
 * @param  {[String]} requesterID [User ID of the person who made the inital friend request]
 */

module.exports = async function(self, socket, declinerID, requesterID){
  return await self.db.schemas.User.findOneAndUpdate(
    {
      _id: declinerID
    }, {
      $pull: {
        friendRequests: {_id: requesterID}
      }
    }
  )
}
